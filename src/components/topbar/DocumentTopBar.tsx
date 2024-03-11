'use client'

import React, { useState } from 'react'
import { routeClassname } from '../navbar/Route';
import { ShareIcon, StarIcon } from 'lucide-react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useParams } from 'next/navigation';
import clsx from 'clsx';
import Routes from './Routes';


const DocumentTopBar = () => {
  const params = useParams()

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };


  return (
    <div className="px-8 py-[5px] border-b flex justify-between z-[999]">
      <div className="h-[46px] flex items-center">
        <Routes documentId={params.documentId} folderId={params.folderId} />
      </div>
      <div className="flex items-center h-[46px]">
        <div className="h-fit flex items-center gap-1">
          <div className={clsx(routeClassname, "text-grey")}>
            <ShareIcon width={16} height={16} />
            <p>Share</p>
          </div>
          <div
            className={clsx(routeClassname, "text-grey h-[30px] w-[30px] !p-0")}
          >
            <div className="active:scale-75 scale-100 transition-transform w-full h-full flex items-center  justify-center">
              <StarIcon width={16} height={16} />
            </div>
          </div>
          <div className={clsx(routeClassname, "text-grey h-[30px] w-[30px]")}>
            <DotsHorizontalIcon width={16} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTopBar;