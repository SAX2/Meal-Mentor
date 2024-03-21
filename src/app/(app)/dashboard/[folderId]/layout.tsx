import React from 'react'
import TopBar from '@/components/topbar/TopBar';
import clsx from 'clsx';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShareIcon, StarIcon } from 'lucide-react';
import { routeClassname } from '@/components/navbar/Route';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

export interface layoutProps {
  children: React.ReactNode;
  params: { documentId: string, folderId: string };
}

const layout:React.FC<layoutProps> = ({ children, params }) => {
  return (
    <ScrollArea className="w-full h-dvh">
      <div className="sticky top-0 z-[900] bg-white">
        <TopBar folderAndDocs={true} >
          <div className="h-fit flex items-center gap-1">
            <div className={clsx(routeClassname, "text-grey")}>
              <ShareIcon width={16} height={16} />
              <p>Share</p>
            </div>
            <div
              className={clsx(
                routeClassname,
                "text-grey h-[30px] w-[30px] !p-0"
              )}
            >
              <div className="active:scale-75 scale-100 transition-transform w-full h-full flex items-center  justify-center">
                <StarIcon width={16} height={16} />
              </div>
            </div>
            <div
              className={clsx(routeClassname, "text-grey h-[30px] w-[30px]")}
            >
              <DotsHorizontalIcon width={16} height={16} />
            </div>
          </div>
        </TopBar>
      </div>
      <div className="p-8 flex justify-center">
        <div className="max-w-[1100px] w-full flex justify-center flex-col gap-8">
          {children}
        </div>
      </div>
    </ScrollArea>
  );
}

export default layout