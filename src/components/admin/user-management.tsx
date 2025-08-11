"use client";

import { useState } from "react";
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

const mockUsers: User[] = [
  { 
    id: "usr_001", 
    name: "Elon Musk", 
    email: "elon@tesla.com", 
    balance: 200.00, 
    joinDate: "2024-07-29",
    walletAddress: "bc1qelonmuskxxxxxxxxxxxxxxxxxxxxxxxxxx",
    walletQrCode: "https://placehold.co/200x200.png"
  },
  { 
    id: "usr_002", 
    name: "Satoshi Nakamoto", 
    email: "satoshi@btc.com", 
    balance: 10500.75, 
    joinDate: "2024-07-28",
    walletAddress: "bc1qsatoshiynakamotozzzzzzzzzzzzzzzzz",
    walletQrCode: "https://placehold.co/200x200.png"
  },
  { 
    id: "usr_003", 
    name: "Vitalik Buterin", 
    email: "vitalik@ethereum.org", 
    balance: 8734.20, 
    joinDate: "2024-07-27",
    walletAddress: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    walletQrCode: "https://placehold.co/200x200.png"
  },
];


export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(currentUsers => currentUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
  };


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View, search, and edit user information.</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-8 w-full sm:w-1/3 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
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
                  <TableCell className="font-mono text-xs">{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">${user.balance.toFixed(2)}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => setEditingUser(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {editingUser && (
        <EditUserDialog
          user={editingUser}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={handleUpdateUser}
        />
      )}
    </>
  );
}
