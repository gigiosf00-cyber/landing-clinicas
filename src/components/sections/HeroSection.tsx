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
  serif?: boolean;
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
  posicaoFoto?: string;
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
  variacao = 'minimalista'
}: HeroProps) {
  const eBarbearia =
    (tagSubtitulo + ' ' + nome).toLowerCase().includes('barber') ||
    (tagSubtitulo + ' ' + nome).toLowerCase().includes('barbearia');

  const corMarcaPadrao = eBarbearia ? '#e2c275' : '#059669';
  const corDestaquePadrao = eBarbearia ? '#d97706' : '#ea580c';

  const corMarcaDinamica = `var(--cor-marca, ${corMarcaPadrao})`;
  const corDestaqueDinamica = `var(--cor-destaque, ${corDestaquePadrao})`;
  const corTextoBotaoDinamica = 'var(--cor-texto-botao, #09090b)';

  const partesTag = (tagSubtitulo || '').split('•').map(item => item.trim());
  const ultItem = partesTag.length > 1 ? partesTag[partesTag.length - 1] : '';
  const temLocalizacao = ultItem.includes('-') || /^[a-záàâãéèêíóòôõúç\s]+-[a-z]{2}$/i.test(ultItem);

  const servicosTexto = temLocalizacao ? partesTag.slice(0, -1).join(' • ') : tagSubtitulo;
  const localizacaoTexto = temLocalizacao ? ultItem : '';

  const tagComplementoFinal =
    complementoSubtitulo ||
    (eBarbearia ? 'STREET CUTS • FADE & BARBA NA NAVALHA' : 'FISIOTERAPIA & SAÚDE INTEGRAL');

  const seloSecundario = eBarbearia ? 'Hora Marcada' : 'Presencial & Domiciliar';

  const classeImagem =
    fitMode === 'contain'
      ? 'w-full h-full object-contain rounded-xl brightness-[0.98] contrast-[1.03]'
      : `w-full h-full object-cover ${posicaoFoto} rounded-xl brightness-[0.98] contrast-[1.03]`;

  // ---------------------------------------------------------
  // 1. MODELO VINTAGE / RETRO
  // ---------------------------------------------------------
  if (variacao === 'vintage') {
    const bordaVintage = eBarbearia ? 'border-[#dfd2b8]' : 'border-[#e0d3c1]';
    const fundoVintage = eBarbearia ? 'bg-[#f6f1e7]' : 'bg-[#f5efe6]';

    return (
      <div className={`relative w-full ${fundoVintage} text-[#1c1917] overflow-hidden border-b ${bordaVintage} font-serif`}>
        <div
          className="w-full py-1 px-4 text-center"
          style={{ backgroundColor: eBarbearia ? '#292218' : '#064e3b' }}
        >
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-amber-100 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full animate-ping" style={{ backgroundColor: corMarcaDinamica }} />
            <span>PROPOSTA EXCLUSIVA // {nome ? nome.toUpperCase() : ''}</span>
          </p>
        </div>

        <header className={`sticky top-0 z-40 ${fundoVintage}/95 backdrop-blur-md border-b ${bordaVintage}`}>
          <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center gap-4">
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-[#1c1917]">{nome}</h1>
              <p className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider mt-0.5" style={{ color: corMarcaDinamica }}>
                {servicosTexto}
              </p>
              {localizacaoTexto && (
                <p className="text-[10px] sm:text-xs font-sans font-black uppercase tracking-widest mt-0.5 flex items-center gap-1" style={{ color: corDestaqueDinamica }}>
                  <MapPin className="w-3 h-3" /> {localizacaoTexto}
                </p>
              )}
            </div>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 pt-4 pb-5 space-y-4 relative z-10">
          <div className="space-y-2.5 text-[#1c1917]">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-sans font-bold uppercase tracking-wider shadow-sm"
              style={{
                borderColor: `${corMarcaPadrao}66`,
                backgroundColor: `${corMarcaPadrao}22`,
                color: eBarbearia ? '#78350f' : '#064e3b'
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: corMarcaDinamica }} />
              {tagComplementoFinal}
            </span>

            <h2 className="text-2xl sm:text-3xl font-normal leading-tight tracking-tight text-[#1c1917]">
              {tituloPrincipal}
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed text-[#3f3328] font-sans max-w-3xl">
              Na <strong className="font-bold text-[#1c1917]">{nomeCurto}</strong>, {descricao}
            </p>

            {temTelefone && (
              <div className="pt-1 space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: corDestaqueDinamica, color: corTextoBotaoDinamica }}
                  className="inline-flex items-center justify-center gap-2.5 font-sans font-black px-6 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.01] hover:brightness-110"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{textoBotao}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-3 text-[11px] font-sans font-semibold text-[#3f3328]">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: corDestaqueDinamica }} /> Atendimento Imediato
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" style={{ color: corDestaqueDinamica }} /> {seloSecundario}
                  </span>
                </div>
              </div>
            )}
          </div>

          {fotoHero && (
            <div className="w-full pt-1">
              <div className={`w-full rounded-2xl border ${bordaVintage} bg-[#ffffff] overflow-hidden shadow-lg p-1.5`}>
                <div className="relative w-full h-[240px] sm:h-[290px] overflow-hidden bg-stone-50 rounded-xl">
                  <img src={fotoHero} alt={nome} className={classeImagem} />
                  <div className={`absolute bottom-3 right-3 bg-[#ffffff]/95 backdrop-blur-md border ${bordaVintage} px-2.5 py-1 rounded-lg text-[10px] font-sans font-bold text-[#1c1917] flex items-center gap-1 shadow-md`}>
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>AVALIAÇÃO GOOGLE</span>
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
  // 2. MODELO MODERNO / URBAN (ASFALTO GRAFITE + AÇO + DOURADO)
  // ---------------------------------------------------------
  if (variacao === 'urban') {
    const fundoUrban = eBarbearia ? 'bg-[#0b0c0e]' : 'bg-[#02140e]';
    const bannerUrban = eBarbearia ? 'bg-[#060708] border-zinc-800/90' : 'bg-[#010b08] border-emerald-900/80';
    const headerUrban = eBarbearia ? 'bg-[#0b0c0e]/95 border-zinc-800/80' : 'bg-[#02140e]/90 border-emerald-900/60';
    const cardFotoUrban = eBarbearia ? 'border-amber-500/30 bg-[#14171b]' : 'border-emerald-500/50 bg-[#041a13]';

    return (
      <div className={`relative w-full ${fundoUrban} text-white overflow-hidden`}>
        {eBarbearia && (
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #e2c275 1px, transparent 1px), linear-gradient(to bottom, #e2c275 1px, transparent 1px)',
              backgroundSize: '36px 36px'
            }}
          />
        )}

        <div className={`w-full ${bannerUrban} border-b py-1 px-4 text-center relative z-10`}>
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] flex items-center justify-center gap-2" style={{ color: corMarcaDinamica }}>
            <span className="h-1.5 w-1.5 rounded-full animate-ping" style={{ backgroundColor: corDestaqueDinamica }} />
            <span>URBAN EDITION // {nome ? nome.toUpperCase() : ''}</span>
          </p>
        </div>

        <header className={`sticky top-0 z-40 ${headerUrban} backdrop-blur-md border-b`}>
          <div className="max-w-6xl mx-auto px-6 py-2.5 flex justify-between items-center gap-4">
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-tight text-white">{nome}</h1>
              <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mt-0.5" style={{ color: corMarcaDinamica }}>
                {servicosTexto}
              </p>
              {localizacaoTexto && (
                <p className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest mt-0.5 flex items-center gap-1" style={{ color: corDestaqueDinamica }}>
                  <MapPin className="w-3 h-3" /> {localizacaoTexto}
                </p>
              )}
            </div>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 pt-4 pb-5 space-y-4 relative z-10">
          <div className="space-y-2.5">
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
            <div className="w-full pt-1">
              <div className={`w-full rounded-2xl border ${cardFotoUrban} overflow-hidden shadow-2xl p-1.5`}>
                <div className="relative w-full h-[240px] sm:h-[290px] overflow-hidden bg-[#0b0c0e] rounded-xl">
                  <img src={fotoHero} alt={nome} className={classeImagem} />
                  <div className="absolute bottom-3 right-3 bg-[#0b0c0e]/90 backdrop-blur-md border border-zinc-700/80 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-zinc-200 flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>AVALIAÇÃO GOOGLE</span>
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
  // 3. MODELO MINIMALISTA PREMIUM
  // ---------------------------------------------------------
  return (
    <div className="relative w-full bg-[#09090b] text-white overflow-hidden border-b border-zinc-800/80">
      <div className="w-full bg-[#000000] border-b border-zinc-800/80 py-1 px-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full animate-ping" style={{ backgroundColor: corMarcaDinamica }} />
          <span>PROPOSTA EXCLUSIVA // <span className="text-white font-extrabold">{nome ? nome.toUpperCase() : ''}</span></span>
        </p>
      </div>

      <header className="sticky top-0 z-40 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center gap-4">
          <div>
            <h1 className="text-sm sm:text-base font-black tracking-tight text-white">{nome}</h1>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] mt-0.5 text-zinc-400">{servicosTexto}</p>
            {localizacaoTexto && (
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] mt-0.5 flex items-center gap-1" style={{ color: corDestaqueDinamica }}>
                <MapPin className="w-3 h-3" /> {localizacaoTexto}
              </p>
            )}
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-4 pb-5 space-y-4 relative z-10">
        <div className="space-y-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 text-[11px] font-bold uppercase tracking-wider shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: corMarcaDinamica }} />
            {tagComplementoFinal}
          </span>

          <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight text-white">
            {tituloPrincipal}
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 opacity-90 max-w-3xl">
            Na <strong className="font-bold text-white">{nomeCurto}</strong>, {descricao}
          </p>

          {temTelefone && (
            <div className="pt-1 space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: corDestaqueDinamica, color: corTextoBotaoDinamica }}
                className="inline-flex items-center justify-center gap-2.5 font-black px-6 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-[1.01] hover:brightness-110"
              >
                <Calendar className="w-4 h-4" />
                <span>{textoBotao}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-3 text-[11px] font-sans text-zinc-400 font-semibold">
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
          <div className="w-full pt-1">
            <div className="w-full rounded-2xl border border-zinc-800 bg-[#141414] overflow-hidden shadow-2xl p-1.5">
              <div className="relative w-full h-[240px] sm:h-[290px] overflow-hidden bg-black/50 rounded-xl">
                <img src={fotoHero} alt={nome} className={classeImagem} />
                <div className="absolute bottom-3 right-3 bg-zinc-900/90 backdrop-blur-md border border-zinc-700 px-2.5 py-1 rounded-lg text-[10px] font-bold text-zinc-200 flex items-center gap-1 shadow-lg">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>AVALIAÇÃO GOOGLE</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}