import React from 'react'

const page = ({ params }: { params: { documentId: string } }) => {
  const { documentId } = params;

  return (
    <div>{documentId}</div>
  )
}

export default page