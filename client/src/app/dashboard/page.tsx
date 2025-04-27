"use client";

import WelcomeSection from "@/components/WelcomeSection";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/Hook/hook";
import { fetchCommunities } from "@/lib/Redux/Slice/communitiesSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { MdOutlineTaskAlt } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { RiBuilding2Line } from "react-icons/ri";

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const communities = useAppSelector((state: any) => state?.communities);

  useEffect(() => {
    dispatch(fetchCommunities());
  }, []);

  // Open create-new-community
  const handleCreateNew = () => {
    router.push("/community/create-new-community");
  };

  return (
    <div>
      <WelcomeSection />
      <div className="flex gap-6 mt-8">
        <div className="w-full flex justify-between p-6 border rounded-lg">
          <div>
            <span className="text-base text-[#6B7280]">Total Users</span>
            <div className="text-3xl font-bold mt-3">2543</div>
          </div>
          <div className="h-fit p-3 bg-[#EFF6FF] text-[#2563EB] rounded-lg">
            <LuUsers className="h-6 w-6" />
          </div>
        </div>
        <div className="w-full flex justify-between p-6 border rounded-lg">
          <div>
            <span className="text-base text-[#6B7280]">Total Communities</span>
            <div className="text-3xl font-bold mt-3">
              {communities?.communities?.meta?.total}
            </div>
          </div>
          <div className="h-fit p-3 bg-[#FAF5FF] text-[#9333EA] rounded-lg">
            <RiBuilding2Line className="h-6 w-6" />
          </div>
        </div>
        <div className="w-full flex justify-between p-6 border rounded-lg">
          <div>
            <span className="text-base text-[#6B7280]">Active Roles</span>
            <div className="text-3xl font-bold mt-3">85</div>
          </div>
          <div className="h-fit p-3 bg-[#F0FDF4] text-[#16A34A] rounded-lg">
            <MdOutlineTaskAlt className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
