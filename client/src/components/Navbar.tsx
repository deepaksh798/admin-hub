import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { removeToken } from "@/_utils/cookies";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../../public/profile.png";

const Navbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <div className="flex w-full justify-between px-5 py-2 border-b border-[#E5E7EB]">
      <Input
        className="max-w-[350px] border border-[#31363F] text-white"
        placeholder="search something"
      />
      <div className="flex gap-3 items-center">
        <div className="">
          <Image
            src="/profile.png"
            alt="profile"
            height={40}
            width={40}
            className=" rounded-full"
          />
        </div>
        <div className="leading-3">
          <div className="font-medium text-base">John Smith</div>
          <span className="text-[#6B7280]">john@example.com</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
{
  /* <Button onClick={() => handleLogout()}>Logout</Button> */
}
