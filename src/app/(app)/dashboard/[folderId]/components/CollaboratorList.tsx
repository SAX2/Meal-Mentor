"use client"

import React from 'react'
import { Route } from '@/components/navbar/Route';
import { User } from '@/lib/supabase/supabase.types'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { options_context_collaborators } from '@/utils/data/data';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

const CollaboratorList = ({ collaborators }: { collaborators: User[] | null }) => {
  if (collaborators === null) return;

  return (
    <div className="flex flex-col gap-[2.5px]">
      <h1 className="text-sm font-medium text-grey">Collaborators</h1>
      {collaborators.length < 3 && (
        <div className="flex gap-1 mt-1">
          {collaborators?.map((collaborator: User) => {
            return (
              <Popover>
                <PopoverTrigger>
                  <Route
                    isLink={false}
                    path=""
                    image={{
                      fallback: collaborator.firstName?.charAt(0),
                      src: collaborator.avatarUrl ?? "",
                    }}
                  >
                    {collaborator.email}
                  </Route>
                </PopoverTrigger>
                <PopoverContent className="p-0 bg-white-2 shadow-pop rounded-sm w-fit">
                  <div className="flex flex-col gap-[2.5px] w-[200px]">
                    {options_context_collaborators
                      .filter((option) => option.type === "collaborators")[0]
                      .group.map((group, index) => {
                        return (
                          <>
                            <div className='p-1'>
                              {group._.map((option) => {
                                if (option.type === 'selector') {
                                  return (
                                    <Select>
                                      <SelectTrigger className="border-0 shadow-none !outline-none text-base px-[6px] py-1 rounded-sm cursor-pointer focus:!outline-none">
                                        <div className="flex gap-[6px] items-center">
                                          {option._ && option._[0].icon}
                                          {option._ && option._[0].title}
                                        </div>
                                      </SelectTrigger>
                                      <SelectContent className="mt-1 rounded-sm border border-outline shadow-pop">
                                        {option._ &&
                                          option._.map((option) => {
                                            return (
                                              <SelectItem
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
                                }

                                return (
                                  <div className="px-[6px] py-1 rounded-sm hover:bg-white-2-sec cursor-pointer">
                                    <div className="flex gap-[6px] items-center">
                                      {option.icon}
                                      {option.title}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            {options_context_collaborators.filter(
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
          })}
        </div>
      )}
      {collaborators.length > 3 && (
        <div className="flex flex-row-reverse justify-end -space-x-[3px] space-x-reverse *:ring-2 *:ring-white mt-1">
          {collaborators?.map((collaborator: User) => {
            return (
              <Avatar className="w-5 h-5 rounded-sm">
                <AvatarImage
                  src={collaborator.avatarUrl ?? ""}
                  alt={collaborator.email ?? ""}
                />
              </Avatar>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CollaboratorList