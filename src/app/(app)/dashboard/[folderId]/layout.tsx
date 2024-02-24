import React from 'react'
import DocumentTopBar from '@/components/topbar/DocumentTopBar';

interface layoutProps {
  children: React.ReactNode;
  params: { documentId: string, folderId: string };
}


const layout:React.FC<layoutProps> = ({ children, params }) => {

  return (
    <div className="w-full">
      <DocumentTopBar />
      <div className="p-8 flex justify-center">
        <div className='w-8/12'>{children}</div>
      </div>
    </div>
  );
}

export default layout