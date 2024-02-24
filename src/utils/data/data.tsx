import { ActivityIcon, BellIcon, CalendarIcon, CopyIcon, EditIcon, LanguagesIcon, LinkIcon, PlusIcon, ReceiptIcon, Settings2Icon, StarIcon, TrashIcon, UserIcon } from "lucide-react";
import { Chat, Collaborators, File, Folder, Item, User, Workspace, OptionsContext } from ".";

export const user: User = {
  id: "2404719e-8483-4ebf-a4e3-03d03d011eac",
  full_name: "Santino Degra",
  avatar_url: "",
  email: "santinodegra73@gmail.com",
  billing_address: "",
  payment_method: "",
  updated_at: "",
};

export const options_context: OptionsContext = [
  {
    type: "file",
    group: [
      {
        _: [
          {
            icon: <StarIcon width={16} height={16} />,
            title: "Add to favorites",
          },
        ]
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
        ]
      },
      {
        _: [
          {
            icon: <TrashIcon width={16} height={16} />,
            title: "Delete",
            warning: true,
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
              },
            ],
          },
          {
            icon: <PlusIcon width={16} height={16} />,
            title: "Add new file",
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
];

export const routes: Item[] = [
  {
    isLink: false,
    path: "/notifications",
    type: "notifications",
    title: "Notifications",
    icon: <BellIcon width={16} height={16}/>,
    additional: 4,
  },
  {
    isLink: true,
    path: "/progress-tracking",
    title: "Progress Tracking",
    icon: <ActivityIcon width={16} height={16}/>,
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

export const routesSettings: Item[] = [
  {
    isLink: true,
    path: '/user',
    title: "User",
    icon: <UserIcon width={16} height={16} />,
    additional: null
  },
  {
    isLink: true, 
    path: "/bill-management",
    title: "Bill management",
    icon: <ReceiptIcon width={16} height={16} />,
    additional: null,
  },
  {
    isLink: true, 
    path: "/subscription",
    title: "Subscription",
    icon: <StarIcon width={16} height={16} />,
    additional: null,
  },
  {
    isLink: true, 
    path: "/notifications",
    title: "Notifications",
    icon: <BellIcon width={16} height={16} />,
    additional: null,
  },
  {
    isLink: true, 
    path: "/language-settings",
    title: "Language settings",
    icon: <LanguagesIcon width={16} height={16} />,
    additional: null,
  },
];

export const chats: Chat[] = [
  {
    id: "f739b7f0-d914-4099-a05a-1181122da0e1",
    title: "HealthyEaters Club",
    avatar_url: "https://jackcityfitness.com/wp-content/uploads/shutterstock_1351783832-1.jpg"
  },
  {
    id: "d4b73c18-399e-4d44-9c80-b8e001147db0",
    title: "Radiant Crew",
    avatar_url: ''
  },
  {
    id: "8971ac3c-24d5-4b06-922e-4624ab16b435",
    title: "Sophia Miller",
    avatar_url: "https://www.workbc.ca/sites/default/files/styles/hero_image/public/NTI5NzE_WBtwVGtmKPv8pNus-3132-NOC.jpg?itok=FrrP-vVb"
  },
]

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
    icon_id: "1f423",
    title: "Workouts",
    workspace_id: "5ae778c2-cfac-4767-ad57-f46539f497c4",
    created_at: "",
  },
  {
    id: "3cfbff41-a704-453e-baba-6154243fe3ef",
    icon_id: "1f3ef",
    title: "Meal Plan",
    workspace_id: "5ae778c2-cfac-4767-ad57-f46539f497c4",
    created_at: "",
  },
];

export const files: File[] = [
  {
    id: "0b536308-55f3-4b74-a34e-4510e0a434d4",
    title: "Menu generator",
    data: "",
    icon_id: "1f30b",  
    folder_id: "3cfbff41-a704-453e-baba-6154243fe3ef",
    workspace_id: "5ae778c2-cfac-4767-ad57-f46539f497c4",
    created_at: "",
  },
  {
    id: "5efb1924-11de-476b-86ca-4d0c5f31a392",
    title: "Recipes",
    data: "",
    icon_id: "1f1e6-1f1f4",
    folder_id: "3cfbff41-a704-453e-baba-6154243fe3ef",
    workspace_id: "5ae778c2-cfac-4767-ad57-f46539f497c4",
    created_at: "",
  },
  {
    id: "35186ba1-cd2b-44da-bd72-16c461b38293",
    title: "Calorie Counter",
    data: "",
    icon_id: "1f33e",
    folder_id: "3cfbff41-a704-453e-baba-6154243fe3ef",
    workspace_id: "5ae778c2-cfac-4767-ad57-f46539f497c4",
    created_at: "",
  },
];

