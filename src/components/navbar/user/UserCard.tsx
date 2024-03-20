import React from "react";
import UserPopover from "./UserPopover";
import { AvatarFallback, AvatarImage, Avatar } from "../../ui/avatar";
import { ChevronsUpDownIcon, PanelLeftCloseIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

const UserCard = async ({ user }: { user: any }) => {
  const usernameDisplay =
    !user?.firstName || user?.firstName == null
      ? `${user.externalAccounts[0].emailAddress.split('@')[0]} MealMentor`
      : `${user?.firstName} ${user?.lastName}'s MealMentor`;

  return (
    <>
      {user && (
        <Popover>
          <PopoverTrigger className="w-full">
            <div className="hover:bg-white-2-sec w-full max-[860px]:p-1 p-2 rounded-sm flex select-none justify-between items-center cursor-pointer transition-colors ease-in-out duration-75">
              <div className="flex items-center gap-2">
                <Avatar className="rounded-md h-[30px] w-[30px]">
                  <AvatarImage
                    src={user?.imageUrl}
                    alt={user.id}
                    width={30}
                    height={30}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-md bg-[#8A655A] text-white text-xl">
                    {user.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h1 className="max-[860px]:hidden font-medium w-full max-w-[167px] truncate text-base">
                  {usernameDisplay}
                </h1>
                <ChevronsUpDownIcon
                  width={18}
                  color="grey"
                  className="max-[860px]:hidden"
                />
              </div>
              <div className="p-1 hover:bg-white-2-sec-2 rounded-sm h-fit">
                <PanelLeftCloseIcon width={18} height={18} color="grey" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-white-2 shadow-pop min-w-[325px] ml-2 p-0">
            <UserPopover user={user} userNameDisplay={usernameDisplay}/>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default UserCard;
