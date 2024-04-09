import React from "react";
import UserCard from "./UserCard";
import Search from "./Search";
import Chats from "./Chats";
import CollapsibleFolder from "./CollapsibleFolder";
import FolderListSkeleton from "../skeletons/FolderListSkeleton";
import CreateDir from "../dialog/CreateDirDialog";
import { Route, RouteButton, routeClassname } from "./Route";
import { routes } from "@/utils/data/data";
import { Separator } from "../ui/separator";
import { getCollaboratingFolders, getFolders, getUser } from "@/lib/supabase/queries";
import { Folder } from "@/lib/supabase/supabase.types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = async () => {
  const authUser = await currentUser();
  if (!authUser) return null;

  const { data: user } = await getUser({ userId: authUser.id });

  if (!user || user == null) return null;

  const { data: folders, error: foldersError } = await getFolders(user[0]?.id);
  const { data: foldersCollaborating, error: foldersErrorCollaborating } = await getCollaboratingFolders(authUser.id);

  if (foldersError) redirect('/dashboard');
  
  return (
    <nav className="max-w-[300px] w-full max-[800px]:max-w-full bg-white-2 border-r h-full">
      <div className="p-[5px]">
        <UserCard user={user[0]} />
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
        <Chats userId={user[0]?.id ?? ""} />
      </div>
      <ul className="p-[5px] flex flex-col gap-[2.5px]">
        <li>
          {foldersCollaborating && foldersCollaborating.length > 0 && (
            <h1 className="text-xs font-medium text-grey px-3 pt-2 mb-2">
              Collaborating
            </h1>
          )}
          {!foldersCollaborating && <FolderListSkeleton />}
          {(foldersCollaborating && foldersCollaborating?.length > 0) &&
            foldersCollaborating.map((folder: Folder) => {
              return (
                <CollapsibleFolder
                  userId={user[0]?.id ?? ""}
                  folderId={folder.id}
                  folder={folder}
                  key={folder.id}
                  collaborating
                />
              );
            })}
        </li>
        <li>
          {foldersCollaborating && foldersCollaborating.length > 0 && (
            <h1 className="text-xs font-medium text-grey px-3 pt-2 mb-2">
              Your folders & files
            </h1>
          )}
          {!folders && <FolderListSkeleton />}
          {folders &&
            folders.map((folder: Folder) => {
              return (
                <CollapsibleFolder
                  userId={user[0]?.id ?? ""}
                  folderId={folder.id}
                  folder={folder}
                  key={folder.id}
                />
              );
            })}
        </li>
        <li>
          <CreateDir
            userId={user[0]?.id ?? ""}
            dirType="folder"
            classname="w-full"
          >
            <div className={cn(routeClassname, "mt-2 w-full")}>
              <PlusIcon width={16} height={16} className="text-black" />
              Add new folder
            </div>
          </CreateDir>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
