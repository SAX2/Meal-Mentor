"use server"

import { updateFileData, updateFolderData } from "@/lib/supabase/queries"
import { revalidatePath } from "next/cache"

export const updateFolderTitle = async ({ folderId, title, pathname }: { folderId: string, title: string, pathname: string }): Promise<{ status: 'success' | 'error' }> => {
  try {
    await updateFolderData({ folderId, data: { title: title } });
    revalidatePath('/');
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }
}

export const updateFileTitle = async ({ fileId, title, pathname }: { fileId: string, title: string, pathname: string }): Promise<{ status: 'success' | 'error' }> => {
  try {
    await updateFileData({ fileId, data: { title: title } });
    revalidatePath('/');
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }
}