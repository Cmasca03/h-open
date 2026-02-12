'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthFormProps {
  isSignUp: boolean;
  onClose: () => void;
}

export default function AuthForm({ isSignUp, onClose }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert('Revisa tu email para confirmar.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
    }
    onClose();
  };

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-full bg-gray-800 text-white border border-gray-600"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 rounded-full bg-gray-800 text-white border border-gray-600"
      />
      <button
        onClick={handleAuth}
        className="w-full bg-amber-700 text-white p-3 rounded-full font-bold"
      >
        {isSignUp ? 'REGÍSTRATE' : 'INICIAR SESIÓN'}
      </button>
    </div>
  );
}