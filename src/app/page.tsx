"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Viewport } from "next";
import Link from "next/link";
import Onboarding from "@/images/onboarding.png";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Home() {
  const router = useRouter();

  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();
  if (currentUser) {
    redirect("/application");
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="hidden w-full min-h-screen md:flex justify-center place-items-center">
        <h1 className="text-white">Download The App</h1>
      </div>
      <div className="md:hidden flex flex-col gap-8 h-screen max-h-screen w-full place-items-center justify-center py-8 px-5 bg-darkBg">
        <div className="w-full h-full flex flex-col gap-6 justify-center place-items-center">
          <Image src={Onboarding} alt="Onboarding" className="w-full pointer-events-none" />
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-white w-full text-center text-2xl font-bold leading-10">
              Let's{" "}
              <span className=" bg-applicationPrimary text-white rounded-full px-4 py-.8 text-md">
                track
              </span>{" "}
              your orders in{" "}
              <span className=" bg-applicationPrimary text-white rounded-full px-4 py-.8 text-md">
                real-time
              </span>
            </h1>
            <p className="text-white text-center text-sm w-full">
              Trackxp is a platform that helps you track your orders in
              real-time and get notified when your order has a new progress.
            </p>
          </div>
        </div>

        <Button
          className="w-full rounded-3xl h-[70px] bg-applicationPrimary hover:bg-applicationPrimary transform active:scale-95 transition-transform"
          onClick={() => router.push("/auth")}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
}
