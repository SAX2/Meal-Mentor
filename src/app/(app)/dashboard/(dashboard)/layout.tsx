import Navbar from '@/components/navbar/Navbar';
import TopBar from '@/components/topbar/TopBar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-dvh">
      <div className="sticky top-0 bg-white">
        <TopBar sheet={<Navbar />} folderAndDocs={false} />
      </div>
      <div>
        <div className="md:p-8 p-4 flex justify-center">
          <div className="max-w-[1100px] w-full flex flex-col gap-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default layout