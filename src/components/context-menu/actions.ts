"use server"

import { createFolder, deleteFolder, getFolderDetails } from "@/lib/supabase/queries"
import { Folder } from "@/lib/supabase/supabase.types"
import { user } from "@/utils/data/data"
import { auth } from "@clerk/nextjs"
import { toast } from "sonner"
import { v4 } from "uuid"

export const actionDeleteFolder = async (folderId: string) => {
  const response = await deleteFolder(folderId);
  if (response?.error) {
    console.log(response?.error)
    toast.error(`Error deleting folder with id ${folderId}`)
    return { error: response?.error } 
  }
  return { error: null } 
}

export const actionDuplicateFolder = async (folderId: string) => {
  const { userId } = auth()
  const uuid = v4();
  const { data, error: errorFolder } = await getFolderDetails({ folderId, userId: userId ?? '' });
  if (errorFolder) return toast.error(`Error deleting folder with id ${folderId}`)
  if (data) {
    const newFolder: Folder = {
      id: uuid,
      data: null,
      folderOwner: userId ?? '',
      iconId: data[0].iconId,
      title: data[0].title,
      createdAt: new Date().toISOString(),
    };

    const { error } = await createFolder(newFolder)
    if (error){
      console.log(error)
      toast.error(`Error deleting folder with id ${folderId}`)
      return { error: error } 
    }
    return { error: null } 
  }
  return { error: null } 
}