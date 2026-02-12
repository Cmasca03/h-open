import Image from 'next/image';
import ChatBubble from '@/components/ChatBubble';

const exampleMessages = [
  { content: "Hola, no sé por dónde empezar. Mi pareja me pega y me insulta...", sender: "user" as const },
  { content: "Hola, Carlos. Gracias por compartirlo...", sender: "mod" as const },
  { content: "Queremos ayudarte a que tengas herramientas concretas...", sender: "mod" as const },
  // agrega el resto igual, siempre con "as const"
] as const;

export default function Contacto() {
 return (
    <div className="relative min-h-screen flex flex-col">
      <Image
        src="/images/pie.png"
        alt="Pie en hierba"
        fill
        className="object-cover brightness-[0.75] contrast-[1.15] saturate-[1.1]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/30 to-stone-950/65" />
      <div className="relative z-10 flex-1 p-8 space-y-4">
        {exampleMessages.map((msg, i) => <ChatBubble key={i} text={msg.content} sender={msg.sender} />)}
      </div>
    </div>
  );
}