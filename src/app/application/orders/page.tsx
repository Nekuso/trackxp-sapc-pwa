"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";
import OrdersContent from "./orders-content";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useOrderServices } from "@/hooks/useOrderService";
import { toast } from "@/components/ui/use-toast";
import createSupabaseBrowserClient from "@/lib/supabase/client";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Orders() {
  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();

  const [error, setError] = useState(false);

  const { getOrderServices, orderServicesData } = useOrderServices();

  useEffect(() => {
    const initialFetch = async () => {
      const result = getOrderServices(currentUser);
      if (result) setError(result);
    };
    initialFetch();
    if (!currentUser) {
      redirect("/auth");
    }
  }, []);

  useEffect(() => {
    if (getOrderServices.length > 0) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel(`service-mobile-orders-follow-up-${currentUser.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "order_services",
            filter: `mobile_user_id=eq.${currentUser.id}`,
          },
          (payload: any) => {
            getOrderServices(currentUser);
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, [orderServicesData]);

  return (
    <div className="flex flex-col gap-4 min-h-screen w-full place-items-center justify-start px-4 relative">
      <div className="w-full h-fit flex flex-col justify-between px-4 relative">
        <div className="w-full flex flex-col py-6 sticky top-0 bg-darkBg z-[50]">
          <h1 className="text-start text-2xl text-white font-bold">
            Recent Orders
          </h1>
          <p className="text-white text-sm">
            View all your recent orders here.
          </p>
        </div>

        <OrdersContent orderServicesData={orderServicesData} />
      </div>
    </div>
  );
}
