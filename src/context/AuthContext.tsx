// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  isGuest: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  isGuest: false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false); // valor seguro inicial (no leemos localStorage aquí)

  useEffect(() => {
    // Solo se ejecuta en el cliente → localStorage ya existe
    const guest = localStorage.getItem('isGuest') === 'true';
    setIsGuest(guest);

    // Sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listener de cambios en auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        // Si se loguea → limpiamos modo guest automáticamente
        localStorage.removeItem('isGuest');
        setIsGuest(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('isGuest');
    setIsGuest(false);
    window.location.href = '/'; // redirección simple (o usa router si importas useRouter)
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, isGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);