// src/pages/index.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { session, isGuest, logout, isLoading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  const handleGuest = () => {
    localStorage.setItem('isGuest', 'true');
    localStorage.setItem('guestId', crypto.randomUUID());
    alert('Estás navegando como invitado.');
    router.push('/nosotros');
  };

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <Image
          src="/images/tronco.png"
          alt="Planta creciendo en tronco"
          fill
          className="object-cover brightness-[0.75] contrast-[1.15] saturate-[1.1]"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/30 to-stone-950/65" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-12 md:mb-16 text-white drop-shadow-2xl">
            TU ESPACIO DE CONFIANZA
          </h1>

          {session ? (
            <div className="space-y-6">
              <p className="text-2xl">Bienvenido, {session.user.email}!</p>
              <button
                onClick={logout}
                className="bg-red-700 hover:bg-red-600 text-white px-12 py-6 rounded-full text-xl font-semibold"
              >
                Cerrar sesión
              </button>
            </div>
          ) : isGuest ? (
            <div className="space-y-6">
              <p className="text-2xl">Modo invitado activado</p>
              <button
                onClick={logout}  // Usa logout para limpiar guest también
                className="bg-stone-700 hover:bg-stone-600 text-white px-12 py-6 rounded-full text-xl font-semibold"
              >
                Salir de modo invitado
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
              <button
                onClick={() => { setIsSignup(true); setShowAuth(true); }}
                className="bg-amber-800/90 hover:bg-amber-700/90 backdrop-blur-sm border border-amber-700/40 text-white px-12 py-6 rounded-full text-xl md:text-2xl font-semibold transition-all shadow-xl min-w-[220px]"
              >
                REGÍSTRATE
              </button>

              <button
                onClick={() => { setIsSignup(false); setShowAuth(true); }}
                className="bg-stone-800/80 hover:bg-stone-700/80 backdrop-blur-sm border border-stone-600/50 text-white px-12 py-6 rounded-full text-xl md:text-2xl font-semibold transition-all shadow-xl min-w-[220px]"
              >
                INICIAR SESIÓN
              </button>
            </div>
          )}

          {!session && !isGuest && (
            <p className="mt-10 md:mt-12 text-lg md:text-xl text-stone-300">
              *Si quieres continuar sin sesión,{' '}
              <button onClick={handleGuest} className="underline hover:text-white transition-colors">
                pulsa aquí
              </button>
            </p>
          )}
        </div>

        {/* Barra de búsqueda */}
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-11/12 max-w-3xl px-4">
          <div className="relative">
            <input
              placeholder="BUSCAR..."
              className="w-full bg-stone-900/50 backdrop-blur-lg border border-stone-700/50 text-white placeholder-stone-400 px-8 py-5 rounded-full text-center text-lg focus:outline-none focus:border-amber-600/60 focus:ring-1 focus:ring-amber-600/40 transition"
            />
            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-400 transition">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        isSignup={isSignup}
      />
    </>
  );
}