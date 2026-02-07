
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
import { Loader2, Sparkles, FileDown, ListChecks, Map } from "lucide-react";
import { LandingHeader } from "@/components/landing-header";
import { LandingFooter } from "@/components/landing-footer";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  age: z.coerce.number().min(1, "Please enter a valid age.").max(120),
  income: z.coerce.number().min(0, "Please enter a valid income."),
  disabilityStatus: z.enum(["yes", "no"], {
    required_error: "Please select a disability status.",
  }),
  occupation: z.string().min(2, "Please enter an occupation."),
  state: z.string().min(2, "Please enter a state."),
  district: z.string().min(2, "Please enter a district."),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for demonstration purposes
const mockResult = {
  scheme: "Pradhan Mantri Jan Arogya Yojana (PMJAY)",
  eligibility: {
    status: "Eligible",
    reason: "Your income level and location match the criteria for this healthcare scheme."
  },
  documents: ["Aadhaar Card", "Ration Card", "Proof of Income", "Mobile Number"],
  steps: [
    "Visit the nearest Common Service Centre (CSC) or empanelled hospital.",
    "Meet the 'Ayushman Mitra' to verify your eligibility.",
    "Provide your Aadhaar card and other documents for verification.",
    "Once approved, you will receive your PMJAY e-card."
  ],
  office: "Nearest Common Service Centre (CSC)"
};


export default function WelfareSchemePage() {
  const { toast } = useToast();
  const [result, setResult] = useState<typeof mockResult | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 35,
      income: 50000,
      occupation: "Farmer",
      state: "Maharashtra",
      district: "Pune"
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);

    // In a real application, you would call your AI service here.
    // For now, we simulate a delay and show mock data.
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResult(mockResult);

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <div className="text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Find Welfare Schemes
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Fill in your details, and we'll help you find relevant government welfare schemes, check your eligibility, and guide you through the application process.
            </p>
          </div>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Eligibility Checker</CardTitle>
              <CardDescription>All information is processed securely and is not stored.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                          <FormLabel>Annual Family Income (INR)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 75000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Farmer, Labourer" {...field} />
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
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Maharashtra" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Pune" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Check Eligibility
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {loading && (
             <div className="text-center p-8">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Finding schemes for you...</p>
            </div>
          )}

          {result && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{result.scheme}</CardTitle>
                <CardDescription>Based on the details you provided, here is a recommended scheme.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                   <h3 className="font-semibold text-lg mb-2">Eligibility Status</h3>
                   <div className={`p-4 rounded-md ${result.eligibility.status === 'Eligible' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'}`}>
                      <p className={`font-bold text-lg ${result.eligibility.status === 'Eligible' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>{result.eligibility.status}</p>
                      <p className={`text-sm mt-1 ${result.eligibility.status === 'Eligible' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>{result.eligibility.reason}</p>
                   </div>
                </div>

                <Separator />
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><ListChecks /> Document Checklist</h3>
                    <Button variant="outline" size="sm"><FileDown className="mr-2 h-4 w-4"/> Download</Button>
                  </div>
                   <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                    {result.documents.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>
                
                <Separator />

                <div>
                   <h3 className="font-semibold text-lg mb-4">Application Guide</h3>
                   <ol className="relative border-l border-gray-200 dark:border-gray-700">
                     {result.steps.map((step, index) => (
                        <li key={index} className="mb-6 ml-6">
                          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                              <span className="text-blue-800 dark:text-blue-300 font-bold text-xs">{index + 1}</span>
                          </span>
                          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{step}</p>
                        </li>
                     ))}
                  </ol>
                  <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                    <Map />
                    <span>Apply at: <strong>{result.office}</strong></span>
                  </div>
                </div>

              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
