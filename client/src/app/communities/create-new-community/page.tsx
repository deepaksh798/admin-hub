"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getToken } from "@/_utils/cookies";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";

const Page = () => {
  const [communityName, setCommunityName] = useState("");
  const router = useRouter();
  const access_token = getToken();

  const handleCreateCommunity = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!communityName.trim()) {
      alert("Community name is required!");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      };

      const formData = {
        name: communityName,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/community`,
        formData,
        config
      );

      if (response.data.status) {
        alert("Community created successfully!");
      } else {
        alert(response.data.message || "Failed to create community.");
      }
    } catch (error) {
      console.error("Error creating community:", error);
      alert("Something went wrong!");
    }
  };

  const handleBack = () => {
    router.push("/communities");
  };

  return (
    <div>
      <div className="flex items-center gap-1 text-2xl font-bold">
        <MdKeyboardArrowLeft
          className="h-9 w-9 cursor-pointer"
          onClick={handleBack}
        />
        Create Community
      </div>
      <form
        onSubmit={handleCreateCommunity}
        className="max-w-sm space-y-3 mt-5"
      >
        <Label className="text-xl">Enter the community name</Label>
        <Input
          placeholder="Enter name here"
          value={communityName}
          onChange={(e) => setCommunityName(e.target.value)}
        />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default Page;
