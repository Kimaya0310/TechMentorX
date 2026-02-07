
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/firebase/auth/use-user";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const { user, loading } = useUser();
    const router = useRouter();
    const firestore = getFirestore();
    const { toast } = useToast();
    
    // Local state to manage UI and avoid waiting for Firestore roundtrip
    const [darkMode, setDarkMode] = useState(user?.darkModeEnabled || false);
    const [language, setLanguage] = useState(user?.languagePreference || 'en');
    const [notifications, setNotifications] = useState(user?.notificationSettings || {});

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        if (user) {
            setDarkMode(user.darkModeEnabled);
            setLanguage(user.languagePreference);
            setNotifications(user.notificationSettings);
        }
    }, [user, loading, router]);
    
    useEffect(() => {
        // Apply dark mode to the body
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);


    const handleSettingChange = async (key: string, value: any) => {
        if (!user) return;
        
        try {
            const userDocRef = doc(firestore, "users", user.uid);
            await updateDoc(userDocRef, { [key]: value });
            toast({
                title: "Settings updated",
                description: "Your preferences have been saved.",
            });
        } catch (error: any) {
            console.error("Failed to update settings:", error);
            toast({
                variant: "destructive",
                title: "Update failed",
                description: "Could not save your preferences.",
            });
        }
    };

    const handleNotificationChange = (key: string, value: boolean) => {
        const newSettings = { ...notifications, [key]: value };
        setNotifications(newSettings);
        handleSettingChange('notificationSettings', newSettings);
    }
    
    if (loading || !user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

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
                                <p id="name" className="text-lg">{user.displayName}</p>
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <p id="email" className="text-lg">{user.email}</p>
                            </div>
                            <Button variant="outline" disabled>Update Profile</Button>
                            <Separator className="my-6" />
                            <div className="space-y-2">
                                <h3 className="font-medium">Account Actions</h3>
                                <div className="flex items-center justify-between">
                                    <p>Change Password</p>
                                    <Button variant="outline" disabled>Change</Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-destructive">Delete Account</p>
                                    <Button variant="destructive" disabled>Delete</Button>
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
                                <Switch id="dark-mode" checked={darkMode} onCheckedChange={(checked) => { setDarkMode(checked); handleSettingChange('darkModeEnabled', checked)}} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select value={language} onValueChange={(value) => {setLanguage(value); handleSettingChange('languagePreference', value)}}>
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
                                <Switch id="donation-updates" checked={notifications.donationUpdates} onCheckedChange={(checked) => handleNotificationChange('donationUpdates', checked)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="volunteer-tasks">Volunteer Tasks</Label>
                                <Switch id="volunteer-tasks" checked={notifications.volunteerTasks} onCheckedChange={(checked) => handleNotificationChange('volunteerTasks', checked)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="scheme-alerts">Welfare Scheme Alerts</Label>
                                <Switch id="scheme-alerts" checked={notifications.schemeAlerts} onCheckedChange={(checked) => handleNotificationChange('schemeAlerts', checked)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="emergency-alerts">Emergency Drive Alerts</Label>
                                <Switch id="emergency-alerts" checked={notifications.emergencyAlerts} onCheckedChange={(checked) => handleNotificationChange('emergencyAlerts', checked)} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
