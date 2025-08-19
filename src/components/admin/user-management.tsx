
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

const getUsersFromStorage = (): User[] => {
  if (typeof window === 'undefined') return [];
  const usersJson = localStorage.getItem('users');
  return usersJson ? JSON.parse(usersJson) : [];
};

const saveUsersToStorage = (users: User[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('users', JSON.stringify(users));
    }
};

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setUsers(getUsersFromStorage());
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleUpdateUser = (updatedUser: User) => {
    if (typeof window === 'undefined') return;

    // Update the master user list
    const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);

    // Check if the updated user is the currently logged-in user
    const loggedInUserJson = localStorage.getItem('loggedInUser');
    if (loggedInUserJson) {
        const loggedInUser = JSON.parse(loggedInUserJson);
        if (loggedInUser.id === updatedUser.id) {
            localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
            // This will trigger the 'storage' event listener in the portfolio component
        }
    }
    
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    setDeletingUserId(userId);
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
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
            {filteredUsers.length === 0 ? (
                 <div className="text-center text-muted-foreground py-10">
                    No users found.
                 </div>
            ) : (
                <>
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
                                <div className="flex items-center gap-2 shrink-0">
                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setEditingUser(user)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleDeleteUser(user.id)}
                                    disabled={deletingUserId === user.id}>
                                    {deletingUserId === user.id ? "..." : <Trash2 className="h-4 w-4" />}
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
                </>
           )}
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
