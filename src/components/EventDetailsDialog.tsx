
import { Event } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Calendar } from 'lucide-react';

interface EventDetailsDialogProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
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

const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({ event, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{event.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 mt-2">
            <Badge className={`${getEventTypeColor(event.type)} capitalize`}>
              {event.type}
            </Badge>
            <span className="text-sm text-gray-500">{event.organizer}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <img 
              src={event.imageUrl || "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2940&auto=format&fit=crop"} 
              alt={event.title}
              className="w-full h-64 object-cover rounded-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2940&auto=format&fit=crop";
              }}
            />
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Calendar size={16} className="mr-2" />
            <span>{formatDate(event.date)} at {event.time}</span>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2">Location</h4>
            <p>{event.location}</p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-2">Description</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsDialog;
