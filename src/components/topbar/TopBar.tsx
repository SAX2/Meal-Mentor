"use client"

import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import { useParams, usePathname } from "next/navigation";
import { routes as routeList } from "@/utils/data/data";
import { Item } from "@/utils/data";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Route } from "../navbar/Route";

interface TopBarProps {
  children?: React.ReactNode;
  folderAndDocs?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ children, folderAndDocs }) => {
  const params = useParams()
  const pathname = usePathname()

  const [documentId, setDocumentId] = useState<string>()
  const [folderId, setFolderId] = useState<string>()
  const [routes, setRoutes] = useState<Item[]>()
  
  useEffect(() => {
    if (folderAndDocs) {
      setDocumentId(Array.isArray(params.documentId) ? params.documentId[0] : params.documentId)
      setFolderId(Array.isArray(params.folderId) ? params.folderId[0] : params.folderId);
    } else {
      setRoutes(routeList.filter((route) => `/dashboard${route.path}` == pathname))
    }
  }, [])

  return (
    <div className="px-8 py-[5px] border-b flex justify-between z-[999]">
      <div className="h-[46px] flex items-center">
        {folderAndDocs ? (
          <Routes documentId={documentId} folderId={folderId} />
        ) : (
          <RoutesBreadcrum routes={routes ?? null} />
        )}
      </div>
      <div className="flex items-center h-[46px]">{children}</div>
    </div>
  );
};

const RoutesBreadcrum = ({ routes }: { routes: Item[] | null }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {routes && (
          <>
            {routes.map((item, index) => {
              const renderItem = (
                <Route
                  isLink={false}
                  path={`/dashboard/${item.path}`}
                  icon={item.icon}
                  iconType="SVG"
                  key={item.path}
                >
                  {item.title}
                </Route>
              );

              return (
                <>
                  <BreadcrumbItem>
                    {routes.length - 1 === index ? (
                      <BreadcrumbPage>{renderItem}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={`/dashboard/${item.path}`}>
                        {renderItem}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {routes.length - 1 !== index && <BreadcrumbSeparator />}
                </>
              );
            })}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default TopBar