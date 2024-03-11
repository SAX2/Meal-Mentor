'use client'

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDown } from "lucide-react";

interface SelectorDropdownProps {
  defaultValue: any;
  items: any[];
}

const SelectorDropdown: React.FC<SelectorDropdownProps> = ({
  defaultValue,
  items,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    option.function();
  };

  return (
    <Popover>
      <PopoverTrigger className="!w-fit !flex items-center !shadow-none hover:!bg-white-2-sec rounded-sm">
        <div className="flex items-center gap-1">
          {selectedOption ? (
            <div className="flex gap-1 items-center">
              {selectedOption.icon ? (
                selectedOption.icon
              ) : (
                <p
                  className={`cursor-pointer select-none ${
                    selectedOption.value == "monospace"
                      ? "font-mono"
                      : selectedOption.value == "serif" && "font-serif"
                  }`}
                >
                  {selectedOption.value}
                </p>
              )}
              <ChevronDown width={14} height={14} className="text-grey" />
            </div>
          ) : (
            <div>Select</div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="shadow-pop w-fit mt-1 p-1">
        <div className="rounded-md flex flex-col">
          {!!items.length &&
            items.map((option: any) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className="p-1 hover:bg-white-2-sec rounded-sm transition-colors"
              >
                {option.icon ? (
                  option.icon
                ) : (
                  <p
                    className={`cursor-pointer select-none ${
                      option.value == "monospace"
                        ? "font-mono"
                        : option.value == "serif" && "font-serif"
                    }`}
                  >
                    {option.value}
                  </p>
                )}
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SelectorDropdown;