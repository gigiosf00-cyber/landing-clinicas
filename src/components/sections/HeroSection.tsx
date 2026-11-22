'use client';
import React from 'react';

export interface TemaHero {
  fundo: string;
  card: string;
  borda: string;
  texto: string;
  sub: string;
  destaque: string;
}

export interface HeroProps {
  nome: string;
  nomeCurto: string;
  nichoFormatado?: string;
  tagSubtitulo: string;
  complementoSubtitulo?: string;
  tituloPrincipal: React.ReactNode;
  descricao: string;
  textoBotao: string;
  whatsappUrl: string;
  temTelefone?: boolean;
  fotoHero?: string;
  fitMode?: 'contain' | 'cover';
  tema: TemaHero;
}

export default function HeroSection({
  nome,
  nomeCurto,
  tagSubtitulo,
  complementoSubtitulo,
  tituloPrincipal,
  descricao,
  textoBotao,
  whatsappUrl,
  temTelefone = true,
  fotoHero,
  fitMode = 'contain',
  tema
}: HeroProps) {
  const corMarcaDinamica = 'var(--cor-marca, #10b981)';
  const corDestaqueDinamica = 'var(--cor-destaque, #ea580c)';
  const corTextoBotaoDinamica = 'var(--cor-texto-botao, #ffffff)';

  return (
    <>
      {/* BANNER SUPERIOR SLIM */}
      <div className="w-full bg-[#09090b] border-b border-zinc-800/80 py-1.5 px-4 text-center">
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <span style={{ color: corMarcaDinamica }}>⚡ PROPOSTA EXCLUSIVA PARA:</span>{' '}
          <span className="text-white font-extrabold">{nome ? nome.toUpperCase() : ''}</span>
        </p>
      </div>

      {/* HEADER NAVEGAÇÃO FIXO (SEM O BOTÃO SUPERIOR) */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${tema?.fundo || 'bg-[#0a0b0e]'}/95 ${tema?.borda || 'border-zinc-800'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
          <div>
            <h1 className={`text-base sm:text-lg font-black tracking-tight ${tema?.texto || 'text-white'}`}>{nome}</h1>
            <p 
              className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] mt-0.5"
              style={{ color: corMarcaDinamica }}
            >
              {tagSubtitulo}
            </p>
          </div>
        </div>
      </header>

      {/* HERO SECTION COM SPACE ZOOM INTEGRADO */}
      <section className={`max-w-6xl mx-auto px-6 py-8 sm:py-10 grid grid-cols-1 ${fotoHero ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8 items-center`}>
        <div className={`space-y-4 ${!fotoHero ? 'max-w-4xl' : ''}`}>
          {complementoSubtitulo && (
            <div className="inline-block">
              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border uppercase tracking-wider shadow-sm ${tema?.card} ${tema?.sub} ${tema?.borda}`}>
                {complementoSubtitulo}
              </span>
            </div>
          )}

          <h2 className={`text-3xl sm:text-5xl font-black leading-tight tracking-tight ${tema?.texto || 'text-white'}`}>
            {tituloPrincipal}
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed opacity-90 ${!fotoHero ? 'max-w-3xl' : ''} ${tema?.texto || 'text-white'}`}>
            Na <strong className="font-bold">{nomeCurto}</strong>, {descricao}
          </p>

          {temTelefone && (
            <div className="pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: corDestaqueDinamica,
                  color: corTextoBotaoDinamica,
                }}
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 hover:brightness-110"
              >
                {textoBotao}
              </a>
            </div>
          )}
        </div>

        {/* FOTO HERO COM SPACE ZOOM */}
        {fotoHero && (
          <div className={`relative overflow-hidden rounded-3xl border shadow-2xl aspect-[4/3] sm:aspect-square p-2 flex items-center justify-center ${tema?.card || 'bg-[#131419]'} ${tema?.borda || 'border-zinc-800'}`}>
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes space-zoom-float {
                0% { transform: scale(1); }
                50% { transform: scale(1.06); }
                100% { transform: scale(1); }
              }
              .animate-space-zoom {
                animation: space-zoom-float 10s ease-in-out infinite;
                will-change: transform;
              }
            `}} />
            <div className="w-full h-full overflow-hidden rounded-2xl relative flex items-center justify-center bg-black/40">
              <img
                src={fotoHero}
                alt={nome}
                className={`w-full h-full ${fitMode === 'contain' ? 'object-contain' : 'object-cover'} animate-space-zoom brightness-[0.95] contrast-[1.02]`}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
}