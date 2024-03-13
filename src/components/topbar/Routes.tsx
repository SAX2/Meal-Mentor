'use client'

import React, { useEffect, useState } from "react";
import { Route } from "../navbar/Route";
import { user } from "@/utils/data/data";
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
import { getFileDetails, getFolderDetails } from "@/lib/supabase/queries";
import { File, Folder } from "@/lib/supabase/supabase.types";

const Routes = ({
  folderId,
  documentId,
}: {
  folderId?: string;
  documentId?: string;
}) => {
  const [items, setItems] = useState<(Folder & { type: string } | File & { type: string })[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (folderId) {
        const { data: folder, error: folderError } = await getFolderDetails({
          folderId,
          userId: user.id,
        });
  
        if (!folderError) {
          if (folder) {
            const combinedItems: (Folder & { type: string } | File & { type: string })[] = folder.map(item => ({
              ...item,
              type: 'folder',
            }));
  
            if (documentId) {
              const { data: file, error: fileError } = await getFileDetails({
                fileId: documentId,
                userId: user.id,
              });
  
              if (!fileError) {
                if (file) {
                  const filesWithTypes: (File & { type: string })[] = file.map((fileItem) => ({
                    ...fileItem,
                    type: "file",
                  }));                  
                  combinedItems.push(...filesWithTypes);
                }
              }
            }
  
            setItems(combinedItems);
          }
        }
      }
    };
  
    fetchItems();
  }, [folderId, documentId, user.id]);


  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const renderItem = (
            <ContextMenu id={item.id} type={item.type}>
              <Route
                isLink={false}
                path={item.id}
                icon={item.iconId}
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
