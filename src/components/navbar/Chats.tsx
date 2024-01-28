'use client'

import React, { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Route, RouteButton } from './Route';
import { ChevronDownIcon } from 'lucide-react';
import { chats } from '@/utils/data/data';
import clsx from 'clsx';

const Chats = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(true)

  const onOpenTransition = open ? '' : 'rotate-[-90deg]';

  return (
    <Collapsible defaultOpen onOpenChange={setOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="px-3 pt-2 pb-0 flex items-center justify-between">
          <h1 className="text-xs font-medium text-grey">Chats</h1>
          <RouteButton type="hover">
            <div>
              <ChevronDownIcon
                width={14}
                height={14}
                color="grey"
                className={clsx(onOpenTransition, "transition-all")}
              />
            </div>
          </RouteButton>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2">
        <div className="flex flex-col gap-[2.5px]">
          {chats.map((chat) => {
            return (
              <Route
                isLink
                path={`/dashboard/chat/${chat.id}`}
                image={{
                  src: chat.avatar_url,
                  fallback: chat.title?.charAt(0),
                }}
                key={chat.id}
              >
                {chat.title}
              </Route>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Chats;