import React from 'react'
import {
  ContextMenu as Menu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "../ui/context-menu";
import { options_context } from '@/utils/data/data';
import { DirType } from '@/utils/types';
import { Separator } from '../ui/separator';
import { OptionContext, OptionsContextTypes } from "@/utils/types";
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useRouter } from 'next/navigation';
import EditTitleDialog from '../dialog/EditTitleDialog';
import CreateDir from '../dialog/CreateDirDialog';
import { useUser } from '@clerk/nextjs';

interface ContextMenuProps {
  children: React.ReactNode;
  type: OptionsContextTypes;
  id?: string;
  collaborator: boolean;
}

interface RenderContextMenupProps {
  type: OptionsContextTypes;
  typeOfRender: typeOfRender;
  dirType: DirType;
  id?: string;
  collaborating: boolean;
}

type typeOfRender = 'popover' | 'context'

const ContextMenu: React.FC<ContextMenuProps> = ({ children, type, id, collaborator }) => {
  return (
    <Menu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="p-0 bg-white-2 shadow-pop rounded-sm z-[200]">
        {type == "file" && <ContextMenuFile type="context" id={id} collaborating={collaborator} />}
        {type == "folder" && <ContextMenuFolder type="context" id={id} collaborating={collaborator} />}
        {type == "navbar" && <ContextMenuFile type="context" id={id} collaborating={collaborator} />}
      </ContextMenuContent>
    </Menu>
  );
};

export const ContextMenuOnClick: React.FC<ContextMenuProps> = ({ children, type, id, collaborator }) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="p-0 bg-white-2 shadow-pop rounded-sm w-fit !z-[200]">
        {type == "file" && <ContextMenuFile type="popover" id={id} collaborating={collaborator} />}
        {type == "folder" && <ContextMenuFolder type="popover" id={id} collaborating={collaborator} />}
        {type == "navbar" && <ContextMenuFile type="popover" id={id} collaborating={collaborator} />}
      </PopoverContent>
    </Popover>
  );
}

const RenderContextMenu: React.FC<RenderContextMenupProps> = ({
  type,
  typeOfRender,
  id,
  dirType,
  collaborating = false,
}) => {
  const router = useRouter();
  const { user } = useUser();

  const handleClick = (fn: any) => {
    if (typeof fn === "function") {
      fn();
      router.refresh();
    }
  };

  const options = collaborating
    ? options_context?.filter((o) => o.type === "folder-collaborator")[0]
    : options_context?.filter((o) => o.type === type)[0];

  return (
    <>
      {options.group?.map((group, index) => {
          return (
            <>
              {typeOfRender == "context" && (
                <ContextMenuGroup
                  className="flex flex-col gap-0 p-[5px]"
                  key={index}
                >
                  {group._?.map((option) => {
                    const renderContent = (
                      <div
                        onClick={() =>
                          handleClick(
                            () =>
                              option.function && option.function(id ? id : "")
                          )
                        }
                        key={`${option.title}_${Math.random() * 40}`}
                      >
                        <ContextMenuItem content={option}>
                          <ContextMenuButton>
                            {option.icon && (
                              <div className="text-black">{option.icon}</div>
                            )}
                            {option.title}
                          </ContextMenuButton>
                        </ContextMenuItem>
                      </div>
                    );

                    if (option.modal == "create-file") {
                      return (
                        <CreateDir
                          dirType="file"
                          userId={user?.id ?? ""}
                          id={id}
                          key={`${option.modal}-${id}`}
                        >
                          {renderContent}
                        </CreateDir>
                      );
                    }

                    if (option.modal == "edit-title")
                      return (
                        <EditTitleDialog
                          dirType={dirType}
                          id={id ?? ""}
                          key={`${option.modal}-${id}`}
                        >
                          {renderContent}
                        </EditTitleDialog>
                      );

                    return renderContent;
                  })}
                </ContextMenuGroup>
              )}
              {typeOfRender == "popover" && (
                <div className="flex flex-col gap-0 p-[5px]" key={index}>
                  {group._?.map((option) => {
                    const renderContent = (
                      <ContextMenuButton>
                        {option.icon && (
                          <div className="text-black">{option.icon}</div>
                        )}
                        {option.title}
                      </ContextMenuButton>
                    );

                    if (option.modal == "create-file") {
                      return (
                        <CreateDir
                          dirType="file"
                          userId={user?.id ?? ""}
                          id={id}
                          key={`${option.modal}-${id}`}
                        >
                          {renderContent}
                        </CreateDir>
                      );
                    }

                    if (option.modal === 'edit-title') {
                      return (
                        <EditTitleDialog
                          dirType={dirType}
                          id={id ?? ""}
                          key={`${option.modal}-${id}`}
                        >
                          {renderContent}
                        </EditTitleDialog>
                      );
                    }

                    return (
                      <div
                        onClick={() =>
                          handleClick(
                            () =>
                              option.function && option.function(id ? id : "")
                          )
                        }
                        key={`${option.title}_${Math.random() * 40}`}
                      >
                        {renderContent}
                      </div>
                    );
                  })}
                </div>
              )}
              {index !==
                options_context.filter((o) => o.type === "file")[0]?.group
                  ?.length -
                  1 && <Separator />}
            </>
          );
        })}
    </>
  );
};

const ContextMenuFile = ({ type, id, collaborating }: { type: typeOfRender, id?: string, collaborating: boolean, }) => {
  const lastUpdateText = 'Last time updated by Santino Degra at'
  const lastUpdateDate = '31 may 2023, 23:31'


  return (
    <div className="flex flex-col w-[200px]">
      <RenderContextMenu type="file" typeOfRender={type} id={id} dirType='file' collaborating={collaborating} />
      <Separator />
      <div className="p-[5px]">
        <p className="text-xs text-grey p-[6px]">
          {lastUpdateText}
          <span className="font-semibold">{lastUpdateDate}</span>
        </p>
      </div>
    </div>
  );
}

const ContextMenuFolder = ({ type, id, collaborating }: { type: typeOfRender, id?: string, collaborating: boolean, }) => {
  const lastUpdateText = 'Last time updated by Santino Degra at'
  const lastUpdateDate = '31 may 2023, 23:31'

  return (
    <div className="flex flex-col w-[200px]">
      <RenderContextMenu type="folder" typeOfRender={type} id={id} dirType='folder' collaborating={collaborating}/>
      <Separator />
      <div className="p-[5px]">
        <p className="text-xs text-grey p-[6px]">
          {lastUpdateText}{" "}
          <span className="font-semibold">{lastUpdateDate}</span>
        </p>
      </div>
    </div>
  );
}

const ContextMenuItem = ({ children, content }: { children: React.ReactNode, content: OptionContext }) => {
  return (
    <>
      {!content._ && children}
      {content._ && (
        <ContextMenuSub>
          <ContextMenuSubTrigger className="p-0 cursor-pointer hover:bg-white-2-sec rounded-md text-md flex data-[state=open]:bg-white-2-sec focus:text-black focus:bg-white-2-sec">
            {children}
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="p-0 bg-white-2 shadow-pop rounded-sm">
            <ContextMenuGroup className="flex flex-col gap-0 p-[5px]">
              {content._.map((option) => {
                return (
                  <ContextMenuButton
                    key={`${option.title}_${Math.random() * 40}`}
                  >
                    {option.icon && (
                      <div className="text-black">{option.icon}</div>
                    )}
                    {option.title}
                  </ContextMenuButton>
                );
              })}
            </ContextMenuGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
      )}
    </>
  );
}

const ContextMenuButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-[6px] py-1 cursor-pointer hover:bg-white-2-sec rounded-md text -md flex gap-[6px] items-center">
      {children}
    </div>
  );
};

export default ContextMenu;