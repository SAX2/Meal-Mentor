"use client"

import React from 'react'
import { Route } from '@/components/navbar/Route';
import { User } from '@/lib/supabase/supabase.types'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { options_context_collaborators } from '@/utils/data/data';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useUser } from '@clerk/nextjs';
import PopoverCollaborator from './PopoverCollaborator';

const CollaboratorList = ({ collaborators }: { collaborators: User[] | null }) => {
  const { user } = useUser();

  if (collaborators === null) return;

  return (
    <div className="flex flex-col gap-[2.5px]">
      <h1 className="text-sm font-medium text-grey">Collaborators</h1>
      {collaborators.length < 3 && (
        <div className="flex gap-1 mt-1 flex-wrap">
          {collaborators?.map((collaborator: User) => {
            return (
              <PopoverCollaborator
                collaborator={collaborator}
                options={options_context_collaborators}
                userId={user?.id ?? ""}
                key={collaborator.id}
              >
                <Route
                  isLink={false}
                  path=""
                  image={{
                    fallback: collaborator.firstName?.charAt(0),
                    src: collaborator.avatarUrl ?? "",
                  }}
                >
                  {collaborator.email}
                </Route>
              </PopoverCollaborator>
            );
          })}
        </div>
      )}
      {collaborators.length > 3 && (
        <div className="flex flex-row-reverse justify-end -space-x-[3px] space-x-reverse *:ring-2 *:ring-white mt-1">
          {collaborators?.map((collaborator: User) => {
            return (
              <Avatar className="w-5 h-5 rounded-sm">
                <AvatarImage
                  src={collaborator.avatarUrl ?? ""}
                  alt={collaborator.email ?? ""}
                />
              </Avatar>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CollaboratorList