
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUser } from "@/firebase/auth/use-user";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "@/firebase";

interface RequestAssistanceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: 'essentials' | 'disabilitySupport';
}

export function RequestAssistanceDialog({ open, onOpenChange, category }: RequestAssistanceDialogProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'You must be logged in to make a request.' });
      return;
    }
    if (!description.trim() || !location.trim()) {
        toast({ variant: 'destructive', title: 'Please fill out all fields.' });
        return;
    }
    setLoading(true);
    try {
        const requestsCollection = collection(firestore, 'requests');
        await addDoc(requestsCollection, {
            userId: user.uid,
            category,
            description,
            location,
            status: 'pending',
            createdAt: serverTimestamp(),
        });
        toast({ title: 'Request Submitted', description: 'Your request has been sent to nearby NGOs.' });
        onOpenChange(false);
        setDescription('');
        setLocation('');
    } catch (error: any) {
        console.error("Request submission failed:", error);
        toast({ variant: 'destructive', title: 'Submission Failed', description: error.message });
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Assistance</DialogTitle>
          <DialogDescription>
            Describe what you need and provide your location. Your request will be sent to verified NGOs in your area.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="description">What do you need?</Label>
            <Textarea
              id="description"
              placeholder={category === 'essentials' ? 'e.g., Warm blankets, non-perishable food for a family of 4...' : 'e.g., A standard adult wheelchair, hearing aids...'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Your Location</Label>
            <Input
              id="location"
              placeholder="e.g., Street address, City, State"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
