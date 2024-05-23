"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useServices } from "@/hooks/useServices";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { redirect } from "next/navigation";
import ServicesContent from "./services-content";
import Searching from "@/images/loading-search.gif";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Application() {
  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();
  const [error, setError] = useState(false);
  const { getServices, servicesData } = useServices();
  useEffect(() => {
    const initialFetch = async () => {
      const result = getServices();
      if (result) setError(result);
    };
    initialFetch();
    if (!currentUser) {
      redirect("/auth");
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full place-items-center justify-start px-4 relative">
      <div className="w-full h-fit flex flex-col justify-between px-2 relative">
        <div className="w-full flex flex-col py-6 sticky top-0 bg-darkBg z-[50]">
          <h1 className="text-start text-2xl text-white font-bold">
            All Services
          </h1>
          <p className="text-white text-sm">
            View all services available on all our branches.
          </p>
        </div>
        {servicesData.length === 0 ? (
          <div className="w-full min-h-[70vh] flex justify-center place-items-center">
            <Image
              src={Searching}
              alt="Loading Logo"
              className="w-full md:w-[25%] mx-auto"
            />
          </div>
        ) : (
          <ServicesContent servicesData={servicesData} />
        )}
      </div>
    </div>
  );
}
