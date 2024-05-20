"use client";

import Image from "next/image";

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Application() {
  // check to see if on desktop or on mobile and log true or false
  return (
    <div className="flex flex-col min-h-screen w-full place-items-center justify-center p-24 bg-darkBg">
      <h1 className="text-white">Dashboard</h1>
    </div>
  );
}
