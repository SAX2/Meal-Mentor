import React from "react";
import { Route } from "../navbar/Route";
import { files, folders } from "@/utils/data/data";
import { ChevronRightIcon } from "lucide-react";
import ContextMenu from "../context-menu/ContextMenu";

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
    <div className="w-fit flex gap-3 items-center">
      {items.map((item) => {
        return (
          <>
            <ContextMenu id={item.id} type={item.type}>
              <Route
                isLink
                path={
                  item.type == "file"
                    ? `/dashboard/${folderId}/${item.id}`
                    : `/dashboard/${item.id}`
                }
                icon={item.icon_id}
                key={item.id}
              >
                {item.title}
              </Route>
            </ContextMenu>
            {items.length > 1 && items.indexOf(item) < items.length - 1 && (
              <ChevronRightIcon width={14} height={14} className="text-grey" />
            )}
          </>
        );
      })}
    </div>
  );
};

export default Routes;
