"use client";

import React from "react";
import clsx from "clsx";
import FolderFiles from "./FolderFiles";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Route, routeClassname } from "../navbar/Route";
import { CommandDisplay } from "../navbar/Search";
import { useRouter } from "next/navigation";
import { commands, searchData } from "@/utils/data/search";

export const SearchCommand = ({
  setOpen,
  open,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) => {
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: any) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = (path: string) => {
    router.push(path);
    return setOpen((open) => !open);
  };

  return (
    <CommandDialog onOpenChange={setOpen} open={open} modal>
      <CommandInput placeholder={`Search...`} className="" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {searchData.map((item) => {
            if (item.fetchData) {
              if (item.fetchData.type === "folder-file") {
                return <FolderFiles onClick={onClick} key={item.path} />;
              }
            }

            if (item.items && item.items != null && item.items?.length > 0) {
              return (
                <>
                  <CommandItem
                    className="!p-0 bg-transparent hover:bg-none rounded-md mb-1"
                    key={item.path}
                  >
                    <Route
                      isLink={false}
                      path={item.path}
                      icon={item.icon && item.icon}
                      iconType="SVG"
                    >
                      {item.title}
                    </Route>
                  </CommandItem>
                  {item.items &&
                    item.items.map((child) => {
                      return (
                        <CommandItem
                          className="!p-0 bg-transparent hover:bg-none rounded-md flex gap-[7px] items-center"
                          onSelect={() => {
                            onClick(child.path);
                          }}
                          key={child.path}
                        >
                          <div className={clsx(routeClassname, "!py-0")}>
                            <div className="h-7 w-4 flex justify-center">
                              <div className="w-[1px] bg-grey/20 h-full"></div>
                            </div>
                            {child.icon}
                            <p>{child.title}</p>
                          </div>
                        </CommandItem>
                      );
                    })}
                </>
              );
            }
          })}
        </CommandGroup>
      </CommandList>
      <CommandSeparator />
      <div className="w-full py-2 pb-[10px] px-2 flex gap-5">
        {commands.map((group) => {
          return (
            <CommandGroupWithTitle title={group.title} key={group.title}>
              {group.items.map((items) => {
                return (
                  <CommandDisplay variant="key" key={items.key}>
                    {items.icon}
                  </CommandDisplay>
                );
              })}
            </CommandGroupWithTitle>
          );
        })}
      </div>
    </CommandDialog>
  );
};

const CommandGroupWithTitle = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="flex flex-row gap-1">{children}</div>
      <p className="font-medium text-sm text-grey">{title}</p>
    </div>
  );
};
