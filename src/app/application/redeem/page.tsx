"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { redirect, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useOrderServices } from "@/hooks/useOrderService";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const viewport: Viewport = {
  themeColor: "#fff",
};
const redeemSchema = z.object({
  redeem_code: z.string().min(6, {
    message: "Redeem code must be at least 6 characters long",
  }),
});

export default function Redeem() {
  const [isPending, startTransition] = useTransition();
  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();

  const { redeemOrderService } = useOrderServices();

  const form = useForm<z.infer<typeof redeemSchema>>({
    resolver: zodResolver(redeemSchema),
  });

  async function onSubmit(data: z.infer<typeof redeemSchema>) {
    startTransition(async () => {
      const result = await redeemOrderService({ ...data, user: currentUser });
      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        className: cn(
          "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-applicationPrimary text-white shadow-xl border-transparent font-medium"
        ),
        title: "🎉 Redeemed",
        description: `Your order has been redeemed successfully!`,
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      redirect(`/application/orders/${result.data[0].id}`);
    });
  }

  return (
    <div className="flex flex-col gap-4 min-h-[70vh] w-full place-items-center justify-center p-4 relative">
      <div className="w-full h-fit flex flex-col gap-6 justify-between bg-darkComponentBg rounded-2xl p-8 shadow-lg">
        <div className="w-full flex flex-col">
          <h1 className="text-start text-2xl text-white font-bold">
            Redeem Order
          </h1>
          <p className="text-white text-sm">
            Redeem your tracking service by entering the code from your receipt.
            If you have any issues, please contact us or visit our nearest
            branches.
          </p>
        </div>
        <div className="w-full flex flex-col justify-center place-items-center h-fit gap-6 z-40">
          <Form {...form}>
            <form
              className="flex flex-col w-full gap-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col w-full gap-2">
                <div className="flex flex-col w-full gap-3">
                  <FormField
                    control={form.control}
                    name="redeem_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-white pointer-events-none">
                          Enter Code
                        </FormLabel>
                        <FormControl>
                          <input
                            title="redeem_code"
                            type="text"
                            placeholder="Enter Code"
                            className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-white border border-lightBorder "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full flex gap-4 text-white text-sm px-5 py-2.5 h-[50px] text-center bg-applicationPrimary hover:bg-applicationPrimary/70 font-bold rounded-xl transition-all duration-300 active:scale-95"
              >
                <span
                  className={cn("pointer-events-none", {
                    hidden: isPending,
                  })}
                >
                  Redeem
                </span>
                <AiOutlineLoading3Quarters
                  className={cn("pointer-events-none animate-spin", {
                    hidden: !isPending,
                  })}
                />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
