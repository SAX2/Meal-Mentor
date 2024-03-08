import React from "react";
import { Route } from "../navbar/Route";
import { files, folders } from "@/utils/data/data";
import { ChevronRightIcon } from "lucide-react";
import ContextMenu from "../context-menu/ContextMenu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const Routes = ({
  folderId,
  documentId,
}: {
  folderId: string | string[] | undefined;
  documentId: string | string[] | undefined;
}) => {
  const items: any[] = [];

  items.push(
    ...folders
      .filter((func) => func.id === folderId)
      .map((folder) => ({ ...folder, type: "folder" }))
  );
  if (documentId !== undefined) {
    items.push(
      ...files
        .filter((file) => file.id === documentId)
        .map((folder) => ({ ...folder, type: "file" }))
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const renderItem = (
            <ContextMenu id={item.id} type={item.type}>
              <Route
                isLink={false}
                path={item.id}
                icon={item.icon_id}
                key={item.id}
              >
                {item.title}
              </Route>
            </ContextMenu>
          );

          return (
            <>
              <BreadcrumbItem>
                {items.length - 1 === index ? (
                  <BreadcrumbPage>{renderItem}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={
                      item.type == "file"
                        ? `/dashboard/${folderId}/${item.id}`
                        : `/dashboard/${item.id}`
                    }
                  >
                    {renderItem}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {items.length - 1 !== index && <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Routes;
