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

interface ContextMenuProps {
  children: React.ReactNode;
  type: OptionsContextTypes;
  id: string | null;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ children, type }) => {
  return (
    <Menu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className='p-0 bg-white-2 shadow-pop rounded-sm'>
        {type == "file" && <ContextMenuFile />}
        {type == "folder" && <ContextMenuFolder />}
        {type == "navbar" && <ContextMenuFile />}
      </ContextMenuContent>
    </Menu>
  );
};

const RenderContextMenu = ({ type }: { type: OptionsContextTypes }) => {
  return (
    <>
      {options_context
        .filter((o) => o.type === type)[0]
        ?.group?.map((group, index) => {
          return (
            <>
              <ContextMenuGroup className="flex flex-col gap-0 p-[5px]">
                {group._?.map((option) => {
                  return (
                    <ContextMenuItem content={option}>
                      <ContextMenuButton
                        key={`${option.title}_${Math.random() * 40}`}
                      >
                        {option.icon && (
                          <div className="text-black">{option.icon}</div>
                        )}
                        {option.title}
                      </ContextMenuButton>
                    </ContextMenuItem>
                  );
                })}
              </ContextMenuGroup>
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

const ContextMenuFile = () => {
  const lastUpdateText = 'Last time updated by Santino Degra at'
  const lastUpdateDate = '31 may 2023, 23:31'


  return (
    <div className="flex flex-col w-[200px]">
      <RenderContextMenu type="file" />
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

const ContextMenuFolder = () => {
  const lastUpdateText = 'Last time updated by Santino Degra at'
  const lastUpdateDate = '31 may 2023, 23:31'

  return (
    <div className="flex flex-col w-[200px]">
      <RenderContextMenu type="folder" />
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
