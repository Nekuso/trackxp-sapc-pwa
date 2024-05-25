"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";
import smallVehicle from "@/images/vehicle-small-hd.png";
import mediumVehicle from "@/images/vehicle-medium-hd.png";
import largeVehicle from "@/images/vehicle-large-hd.png";
import { formatDistanceToNow } from "date-fns";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdAddToPhotos } from "react-icons/md";
import { RiUserReceived2Fill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { PiGearSixBold, PiMagnifyingGlassFill } from "react-icons/pi";
import { IoIosBarcode } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import RemarksButton from "./remarks/remarks-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaHandsHelping } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";

import { DataTable as ProductOrders } from "./order-service-tables/product-orders/data-table";
import { DataTable as PartOrders } from "./order-service-tables/part-orders/data-table";
import { DataTable as ServiceOrders } from "./order-service-tables/service-orders/data-table";

import { initiateColumns as initiateProductOrdersColumns } from "./order-service-tables/product-orders/columns";
import { initiateColumns as initiatePartsOrdersColumns } from "./order-service-tables/part-orders/columns";
import { initiateColumns as initiateServiceOrdersColumns } from "./order-service-tables/service-orders/columns";
import "@smastrom/react-rating/style.css";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import Rating from "./add-rating/rating-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Autoplay from "embla-carousel-autoplay";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function OrdersContent({ currentOrderServiceData }: any) {
  const plugin = useRef(Autoplay({ delay: 1000, stopOnInteraction: true }));
  const [progress_entries_data, setProgressEntriesData] = useState<any>(
    currentOrderServiceData[0].progress_entries
      .map((progress: any) => ({
        id: progress.id,
        value: progress.progress_name,
        created_at: progress.created_at,
        icon:
          progress.progress_name === "Created"
            ? MdAddToPhotos
            : progress.progress_name === "In Progress"
            ? TbProgressBolt
            : progress.progress_name === "Completed"
            ? MdVerified
            : progress.progress_name === "Quality Checks"
            ? PiMagnifyingGlassFill
            : RiUserReceived2Fill,
        description: progress.description,
        order_service_id: progress.order_service_id,
        tracking_id: progress.tracking_id,
      }))
      .sort(
        (a: any, b: any) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      .reverse()
  );
  useEffect(() => {
    setProgressEntriesData(
      currentOrderServiceData[0].progress_entries
        .map((progress: any) => ({
          id: progress.id,
          value: progress.progress_name,
          created_at: progress.created_at,
          icon:
            progress.progress_name === "Created"
              ? MdAddToPhotos
              : progress.progress_name === "In Progress"
              ? TbProgressBolt
              : progress.progress_name === "Completed"
              ? MdVerified
              : progress.progress_name === "Quality Checks"
              ? PiMagnifyingGlassFill
              : RiUserReceived2Fill,
          description: progress.description,
          order_service_id: progress.order_service_id,
          tracking_id: progress.tracking_id,
        }))
        .sort(
          (a: any, b: any) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        .reverse()
    );
  }, [currentOrderServiceData[0].progress_entries]);

  return (
    <div className="w-full flex flex-col gap-6 justify-between rounded-2xl">
      {currentOrderServiceData.map((order: any) => {
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
                <h1 className="text-white text-xs bg-applicationPrimary px-4 py-1 rounded-full">
                  {order.status}
                </h1>
              </div>
              <div className="w-full flex justify-between place-items-center">
                <h3 className="w-full text-sm font-bold text-slate-200 ">
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
          </div>
        );
      })}

      {currentOrderServiceData[0].rating !== null &&
        currentOrderServiceData.map((order: any) => {
          return (
            <div className="w-full h-fit bg-darkComponentBg rounded-2xl p-4 shadow-xl flex flex-col gap-2 active:scale-95 transition-all duration-300">
              <div className="w-full flex flex-col justify-between place-items-center">
                <h3 className="w-full text-sm font-semibold text-slate-200 ">
                  Ratings
                </h3>
                <h3 className="w-full text-xs font-regular text-slate-200 ">
                  Your rating on this service
                </h3>
              </div>
              <div className="w-full flex justify-center place-items-center">
                <ReactRating
                  className="max-w-[100%]"
                  itemStyles={{
                    itemShapes: Star,
                    activeFillColor: "#FFD700",
                    inactiveFillColor: "#252525",
                  }}
                  readOnly={true}
                  value={order.rating}
                />
              </div>
            </div>
          );
        })}
      {currentOrderServiceData.map((order: any) => {
        return (
          <div className="w-full h-fit bg-darkComponentBg rounded-2xl p-4 shadow-xl flex flex-col gap-2 active:scale-95 transition-all duration-300">
            <div className="w-full flex justify-between place-items-center">
              <h3 className="w-full text-sm font-semibold text-slate-200 ">
                Order Timeline
              </h3>
            </div>
            <div
              className={cn(
                "w-full h-full flex-col flex place-items-center",
                order.progress_entries?.length > 4
                  ? "justify-center"
                  : "justify-start"
              )}
            >
              <div className="w-full h-fit">
                {progress_entries_data.map((progress: any, i: number) => (
                  <div
                    className={cn(
                      "relative pl-16 py-2 group",
                      progress.value === progress_entries_data[0].value
                        ? ""
                        : "opacity-30"
                    )}
                    key={i}
                  >
                    <div className="font-sm font-bold text-md text-white">
                      {progress.value}
                    </div>
                    <div className="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 before:ml-[1rem] before:self-start before:-translate-x-1/2 before:-translate-y-2">
                      <div
                        className={cn(
                          "absolute left-2 sm:left-0 w-11 h-11 border-2 box-content rounded-full ml-[1rem] -translate-x-1/2 -translate-y-2 flex justify-center place-items-center text-center transition-all duration-300 text-white",
                          progress.value === progress_entries_data[0].value
                            ? "animate-pulse-on-ping hover:scale-125"
                            : "",
                          `bg-applicationPrimary`
                        )}
                      >
                        {<progress.icon />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-400 flex place-items-center gap-2">
                          <FaClockRotateLeft />
                          {formatDistanceToNow(new Date(progress.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                        <span className="text-xs 2xl:text-sm text-slate-200">
                          {progress.description}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
      {currentOrderServiceData.map((order: any) => {
        return (
          <div
            className="w-full h-fit bg-darkComponentBg rounded-2xl p-4 shadow-xl flex flex-col gap-2"
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.reset()}
            onMouseOver={() => plugin.current.stop()}
            onMouseOut={() => plugin.current.reset()}
            onFocus={() => plugin.current.stop()}
          >
            <h3 className="w-full flex justify-between place-items-center text-sm font-semibold text-slate-200">
              Images
            </h3>
            <div className="w-full h-full flex flex-col justify-center rounded-xl">
              <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-full rounded-xl"
                opts={{
                  loop: true,
                  dragFree: true,
                }}
              >
                <CarouselContent className="rounded-3xl">
                  {order.image_entries.map((image: any, index: any) => (
                    <CarouselItem key={index} className="basis-full rounded-xl">
                      <div className="p-1 rounded-xl">
                        <AspectRatio
                          ratio={1}
                          className="rounded-xl relative w-full"
                        >
                          <Image
                            src={`${image.image_url}` ?? ""}
                            alt="Photo by Drew Beamer"
                            fill
                            className="w-full rounded-xl object-cover transition-all duration-300 pointer-events-none"
                          />
                        </AspectRatio>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {order.image_entries.length > 0 && (
              <span className="text-center text-xs w-full h-full flex justify-center place-items-center text-slate-400">
                {`Total of ${order.image_entries.length} images`}
              </span>
            )}

            {order.image_entries.length < 1 && (
              <span className="text-center w-full h-full flex justify-center place-items-center text-xs text-slate-400">
                No Images
              </span>
            )}
          </div>
        );
      })}
      {currentOrderServiceData.map((order: any) => {
        return (
          <div className="w-full h-fit bg-darkComponentBg rounded-2xl p-4 shadow-xl flex flex-col gap-2 active:scale-95 transition-all duration-300">
            <h3 className="w-full flex justify-between place-items-center text-sm font-semibold text-slate-200 ">
              Head Mechanic
            </h3>
            <div className="w-full flex gap-3">
              <Avatar className="w-20 h-20 cursor-pointer rounded-lg shadow-2xl primary-glow transition-all duration-300 border-2 border-applicationPrimary hover:border-applicationPrimary">
                <AvatarImage
                  src={order.supervisor.image_url}
                  className=" shadow-2xl primary-glow rounded-md transition-all duration-300 border-transparent hover:border-applicationPrimary"
                />
                <AvatarFallback className="text-black shadow-2xl primary-glow rounded-md transition-all duration-300 border-transparent hover:border-applicationPrimary">{`${order.supervisor.first_name[0]} ${order.supervisor.last_name[0]}`}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col w-full">
                <h3 className="text-lg font-semibold text-applicationPrimary flex place-items-center gap-1 ">
                  <span>
                    {order.supervisor.first_name} {order.supervisor.last_name}
                  </span>
                </h3>
                <h3 className="text-sm font-semibold text-slate-400">
                  {order.supervisor.email}
                </h3>
                <h3 className="text-sm font-semibold text-slate-400">
                  {order.supervisor.contact_number}
                </h3>
              </div>
            </div>
            <h3 className="w-full flex flex-col justify-start place-items-start text-sm font-semibold text-slate-200 ">
              Branch
              <span className="text-sm text-slate-400">
                {order.inventory.branches.branch_name}
              </span>
            </h3>
            <div className="w-full flex flex-col place-items-center gap-1">
              <h3 className="w-full flex justify-between place-items-center text-sm font-semibold text-slate-200 ">
                Mechanics
              </h3>
              <div className="w-full flex flex-col gap-2 ">
                {order.mechanic_entries.length > 1 ? (
                  order.mechanic_entries.map((mechanicData: any, i: number) => (
                    <div className="w-full flex gap-2 p-2 rounded-2xl bg-lightBorder">
                      <Avatar
                        className={cn(
                          `border-2 border-darkComponentBg rounded-xl h-14 w-14`
                        )}
                      >
                        <AvatarImage
                          src={mechanicData.mechanic.image_url}
                          className="rounded-md"
                        />
                        <AvatarFallback className="bg-lightComponentBg text-xs rounded-md">{`${mechanicData.mechanic.first_name[0]}${mechanicData.mechanic.last_name[0]}`}</AvatarFallback>
                      </Avatar>
                      <div className="w-full flex flex-col">
                        <h3 className="text-md font-semibold text-white">
                          {mechanicData.mechanic.first_name}{" "}
                          {mechanicData.mechanic.last_name}
                        </h3>
                        <p className="text-xs text-slate-300">
                          {mechanicData.mechanic.roles.role}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex place-items-center gap-2">
                    <Avatar className={cn(`border-2 border-darkComponentBg`)}>
                      <AvatarImage
                        src={order.mechanic_entries[0].mechanic.image_url}
                        className="rounded-md"
                      />
                      <AvatarFallback className="bg-lightComponentBg text-xs">{`${order.mechanic_entries[0].mechanic.first_name[0]}${order.mechanic_entries[0].mechanic.last_name[0]}`}</AvatarFallback>
                    </Avatar>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {currentOrderServiceData.map((order: any) => {
        return (
          <div className="w-full h-fit bg-darkComponentBg rounded-2xl p-4 shadow-xl flex flex-col gap-2 active:scale-95 transition-all duration-300">
            <div className="w-full flex justify-between place-items-center">
              <h3 className="w-full text-sm font-semibold text-slate-200 ">
                Vehicle Information
              </h3>
            </div>
            <div
              className={cn("w-full h-full flex-col flex place-items-center")}
            >
              <div className="w-full h-full flex flex-col justify-between gap-2">
                <div className="w-full flex justify-between gap-3">
                  <div className="w-full flex flex-col gap-1">
                    <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300 ">
                      ODO Reading
                    </h3>
                    <h3 className="text-xs font-semibold text-slate-400">
                      {order.vehicle_entries[0].odo_reading}
                    </h3>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300 ">
                      Type
                    </h3>
                    <h3 className="text-xs font-semibold text-slate-400">
                      {order.vehicle_entries[0].type.toUpperCase()}
                    </h3>
                  </div>
                </div>
                <div className="w-full flex justify-between gap-3">
                  <div className="w-full flex flex-col gap-1">
                    <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300">
                      Engine Number
                    </h3>
                    <h3 className="text-xs font-semibold text-slate-400 max-w-[140px] truncate">
                      {order.vehicle_entries[0].engine_number}
                    </h3>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300 ">
                      Chassis Number
                    </h3>
                    <h3 className="text-xs font-semibold text-slate-400 max-w-[140px] truncate">
                      {order.vehicle_entries[0].chassis_number}
                    </h3>
                  </div>
                </div>
                <div className="w-full flex justify-between place-items-center gap-3">
                  <div className="w-full flex flex-col gap-1">
                    <div className="w-fit py-1 px-3 flex flex-col border border-dashed rounded-xl">
                      <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-300 ">
                        <IoIosBarcode /> Plate Number
                      </h3>
                      <h3 className="text-lg font-semibold text-white ml-4  ">
                        {order.vehicle_entries[0].plate_number}
                      </h3>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <RemarksButton data={order} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {currentOrderServiceData.map((order: any) => {
        return (
          <div className="w-full h-fit bg-darkComponentBg rounded-2xl p-4 shadow-xl flex flex-col gap-2">
            <div className="w-full flex justify-between place-items-center">
              <h3 className="text-sm font-semibold text-slate-200 ">
                Purchase Summary
              </h3>
              <h3 className="text-sm font-semibold text-slate-200 ">
                Method:{" "}
                {order.payment_method ? order.payment_method : "Pending"}
              </h3>
            </div>
            <ScrollArea className="w-full flex flex-col h-[400px] bg-darkComponentBg rounded-xl gap-0 relative z-10">
              <div className="w-full z-10">
                <Accordion
                  type="multiple"
                  className="w-full rounded-none relative z-10"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className=" sticky top-0 text-white">
                      <span className="flex place-items-center gap-3 font-regular text-white">
                        <FaHandsHelping />
                        Services
                        <span className="text-xs bg-applicationPrimary px-3 rounded-full">
                          {order.purchase_services.length}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="rounded-xl">
                      <ServiceOrders
                        columns={initiateServiceOrdersColumns()}
                        data={order.purchase_services}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="sticky top-0">
                      <span className="flex place-items-center gap-3 font-regular text-white">
                        <BsBoxSeam />
                        Products
                        <span className="text-xs bg-applicationPrimary px-3 rounded-full">
                          {order.purchase_products.length}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="rounded-xl">
                      <ProductOrders
                        columns={initiateProductOrdersColumns()}
                        data={order.purchase_products}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="sticky top-0">
                      <span className="flex place-items-center gap-3 font-regular text-white">
                        <PiGearSixBold />
                        Parts
                        <span className="text-xs bg-applicationPrimary px-3 rounded-full">
                          {order.purchase_parts.length}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="bg-darkComponentBg rounded-xl">
                      <PartOrders
                        columns={initiatePartsOrdersColumns()}
                        data={order.purchase_parts}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div
                  className={cn(
                    "w-full flex-col relative px-2 ",
                    order.amount_paid > 0
                      ? "mb-[170px] 2xl:mb-[170px]"
                      : "mb-[80px]"
                  )}
                >
                  <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] m-0 text-sm">
                    <span className="w-full text-end text-slate-400">
                      Subtotal
                    </span>
                    <span className="w-[60%] text-end text-white">{`₱ ${(
                      order.purchase_products.reduce(
                        (acc: any, product: any) =>
                          acc + product.price * product.quantity,
                        0
                      ) +
                      order.purchase_parts.reduce(
                        (acc: any, part: any) =>
                          acc + part.price * part.quantity,
                        0
                      ) +
                      order.purchase_services.reduce(
                        (acc: any, service: any) => acc + service.price,
                        0
                      )
                    )
                      .toFixed(
                        // sum all the products and parts
                        2
                      )
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                  </div>
                  <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] m-0 text-sm">
                    <span className="w-full text-end text-slate-400">Tax</span>
                    <span className="w-[60%] text-end text-white">₱ 0.00</span>
                  </div>
                  <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] m-0 text-sm">
                    <span className="w-full text-end text-slate-400">VAT</span>
                    <span className="w-[60%] text-end text-white">₱ 0.00</span>
                  </div>
                  <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] m-0 text-sm">
                    <span className="w-full text-end text-slate-400">
                      Discount {order.discount > 0 && `(${order.discount}%)`}
                    </span>
                    <span className="w-[60%] text-end text-white">
                      {`- ₱ ${(
                        (order.purchase_products.reduce(
                          (acc: any, product: any) =>
                            acc + product.price * product.quantity,
                          0
                        ) +
                          order.purchase_parts.reduce(
                            (acc: any, part: any) =>
                              acc + part.price * part.quantity,
                            0
                          ) +
                          order.purchase_services.reduce(
                            (acc: any, service: any) => acc + service.price,
                            0
                          )) *
                        (order.discount / 100)
                      )
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full py-6 px-2 flex flex-col gap-2 justify-between absolute bottom-[-4px] z-30 bg-darkGray">
                <div className="w-full flex gap-8 justify-between">
                  <span className="w-full text-end text-lg font-bold text-white">
                    Total
                  </span>
                  <span className="w-[80%] text-end text-white text-md font-bold">{`₱ ${(
                    (order.purchase_products.reduce(
                      (acc: any, product: any) =>
                        acc + product.price * product.quantity,
                      0
                    ) +
                      order.purchase_parts.reduce(
                        (acc: any, part: any) =>
                          acc + part.price * part.quantity,
                        0
                      ) +
                      order.purchase_services.reduce(
                        (acc: any, service: any) => acc + service.price,
                        0
                      )) *
                    ((100 - order.discount) / 100)
                  )
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
                </div>
                {order.amount_paid > 0 && (
                  <div className="w-full flex flex-col gap-2 justify-between">
                    <div className="w-full flex gap-8 justify-between">
                      <span className="w-full text-end text-slate-400">
                        Amount Paid
                      </span>
                      <span className="w-[60%] text-end text-white">{`₱ -${
                        order.amount_paid
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0
                      }`}</span>
                    </div>
                    <div className="w-full flex gap-8 justify-between">
                      <span className="w-full text-end text-slate-400 py-2">
                        Change
                      </span>
                      <span className="w-[60%] text-end text-white border-t py-2 border-lightBorder">{`₱ ${
                        (order.amount_paid - order.total_price)
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0
                      }`}</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        );
      })}
      <Rating
        data={currentOrderServiceData[0]}
        progress_entries={progress_entries_data}
      />
    </div>
  );
}
