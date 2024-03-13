import db from "./db";
import { and, eq } from "drizzle-orm";
import { folders } from "../../../migrations/schema";
import { Folder } from "./supabase.types";

export const createFolder = async (folder: Folder) => {
  try {
    await db.insert(folders).values(folder);
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};

export const deleteFolder = async (folderId: string) => {
  if (!folderId) return;

  try {
    await db.delete(folders).where(eq(folders.id, folderId));
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};

export const getFolders = async (userId: string) => {
  try {
    const response = await db.select().from(folders).where(eq(folders.folderOwner, userId)) as Folder[];
    return { data: response, error: null };

  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};

export const getFolderDetails = async ({ folderId, userId }: { folderId: string, userId: string }) => {
  try {
    const response = await db.select().from(folders).where(and(eq(folders.id, folderId), eq(folders.folderOwner, userId))).limit(1) as Folder[];
    return { data: response, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};