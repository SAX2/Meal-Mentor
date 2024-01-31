import React from "react";
import { Separator } from "../ui/separator";
import { routeClassname } from "./Route";
import { BellIcon, LanguagesIcon, ReceiptIcon, StarIcon, UserIcon } from "lucide-react";

const SettingsDialogContent = () => {
  const routes: {
    path?: string;
    title: string;
    icon: string | React.ReactNode;
  }[] = [
    {
      title: "User",
      icon: <UserIcon width={16} height={16} />,
    },
    {
      title: "Bill management",
      icon: <ReceiptIcon width={16} height={16} />,
    },
    {
      title: "Subscription",
      icon: <StarIcon width={16} height={16} />,
    },
    {
      title: "Notifications",
      icon: <BellIcon width={16} height={16} />,
    },
    {
      title: "Language settings",
      icon: <LanguagesIcon width={16} height={16} />,
    },
  ];

  return (
    <div className="flex">
      <div className="p-[5px] min-w-56">
        {routes.map((route) => {
          return (
            <div className={routeClassname} key={route.title}>
              {route.icon}
              {route.title}
            </div>
          );
        })}
      </div>
      <Separator orientation="vertical" className="h-full" />
      <div>div</div>
    </div>
  );
};

export default SettingsDialogContent;
