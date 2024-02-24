import React from "react";

interface EmojiProps {
  icon: string | null;
  className?: string;
}

const Emoji: React.FC<EmojiProps> = ({ icon, className }) => {
  return (
    <img
      src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${icon}.png`}
      className={className}
    />
  );
};

export default Emoji;
