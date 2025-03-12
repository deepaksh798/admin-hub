"use client";

import { getToken } from "@/_utils/cookies";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Open create-new-community
  const handleCreateNew = () => {
    router.push("/community/create-new-community");
  };

  // Fetch Table Data
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const access_token = getToken();
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/community`,
          config
        );

        console.log("we are here", data);

        if (data.status) {
          console.log(data);

          setCommunities(data.content.data); // Store the fetched community data
        } else {
          throw new Error("Failed to fetch communities");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="pt-8 px-4">
      <div className="flex justify-end">
        <Button onClick={() => handleCreateNew()}>Create New Community</Button>
      </div>
      <div className="mt-5">
        <Table>
          <TableCaption>List of all community</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Owner_Id</TableHead>
              <TableHead>UpdatedAt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {communities.map((data: any, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.owner}</TableCell>
                <TableCell>
                  {new Date(data.updatedAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
