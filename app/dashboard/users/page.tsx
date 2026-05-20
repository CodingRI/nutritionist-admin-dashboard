"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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
import {
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";

type UserUI = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: string;
  consultations: number;
  plan: string;
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserUI[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserUI[]>([]);
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  const mainAppUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL;

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const response = await fetch(`${mainAppUrl}/api/admin/users`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) {
        console.error(data.message);
        return;
      }

      const normalizedUsers: UserUI[] = data.users.map((user: any) => {
        return {
          id: user.id,

          name: user.fullName || "Unknown User",

          email: user.email || "--",

          phone: user.phoneNumber || "--",

          joinDate: new Date(user.createdAt).toLocaleDateString(),

          status: user.isBlocked ? "Blocked" : "Active",

          consultations: user.appointments?.length || 0,

          plan: user.subscriptions?.length > 0 ? "Premium" : "Standard",
        };
      });

      setUsers(normalizedUsers);
      setFilteredUsers(normalizedUsers);
    } catch (error) {
      console.error("FETCH_USERS_ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";

      case "Blocked":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Premium":
        return "bg-purple-100 text-purple-800";
      case "Standard":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-title">Users Management</h1>
          <p className="page-subtitle">
            Manage your clients and their information
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6 bg-white border border-border rounded-lg px-4 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="border-0 focus:outline-none focus:ring-0 bg-transparent"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Consultations</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-secondary/5">
                    <TableCell className="font-medium">{user.name}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {user.email}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {user.phone}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {user.joinDate}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>

                    <TableCell>{user.consultations}</TableCell>

                    <TableCell>
                      <Badge className={getPlanColor(user.plan)}>
                        {user.plan}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>

                          <DropdownMenuItem>Edit</DropdownMenuItem>

                          <DropdownMenuItem>Send Message</DropdownMenuItem>

                          <DropdownMenuItem className="text-red-600">
                            Block User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
