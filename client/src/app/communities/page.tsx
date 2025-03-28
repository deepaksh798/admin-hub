"use client";
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
import { useAppDispatch, useAppSelector } from "@/lib/Redux/Hook/hook";
import { fetchCommunities } from "@/lib/Redux/Slice/communitiesSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Communities = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const communities = useAppSelector((state: any) => state.communities);
  console.log("in comm before--->", communities);

  useEffect(() => {
    dispatch(fetchCommunities());
  }, []);

  // Open create-new-community
  const handleCreateNew = () => {
    router.push("/communities/create-new-community");
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={() => handleCreateNew()}>Create Community</Button>
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
            {communities?.communities?.data?.map((data: any, index: any) => (
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

export default Communities;
