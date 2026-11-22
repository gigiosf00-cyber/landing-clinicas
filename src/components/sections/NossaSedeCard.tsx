'use client';
import React from 'react';
import { MessageCircle, Navigation, MapPin } from 'lucide-react';

export interface NossaSedeCardProps {
  nomeCurto: string;
  fotoSede?: string;
  whatsappUrl: string;
  mapaUrl: string;
  enderecoCompleto?: string;
  labelSede?: string;
  descricao?: string;
  tema: {
    fundo: string;
    card: string;
    borda: string;
    texto: string;
    sub: string;
    destaque: string;
    serif?: boolean;
  };
}

export default function NossaSedeCard({
  nomeCurto,
  fotoSede,
  whatsappUrl,
  mapaUrl,
  enderecoCompleto,
  labelSede = 'Nossa Sede',
  descricao = 'Estamos prontos para receber você no nosso espaço ou agendar seu horário online.',
  tema,
}: NossaSedeCardProps) {
  const isVintage = Boolean(tema?.serif);
  const cardBg = isVintage ? 'bg-[#ffffff]' : (tema?.card || 'bg-[#141414]');
  const bordaClass = isVintage ? 'border-[#e0d3c1]' : (tema?.borda || 'border-zinc-800');
  const tituloClass = isVintage ? 'text-[#1c1917]' : 'text-white';
  const textoClass = isVintage ? 'text-[#44382e]' : 'text-zinc-300';
  const destaqueBotao = tema?.destaque || 'bg-[#ea580c]';

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className={`rounded-3xl border ${bordaClass} ${cardBg} p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xl`}>
        {fotoSede && (
          <div className="md:col-span-5 flex flex-col items-center">
            <div className={`w-full aspect-[4/3] rounded-2xl overflow-hidden border ${bordaClass}`}>
              <img src={fotoSede} alt={labelSede} className="w-full h-full object-cover" />
            </div>
            <span className={`mt-3 inline-block px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white ${destaqueBotao}`}>
              {labelSede}
            </span>
          </div>
        )}

        <div className={`${fotoSede ? 'md:col-span-7' : 'md:col-span-12'} space-y-4`}>
          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${tituloClass}`}>
            Visite-nos ou Chame Online
          </h2>
          <p className={`text-sm leading-relaxed ${textoClass}`}>
            {descricao}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-white transition hover:brightness-110 ${destaqueBotao}`}
            >
              <MessageCircle className="w-4 h-4" /> Chamar no WhatsApp
            </a>

            <a
              href={mapaUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border ${bordaClass} ${tituloClass} transition hover:opacity-85`}
            >
              <Navigation className="w-4 h-4" /> Rota no Mapa
            </a>
          </div>

          {enderecoCompleto && (
            <p className={`text-xs flex items-center gap-1.5 pt-1 ${textoClass}`}>
              <MapPin className="w-4 h-4 shrink-0 text-[#ea580c]" />
              <span>{enderecoCompleto}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}