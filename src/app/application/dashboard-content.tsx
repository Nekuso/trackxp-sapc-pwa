"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";
import smallVehicle from "@/images/vehicle-small-hd.png";
import mediumVehicle from "@/images/vehicle-medium-hd.png";
import largeVehicle from "@/images/vehicle-large-hd.png";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { allPurchaseOrderServicesDisplay } from "@/types";
import { FaAngleRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Celebrate from "@/images/celebrate.png";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function DashboardContent({
  currentUser,
  latestOrderServiceData,
}: any) {
  const data: allPurchaseOrderServicesDisplay = latestOrderServiceData[0];

  return (
    <div className="flex flex-col gap-8 min-h-screen w-full place-items-center justify-start p-6 relative">
      <div className="w-full h-fit flex flex-col">
        <h1 className="text-lg text-white">Welcome Back,</h1>
        <h1 className="text-2xl text-white font-bold">
          {currentUser?.first_name} {currentUser?.last_name}
        </h1>
      </div>
      <div className="w-full h-fit flex flex-col gap-4">
        {latestOrderServiceData.length > 0 && (
          <div className="w-full h-[150px] bg-applicationPrimary rounded-2xl p-4 shadow-lg">
            <div className="w-full flex justify-between place-items-center">
              <h1 className="text-white text-xs font-semibold ">
                Latest Order
              </h1>
              <h1 className="text-applicationPrimary text-xs px-3 py-1 bg-white rounded-full font-semibold">
                {data?.status}
              </h1>
            </div>
            <div className="w-full flex justify-between place-items-center">
              <h3 className="w-full text-sm font-bold text-slate-200 ">
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
        <div className="w-full flex gap-4 justify-between">
          <div className="w-full h-[130px] flex flex-col justify-between bg-darkComponentBg rounded-2xl p-4 shadow-lg">
            <h1 className="text-white font-semibold text-sm">
              Accumolated Points
            </h1>
            <h1 className="w-full h-full flex justify-center place-items-center font-bold text-center text-white text-4xl">
              {currentUser?.points?.toFixed(2)}
            </h1>
          </div>
          <div className="w-[60%] h-[130px] flex flex-col justify-between bg-white rounded-2xl p-4 shadow-lg">
            <h1 className="text-black font-semibold text-sm">Redeem More!</h1>

            <Link
              href="/application/redeem"
              className="w-full flex justify-center place-items-center active:scale-90"
            >
              <Button className="w-full bg-applicationPrimary hover:bg-applicationPrimary/90 rounded-xl font-semibold text-sm">
                <FaAngleRight className="text-white" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full min-h-[240px] flex flex-col justify-between bg-darkComponentBg rounded-2xl gap-2 p-4 shadow-lg active:scale-95 transition-all duration-300">
          <h1 className="text-white font-semibold text-lg">📣 What's New?</h1>
          <div className="w-full h-full flex justify-between place-items-start gap-2">
            <Image src={Celebrate} alt="Celebrate" className="w-[38%]" />
            <div className="w-full h-full flex flex-col justify-between place-items-center">
              <div className="w-full h-full flex flex-col gap-1">
                <h1 className="text-white font-semibold text-sm">
                  Mobile Platforms!
                </h1>
                <p className="text-xs text-white">
                  We are excited to announce that we are now available on both
                  Android and iOS platforms. This is a huge milestone for us and
                  we are excited to see you on the app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
