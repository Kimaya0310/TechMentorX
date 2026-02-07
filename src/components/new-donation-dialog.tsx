
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/firebase/auth/use-user";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

interface NewDonationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function NewDonationDialog({ open, onOpenChange }: NewDonationDialogProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [items, setItems] = useState('');
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState<'new' | 'good' | 'usable'>('good');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setItems('');
    setLocation('');
    setCondition('good');
    setUrgency('medium');
  }

  const handleSubmit = async () => {
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'You must be logged in to make a donation.' });
      return;
    }
    if (!items.trim() || !location.trim()) {
        toast({ variant: 'destructive', title: 'Please fill out all fields.' });
        return;
    }
    setLoading(true);

    const donationData = {
        donorId: user.uid,
        items: items.split('\n').filter(item => item.trim() !== ''),
        location,
        condition,
        urgencyLevel: urgency,
        status: 'requested',
        createdAt: serverTimestamp(),
    };

    const donationsCollection = collection(firestore, 'donations');
    
    addDoc(donationsCollection, donationData)
        .then(() => {
            toast({ title: 'Donation Submitted', description: 'Your donation has been registered. An NGO will be in touch shortly.' });
            onOpenChange(false);
            resetForm();
        })
        .catch((serverError) => {
            const permissionError = new FirestorePermissionError({
                path: donationsCollection.path,
                operation: 'create',
                requestResourceData: donationData
            }, serverError);
            errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
            setLoading(false);
        });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make a New Donation</DialogTitle>
          <DialogDescription>
            Fill in the details of the items you wish to donate.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="items">Items to Donate</Label>
            <Textarea
              id="items"
              placeholder="e.g., Winter jackets (5)\nCanned beans (10 cans)\nChildren's story books"
              value={items}
              onChange={(e) => setItems(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">List each type of item on a new line.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="condition">Item Condition</Label>
                <Select onValueChange={(value: 'new' | 'good' | 'usable') => setCondition(value)} defaultValue={condition}>
                    <SelectTrigger id="condition">
                        <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="usable">Usable</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="urgency">Urgency</Label>
                 <Select onValueChange={(value: 'low' | 'medium' | 'high' | 'critical') => setUrgency(value)} defaultValue={urgency}>
                    <SelectTrigger id="urgency">
                        <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Pickup Location</Label>
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
            Submit Donation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
