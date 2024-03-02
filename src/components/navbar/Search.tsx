'use client'

import { SearchIcon } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { SearchCommand } from '../search/SearchCommand'


const Search = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="flex justify-between p-[5px] bg-white shadow-button rounded-md border-[1px] cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="pl-[2px] flex gap-[7px] items-center">
          <SearchIcon width={16} height={16} color="grey" />
          <p className="text-sm text-grey select-none">Search...</p>
        </div>
        <CommandDisplay>
          <p className="text-[10px] text-grey font-medium">Ctrl+K</p>
        </CommandDisplay>
      </div>
      <SearchCommand setOpen={setOpen} open={open} />
    </>
  );
}

export const CommandDisplay = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "key" | null;
}) => {
  const [divHeight, setDivHeight] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      // Obtenemos la altura del div y la establecemos en el estado
      const height = divRef.current.clientHeight;
      setDivHeight(height);
    }
  }, [divRef]);

  if (variant == "key") {
    return (
      <div className="flex flex-col relative" ref={divRef}>
        <div className="py-[1px] px-[3px] rounded-sm bg-white-2 border-[1px] flex items-center relative z-50">
          {children}
        </div>
        <div
          className={`pt-[1.5px] rounded-b-sm bg-white-2 border-[1px] flex items-center border-t-0 absolute -bottom-[2px] h-[${divHeight}px] w-full`}
        ></div>
      </div>
    );
  }

  return (
    <div className="py-[1px] px-[3px] rounded-sm bg-white-2 border-[1px] flex items-center select-none">
      {children}
    </div>
  );
};

export default Search