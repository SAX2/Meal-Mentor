'use client';

import { File, Folder } from "@/utils/data"
import React, { useState } from "react"
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { Route, RouteButton } from "./Route";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import clsx from "clsx";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { functions } from "@/utils/data/data";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
interface CollapsibleFolderProps {
  files: File[];
  folder: Folder;
}

const CollapsibleFolder: React.FC<CollapsibleFolderProps> = ({
  files,
  folder,
}) => {
  const [open, setOpen] = useState(false)

  const onOpenTransition = open ? '' : 'rotate-[-90deg]';

  const filesFolder = files.filter((file) => file.folder_id === folder.id);

  return (
    <Collapsible onOpenChange={setOpen}>
      <CollapsibleTrigger className="w-full px-2">
        <Route
          isLink={false}
          path={`/dashboard/${folder.id}`}
          icon={folder.icon_id}
          left={
            <RouteButton fixed={false}>
              <ChevronDownIcon
                width={14}
                height={14}
                color="grey"
                className={clsx(onOpenTransition, "transition-all")}
              />
            </RouteButton>
          }
          right={
            <>
              <RouteButton fixed={false} hidden className="z-[1000] relative">
                <DotsHorizontalIcon width={14} height={14} color="grey" />
              </RouteButton>
              <RouteButton fixed={false} hidden>
                <PlusIcon width={14} height={14} color="grey" />
              </RouteButton>
            </>
          }
        >
          {folder.title}
        </Route>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-[2.5px] px-2 pl-8">
          {filesFolder.map((file) => {
            return (
              <Route
                isLink
                path={`/dashboard/${
                  functions.filter((func) => func.id === file.function_id)[0].id
                }`}
                right={
                  <>
                    <RouteButton
                      fixed={false}
                      hidden
                      className="z-[1000] relative"
                    >
                      <DotsHorizontalIcon width={14} height={14} color="grey" />
                    </RouteButton>
                    <RouteButton fixed={false} hidden>
                      <PlusIcon width={14} height={14} color="grey" />
                    </RouteButton>
                  </>
                }
              >
                {
                  functions.filter((func) => func.id === file.function_id)[0]
                    .title
                }
              </Route>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleFolder;