'use client'

import React from 'react'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { authProviders } from '@/utils/data/data';
import { AuthProvider } from '@/utils/types'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { usePathname } from 'next/navigation';
import { useSignIn, useSignUp } from '@clerk/nextjs';

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
  const route = pathname === "/sign-in" ? "/sign-up" : "/sign-in";

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
            {pathname === "sign-in"
              ? "You dont have an account?"
              : "Do you have an account?"}
          </span>
          <Link className="font-medium cursor-pointer" href={route}>
            {pathname === "/sign-in" ? "Register" : "Login"}
          </Link>
        </div>
      </div>
    </div>
  );
};

const ContinueProviders = ({ provider }: { provider: AuthProvider }) => {
  const pathname = usePathname();
  const { isLoaded: isLoadedSignIn, signIn } = useSignIn()
  const { isLoaded: isLoadedSignUp , signUp } = useSignUp()

  const handleClick = async () => {
    if (pathname == "/sign-in") {
      if (isLoadedSignIn) {
        await signIn.authenticateWithRedirect({
          strategy: `oauth_${provider}`,
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/dashboard",
        });
      }
    }
    if (pathname == "/sign-up") {
      if (isLoadedSignUp) {
        await signUp.authenticateWithRedirect({
          strategy: `oauth_${provider}`,
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/dashboard",
        });
      }
    }
  }


  return (
    <button
      className={cn(
        "w-full border border-outline rounded-sm px-3 py-1 font-medium flex justify-center items-center select-none gap-2",
        authProviders[provider].classname
      )}
      onClick={handleClick}
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
  handleOnChange?: (value: string) => void;
  value?: string;
  className?: string;
}

export const InputModal: React.FC<InputModalProps> = ({
  handleOnChange,
  label,
  placeholder,
  type,
  value,
  className
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (handleOnChange) {
      handleOnChange(value);
    }
  };

  return (
    <div className="grid w-full items-center gap-[5px]">
      <Label htmlFor="email" className="text-grey text-sm">
        {label}
      </Label>
      <Input
        value={value && value}
        type={type}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn("shadow-none border-outline focus-visible:ring-[1.5px] active:ring-[1.5px] focus-visible:ring-black/40 active:ring-black/40", className)}
      />
    </div>
  );
};

export default AuthModal