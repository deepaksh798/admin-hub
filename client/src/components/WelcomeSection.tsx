import React from "react";
import Image from "next/image";

const WelcomeSection = () => {
  return (
    <div className="w-full flex items-center p-6 rounded-xl gap-4 bg-gradient-to-l from-[#6366F1] to-[#4F46E5]">
      <div className="">
        <Image
          src={"/profile.png"}
          alt=""
          height={48}
          width={48}
          className="rounded-full"
        />
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Welcome back, John Doe
        </h1>
        <span className="text-base text-[#E0E7FF]">john.doe@example.com</span>
      </div>
    </div>
  );
};

export default WelcomeSection;
