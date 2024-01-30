import React from "react";

const page = ({ params }: { params: { folderId: string } }) => {
  const { folderId } = params;

  return <div>{folderId}</div>;
};

export default page;
