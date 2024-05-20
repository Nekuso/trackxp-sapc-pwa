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

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Application() {
  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();

  const [error, setError] = useState(false);

  const { getOrderServicesLatest, latestOrderServiceData } = useOrderServices();

  useEffect(() => {
    const initialFetch = async () => {
      const result = getOrderServicesLatest(currentUser);
      if (result) setError(result);
    };
    initialFetch();
    if (!currentUser) {
      redirect("/auth");
    }
  }, []);

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
            toast({
              title: `Notification`,
              description: `Order ${latestOrderServiceData[0].tracking_id} has been updated.`,
            });
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, [latestOrderServiceData]);

  return (
    <div className="flex flex-col gap-4 min-h-screen w-full place-items-center justify-start">
      <DashboardContent
        currentUser={currentUser}
        latestOrderServiceData={latestOrderServiceData}
      />
    </div>
  );
}
