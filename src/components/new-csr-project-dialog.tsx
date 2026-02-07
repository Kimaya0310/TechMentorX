
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

interface NewCSRProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function NewCSRProjectDialog({ open, onOpenChange }: NewCSRProjectDialogProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [budget, setBudget] = useState<number | ''>('');
  const [focusArea, setFocusArea] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName('');
    setBudget('');
    setFocusArea('');
  }

  const handleSubmit = async () => {
    if (!user || user.role !== 'company') {
      toast({ variant: 'destructive', title: 'You must be logged in as a Company to create a project.' });
      return;
    }
    if (!name.trim() || !budget || budget <= 0) {
        toast({ variant: 'destructive', title: 'Please fill out all fields with valid values.' });
        return;
    }
    setLoading(true);

    const projectData = {
        companyId: user.uid,
        name,
        budget: Number(budget),
        focusArea,
        status: 'planning',
        sponsoredNGOs: [],
        impactMetrics: {},
        createdAt: serverTimestamp(),
    };

    const projectsCollection = collection(firestore, 'csr-projects');
    
    addDoc(projectsCollection, projectData)
        .then(() => {
            toast({ title: 'CSR Project Created', description: 'Your new project has been saved.' });
            onOpenChange(false);
            resetForm();
        })
        .catch((serverError) => {
            const permissionError = new FirestorePermissionError({
                path: projectsCollection.path,
                operation: 'create',
                requestResourceData: projectData
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
          <DialogTitle>Create New CSR Project</DialogTitle>
          <DialogDescription>
            Define your company's next social impact initiative.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" placeholder="e.g., Education for All 2024" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="budget">Total Budget (INR)</Label>
            <Input id="budget" type="number" placeholder="e.g., 500000" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="focus-area">Focus Area</Label>
            <Input id="focus-area" placeholder="e.g., Education, Environment, Healthcare" value={focusArea} onChange={(e) => setFocusArea(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
