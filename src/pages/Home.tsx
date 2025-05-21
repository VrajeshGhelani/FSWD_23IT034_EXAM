
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import EventCard from '@/components/EventCard';
import { useEvents } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Home() {
  const { events, deleteEvent, searchEvents } = useEvents();
  const { isAuthenticated } = useAuth();
  const [searchResults, setSearchResults] = useState(events);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(events);
    } else {
      setSearchResults(searchEvents(query));
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteEvent(deleteId);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-gradient-to-b from-white to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-event-primary/10 p-3">
                  <Calendar className="h-6 w-6 text-event-primary" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                Discover College Events
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-8">
                Your one-stop platform for discovering, creating, and managing exciting college events. Login to get started!
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-event-primary hover:bg-event-primary/80">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onSearch={handleSearch} />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Events</h1>
            <p className="text-gray-500 mt-2">Discover and manage college events</p>
          </header>
          
          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-gray-900 mb-2">No events found</h2>
              <p className="text-gray-500 mb-6">There are no events that match your search.</p>
              <Link to="/create-event">
                <Button className="bg-event-primary hover:bg-event-primary/80">
                  Create New Event
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <AlertDialog open={!!deleteId} onOpenChange={cancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

import { Calendar } from 'lucide-react';
