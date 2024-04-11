"use client";

import React, { useState } from "react";
import emojiList, { sections } from "@/utils/data/emojis";
import { Emoji as EmojiType } from "@/utils/types/index";
import { ScrollArea } from "../ui/scroll-area";
import { SearchIcon, StarsIcon } from "lucide-react";
import { DirType } from "@/utils/types";
import { useRouter } from "next/navigation";
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
  const [results, setResults] = useState<EmojiType[] | undefined>(undefined);

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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = sections
      .map((section) =>
        emojiList[section.n].filter(
          (emoji) =>
            emoji.n.some((name) => name.toLowerCase().includes(searchTerm))
        )
      )
      .filter((sectionFiltered) => sectionFiltered.length > 0)
      .flat();
    setResults(filtered);
  }

  return (
    <>
      <div className="h-fit p-[10px] pb-0 flex gap-1">
        <div className="p-[5px] bg-white shadow-button rounded-md border-[1px] h-fit  w-full flex items-center gap-[6px] placeholder:text-grey">
          <SearchIcon width={20} height={20} className="text-grey" />
          <input
            type="text"
            className="text-sm outline-none w-full"
            placeholder="Search..."
            onChange={handleOnChange}
          />
        </div>
        <button className="p-[5px] rounded-md bg-white shadow-button border-[1px]">
          <StarsIcon width={20} height={20} className="text-grey" />
        </button>
      </div>
      <ScrollArea className="h-5/6 p-[10px]">
        <div className="flex flex-col gap-5">
          {results && results.length > 0 && (
            <div className="flex flex-col gap-1 relative">
              <div className="w-full bg-white-2 sticky top-0">
                <h1 className="font-medium text-lg">Results</h1>
              </div>
              <div className="grid grid-cols-7 gap-0">
                {results.map((emoji: any) => (
                  <Emoji
                    key={emoji.u}
                    emoji={emoji}
                    handleClick={handleClick}
                  />
                ))}
              </div>
            </div>
          )}
          {sections.map((section: { n: string; t: string }) => (
            <div key={section.n} className="flex flex-col gap-1 relative">
              <div className="w-full bg-white-2 sticky top-0">
                <h1 className="font-medium text-lg">{section.t}</h1>
              </div>
              <div className="grid grid-cols-7 gap-0">
                {emojiList[section.n].map((emoji: any) => (
                  <Emoji
                    key={emoji.u}
                    emoji={emoji}
                    handleClick={handleClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

const Emoji = ({ emoji, handleClick }: { emoji: any; handleClick: (u: string) => void }) => (
  <div className="w-full flex justify-center items-center" onClick={() => handleClick(emoji.u)}>
    <div className="w-fit p-1 hover:bg-white-2-sec-2 transition-colors rounded-md">
      <img
        src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${emoji.u}.png`}
        alt={emoji.u}
        className="h-7 w-7"
        width={28}
        height={28}
        loading="lazy"
      />
    </div>
  </div>
);

export default EmojiPicker;
