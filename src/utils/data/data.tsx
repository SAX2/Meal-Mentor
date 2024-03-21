import {
  ActivityIcon,
  BellIcon,
  Brush,
  Building2,
  CalendarIcon,
  CopyIcon,
  EditIcon,
  FileClock,
  LanguagesIcon,
  LayoutGrid,
  LinkIcon,
  Mail,
  PlusIcon,
  ReceiptIcon,
  Settings,
  Settings2Icon,
  Shield,
  StarIcon,
  TrashIcon,
  UserIcon,
  WalletCards,
} from "lucide-react";
import { File, Folder } from "../../lib/supabase/supabase.types";
import { actionDeleteFolder, actionDuplicateFolder } from "@/components/context-menu/actions";
import { AuthProvider, Item, OptionsContext, Chat, Collaborators, User, Workspace } from "../types";
import GoogleLogo from "../../../public/providers/Google.svg";
import MetaLogo from "../../../public/providers/Meta.svg";
import AppleLogo from "../../../public/providers/Apple.svg";
import Image from "next/image";

interface AuthProviderInfo {
  title: string;
  classname: string;
  icon?: React.ReactElement | string;
}

interface SidebarSettings {
  title: string | null;
  routes: (Item & { items?: Item[] })[];
}

export const user: User = {
  id: "c30f03a4-f13b-45f1-967c-9bcc235fe6fe",
  full_name: "Santino Degra",
  avatar_url: "",
  email: "santinodegra73@gmail.com",
  billing_address: "",
  payment_method: "",
  updated_at: "",
};

export const options_context: OptionsContext[] = [
  {
    type: "file",
    group: [
      {
        _: [
          {
            icon: <StarIcon width={16} height={16} />,
            title: "Add to favorites",
          },
        ],
      },
      {
        _: [
          {
            icon: <TrashIcon width={16} height={16} />,
            title: "Delete",
          },
          {
            icon: <CopyIcon width={16} height={16} />,
            title: "Duplicate",
          },
          {
            icon: <EditIcon width={16} height={16} />,
            title: "Edit name",
          },
        ],
      },
      {
        _: [
          {
            icon: <LinkIcon width={16} height={16} />,
            title: "Copy on clipboard",
          },
        ],
      },
    ],
  },
  {
    type: "folder",
    group: [
      {
        _: [
          {
            icon: <StarIcon width={16} height={16} />,
            title: "Add to favorites",
          },
        ],
      },
      {
        _: [
          {
            icon: <TrashIcon width={16} height={16} />,
            title: "Delete",
            warning: true,
            function: (id: string) => actionDeleteFolder(id),
          },
          {
            icon: <CopyIcon width={16} height={16} />,
            title: "Duplicate",
            _: [
              {
                title: "Keep content",
              },
              {
                title: "Empty",
                function: (id: string) => actionDuplicateFolder(id),
              },
            ],
            function: (id: string) => actionDuplicateFolder(id),
          },
          {
            icon: <PlusIcon width={16} height={16} />,
            title: "Add new file",
          },
          {
            icon: <EditIcon width={16} height={16} />,
            title: "Edit name",
            modal: "edit-title",
          },
        ],
      },
      {
        _: [
          {
            icon: <LinkIcon width={16} height={16} />,
            title: "Copy on clipboard",
          },
        ],
      },
    ],
  },
];

export const routes: Item[] = [
  {
    isLink: false,
    path: "/notifications",
    type: "notifications",
    title: "Notifications",
    icon: <BellIcon width={16} height={16} />,
    additional: 7,
  },
  {
    isLink: true,
    path: "/progress-tracking",
    title: "Progress Tracking",
    icon: <ActivityIcon width={16} height={16} />,
    additional: null,
  },
  {
    isLink: true,
    path: "/settings",
    type: "settings",
    title: "Settings",
    icon: <Settings2Icon width={16} height={16} />,
    additional: null,
  },
  {
    isLink: true,
    path: "/scheduler",
    title: "Scheduler",
    icon: <CalendarIcon width={16} height={16} />,
    additional: null,
  },
];

export const routesSetting: SidebarSettings[] = [
  {
    title: null,
    routes: [
      {
        isLink: true,
        path: "/settings/profile",
        title: "Public profile",
        icon: <Settings width={16} height={16} />,
      },
      {
        isLink: true,
        path: "/settings/account",
        title: "Account",
        icon: <UserIcon width={16} height={16} />,
      },
      {
        isLink: true,
        path: "/settings/appearence",
        title: "Appearence",
        icon: <Brush width={16} height={16} />,
      },
      {
        isLink: true,
        path: "/settings/notifications",
        title: "Notifications",
        icon: <BellIcon width={16} height={16} />,
      },
    ],
  },
  {
    title: "Access",
    routes: [
      {
        isLink: false,
        path: "/settings/billing-and-plans",
        title: "Billing and plans",
        icon: <WalletCards width={16} height={16} />,
        items: [
          {
            isLink: false,
            path: "/settings/billing-and-plans/plans-and-usage",
            title: "Plans and usage",
            icon: <Settings width={16} height={16} />,
          },
          {
            isLink: false,
            path: "/settings/billing-and-plans/payment-information",
            title: "Payment information",
            icon: <Settings width={16} height={16} />,
          },
        ],
      },
      {
        isLink: true,
        path: "/settings/emails",
        title: "Emails",
        icon: <Mail width={16} height={16} />,
      },
      {
        isLink: true,
        path: "/settings/password",
        title: "Password and authentication",
        icon: <Shield width={16} height={16} />,
      },
      {
        isLink: true,
        path: "/settings/teams-and-orgs",
        title: "Teams and organizations",
        icon: <Building2 width={16} height={16} />,
      },
    ],
  },
  {
    title: "Integrations",
    routes: [
      {
        isLink: true,
        path: "/settings/applications",
        title: "Applications",
        icon: <LayoutGrid width={16} height={16} />,
      },
    ],
  },
  {
    title: "Logs",
    routes: [
      {
        isLink: true,
        path: "/settings/security-logs",
        title: "Security Logs",
        icon: <FileClock width={16} height={16} />,
      },
    ],
  },
];

export const chats: Chat[] = [
  {
    id: "f739b7f0-d914-4099-a05a-1181122da0e1",
    title: "HealthyEaters Club",
    avatar_url:
      "https://jackcityfitness.com/wp-content/uploads/shutterstock_1351783832-1.jpg",
    aditional: 11,
  },
  {
    id: "d4b73c18-399e-4d44-9c80-b8e001147db0",
    title: "Radiant Crew",
    avatar_url: "null",
  },
  {
    id: "8971ac3c-24d5-4b06-922e-4624ab16b435",
    title: "Sophia Miller",
    avatar_url:
      "https://www.workbc.ca/sites/default/files/styles/hero_image/public/NTI5NzE_WBtwVGtmKPv8pNus-3132-NOC.jpg?itok=FrrP-vVb",
    aditional: 2,
  },
];

export const workspaces: Workspace[] = [
  {
    id: "5ae778c2-cfac-4767-ad57-f46539f497c4",
    title: "Nutricionist",
    workspace_owner: "2404719e-8483-4ebf-a4e3-03d03d011eac",
    created_at: "",
  },
];

export const collaborators: Collaborators[] = [
  {
    id: "bd4b29e6-2a7a-4e0a-af40-0518b0dbe263",
    user_id: "8971ac3c-24d5-4b06-922e-4624ab16b435",
    workspace_id: "5ae778c2-cfac-4767-ad57-f46539f497c4",
    created_at: "",
  },
];

export const folders: Folder[] = [
  {
    id: "1f693609-0496-444d-a32e-04bfcca6c806",
    iconId: "1f423",
    title: "Workouts",
    createdAt: "",
    data: null,
    folderOwner: "bd4b29e6-2a7a-4e0a-af40-0518b0dbe263",
  },
  {
    id: "3cfbff41-a704-453e-baba-6154243fe3ef",
    iconId: "1f3ef",
    title: "Meal Plan",
    createdAt: "",
    data: null,
    folderOwner: "bd4b29e6-2a7a-4e0a-af40-0518b0dbe263",
  },
];

export const files: File[] = [
  {
    id: "0b536308-55f3-4b74-a34e-4510e0a434d4",
    title: "Menu generator",
    data: "",
    iconId: "1f30b",
    folderId: "3cfbff41-a704-453e-baba-6154243fe3ef",
    createdAt: "",
    fileOwner: "bd4b29e6-2a7a-4e0a-af40-0518b0dbe263",
  },
  {
    id: "5efb1924-11de-476b-86ca-4d0c5f31a392",
    title: "Recipes",
    data: "",
    iconId: "1f1e6-1f1f4",
    folderId: "3cfbff41-a704-453e-baba-6154243fe3ef",
    createdAt: "",
    fileOwner: "bd4b29e6-2a7a-4e0a-af40-0518b0dbe263",
  },
  {
    id: "35186ba1-cd2b-44da-bd72-16c461b38293",
    title: "Calorie Counter",
    data: "",
    iconId: "1f33e",
    folderId: "3cfbff41-a704-453e-baba-6154243fe3ef",
    createdAt: "",
    fileOwner: "bd4b29e6-2a7a-4e0a-af40-0518b0dbe263",
  },
];

export const dialogs = {
  createFolder: {
    title: "Create new folder",
    description:
      "Create new folder and share with people to work together in the same folder workspace",
  },
  login: {
    title: "Welcome back",
    description:
      "Sign in and collaborate with others within the shared workspace folder.",
  },
  register: {
    title: "Welcome to MealMentor",
    description:
      "Sign up now and begin collaborating with others in the shared workspace folder.",
  },
  editTitle: {
    title: "Edit title",
    description:
      "Easily update folder or file titles for better organization.",
  },
};

export const authProviders: Record<AuthProvider, AuthProviderInfo> = {
  google: {
    title: "Continue with Google",
    classname: "border-google/30 bg-google/25 text-black",
    icon: (
      <Image
        src={GoogleLogo}
        width={16}
        height={16}
        alt="google"
        className="h-full w-auto"
      />
    ),
  },
  facebook: {
    title: "Continue with Facebook",
    classname: "border-meta/30 bg-meta/25 text-black",
    icon: (
      <Image
        src={MetaLogo}
        width={16}
        height={16}
        alt="meta"
        className="h-full w-auto max-h-4"
      />
    ),
  },
  apple: {
    title: "Continue with Apple",
    classname: "!border-none bg-apple text-white",
    icon: (
      <Image
        src={AppleLogo}
        width={16}
        height={16}
        alt="apple"
        className="h-full w-auto max-h-[18px]"
      />
    ),
  },
};
