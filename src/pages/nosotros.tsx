// src/pages/nosotros.tsx
import Image from 'next/image';

const testimonios = [
  { text: "Durante años aguanté insultos y humillaciones...", side: 'left' },
  { text: "Ella me golpeaba cuando discutíamos...", side: 'right' },
  { text: "Con el tiempo fui perdiendo amigos...", side: 'left' },
  { text: "Todavía estoy con ella. A veces me grita...", side: 'right' },
  { text: "No sé si lo que vivo se puede llamar maltrato...", side: 'left' },
  { text: "Sé que me hace daño, pero no puedo dejarla...", side: 'right' },
  { text: "Tenemos hijos y no quiero que sufran...", side: 'left' },
  { text: "Una vez intenté contárselo a un amigo y se rió...", side: 'right' },
];

export default function Nosotros() {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/images/montana.png"
        alt="Hombres en montaña"
        fill
        className="object-cover brightness-[0.75] contrast-[1.15] saturate-[1.1]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/30 to-stone-950/65" />

      <div className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {testimonios.map(({ text, side }, i) => (   // ← desestructuramos aquí
            <div
              key={i}
              className={`bg-amber-950/50 backdrop-blur-lg border border-amber-900/40 p-6 rounded-3xl text-stone-100 leading-relaxed shadow-2xl ${
                side === 'left' ? 'rounded-bl-none ml-auto' : 'rounded-br-none'
              }`}
            >
              {text}  
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}