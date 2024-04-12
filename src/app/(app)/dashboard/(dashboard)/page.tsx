import { getCollaboratingFolders, getFolders } from '@/lib/supabase/queries';
import { Folder } from '@/lib/supabase/supabase.types';
import { auth } from '@clerk/nextjs';
import React from 'react'
import FolderCard from './components/FolderCard';
import { PlusIcon } from 'lucide-react';
import CreateDir from '@/components/dialog/CreateDirDialog';

const page = async () => {
  const { userId } = auth();

  const { data: foldersOwn, error: foldersOwnError } = await getFolders(userId ?? "");
  const { data: foldersCollab, error: foldersCollabError } = await getCollaboratingFolders(userId ?? "");

  if (foldersOwnError && foldersCollabError) return;

  const folders: Folder[] | null = [];

  if (foldersOwn) {
    const ownFolders = foldersOwn.map((folder) => ({
      ...folder,
      collaborating: false,
    }));
    folders.push(...ownFolders);
  }
  
  if (foldersCollab) {
    const collaboratingFolders = foldersCollab.map((folder) => ({
      ...folder,
      collaborating: true,
    }));
    folders.push(...collaboratingFolders);
  }

  return (
    <>
      <article className="flex flex-col gap-8">
        <section>
          <h1 className="text-xl font-semibold">Folder & Files</h1>
        </section>
        <section className="grid grid-cols-4 gap-4">
          {folders &&
            folders.map((folder) => {
              return (
                <FolderCard
                  folderId={folder.id}
                  key={folder.id}
                  folder={folder}
                />
              );
            })}
          {folders.length < 4 && (
            <CreateDir userId={userId ?? ""} dirType="folder" classname="h-fit">
              <div className="border border-dashed border-outline p-3 rounded-lg h-[100px] bg-white flex gap-1 justify-center items-center cursor-pointer">
                <PlusIcon width={16} height={16} className="text-grey" />
                <span className="font-medium text-grey">Add new folder</span>
              </div>
            </CreateDir>
          )}
        </section>
      </article>
    </>
  );
}

export default page