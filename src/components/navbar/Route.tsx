import clsx from "clsx";
import Link from "next/link";
import React from "react";
import EmojiRoute from "../emoji/EmojiRoute";
import Emoji from "../emoji/Emoji";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface RouteProps {
  children?: React.ReactNode;
  icon?: React.ReactNode | string;
  path: string;
  right?: React.ReactNode;
  left?: React.ReactNode;
  isLink: boolean;
  image?: {
    src: string;
    fallback: string | undefined;
  };
  optionsHidden?: boolean;
  picker?: boolean;
}

export const routeClassname =
  "group px-[7px] py-1 hover:bg-white-2-sec cursor-pointer rounded-sm flex gap-[6px] text-sm font-medium items-center transition-colors ease-in-out duration-75";

const Route: React.FC<RouteProps> = ({
  children,
  icon,
  path,
  right,
  isLink,
  image,
  left,
  picker
}) => {
  const renderContent = (
    <>
      <div className="flex gap-[6px] items-center h-full">
        {left && <>{left}</>}
        <div className="flex gap-[7px] items-center justify-start">
          {image && (
            <Avatar className="w-5 h-5 rounded-sm">
              <AvatarImage src={image.src} className="object-cover" />
              <AvatarFallback className="rounded-sm bg-green-800 text-white text-xs">
                {image.fallback}
              </AvatarFallback>
            </Avatar>
          )}
          {(icon && !picker) && <Emoji icon={icon.toString()} className="w-4 h-4"/>}
          {(icon && picker) && <EmojiRoute icon={icon.toString()}/>}
          {image === undefined && icon == undefined && <div>•</div>}
          {children}
        </div>
      </div>
      {right && (
        <div className="flex items-center gap-[2.5px] relative z-50">
          {right}
        </div>
      )}
    </>
  );

  return (
    <>
      {isLink ? (
        <Link
          href={path}
          className={clsx(routeClassname, "justify-between relative z-0")}
        >
          {renderContent}
        </Link>
      ) : (
        <div className={clsx(routeClassname, "justify-between")}>
          {renderContent}
        </div>
      )}
    </>
  );
};

const RouteButton: React.FC<{
  children: React.ReactNode;
  type: "hidden" | "fixed" | "hover";
  className?: string;
}> = ({ children, className, type }) => {
  const isFixed = type == "fixed" && "bg-white-2-sec-2";
  const isHidden =
    type == "hidden" &&
    "transition-opacity ease-in-out duration-150 opacity-0 group-hover:opacity-100 bg-transparent hover:bg-white-2-sec-2";
  const isHover = type == "hover" && "bg-transparent hover:bg-white-2-sec-2";

  return (
    <div
      className={clsx(
        "h-5 w-5 flex items-center justify-center rounded-md transition-colors ease-in-out duration-150",
        isFixed,
        isHidden,
        isHover,
        className
      )}
    >
      {children}
    </div>
  );
};

export { Route, RouteButton };
