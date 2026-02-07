
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Handshake, Users, FileDown, DollarSign, Loader2 } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, Bar, BarChart as ReBarChart } from "recharts"
import { useUser } from "@/firebase/auth/use-user";
import { useCollection } from "@/firebase/firestore/use-collection";
import type { CSRProject } from "@/lib/types";
import { useState } from "react";
import { NewCSRProjectDialog } from "@/components/new-csr-project-dialog";


const chartConfig = {
  budget: {
    label: "Budget (INR)",
    color: "hsl(var(--primary))",
  },
}


function CSRProjects() {
    const { user } = useUser();
    const { data: projects, loading } = useCollection<CSRProject>(
        'csr-projects',
        { where: [['companyId', '==', user?.uid || '']] }
    );
    const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

    const chartData = projects?.map(p => ({ project: p.name, budget: p.budget })) || [];

    return (
        <>
            <NewCSRProjectDialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen} />
            <div className="flex flex-col gap-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><DollarSign /> Sponsor a Drive</CardTitle>
                            <CardDescription>Fund a donation drive that aligns with your company's values and make a big impact.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={() => setIsProjectDialogOpen(true)}>Create New Project</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Users /> Employee Volunteering</CardTitle>
                            <CardDescription>Integrate and manage corporate volunteering programs for your team.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline">Manage Programs</Button>
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
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BarChart /> Impact Analytics</CardTitle>
                            <CardDescription>View your company's social impact, ESG metrics, and sustainability footprint in real-time.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading && <Loader2 className="mx-auto h-8 w-8 animate-spin" />}
                            {!loading && projects && projects.length === 0 && (
                                <div className="text-center text-muted-foreground">
                                    <p>No projects created yet.</p>
                                    <p className="text-sm">Click "Create New Project" to get started.</p>
                                </div>
                            )}
                            {!loading && projects && projects.length > 0 && (
                                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                    <ReBarChart accessibilityLayer data={chartData}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="project"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) => value.slice(0, 10) + (value.length > 10 ? '...' : '')}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="dot" />}
                                        />
                                        <Bar dataKey="budget" fill="var(--color-budget)" radius={4} />
                                    </ReBarChart>
                                </ChartContainer>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><FileDown /> Download Reports</CardTitle>
                            <CardDescription>Generate and download automated CSR & ESG compliance reports.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <Button variant="outline">Generate Monthly Report</Button>
                            <Button variant="outline">Generate Quarterly Report</Button>
                            <Button variant="outline">Generate Annual ESG Summary</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}


export default function CompanyDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-bold">Corporate Social Responsibility (CSR) Dashboard</h1>
            <CSRProjects />
        </div>
    )
}
