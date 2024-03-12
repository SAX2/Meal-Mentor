'use server';

import { cookies } from "next/headers";

export const setCookie = async (value: string) => {
  return cookies().set({
    name: "current-file",
    value: value,
  })
}