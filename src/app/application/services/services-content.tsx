"use client";

import Image from "next/image";

import type { Viewport } from "next";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageInput from "./image-input";
import { TbCurrencyPeso } from "react-icons/tb";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function ServicesContent({ servicesData }: any) {
  const router = useRouter();

  console.log(servicesData);
  return (
    <div className="w-full flex flex-col gap-6 justify-between rounded-2xl pb-14">
      {servicesData.map((order: any) => {
        return (
          <div className="w-full h-fit bg-darkComponentBg rounded-2xl p-4 shadow-xl flex flex-col gap-2 active:scale-95 transition-all duration-300">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex place-items-start gap-3">
                  <Avatar className="w-24 h-24 cursor-pointer z-0 rounded-md">
                    <AvatarImage src={order.image_url} alt={order.image_url} />
                    <AvatarFallback className="bg-darkBg rounded-md text-white">
                      {order.name[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="flex text-md flex-wrap font-semibold text-white">
                      {order.name}
                    </p>
                    <p className="flex flex-wrap text-xs text-white/50">
                      Status: {order.status}
                    </p>
                    <p className="flex flex-wrap text-xs text-white/50">
                      Duration: {order.duration}
                    </p>
                    <p className="flex flex-wrap text-xs text-white/50">
                      Branch: {order.inventory.branches.branch_name}
                    </p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="w-[90%] bg-darkComponentBg border border-lightBorder shadow-2xl rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">Service</DialogTitle>
                </DialogHeader>
                <div className="w-full flex flex-col h-fit">
                  <div className="w-full h-full flex flex-col gap-4">
                    <div className="w-full flex justify-center place-items-center gap-4">
                      <ImageInput data={order.image_url} />
                      <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex flex-col gap-1">
                          <span className="text-xs text-white">
                            Service Name
                          </span>
                          <Input
                            className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white text-xs"
                            type="text"
                            placeholder="Service name"
                            value={order.name}
                            readOnly
                          />
                        </div>
                        <div className="w-full flex gap-4">
                          <div className="w-full flex flex-col gap-1">
                            <span className="text-xs text-white">
                              Estimated Duration (mins)
                            </span>
                            <Input
                              className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white"
                              type="number"
                              placeholder="Duration"
                              value={order.duration}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex flex-col gap-4">
                      <div className="w-full flex flex-col gap-1">
                        <span className="text-xs text-white">Branch</span>
                        <Input
                          className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white text-xs"
                          type="text"
                          placeholder="Service name"
                          value={order.inventory.branches.branch_name}
                          readOnly
                        />
                      </div>
                      <div className="w-full flex gap-4">
                        <div className="w-full flex flex-col gap-1">
                          <span className="text-xs text-white">Location</span>
                          <Textarea
                            className="h-fit rounded-lg bg-lightComponentBg border-slate-600/50 text-white resize-none"
                            placeholder="Location"
                            value={order.inventory.branches.branch_location}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-full">
                      <span className="text-xs text-white">Description</span>
                      <Textarea
                        className="bg-lightComponentBg border-slate-600/50 w-full min-h-[150px] resize-none no-scrollbar text-white"
                        placeholder="Description"
                        value={order.description}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );
      })}
    </div>
  );
}
