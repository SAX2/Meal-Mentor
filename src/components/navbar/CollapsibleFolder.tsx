"use client";

import clsx from "clsx";
import ContextMenu, { ContextMenuOnClick } from "../context-menu/ContextMenu";
import React, { useEffect, useState } from "react";
import { File, Folder } from '@/lib/supabase/supabase.types'
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Route, RouteButton, routeClassname } from "./Route";
import { ChevronDownIcon, GripVerticalIcon, PlusIcon } from "lucide-react";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { getFiles } from "@/lib/supabase/queries";
import CreateDir from "../dialog/CreateDirDialog";
import { cn } from "@/lib/utils";

interface CollapsibleFolderProps {
  folderId: string;
  folder: Folder;
  userId: string;
}

const CollapsibleFolder: React.FC<CollapsibleFolderProps> = ({
  folderId,
  folder,
  userId
}) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[] | null>(null);
  const [folderData, setFolderData] = useState<Folder | null>(null);

  useEffect(() => {
    setFolderData(folder);
  }, [folder]);

  useEffect(() => {
    const getFilesFunction = async () => {
      console.log('asd')
      const { data, error } = await getFiles(folderId);
      if (!error) {
        setFiles(data);
      }
    };
    getFilesFunction();
  }, [folderId]);

  const onOpenTransition = open ? "" : "rotate-[-90deg]";

  return (
    <Collapsible onOpenChange={setOpen}>
      <div className="px-2">
        <ContextMenu type="folder" id={folderData?.id}>
          <Route
            id={folderData?.id}
            dirType="folder"
            picker
            isLink
            path={`/dashboard/${folderData?.id}`}
            icon={folderData?.iconId}
            left={
              <CollapsibleTrigger>
                <RouteButton type="hover">
                  <ChevronDownIcon
                    width={14}
                    height={14}
                    color="grey"
                    className={clsx(onOpenTransition, "transition-all")}
                  />
                </RouteButton>
              </CollapsibleTrigger>
            }
            right={
              <>
                <ContextMenuOnClick type="folder" id={folderData?.id}>
                  <RouteButton type="hidden" className="">
                    <DotsHorizontalIcon width={14} height={14} color="grey" />
                  </RouteButton>
                </ContextMenuOnClick>
                <RouteButton type="hidden">
                  <CreateDir userId={userId} dirType="file" id={folderData?.id}>
                    <PlusIcon width={14} height={14} color="grey" />
                  </CreateDir>
                </RouteButton>
              </>
            }
          >
            {folderData?.title}
          </Route>
        </ContextMenu>
      </div>
      <CollapsibleContent>
        <ul className="flex flex-col gap-[2.5px] px-2">
          {files?.length === 0 && (
            <CreateDir userId={userId} dirType="file" classname="w-full">
              <Route
                isLink={false}
                path=""
                icon={<PlusIcon width={16} height={16} className="text-grey" />}
                iconType="SVG"
                left={
                  <div className="opacity-0">
                    <RouteButton type="hidden" className="z-[1000] relative">
                      <GripVerticalIcon width={14} height={14} color="grey" />
                    </RouteButton>
                  </div>
                }
              >
                <p className="text-grey">Add new file</p>
              </Route>
            </CreateDir>
          )}
          {files &&
            files.map((file) => {
              return (
                <li key={file.id} className="item">
                  <ContextMenu type="file" id={file.id}>
                    <Route
                      id={file.id}
                      dirType="file"
                      picker
                      isLink
                      path={`/dashboard/${file.folderId}/${file.id}`}
                      left={
                        <div className="opacity-0">
                          <RouteButton
                            type="hidden"
                            className="z-[1000] relative"
                          >
                            <GripVerticalIcon
                              width={14}
                              height={14}
                              color="grey"
                            />
                          </RouteButton>
                        </div>
                      }
                      right={
                        <ContextMenuOnClick type="file" id={file.id}>
                          <RouteButton
                            type="hidden"
                            className="z-[1000] relative"
                          >
                            <DotsHorizontalIcon
                              width={14}
                              height={14}
                              color="grey"
                            />
                          </RouteButton>
                        </ContextMenuOnClick>
                      }
                      icon={file.iconId}
                      key={file.id}
                    >
                      {file.title}
                    </Route>
                  </ContextMenu>
                </li>
              );
            })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleFolder;
