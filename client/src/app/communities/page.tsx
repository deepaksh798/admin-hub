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
import { getAllCommunities } from "@/network/Api";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Communities = () => {
  const [communities, setCommunities] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = () => {
    setLoading(true);
    getAllCommunities()
      .then((response) => {
        setCommunities(response.data.content);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        toast.error("Failed to fetch communities: " + error.message);
        setLoading(false);
      });
  };

  // Open create-new-community
  const handleCreateNew = () => {
    router.push("/communities/create-new-community");
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (Object.keys(communities).length === 0) {
    return <div>No communities found.</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">Communities</h1>
        <Button onClick={() => handleCreateNew()}>Create Community</Button>
      </div>
      <div className="mt-5">
        <Table>
          <TableCaption>List of all community</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Community Name</TableHead>
              <TableHead>Total Memebers</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {communities?.data?.map((data: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.members.length}</TableCell>
                <TableCell>
                  {new Date(data.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  <Button variant="outline">Manage</Button>
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
