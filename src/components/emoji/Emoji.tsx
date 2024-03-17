import { cn } from "@/lib/utils";
import React from "react";

interface EmojiProps {
  icon: string | null;
  className?: string;
  width?: number | string;
  height?: number | string;
}

const Emoji: React.FC<EmojiProps> = ({ icon, className, width, height }) => {
  return (
    <img
      src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${icon}.png`}
      className={cn(className, "select-none")}
      alt={icon ?? ""}
      width={width}
      height={height}
    />
  );
};

export default Emoji;
