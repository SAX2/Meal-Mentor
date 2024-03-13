'use client';

import React from 'react'
import { PlusIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface CustomDialogProps {
  children: React.ReactNode;
  content?: React.ReactElement;
  description?: string;
  title?: string;
  classname?: string;
  classnameContent?: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  children,
  classname,
  content,
  description,
  title,
  classnameContent,
}) => {

  const header = title || description;

  return (
    <Dialog>
      <DialogTrigger className={cn("", classname)}>{children}</DialogTrigger>
      <DialogContent className={cn("shadow-pop", classnameContent)}>
        {header && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog