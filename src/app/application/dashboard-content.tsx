"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import smallVehicle from "@/images/vehicle-small-hd.png";
import mediumVehicle from "@/images/vehicle-medium-hd.png";
import largeVehicle from "@/images/vehicle-large-hd.png";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";
import { allPurchaseOrderServicesDisplay } from "@/types";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function DashboardContent({
  currentUser,
  latestOrderServiceData,
}: any) {
  const data: allPurchaseOrderServicesDisplay = latestOrderServiceData[0];

  return (
    <div className="flex flex-col gap-4 min-h-screen w-full place-items-center justify-start p-6 relative">
      <div className="w-full h-fit flex flex-col">
        <h1 className="text-lg text-white">Welcome Back,</h1>
        <h1 className="text-2xl text-white font-bold">
          {currentUser?.first_name} {currentUser?.last_name}
        </h1>
      </div>
      {latestOrderServiceData.length > 0 && (
        <div className="w-full h-[150px] bg-applicationPrimary rounded-2xl p-4">
          <div className="w-full flex justify-between place-items-center">
            <h1 className="text-white text-xs">Latest Order</h1>
            <h1 className="text-white text-xs">{data?.status}</h1>
          </div>
          <div className="w-full flex justify-between place-items-center">
            <h3 className="w-full text-md font-bold text-slate-200 ">
              Tracking ID: {data?.tracking_id}
            </h3>
          </div>
          <div className="flex justify-between place-items-center gap-2 w-full">
            <div className="h-full flex flex-col justify-center">
              <h2
                className={cn(
                  "w-full text-center text-4xl font-extrabold text-white"
                )}
              >
                <CountUp
                  start={0}
                  end={Math.round((data?.progress_entries.length / 5) * 100)}
                  duration={5}
                />
                %
              </h2>
              <span
                className={cn(
                  "w-full text-center text-xs text-slate-300",
                  data?.progress_entries.length > 4 ? "text-green-300" : ""
                )}
              >
                Completion
              </span>
            </div>
            <Image
              src={
                data?.vehicle_entries[0].type === "small"
                  ? smallVehicle
                  : data?.vehicle_entries[0].type === "medium"
                  ? mediumVehicle
                  : largeVehicle
              }
              alt="Vehicle"
              className="rounded-xl w-[70%] "
            />
          </div>
        </div>
      )}
    </div>
  );
}
