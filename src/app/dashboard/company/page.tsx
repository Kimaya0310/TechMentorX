

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Handshake, Users } from "lucide-react";

export default function CompanyDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-bold">Corporate Social Responsibility (CSR) Dashboard</h1>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Fund a Drive</CardTitle>
                        <CardDescription>Sponsor a donation drive that aligns with your company's values and make a big impact.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button>Browse Donation Drives</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart /> Impact Analytics</CardTitle>
                        <CardDescription>View your company's social impact, ESG metrics, and sustainability footprint in real-time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Analytics coming soon.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Handshake /> Manage Partnerships</CardTitle>
                        <CardDescription>View and manage your NGO and government partnerships.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">View Partners</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users /> Employee Volunteering</CardTitle>
                        <CardDescription>Integrate and manage employee volunteering programs.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">Manage Programs</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
