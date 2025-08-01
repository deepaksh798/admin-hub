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
import { getAllUsers } from "@/network/Api";
import React, { useEffect } from "react";
import { toast } from "sonner";

const page = () => {
  const [users, setUsers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    getAllUsers()
      .then((response) => {
        setUsers(response.data.content.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        toast.error("Failed to fetch users: " + error.message);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div>No users found.</div>;
  }

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
