
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, MapPin, Calendar } from "lucide-react";
import { useUser } from "@/firebase/auth/use-user";
import { useCollection } from "@/firebase/firestore/use-collection";
import type { Task } from "@/lib/types";
import { useFirestore } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export default function TasksPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const { data: tasks, loading } = useCollection<Task>(
    user ? 'tasks' : null,
    { where: [['volunteerId', '==', user?.uid || '']] }
  );

  const handleChecklistChange = (taskId: string, itemIndex: number, completed: boolean) => {
    if (!firestore || !tasks) return;

    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedChecklist = [...task.checklist];
    updatedChecklist[itemIndex].completed = completed;
    
    const taskDocRef = doc(firestore, "tasks", taskId);
    const updateData = { checklist: updatedChecklist };

    updateDoc(taskDocRef, updateData)
        .then(() => {
            toast({
                title: "Progress Saved",
                description: "Your checklist has been updated."
            })
        })
        .catch((serverError) => {
            const permissionError = new FirestorePermissionError({
                path: taskDocRef.path,
                operation: 'update',
                requestResourceData: updateData
            }, serverError);
            errorEmitter.emit('permission-error', permissionError);
        });
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold">My Volunteer Tasks</h1>
      
      {loading && (
        <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {!loading && tasks && tasks.length === 0 && (
        <Card className="text-center">
            <CardHeader>
                <CardTitle>No Tasks Assigned</CardTitle>
                <CardDescription>Check back later for new volunteer opportunities. An NGO can assign you a task from their dashboard.</CardDescription>
            </CardHeader>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {!loading && tasks && tasks.map(task => (
            <Card key={task.id}>
                <CardHeader>
                    <CardTitle className="font-headline">{task.title}</CardTitle>
                    <CardDescription className="flex flex-col gap-2 pt-2">
                        <span className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> {task.location}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> {task.date ? format(new Date(task.date as any), 'PPP') : 'No date'}
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <h3 className="mb-4 font-medium">Task Checklist</h3>
                    <div className="flex flex-col gap-3">
                        {task.checklist.map((item, index) => (
                            <div key={item.label} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={`${task.id}-${index}`} 
                                    checked={item.completed}
                                    onCheckedChange={(checked) => handleChecklistChange(task.id, index, !!checked)}
                                />
                                <label
                                    htmlFor={`${task.id}-${index}`}
                                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                                >
                                    {item.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
