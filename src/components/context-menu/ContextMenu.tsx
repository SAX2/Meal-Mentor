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
import { Separator } from '../ui/separator';
import { OptionContext, OptionsContextTypes } from "@/utils/data";
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface ContextMenuProps {
  children: React.ReactNode;
  type: OptionsContextTypes;
  id?: string;
}

type typeOfRender = 'popover' | 'context'

const ContextMenu: React.FC<ContextMenuProps> = ({ children, type, id }) => {
  return (
    <Menu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="p-0 bg-white-2 shadow-pop rounded-sm">
        {type == "file" && <ContextMenuFile type="context" id={id} />}
        {type == "folder" && <ContextMenuFolder type="context" id={id} />}
        {type == "navbar" && <ContextMenuFile type="context" id={id} />}
      </ContextMenuContent>
    </Menu>
  );
};

export const ContextMenuOnClick: React.FC<ContextMenuProps> = ({ children, type, id }) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="p-0 bg-white-2 shadow-pop rounded-sm w-fit">
        {type == "file" && <ContextMenuFile type="popover" id={id} />}
        {type == "folder" && <ContextMenuFolder type="popover" id={id} />}
        {type == "navbar" && <ContextMenuFile type="popover" id={id} />}
      </PopoverContent>
    </Popover>
  );
}

const RenderContextMenu = ({ type, typeOfRender, id }: { type: OptionsContextTypes, typeOfRender: typeOfRender, id?: string }) => {
  return (
    <>
      {options_context
        .filter((o) => o.type === type)[0]
        ?.group?.map((group, index) => {
          return (
            <>
              {typeOfRender == "context" && (
                <ContextMenuGroup
                  className="flex flex-col gap-0 p-[5px]"
                  key={index}
                >
                  {group._?.map((option) => {
                    return (
                      <div onClick={() => option.function && option.function(id ? id : '')}>
                        <ContextMenuItem
                          content={option}
                          key={`${option.title}_${Math.random() * 40}`}
                        >
                          <ContextMenuButton>
                            {option.icon && (
                              <div className="text-black">{option.icon}</div>
                            )}
                            {option.title}
                          </ContextMenuButton>
                        </ContextMenuItem>
                      </div>
                    );
                  })}
                </ContextMenuGroup>
              )}
              {typeOfRender == "popover" && (
                <div
                  className="flex flex-col gap-0 p-[5px]"
                  key={index}
                >
                  {group._?.map((option) => {
                    return (
                      <div
                        key={`${option.title}_${Math.random() * 40}`}
                      >
                        <ContextMenuButton>
                          {option.icon && (
                            <div className="text-black">{option.icon}</div>
                          )}
                          {option.title}
                        </ContextMenuButton>
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
}

const ContextMenuFile = ({ type, id }: { type: typeOfRender, id?: string }) => {
  const lastUpdateText = 'Last time updated by Santino Degra at'
  const lastUpdateDate = '31 may 2023, 23:31'


  return (
    <div className="flex flex-col w-[200px]">
      <RenderContextMenu type="file" typeOfRender={type} id={id} />
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

const ContextMenuFolder = ({ type, id }: { type: typeOfRender, id?: string }) => {
  const lastUpdateText = 'Last time updated by Santino Degra at'
  const lastUpdateDate = '31 may 2023, 23:31'

  return (
    <div className="flex flex-col w-[200px]">
      <RenderContextMenu type="folder" typeOfRender={type} id={id} />
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