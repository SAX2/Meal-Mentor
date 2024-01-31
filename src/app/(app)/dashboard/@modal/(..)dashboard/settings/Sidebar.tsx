import { Route } from "@/components/navbar/Route";
import { routesSettings } from "@/utils/data/data";
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-[2.5px] min-w-56">
      {routesSettings.map((route) => {
        return (
          <Route
            isLink
            path={`/dashboard/settings${route.path}`}
            icon={route.icon}
          >
            {route.title}
          </Route>
        );
      })}
    </div>
  );
};

export default Sidebar;
