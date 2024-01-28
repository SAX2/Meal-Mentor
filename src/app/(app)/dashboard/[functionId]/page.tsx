import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React from 'react'

const page = ({ params }: { params: { functionId: string } }) => {
  const { functionId } = params;

  return (
    <div>{functionId}</div>
  )
}

export default page