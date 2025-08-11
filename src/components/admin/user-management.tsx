
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
import { Avatar, AvatarFallback } from "../ui/avatar";

const mockUsers: User[] = [
  { 
    id: "usr_001", 
    name: "Elon Musk", 
    email: "elon@tesla.com", 
    balance: 200.00, 
    joinDate: "2024-07-29",
    transactions: [
      { id: "txn_001", type: "Bonus", asset: "USDT", amount: 200, status: "Completed", date: "2024-07-29" },
    ]
  },
  { 
    id: "usr_002", 
    name: "Satoshi Nakamoto", 
    email: "satoshi@btc.com", 
    balance: 10500.75, 
    joinDate: "2024-07-28",
    transactions: [
       { id: "txn_002", type: "Deposit", asset: "BTC", amount: 0.5, status: "Completed", date: "2024-07-28" },
    ]
  },
  { 
    id: "usr_003", 
    name: "Vitalik Buterin", 
    email: "vitalik@ethereum.org", 
    balance: 8734.20, 
    joinDate: "2024-07-27",
    transactions: [
      { id: "txn_003", type: "Withdrawal", asset: "ETH", amount: 10, status: "Pending", date: "2024-07-27" },
    ]
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
    setEditingUser(null);
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
                <div key={user.id} className="border-b pb-4 last:border-0 last:pb-0 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-sm font-mono">${user.balance.toFixed(2)}</p>
                        </div>
                    </div>
                     <div className="flex flex-col items-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingUser(user)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
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
                        <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </div>
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
