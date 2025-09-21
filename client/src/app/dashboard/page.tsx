"use client";

import WelcomeSection from "@/components/WelcomeSection";
import React, { useEffect, useState } from "react";
import { MdOutlineTaskAlt, MdTrendingUp } from "react-icons/md";
import { LuUsers, LuCalendar } from "react-icons/lu";
import { RiBuilding2Line } from "react-icons/ri";
import { getDashboardData, meApi } from "@/network/Api";
import { toast } from "sonner";
import { getTimeAgo } from "@/utils/getTimeAgo";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>({});
  const [profileData, setprofileData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    meApi()
      .then((response) => {
        if (response.data.status) {
          setprofileData(response.data.content.data);
        } else {
          toast.error(response.data.message || "Failed to fetch profile data.");
        }
      })
      .catch((err) => {
        console.error("Error fetching profile data:", err);
        toast.error("Something went wrong while fetching profile data.");
      });

    getDashboardData()
      .then((response) => {
        if (response.data.status) {
          console.log("Dashboard Data:", response.data.content);
          setDashboardData(response.data.content);
        } else {
          toast.error(
            response.data.message || "Failed to fetch dashboard data."
          );
          setError(response.data.message || "Failed to fetch dashboard data.");
        }
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        toast.error("Something went wrong while fetching dashboard data.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <WelcomeSection profileData={profileData} />

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData?.users || 0}
              </p>
              {dashboardData?.todaysActivity?.users > 0 && (
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <MdTrendingUp className="h-4 w-4 mr-1" />+
                  {dashboardData.todaysActivity.users} today
                </div>
              )}
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <LuUsers className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Communities
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData?.communities || 0}
              </p>
              {dashboardData?.todaysActivity?.communities > 0 && (
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <MdTrendingUp className="h-4 w-4 mr-1" />+
                  {dashboardData.todaysActivity.communities} today
                </div>
              )}
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <RiBuilding2Line className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Roles</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData?.roles || 0}
              </p>
              {dashboardData?.todaysActivity?.roles > 0 && (
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <MdTrendingUp className="h-4 w-4 mr-1" />+
                  {dashboardData.todaysActivity.roles} today
                </div>
              )}
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MdOutlineTaskAlt className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
          <div className="flex items-center text-sm text-gray-500">
            <LuCalendar className="h-4 w-4 mr-1" />
            Date
          </div>
        </div>

        <div className="space-y-4">
          {/* Recent Communities */}
          {dashboardData?.recentActivities?.communities?.map(
            (community: any) => (
              <div
                key={community._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <RiBuilding2Line className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {community.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Community • {community.members?.length || 0} members
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {/* {new Date(community.createdAt).toLocaleDateString()} */}
                    {getTimeAgo(community.createdAt)}
                  </p>
                </div>
              </div>
            )
          )}

          {/* Recent Roles */}
          {dashboardData?.recentActivities?.roles?.map((role: any) => (
            <div
              key={role._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MdOutlineTaskAlt className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{role.name}</p>
                  <p className="text-sm text-gray-500">Role created</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(role.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}

          {!dashboardData?.recentActivities?.communities?.length &&
            !dashboardData?.recentActivities?.roles?.length && (
              <div className="text-center py-8 text-gray-500">
                <p>No recent activity to display</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
