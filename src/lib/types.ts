
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
    date: Timestamp;
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
    skills?: string[];
    assignedNgoId?: string;
    companyName?: string;
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

export interface DonationRequest extends DocumentData {
    id: string;
    ngoId: string;
    title: string;
    itemType: string;
    quantity: number;
    urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
    status: 'open' | 'in-progress' | 'completed' | 'cancelled';
    createdAt: Timestamp;
}

export interface CSRProject extends DocumentData {
    id: string;
    companyId: string;
    name: string;
    budget: number;
    sponsoredNGOs: string[];
    impactMetrics: any; // Simplified for now
    focusArea: string;
    status: 'planning' | 'active' | 'completed';
}
