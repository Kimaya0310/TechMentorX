

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function VolunteerDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="font-headline text-3xl font-bold">Volunteer Hub</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Your Points:</span>
                    <Badge variant="secondary" className="text-lg">5,600</Badge>
                </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Find Nearby Tasks</CardTitle>
                        <CardDescription>Browse and accept volunteer tasks in your area. New tasks available!</CardDescription>
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
                        <p className="text-muted-foreground">You have completed <strong>5 tasks</strong> and volunteered for <strong>12 hours</strong> this month.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Leaderboard & Rewards</CardTitle>
                        <CardDescription>See your rank and unlock new badges for your contributions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button asChild variant="outline">
                            <Link href="/dashboard/rewards">View Rewards</Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Download Volunteer Certificate</CardTitle>
                        <CardDescription>Get your official certificate for your valuable contributions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">Download</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
