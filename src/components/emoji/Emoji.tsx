import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface EmojiProps {
  icon: string | null;
  className?: string;
  width?: number;
  height?: number;
}

const Emoji: React.FC<EmojiProps> = ({ icon, className, width, height }) => {
  return (
    <Image
      src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${icon}.png`}
      className={cn(className, "select-none")}
      alt={icon ?? ""}
      width={width ?? 0}
      height={height ?? 0}
    />
  );
};

export default Emoji;
