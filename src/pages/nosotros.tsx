// src/pages/nosotros.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';

interface Testimonio {
  id: string;
  content: string;
  visibility: 'public' | 'private';
  approved: boolean;
  created_at: string;
  user_id: string;
}

export default function Nosotros() {
  const { session, isGuest } = useAuth();
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [newTestimonio, setNewTestimonio] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('private');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  // Cargar testimonios según el estado de la sesión
  const loadTestimonios = async () => {
    try {
      let query = supabase
        .from('testimonios')
        .select('*')
        .order('created_at', { ascending: false });

      if (session) {
        // Logueado: ve TODOS los públicos aprobados + TODOS sus privados (aprobados o no)
        query = query.or(
          `approved.eq.true,visibility.eq.public,user_id.eq.${session.user.id}`
        );
      } else {
        // Invitado: solo públicos aprobados
        query = query.eq('approved', true).eq('visibility', 'public');
      }

      const { data, error } = await query;

      if (error) throw error;

      console.log('Testimonios cargados:', data); // ← para depurar
      setTestimonios(data || []);
    } catch (err: any) {
      console.error('Error al cargar testimonios:', err);
      setError('No se pudieron cargar los testimonios. Intenta refrescar la página.');
    }
  };

  // Cargar al montar la página y cuando cambie la sesión
  useEffect(() => {
    loadTestimonios();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!session) {
    alert('Debes iniciar sesión para compartir un testimonio.');
    return;
  }

  if (!newTestimonio.trim()) {
    alert('Escribe algo antes de enviar.');
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const response = await fetch('/api/testimonios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: newTestimonio.trim(),
        visibility,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al enviar');
    }

    setNewTestimonio('');
    setVisibility('private');

    alert(
      visibility === 'public'
        ? 'Testimonio enviado para revisión. Aparecerá cuando sea aprobado.'
        : 'Testimonio guardado de forma privada (solo visible para usuarios registrados).'
    );

    // Recargar la lista
    loadTestimonios();
  } catch (err: any) {
    console.error('Error al enviar:', err);
    setError(err.message || 'Error al enviar. Inténtalo de nuevo.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative min-h-screen">
      <Image
        src="/images/montana.png"
        alt="Hombres en montaña"
        fill
        className="object-cover brightness-[0.75] contrast-[1.15] saturate-[1.1] object-center"
        quality={85}
        sizes="(max-width: 768px) 100vw, 1920px"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/30 to-stone-950/65" />

      <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-7xl mx-auto text-stone-100">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 md:mb-12 text-center drop-shadow-2xl">
          Entre nosotros
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-center mb-10 md:mb-16 max-w-4xl mx-auto leading-relaxed">
          Este es un espacio seguro donde compartir experiencias.  
          Tus palabras pueden ayudar a otros hombres que están pasando por lo mismo.
        </p>

        {/* Formulario solo si está logueado */}
        {session && !isGuest ? (
          <div className="mb-12 md:mb-16 bg-stone-900/60 backdrop-blur-md border border-stone-700/50 p-6 md:p-8 rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-amber-300">
              Comparte tu experiencia
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <textarea
                value={newTestimonio}
                onChange={(e) => setNewTestimonio(e.target.value)}
                placeholder="Escribe aquí lo que quieras compartir... (anónimo)"
                className="w-full h-32 sm:h-40 p-4 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-600 resize-none text-base sm:text-lg"
                required
              />

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <label className="text-lg sm:text-xl font-medium">¿Quién puede verlo?</label>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={visibility === 'private'}
                      onChange={() => setVisibility('private')}
                      className="w-5 h-5 accent-amber-500"
                    />
                    <span className="text-base sm:text-lg">Solo usuarios registrados</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={visibility === 'public'}
                      onChange={() => setVisibility('public')}
                      className="w-5 h-5 accent-amber-500"
                    />
                    <span className="text-base sm:text-lg">Público (tras revisión)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-700 hover:bg-amber-600 text-white py-4 rounded-xl font-semibold disabled:opacity-50 transition text-lg sm:text-xl"
              >
                {loading ? 'Enviando...' : 'Compartir testimonio'}
              </button>

              {error && <p className="text-red-400 text-center mt-4">{error}</p>}
            </form>
          </div>
        ) : (
          <div className="text-center mb-12 md:mb-16 bg-stone-900/60 backdrop-blur-md border border-stone-700/50 p-6 md:p-8 rounded-2xl">
            <p className="text-xl md:text-2xl mb-6">
              {isGuest
                ? 'En modo invitado solo puedes leer los testimonios públicos aprobados.'
                : 'Inicia sesión para compartir tu experiencia y ayudar a otros hombres.'}
            </p>
            {!isGuest && (
              <button
                onClick={() => { /* Aquí puedes abrir el modal de login si lo tienes */ }}
                className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold"
              >
                Iniciar sesión
              </button>
            )}
          </div>
        )}

        {/* Lista de testimonios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {testimonios.length === 0 ? (
            <p className="col-span-full text-center text-xl md:text-2xl text-stone-400 py-12">
              Aún no hay testimonios públicos aprobados o visibles para ti.
            </p>
          ) : (
            testimonios.map((t) => (
              <div
                key={t.id}
                className="bg-amber-950/50 backdrop-blur-lg border border-amber-900/40 p-5 sm:p-6 md:p-8 rounded-2xl text-stone-100 leading-relaxed shadow-2xl"
              >
                <p className="text-sm sm:text-base md:text-lg mb-4">{t.content}</p>
                <p className="text-xs text-stone-500 mt-4">
                  {new Date(t.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {t.visibility === 'private' && ' • (Privado)'}
                  {!t.approved && ' • (En revisión)'}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}