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

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-white text-xl">Cargando...</div>;

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
          className="object-cover brightness-[0.75] contrast-[1.15] saturate-[1.1] object-center"
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1536px) 100vw, 1920px"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/30 to-stone-950/65" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-7xl font-extrabold tracking-tight mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 text-white drop-shadow-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            TU ESPACIO DE CONFIANZA
          </h1>

          {session ? (
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl text-stone-100">
                Bienvenido, {session.user.email?.split('@')[0]}!
              </p>
              <button
                onClick={logout}
                className="bg-red-700 hover:bg-red-600 text-white px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 rounded-full text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-semibold shadow-lg transition-all hover:scale-105 min-w-[180px] sm:min-w-[220px] md:min-w-[260px] lg:min-w-[300px] xl:min-w-[340px]"
              >
                Cerrar sesión
              </button>
            </div>
          ) : isGuest ? (
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl text-stone-100">
                Modo invitado activado
              </p>
              <button
                onClick={logout}
                className="bg-stone-700 hover:bg-stone-600 text-white px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 rounded-full text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-semibold shadow-lg transition-all hover:scale-105 min-w-[180px] sm:min-w-[220px] md:min-w-[260px] lg:min-w-[300px] xl:min-w-[340px]"
              >
                Salir de modo invitado
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
              <button
                onClick={() => { setIsSignup(true); setShowAuth(true); }}
                className="bg-amber-800/90 hover:bg-amber-700/90 backdrop-blur-sm border border-amber-700/40 text-white px-8 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 rounded-full text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-semibold transition-all shadow-xl min-w-[180px] sm:min-w-[220px] md:min-w-[260px] lg:min-w-[300px] xl:min-w-[340px]"
              >
                REGÍSTRATE
              </button>

              <button
                onClick={() => { setIsSignup(false); setShowAuth(true); }}
                className="bg-stone-800/80 hover:bg-stone-700/80 backdrop-blur-sm border border-stone-600/50 text-white px-8 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 rounded-full text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-semibold transition-all shadow-xl min-w-[180px] sm:min-w-[220px] md:min-w-[260px] lg:min-w-[300px] xl:min-w-[340px]"
              >
                INICIAR SESIÓN
              </button>
            </div>
          )}

          {!session && !isGuest && (
            <p className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-stone-300">
              *Si quieres continuar sin sesión,{' '}
              <button onClick={handleGuest} className="underline hover:text-white transition">
                pulsa aquí
              </button>
            </p>
          )}
        </div>

        {/* Barra de búsqueda */}
        <div className="absolute bottom-6 sm:bottom-10 md:bottom-12 lg:bottom-16 xl:bottom-20 left-1/2 -translate-x-1/2 w-11/12 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="relative">
            <input
              placeholder="BUSCAR..."
              className="w-full bg-stone-800/70 backdrop-blur-xl border border-amber-700/40 text-white placeholder-stone-400 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 rounded-full text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40 transition shadow-xl"
            />
            <button className="absolute right-4 sm:right-6 md:right-8 lg:right-10 xl:right-12 top-1/2 -translate-y-1/2 text-stone-300 hover:text-amber-300 transition">
              <svg className="w-6 sm:w-7 md:w-8 lg:w-9 xl:w-10 h-6 sm:h-7 md:h-8 lg:h-9 xl:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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