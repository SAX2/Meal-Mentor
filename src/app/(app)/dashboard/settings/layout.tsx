import TopBar from '@/components/topbar/TopBar';
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className=''>
    <TopBar />
    {children}  
  </div>;
};

export default layout