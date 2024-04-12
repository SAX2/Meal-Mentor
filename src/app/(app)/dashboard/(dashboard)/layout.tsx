import TopBar from '@/components/topbar/TopBar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-dvh">
      <div className="sticky top-0 bg-white">
        <TopBar sheet="navbar" folderAndDocs={false} />
      </div>
      <div>
        <div className="p-8 flex justify-center">
          <div className="max-w-[1100px] w-full flex flex-col gap-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default layout