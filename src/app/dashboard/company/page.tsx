
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Handshake, Users, FileDown, DollarSign } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"


const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Beneficiaries Reached",
    color: "hsl(var(--primary))",
  },
}


export default function CompanyDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-bold">Corporate Social Responsibility (CSR) Dashboard</h1>
            <div className="grid gap-6 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><DollarSign /> Sponsor a Drive</CardTitle>
                        <CardDescription>Fund a donation drive that aligns with your company's values and make a big impact.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button>Browse Donation Drives</Button>
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
                         <ChartContainer config={chartConfig} className="h-[200px] w-full">
                            <AreaChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Area
                                    dataKey="desktop"
                                    type="natural"
                                    fill="var(--color-desktop)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-desktop)"
                                />
                            </AreaChart>
                        </ChartContainer>
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
    )
}
