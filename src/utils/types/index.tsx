import { Editor } from "@tiptap/react";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type OptionContext = {
  warning?: boolean | null;
  title: string | null;
  icon?: React.ReactNode | null;
  _?: OptionContext[];
  function?: (id: string) => void;
  modal?: "edit-title" | "create-file";
};

export type OptionsContextTypes = "file" | "folder" | "navbar" | null | string;

export type DirType = "folder" | "file";
export type AuthProvider = "google" | "facebook" | "apple";

export type Item = {
  isLink: boolean;
  path: string;
  title: string | null;
  icon: React.ReactNode | null;
  additional?: number | null;
  type?: string | null;
};

export type OptionsContext = {
  type: OptionsContextTypes;
  group: {
    _: OptionContext[];
  }[];
};

export type ToolbarOption = {
  content: string;
  value?:
    | string
    | number
    | {
        content: string;
        hex?: string;
      };
  function?: (editor: Editor, value?: number | string) => void;
  title?: string;
  icon?: React.ReactElement;
}

export type ToolbarOptions = {
  type: "button" | "select" | "input";
  items: ToolbarOption[];
};

export type Emoji = {
  n: string[]; u: string; a: string; v?: string[]
}

export interface EmojiList {
  [key: string]: Emoji[];
}

// To delete

export interface Types {
  public: {
    users: {
      avatar_url: string | null;
      billing_address: Json | null;
      email: string | null;
      full_name: string | null;
      id: string;
      payment_method: Json | null;
      updated_at: string | null;
    };
    chats: {
      title: string | null;
      avatar_url: string;
      id: string | null;
      aditional?: number | null;
    };
    collaborators: {
      id: string | null;
      workspace_id: string | null;
      user_id: string | null;
      created_at: string | null;
    };
    workspaces: {
      id: string | null;
      workspace_owner: string | null;
      title: string | null;
      created_at: string | null;
    };
  };
}

export type User = Types["public"]["users"];
export type Chat = Types["public"]["chats"];
export type Workspace = Types["public"]["workspaces"];
export type Collaborators = Types["public"]["collaborators"];