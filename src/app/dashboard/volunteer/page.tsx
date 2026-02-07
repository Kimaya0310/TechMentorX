
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VolunteerDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-bold">Volunteer Dashboard</h1>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Find Nearby Tasks</CardTitle>
                        <CardDescription>Browse and accept volunteer tasks in your area.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/dashboard/tasks">Browse Tasks</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>My Activity</CardTitle>
                        <CardDescription>Track your hours, tasks, and impact.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">You have completed <strong>5 tasks</strong> this month.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Leaderboard & Rewards</CardTitle>
                        <CardDescription>See your rank and unlock new badges.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button asChild variant="outline">
                            <Link href="/dashboard/rewards">View Rewards</Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Download Certificate</CardTitle>
                        <CardDescription>Get your volunteer certificate for your contributions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">Download</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
