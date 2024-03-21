import Navbar from '@/components/navbar/Navbar';
import UseMediaQuery from '@/lib/hooks/useMediaQuery';
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white w-full h-dvh flex">
      <UseMediaQuery greater={800}>
        <div className="max-[800px]:hidden max-w-[300px] w-full">
          <Navbar />
        </div>
      </UseMediaQuery>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout