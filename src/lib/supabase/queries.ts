import db from "./db";
import { and, eq } from "drizzle-orm";
import { folders } from "../../../migrations/schema";

export const getFolders = async ({folderId, userId}: { folderId?: string, userId: string }) => {
  try {
    if (folderId) {
      const response = await db.select().from(folders).where(and(eq(folders.id, folderId), eq(folders.folderOwner, userId)));
      return { data: response, error: null };
    }
    const response = await db.select().from(folders).where(eq(folders.folderOwner, userId));
    return { data: response, error: null };

  } catch (error) {
    console.log(error);
    return { data: null, error: 'Error' };
  }
};