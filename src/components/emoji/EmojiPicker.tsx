import React from "react";
import emojis from "@/utils/data/emojis.json";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { SearchIcon, StarsIcon } from "lucide-react";

const EmojiPicker = () => {
  return (
    <>
      <div className="h-fit p-[10px] pb-0 flex gap-1">
        <div className="p-[5px] bg-white shadow-button rounded-md border-[1px] h-fit  w-full flex items-center gap-[6px] placeholder:text-grey">
          <SearchIcon width={20} height={20} className="text-grey" />
          <input type="text" className="text-sm outline-none w-full" placeholder="Search..." />
        </div>
        <button className="p-[5px] rounded-md bg-white shadow-button border-[1px]">
          <StarsIcon width={20} height={20} className="text-grey" />
        </button>
      </div>
      <ScrollArea className="h-4/5 p-[10px]">
        <div className="grid grid-cols-8 gap-0">
          {emojis.map((emoji: string) => {
            return (
              <div className="w-full flex justify-center items-center" key={emoji}>
                <div className="w-fit p-1 hover:bg-white-2-sec-2 transition-colors rounded-md">
                  <Image
                    src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${emoji}.png`}
                    alt={emoji}
                    className="h-6 w-6"
                    width={24}
                    height={24}
                    loading="lazy"
                    quality={80}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
};

export default EmojiPicker;
