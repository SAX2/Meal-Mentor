"use client"

import { UserCollborator } from '@/components/dialog/CreateDirDialog';
import { RouteButton } from '@/components/navbar/Route';
import Toast from '@/components/toasts/Toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectItem, SelectTrigger, SelectContent } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { addCollaborators, getCollaborators, getFolderDetails, getUsersByValue, removeCollaborator, removeCollaborators } from '@/lib/supabase/queries';
import { File, Folder, User } from '@/lib/supabase/supabase.types';
import { cn } from '@/lib/utils';
import { dirView } from '@/utils/data/data';
import { useAuth, useClerk } from '@clerk/nextjs';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Link2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const SharePopover = ({
  children,
  className
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { userId } = useAuth();
  const [folder, setFoler] = useState<Folder[]>([]);
  const [file, setFile] = useState<File[]>([]);
  const [selectedView, setSelectedView] = useState(dirView[0]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>();
  
  const [userIsCollaborator, setUserIsCollaborator] = useState<boolean>(false);
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [collaboratorsToAdd, setCollaboratorsToAdd] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>("");
  const [debouncedContent, setDebouncedContent] = useState<string | null>("");
  
  const [changes, setChanges] = useState<string[]>([])

  const router = useRouter();

  const { folderId } = useParams<{ documentId: string; folderId: string }>()

  function removeDuplicates(changes: string[]) {
    const uniqueArr: any[] = [];

    for (let i = 0; i < changes.length; i++) {
      if (!uniqueArr.includes(changes[i])) {
        uniqueArr.push(changes[i]);
      }
    }
  
    return uniqueArr;
  }

  useEffect(() => {
    setSearchValue("");

    const fetchCollaborators = async (fileId: string) => {
      const { data, error } = await getCollaborators({ fileId });

      if (error) return;

      if (data) {
        return setCollaborators(data);
      }
    };

    if (isOpenModal && folderId) {
      fetchCollaborators(folderId);
    }
  }, [isOpenModal]);

  useEffect(() => {
    const isCollab = collaborators.filter(
      (collaborator) => collaborator.id === userId
    );

    if (isCollab.length > 0) {
      setUserIsCollaborator(true);
    }
  }, [collaborators])

  const handleClickUser = async ({
    user,
    isAdded,
  }: {
    user: User;
    isAdded: boolean;
  }) => {
    if (!isAdded) {
      setCollaborators((prevState) => [...prevState, user]);
      setChanges(prevState => ([...prevState, "add-collaborator"]))
    } else {
      const filteredCollborators = collaborators.filter(
        (collborator) => collborator.id != user.id
      );
      setCollaborators(filteredCollborators);
      setChanges(prevState => ([...prevState, "remove-collaborator"]))
    }
    return;
  };

  useEffect(() => {
    if (searchValue?.length === 0) return setCollaboratorsToAdd([])

    const debounceTimeout = setTimeout(() => {
      setDebouncedContent(searchValue);
    }, 600);

    return () => clearTimeout(debounceTimeout);
  }, [searchValue]);

  useEffect(() => {
    // setIsLoading(true);
    const searchUsers = async () => {
      try {
        const { data } = await getUsersByValue(debouncedContent ?? "");
        if (data != null) {
          const filter = data.filter((user) => user.id != userId);
          setCollaboratorsToAdd(filter);
        }
      } catch (error) {
        console.log(error);
      } finally {
        // setIsLoading(false);
      }
    };

    if (debouncedContent) {
      searchUsers();
    }
  }, [debouncedContent]);

  const onSaveChanges = () => {
    const uniqueArr = removeDuplicates(changes);

    uniqueArr.map(async (change) => {
      if (change === "add-collaborator") {
        const { error } = await addCollaborators({
          fileId: folderId,
          users: collaborators,
        });

        if (error) return toast(<Toast message='Error while updating folder' type='error'/>);

        router.refresh();
      }

      if (change === "remove-collaborator") {
        const { error } = await removeCollaborators({
          fileId: folderId,
          users: collaborators,
        });

        if (error) return toast(<Toast message='Error while updating folder' type='error'/>);

        router.refresh();
      }
    });

    toast(<Toast message='Folder updated successfully' type='success'/>)
    setChanges([]);
    return;
  }

  return (
    <Popover onOpenChange={setIsOpenModal}>
      <PopoverTrigger className={cn(className, "")}>{children}</PopoverTrigger>
      <PopoverContent className="bg-white-2 shadow-pop min-w-[350px] mr-5 p-0 border border-outline">
        <div className="flex flex-col">
          <div className="flex flex-col p-3">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">Share & Collab</h1>
              <RouteButton type="hover" className="p-[2px] !h-[20px]">
                <DotsHorizontalIcon
                  width={16}
                  height={16}
                  className="text-grey"
                />
              </RouteButton>
            </div>
            <p className="text-sm text-grey">
              {userIsCollaborator
                ? "You are a reader and cannot manage access"
                : "Share the folder to collaborate with others"}
            </p>
          </div>
          {!userIsCollaborator && (
            <>
              <Separator orientation="horizontal" />
              <div className="flex flex-col gap-3 p-3">
                <div className="flex flex-col gap-[2.5px]">
                  <Label className="text-grey text-sm">Add collaborators</Label>
                  <Input
                    placeholder="Add people"
                    className="shadow-none border-outline p-1 px-2 h-fit !ring-0"
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <div className="flex flex-col">
                    {collaboratorsToAdd.map((collaborator) => {
                      const isAdded = collaborators.filter(
                        (collboratorAdded) =>
                          collboratorAdded.id === collaborator.id
                      );

                      return (
                        <UserCollborator
                          collaborator={collaborator}
                          isAdded={isAdded}
                          handleClickUser={handleClickUser}
                        />
                      );
                    })}
                  </div>
                </div>
                {collaborators.length > 0 && (
                  <div className="flex flex-col gap-[2.5px]">
                    <h3 className="text-sm font-medium text-grey">
                      People who have access:
                    </h3>
                    <div className="flex flex-col">
                      {collaborators.map((collaborator) => {
                        const isAdded = collaborators.filter(
                          (collboratorAdded) =>
                            collboratorAdded.id === collaborator.id
                        );

                        return (
                          <UserCollborator
                            collaborator={collaborator}
                            isAdded={isAdded}
                            handleClickUser={handleClickUser}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-[2.5px]">
                  <h3 className="text-sm font-medium text-grey">
                    General access:
                  </h3>
                  <div className="rounded-md bg-white-2-sec p-2 px-3 flex gap-1 justify-between items-center w-full">
                    <div className="flex gap-1 items-center">
                      {selectedView.icon}
                      <div className="flex flex-col">
                        <Select>
                          <SelectTrigger className="px-1 py-[2.5px] h-fit w-fit max-w-full gap-1 focus:!ring-0 border-0 shadow-none hover:!bg-white-2-sec-2 transition-colors font-medium text-base truncate">
                            {selectedView.title}
                          </SelectTrigger>
                          <SelectContent className="!z-[400] p-0">
                            {dirView
                              .filter((view) => view.type !== selectedView.type)
                              .map((view) => {
                                return (
                                  <SelectItem
                                    value={view.type}
                                    className="p-[2.5px] px-2 hover:!bg-white-2-sec focus:!bg-white-2-sec"
                                  >
                                    {view.title}
                                  </SelectItem>
                                );
                              })}
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-grey ml-1 -mt-[2.5px] w-full">
                          {selectedView.description}
                        </p>
                      </div>
                    </div>
                    {/* <div className='w-full'>
                  {selectedView.options !== null && (
                    <Select>
                      <SelectTrigger className="px-1 py-[2.5px] h-fit w-fit gap-1 focus:!ring-0 border-0 shadow-none hover:!bg-white-2-sec-2 transition-colors font-medium text-base truncate">
                        {selectedView.options[0].title}
                      </SelectTrigger>
                      <SelectContent className="!z-[400] p-0">
                        {selectedView.options
                          .filter(
                            (option) =>
                              option.title !== selectedView.options[0].title
                          )
                          .map((option) => {
                            return (
                              <SelectItem
                                value={option.title}
                                className="p-[2.5px] px-2 hover:!bg-white-2-sec focus:!bg-white-2-sec"
                              >
                                {option.title}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                  )}
                </div> */}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-between px-3 pb-3">
            <button className="px-2 p-1 font-medium text-black text-sm border border-outline rounded-md shadow-button flex gap-1 items-center hover:bg-white-2-sec">
              <Link2 width={16} height={16} className="text-black" />
              <span>Copy link</span>
            </button>
            <button
              className="px-2 p-1 font-medium text-white bg-black text-sm rounded-md flex gap-1 items-center disabled:bg-white-2-sec disabled:text-grey"
              disabled={changes.length === 0 ? true : false}
              onClick={onSaveChanges}
            >
              Save changes
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SharePopover