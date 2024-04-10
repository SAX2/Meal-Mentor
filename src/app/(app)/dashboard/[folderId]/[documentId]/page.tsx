import React from 'react'
import EmojiRoute from '@/components/emoji/EmojiRoute';
import { layoutProps } from '../layout';
import { Metadata } from 'next';
import { getCollaborators, getFileDetails } from '@/lib/supabase/queries';
import { auth } from '@clerk/nextjs';
import TextEditor from '@/components/text-editor/TextEditor';
import Image from 'next/image';
import { User } from '@/lib/supabase/supabase.types';
import CollaboratorList from '../components/CollaboratorList';
import Owner from '../components/Owner';

export async function generateMetadata({
  params,
}: layoutProps): Promise<Metadata> {
  const fileId = params.documentId;
  const { userId } = auth();
  const userIdValue = userId ?? '';

  const { data, error } = await getFileDetails({ fileId, userId: userIdValue });

  return {
    title: data && data[0]?.title,
  };
}

const page = async ({
  params,
  searchParams
}: {
  params: {
    documentId: string;
    folderId: string;
  };
  searchParams: { ow: string };
}) => {
  const { documentId, folderId } = params;

  const { userId } = auth();

  const { data: collaborators } = await getCollaborators({ fileId: folderId });

  const userIsCollaborator = collaborators?.filter((user) => user.id === userId);

  const { data, error } = await getFileDetails({
    fileId: documentId,
    userId: (userIsCollaborator && userIsCollaborator?.length > 0) && searchParams.ow ? searchParams.ow : userId ?? "",
  });

  if (error) {
    return (
      <>
        <div className="w-full h-dvh flex justify-center items-center">
          <h1 className="font-normal">{error}</h1>
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
              <Owner userId={data[0].fileOwner} />
              <CollaboratorList collaborators={collaborators} ownerId={(userIsCollaborator && userIsCollaborator?.length > 0) && searchParams.ow ? searchParams.ow : userId ?? ""} />
            </div>
          )}
          <div className="flex gap-3 items-center max-w-[1000px] w-full px-3">
            <EmojiRoute
              icon={data[0]?.iconId}
              customSize="w-11 h-11"
              dirType="file"
              id={data[0].id}
            />
            <h1 className="text-4xl font-extrabold truncate">
              {data[0]?.title}
            </h1>
          </div>
          <TextEditor dirType="file" fileId={data[0].id ?? ""} />
        </>
      )}
    </>
  );
};

export default page