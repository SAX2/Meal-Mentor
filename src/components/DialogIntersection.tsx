"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";

const DialogIntersection = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (open === false) {
      return router.back()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
    </Dialog>
  );
};

export default DialogIntersection;
