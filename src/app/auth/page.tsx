"use client";

import Image from "next/image";
import LoginAvatar from "@/images/loginAvatar.png";
import SignUpAvatar from "@/images/logoAvatarSignup.png";
import Logo from "@/images/receipt-logo-white.svg";
import { Meteors } from "@/components/ui/meteors";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { redirect, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useMobileUsers } from "@/hooks/useMobileUsers";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const loginSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const signUpScheema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  repeat_password: z.string().min(8, { message: "Passwords must match" }),
});
export default function Login() {
  const router = useRouter();
  const [authSwitch, setAuthSwitch] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { signInWithEmailAndPassword, signUpWithEmailAndPassword } =
    useMobileUsers();
  const form1 = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const form2 = useForm<z.infer<typeof signUpScheema>>({
    resolver: zodResolver(signUpScheema),
  });

  const { setItem, getItem } = useLocalStorage("value");
  const currentUser = getItem();
  if (currentUser) {
    redirect("/application");
  }

  async function onLoginSubmit(data: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const result = await signInWithEmailAndPassword(data);
      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }

      if (result.data.length === 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "User not found",
        });
        return;
      }

      if (data.password !== result.data[0].password) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Incorrect password",
        });
        return;
      }

      toast({
        className: cn(
          "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-applicationPrimary text-white shadow-xl border-transparent font-medium"
        ),
        title: "✅ Sucess",
        description: `Login Successful!`,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setItem(result.data[0]);

      return redirect("/application");
    });
  }
  async function onSignUpSubmit(data: z.infer<typeof signUpScheema>) {
    startTransition(async () => {
      if (data.password !== data.repeat_password) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Passwords do not match",
        });
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const result = await signUpWithEmailAndPassword(data);

      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Email already exists",
        });
        return;
      }

      toast({
        className: cn(
          "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-applicationPrimary text-white shadow-xl border-transparent font-medium"
        ),
        title: "✅ Sucess",
        description: `Signup Successful!`,
      });

      return setAuthSwitch(!authSwitch);
    });
  }
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="hidden w-full min-h-screen md:flex justify-center place-items-center">
        <h1 className="text-white">Download The App</h1>
      </div>
      <div className="md:hidden flex flex-col place-items-start justify-start w-full max-h-screen h-screen overflow-hidden bg-darkGray">
        <motion.div
          className="w-full h-fit py-8 flex flex-col justify-center place-items-center gap-4 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Image
            src={Logo}
            alt="Sentro Auto Parts & Service Center"
            className="mx-auto pointer-events-none cursor-pointer w-[65%] z-50"
            onClick={() => router.push("/")}
          />
          <p className="text-white text-xs w-full text-center font-regular z-50">
            WE TAKE CARE OF YOUR VEHICLE LIKE <br /> IT’S OUR OWN
          </p>

          <motion.div
            className="w-full z-10 absolute top-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Meteors number={30} />
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {authSwitch && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 300 }}
              animate={{ opacity: 1, y: 30 }}
              exit={{ opacity: 0, y: 300 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="w-full h-[80%] bg-darkComponentBg rounded-t-[2.5rem] p-8 flex flex-col gap-6 absolute bottom-0 z-50 overflow-hidden"
            >
              <Image
                src={LoginAvatar}
                alt="Avatar"
                className="absolute w-[60%] top-[1.3%] -right-7 z-0"
              />
              <div className="w-full flex flex-col">
                <h1 className="w-full text-white text-2xl font-bold">
                  Welcome Back!
                </h1>
                <span className="text-white text-sm">Login to continue</span>
              </div>
              <div className="w-full flex flex-col justify-center place-items-center h-fit gap-11 z-40">
                <Form {...form1}>
                  <form
                    className="flex flex-col w-full gap-8"
                    onSubmit={form1.handleSubmit(onLoginSubmit)}
                  >
                    <div className="flex flex-col w-full gap-2">
                      <div className="flex flex-col w-full gap-3">
                        <FormField
                          control={form1.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-white pointer-events-none">
                                Email
                              </FormLabel>
                              <FormControl>
                                <input
                                  title="email"
                                  type="text"
                                  placeholder="Enter your email"
                                  className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-white border border-lightBorder "
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
                          control={form1.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-white pointer-events-none">
                                Password
                              </FormLabel>
                              <FormControl>
                                <input
                                  type="password"
                                  placeholder="••••••••••"
                                  className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-white border border-lightBorder "
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
                      <span
                        className={cn("pointer-events-none", {
                          hidden: isPending,
                        })}
                      >
                        Login
                      </span>
                      <AiOutlineLoading3Quarters
                        className={cn("pointer-events-none animate-spin", {
                          hidden: !isPending,
                        })}
                      />
                    </Button>
                  </form>
                </Form>
              </div>
              <motion.div className="w-full flex justify-center">
                <span className="w-full text-center text-white">
                  Don't have an account?{" "}
                  <span
                    onClick={() => setAuthSwitch(!authSwitch)}
                    className="text-applicationPrimary font-bold hover:underline"
                  >
                    Signup
                  </span>
                </span>
              </motion.div>
            </motion.div>
          )}
          {!authSwitch && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, y: 300 }}
              animate={{ opacity: 1, y: 30 }}
              exit={{ opacity: 0, y: 300 }}
              transition={{ duration: 0.2, delay: 0.5 }}
              className="w-full h-[100%] bg-darkComponentBg rounded-t-[2.5rem] p-8 flex flex-col gap-6 relative z-50"
            >
              <Image
                src={SignUpAvatar}
                alt="Avatar"
                className="absolute w-[25%] top-[3.3%] right-10 z-0"
              />
              <div className="w-full flex flex-col">
                <h1 className="w-full text-white text-2xl font-bold">
                  Welcome!
                </h1>
                <span className="text-white text-sm">Create an account </span>
              </div>
              <div className="w-full flex flex-col justify-center place-items-center h-fit gap-11 z-40">
                <Form {...form2}>
                  <form
                    className="flex flex-col w-full gap-8"
                    onSubmit={form2.handleSubmit(onSignUpSubmit)}
                  >
                    <div className="flex flex-col w-full gap-1">
                      <div className="flex flex-col w-full gap-3">
                        <FormField
                          control={form2.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-white pointer-events-none">
                                Email
                              </FormLabel>
                              <FormControl>
                                <input
                                  title="email"
                                  type="text"
                                  placeholder="Enter your email"
                                  className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-white border border-lightBorder "
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-full flex justify-between gap-3">
                        <div className="flex flex-col w-full gap-3">
                          <FormField
                            control={form2.control}
                            name="first_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs text-white pointer-events-none">
                                  First name
                                </FormLabel>
                                <FormControl>
                                  <input
                                    title="first_name"
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-white border border-lightBorder "
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
                            control={form2.control}
                            name="last_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs text-white pointer-events-none">
                                  Last name
                                </FormLabel>
                                <FormControl>
                                  <input
                                    title="last_name"
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-white border border-lightBorder "
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col w-full gap-3">
                        <FormField
                          control={form2.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-white pointer-events-none">
                                Password
                              </FormLabel>
                              <FormControl>
                                <input
                                  type="password"
                                  placeholder="••••••••••"
                                  className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-white border border-lightBorder "
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
                          control={form2.control}
                          name="repeat_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-white pointer-events-none">
                                Repeat Password
                              </FormLabel>
                              <FormControl>
                                <input
                                  type="password"
                                  placeholder="••••••••••"
                                  className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-white border border-lightBorder "
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
                      <span
                        className={cn("pointer-events-none", {
                          hidden: isPending,
                        })}
                      >
                        Signup
                      </span>
                      <AiOutlineLoading3Quarters
                        className={cn("pointer-events-none animate-spin", {
                          hidden: !isPending,
                        })}
                      />
                    </Button>
                  </form>
                </Form>
              </div>
              <motion.div className="w-full flex justify-center">
                <span className="w-full text-center text-white">
                  Already have an account?{" "}
                  <span
                    onClick={() => setAuthSwitch(!authSwitch)}
                    className="text-applicationPrimary font-bold hover:underline"
                  >
                    Login
                  </span>
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <Toaster />
      </div>
    </div>
  );
}
