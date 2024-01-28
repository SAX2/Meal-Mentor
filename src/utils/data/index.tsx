import React from "react";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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
    items: {
      isLink: boolean;
      path: string;
      title: string | null;
      icon: React.ReactNode | null;
      additional: number | null;
      type?: string | null;
    };
    chats: {
      title: string | null;
      avatar_url: string;
      id: string | null;
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
    folder: {
      title: string | null;
      icon_id: string;
      id: string | null;
      workspace_id: string | null;
      created_at: string | null;
    };
    files: {
      id: string | null;
      function_id: string | null;
      workspace_id: string | null;
      folder_id: string | null;
      created_at: string | null;
    };
    functions: {
      id: string | null;
      title: string | null;
      icon_id?: string;
      data: string | null;
      created_at: string | null;
    };
  };
}

export type User = Types["public"]["users"];
export type Item = Types["public"]["items"];
export type Chat = Types["public"]["chats"];
export type Function = Types["public"]["functions"];
export type Workspace = Types["public"]["workspaces"];
export type Collaborators = Types["public"]["collaborators"];
export type Folder = Types["public"]["folder"];
export type File = Types["public"]["files"];