"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import RemarksForm from "./remarks-form";

export default function RemarkDialog({ data }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2 bg-applicationPrimary hover:bg-applicationPrimary transition-all duration-300">
          View Remarks
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] bg-darkComponentBg border border-lightBorder shadow-2xl ">
        <DialogHeader className="w-full flex justify-start">
          <DialogTitle className="w-full flex text-start justify-start text-white">
            Remarks
          </DialogTitle>
          <DialogDescription className="w-full flex text-start justify-start">
            Remarks for the order service
          </DialogDescription>
        </DialogHeader>
        <RemarksForm dataProps={data} setDialogIsOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
