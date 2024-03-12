'use client'

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDown, Paintbrush, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectorDropdownProps {
  defaultValue: any;
  items: any[];
  classname?: string;
  quill: any;
}

const SelectorDropdown: React.FC<SelectorDropdownProps> = ({
  defaultValue,
  items,
  classname,
  quill
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleSelect = (option: any) => {
    setSelectedOption(option);
  
    if (option.content === 'font' || option.content === 'align' || option.content === 'header') {
      return quill.format(option.content, option.value);
    }

    if (option.content === 'color' || option.content === 'background') {
      return quill.format(option.content, option.value.hex);
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="!w-fit !flex items-center !shadow-none hover:!bg-white-2-sec rounded-sm">
        <div className={cn("flex items-center gap-1", classname)}>
          {selectedOption ? (
            <div className="flex gap-1 items-center">
              {(selectedOption.content === "align" || selectedOption.content === "header" ) && <>{selectedOption.icon}</>}
              {selectedOption.content === "font" && (
                <p
                  className={`cursor-pointer select-none ${
                    selectedOption.value == "monospace"
                      ? "font-mono"
                      : selectedOption.value == "serif" && "font-serif"
                  }`}
                >
                  {selectedOption.value.length <= 0
                    ? "Sans Serif"
                    : selectedOption.value}
                </p>
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
                className="p-1 hover:bg-white-2-sec rounded-sm transition-colors"
              >
                {(option.content === "align" || option.content === "header" ) && <>{option.icon}</>}
                {option.content === "font" && (
                  <p
                    className={`cursor-pointer select-none ${
                      option.value == "monospace"
                        ? "font-mono"
                        : option.value == "serif" && "font-serif"
                    }`}
                  >
                    {option.value.length <= 0 ? "Sans Serif" : option.value}
                  </p>
                )}
                {(option.content === "color" ||
                  option.content === "background") && (
                  <div
                    className={`w-4 h-4 rounded-full bg-[${option.value.hex}] border border-black/10 cursor-pointer`}
                  ></div>
                )}
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SelectorDropdown;