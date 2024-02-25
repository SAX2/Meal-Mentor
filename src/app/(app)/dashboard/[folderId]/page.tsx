import React from "react";
import { folders } from "@/utils/data/data";
import { layoutProps } from "./layout";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: layoutProps): Promise<Metadata> {
  const folderId = params.folderId;

  const data = folders.find((folder) => folder.id === folderId);

  return {
    title: data?.title,
  };
}

const page = ({ params }: { params: { folderId: string } }) => {
  const { folderId } = params;

  return <div>{folderId}</div>;
};

export default page;
