
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    // Mock user data for now. We'll replace with real data from Firestore.
    const user = {
        name: "Alex Doe",
        email: "alex.doe@example.com",
    };

    return (
        <div className="container mx-auto max-w-4xl py-12">
            <h1 className="font-headline text-3xl font-bold mb-8">Settings</h1>
            <div className="grid gap-10 md:grid-cols-3">
                <div className="md:col-span-1">
                    <h2 className="text-xl font-semibold">General</h2>
                    <p className="text-sm text-muted-foreground">Manage your account and privacy.</p>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Details</CardTitle>
                            <CardDescription>Update your personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <p id="name" className="text-lg">{user.name}</p>
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <p id="email" className="text-lg">{user.email}</p>
                            </div>
                            <Button variant="outline">Update Profile</Button>
                            <Separator className="my-6" />
                            <div className="space-y-2">
                                <h3 className="font-medium">Account Actions</h3>
                                <div className="flex items-center justify-between">
                                    <p>Change Password</p>
                                    <Button variant="outline">Change</Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-destructive">Delete Account</p>
                                    <Button variant="destructive">Delete</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Separator className="my-10" />

            <div className="grid gap-10 md:grid-cols-3">
                <div className="md:col-span-1">
                    <h2 className="text-xl font-semibold">Appearance & Language</h2>
                    <p className="text-sm text-muted-foreground">Customize the look and feel of the app.</p>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="dark-mode">Dark Mode</Label>
                                <Switch id="dark-mode" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select defaultValue="en">
                                    <SelectTrigger id="language">
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="hi">Hindi</SelectItem>
                                        <SelectItem value="mr">Marathi</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            <Separator className="my-10" />

            <div className="grid gap-10 md:grid-cols-3">
                <div className="md:col-span-1">
                    <h2 className="text-xl font-semibold">Notifications</h2>
                    <p className="text-sm text-muted-foreground">Manage how you receive alerts.</p>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Select which notifications you want to receive.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="donation-updates">Donation Updates</Label>
                                <Switch id="donation-updates" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="volunteer-tasks">Volunteer Tasks</Label>
                                <Switch id="volunteer-tasks" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="scheme-alerts">Welfare Scheme Alerts</Label>
                                <Switch id="scheme-alerts" />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="emergency-alerts">Emergency Drive Alerts</Label>
                                <Switch id="emergency-alerts" defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
