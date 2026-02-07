import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, ShieldCheck, Users, Activity } from "lucide-react";

const stats = [
  {
    title: "Pending Verifications",
    value: "12",
    icon: <ShieldCheck className="h-6 w-6 text-muted-foreground" />,
    description: "NGOs waiting for approval.",
  },
  {
    title: "Total Active Users",
    value: "10,432",
    icon: <Users className="h-6 w-6 text-muted-foreground" />,
    description: "+120 in the last 24 hours.",
  },
  {
    title: "Registered NGOs",
    value: "258",
    icon: <Building className="h-6 w-6 text-muted-foreground" />,
    description: "Total verified organizations.",
  },
  {
    title: "Platform Activity",
    value: "High",
    icon: <Activity className="h-6 w-6 text-muted-foreground" />,
    description: "Donations and tasks are active.",
  },
];


export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Recent Activity</CardTitle>
                <CardDescription>A live feed of platform events.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Activity feed coming soon...</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Platform Analytics</CardTitle>
                <CardDescription>Key metrics and growth charts.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Analytics charts coming soon...</p>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
