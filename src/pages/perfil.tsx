// src/pages/perfil.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function Perfil() {
  const { session, isGuest, isLoading } = useAuth();
  const [profile, setProfile] = useState({
    username: '',
    birth_date: '',
    estado: '',
    region: '',
    profession: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session) {
      const fetchProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (data) setProfile(data);
      };
      fetchProfile();
    }
  }, [session]);

  const handleSave = async () => {
    if (!session) return alert('Debes estar logueado para guardar.');
    setSaving(true);
    const { error } = await supabase.from('profiles').upsert({
      id: session.user.id,
      ...profile,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    if (error) alert('Error: ' + error.message);
    else alert('Perfil guardado!');
  };

  if (isLoading) return <div>Cargando...</div>;
  if (isGuest) return <div>Modo invitado: No puedes editar perfil. Inicia sesión.</div>;
  if (!session) return <div>Debes iniciar sesión para ver/editar perfil.</div>;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <Image
        src="/images/mano.png"
        alt="Mano con ratón"
        fill
        className="object-cover brightness-[0.75] contrast-[1.15] saturate-[1.1]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/30 to-stone-950/65" />

      <div className="relative z-10 bg-stone-900/70 backdrop-blur-xl border border-stone-700/50 p-10 rounded-3xl w-full max-w-lg shadow-2xl space-y-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-amber-900 rounded-full mx-auto mb-4" /> {/* Avatar placeholder */}
          <h2 className="text-3xl font-bold">Editar Perfil</h2>
        </div>

        <input
          placeholder="Nombre de usuario"
          value={profile.username}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          className="w-full p-4 rounded-full bg-stone-800 border border-stone-700 text-white"
        />
        <input
          type="date"
          value={profile.birth_date}
          onChange={(e) => setProfile({ ...profile, birth_date: e.target.value })}
          className="w-full p-4 rounded-full bg-stone-800 border border-stone-700 text-white"
        />
        <input
          placeholder="Estado"
          value={profile.estado}
          onChange={(e) => setProfile({ ...profile, estado: e.target.value })}
          className="w-full p-4 rounded-full bg-stone-800 border border-stone-700 text-white"
        />
        <input
          placeholder="Ciudad / Región (opcional)"
          value={profile.region}
          onChange={(e) => setProfile({ ...profile, region: e.target.value })}
          className="w-full p-4 rounded-full bg-stone-800 border border-stone-700 text-white"
        />
        <input
          placeholder="Profesión (opcional)"
          value={profile.profession}
          onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
          className="w-full p-4 rounded-full bg-stone-800 border border-stone-700 text-white"
        />

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-amber-700 hover:bg-amber-600 text-white py-4 rounded-full font-semibold disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>

        <p className="text-sm text-stone-400 text-center">
          *Tu información es confidencial...
        </p>
      </div>
    </div>
  );
}