import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HeartHandshake, Package, Users, Award } from "lucide-react";

const stats = [
  {
    title: "Total Donations",
    value: "1,250",
    icon: <HeartHandshake className="h-6 w-6 text-muted-foreground" />,
    change: "+15.2% from last month",
  },
  {
    title: "People Helped",
    value: "834",
    icon: <Users className="h-6 w-6 text-muted-foreground" />,
    change: "+21.3% from last month",
  },
  {
    title: "Items Distributed",
    value: "4,879",
    icon: <Package className="h-6 w-6 text-muted-foreground" />,
    change: "+8.1% from last month",
  },
  {
    title: "Your Points",
    value: "5,600",
    icon: <Award className="h-6 w-6 text-muted-foreground" />,
    change: "Top 10% of donors",
  },
];

const recentDonations = [
  { id: "DN001", item: "Winter Clothing", status: "Delivered", recipient: "City Shelter" },
  { id: "DN002", item: "Canned Goods", status: "In Transit", recipient: "Community Food Bank" },
  { id: "DN003", item: "School Supplies", status: "Pending Pickup", recipient: "Orphanage" },
  { id: "DN004", item: "Medical Kits", status: "Delivered", recipient: "Rural Clinic" },
  { id: "DN005", item: "Blankets", status: "Delivered", recipient: "Homeless Outreach" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Donations</CardTitle>
          <CardDescription>A list of your most recent donations and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recipient</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">{donation.id}</TableCell>
                  <TableCell>{donation.item}</TableCell>
                  <TableCell>
                    <Badge variant={donation.status === 'Delivered' ? 'default' : donation.status === 'In Transit' ? 'secondary' : 'outline'} className={donation.status === 'Delivered' ? 'bg-green-600' : ''}>
                      {donation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{donation.recipient}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
