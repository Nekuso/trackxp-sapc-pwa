"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RatingForm from "./rating-form";

export default function RatingDialog({ data, progress_entries }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(
    data.rating === null && progress_entries.length === 5 ? true : false
  );

  useEffect(() => {
    setDialogIsOpen(
      data.rating === null && progress_entries.length === 5 ? true : false
    );
  }, [data.rating, progress_entries]);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogContent className="w-[350px] md:max-w-[370px] md:w-[370px] rounded-2xl bg-darkComponentBg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-start text-white">Rating</DialogTitle>
          <DialogDescription className="text-start text-slate-400">
            How was your experience with this service?
          </DialogDescription>
        </DialogHeader>
        <RatingForm data={data} setDialogIsOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
