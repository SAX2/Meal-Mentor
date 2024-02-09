import React from "react";
import emojis from "@/utils/data/emojis.json";
import Image from "next/image";

const EmojiPicker = () => {
  return (
    <div className="grid grid-cols-5">
      {emojis.map((emoji: string) => {
        return (
          <Image
            src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${emoji}.png`}
            alt={emoji}
            className="w-5 h-5"
            width={18}
            height={18}
          />
        );
      })}
    </div>
  );
};

export default EmojiPicker;
