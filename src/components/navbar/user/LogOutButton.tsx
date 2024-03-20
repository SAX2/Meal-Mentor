"use client";

import React from 'react'
import { routeClassname } from "../Route";
import { LogOutIcon } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import clsx from 'clsx';

const LogOutButton = () => {
  const { signOut } = useAuth();

  return (
    <div
      className={clsx(routeClassname, "w-full")}
      onClick={() => signOut()}
    >
      <LogOutIcon width={16} height={16} />
      Log out
    </div>
  );
}

export default LogOutButton