
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Plus, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar({ onSearch }: { onSearch?: (query: string) => void }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-event-primary">EventCircle</h1>
            </Link>
          </div>

          {/* Search form - desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            {isAuthenticated && onSearch && (
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-event-primary focus:border-transparent"
                />
              </form>
            )}
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/create-event">
                  <Button variant="default" className="bg-event-primary hover:bg-event-primary/80 flex gap-2 items-center">
                    <Plus size={16} />
                    <span>Create Event</span>
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-event-accent text-white">
                          {user?.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="font-medium text-sm">
                      {user?.username}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-event-primary hover:bg-event-primary/80">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="inline-flex items-center justify-center">
              {isMenuOpen ? <X size={24} /> : <div className="space-y-1">
                <div className="w-5 h-0.5 bg-gray-600"></div>
                <div className="w-5 h-0.5 bg-gray-600"></div>
                <div className="w-5 h-0.5 bg-gray-600"></div>
              </div>}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-4 space-y-3 bg-white">
          {isAuthenticated && onSearch && (
            <form onSubmit={handleSearch} className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-event-primary focus:border-transparent"
              />
            </form>
          )}
          
          {isAuthenticated ? (
            <>
              <div className="px-3 py-2 flex items-center border-b border-gray-100">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarFallback className="bg-event-accent text-white">
                    {user?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user?.username}</span>
              </div>
              <Link to="/create-event" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md" onClick={toggleMenu}>
                Create Event
              </Link>
              <button onClick={() => { logout(); toggleMenu(); }} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md" onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/register" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md" onClick={toggleMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
