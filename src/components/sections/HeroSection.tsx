'use client';
import React from 'react';
import { Calendar, ChevronRight, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export interface TemaHero {
  fundo: string;
  card: string;
  borda: string;
  texto: string;
  sub: string;
  destaque: string;
  serif?: boolean;
}

export interface HeroProps {
  nome: string;
  nomeCurto: string;
  nichoFormatado?: string;
  tagSubtitulo: string;
  complementoSubtitulo?: string;
  enderecoExibido?: string;
  tituloPrincipal: React.ReactNode;
  descricao: string;
  textoBotao: string;
  whatsappUrl: string;
  temTelefone?: boolean;
  fotoHero?: string;
  fitMode?: 'contain' | 'cover';
  posicaoFoto?: string;
  layoutFoto?: 'side' | 'full' | 'auto';
  tema: TemaHero;
  variacao?: 'minimalista' | 'urban' | 'vintage';
}

export default function HeroSection({
  nome,
  nomeCurto,
  tagSubtitulo,
  complementoSubtitulo,
  enderecoExibido,
  tituloPrincipal,
  descricao,
  textoBotao,
  whatsappUrl,
  temTelefone = true,
  fotoHero,
  fitMode = 'cover',
  posicaoFoto = 'object-[50%_28%]',
  layoutFoto = 'auto',
  variacao = 'minimalista'
}: HeroProps) {
  const eBarbearia =
    (tagSubtitulo + ' ' + nome).toLowerCase().includes('barber') ||
    (tagSubtitulo + ' ' + nome).toLowerCase().includes('barbearia');

  const modoLayout =
    layoutFoto !== 'auto'
      ? layoutFoto
      : variacao === 'vintage'
      ? (eBarbearia ? 'full' : 'side')
      : 'side';

  // Cores dinâmicas foscas (menos saturação e brilho)
  const corMarcaPadrao = eBarbearia ? '#c5a059' : '#059669';
  const corDestaquePadrao = eBarbearia ? '#b45309' : '#c2410c'; // Laranja Terracota fosco

  const corMarcaDinamica = `var(--cor-marca, ${corMarcaPadrao})`;
  const corDestaqueDinamica = `var(--cor-destaque, ${corDestaquePadrao})`;
  const corTextoBotaoDinamica = 'var(--cor-texto-botao, #ffffff)';

  const partesTag = (tagSubtitulo || '').split('•').map(item => item.trim());
  const ultItem = partesTag.length > 1 ? partesTag[partesTag.length - 1] : '';
  const temLocalizacao = ultItem.includes('-') || /^[a-záàâãéèêíóòôõúç\s]+-[a-z]{2}$/i.test(ultItem);

  const servicosTexto = temLocalizacao ? partesTag.slice(0, -1).join(' • ') : tagSubtitulo;
  const localizacaoTexto = temLocalizacao ? ultItem : '';

  const tagComplementoFinal =
    complementoSubtitulo ||
    (eBarbearia ? 'STREET CUTS • FADE & BARBA NA NAVALHA' : 'ATENDIMENTO ESPECIALIZADO');

  const seloSecundario = eBarbearia ? 'Hora Marcada' : 'Presencial & Domiciliar';

  // ---------------------------------------------------------
  // 1. MODELO VINTAGE / RETRO (SUAVE & CLARO)
  // ---------------------------------------------------------
  if (variacao === 'vintage') {
    const bordaVintage = 'border-[#e2d8c7]';
    const fundoVintage = 'bg-[#f4efe6]';
    const barraTopoVintage = eBarbearia ? '#27272a' : '#064e3b';

    return (
      <div className={`relative w-full ${fundoVintage} text-[#27272a] overflow-hidden border-b ${bordaVintage} font-serif`}>
        <div
          className="w-full py-1.5 px-4 text-center border-b border-zinc-700/40"
          style={{ backgroundColor: barraTopoVintage }}
        >
          <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-zinc-300 flex items-center justify-center gap-2">
            <span>PROPOSTA CLÁSSICA PARA: {nome ? nome.toUpperCase() : ''}</span>
          </p>
        </div>

        <header className={`sticky top-0 z-40 ${fundoVintage}/95 backdrop-blur-md border-b border-zinc-300/60`}>
          <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-[#18181b]">
                {nomeCurto || nome}
              </h1>
              <p className="text-[10px] sm:text-xs font-sans font-medium uppercase tracking-wider mt-0.5 text-zinc-600">
                {servicosTexto}
                {localizacaoTexto ? ` • ${localizacaoTexto}` : ''}
              </p>
            </div>

            {temTelefone && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: corDestaqueDinamica, color: '#ffffff' }}
                className="inline-flex items-center justify-center font-sans font-semibold px-4 py-2 rounded-md text-[11px] uppercase tracking-wider shadow-sm transition-all hover:opacity-90"
              >
                AGENDAR ATENDIMENTO
              </a>
            )}
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 pt-5 pb-6 relative z-10">
          <div className={modoLayout === 'side' ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-center' : 'space-y-4'}>
            <div className={modoLayout === 'side' ? 'lg:col-span-6 space-y-3' : 'space-y-2'}>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-[#18181b]">
                {tituloPrincipal}
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 font-sans max-w-3xl">
                Na <strong className="font-semibold text-[#18181b]">{nomeCurto}</strong>, {descricao}
              </p>
              {modoLayout === 'side' && temTelefone && (
                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ backgroundColor: corDestaqueDinamica, color: '#ffffff' }}
                    className="inline-flex items-center justify-center gap-2 font-sans font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider shadow-sm transition-all hover:opacity-90"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{textoBotao}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {fotoHero && (
              <div className={modoLayout === 'side' ? 'lg:col-span-6 w-full' : 'w-full pt-1'}>
                <div className="w-full rounded-2xl border border-zinc-300 bg-[#e6dfd3] p-1.5 shadow-sm">
                  <div className={`relative w-full ${modoLayout === 'side' ? 'h-[260px] sm:h-[320px]' : 'h-[300px] sm:h-[370px]'} overflow-hidden rounded-xl border border-zinc-300/80 bg-white`}>
                    <img
                      src={fotoHero}
                      alt={nome}
                      className={fitMode === 'contain' ? 'w-full h-full object-contain rounded-xl p-1' : `w-full h-full object-cover ${posicaoFoto} rounded-xl`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // ---------------------------------------------------------
  // 2. MODELO URBAN (ESMERALDA FOSCO / LOW-CONTRAST)
  // ---------------------------------------------------------
  if (variacao === 'urban') {
    const fundoUrban = 'bg-[#081814]';
    const bannerUrban = 'bg-[#040e0b] border-emerald-950/60';
    const headerUrban = 'bg-[#081814]/90 border-emerald-900/40';

    return (
      <div className={`relative w-full ${fundoUrban} text-zinc-200 overflow-hidden`}>
        <div className={`w-full ${bannerUrban} border-b py-1 px-4 text-center relative z-10`}>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 flex items-center justify-center gap-2">
            <span>URBAN EDITION // {nome ? nome.toUpperCase() : ''}</span>
          </p>
        </div>

        <header className={`sticky top-0 z-40 ${headerUrban} backdrop-blur-md border-b`}>
          <div className="max-w-6xl mx-auto px-6 py-2.5 flex justify-between items-center gap-4">
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-zinc-100">{nome}</h1>
              <p className="text-[10px] sm:text-xs font-mono font-medium uppercase tracking-wider mt-0.5 text-emerald-400/90">
                {servicosTexto}
              </p>
            </div>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 pt-4 pb-5 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-2.5">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-emerald-800/40 font-mono text-[11px] font-medium uppercase tracking-wider bg-[#0d221c] text-emerald-300"
              >
                {tagComplementoFinal}
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-zinc-100">
                {tituloPrincipal}
              </h2>

              <p className="text-xs sm:text-sm leading-relaxed text-zinc-300/90 max-w-3xl">
                Na <strong className="text-zinc-100 font-semibold">{nomeCurto}</strong>, {descricao}
              </p>

              {temTelefone && (
                <div className="pt-1 space-y-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ backgroundColor: corDestaqueDinamica, color: corTextoBotaoDinamica }}
                    className="inline-flex items-center justify-center gap-2 font-mono font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:opacity-90"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{textoBotao}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Atendimento Imediato
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> {seloSecundario}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {fotoHero && (
              <div className="lg:col-span-6 w-full">
                <div className="w-full rounded-2xl border border-emerald-900/40 bg-[#0d221c] p-1.5 shadow-md">
                  <div className="relative w-full h-[260px] sm:h-[310px] overflow-hidden rounded-xl bg-white">
                    <img
                      src={fotoHero}
                      alt={nome}
                      className={fitMode === 'contain' ? 'w-full h-full object-contain rounded-xl p-1' : `w-full h-full object-cover ${posicaoFoto} rounded-xl`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // ---------------------------------------------------------
  // 3. MODELO MINIMALISTA (GRAFITE FOSCO / LOW-CONTRAST)
  // ---------------------------------------------------------
  return (
    <div className="relative w-full bg-[#121215] text-zinc-200 overflow-hidden border-b border-zinc-800/60">
      <div className="w-full bg-[#0a0a0c] border-b border-zinc-800/60 py-1 px-4 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400 flex items-center justify-center gap-2">
          <span>PROPOSTA EXCLUSIVA // <span className="text-zinc-200 font-bold">{nome ? nome.toUpperCase() : ''}</span></span>
        </p>
      </div>

      <header className="sticky top-0 z-40 bg-[#121215]/95 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center gap-4">
          <div>
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-zinc-100">{nome}</h1>
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] mt-0.5 text-zinc-400">{servicosTexto}</p>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-4 pb-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-zinc-700/60 bg-zinc-800/60 text-zinc-300 text-[11px] font-medium uppercase tracking-wider">
              {tagComplementoFinal}
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-zinc-100">
              {tituloPrincipal}
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed text-zinc-300/85 max-w-3xl">
              Na <strong className="font-semibold text-zinc-100">{nomeCurto}</strong>, {descricao}
            </p>

            {temTelefone && (
              <div className="pt-1 space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: corDestaqueDinamica, color: corTextoBotaoDinamica }}
                  className="inline-flex items-center justify-center gap-2 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:opacity-90"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{textoBotao}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-3 text-[11px] font-sans text-zinc-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Atendimento Imediato
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> {seloSecundario}
                  </span>
                </div>
              </div>
            )}
          </div>

          {fotoHero && (
            <div className="lg:col-span-6 w-full">
              <div className="w-full rounded-2xl border border-zinc-700/60 bg-[#1c1c21] p-1.5 shadow-md">
                <div className="relative w-full h-[260px] sm:h-[310px] overflow-hidden rounded-xl bg-white">
                  <img
                    src={fotoHero}
                    alt={nome}
                    className={fitMode === 'contain' ? 'w-full h-full object-contain rounded-xl p-1' : `w-full h-full object-cover ${posicaoFoto} rounded-xl`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}