
'use client';

import { useState } from "react";
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


const initialTasks: Task[] = [
    {
        id: "TSK001",
        title: "Pick up donations from Eastside Collection Point",
        volunteerId: "user1",
        ngoId: "ngo1",
        status: 'assigned',
        date: "2023-12-05",
        location: "123 Maple St, Springfield",
        createdAt: new Date() as any, // Mock timestamp
        checklist: [
            { label: "Confirm pickup time with donor", completed: true },
            { label: "Bring 5 large boxes", completed: true },
            { label: "Take photos for verification", completed: false },
        ]
    },
    {
        id: "TSK002",
        title: "Deliver food packages to City Shelter",
        volunteerId: "user1",
        ngoId: "ngo1",
        status: 'assigned',
        date: "2023-12-06",
        location: "456 Oak Ave, Springfield",
        createdAt: new Date() as any,
        checklist: [
            { label: "Collect packages from warehouse", completed: true },
            { label: "Use provided route for delivery", completed: false },
            { label: "Get signature from shelter manager", completed: false },
        ]
    },
];

export default function TasksPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  // In a real app, you would fetch tasks assigned to the user.
  // We'll use local state for now to demonstrate interactivity.
  // const { data: tasks, loading } = useCollection<Task>(
  //   user ? 'tasks' : null,
  //   { where: [['volunteerId', '==', user?.uid || '']] }
  // );

  // Using mock data for now as we don't have a way to create tasks yet
  const [tasks, setTasks] = useState(initialTasks);
  const loading = false;


  const handleChecklistChange = async (taskId: string, itemIndex: number, completed: boolean) => {
    if (!firestore) return;
    
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedChecklist = [...task.checklist];
    updatedChecklist[itemIndex].completed = completed;
    
    // Optimistically update the UI
    setTasks(tasks.map(t => t.id === taskId ? { ...t, checklist: updatedChecklist } : t));

    try {
        const taskDocRef = doc(firestore, "tasks", taskId);
        await updateDoc(taskDocRef, { checklist: updatedChecklist });
    } catch (error) {
        console.error("Failed to update task:", error);
        toast({
            variant: "destructive",
            title: "Update failed",
            description: "Could not save your progress. Please try again.",
        });
        // Revert optimistic update on failure
        updatedChecklist[itemIndex].completed = !completed;
        setTasks(tasks.map(t => t.id === taskId ? { ...t, checklist: updatedChecklist } : t));
    }
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
                <CardDescription>Check back later for new volunteer opportunities.</CardDescription>
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
                            <Calendar className="h-4 w-4" /> {task.date}
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
