'use client';
import React from 'react';
import { Sparkles, Star, Calendar, ChevronRight, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

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
  variacao?: 'minimalista' | 'urban';
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
  tema,
  variacao = 'minimalista'
}: HeroProps) {
  const corMarcaDinamica = 'var(--cor-marca, #10b981)';
  const corDestaqueDinamica = 'var(--cor-destaque, #ea580c)';
  const corTextoBotaoDinamica = 'var(--cor-texto-botao, #ffffff)';

  const partesTag = (tagSubtitulo || '').split('•').map(item => item.trim());
  const ultItem = partesTag.length > 1 ? partesTag[partesTag.length - 1] : '';
  const temLocalizacao = ultItem.includes('-') || /^[a-záàâãéèêíóòôõúç\s]+-[a-z]{2}$/i.test(ultItem);

  const servicosTexto = temLocalizacao ? partesTag.slice(0, -1).join(' • ') : tagSubtitulo;
  const localizacaoTexto = temLocalizacao ? ultItem : '';

  const eUrban = variacao === 'urban';

  if (eUrban) {
    return (
      <div className="relative w-full bg-[#02140e] text-white overflow-hidden border-b border-emerald-900/50">
        {/* GRELA TÉCNICA E ILUMINAÇÃO DE FUNDO EXCLUSIVAS DO URBAN */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#052e22_1px,transparent_1px),linear-gradient(to_bottom,#052e22_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* TOP BANNER URBAN */}
        <div className="w-full bg-[#010b08] border-b border-emerald-900/80 py-2 px-4 text-center">
          <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-400 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>PROPOSTA EXCLUSIVA // {nome ? nome.toUpperCase() : ''}</span>
          </p>
        </div>

        {/* HEADER URBAN */}
        <header className="sticky top-0 z-40 bg-[#02140e]/90 backdrop-blur-md border-b border-emerald-900/60">
          <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center gap-4">
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                {nome}
              </h1>
              <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mt-0.5">
                {servicosTexto}
              </p>
              {localizacaoTexto && (
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest mt-1 text-orange-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {localizacaoTexto}
                </p>
              )}
            </div>
          </div>
        </header>

        {/* CONTEÚDO HERO URBAN */}
        <section className="max-w-6xl mx-auto px-6 py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-7 space-y-6">
            {complementoSubtitulo && (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-emerald-500/40 bg-emerald-950/80 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {complementoSubtitulo}
              </span>
            )}

            <h2 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight text-white">
              {tituloPrincipal}
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-emerald-100/80">
              Na <strong className="text-white font-bold">{nomeCurto}</strong>, {descricao}
            </p>

            {temTelefone && (
              <div className="pt-2 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: corDestaqueDinamica,
                    color: corTextoBotaoDinamica,
                  }}
                  className="inline-flex items-center justify-center gap-3 font-black px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(234,88,12,0.4)] hover:shadow-[0_0_35px_rgba(234,88,12,0.6)] hover:scale-[1.02]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{textoBotao}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-4 text-[11px] font-mono text-emerald-300/80 pt-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Atendimento Imediato
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Presencial & Domiciliar
                  </span>
                </div>
              </div>
            )}

            {/* PAINEL DE METRICAS URBAN */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-900/60 max-w-lg">
              <div className="border-l-2 border-emerald-500 pl-3">
                <span className="block text-xl font-black text-white">4.9 ★</span>
                <span className="text-[10px] font-mono uppercase text-emerald-400">Google Review</span>
              </div>
              <div className="border-l-2 border-emerald-500 pl-3">
                <span className="block text-xl font-black text-white">100%</span>
                <span className="text-[10px] font-mono uppercase text-emerald-400">Personalizado</span>
              </div>
              <div className="border-l-2 border-orange-500 pl-3">
                <span className="block text-xl font-black text-orange-400">ATIVO</span>
                <span className="text-[10px] font-mono uppercase text-zinc-400">Agenda Aberta</span>
              </div>
            </div>
          </div>

          {/* MOLDURA TIPO APLICAÇÃO PARA A FOTO NO URBAN */}
          {fotoHero && (
            <div className="md:col-span-5 relative">
              <div className="rounded-2xl border-2 border-emerald-500/50 bg-[#041a13] overflow-hidden shadow-[0_0_35px_rgba(2,20,14,0.9)]">
                <div className="bg-[#020d09] px-4 py-2.5 border-b border-emerald-900/80 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    {nomeCurto.toUpperCase()}
                  </span>
                  <span className="text-zinc-500">ESTRUTURA VERIFICADA</span>
                </div>

                <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-black/50 p-2">
                  <img
                    src={fotoHero}
                    alt={nome}
                    className={`w-full h-full ${fitMode === 'contain' ? 'object-contain' : 'object-cover'} rounded-xl brightness-[0.95] contrast-[1.05]`}
                  />
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

  {/* MODELO MINIMALISTA PREMIUM (CLEAN, NEUTRO E SOBRIO) */}
  return (
    <div className={`relative w-full ${tema?.fundo || 'bg-[#09090b]'}`}>
      <div className="w-full bg-[#000000] border-b border-zinc-800/80 py-1.5 px-4 text-center">
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <span style={{ color: corMarcaDinamica }}>⚡ PROPOSTA EXCLUSIVA PARA:</span>{' '}
          <span className="text-white font-extrabold">{nome ? nome.toUpperCase() : ''}</span>
        </p>
      </div>

      <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${tema?.fundo || 'bg-[#09090b]'}/95 ${tema?.borda || 'border-zinc-800'}`}>
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center gap-4">
          <div>
            <h1 className={`text-base sm:text-lg font-black tracking-tight ${tema?.texto || 'text-white'}`}>{nome}</h1>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] mt-0.5 text-zinc-400">
              {servicosTexto}
            </p>
            {localizacaoTexto && (
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] mt-1 text-[#ea580c] flex items-center gap-1">
                <span>📍 {localizacaoTexto}</span>
              </p>
            )}
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8 sm:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          {complementoSubtitulo && (
            <div className="inline-block">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border border-zinc-800 bg-zinc-900 text-zinc-300 uppercase tracking-wider shadow-sm">
                {complementoSubtitulo}
              </span>
            </div>
          )}

          <h2 className={`text-3xl sm:text-5xl font-black leading-tight tracking-tight ${tema?.texto || 'text-white'}`}>
            {tituloPrincipal}
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-zinc-300 opacity-90">
            Na <strong className="font-bold text-white">{nomeCurto}</strong>, {descricao}
          </p>

          {temTelefone && (
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: corDestaqueDinamica,
                  color: corTextoBotaoDinamica,
                }}
                className="inline-flex items-center justify-center font-black px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 hover:brightness-110"
              >
                {textoBotao}
              </a>
            </div>
          )}
        </div>

        {fotoHero && (
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-[#141414] shadow-2xl aspect-[4/3] sm:aspect-square p-2 flex items-center justify-center">
            <div className="w-full h-full overflow-hidden rounded-2xl relative flex items-center justify-center bg-black/40">
              <img
                src={fotoHero}
                alt={nome}
                className={`w-full h-full ${fitMode === 'contain' ? 'object-contain' : 'object-cover'} brightness-[0.95] contrast-[1.02]`}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}