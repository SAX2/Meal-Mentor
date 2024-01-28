import { files, folders, routes, user } from '@/utils/data/data';
import React from "react";
import UserCard from './UserCard';
import { Separator } from '../ui/separator';
import Search from './Search';
import { Route, RouteButton, routeClassname } from './Route';
import Chats from './Chats';
import CollapsibleFolder from './CollapsibleFolder';

interface NavbarProps {
  params?: { workspaceId: string },
  className?: string,
}

const Navbar: React.FC<NavbarProps> = ({ params, className }) => {
  return (
    <div className="max-w-[300px] w-full bg-white-2 border-r h-full">
      <div className="p-[5px]">
        <UserCard user={user} />
      </div>
      <Separator />
      <div className="p-[10px]">
        <Search />
      </div>
      <div className="p-[5px] flex flex-col gap-[2.5px]">
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              isLink={route.isLink}
              path={`/dashboard/${route.path}`}
              right={
                route.additional == null ? null : (
                  <RouteButton type="fixed">
                    <p className="text-sm text-grey">{route.additional}</p>
                  </RouteButton>
                )
              }
              icon={route.icon}
            >
              {route.title}
            </Route>
          );
        })}
      </div>
      <div className="p-[5px]">
        <Chats userId={user.id} />
      </div>
      <div className="p-[5px] flex flex-col gap-[2.5px]">
        <div>
          {folders.map((folder) => {
            return (
              <CollapsibleFolder
                files={files}
                folder={folder}
                key={folder.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar