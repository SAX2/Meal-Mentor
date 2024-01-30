import React from 'react'
import DocumentTopBar from '@/components/topbar/DocumentTopBar';

interface layoutProps {
  children: React.ReactNode;
  params: { documentId: string, folderId: string };
}


const layout:React.FC<layoutProps> = ({ children, params }) => {

  return (
    <div className='w-full'>
      <DocumentTopBar />
      <div className='p-8'>
        {children}
      </div>
    </div>
  )
}

export default layout