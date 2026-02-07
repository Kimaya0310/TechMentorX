
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
import { Label } from "@/components/ui/label";
import { useUser } from "@/firebase/auth/use-user";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface NewDonationRequestDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function NewDonationRequestDialog({ open, onOpenChange }: NewDonationRequestDialogProps) {
  const { user } = useUser(); // NGO User
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [itemType, setItemType] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle('');
    setItemType('');
    setQuantity('');
    setUrgency('medium');
  }

  const handleSubmit = async () => {
    if (!user || user.role !== 'ngo') {
      toast({ variant: 'destructive', title: 'You must be logged in as an NGO to create a request.' });
      return;
    }
    if (!title.trim() || !itemType.trim() || !quantity) {
        toast({ variant: 'destructive', title: 'Please fill out all fields.' });
        return;
    }
    setLoading(true);

    const requestData = {
        ngoId: user.uid,
        title,
        itemType,
        quantity: Number(quantity),
        urgencyLevel: urgency,
        status: 'open',
        createdAt: serverTimestamp(),
    };

    const requestsCollection = collection(firestore, 'donation-requests');
    
    addDoc(requestsCollection, requestData)
        .then(() => {
            toast({ title: 'Request Created', description: 'Your donation request is now live.' });
            onOpenChange(false);
            resetForm();
        })
        .catch((serverError) => {
            const permissionError = new FirestorePermissionError({
                path: requestsCollection.path,
                operation: 'create',
                requestResourceData: requestData
            }, serverError);
            errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
            setLoading(false);
        });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Donation Request</DialogTitle>
          <DialogDescription>
            Create a request for specific items your organization needs.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Drive Title</Label>
            <Input id="title" placeholder="e.g., Winter Clothing Drive" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="itemType">Item Type</Label>
            <Input id="itemType" placeholder="e.g., Blankets, School Supplies" value={itemType} onChange={(e) => setItemType(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="quantity">Target Quantity</Label>
                <Input id="quantity" type="number" placeholder="e.g., 100" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
