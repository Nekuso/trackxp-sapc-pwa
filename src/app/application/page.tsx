"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import DashboardContent from "./dashboard-content";
import { useOrderServices } from "@/hooks/useOrderService";
import { toast } from "@/components/ui/use-toast";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import useSound from "use-sound";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Application() {
  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();

  const [notificationCounter, setNotificationCounter] = useState(0);
  const [play] = useSound("/sounds/notification.mp3", { volume: 1 });
  const { getOrderServicesLatest, latestOrderServiceData } = useOrderServices();

  useEffect(() => {
    const initialFetch = async () => {
      const result = getOrderServicesLatest(currentUser);
    };
    initialFetch();
    if (!currentUser) {
      redirect("/auth");
    }
  }, []);

  useEffect(() => {
    if (notificationCounter > 0) {
      play();
    }
  }, [notificationCounter]);

  useEffect(() => {
    if (latestOrderServiceData.length > 0) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel(`latest-service-orders-follow-up-${currentUser.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "order_services",
            filter: `mobile_user_id=eq.${currentUser.id}`,
          },
          (payload: any) => {
            getOrderServicesLatest(currentUser);
          }
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "progress_entries",
            filter: `order_service_id=eq.${latestOrderServiceData[0].id}`,
          },
          (payload: any) => {
            getOrderServicesLatest(currentUser, 0);
            setNotificationCounter((prev) => prev + 1);

            setTimeout(() => {
              toast({
                className: cn(
                  "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-applicationPrimary text-white shadow-xl border-transparent font-medium"
                ),
                title: "📣 Notification",
                description: `Latest order has been updated!`,
              });
            }, 500);
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, [latestOrderServiceData]);

  return (
    <div className="flex flex-col gap-4 w-full place-items-center justify-start">
      <DashboardContent
        currentUser={currentUser}
        latestOrderServiceData={latestOrderServiceData}
      />
    </div>
  );
}
