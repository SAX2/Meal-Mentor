'use client'

import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { SearchCommand } from './SearchCommand'

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
          <p className="text-sm text-grey">Search...</p>
        </div>
        <div className="py-[1px] px-[3px] rounded-sm bg-white-2 border-[1px] flex items-center">
          <p className="text-[10px] text-grey font-medium">Ctrl+K</p>
        </div>
      </div>
      <SearchCommand setOpen={setOpen} open={open} />
    </>
  );
}

export default Search