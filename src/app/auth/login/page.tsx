"use client";

import Image from "next/image";
import CarLogin from "@/images/carLogin.png";
import LoginParticles from "@/images/loginParticles.png";
import Logo from "@/images/receipt-logo-white.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
export default function Login() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  async function onSubmit(data: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      // const result = await signInWithEmailAndPassword(data);

      // const { error } = JSON.parse(result);
      // if (error?.message) {
      //   console.log(error);
      //   toast({
      //     variant: "destructive",
      //     title: "Error",
      //     description: error.message,
      //   });
      //   return;
      // }

      toast({
        description: `Mu Login ka ${data.email}?`,
      });
      // return redirect("/application");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
    });
  }
  return (
    <div className="flex flex-col gap-4 p-8 place-items-center w-full max-h-screen h-screen overflow-hidden bg-darkGray relative">
      <div className="w-full flex flex-col justify-center place-items-center h-fit gap-11 pt-20 z-40">
        <Image
          src={Logo}
          alt="Sentro Auto Parts & Service Center"
          onClick={() => router.push("/")}
        />
        <Form {...form}>
          <form
            className="flex flex-col w-full gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col w-full gap-6">
              <div className="flex flex-col w-full gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-white">
                        Email
                      </FormLabel>
                      <FormControl>
                        <input
                          title="email"
                          type="text"
                          placeholder="Enter your email"
                          className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-foregroundBg text-white border border-lightBorder "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col w-full gap-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-white">
                        Password
                      </FormLabel>
                      <FormControl>
                        <input
                          type="password"
                          placeholder="••••••••••"
                          className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-foregroundBg text-white border border-lightBorder "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full flex gap-4 text-white text-sm px-5 py-2.5 h-[50px] text-center  bg-applicationPrimary hover:bg-applicationPrimary/70 font-bold rounded-xl transition-all duration-300 "
            >
              <span className={cn({ hidden: isPending })}>Login</span>
              <AiOutlineLoading3Quarters
                className={cn(" animate-spin", { hidden: !isPending })}
              />
            </Button>
          </form>
        </Form>
      </div>
      <Button
        type="submit"
        className="w-full flex gap-4 text-black text-sm px-5 py-2.5 h-[50px] text-center bg-white hover:bg-white/70 font-bold rounded-xl transition-all duration-300 "
      >
        <span>Signup</span>
      </Button>
      <Image
        src={CarLogin}
        alt="Sentro Auto Parts & Service Center"
        className="absolute top-[80%] left-1/2 transform -translate-x-1/2 w-screen"
      />
      <Image
        src={LoginParticles}
        alt="Sentro Auto Parts & Service Center"
        className="absolute top-[5%] z-10 left-1/2 transform -translate-x-1/2 w-screen"
      />
      <Toaster />
    </div>
  );
}
