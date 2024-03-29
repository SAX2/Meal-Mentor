import React from 'react'
import EmojiRoute from '@/components/emoji/EmojiRoute';
import { layoutProps } from '../layout';
import { Metadata } from 'next';
import { getFileDetails } from '@/lib/supabase/queries';
import { auth } from '@clerk/nextjs';
import TextEditor from '@/components/text-editor/TextEditor';

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

const page = async ({ params }: { params: { documentId: string, folderId: string } }) => {
  const { documentId } = params;

  const { userId } = auth();
  const userIdValue = userId ?? '';

  const { data, error } = await getFileDetails({ fileId: documentId, userId: userIdValue });

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
}

export default page