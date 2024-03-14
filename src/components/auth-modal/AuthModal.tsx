'use client'

import React from 'react'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AuthProvider, authProviders } from '@/utils/data/data';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface AuthModalProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  providers?: AuthProvider[];
  providersEnabled: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({
  children,
  title,
  description,
  providers,
  providersEnabled = true,
}) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-3 p-6 rounded-lg border border-outline max-w-[400px]">
      {(title || description) && (
        <div className="flex flex-col gap gap-1">
          {title && (
            <h1 className="text-lg font-semibold leading-none tracking-tight">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {providersEnabled && providers && providers?.length > 0 && (
        <>
          <div className="flex flex-col gap-2 mt-2">
            {providers.map((provider) => (
              <ContinueProviders provider={provider} key={provider} />
            ))}
          </div>
          <div className="flex items-center gap-2 my-1">
            <div className="h-[1px] bg-outline w-full"></div>
            <p className="text-slate-300 text-xs">OR</p>
            <div className="h-[1px] bg-outline w-full"></div>
          </div>
        </>
      )}
      {children}
      <div className="mt-2 flex w-full justify-center">
        <div className="flex gap-1 text-sm">
          <span className="text-grey">
            {pathname === "/login"
              ? "You dont have an account?"
              : "Do you have an account?"}
          </span>
          <Link
            className="font-medium"
            href={pathname === "/login" ? "/register" : "login"}
          >
            {pathname === "/login" ? "Register" : "Login"}
          </Link>
        </div>
      </div>
    </div>
  );
};

const ContinueProviders = ({ provider }: { provider: AuthProvider }) => {
  const router = useRouter();

  return (
    <button
      className={cn(
        "w-full border border-outline rounded-sm px-3 py-1 font-medium flex justify-center items-center select-none gap-2",
        authProviders[provider].classname
      )}
    >
      <div className='h-5 flex items-center'>{authProviders[provider].icon && authProviders[provider].icon}</div>
      {authProviders[provider].title}
    </button>
  );
}

interface InputModalProps {
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "number" | "email" | "submit";
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputModal: React.FC<InputModalProps> = ({
  handleOnChange,
  label,
  placeholder,
  type
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleOnChange) {
      handleOnChange(e);
    }
  };

  return (
    <div className="grid w-full items-center gap-[5px]">
      <Label htmlFor="email" className="text-grey text-sm">
        {label}
      </Label>
      <Input
        type={type}
        onChange={handleChange}
        placeholder={placeholder}
        className="shadow-none border-outline"
      />
    </div>
  );
};

export default AuthModal