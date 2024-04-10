'use client'

import ContextMenu from "../context-menu/ContextMenu";
import React, { useEffect, useState } from "react";
import { Route } from "../navbar/Route";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCollaboratingFolders, getCollaborators, getFileDetails, getFolderDetails } from "@/lib/supabase/queries";
import { File, Folder, User } from "@/lib/supabase/supabase.types";
import { useAuth } from "@clerk/nextjs";

const Routes = ({
  folderId,
  documentId,
}: {
  folderId?: string;
  documentId?: string;
}) => {
  const { userId } = useAuth();
  const [items, setItems] = useState<(Folder & { type: string } | File & { type: string })[]>([]);
  const [collaborator, setCollaborator] = useState<{ folderOwner: string | null, user: User[] | null }>({ folderOwner: null, user: null });

  useEffect(() => {
    const fetchItems = async () => {
      if (folderId) {
        const { data: isFolderOwner, error: folderError } =
          await getFolderDetails({
            folderId,
            userId: userId ?? "",
          });

        if (!folderError) {
          if (!isFolderOwner) {
            const { data } = await getCollaborators({ fileId: folderId });
            const isCollaborator = data?.filter(
              (collaborator) => collaborator.id === userId
            );
            if (isCollaborator && isCollaborator?.length > 0) {
              const { data: folderOwner } = await getCollaboratingFolders(
                userId ?? ""
              );
              if (folderOwner && folderOwner?.length > 0) {
                const folder = folderOwner.filter(
                  (folder) => folder.id === folderId
                );
                if (folder.length > 0) {
                  setCollaborator({
                    user: isCollaborator,
                    folderOwner: folder[0].folderOwner,
                  });
                }
              }
            }
          }
        }

        if (collaborator?.user) {
          const { data: folder, error } = await getFolderDetails({
            folderId,
            userId: collaborator.folderOwner ?? "",
          });

          if (error) return;

          if (folder && folder.length > 0) {
            const combinedItems: (
              | (Folder & { type: string })
              | (File & { type: string })
            )[] = folder.map((item) => ({
              ...item,
              type: "folder",
            }));

            if (documentId) {
              const { data: file, error: fileError } = await getFileDetails({
                fileId: documentId,
                userId: collaborator.folderOwner ?? "",
              });
  
              if (!fileError) {
                if (file) {
                  const filesWithTypes: (File & { type: string })[] = file.map(
                    (fileItem) => ({
                      ...fileItem,
                      type: "file",
                    })
                  );
                  combinedItems.push(...filesWithTypes);
                }
              }
            }
            setItems(combinedItems);
          }
        }

        if (isFolderOwner) {
          const combinedItems: (
            | (Folder & { type: string })
            | (File & { type: string })
          )[] = isFolderOwner.map((item) => ({
            ...item,
            type: "folder",
          }));

          if (documentId) {
            const { data: file, error: fileError } = await getFileDetails({
              fileId: documentId,
              userId: userId ?? "",
            });

            if (!fileError) {
              if (file) {
                const filesWithTypes: (File & { type: string })[] = file.map(
                  (fileItem) => ({
                    ...fileItem,
                    type: "file",
                  })
                );
                combinedItems.push(...filesWithTypes);
              }
            }
          }

          setItems(combinedItems);
        }
      }
    }
  
    fetchItems();
  }, [folderId, documentId, userId]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const renderItem = (
            <ContextMenu id={item.id} type={item.type} collaborator>
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
