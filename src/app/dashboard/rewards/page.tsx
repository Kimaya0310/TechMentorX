import { Award, Star, Trophy } from "lucide-react";
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

const badges = [
  { name: "First Donation", icon: <Star className="text-yellow-500" />, earned: true },
  { name: "Community Helper", icon: <Award className="text-blue-500" />, earned: true },
  { name: "5 Donations", icon: <Star className="text-yellow-500" />, earned: true },
  { name: "Top Volunteer", icon: <Trophy className="text-green-500" />, earned: false },
  { name: "Impact Maker", icon: <Award className="text-blue-500" />, earned: false },
  { name: "Century Donor", icon: <Star className="text-yellow-500" />, earned: false },
];

const leaderboard = [
  { rank: 1, name: "Alice Johnson", points: 12500, avatarId: "avatar-3" },
  { rank: 2, name: "You", points: 11800, avatarId: "avatar-1" },
  { rank: 3, name: "Bob Williams", points: 11200, avatarId: "avatar-2" },
  { rank: 4, name: "Charlie Brown", points: 10500, avatarId: "avatar-3" },
  { rank: 5, name: "Diana Prince", points: 9800, avatarId: "avatar-2" },
];

export default function RewardsPage() {
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
              <p className="font-headline text-5xl font-bold">11,800</p>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm font-medium">
                <span>Level 5</span>
                <span>Level 6</span>
              </div>
              <Progress value={60} className="h-4" />
              <p className="mt-2 text-center text-sm text-muted-foreground">4,200 points to next level</p>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((user) => {
                const avatar = PlaceHolderImages.find(img => img.id === user.avatarId);
                return (
                <TableRow key={user.rank} className={user.name === 'You' ? 'bg-secondary' : ''}>
                  <TableCell className="font-medium">{user.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {avatar && <AvatarImage src={avatar.imageUrl} data-ai-hint={avatar.imageHint} />}
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">{user.points.toLocaleString()}</TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
