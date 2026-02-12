// components/Layout.tsx  (mismo que antes, pero lo usaremos en _app)
import Navbar from './Navbar'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-700 text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {children}
      </main>
      {/* Puedes agregar footer aquí si lo quieres */}
    </div>
  )
}