"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";
import smallVehicle from "@/images/vehicle-small-hd.png";
import mediumVehicle from "@/images/vehicle-medium-hd.png";
import largeVehicle from "@/images/vehicle-large-hd.png";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function OrdersContent({ orderServicesData }: any) {
  console.log(orderServicesData);

  return (
    <div className="w-full minh-[1300px] flex flex-col gap-6 justify-between rounded-2xl">
      {orderServicesData.map((order: any) => {
        return (
          <div className="w-full h-fit bg-darkComponentBg rounded-2xl p-4 shadow-xl flex flex-col gap-2 active:scale-95 transition-all duration-300">
            <div className="w-full flex flex-col">
              <div className="w-full flex justify-between place-items-center">
                <h1 className="text-white text-xs">
                  Status:{" "}
                  <span className="text-white text-xs font-bold">
                    {
                      order.progress_entries[order.progress_entries.length - 1]
                        .progress_name
                    }
                  </span>
                </h1>
                <h1 className="text-white text-xs bg-applicationPrimary px-2 py-1 rounded-full">
                  {order.status}
                </h1>
              </div>
              <div className="w-full flex justify-between place-items-center">
                <h3 className="w-full text-md font-bold text-slate-200 ">
                  Tracking ID: {order.tracking_id}
                </h3>
              </div>
              <div className="w-full flex justify-between place-items-center">
                <h3 className="w-full text-xs font-regular text-slate-200 ">
                  {new Date(order.created_at).toDateString()}
                </h3>
              </div>
            </div>
            <div className="flex justify-between place-items-center gap-2 w-full">
              <div className="h-full flex flex-col justify-center">
                <h2
                  className={cn(
                    "w-full text-center text-3xl font-extrabold text-white",
                    order.progress_entries.length > 4 ? "text-green-300" : ""
                  )}
                >
                  <CountUp
                    start={0}
                    end={Math.round((order.progress_entries.length / 5) * 100)}
                    duration={5}
                  />
                  %
                </h2>
                <span
                  className={cn(
                    "w-full text-center text-xs text-slate-300",
                    order.progress_entries.length > 4 ? "text-green-300" : ""
                  )}
                >
                  Completion
                </span>
              </div>
              <Image
                src={
                  order.vehicle_entries[0].type === "small"
                    ? smallVehicle
                    : order.vehicle_entries[0].type === "medium"
                    ? mediumVehicle
                    : largeVehicle
                }
                alt="Vehicle"
                className="rounded-xl w-[70%] pointer-events-none"
              />
            </div>
            <div className="w-full flex justify-between pt-3 border-t border-dashed border-lightGray">
              <span className="text-white text-md font-semibold">Total</span>
              <span className="text-white text-lg font-bold">
                ₱{" "}
                {order.total_price
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
