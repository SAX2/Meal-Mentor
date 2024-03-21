import Sidebar from '@/components/settings/Sidebar';
import TopBar from '@/components/topbar/TopBar';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-dvh">
      <div className="sticky top-0 bg-white">
        <TopBar />
      </div>
      <div className="p-8 flex justify-center">
        <div className="max-w-[1100px] w-full flex flex-col gap-8">
          <div className="flex w-full justify-between">
            <User />
          </div>
          <div className="flex gap-8">
            <Sidebar />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const User = async () => {
  const user = await currentUser();

  const username = !user?.firstName || user?.firstName == null 
  ? (user && user.externalAccounts[0]?.emailAddress.split('@')[0])
  : `${user?.firstName} ${user?.lastName}`;

  return (
    <div className="flex gap-2 items-center">
      <Image
        alt={user?.emailAddresses[0].emailAddress ?? ""}
        src={user?.imageUrl ?? ""}
        width={100}
        height={100}
        className="h-11 w-11 object-cover rounded-lg"
      />
      <div className="flex flex-col gap-0">
        <h1 className="font-medium text-xl truncate leading-[1.13]">
          {username}
        </h1>
        <p className="truncate leading-[1.14] text-sm text-grey">
          {user && user.externalAccounts[0]?.emailAddress}
        </p>
      </div>
    </div>
  );
}

export default layout