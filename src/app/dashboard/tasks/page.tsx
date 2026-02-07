import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar } from "lucide-react";


const tasks = [
    {
        id: "TSK001",
        title: "Pick up donations from Eastside Collection Point",
        location: "123 Maple St, Springfield",
        date: "2023-12-05",
        checklist: [
            { id: "c1-1", label: "Confirm pickup time with donor", completed: true },
            { id: "c1-2", label: "Bring 5 large boxes", completed: true },
            { id: "c1-3", label: "Take photos for verification", completed: false },
        ]
    },
    {
        id: "TSK002",
        title: "Deliver food packages to City Shelter",
        location: "456 Oak Ave, Springfield",
        date: "2023-12-06",
        checklist: [
            { id: "c2-1", label: "Collect packages from warehouse", completed: true },
            { id: "c2-2", label: "Use provided route for delivery", completed: false },
            { id: "c2-3", label: "Get signature from shelter manager", completed: false },
        ]
    },
    {
        id: "TSK003",
        title: "Sort clothing donations at warehouse",
        location: "789 Pine Ln, Springfield",
        date: "2023-12-08",
        checklist: [
            { id: "c3-1", label: "Categorize by size and type", completed: false },
            { id: "c3-2", label: "Bag and label sorted clothes", completed: false },
        ]
    }
]

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold">My Volunteer Tasks</h1>
      
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {tasks.map(task => (
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
                        {task.checklist.map(item => (
                            <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox id={item.id} checked={item.completed} />
                                <label
                                    htmlFor={item.id}
                                    className={`text-sm font-medium leading-none ${item.completed ? 'line-through text-muted-foreground' : ''}`}
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
