import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  loginAsDemoUser: (role: UserRole) => void;
  login: (email: string, pass: string) => Promise<{ error?: string }>;
  register: (email: string, pass: string, name: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<UserRole, UserProfile> = {
  admin: {
    id: 'usr_admin_01',
    email: 'admin@themauestate.com',
    full_name: 'David Kimani (General Manager)',
    role: 'admin',
    country: 'Kenya',
    telephone: '+254 700 882 100',
    created_at: '2026-01-01T00:00:00Z',
  },
  manager: {
    id: 'usr_mgr_01',
    email: 'manager@themauestate.com',
    full_name: 'Grace Kiprop (Operations Director)',
    role: 'manager',
    country: 'Kenya',
    telephone: '+254 700 882 102',
    created_at: '2026-01-01T00:00:00Z',
  },
  staff: {
    id: 'usr_staff_01',
    email: 'reservations@themauestate.com',
    full_name: 'Joy Wambui (Front Desk & Reservations)',
    role: 'staff',
    country: 'Kenya',
    telephone: '+254 700 882 101',
    created_at: '2026-01-01T00:00:00Z',
  },
  guest: {
    id: 'usr_guest_01',
    email: 'guest@example.com',
    full_name: 'Lady Catherine Montgomery',
    role: 'guest',
    country: 'United Kingdom',
    telephone: '+44 7700 900077',
    created_at: '2026-10-01T00:00:00Z',
  },
};

const LOCAL_AUTH_KEY = 'mau_estate_active_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_AUTH_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          // fetch user role profile from supabase
          supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle()
            .then(({ data }) => {
              if (data) {
                const profile: UserProfile = {
                  id: data.id,
                  email: data.email,
                  full_name: data.full_name || session.user.email?.split('@')[0] || 'User',
                  role: data.role || 'guest',
                  country: data.country,
                  telephone: data.telephone,
                  avatar_url: data.avatar_url,
                  created_at: data.created_at,
                };
                setUser(profile);
                localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(profile));
              }
            });
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          setUser(null);
          localStorage.removeItem(LOCAL_AUTH_KEY);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const loginAsDemoUser = (role: UserRole) => {
    const profile = DEMO_USERS[role];
    setUser(profile);
    localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(profile));
  };

  const login = async (email: string, pass: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) return { error: error.message };
      return {};
    }

    // Local simulated auth
    if (email.toLowerCase().includes('admin')) {
      loginAsDemoUser('admin');
    } else if (email.toLowerCase().includes('staff') || email.toLowerCase().includes('reservations')) {
      loginAsDemoUser('staff');
    } else {
      const guestProfile: UserProfile = {
        id: 'usr_' + Date.now(),
        email,
        full_name: email.split('@')[0],
        role: 'guest',
        created_at: new Date().toISOString(),
      };
      setUser(guestProfile);
      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(guestProfile));
    }
    return {};
  };

  const register = async (email: string, pass: string, name: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: { data: { full_name: name } },
      });
      if (error) return { error: error.message };
      return {};
    }

    const newGuest: UserProfile = {
      id: 'usr_' + Date.now(),
      email,
      full_name: name,
      role: 'guest',
      created_at: new Date().toISOString(),
    };
    setUser(newGuest);
    localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(newGuest));
    return {};
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem(LOCAL_AUTH_KEY);
  };

  const isAdmin = user?.role === 'admin';
  const isStaff = user?.role === 'staff' || user?.role === 'manager' || user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        isStaff,
        loginAsDemoUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
