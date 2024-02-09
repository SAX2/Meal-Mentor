import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import EmojiPicker from "./EmojiPicker";

const EmojiRoute = ({ icon }: { icon: string }) => {
  return (
    <Popover>
      <PopoverTrigger className="w-5 h-5 hover:bg-white-2-sec-2 flex justify-center items-center transition-colors ease-in-out duration-150 rounded-md">
        <img
          src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${icon}.png`}
          alt={icon}
          className="w-4 h-4"
        />
      </PopoverTrigger>
      <PopoverContent className="h-[200px] ml-6">
        <EmojiPicker />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiRoute;
