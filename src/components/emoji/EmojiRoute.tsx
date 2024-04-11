"use client"

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import EmojiPicker from "./EmojiPicker";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { DirType } from "@/utils/types";
import Image from "next/image";

interface EmojiRouteProps {
  icon: string | undefined;
  customSize?: string;
  dirType?: DirType;
  id: string;
  pickOnly?: boolean;
  setOnClick?: (emoji: string) => void;
}

const EmojiRoute: React.FC<EmojiRouteProps> = ({ icon, customSize, dirType, id, pickOnly, setOnClick }) => {
  return (
    <Popover>
      <PopoverTrigger className={clsx("hover:bg-white-2-sec-2 flex justify-center items-center transition-colors ease-in-out duration-150 rounded-md w-fit h-fit p-[2.5px]")}>
        <img
          src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${icon}.png`}
          alt={icon ?? ""}
          className={customSize ? cn(customSize, 'select-none') : 'w-4 h-4 select-none'}
          width={16}
          height={16}
          loading="eager"
        />
      </PopoverTrigger>
      <PopoverContent className="h-[250px] ml-6 p-0 bg-white-2 shadow-pop">
        <EmojiPicker dirType={dirType ?? "file"} id={id} pickOnly={pickOnly} onClickFuntion={(emoji) => setOnClick && setOnClick(emoji)}/>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiRoute;
