import React from "react";
import EmojiRoute from "@/components/emoji/EmojiRoute";
import TextEditor from "@/components/text-editor/TextEditor";
import { Metadata } from "next";
import { getCollaborators, getFolderDetails } from "@/lib/supabase/queries";
import { auth } from "@clerk/nextjs";
import CollaboratorList from "./components/CollaboratorList";
import Owner from "./components/Owner";
import Link from "next/link";

export async function generateMetadata({
  params,
}: { params: { folderId: string } }): Promise<Metadata> {
  const { userId } = auth();
  const userIdValue = userId ?? '';
  const { data, error } = await getFolderDetails({ folderId: params.folderId, userId: userIdValue });

  return {
    title: data && data[0]?.title,
  };
}

const page = async ({
  params,
  searchParams
}: {
  params: { folderId: string };
  searchParams: { ow: string };
}) => {
  const { userId } = auth();
  const { folderId } = params;

  const { data: collaborators } = await getCollaborators({ fileId: folderId });
  const userIsCollaborator = collaborators?.filter((user) => user.id === userId);

  const { data, error } = await getFolderDetails({
    folderId,
    userId: (userIsCollaborator && userIsCollaborator?.length > 0) && searchParams.ow ? searchParams.ow : userId ?? "",
  });

  if (error || data?.length === 0) {
    return (
      <>
        <div className="w-full h-dvh flex justify-center items-center flex-col gap-2">
          <h1 className="font-normal">{error}</h1>
          {data?.length === 0 && <h1 className="text-9xl font-semibold text-black">404</h1>}
          <Link
            href={"/dashboard"}
            className="p-1 rounded-sm border border-outline"
          >Go back to dashboard</Link>
        </div>
      </>
    );
  }

  return (
    <>
      {data && (
        <>
          {collaborators && collaborators?.length > 0 && (
            <div className="flex gap-4 flex-wrap">
              <Owner userId={data[0].folderOwner} />
              <CollaboratorList collaborators={collaborators} ownerId={data[0].folderOwner} />
            </div>
          )}
          <div className="flex gap-3 items-center max-w-[1000px] w-full px-3">
            <EmojiRoute
              icon={data[0]?.iconId}
              customSize="w-11 h-11 max-[800px]:w-[32px] max-[800px]:h-[32px]"
              dirType="folder"
              id={data[0].id}
            />
            <h1 className="text-4xl max-[800px]:text-2xl  font-extrabold truncate">
              {data[0]?.title}
            </h1>
          </div>
          <TextEditor dirType="folder" fileId={data[0].id ?? ""} owner={searchParams.ow ?? null} />
        </>
      )}
    </>
  );
};

export default page;
