"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { removeToken } from "@/_utils/cookies";
import { useRouter } from "next/navigation";
import { LuUserRound } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { meApi } from "@/network/Api";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  const fetchUserProfile = async () => {
    try {
      const response = await meApi();
      const { name, email } = response.data.content.data;
      setUser({ name, email });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E5E7EB] bg-[#ecedee] flex items-center justify-center">
                <LuUserRound className="h-full w-full text-[#6B7280]" />
              </div>
              <div className="leading-3">
                <div className="font-medium text-base">
                  {user ? user.name : "Loading..."}
                </div>
                <span className="text-[#6B7280]">{user ? user.email : ""}</span>
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
