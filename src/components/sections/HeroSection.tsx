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

  const corMarcaPadrao = eBarbearia ? '#e2c275' : '#059669';
  const corDestaquePadrao = eBarbearia ? '#c2592b' : '#0f766e';

  const corMarcaDinamica = `var(--cor-marca, ${corMarcaPadrao})`;
  const corDestaqueDinamica = `var(--cor-destaque, ${corDestaquePadrao})`;
  const corTextoBotaoDinamica = 'var(--cor-texto-botao, #ffffff)';

  const partesTag = (tagSubtitulo || '').split('•').map(item => item.trim());
  const servicosTexto = partesTag.length > 1 ? partesTag.slice(0, -1).join(' • ') : tagSubtitulo;
  let localizacaoTexto = partesTag.length > 1 ? partesTag[partesTag.length - 1] : '';

  if (localizacaoTexto && !localizacaoTexto.includes('-')) {
    localizacaoTexto = `${localizacaoTexto} - SP`;
  }

  const tagComplementoFinal =
    complementoSubtitulo ||
    (eBarbearia ? 'STREET CUTS • FADE & BARBA NA NAVALHA' : 'ESPECIALISTA EM ELIMINAR A DOR E DEVOLVER SEU BEM-ESTAR');

  const seloSecundario = eBarbearia ? 'Hora Marcada' : 'Presencial & Domiciliar';
  const filtroImagemEscura = fitMode === 'contain' ? 'brightness-[0.96] contrast-[1.01]' : 'brightness-[0.98] contrast-[1.02]';

  const styleAnimacoesHero = (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes spinGlow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes heroFotoMovimentoCover {
        0% { transform: scale(1) translate3d(0, 0, 0); }
        50% { transform: scale(1.1) translate3d(-1.5%, -1%, 0); }
        100% { transform: scale(1.05) translate3d(1.5%, 1%, 0); }
      }
      @keyframes heroFotoMovimentoContain {
        0% { transform: scale(1); }
        50% { transform: scale(1.03); }
        100% { transform: scale(1); }
      }
      .glow-border-fx {
        position: relative;
        overflow: hidden;
      }
      .glow-border-fx::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: conic-gradient(from 0deg, transparent 0%, ${eBarbearia ? '#e2c275' : '#10b981'} 30%, transparent 60%, ${eBarbearia ? '#c2592b' : '#ea580c'} 80%, transparent 100%);
        animation: spinGlow 6s linear infinite;
        z-index: 0;
      }
      .hero-img-cover-fx {
        animation: heroFotoMovimentoCover 14s ease-in-out infinite alternate;
        will-change: transform;
      }
      .hero-img-contain-fx {
        animation: heroFotoMovimentoContain 10s ease-in-out infinite alternate;
        will-change: transform;
      }
    `}} />
  );

  const classeMovimentoFoto = fitMode === 'contain' ? 'hero-img-contain-fx' : 'hero-img-cover-fx';

  // ---------------------------------------------------------
  // 1. MODELO VINTAGE / RETRO
  // ---------------------------------------------------------
  if (variacao === 'vintage') {
    const bordaVintage = eBarbearia ? 'border-zinc-300' : 'border-[#e0d3c1]';
    const fundoVintage = eBarbearia ? 'bg-[#f6f1e7]' : 'bg-[#f5efe6]';
    const barraTopoVintage = eBarbearia ? '#18181b' : '#064e3b';

    return (
      <div className={`relative w-full ${fundoVintage} text-[#18181b] overflow-hidden border-b ${bordaVintage} font-serif`}>
        {styleAnimacoesHero}

        <div
          className="w-full py-1.5 px-4 text-center border-b border-zinc-700 relative z-10"
          style={{ backgroundColor: barraTopoVintage }}
        >
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-200 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>✦ PROPOSTA CLÁSSICA PARA: {nome ? nome.toUpperCase() : ''} ✦</span>
          </p>
        </div>

        <header className={`sticky top-0 z-40 ${fundoVintage}/95 backdrop-blur-md border-b border-zinc-300`}>
          <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-[#18181b]">
                {nomeCurto || nome}
              </h1>
              <p className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider mt-0.5 text-zinc-700">
                {servicosTexto}
              </p>
              {localizacaoTexto && (
                <p className="text-[10px] sm:text-xs font-sans font-extrabold uppercase tracking-wider mt-0.5 flex items-center gap-1" style={{ color: corDestaqueDinamica }}>
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{localizacaoTexto}</span>
                </p>
              )}
            </div>

            {temTelefone && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: corDestaqueDinamica, color: '#ffffff' }}
                className="inline-flex items-center justify-center font-sans font-bold px-4 py-2 rounded-md text-[11px] uppercase tracking-wider border border-zinc-800/30 shadow-sm transition-all hover:brightness-110"
              >
                AGENDAR ATENDIMENTO
              </a>
            )}
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 pt-5 pb-6 relative z-10">
          <div className={modoLayout === 'side' ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-center' : 'space-y-4'}>
            <div className={modoLayout === 'side' ? 'lg:col-span-6 space-y-3' : 'space-y-2'}>
              <span className="inline-block text-[10px] font-sans font-extrabold tracking-widest text-zinc-500 uppercase">
                {tagComplementoFinal}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-[#18181b]">
                {tituloPrincipal}
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-700 font-sans max-w-3xl">
                Na <strong className="font-bold text-[#18181b]">{nomeCurto}</strong>, {descricao}
              </p>
              {modoLayout === 'side' && temTelefone && (
                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ backgroundColor: corDestaqueDinamica, color: '#ffffff' }}
                    className="inline-flex items-center justify-center gap-2 font-sans font-extrabold px-5 py-3 rounded-lg text-xs uppercase tracking-wider shadow-md transition-all hover:scale-[1.02] hover:brightness-110"
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
                <div className="w-full rounded-2xl glow-border-fx p-[3px] shadow-2xl">
                  <div className="relative z-10 w-full rounded-[14px] bg-[#042117] p-1.5">
                    <div className={`relative w-full ${modoLayout === 'side' ? 'h-[280px] sm:h-[340px]' : 'h-[310px] sm:h-[380px]'} overflow-hidden rounded-xl bg-white`}>
                      <img
                        src={fotoHero}
                        alt={nome}
                        className={
                          fitMode === 'contain'
                            ? `w-full h-full object-contain rounded-xl p-1 ${classeMovimentoFoto}`
                            : `w-full h-full object-cover ${posicaoFoto} rounded-xl ${classeMovimentoFoto}`
                        }
                      />
                    </div>
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
  // 2. MODELO MODERNO / URBAN
  // ---------------------------------------------------------
  if (variacao === 'urban') {
    const fundoUrban = eBarbearia ? 'bg-[#0b0c0e]' : 'bg-[#02140e]';
    const bannerUrban = eBarbearia ? 'bg-[#060708] border-zinc-800/90' : 'bg-[#010b08] border-emerald-900/80';
    const headerUrban = eBarbearia ? 'bg-[#0b0c0e]/95 border-zinc-800/80' : 'bg-[#02140e]/90 border-emerald-900/60';

    return (
      <div className={`relative w-full ${fundoUrban} text-white overflow-hidden`}>
        {styleAnimacoesHero}

        <div className={`w-full ${bannerUrban} border-b py-1 px-4 text-center relative z-10`}>
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] flex items-center justify-center gap-2" style={{ color: corMarcaDinamica }}>
            <span className="h-1.5 w-1.5 rounded-full animate-ping" style={{ backgroundColor: corDestaqueDinamica }} />
            <span>URBAN EDITION // {nome ? nome.toUpperCase() : ''}</span>
          </p>
        </div>

        <header className={`sticky top-0 z-40 ${headerUrban} backdrop-blur-md border-b`}>
          <div className="max-w-6xl mx-auto px-6 py-2.5 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-tight text-white">{nome}</h1>
              <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mt-0.5" style={{ color: corMarcaDinamica }}>
                {servicosTexto}
              </p>
              {localizacaoTexto && (
                <p className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest mt-0.5 flex items-center gap-1" style={{ color: corDestaqueDinamica }}>
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{localizacaoTexto}</span>
                </p>
              )}
            </div>

            {temTelefone && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: corDestaqueDinamica, color: corTextoBotaoDinamica }}
                className="inline-flex items-center justify-center font-mono font-bold px-4 py-2 rounded-lg text-[11px] uppercase tracking-wider shadow-md transition-all hover:brightness-110"
              >
                AGENDAR ATENDIMENTO
              </a>
            )}
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 pt-4 pb-5 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-2.5">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm"
                style={{
                  borderColor: `${corMarcaPadrao}55`,
                  backgroundColor: '#14171b',
                  color: corMarcaDinamica
                }}
              >
                <span className="h-1.5 w-1.5 rounded-sm rotate-45" style={{ backgroundColor: corDestaqueDinamica }} />
                {tagComplementoFinal}
              </span>

              <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight text-white">
                {tituloPrincipal}
              </h2>

              <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 max-w-3xl">
                Na <strong className="text-white font-bold">{nomeCurto}</strong>, {descricao}
              </p>

              {temTelefone && (
                <div className="pt-1 space-y-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ backgroundColor: corDestaqueDinamica, color: corTextoBotaoDinamica }}
                    className="inline-flex items-center justify-center gap-2.5 font-mono font-black px-6 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-[1.01] hover:brightness-110"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{textoBotao}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: corMarcaDinamica }} /> Atendimento Imediato
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" style={{ color: corMarcaDinamica }} /> {seloSecundario}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {fotoHero && (
              <div className="lg:col-span-6 w-full">
                <div className="w-full rounded-2xl glow-border-fx p-[3px] shadow-2xl">
                  <div className="relative z-10 w-full rounded-[14px] bg-[#042117] p-1.5">
                    <div className="relative w-full h-[270px] sm:h-[330px] overflow-hidden rounded-xl bg-white border border-emerald-950/50">
                      <img
                        src={fotoHero}
                        alt={nome}
                        className={
                          fitMode === 'contain'
                            ? `w-full h-full object-contain rounded-xl p-1 ${filtroImagemEscura} ${classeMovimentoFoto}`
                            : `w-full h-full object-cover ${posicaoFoto} rounded-xl ${classeMovimentoFoto}`
                        }
                      />
                    </div>
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
  // 3. MODELO MINIMALISTA (CLEAN, CLARO E COM RESPIRO)
  // ---------------------------------------------------------
  return (
    <div className="relative w-full bg-[#fafaf9] text-stone-900 border-b border-stone-200">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-base sm:text-lg font-semibold tracking-tight text-stone-900">{nomeCurto || nome}</h1>
            <p className="text-[11px] font-medium text-stone-500 mt-0.5">{servicosTexto}</p>
            {localizacaoTexto && (
              <p className="text-[11px] font-medium text-stone-600 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: corDestaqueDinamica }} />
                <span>{localizacaoTexto}</span>
              </p>
            )}
          </div>

          {temTelefone && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              style={{ backgroundColor: corDestaqueDinamica, color: corTextoBotaoDinamica }}
              className="inline-flex items-center justify-center font-medium px-4 py-2 rounded-lg text-xs transition hover:opacity-90"
            >
              Agendar Atendimento
            </a>
          )}
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-stone-500">
              {tagComplementoFinal}
            </span>

            <h2 className="text-2xl sm:text-4xl font-semibold leading-snug tracking-tight text-stone-900">
              {tituloPrincipal}
            </h2>

            <p className="text-sm leading-relaxed text-stone-600">
              Na <strong className="font-semibold text-stone-900">{nomeCurto}</strong>, {descricao}
            </p>

            {temTelefone && (
              <div className="pt-2 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: corDestaqueDinamica, color: corTextoBotaoDinamica }}
                  className="inline-flex items-center justify-center gap-2 font-medium px-6 py-3 rounded-lg text-sm transition hover:opacity-90"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{textoBotao}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: corMarcaDinamica }} /> Atendimento Imediato
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" style={{ color: corMarcaDinamica }} /> {seloSecundario}
                  </span>
                </div>
              </div>
            )}
          </div>

          {fotoHero && (
            <div className="lg:col-span-6 w-full">
              <div className="w-full rounded-xl border border-stone-200 bg-white p-3">
                <div className="relative w-full h-[260px] sm:h-[320px] overflow-hidden rounded-lg bg-stone-50 flex items-center justify-center">
                  <img
                    src={fotoHero}
                    alt={nome}
                    className={
                      fitMode === 'contain'
                        ? `w-full h-full object-contain p-2 ${filtroImagemEscura}`
                        : `w-full h-full object-cover ${posicaoFoto}`
                    }
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