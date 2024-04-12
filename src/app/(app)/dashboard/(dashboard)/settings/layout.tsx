import Sidebar from '@/components/settings/Sidebar';
import Image from 'next/image';
import React from 'react'
import { getUser } from '@/lib/supabase/queries';
import { currentUser } from '@clerk/nextjs';

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex w-full justify-between">
        <User />
      </div>
      <div className="flex gap-8">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

const User = async () => {
  const authUser = await currentUser();

  if (!authUser) return null;

  const { data: user } = await getUser({ userId: authUser.id });

  if (!user || user === null) return null;

  const username = !user[0]?.firstName || user[0]?.firstName == null 
  ? (user && user[0].email?.split('@')[0])
  : `${user[0]?.firstName} ${user[0]?.lastName}`;

  return (
    <div className="flex gap-2 items-center">
      <Image
        alt={user[0]?.email ?? ""}
        src={user[0]?.avatarUrl ?? ""}
        width={100}
        height={100}
        className="h-11 w-11 object-cover rounded-lg"
      />
      <div className="flex flex-col gap-0">
        <h1 className="font-medium text-xl truncate leading-[1.13]">
          {username}
        </h1>
        <p className="truncate leading-[1.14] text-sm text-grey">
          {user && user[0]?.email}
        </p>
      </div>
    </div>
  );
}

export default layout