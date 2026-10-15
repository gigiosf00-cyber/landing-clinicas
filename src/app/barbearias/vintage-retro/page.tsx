'use client';

import React from 'react';
import { Scissors, Award, Shield, Compass } from 'lucide-react';

export default function VintageRetro() {
  let activeLead = null;
  try {
    activeLead = require('@/data/active_lead.json');
  } catch (e) {
    activeLead = null;
  }

  const lead = activeLead?.lead || {
    nome: "Barbearia Cavalheiros",
    endereco: "Endereço do Estabelecimento",
    cidade: "Sua Cidade",
    telefone: "5500000000000"
  };

  const whatsappLimpo = lead.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const linkWhatsapp = `https://wa.me/55${whatsappLimpo}?text=Olá!%20Vim%20pelo%20site%20da%20${encodeURIComponent(lead.nome)}%20e%20gostaria%20de%20agendar%20um%20atendimento.`;

  return (
    <div className="min-h-screen bg-[#1c1917] text-[#e7e5e4] font-serif">
      <header className="border-b border-[#44403c] bg-[#0c0a09]/90 py-6 px-4 text-center">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Compass className="w-8 h-8 text-[#d97706]" />
            <span className="text-2xl font-bold tracking-widest uppercase text-[#f59e0b]">
              {lead.nome}
            </span>
          </div>
          <span className="text-xs uppercase tracking-widest text-[#a8a29e] border border-[#78716c] px-3 py-1 rounded font-sans">
            📍 {lead.cidade ? lead.cidade : 'Tradição & Navalha'}
          </span>
        </div>
      </header>

      <section className="py-20 px-4 text-center bg-gradient-to-b from-[#0c0a09] to-[#1c1917] border-b border-[#44403c]">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#d97706] uppercase tracking-widest text-xs font-sans mb-3 block">
            📍 {lead.endereco}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#f59e0b] mb-4 tracking-wide uppercase">
            A Arte da Cutelaria & Barbearia
          </h1>
          <p className="text-lg text-[#d6d3d1] mb-8 font-sans leading-relaxed">
            Resgatamos a essência do atendimento tradicional na <strong>{lead.nome}</strong>. Toalha quente, navalha afiada e uma experiência exclusiva.
          </p>
          <a 
            href={linkWhatsapp} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-[#d97706] hover:bg-[#b45309] text-black font-sans font-bold uppercase tracking-wider px-8 py-3 rounded transition shadow-lg"
          >
            Marcar Atendimento
          </a>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 font-sans">
        <h2 className="text-2xl font-serif text-center text-[#f59e0b] uppercase tracking-wider mb-12">Serviços de Cavalheiro</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#27272a] border border-[#44403c] p-6 rounded-lg text-center">
            <Scissors className="w-8 h-8 text-[#d97706] mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-white mb-2">Corte Tradicional</h3>
            <p className="text-sm text-[#a8a29e] mb-4">Tesoura e máquina tradicional com acabamento clássico.</p>
            <span className="text-xl font-bold text-[#f59e0b]">R$ 60,00</span>
          </div>
          <div className="bg-[#27272a] border border-[#44403c] p-6 rounded-lg text-center">
            <Award className="w-8 h-8 text-[#d97706] mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-white mb-2">Barba com Toalha Quente</h3>
            <p className="text-sm text-[#a8a29e] mb-4">Ritual de navalha clássica, óleos essenciais e bálsamo.</p>
            <span className="text-xl font-bold text-[#f59e0b]">R$ 50,00</span>
          </div>
          <div className="bg-[#27272a] border border-[#44403c] p-6 rounded-lg text-center">
            <Shield className="w-8 h-8 text-[#d97706] mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-white mb-2">Serviço Completo</h3>
            <p className="text-sm text-[#a8a29e] mb-4">Corte, barba completa e alinhamento de sobrancelhas.</p>
            <span className="text-xl font-bold text-[#f59e0b]">R$ 100,00</span>
          </div>
        </div>
      </section>
    </div>
  );
}