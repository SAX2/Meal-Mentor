'use client';

import emojis from '@/utils/data/emojis.json'
import Emoji from '../emoji/Emoji';
import CustomDialog from '../dialog/CustomDialog';
import React, { useState } from 'react'
import { Loader, PlusIcon } from 'lucide-react';
import { routeClassname } from './Route';
import { cn } from "@/lib/utils";
import { dialogs } from '@/utils/data/data';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Folder, Collaborators } from '@/lib/supabase/supabase.types';
import { createFolder } from '@/lib/supabase/queries';
import { v4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CreateFolder = ({ userId }: { userId: string }) => {
  return (
    <CustomDialog
      title={dialogs.createFolder.title}
      description={dialogs.createFolder.description}
      classname="w-full"
      classnameContent="w-fit !max-w-[400px]"
      content={<DialogContent userId={userId}/>}
    >
      <div className={cn(routeClassname, "mt-2 w-full")}>
        <PlusIcon width={16} height={16} className="text-black" />
        Add new folder
      </div>
    </CustomDialog>
  );
};

const DialogContent = ({ userId }: { userId: string }) => {
  const [seletedEmoji, setSeletedEmoji] = useState<string>(
    emojis ? emojis[Math.floor(Math.random() * emojis.length)] : ""
  );  
  const [title, setTitle] = useState<string | null>();
  const [collborators, setCollborators] = useState<Collaborators[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()
  
  const handleSubmit = async () => {
    setIsLoading(true);
    if (!title) return setIsLoading(false);
    const uuid = v4();

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

  return (
    <div className="mt-2">
      <div className="flex flex-col gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="text-grey">
            Icon
          </Label>
          <div className="p-3 border border-outline bg-transparent rounded-md w-fit">
            <Emoji icon={seletedEmoji} className="w-12 h-12" width={48} height={48} />
          </div>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="text-grey">
            Title
          </Label>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Folder title"
            className="shadow-none border-outline"
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="text-grey">
            Collborators
          </Label>
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
        </div>

        <button
          className="w-full border border-outline shadow-button rounded-md px-3 py-1 font-medium flex justify-center items-center"
          onClick={handleSubmit}
          disabled={!title || isLoading}
        >
          {isLoading && (
            <span className="animate-spin transition-opacity p-1">
              <Loader width={18} height={18} className="text-black" />
            </span>
          )}
          {!isLoading && "Create folder"}
        </button>
      </div>
    </div>
  );
}

export default CreateFolder