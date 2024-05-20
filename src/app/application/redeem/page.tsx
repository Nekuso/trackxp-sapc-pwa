"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Redeem() {
  return (
    <div className="flex flex-col gap-4 min-h-screen w-full place-items-center justify-start p-4 relative">
      <div className="w-full h-[150px] bg-slate-300 rounded-2xl"></div>
    </div>
  );
}
