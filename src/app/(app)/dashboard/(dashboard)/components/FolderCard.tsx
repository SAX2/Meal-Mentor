import React from 'react'
import Emoji from '@/components/emoji/Emoji';
import Link from 'next/link';
import CreateDir from '@/components/dialog/CreateDirDialog';
import { Route, RouteButton } from '@/components/navbar/Route';
import { getFiles } from '@/lib/supabase/queries';
import { Folder } from '@/lib/supabase/supabase.types';
import { auth } from '@clerk/nextjs';
import { FileText, PlusIcon } from 'lucide-react';
import { MoreOptionsFolder } from './FolderCardButtons';

interface FolderCardProps {
  folderId: string;
  folder: Folder & { collaborating?: boolean };
}

const FolderCard: React.FC<FolderCardProps> = async ({ folderId, folder }) => {
  const { userId } = auth();
  const { data: files, error } = await getFiles(folderId);

  if (error) return;

  const root = folder.data && folder.data.replace(/<[^>]+>/g, '')
  
  return (
    <div className="p-3 rounded-lg bg-white-2 border border-outline h-fit">
      <div className="flex flex-col gap-[6px] w-full">
        {folder.collaborating && (
          <p className="text-xs text-grey">Collaborating</p>
        )}
        <div className="flex justify-between gap-1 items-center w-full">
          <div className="flex items-center gap-[6px] w-full">
            <Emoji icon={folder.iconId} width={22} height={22} />
            <h1 className="text-lg font-semibold truncate">{folder.title}</h1>
          </div>
          <div className="w-[24px]">
            <MoreOptionsFolder
              collaborating={folder.collaborating ?? false}
              folderId={folderId}
            />
          </div>
        </div>
        <div className="folder w-full relative">
          <Link
            href={`/dashboard/${folder.id}`}
            className="px-2 py-1 bg-white rounded-md w-full border border-outline line-clamp-2 text-grey hover:bg-white-2-sec transition-colors"
          >
            {root && root?.length > 0 ? root : "Start typing your text..."}
          </Link>
        </div>
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex justify-between items-center gap-1">
            <div className="flex gap-1 items-center">
              <FileText width={20} height={20} className="text-grey" />
              <p className="font-medium text-grey">Files</p>
            </div>
            {!folder.collaborating && (
              <div>
                <CreateDir id={folderId} userId={userId ?? ""} dirType="file">
                  <RouteButton type="hover">
                    <PlusIcon width={14} height={14} className="text-grey" />
                  </RouteButton>
                </CreateDir>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            {files?.map((file) => {
              return (
                <div className="flex h-fit" key={file.id}>
                  <div className="w-[24px] min-h-full flex justify-center">
                    <div className="h-full w-[2px] bg-outline"></div>
                  </div>
                  <Route
                    className="w-full"
                    isLink
                    icon={file.iconId}
                    path={`/dashboard/${folderId}/${file.id}`}
                  >
                    {file.title}
                  </Route>
                </div>
              );
            })}
            {!folder.collaborating && files?.length === 0 && (
              <div className="flex h-fit">
                <div className="w-[24px] min-h-full flex justify-center">
                  <div className="h-full w-[2px] bg-outline"></div>
                </div>
                <CreateDir
                  userId={userId ?? ""}
                  id={folderId}
                  dirType="file"
                  classname="w-full"
                >
                  <div className="rounded-sm border border-outline border-dashed bg-white flex gap-1 items-center p-1 w-full cursor-pointer justify-center">
                    <PlusIcon width={16} height={16} className="text-grey" />
                    <span className="text-sm font-medium text-grey">
                      Add new file
                    </span>
                  </div>
                </CreateDir>
              </div>
            )}
            {folder.collaborating && files?.length === 0 && (
              <div className="flex h-fit">
                <div className="w-[24px] min-h-full flex justify-center">
                  <div className="h-full w-[2px] bg-outline"></div>
                </div>
                <div className='py-1'>
                  <p className="text-grey text-xs">Empty folder</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderCard