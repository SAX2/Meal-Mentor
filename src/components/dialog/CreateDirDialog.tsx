'use client';

import emojisList, { sections } from '@/utils/data/emojis'
import CustomDialog from '../dialog/CustomDialog';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import EmojiRoute from '../emoji/EmojiRoute';
import { Loader, Minus, PlusIcon } from 'lucide-react';
import { dialogs } from '@/utils/data/data';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Folder, File, User } from '@/lib/supabase/supabase.types';
import { addCollaborators, createFile, createFolder, getCollaborators, getFolderDetails, getUsersByValue } from '@/lib/supabase/queries';
import { v4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DirType } from '@/utils/types';
import Image from 'next/image';
import { RouteButton } from '../navbar/Route';

interface CreateDirProps {
  children: React.ReactNode;
  userId: string;
  dirType: DirType;
  id?: string;
  classname?: string;
}

const CreateDir: React.FC<CreateDirProps> = ({ userId, dirType, id, children, classname }) => {
  return (
    <CustomDialog
      title={dirType === 'folder' ? dialogs.createFolder.title : dialogs.createFile.title}
      description={dirType === 'folder' ? dialogs.createFolder.description : dialogs.createFile.description}
      classname={classname}
      classnameContent="w-fit !max-w-[400px] max-[800px]:!max-w-full"
      content={<DialogContent userId={userId} dirType={dirType} id={id} dialogData={dirType === 'folder' ? dialogs.createFolder : dialogs.createFile} />}
    >
      {children}
    </CustomDialog>
  );
};

const DialogContent = ({ userId, dirType, id, dialogData }: { userId: string, dirType: DirType; id?: string, dialogData: any; }) => {
  const [seletedEmoji, setSeletedEmoji] = useState<string>("");  
  const [title, setTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [collaborators, setCollaborators] = useState<User[]>([]);
  
  const router = useRouter()
  const uuid = v4();
  
  useEffect(() => {
    if (emojisList) {
      const randomSection =
        sections[Math.floor(Math.random() * sections.length)].n;
      const sectionEmojis = emojisList[randomSection];
      if (sectionEmojis) {
        const randomIndex = Math.floor(Math.random() * sectionEmojis.length);
        setSeletedEmoji(sectionEmojis[randomIndex].u);
      }
    }
  }, [])

  const handleChange = ({ value, type }: { value: string; type: string }) => {
    switch (type) {
      case "title":
        return setTitle(value);
    }
  };

  const handleSubmit = async () => {
    if (!userId) return;

    setIsLoading(true);

    if (dirType === 'folder') {
      if (!title) return setIsLoading(false);
  
      const newFolder: Folder = {
        id: uuid,
        data: null,
        folderOwner: userId,
        iconId: seletedEmoji,
        title: title,
        createdAt: new Date().toISOString(),
      };


      const res = await createFolder(newFolder);

      if (collaborators.length > 0) {
        const { error } = await addCollaborators({
          fileId: uuid,
          users: collaborators,
        });

        if (error) {
          toast.success("Error by adding collaborators");
          setIsLoading(false);
          return router.refresh();
        }
      }
      
      if (!res.error) {
        toast.success("Folder create successfully");
        setIsLoading(false);
        return router.refresh();
      }
      toast.error("Error while creating folder");
      return setIsLoading(false);
    }
    if (dirType === 'file') {
      if (!title) return setIsLoading(false);
  
      const { data, error } = await getFolderDetails({ folderId: id ?? "", userId })

      if (error) return setIsLoading(false);
      if (data) {
        const newFile: File = {
          id: uuid,
          data: null,
          fileOwner: userId,
          folderId: data[0].id,
          iconId: seletedEmoji,
          title: title,
          createdAt: new Date().toISOString(),
        };
    
        const res = await createFile(newFile);
        
        if (!res.error) {
          toast.success("File create successfully");
          setIsLoading(false);
          return router.refresh();
        }
        toast.error("Error while creating file");
        return setIsLoading(false);
      }
    }
  }

  return (
    <div className="mt-2">
      <div className="flex flex-col gap-4">
        {dialogData.inputs.map((input: any, index: number) => {
          return (
            <InputWithLabel label={input.label} key={index}>
              {input.type === "icon" && (
                <div className="p-3 border border-outline bg-transparent rounded-md w-fit">
                  <EmojiRoute
                    pickOnly
                    setOnClick={(emoji) => setSeletedEmoji(emoji)}
                    id={uuid}
                    dirType="folder"
                    icon={seletedEmoji}
                    customSize="w-[48px] h-[48px]"
                  />
                </div>
              )}
              {input.type === "collaborators" && (
                <Collborators
                  userId={userId}
                  collaborators={collaborators}
                  setCollaborators={setCollaborators}
                />
              )}
              {input.type === "text" && (
                <Input
                  onChange={(e) =>
                    handleChange({ value: e.target.value, type: input.id })
                  }
                  placeholder={input.placeholder}
                  className="shadow-none border-outline"
                />
              )}
            </InputWithLabel>
          );
        })}
        <button
          className="cursor-pointer w-full border border-outline shadow-button rounded-md px-3 py-1 font-medium flex justify-center items-center"
          onClick={handleSubmit}
          disabled={title === null || isLoading}
        >
          {isLoading && (
            <span className="animate-spin transition-opacity p-1">
              <Loader width={18} height={18} className="text-black" />
            </span>
          )}
          {!isLoading && dialogData.buttonSubmit}
        </button>
      </div>
    </div>
  );
}

const InputWithLabel = ({ label, children }: { label: string; children: React.ReactNode; }) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="" className="text-grey">
        {label}
      </Label>
      {children}
    </div>
  );
}

const Collborators = ({
  userId,
  setCollaborators,
  collaborators,
}: {
  userId: string;
  collaborators: User[];
  setCollaborators: Dispatch<SetStateAction<User[]>>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [collboratorsSearch, setCollboratorsSearch] = useState<User[]>([]);
  const [searchCollaborators, setSearchCollaborators] = useState<{
    open: boolean;
    search: string | null;
  }>({ open: false, search: null });
  const [debouncedContent, setDebouncedContent] = useState<string | null>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setSearchCollaborators((prevState) => ({
      ...prevState,
      search: e.target.value,
    }));
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedContent(searchCollaborators.search);
    }, 600);

    return () => clearTimeout(debounceTimeout);
  }, [searchCollaborators.search]);

  useEffect(() => {
    setIsLoading(true);
    const searchUsers = async () => {
      try {
        const { data } = await getUsersByValue(debouncedContent ?? "");
        if (data != null) {
          const filter = data.filter((user) => user.id != userId);
          setCollboratorsSearch(filter);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedContent) {
      searchUsers();
    }
  }, [debouncedContent]);

  const handleClickUser = ({
    user,
    isAdded,
  }: {
    user: User;
    isAdded: boolean;
  }) => {
    if (!isAdded) {
      setCollaborators((prevState) => [...prevState, user]);
    } else {
      const filteredCollborators = collaborators.filter(
        (collborator) => collborator.id != user.id
      );
      setCollaborators(filteredCollborators);
    }
    return;
  };

  return (
    <div className="p-2 border border-outline rounded-md flex flex-col gap-2">
      <div className="flex justify-between">
        {!searchCollaborators.open && (
          <div
            className="border border-input w-fit p-1 cursor-pointer rounded-sm shadow-button flex"
            onClick={() =>
              setSearchCollaborators((prevState) => ({
                ...prevState,
                open: true,
              }))
            }
          >
            <PlusIcon width={20} height={20} className="text-black" />
          </div>
        )}
        {searchCollaborators.open && (
          <input
            type="text"
            className="p-1 border border-input rounded-sm max-h-[30px] outline-none placeholder:text-sm"
            placeholder="Type email of the use..."
            onChange={handleChange}
          />
        )}
        <div className="border border-input w-fit p-1 rounded-sm">
          <p className="text-sm font-medium">Total {collaborators.length}</p>
        </div>
      </div>
      {collboratorsSearch.length > 0 &&
        searchCollaborators.search != null &&
        searchCollaborators.search?.length > 0 && (
          <div className="flex flex-col gap-[2.5px]">
            {collboratorsSearch.map((collaborator) => {
              const isAdded = collaborators.filter(
                (collboratorAdded) => collboratorAdded.id === collaborator.id
              );

              return (
                <UserCollborator
                  collaborator={collaborator}
                  handleClickUser={handleClickUser}
                  isAdded={isAdded}
                />
              );
            })}
          </div>
        )}
      {collaborators.length > 0 && (searchCollaborators.search?.length === 0 || searchCollaborators.search === null) && (
        <div className="flex flex-col gap-[2.5px]">
          {collaborators.map((collaborator) => {
            const isAdded = collaborators.filter(
              (collaboratorAdded) => collaboratorAdded.id === collaborator.id
            );

            return (
              <UserCollborator
                collaborator={collaborator}
                handleClickUser={handleClickUser}
                isAdded={isAdded}
              />
            );
          })}
        </div>
      )}
      {collaborators.length <= 0 &&
        (searchCollaborators.search === null ||
          searchCollaborators.search?.length === 0) && (
          <div className="w-full min-h-24 flex justify-center items-center">
            <p className="font-medium">No collborators yet</p>
          </div>
        )}
    </div>
  );
};

const UserCollborator = ({
  collaborator,
  handleClickUser,
  isAdded
}: {
  collaborator: User;
  handleClickUser: ({
    user,
    isAdded,
  }: {
    user: User;
    isAdded: boolean;
  }) => void;
  isAdded: User[];
}) => {
  return (
    <div className="flex justify-between px-[6px] py-1 rounded-sm hover:bg-white-2-sec transition-colors">
      <div className="flex gap-[6px] select-none">
        <Image
          src={collaborator.avatarUrl ?? ""}
          alt={collaborator.email ?? ""}
          width={20}
          height={20}
          className="rounded-sm"
        />
        <p className="text-sm">
          {collaborator.firstName} {collaborator.lastName}
        </p>
      </div>
      <div className="flex gap-[2.5px]">
        <button
          onClick={() =>
            handleClickUser({
              user: collaborator,
              isAdded: isAdded.length > 0,
            })
          }
        >
          <RouteButton type="hover">
            {isAdded.length > 0 && (
              <Minus width={16} height={16} className="text-grey" />
            )}
            {isAdded.length === 0 && (
              <PlusIcon width={16} height={16} className="text-grey" />
            )}
          </RouteButton>
        </button>
      </div>
    </div>
  );
};

export default CreateDir