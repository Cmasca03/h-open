'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import ChatBubble from '@/components/ChatBubble';

export default function Conecta() {
  const [messages, setMessages] = useState<{ id: string; content: string; sender: 'user' | 'mod' }[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
      setMessages(data?.map((msg) => ({ id: msg.id, content: msg.content, sender: msg.sender_id === 'user-id' ? 'user' : 'mod' })) || []);
    };
    fetchMessages();

    const channel = supabase.channel('chat');
    channel.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
      setMessages((prev) => [...prev, { id: payload.new.id, content: payload.new.content, sender: 'mod' }]);
    }).subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const sendMessage = async () => {
    if (!newMessage) return;
    await supabase.from('messages').insert({ content: newMessage, sender_id: 'user-id' }); // Reemplaza con real user id
    setNewMessage('');
  };

 return (
    <div className="relative min-h-screen flex flex-col">
      <Image
        src="/images/cafe.png"
        alt="Dos hombres conversando"
        fill
        className="object-cover brightness-[0.75] contrast-[1.15] saturate-[1.1]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/30 to-stone-950/65" />

      <div className="relative z-10 flex-1 p-8 pt-32 space-y-6 max-w-4xl mx-auto">
        {/* Aquí irán las burbujas de chat más adelante */}
        <div className="bg-amber-950/50 backdrop-blur-lg p-6 rounded-3xl text-stone-100">
          Ejemplo de mensaje del usuario...
        </div>
        <div className="bg-stone-800/60 backdrop-blur-lg p-6 rounded-3xl text-stone-100 ml-auto">
          Respuesta de apoyo...
        </div>
      </div>
    </div>
  );
}