// src/pages/informacion.tsx
import Image from 'next/image';

export default function Informacion() {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/images/bombilla.png"  // o .jpg si es JPG
        alt="Bombilla idea"
        fill
        className="object-cover brightness-[0.75] contrast-[1.15] saturate-[1.1]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/30 to-stone-950/65" />

      <div className="relative z-10 pt-32 px-6 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-12 drop-shadow-2xl">
          Información y Recursos
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Aquí encontrarás información sobre violencia doméstica, recursos legales, líneas de ayuda...
          {/* Agrega más contenido real cuando quieras */}
        </p>
      </div>
    </div>
  );
}