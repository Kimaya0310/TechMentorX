
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NGODashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-bold">NGO Dashboard</h1>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Donation Requests</CardTitle>
                        <CardDescription>Create and manage requests for donations.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button>New Request</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Assign Volunteers</CardTitle>
                        <CardDescription>Assign volunteers to tasks and deliveries.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button>Assign Tasks</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Impact Analytics</CardTitle>
                        <CardDescription>Track your organization's impact.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Analytics coming soon.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Mid-Day Meal Program</CardTitle>
                        <CardDescription>Manage and track your meal programs.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">Manage Program</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
