import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { removeToken } from "@/_utils/cookies";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex gap-3 items-center cursor-pointer">
              <div>
                <Image
                  src="/profile.png"
                  alt="profile"
                  height={40}
                  width={40}
                  className="rounded-full"
                />
              </div>
              <div className="leading-3">
                <div className="font-medium text-base">John Smith</div>
                <span className="text-[#6B7280]">john@example.com</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-500 flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
