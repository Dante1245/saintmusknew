import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, BarChart, ExternalLink, Activity } from "lucide-react";

const metrics = [
  { title: "Total Users", value: "3", icon: <Users className="h-6 w-6" /> },
  { title: "Total Signups (24h)", value: "1", icon: <BarChart className="h-6 w-6" /> },
  { title: "Pending Withdrawals", value: "1", icon: <ExternalLink className="h-6 w-6" /> },
  { title: "Total Transactions", value: "3", icon: <Activity className="h-6 w-6" /> },
];

export function DashboardMetrics() {
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
