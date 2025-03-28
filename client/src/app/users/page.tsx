"use client";
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
import { fetchUsers } from "@/lib/Redux/Slice/usersSlice";
import React, { useEffect } from "react";

const page = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  // Fetch new data
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  console.log("users -----> ", users);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium">Users</h1>
      </div>
      <div className="mt-5">
        <Table>
          <TableCaption>List of all Users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>UpdatedAt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((data: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.email}</TableCell>
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

export default page;
