"use server";

import * as dotenv from "dotenv";
import { redirectToSignIn, redirectToSignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";
dotenv.config();

export const actionRedirect = async (pathname: string) => {
  if (pathname === process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL) {
    redirect('/sign-up')
  }
  if (pathname === process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL) {
    redirect('/sign-in')
  }
}