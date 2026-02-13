// src/pages/informacion.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Informacion() {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/images/bombilla.png"
        alt="Bombilla idea"
        fill
        className="object-cover brightness-[0.75] contrast-[1.15] saturate-[1.1] object-center"
        quality={85}
        sizes="(max-width: 768px) 100vw, 1920px"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/30 to-stone-950/65" />

      <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-6xl mx-auto text-stone-100">
        {/* Título principal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 md:mb-12 text-center drop-shadow-2xl">
          Información y Recursos
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-center mb-12 md:mb-16 max-w-4xl mx-auto leading-relaxed">
          Esta es una guía básica para hombres que están viviendo o han vivido situaciones de violencia doméstica o maltrato por parte de su pareja.  
          No estás solo. Hay recursos, apoyo y vías de salida.
        </p>

        {/* Sección 1: ¿Qué es la violencia doméstica contra hombres? */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-amber-300">
            ¿Qué se considera violencia doméstica?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="bg-stone-900/60 backdrop-blur-md border border-stone-700/50 p-6 md:p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-amber-200">Formas más comunes</h3>
              <ul className="space-y-3 text-base md:text-lg">
                <li>Insultos, humillaciones y menosprecio constante</li>
                <li>Control del dinero, teléfono o redes sociales</li>
                <li>Amenazas o chantajes emocionales</li>
                <li>Aislamiento de amigos y familia</li>
                <li>Agresiones físicas (golpes, empujones...)</li>
                <li>Violencia sexual o coerción</li>
              </ul>
            </div>

            <div className="bg-stone-900/60 backdrop-blur-md border border-stone-700/50 p-6 md:p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-4 text-amber-200">Mitos que dificultan pedir ayuda</h3>
              <ul className="space-y-3 text-base md:text-lg">
                <li>"Los hombres no pueden ser maltratados"</li>
                <li>"Si te pega, eres débil por no defenderte"</li>
                <li>"Si denuncias, te reirán en comisaría"</li>
                <li>"Es mejor aguantar por los hijos"</li>
                <li>"Ella solo se enfada porque la quiero mal"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sección 2: Líneas de ayuda y recursos (España 2025–2026) */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-amber-300">
            Dónde pedir ayuda (España)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-stone-900/60 backdrop-blur-md border border-stone-700/50 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-3 text-amber-200">Línea 016</h3>
              <p className="text-base md:text-lg mb-3">
                Atención 24h para violencia de género (también hombres). Confidencial y gratuita.
              </p>
              <p className="text-xl font-bold">016</p>
            </div>

            <div className="bg-stone-900/60 backdrop-blur-md border border-stone-700/50 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-3 text-amber-200">Teléfono de la Esperanza</h3>
              <p className="text-base md:text-lg mb-3">
                Apoyo emocional anónimo 24h.
              </p>
              <p className="text-xl font-bold">717 003 717</p>
            </div>

            <div className="bg-stone-900/60 backdrop-blur-md border border-stone-700/50 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-3 text-amber-200">Emergencias</h3>
              <p className="text-base md:text-lg mb-3">
                Si estás en peligro inmediato.
              </p>
              <p className="text-xl font-bold">112</p>
            </div>

            <div className="bg-stone-900/60 backdrop-blur-md border border-stone-700/50 p-6 rounded-2xl col-span-1 sm:col-span-2 lg:col-span-3">
              <h3 className="text-2xl font-semibold mb-4 text-amber-200">Asociaciones y recursos especializados</h3>
              <ul className="space-y-3 text-base md:text-lg">
                <li><strong>Hombres por la Igualdad</strong> – Grupos de apoyo y asesoramiento</li>
                <li><strong>Fundación ANAR</strong> – Atención a menores y familias (900 20 20 10)</li>
                <li><strong>Centros de Atención a Víctimas</strong> – Busca en tu comunidad autónoma</li>
                <li><strong>Páginas web útiles</strong>: observatorioviolencia.genero.gob.es, masculinitatsplurals.org</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sección 3: Pasos recomendados */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-amber-300 text-center">
            ¿Qué puedes hacer ahora mismo?
          </h2>

          <ol className="list-decimal list-inside space-y-4 md:space-y-6 text-base sm:text-lg md:text-xl max-w-4xl mx-auto">
            <li>Habla con alguien de confianza (amigo, familiar, compañero) aunque dé vergüenza.</li>
            <li>Llama al 016 o al 112 si estás en peligro inmediato.</li>
            <li>Guarda pruebas (mensajes, audios, fotos de lesiones, testigos).</li>
            <li>Busca asesoramiento legal gratuito (muchos ayuntamientos y asociaciones lo ofrecen).</li>
            <li>Considera terapia o grupos de apoyo para hombres (hay cada vez más).</li>
            <li>No te culpes: la violencia no es tu responsabilidad.</li>
          </ol>
        </div>

        {/* Llamada a la acción final */}
        <div className="text-center">
          <Link href="/conecta">
            <button className="bg-amber-700 hover:bg-amber-600 text-white px-10 sm:px-14 md:px-16 lg:px-20 py-5 sm:py-6 md:py-7 lg:py-8 rounded-full text-xl sm:text-2xl md:text-3xl font-semibold shadow-lg transition-all hover:scale-105">
              Conecta con alguien ahora
            </button>
          </Link>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-stone-400">
            No estás solo. Hay salida.
          </p>
        </div>
      </div>
    </div>
  );
}