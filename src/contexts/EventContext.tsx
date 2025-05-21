
import React, { createContext, useContext, useState } from 'react';
import { Event, EventType } from '@/types';
import { useToast } from '@/components/ui/use-toast';

// Sample event data for demonstration
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Symposium',
    description: 'Join us for a day of cutting-edge technology discussions and networking with industry professionals.',
    date: '2025-05-15',
    time: '10:00',
    location: 'Main Auditorium',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop',
    organizer: 'Computer Science Department',
    type: 'seminar',
    createdBy: '123'
  },
  {
    id: '2',
    title: 'Spring Cultural Festival',
    description: 'Celebrate diversity with performances, food, and activities from cultures around the world.',
    date: '2025-06-10',
    time: '12:00',
    location: 'Campus Quad',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop',
    organizer: 'Cultural Affairs Committee',
    type: 'cultural',
    createdBy: '123'
  },
  {
    id: '3',
    title: 'Basketball Tournament',
    description: 'Inter-college basketball competition with teams from neighboring colleges.',
    date: '2025-05-20',
    time: '14:00',
    location: 'Sports Complex',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2940&auto=format&fit=crop',
    organizer: 'Sports Council',
    type: 'sports',
    createdBy: '123'
  }
];

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  getEvent: (id: string) => Event | undefined;
  searchEvents: (query: string) => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const { toast } = useToast();

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
    };
    
    setEvents([...events, newEvent]);
    
    toast({
      title: "Event Created",
      description: "Your event has been created successfully!",
    });
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    
    toast({
      title: "Event Updated",
      description: "Your event has been updated successfully!",
    });
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    
    toast({
      title: "Event Deleted",
      description: "Your event has been deleted successfully!",
    });
  };

  const getEvent = (id: string) => {
    return events.find(event => event.id === id);
  };

  const searchEvents = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return events.filter(event => 
      event.title.toLowerCase().includes(lowercaseQuery) || 
      event.description.toLowerCase().includes(lowercaseQuery) ||
      event.location.toLowerCase().includes(lowercaseQuery) ||
      event.organizer.toLowerCase().includes(lowercaseQuery) ||
      event.type.toLowerCase().includes(lowercaseQuery)
    );
  };

  return (
    <EventContext.Provider value={{ 
      events, 
      addEvent, 
      updateEvent, 
      deleteEvent, 
      getEvent,
      searchEvents 
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
