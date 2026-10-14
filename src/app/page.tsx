'use client';

import React from 'react';
import { Scissors, Clock, MapPin, Phone, Star, Calendar, ShieldCheck, UserCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scissors className="w-7 h-7 text-amber-500" />
            <span className="text-xl font-bold tracking-wider uppercase text-white">
              Black <span className="text-amber-500">Zone</span>
            </span>
          </div>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-lg shadow-amber-500/10 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Agendar Horário
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 text-center border-b border-neutral-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-3 block">
            Estilo & Tradição
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 uppercase">
            Barbearia <span className="text-amber-500">Black Zone</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-8">
            O seu visual em boas mãos. Cortes modernos, barba alinhada e um ambiente exclusivo para relaxar e renovar a autoestima.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#servicos"
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-medium px-8 py-3 rounded-full transition"
            >
              Ver Serviços
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold px-8 py-3 rounded-full transition shadow-lg shadow-amber-500/20"
            >
              Reservar Agora
            </a>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-3">Nossos Serviços</h2>
          <p className="text-neutral-400">Qualidade e precisão para qualquer estilo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl relative group hover:border-amber-500/50 transition duration-300">
            <Scissors className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-2">Corte Masculino</h3>
            <p className="text-neutral-400 text-sm mb-6">
              Do clássico ao degradê moderno. Inclui lavagem e finalização com pomada.
            </p>
            <div className="text-2xl font-bold text-amber-500">R$ 50,00</div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl relative group hover:border-amber-500/50 transition duration-300">
            <UserCheck className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-2">Barba Terapia</h3>
            <p className="text-neutral-400 text-sm mb-6">
              Modelagem de barba com toalha quente, óleos hidratantes e massagem facial.
            </p>
            <div className="text-2xl font-bold text-amber-500">R$ 40,00</div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl relative group hover:border-amber-500/50 transition duration-300">
            <ShieldCheck className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-2">Combo Cabelo + Barba</h3>
            <p className="text-neutral-400 text-sm mb-6">
              O pacote completo para alinhar o visual com desconto especial.
            </p>
            <div className="text-2xl font-bold text-amber-500">R$ 80,00</div>
          </div>
        </div>
      </section>

      {/* Informações de Funcionamento */}
      <section className="bg-neutral-900 border-t border-b border-neutral-800 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Clock className="w-8 h-8 text-amber-500" />
            <h4 className="text-lg font-bold text-white">Horário de Atendimento</h4>
            <p className="text-neutral-400 text-sm">Terça a Sábado: 09h às 20h<br />Domingo e Segunda: Fechado</p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <MapPin className="w-8 h-8 text-amber-500" />
            <h4 className="text-lg font-bold text-white">Localização</h4>
            <p className="text-neutral-400 text-sm">Rua Principal, 1000 - Centro<br />Sua Cidade / PR</p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <Phone className="w-8 h-8 text-amber-500" />
            <h4 className="text-lg font-bold text-white">Contato & Agendamento</h4>
            <p className="text-neutral-400 text-sm">WhatsApp: (41) 99999-9999<br />Instagram: @blackzone.barbearia</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-neutral-600 text-sm">
        <p>© 2026 Barbearia Black Zone. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}