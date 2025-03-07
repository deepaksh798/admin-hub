import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { removeToken } from "@/_utils/cookies";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <div className="flex w-full justify-between px-5 py-2 bg-[#222831]">
      <Input
        className="max-w-[350px] border border-[#31363F] text-white"
        placeholder="search something"
      />
      <Button onClick={() => handleLogout()}>Logout</Button>
    </div>
  );
};

export default Navbar;
