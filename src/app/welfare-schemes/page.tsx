'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import type { WelfareSchemeOutput } from "@/ai/flows/welfare-scheme-recommendation";
import { getWelfareSchemeRecommendations } from "./actions";
import { Loader2, Sparkles } from "lucide-react";
import { LandingHeader } from "@/components/landing-header";
import { LandingFooter } from "@/components/landing-footer";

const formSchema = z.object({
  age: z.coerce.number().min(1, "Please enter a valid age.").max(120),
  income: z.coerce.number().min(0, "Please enter a valid income."),
  disabilityStatus: z.enum(["yes", "no", "not applicable"], {
    required_error: "Please select a disability status.",
  }),
});

export default function WelfareSchemePage() {
  const { toast } = useToast();
  const [result, setResult] = useState<WelfareSchemeOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 18,
      income: 50000,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);

    const response = await getWelfareSchemeRecommendations(values);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.error || "Failed to get recommendations.",
      });
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <div className="text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              AI Welfare Scheme Recommender
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Fill in your details below, and our AI assistant will suggest relevant government welfare schemes for you.
            </p>
          </div>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Your Details</CardTitle>
              <CardDescription>All information is processed securely and is not stored.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter your age" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="income"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Income (INR)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter your annual income" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="disabilityStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Disability Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select disability status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="not applicable">Not Applicable</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Get Recommendations
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {result && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="font-headline">Recommended Schemes</CardTitle>
              </CardHeader>
              <CardContent>
                {result.schemes.length > 0 ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {result.schemes.map((scheme, index) => (
                      <li key={index} className="font-medium">{scheme}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No specific schemes found based on your details. You may still be eligible for general programs.</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
