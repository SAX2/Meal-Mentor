import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

interface CTAProps {
  children: React.ReactNode;
  type: "plans" | "main" | "login";
  className?: string;
  path: string;
}

const CTA: React.FC<CTAProps> = ({ type, className, children, path }) => {
  return (
    <Link
      href={path}
      className={cn(
        "rounded-lg px-3 py-2 bg-black text-white flex gap-2 font-medium items-center",
        (type === "plans" || type === "login") && "bg-white-2 shadow-button text-black border border-outline",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default CTA