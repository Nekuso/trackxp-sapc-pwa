"use client";

import React from "react";
import { GoHomeFill } from "react-icons/go";
import { SiGoogleanalytics } from "react-icons/si";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaUserLarge } from "react-icons/fa6";
import { RiCouponFill } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { pathNameFilter } from "@/hooks/pathNameFilter";
import { FaHandshake } from "react-icons/fa6";
import Link from "next/link";

export default function page() {
  const router = useRouter();
  const navItems = [
    {
      id: 1,
      icon: <GoHomeFill className="text-xl text-white" />,
      title: "Application",
      link: "/application",
    },
    {
      id: 2,
      icon: <SiGoogleanalytics className="text-xl text-white" />,
      title: "Orders",
      link: "/application/orders",
    },
    {
      id: 3,
      icon: <RiCouponFill className="text-xl text-white" />,
      title: "Redeem",
      link: "/application/redeem",
    },
    {
      id: 4,
      icon: <FaHandshake className="text-xl text-white" />,
      title: "Services",
      link: "/application/services",
    },
    {
      id: 5,
      icon: <FaUserLarge className="text-xl text-white" />,
      title: "Profile",
      link: "/application/profile",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="w-full h-[100px] flex justify-center place-items-center fixed bottom-0 py-5 px-[1.25rem] bg-darkComponentBg border border-lightBorder rounded-t-[2.5rem] shadow-t-xl z-50">
      <div className="w-full h-full flex px-.8 justify-between place-items-center">
        {navItems.map((item) => {
          const { link } = item;
          return (
            <span
              key={item.id}
              onClick={() => router.push(link)}
              className={`flex flex-col justify-center place-items-center hover:bg-applicationPrimary primary-glow transition-all duration-300 w-14 h-14 rounded-2xl hover:scale-110 cursor-pointer active:scale-95 bg-${
                link.toLowerCase() === pathname
                  ? "applicationPrimary scale-110"
                  : link
                      .toLowerCase()
                      .includes(pathNameFilter(pathname).toLowerCase())
                  ? "applicationPrimary scale-110"
                  : "transparent"
              }`}
            >
              {item.icon}
            </span>
          );
        })}
      </div>
    </div>
  );
}
