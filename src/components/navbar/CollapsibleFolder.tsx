"use client";

import clsx from "clsx";
import ContextMenu from "../context-menu/ContextMenu";
import React, { useState } from "react";
import { File, Folder } from "@/utils/data";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Route, RouteButton } from "./Route";
import { ChevronDownIcon, GripVerticalIcon, PlusIcon } from "lucide-react";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";

interface CollapsibleFolderProps {
  files: File[];
  folder: Folder;
}

const CollapsibleFolder: React.FC<CollapsibleFolderProps> = ({
  files,
  folder,
}) => {
  const [open, setOpen] = useState(false);

  const onOpenTransition = open ? "" : "rotate-[-90deg]";

  const filesFolder = files.filter((file) => file.folder_id === folder.id);

  const [filesListRef, fileList] = useDragAndDrop<HTMLUListElement, File>(
    filesFolder,
    {
      group: "filesListRef",
      plugins: [animations({
        duration: 50
      })],
    }
  );

  return (
    <Collapsible onOpenChange={setOpen}>
      <div className="px-2">
        <ContextMenu type="folder" id={folder.id}>
          <Route
            picker
            isLink
            path={`/dashboard/${folder.id}`}
            icon={folder.icon_id}
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
                <RouteButton type="hidden" className="">
                  <DotsHorizontalIcon width={14} height={14} color="grey" />
                </RouteButton>
                <RouteButton type="hidden">
                  <PlusIcon width={14} height={14} color="grey" />
                </RouteButton>
              </>
            }
          >
            {folder.title}
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
                    picker
                    isLink
                    path={`/dashboard/${file.folder_id}/${file.id}`}
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
                    icon={file.icon_id}
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
