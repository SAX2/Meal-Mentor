import React from 'react'
import DocumentTopBar from '@/components/topbar/DocumentTopBar';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface layoutProps {
  children: React.ReactNode;
  params: { documentId: string, folderId: string };
}

const layout:React.FC<layoutProps> = ({ children, params }) => {
  return (
    <ScrollArea className="w-full h-dvh">
      <div className='sticky top-0 bg-white'>
        <DocumentTopBar />
      </div>
      <div className="p-8 flex justify-center">
        <div className="max-w-[1100px] w-full flex justify-center flex-col">
          {children}
        </div>
      </div>
    </ScrollArea>
  );
}

export default layout