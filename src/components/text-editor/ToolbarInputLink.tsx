"use client"

import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ToolbarOption } from '@/utils/types';
import { Input } from '../ui/input';

interface ToolbarInputLinkProps {
  option: ToolbarOption;
}

const ToolbarInputLink: React.FC<ToolbarInputLinkProps> = ({ option }) => {
  const [content, setContent] = useState<string>("");

  return (
    <Popover>
      <PopoverTrigger>
        <button className="outline-0 rounded-sm p-1">
          {option.icon && option.icon}
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[300px] p-2 shadow-pop">
        <Input
          type="text"
          onChange={(e) => setContent(e.target.value)}
          className="focus:!outline-none placeholder:font-normal p-1 rounded-sm border-black/15 bg-gray-50"
          placeholder="Paste link or find files"
        />
      </PopoverContent>
    </Popover>
  );
}

export default ToolbarInputLink