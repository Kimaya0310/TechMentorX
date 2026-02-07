
'use client';

import { Award, Star, Trophy, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { useUser } from "@/firebase/auth/use-user";
import { useCollection } from "@/firebase/firestore/use-collection";
import type { UserProfile } from "@/lib/types";

const badges = [
  { name: "First Donation", icon: <Star className="text-yellow-500" />, earned: true },
  { name: "Community Helper", icon: <Award className="text-blue-500" />, earned: true },
  { name: "5 Donations", icon: <Star className="text-yellow-500" />, earned: true },
  { name: "Top Volunteer", icon: <Trophy className="text-green-500" />, earned: false },
  { name: "Impact Maker", icon: <Award className="text-blue-500" />, earned: false },
  { name: "Century Donor", icon: <Star className="text-yellow-500" />, earned: false },
];

function Leaderboard() {
  const { user: currentUser } = useUser();
  const { data: users, loading } = useCollection<UserProfile>(
    'users',
    { orderBy: ['points', 'desc'], limit: 10 }
  );

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-right">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user, index) => {
          const avatar = PlaceHolderImages.find(img => img.id.includes('avatar')); // Just get a random avatar
          return (
            <TableRow key={user.id} className={user.uid === currentUser?.uid ? 'bg-secondary' : ''}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    {avatar && <AvatarImage src={avatar.imageUrl} data-ai-hint={avatar.imageHint} />}
                    <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{user.uid === currentUser?.uid ? 'You' : user.displayName}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-mono">{(user.points || 0).toLocaleString()}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default function RewardsPage() {
  const { user } = useUser();
  const points = user?.points || 0;
  const level = Math.floor(points / 10000) + 1;
  const pointsInLevel = points % 10000;
  const progress = (pointsInLevel / 10000) * 100;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold">Rewards & Recognition</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Your Progress</CardTitle>
            <CardDescription>Your current points and progress to the next level.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="font-headline text-5xl font-bold">{(points).toLocaleString()}</p>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm font-medium">
                <span>Level {level}</span>
                <span>Level {level + 1}</span>
              </div>
              <Progress value={progress} className="h-4" />
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {(10000 - pointsInLevel).toLocaleString()} points to next level
              </p>
            </div>
            <div className="text-center">
              <Button variant="outline">Download Certificate</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">My Badges</CardTitle>
            <CardDescription>Collect badges for your achievements.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div key={badge.name} className={`flex flex-col items-center text-center ${!badge.earned ? 'opacity-40' : ''}`}>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  {badge.icon}
                </div>
                <p className="mt-2 text-xs font-medium">{badge.name}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Leaderboard</CardTitle>
          <CardDescription>See how you rank among other contributors.</CardDescription>
        </CardHeader>
        <CardContent>
          <Leaderboard />
        </CardContent>
      </Card>
    </div>
  );
}
