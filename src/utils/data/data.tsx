import {
  ActivityIcon,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  BellIcon,
  Bold,
  Brush,
  Building2,
  CalendarIcon,
  Code,
  CopyIcon,
  EditIcon,
  FileClock,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Indent,
  Italic,
  LayoutGrid,
  LinkIcon,
  ListOrdered,
  Mail,
  PlusIcon,
  Quote,
  Redo,
  Settings,
  Settings2Icon,
  Shield,
  StarIcon,
  Strikethrough,
  Table,
  TrashIcon,
  Underline,
  Undo,
  UserIcon,
  WalletCards,
} from "lucide-react";
import { File, Folder } from "../../lib/supabase/supabase.types";
import {
  actionDeleteFile,
  actionDeleteFolder,
  actionDuplicateFolder,
  actionDuplicateFile
} from "@/components/context-menu/actions";
import {
  AuthProvider,
  Item,
  OptionsContext,
  Chat,
  Collaborators,
  User,
  Workspace,
} from "../types";
import GoogleLogo from "../../../public/providers/Google.svg";
import MetaLogo from "../../../public/providers/Meta.svg";
import AppleLogo from "../../../public/providers/Apple.svg";
import Image from "next/image";
import { ListBulletIcon } from "@radix-ui/react-icons";

interface AuthProviderInfo {
  title: string;
  classname: string;
  icon?: React.ReactElement | string;
}

interface SidebarSettings {
  title: string | null;
  routes: (Item & { items?: Item[] })[];
}

export type ToolbarOptions = {
  type: "button" | "select";
  items: {
    content: string;
    value?: string | {
      content: string;
      hex?: string;
    };
    function?: (editor: any) => void;
  title?: string;
  icon?: React.ReactElement;
  }[];
};

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
            function: (id: string) => actionDeleteFile(id),
          },
          {
            icon: <CopyIcon width={16} height={16} />,
            title: "Duplicate",
            function: (id: string) => actionDuplicateFile(id),
          },
          {
            icon: <EditIcon width={16} height={16} />,
            title: "Edit title",
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
                function: (id: string) => actionDuplicateFolder(id, null),
              },
              {
                title: "Empty",
                function: (id: string) => actionDuplicateFolder(id, "empty"),
              },
            ],
            function: (id: string) => actionDuplicateFolder(id, null),
          },
          {
            icon: <PlusIcon width={16} height={16} />,
            title: "Add new file",
          },
          {
            icon: <EditIcon width={16} height={16} />,
            title: "Edit title",
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

export const TOOLBAR_OPTIONS: ToolbarOptions[] = [
  {
    type: "button",
    items: [
      {
        content: "bold",
        icon: <Bold width={18} height={18} className="text-black" />,
        function: (editor: any) => editor.chain().focus().toggleBold().run(),
      },
      {
        content: "italic",
        icon: <Italic width={18} height={18} className="text-black" />,
        function: (editor: any) => editor.chain().focus().toggleItalic().run(),
      },
      {
        content: "underline",
        icon: <Underline width={18} height={18} className="text-black" />,
        function: (editor: any) => editor.chain().focus().toggleStrike().run(),
      },
      {
        content: "strike",
        icon: <Strikethrough width={18} height={18} className="text-black" />,
        function: (editor: any) => editor.chain().focus().toggleStrike().run(),
      },
    ],
  },
  {
    type: "button",
    items: [
      {
        content: "blockquote",
        icon: <Quote width={18} height={18} className="text-black" />,
        function: (editor: any) =>
          editor.chain().focus().toggleBlockquote().run(),
      },
      {
        content: "codeBlock",
        value: "javascript",
        icon: <Code width={18} height={18} className="text-black" />,
        function: (editor: any) =>
          editor.chain().focus().toggleCodeBlock().run(),
      },
      {
        content: "header",
        value: "1",
        icon: <Heading1 width={18} height={18} className="text-black" />,
        function: (editor: any) =>
          editor.chain().focus().toggleHeading({ level: 1 }).run(),
      },
      {
        content: "header",
        value: "2",
        icon: <Heading2 width={18} height={18} className="text-black" />,
        function: (editor: any) =>
          editor.chain().focus().toggleHeading({ level: 2 }).run(),
      },
    ],
  },
  // {
  //   type: "button",
  //   items: [
  //     { content: "script", value: "sub" },
  //     { content: "script", value: "super" },
  //   ],
  // },
  {
    type: "button",
    items: [
      {
        content: "indent",
        value: "-1",
        icon: <Indent width={18} height={18} className="text-black" />,
      },
      {
        content: "indent",
        value: "+1",
        icon: <Indent width={18} height={18} className="text-black" />,
      },
      {
        content: "orderedList",
        value: "ordered",
        icon: <ListBulletIcon width={18} height={18} className="text-black" />,
        function: (editor: any) =>
          editor.chain().focus().toggleOrderedList().run(),
      },
      {
        content: "bulletList",
        value: "bullet",
        icon: <ListOrdered width={18} height={18} className="text-black" />,
        function: (editor: any) =>
          editor.chain().focus().toggleBulletList().run(),
      },
    ],
  },
  {
    type: "select",
    items: [
      {
        content: "align",
        value: "left",
        icon: <AlignLeft width={18} height={18} className="text-black" />,
        function: (editor: any) =>
          editor.chain().focus().setTextAlign("left").run(),
      },
      {
        content: "align",
        value: "center",
        icon: <AlignCenter width={18} height={18} className="text-black" />,
        function: (editor: any) =>
          editor.chain().focus().setTextAlign("center").run(),
      },
      {
        content: "align",
        value: "right",
        icon: <AlignRight width={18} height={18} className="text-black" />,
        function: (editor: any) =>
          editor.chain().focus().setTextAlign("right").run(),
      },
      {
        content: "align",
        value: "justify",
        icon: <AlignJustify width={18} height={18} className="text-black" />,
        function: (editor: any) =>
          editor.chain().focus().setTextAlign("justify").run(),
      },
    ],
  },
  {
    type: "select",
    items: [
      {
        content: "textStyle",
        value: "inter",
        title: "Inter",
        function: (editor: any) =>
          editor.chain().focus().setFontFamily("inter").run(),
      },
      {
        content: "textStyle",
        value: "sans serif",
        title: "Sans serif",
        function: (editor: any) =>
          editor.chain().focus().setFontFamily("sans serif").run(),
      },
      {
        content: "textStyle",
        value: "serif",
        title: "Serif",
        function: (editor: any) => editor.chain().focus().setFontFamily("serif").run(),
      },
      {
        content: "textStyle",
        value: "monospace",
        title: "Monospace",
        function: (editor: any) => editor.chain().focus().setFontFamily("monospace").run(),
      },
      {
        content: "textStyle",
        value: "cursive",
        title: "Monospace",
        function: (editor: any) => editor.chain().focus().setFontFamily("cursive").run(),
      },
    ],
  },
  {
    type: "select",
    items: [
      {
        content: "header",
        value: "1",
        icon: <Heading1 width={18} height={18} className="text-black" />,
      },
      {
        content: "header",
        value: "2",
        icon: <Heading2 width={18} height={18} className="text-black" />,
      },
      {
        content: "header",
        value: "3",
        icon: <Heading3 width={18} height={18} className="text-black" />,
      },
      {
        content: "header",
        value: "4",
        icon: <Heading4 width={18} height={18} className="text-black" />,
      },
      {
        content: "header",
        value: "5",
        icon: <Heading5 width={18} height={18} className="text-black" />,
      },
      {
        content: "header",
        value: "6",
        icon: <Heading6 width={18} height={18} className="text-black" />,
      },
    ],
  },
  {
    type: "select",
    items: [
      { content: "color", value: { content: "black", hex: "#0A0A0A" } },
      { content: "color", value: { content: "dark-gray", hex: "#FFFFFF" } },
      { content: "color", value: { content: "blue", hex: "#000080" } },
      { content: "color", value: { content: "forest-green", hex: "#006400" } },
      { content: "color", value: { content: "maroon", hex: "#800000" } },
      { content: "color", value: { content: "purple", hex: "#800080" } },
      { content: "color", value: { content: "light-gray", hex: "#cccccc" } },
      { content: "color", value: { content: "light-blue", hex: "#00ffff" } },
      { content: "color", value: { content: "lime-green", hex: "#00ff00" } },
    ],
  },
  {
    type: "select",
    items: [
      { content: "background", value: { content: "white", hex: "#fff" } },
      { content: "background", value: { content: "black", hex: "#000" } },
      { content: "background", value: { content: "grey", hex: "#ccc" } },
      {
        content: "background",
        value: { content: "light-blue", hex: "#defbff" },
      },
      {
        content: "background",
        value: { content: "light-green", hex: "#dcedc8" },
      },
      {
        content: "background",
        value: { content: "light-yellow", hex: "#ffffcc" },
      },
    ],
  },
  {
    type: "button",
    items: [
      {
        content: "table",
        value: "table",
        icon: <Table width={18} height={18} className="text-black" />,
      },
    ],
  },
  {
    type: "button",
    items: [
      {
        content: "history",
        value: "undo",
        icon: <Undo width={18} height={18} className="text-black" />,
      },
      {
        content: "history",
        value: "redo",
        icon: <Redo width={18} height={18} className="text-black" />,
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
    buttonSubmit: "Create folder",
    inputs: [
      {
        label: "Icon",
        type: "icon",
      },
      {
        label: "Title",
        placeholder: "Folder title",
        type: "text",
      },
      // {
      //   label: "Collaborators",
      //   type: "collaborators",
      // },
    ],
  },
  createFile: {
    title: "Create new file",
    description:
      "Create a new file to share with others for collaborative work within the same workspace",
    buttonSubmit: "Create file",
    inputs: [
      {
        id: "icon",
        label: "Icon",
        type: "icon",
      },
      {
        id: "title",
        label: "Title",
        placeholder: "File title",
        type: "text",
      },
      // {
      //   id: 'collaborators',
      //   label: "Collaborators",
      //   type: "collaborators",
      // },
    ],
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
    description: "Easily update folder or file titles for better organization.",
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
