
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CompanyDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-bold">CSR Dashboard</h1>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Fund a Drive</CardTitle>
                        <CardDescription>Sponsor a donation drive and make a big impact.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button>Browse Drives</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Impact Analytics</CardTitle>
                        <CardDescription>View your company's social impact in real-time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Analytics coming soon.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Manage Partnerships</CardTitle>
                        <CardDescription>View and manage your NGO partnerships.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">View Partners</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Compliance Reports</CardTitle>
                        <CardDescription>Download CSR and compliance reports.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">Download Reports</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
