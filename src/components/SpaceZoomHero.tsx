'use client';
import { MapPin, Star, ChevronRight } from 'lucide-react';

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
  const corMarcaDinamica = 'var(--cor-marca, #c99e53)';
  const corTextoBotaoDinamica = 'var(--cor-texto-botao, #09090b)';

  return (
    <section className="relative h-[72vh] min-h-[500px] max-w-6xl mx-auto overflow-hidden rounded-3xl my-6 border border-current/10 shadow-2xl bg-neutral-950">
      
      {/* ANIMAÇÃO SUAVE DO SPACE ZOOM SEM CORTES EXAGERADOS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes kb-zoom-suave {
          0% {
            transform: scale(1) translate3d(0, 0, 0);
          }
          100% {
            transform: scale(1.06) translate3d(0, -1%, 0);
          }
        }
        .ken-burns-fx {
          animation: kb-zoom-suave 14s ease-in-out infinite alternate;
          transform-origin: center center;
          will-change: transform;
        }
      `}} />

      {/* FOTO DE IMPACTO COM EFEITO SPACE ZOOM */}
      {foto && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={foto}
            alt={nome}
            loading="eager"
            className="w-full h-full object-cover object-center brightness-[0.82] contrast-[1.06] ken-burns-fx"
          />
        </div>
      )}

      {/* GRADIENTE DE SOMBREAMENTO PARA PROTEGER A LEITURA DAS PALAVRAS */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25 z-10 pointer-events-none" />

      {/* CONTEÚDO SEMPRE VISÍVEL E LEGÍVEL */}
      <div className="relative z-30 h-full flex items-end p-6 sm:p-10">
        <div className="space-y-4 max-w-2xl">
          {tagSubtitulo && (
            <p 
              className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] drop-shadow"
              style={{ color: corMarcaDinamica }}
            >
              {tagSubtitulo}
            </p>
          )}

          {avaliacao > 0 && (
            <div 
              style={{ borderColor: corMarcaDinamica, color: corMarcaDinamica }}
              className="inline-flex items-center gap-2 bg-black/85 border px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm shadow-md"
            >
              <Star className="w-4 h-4 fill-current shrink-0" />
              <span>{avaliacao.toFixed(1)} no Google Maps</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-none drop-shadow-lg">
            {nome}
          </h1>

          <p className="text-neutral-100 text-xs sm:text-sm flex items-center gap-2 drop-shadow">
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
                className="font-black px-7 py-3.5 rounded-full transition text-xs sm:text-sm uppercase tracking-wide inline-flex items-center gap-2 shadow-xl hover:scale-105 hover:brightness-110"
              >
                <span>Agendar via WhatsApp</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}