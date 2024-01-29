import React from 'react'
import DocumentTopBar from '@/components/DocumentTopBar';

interface layoutProps {
  children: React.ReactNode;
  params: { documentId: string };
}


const layout:React.FC<layoutProps> = ({ children, params }) => {
  const { documentId } = params;

  return (
    <div className='w-full'>
      <DocumentTopBar id={documentId} />
      <div className='p-8'>
        {children}
      </div>
    </div>
  )
}

export default layout