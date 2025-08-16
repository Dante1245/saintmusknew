
"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Edit, Trash2 } from "lucide-react";
import type { User } from "@/lib/types";
import { EditUserDialog } from "./edit-user-dialog";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useToast } from "@/hooks/use-toast";

const initialMockUsers: User[] = [];


export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>(initialMockUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // This is a mock way of checking for a new user from localStorage.
    // In a real app, this would be fetched from a database.
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        const newUser: User = JSON.parse(storedUser);
        // Avoid adding the user if they already exist in the list
        if (!users.find(u => u.id === newUser.id || u.email === newUser.email)) {
          setUsers(prevUsers => [newUser, ...prevUsers]);
        }
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(currentUsers => currentUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    setDeletingUserId(userId);
    setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: `User ${userId} has been successfully deleted.`,
    });
    setDeletingUserId(null);
  };

  return (
    <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View, search, and edit user information.</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-8 w-full sm:w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
           {/* Responsive List for Mobile */}
           <div className="md:hidden space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="border-b pb-4 last:border-0 last:pb-0 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 overflow-hidden">
                        <Avatar>
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{user.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                            <p className="text-sm font-mono">${user.balance.toFixed(2)}</p>
                        </div>
                    </div>
                     <div className="flex flex-col items-end gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => setEditingUser(user)}>
                        <Edit className="h-4 w-4 md:mr-2" />
                        <span className="hidden md:inline">Edit</span>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={deletingUserId === user.id}>
                        {deletingUserId === user.id ? "..." : "Delete"}
                      </Button>
                    </div>
                </div>
              ))}
           </div>
          
           {/* Table for Desktop */}
          <div className="hidden md:block">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{user.id}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-right">${user.balance.toFixed(2)}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => setEditingUser(user)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={deletingUserId === user.id} >
                            {deletingUserId === user.id ? <Trash2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </Button>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </div>
        </CardContent>
      {editingUser && (
        <EditUserDialog
          user={editingUser}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={handleUpdateUser}
        />
      )}
    </Card>
  );
}
