"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
import { useOrderServices } from "@/hooks/useOrderService";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import { useToast } from "@/components/ui/use-toast";
import "@smastrom/react-rating/style.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useSound from "use-sound";

export default function RatingForm({ data, setDialogIsOpen }: any) {
  const { toast } = useToast();
  const { updateOrderServiceRating } = useOrderServices();
  const [isPending, startTransition] = useTransition();
  const [notificationCounter, setNotificationCounter] = useState(0);
  const [play] = useSound("/sounds/notification.mp3", { volume: 1 });
  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();

  const updateRatingForm = z.object({
    id: z.string().nullable(),
    rating: z.coerce.number().min(1, {
      message: "Rating is required",
    }),
  });

  const form = useForm<z.infer<typeof updateRatingForm>>({
    resolver: zodResolver(updateRatingForm),
    defaultValues: {
      id: data.id,
      rating: 0,
    },
  });

  form.setValue("id", data.id);

  async function onSubmit(data: any) {
    startTransition(async () => {
      await updateOrderServiceRating({ ...data, user: currentUser });
      await new Promise((resolve) => setTimeout(resolve, 500));
      setDialogIsOpen(false);
      setNotificationCounter((prev) => prev + 1);

      setTimeout(() => {
        toast({
          className: cn(
            "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-applicationPrimary text-white shadow-xl border-transparent font-medium"
          ),
          title: "📣 Notification",
          description: `Rating has been recorded. Thank you!`,
        });
      }, 500);
    });
  }

  useEffect(() => {
    if (notificationCounter > 0) {
      play();
    }
  }, [notificationCounter]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="w-full">
                <div className="w-full flex justify-center">
                  <ReactRating
                    className="max-w-[80%]"
                    itemStyles={{
                      itemShapes: Star,
                      activeFillColor: "#FFD700",
                      inactiveFillColor: "#252525",
                    }}
                    value={form.getValues("rating")}
                    onChange={(value: any) => form.setValue("rating", value)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
            type="submit"
          >
            <span className={cn({ hidden: isPending })}>Submit</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
