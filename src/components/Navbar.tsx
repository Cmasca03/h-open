// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { session, logout } = useAuth();

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/informacion', label: 'Información' },
    { href: '/nosotros', label: 'Entre nosotros' },
    { href: '/conecta', label: 'Conecta' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/perfil', label: 'Perfil' },
  ];

  return (
    <nav className="fixed top-3 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95%] sm:max-w-5xl lg:max-w-6xl px-2 sm:px-4">
      <div className="flex items-center justify-between sm:justify-center bg-stone-900/60 backdrop-blur-xl border border-stone-700/50 rounded-full py-1.5 sm:py-2 px-2 sm:px-3 shadow-xl overflow-hidden">
        <div className="bg-amber-800/80 text-white font-bold px-4 sm:px-6 py-2 rounded-l-full text-base sm:text-lg whitespace-nowrap">
          H-OPEN
        </div>

        <div className="hidden sm:flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 px-2 sm:px-4 overflow-x-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 sm:px-4 md:px-5 lg:px-6 py-2 text-xs sm:text-sm md:text-base lg:text-lg rounded-full text-stone-200 hover:bg-stone-700/40 transition whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* En mòbil: menú hamburguesa o scroll horitzontal */}
        <div className="sm:hidden flex items-center gap-2 overflow-x-auto px-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm rounded-full text-stone-200 hover:bg-stone-700/40 transition whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Botó de tancar sessió si està loguejat */}
        {session && (
          <button
            onClick={logout}
            className="ml-2 sm:ml-4 px-4 sm:px-6 py-2 bg-red-800/70 hover:bg-red-700 rounded-full text-white text-sm sm:text-base font-medium transition"
          >
            Cerrar
          </button>
        )}
      </div>
    </nav>
  );
}