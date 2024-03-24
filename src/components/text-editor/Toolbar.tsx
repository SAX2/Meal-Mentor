import { type ToolbarOption, type ToolbarOptions } from '@/utils/types/index'
import { type Editor } from "@tiptap/react";
import React from 'react'
import SelectorDropdown from './ToolbarItemSelector';
import clsx from 'clsx';

interface ToolbarProps {
  options: ToolbarOptions[];
  editor: Editor | null;
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
                          option={toolbarItem}
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
  disabled,
  noHover,
  editor,
  option
}: {
  disabled?: boolean;
  noHover?: boolean;
  editor: Editor;
  option: any;
}) => {
  return (
    <>
      {editor && (
        <button
          className={clsx(
            "outline-0 rounded-sm p-1",
            noHover ? "hover:!bg-none" : "hover:!bg-white-2-sec",
            editor.isActive(option.content, { level: option.value }) &&
              "bg-white-2-sec"
          )}
          disabled={disabled}
          value={option.value}
          onClick={(e) => {
            e.preventDefault();
            option.function(editor);
          }}
        >
          {option.icon && option.icon}
        </button>
      )}
    </>
  );
};


export default Toolbar