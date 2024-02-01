import { DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import React from "react";
import DialogIntersection from "@/components/DialogIntersection";
import Sidebar from "./Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DialogIntersection>
      <DialogContent className="flex max-w-3xl min-h-[450px] h-fit">
        <Sidebar />
        <Separator orientation="vertical" className="h-full" />
        <div className="w-full">{children}</div>
      </DialogContent>
    </DialogIntersection>
  );
};

export default layout;
