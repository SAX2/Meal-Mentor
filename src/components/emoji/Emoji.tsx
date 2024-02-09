import React from "react";

interface EmojiProps {
  icon: string;
  className?: string;
}

const Emoji: React.FC<EmojiProps> = ({ icon, className }) => {
  return (
    <img
      src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${icon}.png`}
      alt={icon}
      className={className}
    />
  );
};

export default Emoji;
