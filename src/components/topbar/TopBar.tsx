"use client"

import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import { useParams, usePathname } from "next/navigation";
import { routes as routeList } from "@/utils/data/data";
import { Item } from "@/utils/types";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Route } from "../navbar/Route";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Loader, Menu } from "lucide-react";
import { useEditorContet } from "@/lib/providers/editor-provider";
import UseMediaQuery from "@/lib/hooks/useMediaQuery";
import Navbar from "../navbar/Navbar";

interface TopBarProps {
  children?: React.ReactNode;
  folderAndDocs?: boolean;
  sheet?: React.ReactElement | "navbar";
  route?: string;
}

const TopBar: React.FC<TopBarProps> = ({ children, folderAndDocs, sheet, route }) => {
  const params = useParams()
  const pathname = usePathname()

  const { isSaving } = useEditorContet()
  const [documentId, setDocumentId] = useState<string>()
  const [folderId, setFolderId] = useState<string>()
  const [routes, setRoutes] = useState<Item[]>()
  
  useEffect(() => {
    if (folderAndDocs) {
      setDocumentId(Array.isArray(params.documentId) ? params.documentId[0] : params.documentId)
      setFolderId(Array.isArray(params.folderId) ? params.folderId[0] : params.folderId);
    } else {
      if (route) {
        return setRoutes(routeList.filter((routePath) => `/dashboard${routePath.path}` == route));
      }

      return setRoutes(routeList.filter((route) => `/dashboard${route.path}` == pathname))
    }
  }, [])

  return (
    <div className="px-8 py-[5px] border-b flex justify-between max-[800px]:px-3">
      <div className="h-[46px] flex items-center gap-2">
        <div className="min-[800px]:hidden">
          <UseMediaQuery less={800}>
            <Sheet>
              <SheetTrigger className="flex items-center">
                <Menu width={16} height={16} className="text-black" />
              </SheetTrigger>
              <SheetContent
                type="navbar"
                side="left"
                className="z-[200] min-[800px]:hidden bg-white-2 border-r border-outline p-0"
                closeButton={false}
              >
                {sheet == "navbar" ? <Navbar /> : sheet}
              </SheetContent>
            </Sheet>
          </UseMediaQuery>
        </div>
        {folderAndDocs ? (
          <Routes documentId={documentId} folderId={folderId} />
        ) : (
          <RoutesBreadcrum routes={routes ?? null} />
        )}
      </div>
      <div className="flex items-center h-[46px] gap-2">
        {folderAndDocs && <Saving state={isSaving} />}
        {children}
      </div>
    </div>
  );
};

const Saving = ({ state }: { state: { isSaving: boolean, saved: boolean } }) => {
  return (
    <div className="flex items-center gap-[6px] border border-outline py-[3px] px-2 rounded-sm">
      {state.isSaving && <Loader width={14} height={14} className="animate-spin text-grey" />}
      {(!state.saved && !state.isSaving) && <div className="w-2 h-2 rounded-full bg-grey/30"></div>}
      <p className="text-grey text-sm">
        {state.isSaving && "Saving"}
        {(state.saved && !state.isSaving) && "Saved"}
        {(!state.saved && !state.isSaving) && "Not Saved"}
      </p>
    </div>
  );
}

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