import React from "react";

const getInitials = (name: string = "User") => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const WelcomeSection: React.FC<any> = ({ profileData }) => {
  return (
    <div className="w-full flex items-center p-6 rounded-xl gap-4 bg-gradient-to-l from-[#6366F1] to-[#4F46E5]">
      <div>
        <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-xl font-bold text-[#4F46E5]">
          {getInitials(profileData?.name)}
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Welcome back, {profileData?.name || "User"}!
        </h1>
        <span className="text-base text-[#E0E7FF]">{profileData?.email}</span>
      </div>
    </div>
  );
};

export default WelcomeSection;
