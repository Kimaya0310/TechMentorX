
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { NewTaskDialog } from "@/components/new-task-dialog";
import { NewDonationRequestDialog } from "@/components/new-donation-request-dialog";
import { useUser } from "@/firebase/auth/use-user";
import { useCollection } from "@/firebase/firestore/use-collection";
import type { DonationRequest, Task, UserProfile } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


function DonationDrivesTab() {
    const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
    const { user } = useUser();
    const { data: requests, loading } = useCollection<DonationRequest>(
        'donation-requests',
        { where: [['ngoId', '==', user?.uid || '']] }
    );

    return (
        <>
        <NewDonationRequestDialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen} />
        <Card>
            <CardHeader>
                <CardTitle>Manage Donation Requests</CardTitle>
                <CardDescription>Create and manage requests for donations that will be visible to donors and companies.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button onClick={() => setIsRequestDialogOpen(true)}>New Request</Button>
                {loading && <Loader2 className="mx-auto mt-4 h-8 w-8 animate-spin" />}
                {!loading && requests && requests.length === 0 && (
                    <p className="text-center text-muted-foreground pt-4">No active donation requests. Create one to get started.</p>
                )}
                {!loading && requests && requests.length > 0 && (
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Urgency</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map(req => (
                                <TableRow key={req.id}>
                                    <TableCell className="font-medium">{req.title}</TableCell>
                                    <TableCell><Badge variant={req.urgencyLevel === 'high' || req.urgencyLevel === 'critical' ? 'destructive' : 'secondary'}>{req.urgencyLevel}</Badge></TableCell>
                                    <TableCell><Badge variant="outline">{req.status}</Badge></TableCell>
                                    <TableCell>{format(new Date(req.createdAt as any), 'PPP')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
        </>
    )
}

function VolunteersTab() {
    const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
    const { user } = useUser(); // NGO user

    const { data: tasks, loading: tasksLoading } = useCollection<Task>('tasks', {
        where: [['ngoId', '==', user?.uid || '']]
    });

    const volunteerIds = useMemo(() => {
        if (!tasks) return [];
        const ids = tasks.map(task => task.volunteerId);
        return [...new Set(ids)]; // Unique IDs
    }, [tasks]);

    const { data: volunteers, loading: volunteersLoading } = useCollection<UserProfile>('users', {
        where: [['uid', 'in', volunteerIds.length > 0 ? volunteerIds : ['placeholder']]] // 'in' query needs a non-empty array
    });

    const loading = tasksLoading || volunteersLoading;

    return (
        <>
            <NewTaskDialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen} />
            <Card>
                <CardHeader>
                    <CardTitle>Manage Volunteers</CardTitle>
                    <CardDescription>Assign volunteers to tasks and monitor their activity.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button onClick={() => setIsTaskDialogOpen(true)}>Assign Task</Button>
                    {loading && <Loader2 className="mx-auto mt-4 h-8 w-8 animate-spin" />}
                    {!loading && (!volunteers || volunteers.length === 0) && (
                         <p className="text-center text-muted-foreground pt-4">No volunteers found. Assign a task to a volunteer to see them here.</p>
                    )}
                     {!loading && volunteers && volunteers.length > 0 && (
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Volunteer</TableHead>
                                    <TableHead>Skills</TableHead>
                                    <TableHead>Active Tasks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {volunteers.map(v => (
                                    <TableRow key={v.uid}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>{v.displayName.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{v.displayName}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {(v.skills || []).map((skill: string) => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {tasks?.filter(t => t.volunteerId === v.uid && t.status !== 'completed').length}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </>
    )
}

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
                    <DonationDrivesTab />
                </TabsContent>
                <TabsContent value="volunteers">
                     <VolunteersTab />
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
