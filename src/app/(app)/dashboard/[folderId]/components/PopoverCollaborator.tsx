"use client"

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { User } from '@/lib/supabase/supabase.types';
import { options_collaborators } from '@/utils/data/data';
import React, { useEffect, useState } from 'react'

const PopoverCollaborator = ({
  options,
  children,
  collaborator,
  userId,
  ownerId
}: {
  options: options_collaborators[];
  children: React.ReactNode;
  userId: string;
  collaborator: User;
  ownerId: string;
}) => {
  

  return (
    <Popover>
      <PopoverTrigger disabled={userId === collaborator.id}>
        {children}
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-white-2 shadow-pop rounded-sm w-fit">
        <div className="flex flex-col gap-[2.5px] w-[200px]">
          {options
            .filter((option) => option.type === "collaborators")[0]
            .group.map((group, index) => {
              return (
                <>
                  <div className="p-1">
                    {group._.map((option) => {
                      const isOwner = ownerId === userId;
                      const isCollaborator =
                        !option.ownerOnly && ownerId !== userId;

                      if (
                        (isOwner || isCollaborator) &&
                        option.type === "selector"
                      ) {
                        return (
                          <Selector
                            key={option.title}
                            option={option}
                            defaultValue={{
                              icon: option._ ? option._[0].icon : null,
                              title: option._ ? option._[0].title : null,
                            }}
                          />
                        );
                      }

                      if (isOwner || isCollaborator) {
                        return (
                          <div className="px-[6px] py-1 rounded-sm hover:bg-white-2-sec cursor-pointer" key={option.title}>
                            <div className="flex gap-[6px] items-center">
                              {option.icon}
                              {option.title}
                            </div>
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                  {options.filter(
                    (option) => option.type === "collaborators"
                  )[0].group.length -
                    1 >
                    index && <Separator orientation="horizontal" />}
                </>
              );
            })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Selector = ({
  option,
  defaultValue
}: {
  option: any;
  defaultValue: { icon: React.ReactElement | null; title: string | null };
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<{
    icon: React.ReactElement;
    title: string;
  } | null>(null);

  useEffect(() => {
    if (selectedValue != null) {
      const selected = option._.filter(
        (opt: any) => opt.title === selectedValue
      );

      if (selected.length > 0) {
        setSelectedOption(selected[0]);
      }

      return;
    }
  }, [selectedValue]);

  return (
    <Select onValueChange={setSelectedValue}>
      <SelectTrigger className="border-0 shadow-none text-base px-[6px] py-1 rounded-sm cursor-pointer focus:!ring-0 focus:bg-white-2-sec hover:bg-white-2-sec">
        {selectedOption === null ? (
          <div className="flex gap-[6px] items-center">
            {defaultValue.icon}
            {defaultValue.title}
          </div>
        ) : (
          <div className="flex gap-[6px] items-center">
            {selectedOption.icon}
            {selectedOption.title}
          </div>
        )}
      </SelectTrigger>
      <SelectContent className="mt-1 rounded-sm border border-outline shadow-pop">
        {option._ &&
          option._.map((option: any) => {
            return (
              <SelectItem
                key={option.title}
                value={option.title}
                className="text-base focus:bg-white-2-sec"
              >
                <div className="flex gap-[6px] items-center">
                  {option.icon}
                  {option.title}
                </div>
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
};

export default PopoverCollaborator