import React from 'react'
import { Route } from '@/components/navbar/Route';
import { User } from '@/lib/supabase/supabase.types'

const CollaboratorList = ({ collaborators }: { collaborators: User[] | null }) => {
  if (collaborators === null) return;

  return (
    <div className='flex flex-col gap-[2.5px]'>
      <h1 className='text-sm font-medium text-grey'>Collaborators</h1>
      <div className="flex gap-[2.5px] flex-wrap">
        {collaborators?.map((collaborator: User) => {
          return (
            <div className="">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollaboratorList