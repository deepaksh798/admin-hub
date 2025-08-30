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
import { Users, UserPlus, Crown, Mail, Loader2, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface ManageCommunityProps {
  communityDetails: any;
  onClose: () => void;
}

const ManageCommunity: React.FC<ManageCommunityProps> = ({
  communityDetails,
  onClose,
}) => {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [addingMember, setAddingMember] = useState(false);

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
    setAddingMember(true);
    try {
      await createCommunityMembers({
        community: communityDetails.id,
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
      setAddingMember(false);
    }
  };

  const getRoleColor = (roleName: string) => {
    const roleColors: Record<string, string> = {
      admin: "bg-red-100 text-red-800 border-red-200",
      moderator: "bg-blue-100 text-blue-800 border-blue-200",
      member: "bg-green-100 text-green-800 border-green-200",
      viewer: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return roleColors[roleName.toLowerCase()] || "bg-purple-100 text-purple-800 border-purple-200";
  };

  if (loading && (!users.length || !roles.length)) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-sm text-gray-500">Loading community data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Manage Community</h1>
            <p className="text-sm text-gray-500">{communityDetails?.name || "Community Settings"}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Add Member Card */}
      <Card className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <UserPlus className="h-5 w-5 text-blue-600" />
            <span>Add New Member</span>
          </CardTitle>
          <CardDescription>
            Invite a new member to join this community with a specific role
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Select User</label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a user..." />
                </SelectTrigger>
                <SelectContent>
                  {users?.map((user) => (
                    <SelectItem key={user?.id} value={user?.id}>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                          {(user?.name || user?.email)?.[0]?.toUpperCase()}
                        </div>
                        <span>{user?.name || user?.email}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Select Role</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a role..." />
                </SelectTrigger>
                <SelectContent>
                  {roles?.map((role) => (
                    <SelectItem key={role?.id} value={role?.id}>
                      <div className="flex items-center space-x-2">
                        <Crown className="h-4 w-4 text-amber-500" />
                        <span>{role?.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleAddMember} 
            disabled={addingMember || !selectedUser || !selectedRole}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {addingMember ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Member...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Current Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-600" />
              <span>Current Members</span>
            </div>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              {communityDetails?.members?.length || 0} members
            </Badge>
          </CardTitle>
          <CardDescription>
            Manage existing community members and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!communityDetails?.members?.length ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">No members found</p>
              <p className="text-xs text-gray-400 mt-1">Add your first member above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {communityDetails.members.map((member: any, index: number) => (
                <div key={member.id}>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-sm text-white font-medium">
                        {(member.user?.name || member.user?.email)?.[0]?.toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {member.user?.name || "Unknown User"}
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Mail className="h-3 w-3" />
                          <span>{member.user?.email}</span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      className={`${getRoleColor(member.role?.name || "member")} border`}
                      variant="outline"
                    >
                      <Crown className="h-3 w-3 mr-1" />
                      {member.role?.name || "Member"}
                    </Badge>
                  </div>
                  {index < communityDetails.members.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCommunity;