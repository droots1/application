import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '../utils/supabase'; // Adjust the import path as necessary
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoading && session) {
      router.replace('/(tabs)');
    }
  }, [isLoading, session]);
  

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.replace('/home');
    } catch (error: any) {
      console.error('Sign in error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace('/auth/signin');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(email: string, password: string) {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      // Show success message or redirect to email verification page
      router.replace('/auth/signin' as const);
    } catch (error: any) {
      console.error('Sign up error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function resetPassword(email: string): Promise<void> {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'yourapp://reset-password',
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Reset password error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function loginWithGoogle() {
    try {
      setIsLoading(true);
  
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: window.location.origin, // Optional: use this if redirect isn't working
        },
      });
  
      if (error) throw error;
  
      // User will be redirected to Google, then back to your app
    } catch (error: any) {
      console.error('Google login error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }
  


  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signOut,
        signUp,
        resetPassword,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 