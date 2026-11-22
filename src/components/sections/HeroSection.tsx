'use client';
import React from 'react';
import { Star, Calendar, ChevronRight, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

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
  variacao?: 'minimalista' | 'urban' | 'vintage';
}

export default function HeroSection({
  nome,
  nomeCurto,
  tagSubtitulo,
  complementoSubtitulo = 'FISIOTERAPIA & SAÚDE INTEGRAL',
  tituloPrincipal,
  descricao,
  textoBotao,
  whatsappUrl,
  temTelefone = true,
  fotoHero,
  fitMode = 'contain',
  tema,
  variacao = 'minimalista'
}: HeroProps) {
  const corMarcaDinamica = 'var(--cor-marca, #059669)';
  const corDestaqueDinamica = 'var(--cor-destaque, #ea580c)';
  const corTextoBotaoDinamica = 'var(--cor-texto-botao, #ffffff)';

  const partesTag = (tagSubtitulo || '').split('•').map(item => item.trim());
  const ultItem = partesTag.length > 1 ? partesTag[partesTag.length - 1] : '';
  const temLocalizacao = ultItem.includes('-') || /^[a-záàâãéèêíóòôõúç\s]+-[a-z]{2}$/i.test(ultItem);

  const servicosTexto = temLocalizacao ? partesTag.slice(0, -1).join(' • ') : tagSubtitulo;
  const localizacaoTexto = temLocalizacao ? ultItem : '';

  // ---------------------------------------------------------
  // 1. MODELO VINTAGE / RETRO (BEGE + VERDE + LARANJA)
  // ---------------------------------------------------------
  if (variacao === 'vintage') {
    return (
      <div className="relative w-full bg-[#f5efe6] text-[#1c1917] overflow-hidden border-b border-[#e0d3c1] font-serif">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05] pointer-events-none" />
        
        <div className="w-full bg-[#064e3b] py-2 px-4 text-center">
          <p className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-emerald-100 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>PROPOSTA EXCLUSIVA // {nome ? nome.toUpperCase() : ''}</span>
          </p>
        </div>

        <header className="sticky top-0 z-40 bg-[#f5efe6]/95 backdrop-blur-md border-b border-[#e0d3c1]">
          <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center gap-4">
            <div>
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-[#1c1917]">{nome}</h1>
              <p className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-[#059669] mt-0.5">{servicosTexto}</p>
              {localizacaoTexto && (
                <p className="text-[10px] sm:text-xs font-sans font-black uppercase tracking-widest mt-1 text-[#ea580c] flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {localizacaoTexto}
                </p>
              )}
            </div>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-7 space-y-6">
            {complementoSubtitulo && (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#059669]/30 bg-[#059669]/10 text-[#059669] text-xs font-sans font-bold uppercase tracking-wider shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#059669] animate-pulse" />
                {complementoSubtitulo}
              </span>
            )}

            <h2 className="text-3xl sm:text-5xl font-normal leading-[1.2] tracking-tight text-[#1c1917]">{tituloPrincipal}</h2>

            <p className="text-sm sm:text-base leading-relaxed text-[#44382e] font-sans">
              Na <strong className="text-[#064e3b] font-bold">{nomeCurto}</strong>, {descricao}
            </p>

            {temTelefone && (
              <div className="pt-2 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: corDestaqueDinamica, color: corTextoBotaoDinamica }}
                  className="inline-flex items-center justify-center gap-3 font-sans font-black px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_4px_25px_rgba(234,88,12,0.35)] hover:scale-[1.02] hover:brightness-110"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{textoBotao}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-4 text-[11px] font-sans text-[#059669] font-semibold pt-1">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" /> Atendimento Imediato</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#059669]" /> Presencial & Domiciliar</span>
                </div>
              </div>
            )}
          </div>

          {fotoHero && (
            <div className="md:col-span-5 relative">
              <div className="rounded-2xl border border-[#e0d3c1] bg-[#ffffff] overflow-hidden shadow-xl p-2">
                <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-stone-50 rounded-xl">
                  <img src={fotoHero} alt={nome} className={`w-full h-full ${fitMode === 'contain' ? 'object-contain' : 'object-cover'} brightness-[0.98] contrast-[1.02]`} />
                  <div className="absolute bottom-4 right-4 bg-[#ffffff]/95 backdrop-blur-md border border-[#e0d3c1] px-3 py-1.5 rounded-lg text-[10px] font-sans font-bold text-[#064e3b] flex items-center gap-1.5 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>AVALIAÇÃO 5.0</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }

  // ---------------------------------------------------------
  // 2. MODELO MODERNO / URBAN (VERDE CYBER / TECH)
  // ---------------------------------------------------------
  if (variacao === 'urban') {
    return (
      <div className="relative w-full bg-[#02140e] text-white overflow-hidden border-b border-emerald-900/50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#052e22_1px,transparent_1px),linear-gradient(to_bottom,#052e22_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 pointer-events-none" />
        
        <div className="w-full bg-[#010b08] border-b border-emerald-900/80 py-2 px-4 text-center">
          <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-400 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>PROPOSTA EXCLUSIVA // {nome ? nome.toUpperCase() : ''}</span>
          </p>
        </div>

        <header className="sticky top-0 z-40 bg-[#02140e]/90 backdrop-blur-md border-b border-emerald-900/60">
          <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center gap-4">
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white">{nome}</h1>
              <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mt-0.5">{servicosTexto}</p>
              {localizacaoTexto && (
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest mt-1 text-orange-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {localizacaoTexto}
                </p>
              )}
            </div>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-7 space-y-6">
            {complementoSubtitulo && (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-emerald-500/40 bg-emerald-950/80 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {complementoSubtitulo}
              </span>
            )}

            <h2 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight text-white">{tituloPrincipal}</h2>

            <p className="text-sm sm:text-base leading-relaxed text-emerald-100/80">
              Na <strong className="text-white font-bold">{nomeCurto}</strong>, {descricao}
            </p>

            {temTelefone && (
              <div className="pt-2 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: corDestaqueDinamica, color: corTextoBotaoDinamica }}
                  className="inline-flex items-center justify-center gap-3 font-black px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(234,88,12,0.4)] hover:shadow-[0_0_35px_rgba(234,88,12,0.6)] hover:scale-[1.02]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{textoBotao}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-4 text-[11px] font-mono text-emerald-300/80 pt-1">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Atendimento Imediato</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Presencial & Domiciliar</span>
                </div>
              </div>
            )}
          </div>

          {fotoHero && (
            <div className="md:col-span-5 relative">
              <div className="rounded-2xl border-2 border-emerald-500/50 bg-[#041a13] overflow-hidden shadow-[0_0_35px_rgba(2,20,14,0.9)] p-2">
                <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-black/50 rounded-xl">
                  <img src={fotoHero} alt={nome} className={`w-full h-full ${fitMode === 'contain' ? 'object-contain' : 'object-cover'} brightness-[0.95] contrast-[1.05]`} />
                  <div className="absolute bottom-4 right-4 bg-[#010b08]/90 backdrop-blur-md border border-emerald-500/50 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-emerald-300 flex items-center gap-1.5 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>AVALIAÇÃO 5.0</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }

  // ---------------------------------------------------------
  // 3. MODELO MINIMALISTA PREMIUM (DARK ZINC / CLEAN ELEGANCE)
  // ---------------------------------------------------------
  return (
    <div className={`relative w-full ${tema?.fundo || 'bg-[#09090b]'} text-white overflow-hidden border-b border-zinc-800/80`}>
      <div className="w-full bg-[#000000] border-b border-zinc-800/80 py-2 px-4 text-center">
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>PROPOSTA EXCLUSIVA // <span className="text-white font-extrabold">{nome ? nome.toUpperCase() : ''}</span></span>
        </p>
      </div>

      <header className="sticky top-0 z-40 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center gap-4">
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white">{nome}</h1>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] mt-0.5 text-zinc-400">{servicosTexto}</p>
            {localizacaoTexto && (
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] mt-1 text-[#ea580c] flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {localizacaoTexto}
              </p>
            )}
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        <div className="md:col-span-7 space-y-6">
          {complementoSubtitulo && (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {complementoSubtitulo}
            </span>
          )}

          <h2 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight text-white">{tituloPrincipal}</h2>

          <p className="text-sm sm:text-base leading-relaxed text-zinc-300 opacity-90">
            Na <strong className="font-bold text-white">{nomeCurto}</strong>, {descricao}
          </p>

          {temTelefone && (
            <div className="pt-2 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: corDestaqueDinamica, color: corTextoBotaoDinamica }}
                className="inline-flex items-center justify-center gap-3 font-black px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-[1.02] hover:brightness-110"
              >
                <Calendar className="w-4 h-4" />
                <span>{textoBotao}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-4 text-[11px] font-sans text-zinc-400 font-semibold pt-1">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Atendimento Imediato</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Presencial & Domiciliar</span>
              </div>
            </div>
          )}
        </div>

        {fotoHero && (
          <div className="md:col-span-5 relative">
            <div className="rounded-2xl border border-zinc-800 bg-[#141414] overflow-hidden shadow-2xl p-2">
              <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-black/50 rounded-xl">
                <img src={fotoHero} alt={nome} className={`w-full h-full ${fitMode === 'contain' ? 'object-contain' : 'object-cover'} rounded-xl brightness-[0.95] contrast-[1.02]`} />
                <div className="absolute bottom-4 right-4 bg-zinc-900/90 backdrop-blur-md border border-zinc-700 px-3 py-1.5 rounded-lg text-[10px] font-bold text-zinc-200 flex items-center gap-1.5 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>AVALIAÇÃO 5.0</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}