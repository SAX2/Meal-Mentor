'use client';

import { UserProfileProps } from '@clerk/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { currentUser, useAuth } from '@clerk/nextjs';

type UserContextType = {
  user: UserProfileProps | null;
};

const UserContext = createContext<UserContextType>({
  user: null,
});

export const useSupabaseUser = () => {
  return useContext(UserContext);
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfileProps | null>(null);
  const { sessionId, userId } =  useAuth()
  
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};