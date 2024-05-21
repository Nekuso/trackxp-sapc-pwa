"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

export default function RemarksForm({ dataProps, setDialogIsOpen }: any) {
  const [isPending, startTransition] = useTransition();

  const updateRemarksForm = z.object({
    remarks: z.string().nullable(),
  });

  const form = useForm<z.infer<typeof updateRemarksForm>>({
    resolver: zodResolver(updateRemarksForm),
    defaultValues: {
      remarks: dataProps.remarks,
    },
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      setDialogIsOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  disabled={true}
                  placeholder="Notes about this vehicle..."
                  className=" bg-lightBorder border border-lightBorder text-sm text-white rounded-lg p-2 w-full h-32"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
