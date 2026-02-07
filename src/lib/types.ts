
import type { DocumentData, Timestamp } from "firebase/firestore";

export interface Request extends DocumentData {
    id: string;
    userId: string;
    category: 'essentials' | 'disabilitySupport' | 'other';
    description: string;
    status: 'pending' | 'assigned' | 'completed' | 'cancelled';
    createdAt: Timestamp;
    location: string;
    assignedVolunteerId?: string;
    fulfillingNgoId?: string;
}

export interface Task extends DocumentData {
    id: string;
    title: string;
    volunteerId: string;
    ngoId: string;
    requestId?: string;
    status: 'assigned' | 'in-progress' | 'completed' | 'verified';
    checklist: { label: string; completed: boolean }[];
    date: string; // Should be a Timestamp in production
    location: string;
    createdAt: Timestamp;
}

export interface UserProfile extends DocumentData {
    id: string;
    uid: string;
    displayName: string;
    email: string;
    role: 'donor' | 'volunteer' | 'ngo' | 'beneficiary' | 'company' | 'admin';
    points: number;
}

export interface Donation extends DocumentData {
    id: string;
    donorId: string;
    ngoId?: string;
    items: string[];
    location: string;
    urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
    condition: 'new' | 'good' | 'usable';
    status: 'requested' | 'pending-pickup' | 'in-transit' | 'delivered' | 'cancelled';
    proofOfDelivery?: string;
    createdAt: Timestamp;
    recipient?: string; 
}
