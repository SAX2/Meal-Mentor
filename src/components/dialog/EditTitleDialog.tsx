import React, { useState } from 'react'
import CustomDialog from './CustomDialog';
import { Label } from '../ui/label';
import { Loader, PlusIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { dialogs } from '@/utils/data/data';
import { useRouter } from 'next/navigation';
import { Collaborators } from '@/lib/supabase/supabase.types';
import { useAuth } from '@clerk/nextjs';

const EditTitleDialog = ({ children, id }: { children: React.ReactNode, id: string }) => {
  const { userId } = useAuth();

  return <CustomDialog
    title={dialogs.editTitle.title}
    classname="w-full"
    classnameContent="w-fit !max-w-[400px]"
    content={<EditTitleContent userId={userId ?? ""} id={id} />}
  >
    {children}
  </CustomDialog>;
};

const EditTitleContent = ({ userId, id }: { userId: string, id: string }) => {
  const [title, setTitle] = useState<string | null>();
  const [collborators, setCollborators] = useState<Collaborators[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()
  
  const handleSubmit = async () => {
    setIsLoading(true);
    if (!title) return setIsLoading(false);

    // const res = await createFolder(newFolder);
    
    // if (!res.error) {
    //   toast.success("Folder create successfully");
    //   setIsLoading(false);
    //   setIsOpen(false);
    //   return router.refresh();
    // }
    // toast.error("Error while creating folder");
    // return setIsLoading(false);
  }

  return (
    <div className="mt-2">
      <div className="flex flex-col gap-4">
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
          {!isLoading && "Edit title"}
        </button>
      </div>
    </div>
  );
};

export default EditTitleDialog