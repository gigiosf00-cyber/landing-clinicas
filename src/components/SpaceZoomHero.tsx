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
  tagSubtitulo?: string;
}

export default function SpaceZoomHero({
  nome,
  endereco,
  avaliacao,
  foto,
  whatsappUrl,
  temTelefone,
  tagSubtitulo
}: SpaceZoomProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const corMarcaDinamica = 'var(--cor-marca, #c99e53)';
  const corTextoBotaoDinamica = 'var(--cor-texto-botao, #09090b)';

  return (
    <section className="relative h-[72vh] min-h-[500px] max-w-6xl mx-auto overflow-hidden rounded-3xl my-6 border border-current/10 shadow-2xl bg-neutral-950">
      
      {/* ANIMAÇÃO KEN BURNS DO SPACE ZOOM */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes kb-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.12); }
        }
        .ken-burns-fx {
          animation: kb-zoom 12s ease-in-out infinite alternate;
        }
      `}} />

      {/* FOTO DE IMPACTO COM EFEITO SPACE ZOOM */}
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

      {/* GRADIENTE DE SOMBREAMENTO */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

      {/* CONTEÚDO E ANIMAÇÃO DE ENTRADA */}
      <div 
        className="relative z-30 h-full flex items-end p-6 sm:p-10"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <div className="space-y-4 max-w-2xl">
          {tagSubtitulo && (
            <p 
              className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]"
              style={{ color: corMarcaDinamica }}
            >
              {tagSubtitulo}
            </p>
          )}

          {avaliacao > 0 && (
            <div 
              style={{ borderColor: corMarcaDinamica, color: corMarcaDinamica }}
              className="inline-flex items-center gap-2 bg-black/80 border px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm shadow-md"
            >
              <Star className="w-4 h-4 fill-current" />
              <span>{avaliacao.toFixed(1)} no Google Maps</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-none drop-shadow-lg">
            {nome}
          </h1>

          <p className="text-neutral-200 text-xs sm:text-sm flex items-center gap-2 drop-shadow">
            <MapPin className="w-4 h-4 shrink-0" style={{ color: corMarcaDinamica }} /> 
            <span>{endereco}</span>
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            {temTelefone && whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: corMarcaDinamica,
                  color: corTextoBotaoDinamica
                }}
                className="font-black px-7 py-3.5 rounded-full transition text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2 shadow-xl hover:scale-105 hover:brightness-110"
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