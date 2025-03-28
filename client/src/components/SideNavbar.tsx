import React from "react";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { GoHome } from "react-icons/go";
import { MdOutlineTaskAlt } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { RiBuilding2Line } from "react-icons/ri";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNavbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      icon: <GoHome className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      name: "Communities",
      icon: <RiBuilding2Line className="h-5 w-5" />,
      path: "/communities",
    },
    {
      name: "Roles",
      icon: <MdOutlineTaskAlt className="h-5 w-5" />,
      path: "/roles",
    },
    {
      name: "Users",
      icon: <LuUsers className="h-5 w-5" />,
      path: "/users",
    },
  ];

  return (
    <div className="h-screen w-[280px] flex flex-col items-center select-none border-r border-[#E5E7EB]">
      <div className="flex px-6 items-center gap-2 border-b w-full h-[57px]">
        <HiOutlineShieldCheck className="h-8 w-8 text-[#2563EB]" />
        <span className="text-xl font-semibold">AdminHub</span>
      </div>
      {/* ----- */}
      <div className="gap-1 flex flex-col w-full px-5 mt-4">
        {navItems.map((item, index) => (
          <Link key={index} href={item.path}>
            <div
              className={`w-full p-3 hover:bg-[#EFF6FF] rounded-md ${
                pathname === item.path
                  ? "bg-[#EFF6FF] text-[#2563EB]"
                  : "text-[#4B5563]"
              }`}
            >
              <div className="flex items-center gap-3 ">
                {item.icon}
                <span className="text-base font-medium">{item.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavbar;
