import { files, folders, routes, user } from "@/utils/data/data";
import { Route, RouteButton, routeClassname } from "./Route";
import React from "react";
import UserCard from "./UserCard";
import { Separator } from "../ui/separator";
import Search from "./Search";
import Chats from "./Chats";
import CollapsibleFolder from "./CollapsibleFolder";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "../ui/dialog";
import CreateFolder from "./CreateFolder";
import { getFolders } from "@/lib/supabase/queries";
import { Folder } from "@/lib/supabase/supabase.types";

interface NavbarProps {
  params?: { workspaceId: string };
  className?: string;
}



const Navbar: React.FC<NavbarProps> = async ({ params, className }) => {
  const { data: folders, error: foldersError } = await getFolders(user.id); 

  return (
    <nav className="max-w-[300px] w-full bg-white-2 border-r h-full">
      <div className="p-[5px]">
        <UserCard user={user} />
      </div>
      <Separator />
      <div className="p-[10px]">
        <Search />
      </div>
      <ul className="p-[5px] flex flex-col gap-[2.5px]">
        {routes.map((route) => {
          const routeElement = (
            <Route
              key={route.path}
              isLink={route.isLink}
              path={`/dashboard${route.path}`}
              right={
                route.additional == null ? null : (
                  <RouteButton type="fixed">
                    <p className="text-xs text-grey">{route.additional}</p>
                  </RouteButton>
                )
              }
              icon={route.icon}
              iconType="SVG"
            >
              {route.title}
            </Route>
          );

          return routeElement;
        })}
      </ul>
      <div className="p-[5px]">
        <Chats userId={user.id} />
      </div>
      <ul className="p-[5px] flex flex-col gap-[2.5px]">
        <li>
          {folders &&
            folders.map((folder: Folder) => {
              return (
                <CollapsibleFolder
                  userId={user.id}
                  folderId={folder.id}
                  key={folder.id}
                />
              );
            })}
        </li>
        <li>
          <CreateFolder />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
