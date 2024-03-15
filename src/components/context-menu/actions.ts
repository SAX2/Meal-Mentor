import { createFolder, deleteFolder, getFolderDetails } from "@/lib/supabase/queries"
import { Folder } from "@/lib/supabase/supabase.types"
import { user } from "@/utils/data/data"
import { redirect, useRouter } from "next/navigation"
import { toast } from "sonner"
import { v4 } from "uuid"

export const actionDeleteFolder = async (folderId: string) => {
  const router = useRouter()
  const response = await deleteFolder(folderId);
  if (response?.error) toast.error(`Error deleting folder with id ${folderId}`)
  router.refresh()
}

export const actionDuplicateFolder = async (folderId: string) => {
  const router = useRouter()
  const uuid = v4();

  const { data, error: errorFolder } = await getFolderDetails({ folderId, userId: user.id });
  if (errorFolder) return toast.error(`Error deleting folder with id ${folderId}`)
  if (data) {
    const newFolder: Folder = {
      id: uuid,
      data: null,
      folderOwner: user.id,
      iconId: data[0].iconId,
      title: data[0].title,
      createdAt: new Date().toISOString(),
    };

    const { error } = await createFolder(newFolder)
    if (error) return toast.error(`Error deleting folder with id ${folderId}`)
    router.refresh()
  }
}