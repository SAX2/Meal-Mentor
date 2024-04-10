"use client"

import { cn } from '@/lib/utils';
import { AlertOctagon, AlertTriangle, Check, X } from 'lucide-react';
import React from 'react'

interface ToastProps {
  message: string;
  type: "success" | "warning" | "error" | "error_options";
  options?: React.ReactElement;
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const typeRender = () => {
    switch (type) {
      case "success": return <TypeIcon className="bg-green-500/10">
        <Check width={20} height={20} className="text-green-500" />
      </TypeIcon>;
      case "error": return <TypeIcon className="bg-red-500/10">
        <AlertOctagon width={20} height={20} className="text-red-500" />
      </TypeIcon>;
      case "warning": return <TypeIcon className="bg-yellow-500/10">
        <AlertTriangle width={20} height={20} className="text-yellow-500" />
      </TypeIcon>;
    }
  }

  return (
    <div  className='flex flex-col gap-2 w-full'>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          {typeRender()}
          <h1 className="text-base font-medium text-black">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h1>
        </div>
        <div>
          <button onClick={() => null}>
            <X width={16} height={16} className="text-grey" />
          </button>
        </div>
      </div>
      <div>
        <p className='text-base text-gray-700'>{message}</p>
      </div>
    </div>
  );
};

const TypeIcon = ({ children, className }: { children: React.ReactNode, className: string }) => {
  return <div className={cn("p-1 rounded-lg", className)}>{children}</div>;
}

export default Toast