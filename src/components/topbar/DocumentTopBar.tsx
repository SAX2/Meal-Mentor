'use client'

import React from 'react'
import { routeClassname } from '../navbar/Route';
import { ShareIcon, StarIcon } from 'lucide-react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useParams } from 'next/navigation';
import clsx from 'clsx';
import Routes from './Routes';


const DocumentTopBar = () => {
  const params = useParams()

  return (
    <div className="px-8 py-[5px] border-b flex justify-between">
      <div className="h-[46px] flex items-center">
        <Routes documentId={params.documentId} folderId={params.folderId}/>
      </div>
      <div className="flex items-center h-[46px]">
        <div className="h-fit flex items-center gap-1">
          <div className={clsx(routeClassname, "text-grey")}>
            <ShareIcon width={16} height={16} />
            <p>Share</p>
          </div>
          <div className={clsx(routeClassname, "text-grey px-[6px] py-[6px]")}>
            <StarIcon width={16} height={16} />
          </div>
          <div className={clsx(routeClassname, "text-grey px-[6px] py-[6px]")}>
            <DotsHorizontalIcon width={16} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTopBar;