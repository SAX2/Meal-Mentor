"use server";

import { removeCollaborator } from "@/lib/supabase/queries";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

export const actionRemoveCollaborator = async ({ fileId, userId }: { userId: string, fileId: string }) => {
  const { error } = await removeCollaborator({ fileId, userId })
  if (error) return toast.error(`Error while removing collaborator ${userId}`);
  return revalidatePath('/')
}