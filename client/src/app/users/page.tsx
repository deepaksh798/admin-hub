"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllUsers } from "@/network/Api";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Search,
  Users,
  Calendar,
  Mail,
  Filter,
  RefreshCw,
} from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { getTimeAgo } from "@/utils/getTimeAgo";
import LoadingSkeleton from "@/components/Skeleton/LoadingSkeleton";

const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "email":
          return a.email.localeCompare(b.email);
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, sortBy]);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (email: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-red-500",
    ];
    const index = email.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-red-500 text-lg font-medium">
          Failed to load users
        </div>
        <p className="text-gray-500">{error}</p>
        <Button onClick={fetchUsers} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">
            Manage and monitor all users across your platform
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="email">Sort by Email</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{filteredUsers.length} users</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <LoadingSkeleton />
      ) : filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
          <Users className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? "No users found" : "No users yet"}
          </h3>
          <p className="text-gray-500 mb-6 text-center max-w-md">
            {searchTerm
              ? `No users match "${searchTerm}". Try adjusting your search.`
              : "Start by inviting users to join your platform."}
          </p>
         
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-semibold text-gray-900 py-4">
                  User
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Contact
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Joined
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Status
                </TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user: any, index: number) => (
                <TableRow
                  key={user.id || index}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`flex-shrink-0 h-10 w-10 ${getRandomColor(
                          user.email
                        )} rounded-full flex items-center justify-center text-white font-medium text-sm`}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {user.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <div>
                        <div className="text-sm font-medium">{user.email}</div>
                        <div className="text-xs text-gray-500">
                          Primary contact
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <div>
                        <div className="text-sm font-medium">
                          {formatDate(user.createdAt)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {getTimeAgo(user.createdAt)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 border-green-200"
                    >
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
