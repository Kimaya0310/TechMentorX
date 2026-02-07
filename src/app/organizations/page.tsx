import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";
import { LandingHeader } from "@/components/landing-header";
import { LandingFooter } from "@/components/landing-footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const organizations = [
  {
    name: "Community Food Bank",
    description: "Dedicated to fighting hunger and food waste.",
    avatarId: "avatar-1",
  },
  {
    name: "City Shelter",
    description: "Providing safe shelter and support for the homeless.",
    avatarId: "avatar-2",
  },
  {
    name: "Orphanage Home",
    description: "A loving home for orphaned and abandoned children.",
    avatarId: "avatar-3",
  },
  {
    name: "Rural Clinic",
    description: "Bringing essential healthcare services to remote areas.",
    avatarId: "avatar-1",
  },
  {
    name: "Homeless Outreach",
    description: "Direct assistance and outreach to those living on the streets.",
    avatarId: "avatar-2",
  },
  {
      name: "Children's Hospital",
      description: "Specialized medical care for children.",
      avatarId: "avatar-3",
  }
];

export default function OrganizationsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
        <LandingHeader />
        <main className="flex-1 py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                        Verified Organizations
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        We partner with trusted NGOs and social enterprises to ensure your contributions make a real impact.
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {organizations.map((org) => {
                        const avatar = PlaceHolderImages.find(img => img.id === org.avatarId);
                        return (
                        <Card key={org.name}>
                            <CardHeader className="flex-row items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    {avatar && <AvatarImage src={avatar.imageUrl} data-ai-hint={avatar.imageHint} />}
                                    <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                                        {org.name} <CheckCircle className="h-5 w-5 text-green-600" />
                                    </CardTitle>
                                    <CardDescription>Verified Partner</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{org.description}</p>
                            </CardContent>
                        </Card>
                    )})}
                </div>
            </div>
        </main>
        <LandingFooter />
    </div>
  );
}
