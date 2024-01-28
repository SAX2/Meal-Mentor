import Navbar from '@/components/navbar/Navbar';
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white w-full h-dvh flex">
      <Navbar />
      <div className="p-8">{children}</div>
    </div>
  );
};

export default layout