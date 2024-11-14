export type EventType = 
  | 'party' | 'show' | 'course' | 'workshop' | 'sports' 
  | 'gastronomy' | 'theater' | 'congress' | 'lecture' 
  | 'tour' | 'children' | 'tech' | 'religious' | 'other';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'organizer' | 'user';
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: string;
  endDate?: string;
  location: string;
  organizerId: string;
  imageUrl: string;
  price: number;
  earlyBirdPrice?: number;
  earlyBirdEndDate?: string;
  capacity: number;
  registrations: number;
  status: 'draft' | 'published' | 'cancelled';
  featured: boolean;
  tags: string[];
  amenities: string[];
  schedule?: EventScheduleItem[];
  ticketTypes: TicketType[];
}

export interface EventScheduleItem {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  soldCount: number;
  benefits: string[];
}

export interface DashboardStats {
  totalEvents: number;
  activeEvents: number;
  totalRegistrations: number;
  revenue: number;
  topEventTypes: { type: EventType; count: number }[];
  recentSales: {
    eventId: string;
    eventTitle: string;
    amount: number;
    date: string;
  }[];
}