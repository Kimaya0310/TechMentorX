import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { LandingHeader } from "@/components/landing-header";
import { LandingFooter } from "@/components/landing-footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const features = [
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: "Seamless Donations",
    description: "Easily donate items and track their journey to beneficiaries with full transparency and photo-verification.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Volunteer Coordination",
    description: "Find volunteering opportunities, manage tasks with checklists, and get route support for efficient delivery.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Verified Organizations",
    description: "Connect with trusted and verified NGOs and social enterprises, ensuring your contributions make a real impact.",
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: "AI-Powered Assistance",
    description: "Discover relevant welfare schemes with our intelligent recommendation tool, tailored to your personal needs.",
  },
];

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
           {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="container relative mx-auto px-4 text-center text-primary-foreground">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Helping hands
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl">
              SocialSync connects donors, volunteers, and NGOs to create a powerful network for social good. Join us to make a difference in your community.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/signup">Get Started <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/welfare-schemes">Find Schemes</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="w-full bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                A Platform for Meaningful Impact
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Explore the features that make SocialSync the ultimate tool for social change.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center transition-transform hover:scale-105 hover:shadow-lg">
                  <CardHeader>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                      {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
