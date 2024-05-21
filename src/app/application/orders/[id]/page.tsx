"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useOrderServices } from "@/hooks/useOrderService";
import { toast } from "@/components/ui/use-toast";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import OrdersContent from "./order-content";
import { cn } from "@/lib/utils";
import Searching from "@/images/loading-search.gif";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useSound from "use-sound";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Order({ params }: { params: any }) {
  const { getItem } = useLocalStorage("value");
  const router = useRouter();
  const currentUser = getItem();
  const [notificationCounter, setNotificationCounter] = useState(0);
  const [error, setError] = useState(false);

  const { getOrderServiceTracking, currentOrderServiceData } =
    useOrderServices();

  const [play] = useSound("/sounds/notification.mp3", { volume: 1 });

  useEffect(() => {
    const initialFetch = async () => {
      const result = getOrderServiceTracking(params);
      if (result) setError(result);
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
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel(`order-service-mobile-tracking-follow-up-${params.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "order_services",
            filter: `id=eq.${params.id}`,
          },
          (payload: any) => {
            getOrderServiceTracking(params, 0);
          }
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "progress_entries",
            filter: `order_service_id=eq.${params.id}`,
          },
          (payload: any) => {
            getOrderServiceTracking(params, 0);
            setNotificationCounter((prev) => prev + 1);
            setTimeout(() => {
              toast({
                className: cn(
                  "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-applicationPrimary text-white shadow-xl border-transparent font-medium"
                ),
                title: "📣 Notification",
                description: `An order has been updated!`,
              });
            }, 500);
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 min-h-[70vh] w-full place-items-center justify-start px-8 pb-8 relative">
      <div className="w-full h-fit flex flex-col justify-between sticky top-0 bg-darkBg z-50">
        <div className="w-full flex flex-col py-6 bg-darkBg">
          <h1 className="text-start text-2xl text-white font-bold flex place-items-center gap-4">
            <FaAngleLeft
              onClick={() => router.back()}
              className={` text-md flex flex-col justify-center place-items-center transition-all duration-300 w-7 h-7 rounded-lg hover:scale-110 cursor-pointer active:scale-95 `}
            />
            Order Overview
          </h1>
        </div>
      </div>

      {currentOrderServiceData.length === 0 ? (
        <div className="w-full min-h-[70vh] flex justify-center place-items-center">
          <Image
            src={Searching}
            alt="Receipt Logo"
            className="w-full md:w-[25%] mx-auto"
          />
        </div>
      ) : (
        <OrdersContent currentOrderServiceData={currentOrderServiceData} />
      )}
    </div>
  );
}
