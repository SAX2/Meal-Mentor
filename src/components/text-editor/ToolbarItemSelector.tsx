'use client'

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDown, Paintbrush, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import clsx from "clsx";

interface SelectorDropdownProps {
  defaultValue: any;
  items: any[];
  classname?: string;
  editor: any;
}

const SelectorDropdown: React.FC<SelectorDropdownProps> = ({
  defaultValue,
  items,
  classname,
  editor
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    option.function(editor);
  };

  return (
    <Popover>
      <PopoverTrigger className="outline-0 rounded-sm p-1 hover:bg-white-2-sec">
        <div className={cn("flex items-center gap-1", classname)}>
          {selectedOption ? (
            <div className="flex gap-1 items-center">
              {selectedOption.content === "align" && selectedOption.icon}
              {(selectedOption.content === "textStyle" ||
                selectedOption.content === "heading") && (
                <FontFamily option={selectedOption} />
              )}
              {selectedOption.content === "color" && (
                <Palette width={18} height={18} className="text-black" />
              )}
              {selectedOption.content === "background" && (
                <Paintbrush width={18} height={18} className="text-black" />
              )}
              <ChevronDown width={14} height={14} className="text-grey" />
            </div>
          ) : (
            <div>Select</div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="shadow-pop w-fit mt-1 p-1">
        <div
          className={cn(
            "rounded-md",
            items[0].content === "color" || items[0].content === "background"
              ? "grid grid-cols-3 gap-1"
              : "flex flex-col"
          )}
        >
          {!!items.length &&
            items.map((option: any) => (
              <div
                key={option.value.content || option.value}
                onClick={() => handleSelect(option)}
                className={clsx(
                  "p-1 hover:bg-white-2-sec rounded-sm transition-colors",
                  editor.isActive(option.content, {
                    fontFamily: option.value,
                    textAlign: option.value,
                  }) && "bg-white-2-sec"
                )}
              >
                {option.content === "align" && option.icon}
                {(option.content === "textStyle" ||
                  option.content === "heading" ||
                  option.content === "fontSize") && (
                  <FontFamily option={option} />
                )}
                {(option.content === "color" ||
                  option.content === "background") && (
                  <ColoPicker option={option} />
                )}
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const FontFamily = ({ option }: { option: any }) => {
  return (
    <p
      className={clsx(
        `cursor-pointer select-none text-sm`,
        option.value == "sans serif" && "font-sans",
        option.value == "serif" && "font-serif",
        option.value == "monospace" && "font-mono"
      )}
    >
      {option.content === 'heading' ? option.title : option.value}
    </p>
  );
}

const ColoPicker = ({ option }: { option: any }) => {
  return (
    <div
      className={clsx(
        "w-4 h-4 rounded-full border border-black/10 cursor-pointer",
        `!bg-[${option.value.hex}]`
      )}
    ></div>
  );
};

export default SelectorDropdown;