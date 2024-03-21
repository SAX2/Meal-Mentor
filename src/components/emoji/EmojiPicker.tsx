"use client";

import React from "react";
import emojis from "@/utils/data/emojis.json";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { SearchIcon, StarsIcon } from "lucide-react";
import { DirType } from "@/utils/types";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { updateFileData, updateFolderData } from "@/lib/supabase/queries";

const EmojiPicker = ({
  dirType,
  id,
  pickOnly,
  onClickFuntion
}: {
  dirType: DirType;
  id: string;
  pickOnly?: boolean;
  onClickFuntion?: (emoji: string) => void;
}) => {
  const router = useRouter();

  const handleClick = (emoji: string) => {
    if (!emoji || emoji.length === 0) return;

    if (pickOnly && onClickFuntion) {
      return onClickFuntion(emoji);
    }

    if (dirType === "folder") {
      updateFolderData({ folderId: id, data: { iconId: emoji } });
      return router.refresh();
    }
    if (dirType === "file") {
      updateFileData({ fileId: id, data: { iconId: emoji } });
      return router.refresh();
    }
  };

  return (
    <>
      <div className="h-fit p-[10px] pb-0 flex gap-1">
        <div className="p-[5px] bg-white shadow-button rounded-md border-[1px] h-fit  w-full flex items-center gap-[6px] placeholder:text-grey">
          <SearchIcon width={20} height={20} className="text-grey" />
          <input
            type="text"
            className="text-sm outline-none w-full"
            placeholder="Search..."
          />
        </div>
        <button className="p-[5px] rounded-md bg-white shadow-button border-[1px]">
          <StarsIcon width={20} height={20} className="text-grey" />
        </button>
      </div>
      <ScrollArea className="h-4/5 p-[10px]">
        <div className="grid grid-cols-8 gap-0">
          {emojis.map((emoji: string) => {
            return (
              <div
                className="w-full flex justify-center items-center"
                key={emoji}
                onClick={() => handleClick(emoji)}
              >
                <div className="w-fit p-1 hover:bg-white-2-sec-2 transition-colors rounded-md">
                  <img
                    src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${emoji}.png`}
                    alt={emoji}
                    className="h-6 w-6"
                    width={24}
                    height={24}
                    loading="lazy"
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
