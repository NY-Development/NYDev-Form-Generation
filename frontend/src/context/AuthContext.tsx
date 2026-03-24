import { createContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';
import type { User, Organization } from '../types';

interface AuthContextType {
  user: User | null;
  organization: Organization | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User, organization?: Organization) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsLoading(false);
      setIsAuthenticated(false);
      return;
    }

    try {
      // Get current user profile
      const response: any = await api.get('/auth/me');
      setUser(response.data.user);
      
      // If user has an org, fetch it
      if (response.data.user.organizationId) {
        const orgRes: any = await api.get(`/organizations/${response.data.user.organizationId}`);
        setOrganization(orgRes.data.organization);
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Auth verification failed', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      setOrganization(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (token: string, userData: User, orgData?: Organization) => {
    localStorage.setItem('token', token);
    setUser(userData);
    if (orgData) setOrganization(orgData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setOrganization(null);
      setIsAuthenticated(false);
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, organization, isAuthenticated, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
