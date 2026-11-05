'use client';
import { useState } from 'react';
import { Clock, Camera, Star, Phone, MapPin, ChevronRight, X, Navigation, Scissors, MessageCircle, Calendar } from 'lucide-react';

export interface TemaInfo {
  fundo: string; 
  card: string; 
  borda: string; 
  texto: string; 
  sub: string; 
  destaque: string; 
  serif?: boolean;
}

// ÍCONE DO INSTAGRAM EM SVG NATIVO
const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

function diaHoje(): string {
  const dias = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  return dias[new Date().getDay()];
}

export default function InfoGoogle({ d, fotos, tema }: { d: any; fotos: string[]; tema: TemaInfo }) {
  const [fotoModal, setFotoModal] = useState<string | null>(null);
  const [horariosAbertos, setHorariosAbertos] = useState<boolean>(false);

  const safeD = d || {};
  const safeFotos = Array.isArray(fotos) && fotos.length > 0 ? fotos : (Array.isArray(safeD.fotos) ? safeD.fotos : []);

  let semana: string[] = [];
  const rawSemana = safeD.horariosSemana || safeD.horarios_semana;
  if (Array.isArray(rawSemana) && rawSemana.length > 0) {
    semana = rawSemana;
  } else if (typeof safeD.horarios === 'string' && safeD.horarios.trim().length > 0) {
    const sep = safeD.horarios.includes('•') ? '•' : safeD.horarios.includes('\n') ? '\n' : ',';
    semana = safeD.horarios.split(sep).map((s: string) => s.trim()).filter(Boolean);
  } else {
    semana = [
      'segunda-feira: 08:00 – 20:00',
      'terça-feira: 08:00 – 20:00',
      'quarta-feira: 08:00 – 20:00',
      'quinta-feira: 08:00 – 20:00',
      'sexta-feira: 08:00 – 20:00',
      'sábado: 08:00 – 20:00',
      'domingo: 09:00 – 14:00'
    ];
  }

  const st = safeD.statusAgora || safeD.status_agora || { aberto: true, texto: 'Aberto agora' };
  const nomeEstabelecimento = safeD.nome || 'Gusmão barbershop';
  const enderecoBusca = safeD.enderecoCompleto || safeD.endereco || 'R. Eurípedes de Paula, 213 - Jardim Elvira, Osasco - SP';
  
  const urlOficialMaps = safeD.mapa && safeD.mapa !== '#' 
    ? safeD.mapa 
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeEstabelecimento + ', ' + enderecoBusca)}`;
    
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(nomeEstabelecimento + ', ' + enderecoBusca)}&z=17&output=embed`;
  
  const defaultReviews = [
    { autor: 'Marcelo Silva', texto: 'Excelente atendimento, corte impecável e ambiente muito agradável.', nota: 5 },
    { autor: 'Rodrigo Oliveira', texto: 'Barbearia top de linha! Pontualidade e atenção aos detalhes.', nota: 5 },
    { autor: 'Carlos Eduardo', texto: 'Profissionais atenciosos. Recomendo a todos da região.', nota: 5 }
  ];

  const rawReviews = Array.isArray(safeD.reviews) ? safeD.reviews : (Array.isArray(safeD.avaliacoes) ? safeD.avaliacoes : []);
  const reviewsList = rawReviews.length > 0 ? rawReviews : defaultReviews;
  const totalAval = safeD.totalAval || safeD.total_avaliacoes || 84;
  const telNumero = safeD.tel || safeD.telefone || safeD.phone || '11986483600';
  
  // GERAÇÃO INTELIGENTE DO LINK DO INSTAGRAM DO CLIENTE
  const rawInsta = safeD.instagram || safeD.insta || safeD.instaUrl || '';
  let instaLink = '';

  if (rawInsta) {
    if (rawInsta.startsWith('http://') || rawInsta.startsWith('https://')) {
      instaLink = rawInsta;
    } else {
      const handle = rawInsta.replace('@', '').trim();
      instaLink = `https://instagram.com/${handle}`;
    }
  } else {
    // Fallback direto para o perfil do cliente (ex: https://instagram.com/gusmaobarbershop)
    const handleGerado = nomeEstabelecimento
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
    instaLink = `https://instagram.com/${handleGerado}`;
  }

  const servicosReais = [
    { nome: 'Corte Social', desc: 'Estilo clássico executado com precisão e excelente acabamento.' },
    { nome: 'Corte com Navalha', desc: 'Acabamento profissional de alta definição e contorno perfeito.' },
    { nome: 'Cortes Infantis', desc: 'Atendimento especializado e paciente para os mais novos.' },
    { nome: 'Shampoo & Condicionador', desc: 'Tratamento capilar com produtos específicos para cabelos curtos.' }
  ];

  return (
    <div style={{ fontFamily: tema?.serif ? 'Georgia, serif' : 'inherit' }} className="w-full select-none relative scroll-smooth">
      
      {/* 1. AÇÕES RÁPIDAS E HORÁRIOS */}
      <section className="max-w-6xl mx-auto px-6 pt-6 pb-10">
        {st.texto && (
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-1.5 rounded-full text-xs font-semibold text-neutral-300 shadow-sm">
              <span className={`h-2 w-2 rounded-full ${st.aberto ? 'bg-emerald-500' : 'bg-red-500'}`} />
              {st.texto}
            </span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => setHorariosAbertos(!horariosAbertos)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold transition-all">
            <Clock className="w-4 h-4 text-amber-500" /> Horários
          </button>
          <a href="#fotos" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold transition-all">
            <Camera className="w-4 h-4 text-amber-500" /> Fotos
          </a>
          <a href="#avaliacoes" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold transition-all">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Avaliações
          </a>
          <a href={instaLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold transition-all">
            <InstagramIcon className="w-4 h-4 text-amber-500" /> Instagram
          </a>
        </div>

        {horariosAbertos && (
          <div className="max-w-md mx-auto mt-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-5 text-neutral-200 shadow-xl">
            <h3 className="font-bold text-sm text-amber-400 mb-3 flex items-center gap-2"><Clock className="w-4 h-4"/> Grade de Horários</h3>
            <ul className="space-y-2">
              {semana.map((l, idx) => (
                <li key={idx} className="flex justify-between text-xs py-1 border-b border-neutral-800/50 last:border-0 text-neutral-400">
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 2. SERVIÇOS REAIS - CONTAINER UNIFICADO COM BOTÃO LARGURA TOTAL */}
      <section className="max-w-6xl mx-auto px-6 py-10 border-t border-neutral-900">
        <h2 className="text-xl font-black uppercase text-white mb-6 flex items-center gap-2">
          <Scissors className="text-amber-500 w-5 h-5"/> Serviços
        </h2>

        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicosReais.map((s, idx) => (
              <div 
                key={idx} 
                className="bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/40 transition-colors group"
              >
                <div>
                  <h3 className="text-white font-bold text-sm mb-2 group-hover:text-amber-400 transition-colors">
                    {s.nome}
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <a 
              href={`https://wa.me/55${telNumero}?text=${encodeURIComponent(`Olá! Gostaria de agendar um horário na ${nomeEstabelecimento}.`)}`} 
              target="_blank" 
              rel="noreferrer" 
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black py-4 px-6 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/10 hover:scale-[1.01]"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Qualquer Serviço via WhatsApp</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. GALERIA DE FOTOS */}
      {safeFotos.length > 0 && (
        <section id="fotos" className="max-w-6xl mx-auto px-6 py-10 border-t border-neutral-900">
          <h2 className="text-xl font-black uppercase text-white mb-6">Galeria</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {safeFotos.map((f, i) => (
              <div 
                key={i} 
                onClick={() => setFotoModal(f)} 
                className="h-48 rounded-2xl overflow-hidden cursor-pointer border border-neutral-800 group relative shadow-md"
              >
                <img 
                  src={f} 
                  alt={`Foto ${i}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 group-hover:brightness-105" 
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white drop-shadow-md" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MODAL LIGHTBOX FOTOS */}
      {fotoModal && (
        <div onClick={() => setFotoModal(null)} className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer">
          <img src={fotoModal} className="max-w-full max-h-[85vh] rounded-2xl border border-neutral-800 shadow-2xl" />
          <button className="absolute top-6 right-6 text-white p-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition"><X className="w-6 h-6" /></button>
        </div>
      )}

      {/* 4. AVALIAÇÕES DO GOOGLE */}
      <section id="avaliacoes" className="max-w-6xl mx-auto px-6 py-10 border-t border-neutral-900">
        <h2 className="text-xl font-black uppercase text-white mb-6">Google ({totalAval})</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviewsList.map((r: any, i: number) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 gap-1 mb-3">
                  {[...Array(r.nota || 5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-xs text-neutral-300 mb-4 italic leading-relaxed">“{r.texto || r.text}”</p>
              </div>
              <strong className="text-xs text-white border-t border-neutral-800/60 pt-3">{r.autor || r.author}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LOCALIZAÇÃO COM MAPA EM MODO NOTURNO */}
      <section className="max-w-6xl mx-auto px-6 py-10 border-t border-neutral-900 pb-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black uppercase text-white">Onde Estamos</h2>
            <p className="text-xs text-neutral-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              {enderecoBusca}
            </p>
          </div>
          
          <a 
            href={urlOficialMaps} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-black px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            <Navigation className="w-4 h-4 fill-black" /> Abrir no Google Maps Oficial
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden border border-neutral-800 h-[400px] bg-neutral-900 shadow-2xl relative">
          <iframe 
            src={mapEmbedUrl} 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade" 
            className="w-full h-full filter invert-[0.9] hue-rotate-180 contrast-125 brightness-90"
          />
        </div>
      </section>

      {/* DOCK MOBILE FIXO NO RODAPÉ */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 p-2.5 rounded-2xl flex items-center gap-2 shadow-2xl">
        <a href={`https://wa.me/55${telNumero}`} target="_blank" rel="noreferrer" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl flex justify-center items-center gap-1.5 transition"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
        <a href={urlOficialMaps} target="_blank" rel="noreferrer" className="flex-1 bg-neutral-800 text-amber-400 border border-neutral-700 font-bold text-xs py-3 rounded-xl flex justify-center items-center gap-1.5 transition"><Navigation className="w-4 h-4" /> Como Chegar</a>
      </div>

    </div>
  );
}