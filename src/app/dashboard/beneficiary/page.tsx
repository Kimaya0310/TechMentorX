
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Stethoscope, Utensils, Package, Loader2, Badge } from "lucide-react";
import { useState } from "react";
import { RequestAssistanceDialog } from "@/components/request-assistance-dialog";
import { useUser } from "@/firebase/auth/use-user";
import { useCollection } from "@/firebase/firestore/use-collection";
import type { Request } from "@/lib/types";
import { format } from "date-fns";

function MyRequests() {
    const { user } = useUser();
    const { data: requests, loading, error } = useCollection<Request>(
        user ? `requests` : null,
        { where: [['userId', '==', user?.uid || '']] }
    );

    if (loading) {
        return <Loader2 className="h-6 w-6 animate-spin" />;
    }

    if (error) {
        return <p className="text-destructive">Error loading requests.</p>;
    }

    if (!requests || requests.length === 0) {
        return <p className="text-muted-foreground">No active requests.</p>;
    }
    
    return (
        <div className="space-y-4">
            {requests.map((request) => (
                <div key={request.id} className="flex items-center justify-between rounded-md border p-4">
                    <div>
                        <p className="font-medium capitalize">{request.category.replace('Support', ' Support')}</p>
                        <p className="text-sm text-muted-foreground">
                            Requested on {format(request.createdAt.toDate(), 'PPP')}
                        </p>
                    </div>
                    <Badge variant={request.status === 'completed' ? 'default' : 'secondary'} className={request.status === 'completed' ? 'bg-green-600 text-white' : ''}>
                        {request.status}
                    </Badge>
                </div>
            ))}
        </div>
    )

}


export default function BeneficiaryDashboardPage() {
    const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
    const [requestCategory, setRequestCategory] = useState<'essentials' | 'disabilitySupport'>('essentials');

    const openRequestDialog = (category: 'essentials' | 'disabilitySupport') => {
        setRequestCategory(category);
        setIsRequestDialogOpen(true);
    }

    return (
        <>
        <RequestAssistanceDialog
            open={isRequestDialogOpen}
            onOpenChange={setIsRequestDialogOpen}
            category={requestCategory}
        />
        <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-bold">Beneficiary Dashboard</h1>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Utensils /> Request Assistance</CardTitle>
                        <CardDescription>Request food, clothing, or other essentials.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => openRequestDialog('essentials')}>Make a Request</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Package /> My Requests</CardTitle>
                        <CardDescription>Track the status of your requests.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MyRequests />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bot /> Eligible Schemes</CardTitle>
                        <CardDescription>Use our AI assistant to find welfare schemes you might be eligible for.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button>Find Schemes</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Stethoscope /> Disability Support</CardTitle>
                        <CardDescription>Request accessibility aids like wheelchairs and medical equipment.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => openRequestDialog('disabilitySupport')}>Request Support</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
        </>
    )
}
