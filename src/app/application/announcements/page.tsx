"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Application() {
  return (
    <div className="flex flex-col gap-4 min-h-screen w-full place-items-center justify-start p-4 relative">
      <div className="w-full h-[250px] flex justify-center place-items-center bg-applicationPrimary rounded-2xl p-6">
        <h1 className="text-lg   font-bold w-full text-center text-white">
          Announcements Coming Soon!
        </h1>
      </div>
    </div>
  );
}
