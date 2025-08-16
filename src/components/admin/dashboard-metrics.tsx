
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, BarChart, ExternalLink, Activity } from "lucide-react";
import { useEffect, useState } from "react";

export function DashboardMetrics() {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        // This is a mock way of getting user count. 
        // In a real app, this would be a database query.
        const storedUser = localStorage.getItem('loggedInUser');
        if(storedUser) {
            // For the prototype, we assume only one user might exist in localStorage.
            // A real implementation would fetch all users.
            setUserCount(1);
        } else {
            setUserCount(0)
        }
    }, [])

    const metrics = [
        { title: "Total Users", value: userCount.toString(), icon: <Users className="h-6 w-6" /> },
        { title: "Total Signups (24h)", value: userCount.toString(), icon: <BarChart className="h-6 w-6" /> },
        { title: "Pending Withdrawals", value: "0", icon: <ExternalLink className="h-6 w-6" /> },
        { title: "Total Transactions", value: userCount > 0 ? "1" : "0", icon: <Activity className="h-6 w-6" /> },
      ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <div className="text-slate-500">{metric.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
