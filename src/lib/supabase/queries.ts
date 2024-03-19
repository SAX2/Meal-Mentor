'use server'

import db from "./db";
import { and, eq } from "drizzle-orm";
import { files, folders } from "../../../migrations/schema";
import { File, Folder } from "./supabase.types";

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
  if (!folderId) return { data: null, error: true };

  try {
    await db.delete(folders).where(eq(folders.id, folderId));
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};

export const getFolders = async (userId: string) => {
  if (!userId || userId.length === 0) return { data: null, error: true };
  try {
    const response = await db.select().from(folders).where(eq(folders.folderOwner, userId)) as Folder[];
    return { data: response, error: null };

  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};

export const getFolderDetails = async ({ folderId, userId }: { folderId: string, userId: string }) => {
  if (!userId || userId.length === 0) return { data: null, error: true };
  try {
    const response = await db.select().from(folders).where(and(eq(folders.id, folderId), eq(folders.folderOwner, userId))).limit(1) as Folder[];
    return { data: response, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};

export const updateFolderData = async ({ folderId, data }: { folderId: string, data: any }) => {
  try {
    await db
      .update(folders)
      .set({ ...data })
      .where(eq(folders.id, folderId));
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};

export const createFile = async (file: File) => {
  try {
    await db.insert(files).values(file);
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    await db.delete(files).where(eq(files.id, fileId));
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};

export const getFiles = async (folderId: string) => {
  try {
    const response = await db.select().from(files).where(eq(files.folderId, folderId));
    return { data: response, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};

export const getFileDetails = async ({ fileId, userId }: { fileId: string; userId: string }) => {
  try {
    const response = await db.select().from(files).where(and(eq(files.id, fileId), eq(files.fileOwner, userId)));
    return { data: response, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};

export const updateFileData = async ({ fileId, data }: { fileId: string, data: any }) => {
  try {
    await db
      .update(files)
      .set({ ...data })
      .where(eq(files.id, fileId));
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};
