'use client';

import React from 'react';
import { Scissors, Calendar, ShieldCheck, UserCheck } from 'lucide-react';

export default function ModernoUrban() {
  let activeLead = null;
  try {
    activeLead = require('@/data/active_lead.json');
  } catch (e) {
    activeLead = null;
  }

  const lead = activeLead?.lead || {
    nome: "Black Zone",
    endereco: "Endereço do Estabelecimento",
    cidade: "Sua Cidade",
    telefone: "5500000000000"
  };

  const whatsappLimpo = lead.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const linkWhatsapp = `https://wa.me/55${whatsappLimpo}?text=Olá!%20Vim%20pelo%20site%20da%20${encodeURIComponent(lead.nome)}%20e%20quero%20agendar%20um%20horário.`;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scissors className="w-7 h-7 text-amber-500" />
            <span className="text-xl font-bold uppercase tracking-wider text-white">
              {lead.nome}
            </span>
          </div>
          <a 
            href={linkWhatsapp} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-5 py-2 rounded-full transition flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Agendar
          </a>
        </div>
      </header>

      <section className="relative py-20 px-4 text-center border-b border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <span className="text-amber-500 font-semibold tracking-widest uppercase text-xs mb-2 block">
            📍 {lead.endereco}{lead.cidade ? ` - ${lead.cidade}` : ''}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase">
            Barbearia <span className="text-amber-500">{lead.nome}</span>
          </h1>
          <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
            Cortes modernos, degradê perfeito e ambiente exclusivo para o homem urbano.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href={linkWhatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 py-3 rounded-full transition"
            >
              Reservar Agora
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <Scissors className="w-8 h-8 text-amber-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Corte Moderno / Fade</h3>
          <p className="text-neutral-400 text-sm mb-4">Degradê preciso com acabamento em pomada matte.</p>
          <div className="text-2xl font-bold text-amber-500">R$ 50,00</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <UserCheck className="w-8 h-8 text-amber-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Barba Freestyle</h3>
          <p className="text-neutral-400 text-sm mb-4">Alinhamento e pigmentação de barba.</p>
          <div className="text-2xl font-bold text-amber-500">R$ 40,00</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <ShieldCheck className="w-8 h-8 text-amber-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Combo {lead.nome}</h3>
          <p className="text-neutral-400 text-sm mb-4">Corte + Barba + Sobrancelha.</p>
          <div className="text-2xl font-bold text-amber-500">R$ 85,00</div>
        </div>
      </section>
    </div>
  );
}