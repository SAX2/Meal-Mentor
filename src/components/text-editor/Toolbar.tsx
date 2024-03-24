import { ToolbarOptions } from '@/utils/data/data'
import React from 'react'
import SelectorDropdown from './ToolbarItemSelector';
import clsx from 'clsx';

interface ToolbarProps {
  options: ToolbarOptions[];
  editor: any;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor, options }) => {
  return (
    <>
      {editor && (
        <div className="z-[99] sticky top-16 w-full">
          <div className="flex flex-wrap items-center bg-white/80 backdrop-blur-xl rounded-md shadow-button border border-outline w-fit h-fit">
            {options.map((toolbarGroup, index) => {
              if (toolbarGroup.type === "button") {
                return (
                  <ul
                    key={`${toolbarGroup.type}_${index}`}
                    className={`flex p-1 border-r gap-1`}
                  >
                    {toolbarGroup.items.map((toolbarItem) => {
                      return (
                        <ToolbarItem
                          key={
                            toolbarItem.value
                              ? toolbarItem.value.toString()
                              : toolbarItem.content
                          }
                          type={toolbarItem.content}
                          value={
                            toolbarItem.value && toolbarItem.value.toString()
                          }
                          icon={toolbarItem.icon}
                          item={toolbarItem}
                          editor={editor}
                        />
                      );
                    })}
                  </ul>
                );
              }

              if (toolbarGroup.type === "select") {
                return (
                  <ul
                    key={`${toolbarGroup.type}_${index}`}
                    className={`flex p-1 border-r gap-1`}
                  >
                    <SelectorDropdown
                      defaultValue={toolbarGroup.items[0]}
                      items={toolbarGroup.items}
                      editor={editor}
                    />
                  </ul>
                );
              }
              return;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export const ToolbarItem = ({
  type,
  value,
  disabled,
  noHover,
  icon,
  editor,
  item
}: {
  type: string;
  value?: string;
  disabled?: boolean;
  noHover?: boolean;
  icon?: React.ReactElement;
  editor: any;
  item: any;
}) => {
  return (
    <button
      className={clsx(
        "outline-0 rounded-sm p-1",
        noHover ? "hover:!bg-none" : "hover:!bg-white-2-sec",
        editor.isActive(type) && "bg-white-2-sec"
      )}
      disabled={disabled}
      value={value}
      onClick={() => item.function(editor)}
    >
      {icon && icon}
    </button>
  );
};



export default Toolbar