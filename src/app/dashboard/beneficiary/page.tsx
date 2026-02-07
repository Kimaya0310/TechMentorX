

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Stethoscope, Utensils } from "lucide-react";

export default function BeneficiaryDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-bold">Beneficiary Dashboard</h1>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Utensils /> Request Assistance</CardTitle>
                        <CardDescription>Request food, clothing, or other essentials.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button>Make a Request</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>My Requests</CardTitle>
                        <CardDescription>Track the status of your requests.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">No active requests.</p>
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
                        <Button>Request Support</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
