
import { useState } from 'react';
import { Event } from '@/types';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import EventDetailsDialog from './EventDetailsDialog';

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
}

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'academic':
      return 'bg-blue-100 text-blue-800';
    case 'cultural':
      return 'bg-purple-100 text-purple-800';
    case 'sports':
      return 'bg-green-100 text-green-800';
    case 'workshop':
      return 'bg-amber-100 text-amber-800';
    case 'seminar':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const EventCard: React.FC<EventCardProps> = ({ event, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useAuth();
  const isOwner = user?.id === event.createdBy;

  return (
    <>
      <div className="event-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-gray-200">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={event.imageUrl || "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2940&auto=format&fit=crop"} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2940&auto=format&fit=crop";
            }}
          />
          <div className="absolute top-2 right-2">
            <Badge className={`${getEventTypeColor(event.type)} capitalize`}>
              {event.type}
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 line-clamp-1">{event.title}</h3>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{event.description}</p>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(event.date)} · {event.time}</span>
          </div>
          
          <p className="text-sm text-gray-500 mb-3">
            {event.location} • {event.organizer}
          </p>
          
          <div className="flex items-center justify-between mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDetails(true)}
            >
              View Details
            </Button>
            
            {isOwner && (
              <div className="flex gap-2">
                <Link to={`/edit-event/${event.id}`}>
                  <Button size="icon" variant="outline">
                    <Edit size={16} />
                  </Button>
                </Link>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="text-red-500 hover:text-white hover:bg-red-500" 
                  onClick={() => onDelete(event.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <EventDetailsDialog 
        event={event} 
        isOpen={showDetails} 
        onClose={() => setShowDetails(false)} 
      />
    </>
  );
};

export default EventCard;
