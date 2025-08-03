"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { getRoles } from "@/network/Api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Calendar,
} from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { getTimeAgo } from "@/utils/getTimeAgo";
import RoleSkeleton from "@/components/Skeleton/RoleSkeleton";

const Roles = () => {
  const router = useRouter();
  const [roles, setRoles] = useState<any[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    const filtered = roles.filter((role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoles(filtered);
  }, [roles, searchTerm]);

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

  const handleCreateNew = () => {
    router.push("/communities/create-new-role");
  };

  const handleEdit = (roleId: string) => {
    // Add edit functionality
    toast.info("Edit functionality to be implemented");
  };

  const handleDelete = (roleId: string, roleName: string) => {
    // Add delete confirmation and functionality
    toast.info(`Delete ${roleName} functionality to be implemented`);
  };

  if (loading) {
    <RoleSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-red-500 text-lg font-medium">
          Failed to load roles
        </div>
        <p className="text-gray-500">{error}</p>
        <Button onClick={fetchRoles} variant="outline">
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
          <h1 className="text-3xl font-bold text-gray-900">Roles</h1>
          <p className="text-gray-500 mt-1">
            Manage and organize user roles across your platform
          </p>
        </div>
        <Button onClick={handleCreateNew} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{filteredRoles.length} roles</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      {filteredRoles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
          <Users className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? "No roles found" : "No roles yet"}
          </h3>
          <p className="text-gray-500 mb-6 text-center max-w-md">
            {searchTerm
              ? `No roles match "${searchTerm}". Try adjusting your search.`
              : "Get started by creating your first role to organize user permissions."}
          </p>
          {!searchTerm && (
            <Button onClick={handleCreateNew}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Role
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-semibold text-gray-900 py-4">
                  Role Name
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Created
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Status
                </TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role: any, index: number) => (
                <TableRow
                  key={role.id || index}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {role.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {role.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <div>
                        <div className="text-sm font-medium">
                          {formatDate(role.createdAt)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {getTimeAgo(role.createdAt)}
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleEdit(role.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Role
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(role.id, role.name)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default Roles;
