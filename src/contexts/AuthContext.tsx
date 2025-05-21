
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setAuthState({
          user: parsedUser,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // For demonstration, we'll use a mock login
      // In a real app, you'd call your backend API
      if (email && password) {
        // Mock user for demo purposes
        const mockUser: User = {
          id: '123',
          username: email.split('@')[0],
          email: email
        };

        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });
        
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
      } else {
        throw new Error("Email and password are required");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      // Mock registration, in a real app you'd call your backend
      if (username && email && password) {
        const mockUser: User = {
          id: Date.now().toString(),
          username,
          email
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });
        
        toast({
          title: "Registration Successful",
          description: "Your account has been created!",
        });
      } else {
        throw new Error("All fields are required");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again with valid information",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...authState, 
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
