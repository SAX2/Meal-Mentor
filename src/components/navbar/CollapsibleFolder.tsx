"use client";

import clsx from "clsx";
import ContextMenu, { ContextMenuOnClick } from "../context-menu/ContextMenu";
import React, { useEffect, useState } from "react";
import { File, Folder } from '@/lib/supabase/supabase.types'
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Route, RouteButton } from "./Route";
import { ChevronDownIcon, GripVerticalIcon, PlusIcon } from "lucide-react";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";
import { getFiles, getFolderDetails } from "@/lib/supabase/queries";

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
  }, []);

  useEffect(() => {
    const getFilesFunction = async () => {
      const { data, error } = await getFiles(folderId);
      if (!error) {
        setFiles(data);
      }
    };
    if (open) {
      getFilesFunction();
    }
  }, [folderData]);

  const onOpenTransition = open ? "" : "rotate-[-90deg]";

  const [filesListRef, fileList] = useDragAndDrop<HTMLUListElement, File>(
    files || [],
    {
      group: "filesListRef",
      plugins: [
        animations({
          duration: 50,
        }),
      ],
    }
  );

  return (
    <Collapsible onOpenChange={setOpen}>
      <div className="px-2">
        <ContextMenu type="folder" id={folderData?.id}>
          <Route
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
                  <PlusIcon width={14} height={14} color="grey" />
                </RouteButton>
              </>
            }
          >
            {folderData?.title}
          </Route>
        </ContextMenu>
      </div>
      <CollapsibleContent>
        <ul className="flex flex-col gap-[2.5px] px-2" ref={filesListRef}>
          {fileList.map((file) => {
            return (
              <li key={file.id} className="item">
                <ContextMenu type="file" id={file.id}>
                  <Route
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
                      <>
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
                      </>
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
