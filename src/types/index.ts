
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  organizer: string;
  type: EventType;
  createdBy: string;
}

export type EventType = 'academic' | 'cultural' | 'sports' | 'workshop' | 'seminar' | 'other';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
