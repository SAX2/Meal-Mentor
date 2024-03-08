import React from 'react'
import EmojiRoute from '@/components/emoji/EmojiRoute';
import { files } from '@/utils/data/data';
import { layoutProps } from '../layout';
import { Metadata } from 'next';
import QuillEditor from '@/components/quill-editor/QuillEditor';

const fetchFile = ({ id }: { id: string }) => {
  const res = files.filter(file => file.id === id)
  const data = res.length >= 1 ? res[0] : null;
  return data;
}

export async function generateMetadata({
  params,
}: layoutProps): Promise<Metadata> {
  const fileId = params.documentId;

  const data = files.find((file) => file.id === fileId);

  return {
    title: data?.title,
  };
}

const page = ({ params }: { params: { documentId: string } }) => {
  const { documentId } = params;
  const data = fetchFile({ id: documentId });

  return (
    <>
      <div className="flex gap-3 items-center max-w-[1000px] w-full px-3">
        <EmojiRoute icon={data?.icon_id} customSize="w-11 h-11" />
        <h1 className="text-4xl font-extrabold truncate">{data?.title}</h1>
      </div>
      <QuillEditor />
    </>
  );
}

export default page