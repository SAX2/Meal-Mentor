"use client";

import { File, Folder } from "@/utils/data";
import React, { useState } from "react";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Route, RouteButton } from "./Route";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import clsx from "clsx";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
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

  return (
    <Collapsible onOpenChange={setOpen}>
      <div className="px-2">
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
      </div>
      <CollapsibleContent>
        <div className="flex flex-col gap-[2.5px] px-2 pl-8">
          {filesFolder.map((file) => {
            return (
              <Route
                picker
                key={file.id}
                isLink
                path={`/dashboard/${file.folder_id}/${file.id}`}
                right={
                  <>
                    <RouteButton type="hidden" className="z-[1000] relative">
                      <DotsHorizontalIcon width={14} height={14} color="grey" />
                    </RouteButton>
                  </>
                }
                icon={file.icon_id}
              >
                {file.title}
              </Route>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleFolder;
