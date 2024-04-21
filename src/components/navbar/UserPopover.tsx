"use client"

import clsx from "clsx" 
import useFormatName from "@/lib/hooks/useFormatName"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Separator } from "../ui/separator"
import { Check, LifeBuoyIcon, LogOutIcon, PanelTop, UserRoundPlusIcon, Users } from "lucide-react"
import { Route, routeClassname } from "./Route"
import { useClerk } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { User } from "@/lib/supabase/supabase.types"

const UserPopover = ({ user }: { user: User }) => {
  if (!user) return null;

  const { client, session: sessionActive, setActive, signOut } = useClerk();

  return (
    <>
      <div className="flex flex-col gap-1 p-2">
        <p className="text-xs text-grey max-w-60 truncate w-fit p-1">
          {user.email}
        </p>
        <div>
          {client &&
            client.activeSessions.map((session) => {
              const { usernameDisplay } = useFormatName({
                email: session?.user?.primaryEmailAddress?.emailAddress ?? "",
                firstName: session?.user?.firstName ?? "",
                lastName: session?.user?.lastName ?? "",
              });

              return (
                <div
                  className="flex gap-2 items-center justify-between hover:bg-white-2-sec p-1 rounded-sm cursor-pointer select-none"
                  onClick={() => setActive({ session: session.id })}
                >
                  <div className="flex gap-2 items-center">
                    <Avatar className="rounded-md h-[35px] w-[35px]">
                      <AvatarImage
                        src={session.user.imageUrl ?? ""}
                        alt={session.user.id}
                        width={35}
                        height={35}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-md bg-[#8A655A] text-white text-2xl">
                        {user.firstName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="font-medium w-full truncate text-sm">
                        {usernameDisplay}
                      </h1>
                      <p className="text-xs text-grey">Pro plan</p>
                    </div>
                  </div>
                  {sessionActive?.id === session.id && (
                    <Check width={16} height={16} className="text-grey" />
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <Separator />
      <div className="p-2 flex flex-col">
        <Route
          isLink
          path="/sign-in"
          icon={<UserRoundPlusIcon width={16} height={16} />}
          iconType="SVG"
        >
          Add an account
        </Route>
        <div
          className={clsx(routeClassname, "w-full")}
          onClick={() => {
            if (!sessionActive) return;
            signOut({ sessionId: sessionActive.id ?? "" });
            redirect("/sign-in");
          }}
        >
          <LogOutIcon width={16} height={16} />
          Log out
        </div>
        <div
          className={clsx(routeClassname, "w-full")}
          onClick={() => {
            signOut();
            redirect("/sign-in");
          }}
        >
          <Users width={16} height={16} />
          Quit all sessions
        </div>
      </div>
      <Separator />
      <div className="p-2 flex flex-col">
        <Route
          isLink
          path="/product"
          icon={<PanelTop width={16} height={16} />}
          iconType="SVG"
        >
          Go to home page
        </Route>
      </div>
    </>
  );
};

export default UserPopover