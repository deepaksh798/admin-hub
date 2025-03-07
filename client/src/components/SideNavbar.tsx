import React from "react";
import { RiCommunityFill } from "react-icons/ri";

const SideNavbar = () => {
  return (
    <div className="h-screen bg-[#222831] w-[290px] text-white flex flex-col items-center select-none">
      <div className="flex  items-center gap-2 p-5 ">
        <RiCommunityFill className="h-9 w-9" />
        <span>COMMUNITY</span>
      </div>
      {/* ----- */}
      <div className="gap-2 flex flex-col w-full px-5">
        <div className="w-full p-4 hover:bg-transparent/40 rounded-md">
          <div>Community</div>
        </div>
        <div className="w-full p-4 hover:bg-transparent/40 rounded-md">
          <div>Users</div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
