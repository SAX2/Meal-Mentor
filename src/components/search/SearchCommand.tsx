import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { chats, files, folders } from "@/utils/data/data";
import { Route, RouteButton } from "../navbar/Route";
import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { CommandDisplay } from "../navbar/Search";
import { useRouter } from "next/navigation";

type Commands = {
  title: string;
  items: {
    key: string;
    icon: React.ReactComponentElement<any>;
  }[];
};

export const SearchCommand = ({
  setOpen,
  open,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) => {

  const router = useRouter();
  
  const commands: Commands[] = [
    {
      title: "to navigate",
      items: [
        {
          icon: <ArrowUpIcon width={18} height={18} className="text-grey" />,
          key: "up",
        },
        {
          icon: <ArrowDownIcon width={18} height={18} className="text-grey" />,
          key: "down",
        },
      ],
    },
    {
      title: "to open",
      items: [
        {
          icon: <p className="text-grey font-medium text-[12px]">Enter</p>,
          key: "up",
        },
      ],
    },
    {
      title: "to exit",
      items: [
        {
          icon: <p className="text-grey font-medium text-[12px]">ESC</p>,
          key: "esc",
        },
      ],
    },
  ];

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

  const result: any[] = [];
  

  const sort = () => {
    result.push(
      ...files.map((file) => ({ ...file, type: "file" })),
      ...folders.map((folder) => ({ ...folder, type: "folder" })),
      ...chats
        .filter((chat) => chat.aditional && chat.aditional > 0)
        .map((chat) => ({ ...chat, type: "chat" }))
    );
    
    return result.sort((a, b) => {
      // Si 'a' tiene additional y 'b' no, 'a' debe ir antes que 'b'
      if (a.additional && !b.additional) return -1;
      // Si 'b' tiene additional y 'a' no, 'b' debe ir antes que 'a'
      if (b.additional && !a.additional) return 1;
      // En caso contrario, o ambos tienen additional o ninguno tiene, se ordena por título
      return a.title.localeCompare(b.title);
    }); 
  }

  const onClick = () => {
    return setOpen((open) => !open)
  }

  sort();

  return (
    <CommandDialog onOpenChange={setOpen} open={open} modal>
      <CommandInput placeholder={`Search...`} className="" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {result.map((item) => {
            const path = `/dashboard/${
              item.type == "folder"
                ? item.id
                : item.type == "chat"
                ? "chat"
                : item.folder_id
            }${
              item.type == "chat"
                ? `/${item.id}`
                : item.type == "file" && `/${item.id}`
            }`;

            return (
              <CommandItem
                className="!p-0 bg-transparent hover:bg-none rounded-md"
                onSelect={() => {
                  router.push(path);
                  onClick();
                }}
                key={item.id}
                >
                <Route
                  isLink={false}
                  path={path}
                  image={
                    item.avatar_url && {
                      src: item.avatar_url,
                      fallback: item.title?.charAt(0),
                    }
                  }
                  icon={item.icon_id && item.icon_id}
                  right={
                    item.aditional == null ? null : (
                      <RouteButton type="fixed">
                        <p className="text-xs text-grey">{item.aditional}</p>
                      </RouteButton>
                    )
                  }
                >
                  {item.title}
                </Route>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
      <CommandSeparator />
      <div className="w-full py-2 pb-[10px] px-2 flex gap-5">
        {commands.map(group => {
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

const CommandGroupWithTitle = ({ title, children }: { title: string, children: React.ReactNode })=> {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="flex flex-row gap-1">{children}</div>
      <p className="font-medium text-sm text-grey">{title}</p>
    </div>
  );
}