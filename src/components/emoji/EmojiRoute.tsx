import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import EmojiPicker from "./EmojiPicker";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { DirType } from "@/utils/types";

interface EmojiRouteProps {
  icon: string | undefined;
  customSize?: string;
  dirType?: DirType;
}

const EmojiRoute: React.FC<EmojiRouteProps> = ({ icon, customSize, dirType }) => {
  return (
    <Popover>
      <PopoverTrigger className={clsx("hover:bg-white-2-sec-2 flex justify-center items-center transition-colors ease-in-out duration-150 rounded-md w-fit h-fit p-[2.5px]")}>
        <img
          src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${icon}.png`}
          alt={icon}
          className={customSize ? cn(customSize, 'select-none') : 'w-4 h-4 select-none'}
          width={16}
          height={16}
          loading="eager"
        />
      </PopoverTrigger>
      <PopoverContent className="h-[200px] ml-6 p-0 bg-white-2 shadow-pop">
        <EmojiPicker dirType={dirType ?? "file"}/>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiRoute;
