'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

export default function Confirm() {
  const router = useRouter();
  const { token_hash, type, next = '/' } = router.query;

  useEffect(() => {
    if (!token_hash || !type) {
      router.push('/');
      return;
    }

    const verify = async () => {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token_hash as string,
        type: type as any,
      });

      if (error) {
        alert('Error al confirmar: ' + error.message);
        router.push('/inicio');
        return;
      }

      alert('¡Correo confirmado! Ya estás dentro.');
      router.push(next as string || '/index');  // redirige a perfil o donde quieras
    };

    verify();
  }, [token_hash, type, next, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 text-white">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold mb-4">Confirmando tu correo...</h1>
        <p>No cierres esta ventana. Te redirigiremos en segundos.</p>
      </div>
    </div>
  );
}