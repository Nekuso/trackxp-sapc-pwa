"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast as sonner } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { redirect } from "next/navigation";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Profile() {
  const [isPending, startTransition] = useTransition();

  const { removeItem } = useLocalStorage("value");
  const onSignOut = async () => {
    sonner("Loggin out...", {});
    startTransition(async () => {
      // wait for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      removeItem();
      redirect("/auth");
    });
  };

  return (
    <div className="flex flex-col gap-4 min-h-screen w-full place-items-center justify-start p-4 relative">
      <Button
        className="w-full rounded-3xl h-[70px] bg-red-500 hover:bg-red-600 transform active:scale-95 transition-transform"
        onClick={onSignOut}
      >
        Logout
      </Button>
    </div>
  );
}
