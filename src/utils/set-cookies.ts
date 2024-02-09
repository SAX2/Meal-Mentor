'use server'

import { cookies } from "next/headers"

export const setCurrentPathName = async (path: string) => {
  const cookie = cookies()
  return cookie.set('current-pathname', path)
}