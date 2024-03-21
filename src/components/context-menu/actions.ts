"use server"

import { createFile, createFolder, deleteFile, deleteFolder, getFileDetails, getFolderDetails } from "@/lib/supabase/queries"
import { File, Folder } from "@/lib/supabase/supabase.types"
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

export const actionDuplicateFolder = async (folderId: string, type: 'empty' | null) => {
  const { userId } = auth()
  const uuid = v4();
  const { data, error: errorFolder } = await getFolderDetails({ folderId, userId: userId ?? '' });
  if (errorFolder) return toast.error(`Error duplicating folder with id ${folderId}`)
  if (data) {
    const newFolder: Folder = {
      id: uuid,
      data: type == 'empty' ? null : data[0].data,
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

export const actionDeleteFile = async (fileId: string) => {
  const response = await deleteFile(fileId);
  if (response?.error) {
    console.log(response?.error)
    toast.error(`Error deleting file with id ${fileId}`)
    return { error: response?.error } 
  }
  return { error: null } 
}

export const actionDuplicateFile = async (fileId: string) => {
  const { userId } = auth()
  const uuid = v4();
  const { data, error: errorFolder } = await getFileDetails({ fileId, userId: userId ?? '' });
  if (errorFolder) return toast.error(`Error creating file with id ${fileId}`)
  if (data) {
    const newFile: File = {
      id: uuid,
      data: null,
      fileOwner: userId ?? '',
      folderId: data[0].folderId,
      iconId: data[0].iconId,
      title: data[0].title,
      createdAt: new Date().toISOString(),
    };

    const { error } = await createFile(newFile)
    if (error){
      console.log(error)
      toast.error(`Error creating file with id ${fileId}`)
      return { error: error } 
    }
    return { error: null } 
  }
  return { error: null } 
}