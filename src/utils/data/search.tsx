import { ArrowDownIcon, ArrowUpIcon, Brush, File, Settings, UserIcon, Wallet } from "lucide-react";
import { DirType, Item } from "../types";
import React from "react";

interface SearchDataProps extends Item {
  items: Item[] | null;
  fetchData?: {
    type: DirType | 'folder-file';
    limit?: number;
  };
}

type Commands = {
  title: string;
  items: {
    key: string;
    icon: React.ReactComponentElement<any>;
  }[];
};

export const searchData: SearchDataProps[] = [
  {
    isLink: false,
    title: "Settings",
    icon: <Settings width={18} height={18} className="text-black" />,
    path: "/dashboard/settings",
    items: [
      {
        title: "Profile",
        icon: <Settings width={18} height={18} className="text-black" />,
        path: "/dashboard/settings/profile",
        isLink: true,
      },
      {
        title: "Account",
        icon: <UserIcon width={18} height={18} className="text-black" />,
        path: "/dashboard/settings/account",
        isLink: true,
      },
      {
        title: "Billing and plans",
        icon: <Wallet width={18} height={18} className="text-black" />,
        path: "/settings/billing-and-plans/plans-and-usage",
        isLink: true,
      },
      {
        title: "Appearence",
        icon: <Brush width={18} height={18} className="text-black" />,
        path: "/dashboard/settings/appearence",
        isLink: true,
      },
    ],
  },
  {
    title: "Folder",
    icon: <File width={18} height={18} className="text-black" />,
    path: "",
    items: null,
    isLink: false,
    fetchData: {
      type: "folder-file",
      limit: 1,
    },
  },
];

export const commands: Commands[] = [
  {
    title: "to navigate",
    items: [
      {
        icon: <ArrowUpIcon width={18} height={18} className="text-grey" />,
        key: "up",
      },
      {
        icon: <ArrowDownIcon width={18} height={18} className="text-grey" />,
        key: "down",
      },
    ],
  },
  {
    title: "to open",
    items: [
      {
        icon: <p className="text-grey font-medium text-[12px]">Enter</p>,
        key: "up",
      },
    ],
  },
  {
    title: "to exit",
    items: [
      {
        icon: <p className="text-grey font-medium text-[12px]">ESC</p>,
        key: "esc",
      },
    ],
  },
];