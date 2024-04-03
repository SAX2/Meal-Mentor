import { Route } from '@/components/navbar/Route';
import { getUser } from '@/lib/supabase/queries';
import { currentUser } from '@clerk/nextjs'
import React from 'react'

const Owner = async ({ userId }: { userId: string }) => {
  const { data } = await getUser({ userId });

  if (!data) return;
 
  return (
    <div className="flex flex-col gap-[2.5px]">
      <h1 className="text-sm font-medium text-grey">Owner</h1>
      <div className="flex">
        <Route
          isLink={false}
          path=""
          image={{
            fallback: data[0].firstName?.charAt(0),
            src: data[0].avatarUrl ?? "",
          }}
        >
          {data[0].email}
        </Route>
      </div>
    </div>
  );
}

export default Owner