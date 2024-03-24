import React from "react";
import { layoutProps } from "./layout";
import { Metadata } from "next";
import { getFolderDetails } from "@/lib/supabase/queries";
import { user } from "@/utils/data/data";
import EmojiRoute from "@/components/emoji/EmojiRoute";
import QuillEditor from "@/components/quill-editor/QuillEditor";
import { auth } from "@clerk/nextjs";
import TextEditor from "@/components/text-editor/TextEditor";

export async function generateMetadata({
  params,
}: layoutProps): Promise<Metadata> {
  const { userId } = auth();
  const userIdValue = userId ?? '';
  const { data, error } = await getFolderDetails({ folderId: params.folderId, userId: userIdValue });

  return {
    title: data && data[0]?.title,
  };
}

const page = async ({ params }: { params: { folderId: string } }) => {
  const { userId } = auth();
  const userIdValue = userId ?? '';
  const { folderId } = params;
  const { data, error } = await getFolderDetails({
    folderId,
    userId: userIdValue,
  });

  if (error || data?.length === 0) {
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
        <div className="flex gap-3 items-center max-w-[1000px] w-full px-3">
          <EmojiRoute icon={data[0]?.iconId} customSize="w-11 h-11 max-[800px]:w-[32px] max-[800px]:h-[32px]" dirType="folder" id={data[0].id}/>
          <h1 className="text-4xl max-[800px]:text-2xl  font-extrabold truncate">{data[0]?.title}</h1>
        </div>
      )}
      <TextEditor dirType="folder" fileId={data ? data[0].id : ""}/>
    </>
  );
};

export default page;
