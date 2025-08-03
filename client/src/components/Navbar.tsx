"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { removeToken } from "@/_utils/cookies";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  LogOut,
  Settings,
  User,
  Search,
  Bell,
  HelpCircle as Help,
  Moon,
  Sun,
  ChevronDown,
  Shield,
} from "lucide-react";
import { meApi } from "@/network/Api";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3); // Mock notification count

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const handleHelp = () => {
    router.push("/help");
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await meApi();
      const { name, email } = response.data.content.data;
      setUser({ name, email });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (email: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-red-500",
    ];
    const index = email?.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="flex h-16 items-center justify-end px-6">
        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Help */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHelp}
            className="h-9 w-9 p-0"
          >
            <Help className="h-4 w-4" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="ring-0">
              <Button
                variant="ghost"
                className="flex items-center space-x-3 h-auto p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {loading ? (
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                  ) : (
                    <div
                      className={`w-8 h-8 rounded-full ${
                        user ? getAvatarColor(user.email) : "bg-gray-300"
                      } flex items-center justify-center text-white font-medium text-sm`}
                    >
                      {user ? getInitials(user.name) : "?"}
                    </div>
                  )}
                  <div className="hidden md:block text-left">
                    <div className="font-medium text-sm text-gray-900">
                      {loading ? (
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                      ) : (
                        user?.name || "Unknown"
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {loading ? (
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mt-1" />
                      ) : (
                        user?.email || ""
                      )}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || "Unknown User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || ""}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleProfile}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleSettings}
                className="cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => router.push("/admin")}
                className="cursor-pointer"
              >
                <Shield className="mr-2 h-4 w-4" />
                <span>Admin Panel</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleHelp} className="cursor-pointer">
                <Help className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
