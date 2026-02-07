
'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("donor");


  const handleLogin = () => {
    // This is a mock login. We will replace this with Firebase Auth.
    localStorage.setItem("userRole", role);
    console.log(`Logging in as ${role}...`);
    switch (role) {
      case "ngo":
        router.push('/dashboard/ngo');
        break;
      case "beneficiary":
        router.push('/dashboard/beneficiary');
        break;
      case "volunteer":
        router.push('/dashboard/volunteer');
        break;
      case "company":
        router.push('/dashboard/company');
        break;
      case "admin":
        router.push('/admin');
        break;
      default:
        router.push('/dashboard');
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Log In</CardTitle>
        <CardDescription>
          Enter your email and select your role to log in.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Log in as...</Label>
          <Select onValueChange={setRole} defaultValue="donor">
            <SelectTrigger id="role">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="donor">Donor</SelectItem>
              <SelectItem value="volunteer">Volunteer</SelectItem>
              <SelectItem value="ngo">NGO</SelectItem>
              <SelectItem value="beneficiary">Beneficiary</SelectItem>
              <SelectItem value="company">Big Company (CSR)</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full" onClick={handleLogin}>Log In</Button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="underline hover:text-primary">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
