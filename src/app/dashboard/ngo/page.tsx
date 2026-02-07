

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";

export default function NGODashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-bold">NGO Dashboard</h1>
            
            <Tabs defaultValue="drives">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="drives">Donation Drives</TabsTrigger>
                    <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
                    <TabsTrigger value="programs">Programs</TabsTrigger>
                    <TabsTrigger value="analytics">Impact Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="drives">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Donation Requests</CardTitle>
                            <CardDescription>Create and manage requests for donations.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button>New Request</Button>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Winter Clothing Drive</CardTitle>
                                    <CardDescription>Status: Active</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>80% funded. 2 days left.</p>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="volunteers">
                     <Card>
                        <CardHeader>
                            <CardTitle>Assign Volunteers</CardTitle>
                            <CardDescription>Assign volunteers to tasks and deliveries.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button>Assign Tasks</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="programs">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mid-Day Meal Program</CardTitle>
                            <CardDescription>Manage and track your meal programs.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <Button variant="outline">Manage Program</Button>
                            <Button variant="outline"><Upload className="mr-2"/> Upload Proof</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="analytics">
                    <Card>
                        <CardHeader>
                            <CardTitle>Impact Analytics</CardTitle>
                            <CardDescription>Track your organization's impact.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Analytics coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
