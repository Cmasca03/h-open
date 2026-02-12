// src/components/Navbar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/informacion', label: 'Información' },
    { href: '/nosotros', label: 'Entre nosotros' },
    { href: '/conecta', label: 'Conecta' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/perfil', label: 'Perfil' },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="flex items-center justify-center bg-stone-900/60 backdrop-blur-xl border border-stone-700/50 rounded-full py-2 px-3 shadow-xl">
        <div className="bg-amber-800/80 text-white font-bold px-6 py-2.5 rounded-l-full mr-2">
          H-OPEN
        </div>
        
        <div className="flex gap-1.5">
          {links.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-amber-700/70 text-white' 
                    : 'text-stone-300 hover:bg-stone-800/50 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}