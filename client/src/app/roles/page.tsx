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
import { useAppDispatch, useAppSelector } from "@/lib/Redux/Hook/hook";
import { fetchRoles } from "@/lib/Redux/Slice/rolesSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function roles() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { roles } = useAppSelector((state) => state.roles);

  // Open create-new-community
  const handleCreateNew = () => {
    router.push("/communities/create-new-role");
  };

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  return (
    <div>
      <div className="text-2xl font-medium">Roles</div>
      <div className="mt-5">
        <Table>
          <TableCaption>List of all Roles</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Owner_Id</TableHead>
              <TableHead>UpdatedAt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((data: any, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{data.name}</TableCell>
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
}

export default roles;
