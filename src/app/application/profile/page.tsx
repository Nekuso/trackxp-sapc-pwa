"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Profile() {
  const [isPending, startTransition] = useTransition();

  const { removeItem } = useLocalStorage("value");
  const onSignOut = async () => {
    toast({
      className: cn(
        "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-applicationPrimary text-white shadow-xl border-transparent font-medium"
      ),
      title: "Logging out...",
      description: `Come back soon!`,
    });
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
