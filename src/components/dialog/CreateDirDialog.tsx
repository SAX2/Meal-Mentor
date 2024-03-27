'use client';

import emojis from '@/utils/data/emojis.json'
import CustomDialog from '../dialog/CustomDialog';
import React, { useState } from 'react'
import EmojiRoute from '../emoji/EmojiRoute';
import { Loader, PlusIcon } from 'lucide-react';
import { dialogs } from '@/utils/data/data';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Folder, File } from '@/lib/supabase/supabase.types';
import { createFile, createFolder, getFolderDetails } from '@/lib/supabase/queries';
import { v4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DirType } from '@/utils/types';

interface CreateDirProps {
  children: React.ReactNode;
  userId: string;
  dirType: DirType;
  id?: string;
  classname?: string;
}

const CreateDir: React.FC<CreateDirProps> = ({ userId, dirType, id, children, classname }) => {
  return (
    <CustomDialog
      title={dirType === 'folder' ? dialogs.createFolder.title : dialogs.createFile.title}
      description={dirType === 'folder' ? dialogs.createFolder.description : dialogs.createFile.description}
      classname={classname}
      classnameContent="w-fit !max-w-[400px] max-[800px]:!max-w-full"
      content={<DialogContent userId={userId} dirType={dirType} id={id} dialogData={dirType === 'folder' ? dialogs.createFolder : dialogs.createFile} />}
    >
      {children}
    </CustomDialog>
  );
};

const DialogContent = ({ userId, dirType, id, dialogData }: { userId: string, dirType: DirType; id?: string, dialogData: any; }) => {
  const [seletedEmoji, setSeletedEmoji] = useState<string>(
    emojis ? emojis[Math.floor(Math.random() * emojis.length)] : ""
  );  
  const [title, setTitle] = useState<string | null>(null);
  const [collborators, setCollborators] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()
  const uuid = v4();
  
  const handleChange = ({ value, type }: { value: string; type: string }) => {
    switch (type) {
      case "title":
        return setTitle(value);
    }
  };

  const handleSubmit = async () => {
    if (!userId) return;

    setIsLoading(true);

    if (dirType === 'folder') {
      if (!title) return setIsLoading(false);
  
      const newFolder: Folder = {
        id: uuid,
        data: null,
        folderOwner: userId,
        iconId: seletedEmoji,
        title: title,
        createdAt: new Date().toISOString(),
      };
  
      const res = await createFolder(newFolder);
      
      if (!res.error) {
        toast.success("Folder create successfully");
        setIsLoading(false);
        return router.refresh();
      }
      toast.error("Error while creating folder");
      return setIsLoading(false);
    }
    if (dirType === 'file') {
      if (!title) return setIsLoading(false);
  
      const { data, error } = await getFolderDetails({ folderId: id ?? "", userId })

      if (error) return setIsLoading(false);
      if (data) {
        const newFile: File = {
          id: uuid,
          data: null,
          fileOwner: userId,
          folderId: data[0].id,
          iconId: seletedEmoji,
          title: title,
          createdAt: new Date().toISOString(),
        };
    
        const res = await createFile(newFile);
        
        if (!res.error) {
          toast.success("File create successfully");
          setIsLoading(false);
          return router.refresh();
        }
        toast.error("Error while creating file");
        return setIsLoading(false);
      }
    }
  }

  return (
    <div className="mt-2">
      <div className="flex flex-col gap-4">
        {dialogData.inputs.map((input: any, index: number) => {
          return (
            <InputWithLabel label={input.label} key={index}>
              {input.type === "icon" && (
                <div className="p-3 border border-outline bg-transparent rounded-md w-fit">
                  <EmojiRoute
                    pickOnly
                    setOnClick={(emoji) => setSeletedEmoji(emoji)}
                    id={uuid}
                    dirType="folder"
                    icon={seletedEmoji}
                    customSize="w-[48px] h-[48px]"
                  />
                </div>
              )}
              {input.type === "collaborators" && (
                <div className="p-2 border border-outline rounded-md flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div className="border border-input w-fit p-1 cursor-pointer rounded-sm shadow-button">
                      <PlusIcon width={20} height={20} className="text-black" />
                    </div>
                    <div className="border border-input w-fit p-1 rounded-sm">
                      <p className="text-sm font-medium">
                        Total {collborators.length}
                      </p>
                    </div>
                  </div>
                  {collborators.length <= 0 && (
                    <div className="w-full min-h-24 flex justify-center items-center">
                      <p className="font-medium">No collborators yet</p>
                    </div>
                  )}
                </div>
              )}
              {input.type === "text" && (
                <Input
                  onChange={(e) => handleChange({ value: e.target.value, type: input.id })}
                  placeholder={input.placeholder}
                  className="shadow-none border-outline"
                />
              )}
            </InputWithLabel>
          );
        })}
        <button
          className="w-full border border-outline shadow-button rounded-md px-3 py-1 font-medium flex justify-center items-center"
          onClick={handleSubmit}
          disabled={title === null || isLoading}
        >
          {isLoading && (
            <span className="animate-spin transition-opacity p-1">
              <Loader width={18} height={18} className="text-black" />
            </span>
          )}
          {!isLoading && dialogData.buttonSubmit}
        </button>
      </div>
    </div>
  );
}

const InputWithLabel = ({ label, children }: { label: string; children: React.ReactNode; }) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="" className="text-grey">
        {label}
      </Label>
      {children}
    </div>
  );
}

export default CreateDir