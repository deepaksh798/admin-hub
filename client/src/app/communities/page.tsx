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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCommunities } from "@/network/Api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Calendar,
  Plus,
  Building2,
  Settings,
  Eye,
  Filter,
  Download,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { formatDate } from "@/utils/formatDate";
import CommunitySkeleton from "@/components/Skeleton/CommunitySkeleton";

const Communities = () => {
  const [communities, setCommunities] = useState<any>({});
  const [filteredCommunities, setFilteredCommunities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const router = useRouter();

  useEffect(() => {
    fetchCommunities();
  }, []);

  useEffect(() => {
    if (communities?.data) {
      let filtered = communities.data.filter(
        (community: any) =>
          community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          community.slug?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Sort communities
      filtered.sort((a: any, b: any) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "members":
            return b.members.length - a.members.length;
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

      setFilteredCommunities(filtered);
    }
  }, [communities, searchTerm, sortBy]);

  const fetchCommunities = () => {
    setLoading(true);
    setError(null);
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

  const handleCreateNew = () => {
    router.push("/communities/create-new-community");
  };

  const handleView = (communityId: string) => {
    toast.info("View community functionality to be implemented");
  };

  const handleManage = (communityId: string) => {
    toast.info("Manage community functionality to be implemented");
  };

  const handleEdit = (communityId: string) => {
    toast.info("Edit community functionality to be implemented");
  };

  const handleDelete = (communityId: string, communityName: string) => {
    toast.info(`Delete ${communityName} functionality to be implemented`);
  };

  const getMemberCountBadge = (memberCount: number) => {
    if (memberCount === 0)
      return {
        variant: "secondary",
        text: "No members",
        color: "bg-gray-100 text-gray-700",
      };
    if (memberCount < 10)
      return {
        variant: "secondary",
        text: `${memberCount} members`,
        color: "bg-blue-100 text-blue-700",
      };
    if (memberCount < 50)
      return {
        variant: "secondary",
        text: `${memberCount} members`,
        color: "bg-green-100 text-green-700",
      };
    return {
      variant: "secondary",
      text: `${memberCount} members`,
      color: "bg-purple-100 text-purple-700",
    };
  };

  const getRandomCommunityColor = (name: string) => {
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
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getCommunityInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    <CommunitySkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-red-500 text-lg font-medium">
          Failed to load communities
        </div>
        <p className="text-gray-500">{error}</p>
        <Button onClick={fetchCommunities} variant="outline">
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
          <h1 className="text-3xl font-bold text-gray-900">Communities</h1>
          <p className="text-gray-500 mt-1">
            Manage and organize communities across your platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateNew}>
            <Plus className="h-4 w-4 mr-2" />
            Create Community
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-44">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="members">Most Members</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Building2 className="h-4 w-4" />
            <span>{filteredCommunities.length} communities</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      {filteredCommunities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
          <Building2 className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? "No communities found" : "No communities yet"}
          </h3>
          <p className="text-gray-500 mb-6 text-center max-w-md">
            {searchTerm
              ? `No communities match "${searchTerm}". Try adjusting your search.`
              : "Start building your community by creating your first one."}
          </p>
          {!searchTerm && (
            <Button onClick={handleCreateNew}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Community
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-semibold text-gray-900 py-4">
                  Community
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Members
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
              {filteredCommunities.map((community: any, index: number) => {
                const memberBadge = getMemberCountBadge(
                  community.members.length
                );
                return (
                  <TableRow
                    key={community.id || index}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex-shrink-0 h-10 w-10 ${getRandomCommunityColor(
                            community.name
                          )} rounded-lg flex items-center justify-center text-white font-medium text-sm`}
                        >
                          {getCommunityInitials(community.name)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {community.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {community.slug
                              ? `/${community.slug}`
                              : `ID: ${community.id}`}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <Badge className={memberBadge.color}>
                          {memberBadge.text}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <div className="text-sm font-medium">
                            {formatDate(community.createdAt)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getTimeAgo(community.createdAt)}
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
                          <DropdownMenuItem
                            onClick={() => handleView(community.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Community
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleManage(community.id)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Manage
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEdit(community.id)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Community
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleDelete(community.id, community.name)
                            }
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Community
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Communities;
