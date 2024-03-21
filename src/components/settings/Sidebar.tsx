import React from 'react'
import { routesSetting } from '@/utils/data/data'
import { Separator } from '../ui/separator';
import { Route } from '../navbar/Route';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ChevronDownIcon } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="max-w-[300px] w-full flex flex-col gap-3">
      {routesSetting.map((group, index) => {
        return (
          <>
            <div className="flex flex-col gap-2" key={`${group.title}-${index}`}>
              <h1 className="text-sm font-medium text-grey">{group.title}</h1>
              <div className="flex flex-col gap-[2.5px]">
                {group.routes.map((route) => {
                  const renderContent = (
                    <Route
                      key={route.path}
                      isLink={route.isLink}
                      path={route.path}
                      iconType="SVG"
                      icon={route.icon}
                      right={
                        route.items && (
                          <ChevronDownIcon
                            width={14}
                            height={14}
                            color="grey"
                          />
                        )
                      }
                    >
                      {route.title}
                    </Route>
                  );

                  if (route.items) {
                    return (
                      <Collapsible className="w-full" key={route.path}>
                        <CollapsibleTrigger className="w-full">
                          {renderContent}
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {route.items.map((route) => {
                            return (
                              <Route
                                key={route.path}
                                isLink={route.isLink}
                                path={route.path}
                              >
                                {route.title}
                              </Route>
                            );
                          })}
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  }

                  return renderContent;
                })}
              </div>
            </div>
            {(routesSetting.length - 1 > index) && <Separator key={`${group.title}-${index + 1}`}/>}
          </>
        );
      })}
    </div>
  );
}

export default Sidebar