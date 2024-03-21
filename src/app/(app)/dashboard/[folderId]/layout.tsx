import React from 'react'
import TopBar from '@/components/topbar/TopBar';
import clsx from 'clsx';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShareIcon, StarIcon } from 'lucide-react';
import { routeClassname } from '@/components/navbar/Route';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Navbar from '@/components/navbar/Navbar';

export interface layoutProps {
  children: React.ReactNode;
  params: { documentId: string, folderId: string };
}

const layout:React.FC<layoutProps> = ({ children, params }) => {
  return (
    <ScrollArea className="w-full h-dvh">
      <div className="sticky top-0 z-[150] bg-white">
        <TopBar folderAndDocs={true} sheet={<Navbar />}>
          <div className="h-fit flex items-center gap-1">
            <div className={clsx(routeClassname, "text-black max-[800px]:!p-0 max-[800px]:h-[30px] max-[800px]:w-[30px] justify-center")}>
              <ShareIcon width={16} height={16} />
              <p className='max-[800px]:hidden'>Share</p>
            </div>
            <div
              className={clsx(
                routeClassname,
                "text-black h-[30px] w-[30px] !p-0"
              )}
            >
              <div className="active:scale-75 scale-100 transition-transform w-full h-full flex items-center  justify-center">
                <StarIcon width={16} height={16} />
              </div>
            </div>
            <div
              className={clsx(routeClassname, "text-black h-[30px] w-[30px] max-[800px]:!p-0 justify-center")}
            >
              <DotsHorizontalIcon width={16} height={16} />
            </div>
          </div>
        </TopBar>
      </div>
      <div className="p-8 max-[800px]:p-3 flex justify-center">
        <div className="max-w-[1100px] w-full flex justify-center flex-col gap-8 max-[800px]:gap-4">
          {children}
        </div>
      </div>
    </ScrollArea>
  );
}

export default layout