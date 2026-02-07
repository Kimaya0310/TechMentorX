
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
import { addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { useCollection } from "@/firebase/firestore/use-collection";
import type { UserProfile } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface NewTaskDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function NewTaskDialog({ open, onOpenChange }: NewTaskDialogProps) {
  const { user } = useUser(); // This is the NGO user
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [volunteerId, setVolunteerId] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date>();
  const [checklist, setChecklist] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: volunteers, loading: volunteersLoading } = useCollection<UserProfile>(
    'users', { where: [['role', '==', 'volunteer']] }
  );

  const resetForm = () => {
    setTitle('');
    setVolunteerId('');
    setLocation('');
    setDate(undefined);
    setChecklist('');
  }

  const handleSubmit = async () => {
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'You must be logged in as an NGO to assign tasks.' });
      return;
    }
    if (!title.trim() || !volunteerId || !location.trim() || !date) {
        toast({ variant: 'destructive', title: 'Please fill out all fields.' });
        return;
    }
    setLoading(true);
    try {
        const tasksCollection = collection(firestore, 'tasks');
        await addDoc(tasksCollection, {
            title,
            volunteerId,
            ngoId: user.uid,
            location,
            date: Timestamp.fromDate(date),
            status: 'assigned',
            checklist: checklist.split('\n').filter(item => item.trim() !== '').map(label => ({ label, completed: false })),
            createdAt: serverTimestamp(),
        });
        toast({ title: 'Task Assigned', description: 'The volunteer has been notified.' });
        onOpenChange(false);
        resetForm();
    } catch (error: any) {
        console.error("Task assignment failed:", error);
        toast({ variant: 'destructive', title: 'Assignment Failed', description: error.message });
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign a New Task</DialogTitle>
          <DialogDescription>
            Fill in the task details and assign it to an available volunteer.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Task Title</Label>
            <Input id="title" placeholder="e.g., Deliver groceries to downtown shelter" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="volunteer">Assign to Volunteer</Label>
                <Select onValueChange={setVolunteerId} value={volunteerId}>
                    <SelectTrigger id="volunteer" disabled={volunteersLoading}>
                        <SelectValue placeholder={volunteersLoading ? "Loading..." : "Select a volunteer"} />
                    </SelectTrigger>
                    <SelectContent>
                        {volunteers?.map(v => (
                            <SelectItem key={v.uid} value={v.uid}>{v.displayName}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="e.g., 123 Main St, Anytown" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="checklist">Task Checklist</Label>
            <Textarea
              id="checklist"
              placeholder="e.g., Pick up items from warehouse\nGet signature on delivery"
              value={checklist}
              onChange={(e) => setChecklist(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">List each checklist item on a new line.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assign Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
