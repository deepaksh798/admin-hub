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
import { getRoles } from "@/network/Api";
import { log } from "console";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const roles = () => {
  const router = useRouter();
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    getRoles()
      .then((response) => {
        setRoles(response.data.content.data);
        console.log("Roles response:", response.data.content);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        toast.error("Failed to fetch roles: " + error.message);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (roles.length === 0) {
    return <div>No roles found.</div>;
  }

  // Open create-new-community
  const handleCreateNew = () => {
    router.push("/communities/create-new-role");
  };

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
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((data: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{data.name}</TableCell>
                <TableCell>
                  {new Date(data.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  <Button variant="outline">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default roles;
