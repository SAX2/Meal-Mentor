import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar"
import { Separator } from "../../ui/separator"
import { LifeBuoyIcon, UserRoundPlusIcon } from "lucide-react"
import { routeClassname } from "../Route"
import clsx from "clsx" 
import LogOutButton from "./LogOutButton"

const UserPopover = ({ user, userNameDisplay }: { user: any, userNameDisplay: string }) => {
  return (
    <>
      <div className="flex flex-col gap-1 p-2">
        <p className="text-xs text-grey max-w-60 truncate w-fit p-1">
          {user.externalAccounts[0].emailAddress}
        </p>
        <div className="flex gap-2 items-center hover:bg-white-2-sec p-1 rounded-sm cursor-pointer select-none">
          <Avatar className="rounded-md h-[35px] w-[35px]">
            <AvatarImage
              src={user.imageUrl}
              alt={user.id}
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
              {userNameDisplay}
            </h1>
            <p className="text-xs text-grey">Pro plan</p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="p-2 flex flex-col">
        <div className={clsx(routeClassname, "w-full")}>
          <UserRoundPlusIcon width={16} height={16} />
          Add an account
        </div>
        <LogOutButton />
      </div>
      <Separator />
      <div className="p-2 flex flex-col">
        <div className={clsx(routeClassname, "w-full")}>
          <LifeBuoyIcon width={16} height={16} />
          Need help?
        </div>
      </div>
    </>
  );
};

export default UserPopover