import React, { useState } from 'react'
import CustomDialog from './CustomDialog';
import { Label } from '../ui/label';
import { Loader } from 'lucide-react';
import { Input } from '../ui/input';
import { dialogs } from '@/utils/data/data';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { updateFileTitle, updateFolderTitle } from './actions';
import Toast from '../toasts/Toast';

type DirType = "folder" | "file";

interface EditDialogProps {
  children: React.ReactNode;
  id: string;
  dirType: DirType;
}

interface EditTitleContentProps {
  id: string;
  dirType: DirType;
}

const EditTitleDialog: React.FC<EditDialogProps> = ({ children, id, dirType }) => {
  return (
    <CustomDialog
      title={dialogs.editTitle.title}
      description={dialogs.editTitle.description}
      classname="w-full"
      classnameContent="w-fit !max-w-[400px]"
      content={
        <EditTitleContent id={id} dirType={dirType} />
      }
    >
      {children}
    </CustomDialog>
  );
};

const EditTitleContent: React.FC<EditTitleContentProps> = ({ id, dirType }) => {
  const [title, setTitle] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!title) return setIsLoading(false);

    if (dirType == 'folder') {
      const { status } = await updateFolderTitle({ folderId: id, pathname, title });
      if (status === 'error') {
        toast(<Toast message="Error while editing folder title" type="error" />);
        return setIsLoading(false);
      }
      toast(<Toast message="Folder title updated successfully" type="success" />);
      return setIsLoading(false);
    } 
    if (dirType == 'file') {
      const { status } = await updateFileTitle({ fileId: id, pathname, title });
      if (status === 'error') {
        toast(<Toast message="Error while editing file title" type="error" />);
        return setIsLoading(false);
      }
      toast(<Toast message="File title updated successfully" type="success" />);
      return setIsLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex flex-col gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="text-grey">
            New title
          </Label>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
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