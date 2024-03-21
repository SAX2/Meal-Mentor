import clsx from "clsx";
import Link from "next/link";
import React from "react";
import EmojiRoute from "../emoji/EmojiRoute";
import Emoji from "../emoji/Emoji";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DirType } from "@/utils/types";

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
  iconType?: 'SVG' | undefined;
  dirType?: DirType;
}

export const routeClassname =
  "relative group px-[7px] py-1 hover:bg-white-2-sec cursor-pointer rounded-sm flex gap-[6px] text-sm font-medium items-center transition-colors ease-in-out duration-75";

const Route: React.FC<RouteProps> = ({
  children,
  icon,
  path,
  right,
  isLink,
  image,
  left,
  picker,
  iconType,
  dirType
}) => {
  
  const renderContent = (
    <>
      {image && (
        <Avatar className="w-5 h-5 rounded-sm">
          <AvatarImage src={image.src} className="object-cover" alt={path} width={20} height={20} />
          <AvatarFallback className="rounded-sm bg-green-800 text-white text-xs">
            {image.fallback}
          </AvatarFallback>
        </Avatar>
      )}
      {(icon && iconType == 'SVG') && icon}
      {(icon && !picker && !iconType) && <Emoji icon={icon.toString()} className="w-4 h-4" width={16} height={16}/>}
      {(icon && picker) && <EmojiRoute icon={icon.toString()} dirType={dirType}/>}
      {image === undefined && icon == undefined && <div className="w-4 h-4 opacity-0" >•</div>}
    </>
  )

  return (
    <>
      {isLink ? (
        <>
          <div className={clsx(routeClassname, "justify-between relative")}>
            <Link
              href={path}
              className="absolute top-0 left-0 w-full h-full z-0"
            ></Link>
            <div className="flex gap-[6px] items-center h-full">
              {left && <div className="z-50">{left}</div>}
              <div className="flex gap-[7px] items-center justify-start">
                <div className="z-50">{renderContent}</div>
                <p className="truncate">{children}</p>
              </div>
            </div>
            {right && (
              <div className="flex items-center gap-[2.5px] z-50">{right}</div>
            )}
          </div>
        </>
      ) : (
        <div className={clsx(routeClassname, "justify-between")}>
          <div className="flex gap-[6px] items-center h-full">
            {left && <>{left}</>}
            <div className="flex gap-[7px] items-center justify-start">
              <div className="z-50">{renderContent}</div>
              <p className="truncate">{children}</p>
            </div>
          </div>
          {right && (
            <div className="flex items-center gap-[2.5px]">{right}</div>
          )}
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
  const isFixed = type == "fixed" && "bg-white-2-sec-2 px-1";
  const isHidden =
    type == "hidden" &&
    "transition-opacity ease-in-out duration-150 opacity-0 group-hover:opacity-100 bg-transparent hover:bg-white-2-sec-2";
  const isHover = type == "hover" && "bg-transparent hover:bg-white-2-sec-2";

  return (
    <div
      className={clsx(
        "h-[18px] min-w-[18px] w-fit  flex items-center justify-center rounded-md transition-colors ease-in-out duration-150 relative z-50 cursor-pointer",
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
