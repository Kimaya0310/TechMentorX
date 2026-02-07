
'use client';

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
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { NewDonationDialog } from "@/components/new-donation-dialog";
import { useUser } from "@/firebase/auth/use-user";
import { useCollection, type UseCollectionOptions } from "@/firebase/firestore/use-collection";
import type { Donation } from "@/lib/types";
import { format } from "date-fns";

function DonationsList() {
    const { user } = useUser();
    
    const options: UseCollectionOptions = {};
    
    if (user?.role === 'ngo') {
        // NGOs see available requests
        options.where = [['status', '==', 'requested']];
        options.orderBy = ['urgencyLevel', 'desc'];
    } else {
        // Donors see their own donations
        options.where = [['donorId', '==', user?.uid || '']];
        options.orderBy = ['createdAt', 'desc'];
    }

    const { data: donations, loading, error } = useCollection<Donation>(
        user ? 'donations' : null,
        options
    );

    if (loading) {
        return (
            <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                </TableCell>
            </TableRow>
        );
    }
    
    if (error) {
        return <TableRow><TableCell colSpan={5} className="text-destructive text-center">Error loading donations.</TableCell></TableRow>;
    }
    
    if (!donations || donations.length === 0) {
        const message = user?.role === 'ngo' ? 'No new donation requests at this time.' : 'No donations found. Make your first one!';
        return <TableRow><TableCell colSpan={5} className="h-24 text-center">{message}</TableCell></TableRow>;
    }

    return (
        <>
            {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium hidden sm:table-cell">{donation.id.substring(0, 7).toUpperCase()}</TableCell>
                  <TableCell>{donation.items.join(", ")}</TableCell>
                  <TableCell>
                    <Badge 
                        variant={donation.status === 'delivered' ? 'default' : donation.status.includes('transit') ? 'secondary' : 'outline'} 
                        className={donation.status === 'delivered' ? 'bg-green-600 text-white' : ''}
                    >
                      {donation.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{donation.createdAt ? format(new Date(donation.createdAt as any), 'PPP') : 'N/A'}</TableCell>
                  <TableCell>{user?.role === 'ngo' ? donation.location : (donation.recipient || 'Pending Assignment')}</TableCell>
                </TableRow>
              ))}
        </>
    );
}


export default function DonationsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useUser();

  return (
    <>
      <NewDonationDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <h1 className="font-headline text-3xl font-bold">
                {user?.role === 'ngo' ? 'Available Donations' : 'Donation Management'}
            </h1>
            {user?.role !== 'ngo' && (
                <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Donation
                </Button>
            )}
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">{user?.role === 'ngo' ? 'Donation Requests' : 'Your Donations'}</CardTitle>
                <CardDescription>
                    {user?.role === 'ngo' ? 'Review and accept available donation requests from donors.' : 'Track the lifecycle of all your contributions.'}
                </CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="hidden sm:table-cell">ID</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>{user?.role === 'ngo' ? 'Location' : 'Recipient NGO'}</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    <DonationsList />
                </TableBody>
            </Table>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
