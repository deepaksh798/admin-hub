"use client";

import WelcomeSection from "@/components/WelcomeSection";
import React, { useEffect } from "react";
import { MdOutlineTaskAlt } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { RiBuilding2Line } from "react-icons/ri";
import { meApi } from "@/network/Api";
import { toast } from "sonner";

const Dashboard = () => {
  const [communities, setCommunities] = React.useState<any>({});
  const [profileData, setprofileData] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    meApi()
      .then((response) => {
        setprofileData(response.data.content.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        toast.error("Failed to fetch profile data: " + error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <WelcomeSection profileData={profileData} />
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
            <div className="text-3xl font-bold mt-3">78</div>
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
