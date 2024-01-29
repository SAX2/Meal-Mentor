import React from 'react'
import { files, folders, functions } from '@/utils/data/data';
import { Route, routeClassname } from './navbar/Route';
import { ChevronRightIcon, ShareIcon, StarIcon } from 'lucide-react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

const DocumentTopBar = ({ id }: { id: string }) => {
  const file = files.filter((file) => file.id === id)[0];
  const item = functions.filter((func) => func.id === file.function_id)[0];
  const folder = folders.filter((func) => func.id === file.folder_id)[0];

  return (
    <div className="px-8 py-[5px] border-b flex justify-between">
      <div className="h-[46px] flex items-center">
        <div className="w-fit flex gap-3 items-center">
          <Route
            isLink
            path={`/dashboard/${folder.id}`}
            icon={folder.icon_id}
          >
            <p className="truncate">{folder.title}</p>
          </Route>
          <ChevronRightIcon width={14} height={14} className="grey" />
          <Route icon={item.icon_id} path={`/dashboard/${file.folder_id}/${file.id}`} isLink>
            <p className="truncate">{item.title}</p>
          </Route>
        </div>
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