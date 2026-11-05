'use client';
import { MapPin, Star, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SpaceZoomProps {
  nome: string;
  endereco: string;
  avaliacao: number;
  foto: string;
  whatsappUrl?: string;
  temTelefone: boolean;
}

export default function SpaceZoomHero({
  nome,
  endereco,
  avaliacao,
  foto,
  whatsappUrl,
  temTelefone,
}: SpaceZoomProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-[72vh] min-h-[500px] max-w-6xl mx-auto overflow-hidden rounded-3xl my-6 border border-neutral-800/80 shadow-2xl bg-neutral-950">
      
      {/* INJEÇÃO DIRETA DE CSS PARA GARANTIR A ANIMAÇÃO DO ZOOM NO NEXT.JS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes kb-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.12); }
        }
        .ken-burns-fx {
          animation: kb-zoom 12s ease-in-out infinite alternate;
        }
      `}} />

      {/* FOTO COM A ANIMAÇÃO KEN BURNS E AJUSTE DE ILUMINAÇÃO */}
      {foto && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={foto}
            alt={nome}
            loading="eager"
            className="w-full h-full object-cover brightness-[0.80] contrast-[1.08] ken-burns-fx"
          />
        </div>
      )}

      {/* GRADIENTE */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent z-10" />

      {/* TEXTO E CONTEÚDO */}
      <div 
        className="relative z-30 h-full flex items-end p-6 sm:p-10"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <div className="space-y-4 max-w-2xl">
          {avaliacao > 0 && (
            <div className="inline-flex items-center gap-2 bg-neutral-900/90 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-400 backdrop-blur-sm shadow-md">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{avaliacao.toFixed(1)} no Google Maps</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-none drop-shadow-lg">
            {nome}
          </h1>

          <p className="text-neutral-200 text-xs sm:text-sm flex items-center gap-2 drop-shadow">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" /> {endereco}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            {temTelefone && whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black px-7 py-3.5 rounded-full transition text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2 shadow-xl hover:scale-105"
              >
                <span>Agendar via WhatsApp</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}