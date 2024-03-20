import { files, folders, routes } from "@/utils/data/data";
import { Route, RouteButton, routeClassname } from "./Route";
import React from "react";
import UserCard from "./user/UserCard";
import { Separator } from "../ui/separator";
import Search from "./Search";
import Chats from "./Chats";
import CollapsibleFolder from "./CollapsibleFolder";
import CreateFolder from "./CreateFolder";
import { getFolders } from "@/lib/supabase/queries";
import { Folder } from "@/lib/supabase/supabase.types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import FolderListSkeleton from "../skeletons/FolderListSkeleton";

interface NavbarProps {
  params?: { workspaceId: string };
  className?: string;
}

const Navbar: React.FC<NavbarProps> = async ({ params, className }) => {
  const user = await currentUser();

  if (!user) return;

  const { data: folders, error: foldersError } = await getFolders(user?.id);

  if (foldersError) redirect('/dashboard');
  
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
        <Chats userId={user?.id ?? ""} />
      </div>
      <ul className="p-[5px] flex flex-col gap-[2.5px]">
        <li>
          {!folders && <FolderListSkeleton />}
          {folders &&
            folders.map((folder: Folder) => {
              return (
                <CollapsibleFolder
                  userId={user?.id ?? ""}
                  folderId={folder.id}
                  folder={folder}
                  key={folder.id}
                />
              );
            })}
        </li>
        <li>
          <CreateFolder userId={user?.id ?? ""} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
