"use client"

import { ContextMenuOnClick } from '@/components/context-menu/ContextMenu';
import { RouteButton } from '@/components/navbar/Route';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import React from 'react'

interface MoreOptionsFolderProps {
  folderId: string;
  collaborating: boolean;
}

export const MoreOptionsFolder: React.FC<MoreOptionsFolderProps> = ({
  collaborating,
  folderId,
}) => {
  return (
    <ContextMenuOnClick
      collaborator={collaborating}
      type="folder"
      id={folderId}
    >
      <RouteButton type="hover">
        <DotsHorizontalIcon width={14} height={14} className="text-grey" />
      </RouteButton>
    </ContextMenuOnClick>
  );
};
