"use client"

import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import Emoji from '../emoji/Emoji';
import { CommandItem } from '../ui/command';
import { Route, routeClassname } from '../navbar/Route';
import { getFiles, getFolders } from '@/lib/supabase/queries';
import { useUser } from '@clerk/nextjs';
import { File, Folder } from '@/lib/supabase/supabase.types';

const FolderFiles = ({ onClick }: { onClick: (path: string) => void; }) => {
  const { user } = useUser();

  const [folder, setFolder] = useState<Folder[] | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);

  useEffect(() => {
    const fetchFolder = async () => {
      const { data: folder, error: errorFolder } = await getFolders(user?.id ?? "");
      if (errorFolder) return;
      setFolder(folder);
    }

    fetchFolder()
  }, [user])

  useEffect(() => {
    const fetchFiles = async () => {
      if (folder != null && folder?.length > 0) {
        const { data: files, error: errorFiles } = await getFiles(folder[0].id);
        if (errorFiles) return;
        setFiles(files);
      }
      return 
    }
    fetchFiles();
  }, [folder])


  if (folder !== null) {
    return (
      <>
        <CommandItem
          className="!p-0 bg-transparent hover:bg-none rounded-md mb-1"
          onSelect={() => {
            onClick(`/dashboard/${folder[0].id}`);
          }}
          key={folder[0].id}
        >
          <Route
            isLink={false}
            path={`/dashboard/${folder[0].id}`}
            icon={folder[0].iconId && folder[0].iconId}
          >
            {folder[0].title}
          </Route>
        </CommandItem>
        {files &&
          files?.length > 0 &&
          files.map((file) => {
            return (
              <CommandItem
                className="!p-0 bg-transparent hover:bg-none rounded-md flex gap-[7px] items-center"
                onSelect={() => {
                  onClick(`/dashboard/${file.folderId}/${file.id}`);
                }}
                key={file.id}
              >
                <div className={clsx(routeClassname, "!py-0")}>
                  <div className="h-7 w-4 flex justify-center">
                    <div className="w-[1px] bg-grey/20 h-full"></div>
                  </div>
                  <Emoji
                    icon={file.iconId}
                    className="w-4 h-4"
                    width={16}
                    height={16}
                  />
                  <p>{file.title}</p>
                </div>
              </CommandItem>
            );
          })}
      </>
    );
  }
}

export default FolderFiles