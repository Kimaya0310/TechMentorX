import { Button } from "@/components/ui/button";
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
import { PlusCircle } from "lucide-react";

const allDonations = [
    { id: "DN001", item: "Winter Clothing", status: "Delivered", date: "2023-11-15", recipient: "City Shelter" },
    { id: "DN002", item: "Canned Goods", status: "In Transit", date: "2023-11-20", recipient: "Community Food Bank" },
    { id: "DN003", item: "School Supplies", status: "Pending Pickup", date: "2023-11-22", recipient: "Orphanage Home" },
    { id: "DN004", item: "Medical Kits", status: "Delivered", date: "2023-11-18", recipient: "Rural Clinic" },
    { id: "DN005", item: "Blankets", status: "Delivered", date: "2023-11-12", recipient: "Homeless Outreach" },
    { id: "DN006", item: "Non-perishable food", status: "Pending Pickup", date: "2023-11-25", recipient: "Local Food Pantry" },
    { id: "DN007", item: "Toys and Games", status: "In Transit", date: "2023-11-24", recipient: "Children's Hospital" },
];

export default function DonationsPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
         <h1 className="font-headline text-3xl font-bold">Donation Management</h1>
         <Button>
           <PlusCircle className="mr-2 h-4 w-4" />
           New Donation
         </Button>
       </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Donations</CardTitle>
          <CardDescription>Track the lifecycle of all your contributions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Recipient</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">{donation.id}</TableCell>
                  <TableCell>{donation.item}</TableCell>
                  <TableCell>
                    <Badge variant={donation.status === 'Delivered' ? 'default' : donation.status === 'In Transit' ? 'secondary' : 'outline'} className={donation.status === 'Delivered' ? 'bg-green-600 text-white' : ''}>
                      {donation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{donation.date}</TableCell>
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
