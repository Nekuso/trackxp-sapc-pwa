"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Application() {
  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();
  if (!currentUser) {
    redirect("/auth");
  }

  return (
    <div className="flex flex-col gap-4 min-h-screen w-full place-items-center justify-start p-6 relative">
      <div className="w-full h-fit flex flex-col">
        <h1 className="text-lg text-white">Welcome Back,</h1>
        <h1 className="text-2xl text-white font-bold">
          {currentUser?.first_name} {currentUser?.last_name}
        </h1>
      </div>
      <div className="w-full h-[150px] bg-slate-300 rounded-2xl"></div>
    </div>
  );
}
