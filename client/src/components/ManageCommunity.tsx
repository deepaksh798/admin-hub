"use client"

import { createCommunityMembers, getAllUsers, getRoles } from "@/network/Api";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

interface ManageCommunityProps {
  communityId: string;
  onClose: () => void;
}

const ManageCommunity: React.FC<ManageCommunityProps> = ({
  communityId,
  onClose,
}) => {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllUsers(), getRoles()])
      .then(([userRes, roleRes]) => {
        const usersData = userRes?.data?.content?.data ?? [];
        const rolesData = roleRes?.data?.content?.data ?? [];

        setUsers(usersData);
        setRoles(rolesData);
      })
      .catch((error) => {
        toast.error("Failed to fetch users or roles");
        console.error("API Error:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddMember = async () => {
    if (!selectedUser || !selectedRole) {
      toast.error("Please select a user and a role");
      return;
    }
    setLoading(true);
    try {
      await createCommunityMembers({
        community: communityId,
        user: selectedUser,
        role: selectedRole,
      });
      toast.success("Member added successfully");
      setSelectedUser("");
      setSelectedRole("");
      onClose();
    } catch (err: any) {
      toast.error("Failed to add member: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="space-y-4">
        <div className="font-semibold">Add Member</div>
        {loading && (!users.length || !roles.length) ? (
          <div className="flex justify-center items-center py-8">
            {/* Replace with your spinner component if available */}
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="Select User" />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user?.id} value={user?.id}>
                    {user?.name || user?.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {roles?.map((role) => (
                  <SelectItem key={role?.id} value={role?.id}>
                    {role?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddMember} disabled={loading}>
              {loading ? "Adding..." : "Add Member"}
            </Button>
          </div>
        )}
      </div>
  );
};

export default ManageCommunity;
