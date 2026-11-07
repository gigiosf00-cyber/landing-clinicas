'use client';
import { useState } from 'react';
import { Clock, Camera, Star, MapPin, ChevronRight, X, Navigation, MessageCircle, Calendar, HeartPulse } from 'lucide-react';

export interface TemaInfo {
  fundo: string; 
  card: string; 
  borda: string; 
  texto: string; 
  sub: string; 
  destaque: string; 
  serif?: boolean;
}

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function InfoGoogle({ 
  d, 
  fotos, 
  tema, 
  semServicos = false,
  prefixo
}: { 
  d: any; 
  fotos: string[]; 
  tema: TemaInfo;
  semServicos?: boolean;
  prefixo?: string; // <-- Adicionado para aceitar prefixo sem erro de TS
}) {
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
      'segunda-feira: 08:00 – 19:00',
      'terça-feira: 08:00 – 19:00',
      'quarta-feira: 08:00 – 19:00',
      'quinta-feira: 08:00 – 19:00',
      'sexta-feira: 08:00 – 19:00',
      'sábado: 08:00 – 13:00',
      'domingo: Fechado'
    ];
  }

  const st = safeD.statusAgora || safeD.status_agora || { aberto: true, texto: 'Aberto agora' };
  const nomeEstabelecimento = safeD.nome || 'Clínica Renovar';
  
  const enderecoBusca = safeD.enderecoCompleto || safeD.endereco || 'R. Antônio Mendonça, 479a - Planalto, Iguatu - CE, 63500-775';
  
  const urlOficialMaps = safeD.mapa && safeD.mapa !== '#' 
    ? safeD.mapa 
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeEstabelecimento + ', ' + enderecoBusca)}`;
    
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(nomeEstabelecimento + ', ' + enderecoBusca)}&z=17&output=embed`;
  
  const reviewsList = Array.isArray(safeD.reviews) ? safeD.reviews : (Array.isArray(safeD.avaliacoes) ? safeD.avaliacoes : []);
  
  const totalAval = Number(safeD.totalAval || safeD.total_avaliacoes || (reviewsList.length > 0 ? reviewsList.length : 15));
  const telNumero = safeD.tel || safeD.telefone || safeD.phone || '88997110085';

  const rawInsta = safeD.instagram || safeD.insta || safeD.instaUrl || '';
  let instaLink = '';
  if (rawInsta) {
    instaLink = rawInsta.startsWith('http') ? rawInsta : `https://instagram.com/${rawInsta.replace('@', '').trim()}`;
  } else {
    instaLink = `https://instagram.com/${nomeEstabelecimento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")}`;
  }

  const servicosDoLead = Array.isArray(safeD.servicos) && safeD.servicos.length > 0 
    ? safeD.servicos.map((s: any) => typeof s === 'string' ? { nome: s, desc: 'Atendimento especializado e personalizado.' } : { nome: s.nome || s.titulo, desc: s.desc || s.descricao })
    : [];

  const servicosClinicaPadrao = [
    { nome: 'Fisioterapia na Coluna Vertebral', desc: 'Tratamento focado na coluna, alívio contínuo da dor e recuperação do movimento.' },
    { nome: 'Fisioterapia Traumato-Ortopédica', desc: 'Reabilitação pós-cirúrgica, fraturas, luxações e lesões articulares.' },
    { nome: 'Atendimento Domiciliar', desc: 'Fisioterapia no conforto do seu lar com flexibilidade e total praticidade.' },
    { nome: 'Reabilitação do Idoso', desc: 'Treino de equilíbrio, prevenção de quedas e autonomia para a terceira idade.' },
    { nome: 'Pilates Terapêutico & Clínico', desc: 'Aparelhos completos para postura e flexibilidade com turmas reduzidas.' },
    { nome: 'Quiropraxia', desc: 'Ajustes articulares focados em restaurar a função da coluna e aliviar dores.' },
    { nome: 'Ventosaterapia', desc: 'Alívio de tensões musculares, melhora da circulação e relaxamento profundo.' },
    { nome: 'Estética Avançada', desc: 'Procedimentos faciais e corporais focados no seu cuidado integral.' },
    { nome: 'Palmilhas Posturais', desc: 'Avaliação biomecânica e confecção de palmilhas sob medida.' }
  ];

  const servicosReais = servicosDoLead.length > 0 ? servicosDoLead : servicosClinicaPadrao;

  const btnClasseVerde = "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-900/50 bg-[#022c22] hover:bg-[#064e3b] hover:border-orange-500 text-white text-xs font-bold transition-all duration-300 shadow-md hover:scale-[1.02]";
  const iconCor = "text-orange-500";

  return (
    <div style={{ fontFamily: tema?.serif ? 'Georgia, serif' : 'inherit' }} className="w-full select-none relative scroll-smooth">
      
      {/* 1. BOTÕES DE AÇÕES RÁPIDAS */}
      <section className="max-w-6xl mx-auto px-6 pt-6 pb-10">
        {st.texto && (
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 bg-[#022c22] border border-emerald-900/50 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-300 shadow-sm">
              <span className={`h-2 w-2 rounded-full ${st.aberto ? 'bg-emerald-400' : 'bg-red-500'}`} />
              {st.texto}
            </span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => setHorariosAbertos(!horariosAbertos)} className={btnClasseVerde}>
            <Clock className={`w-4 h-4 ${iconCor}`} /> Horários
          </button>
          <a href="#fotos" className={btnClasseVerde}>
            <Camera className={`w-4 h-4 ${iconCor}`} /> Fotos ({safeFotos.length})
          </a>
          <a href="#avaliacoes" className={btnClasseVerde}>
            <Star className={`w-4 h-4 ${iconCor} fill-current`} /> Avaliações ({totalAval})
          </a>
          <a href={instaLink} target="_blank" rel="noreferrer" className={btnClasseVerde}>
            <InstagramIcon className={`w-4 h-4 ${iconCor}`} /> Instagram
          </a>
        </div>

        {horariosAbertos && (
          <div className="max-w-md mx-auto mt-6 bg-[#022c22] border border-emerald-900/60 rounded-2xl p-5 text-neutral-100 shadow-xl">
            <h3 className="font-bold text-sm text-emerald-400 mb-3 flex items-center gap-2"><Clock className="w-4 h-4"/> Grade de Horários</h3>
            <ul className="space-y-2">
              {semana.map((l: string, idx: number) => (
                <li key={idx} className="flex justify-between text-xs py-1 border-b border-emerald-900/40 last:border-0 text-emerald-100/80">
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 2. SERVIÇOS E ESPECIALIDADES */}
      {!semServicos && (
        <section className="max-w-6xl mx-auto px-6 py-10 border-t border-slate-200">
          <h2 className="text-xl font-bold tracking-tight text-[#022c22] mb-6 flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-orange-500" />
            Nossas Especialidades
          </h2>

          <div className="bg-slate-100/70 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicosReais.map((s: any, idx: number) => (
                <div 
                  key={idx} 
                  className="bg-[#022c22] border border-emerald-900/60 rounded-2xl p-5 flex flex-col justify-between hover:border-orange-500 transition-all duration-300 group cursor-pointer shadow-md hover:scale-[1.01]"
                >
                  <div>
                    <h3 className="text-white font-bold text-sm mb-2 group-hover:text-orange-400 transition-colors">
                      {s.nome}
                    </h3>
                    <p className="text-emerald-100/80 text-xs leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a 
                href={`https://wa.me/55${telNumero}?text=${encodeURIComponent(`Olá! Gostaria de agendar uma consulta na ${nomeEstabelecimento}.`)}`} 
                target="_blank" 
                rel="noreferrer" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-950/20 hover:scale-[1.005]"
              >
                <Calendar className="w-4 h-4"/>
                <span>Agendar Consulta / Avaliação via WhatsApp</span>
                <ChevronRight className="w-4 h-4"/>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 3. GALERIA COMPLETA DE FOTOS */}
      {safeFotos.length > 0 && (
        <section id="fotos" className="max-w-6xl mx-auto px-6 py-10 border-t border-slate-200">
          <h2 className="text-xl font-bold tracking-tight text-[#022c22] mb-6">Galeria</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {safeFotos.map((f: string, i: number) => (
              <div 
                key={i} 
                onClick={() => setFotoModal(f)} 
                className="aspect-square rounded-2xl overflow-hidden cursor-pointer border border-slate-200 hover:border-orange-500 group relative shadow-sm bg-white"
              >
                <img 
                  src={f} 
                  alt={`Foto ${i}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white drop-shadow-md"/>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MODAL LIGHTBOX FOTOS */}
      {fotoModal && (
        <div onClick={() => setFotoModal(null)} className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer">
          <img src={fotoModal} alt="Foto Ampliada" className="max-w-full max-h-[85vh] rounded-2xl border border-neutral-800 shadow-2xl" />
          <button className="absolute top-6 right-6 text-white p-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition">
            <X className="w-6 h-6"/>
          </button>
        </div>
      )}

      {/* 4. AVALIAÇÕES DO GOOGLE */}
      <section id="avaliacoes" className="max-w-6xl mx-auto px-6 py-10 border-t border-slate-200">
        <h2 className="text-xl font-bold tracking-tight text-[#022c22] mb-6">Avaliações no Google ({totalAval})</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviewsList.length > 0 ? (
            reviewsList.map((r: any, i: number) => (
              <div 
                key={i} 
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-400 gap-1 mb-3">
                    {[...Array(r.nota || 5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 mb-4 italic leading-relaxed">“{r.texto || r.text}”</p>
                </div>
                <strong className="text-xs text-[#022c22] border-t border-slate-100 pt-3 font-semibold">{r.autor || r.author}</strong>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white border border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-600 shadow-sm">
              <div className="flex justify-center text-amber-400 gap-1 mb-2">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current text-amber-400" />
                ))}
              </div>
              <strong>Nota 5.0 baseada em {totalAval} avaliações no Google Maps.</strong>
            </div>
          )}
        </div>
      </section>

      {/* 5. LOCALIZAÇÃO COM MAPA NOTURNO PREMIUM */}
      <section className="max-w-6xl mx-auto px-6 py-10 border-t border-slate-200 pb-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#022c22]">Onde Estamos</h2>
            <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
              <MapPin className="w-4 h-4 shrink-0 text-orange-500" />
              <span>{enderecoBusca}</span>
            </p>
          </div>
          
          <a 
            href={urlOficialMaps} 
            target="_blank" 
            rel="noreferrer" 
            className={btnClasseVerde}
          >
            <Navigation className="w-4 h-4 text-orange-500 fill-orange-500"/> Abrir no Google Maps
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-800 h-[380px] bg-neutral-900 shadow-xl relative">
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

      {/* DOCK MOBILE FIXO */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50 bg-white/95 backdrop-blur-xl border border-slate-200 p-2.5 rounded-2xl flex items-center gap-2 shadow-2xl">
        <a href={`https://wa.me/55${telNumero}`} target="_blank" rel="noreferrer" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-xl flex justify-center items-center gap-1.5 transition"><MessageCircle className="w-4 h-4"/> WhatsApp</a>
        <a href={urlOficialMaps} target="_blank" rel="noreferrer" className="flex-1 bg-[#022c22] text-white font-bold text-xs py-3 rounded-xl flex justify-center items-center gap-1.5 transition"><Navigation className="w-4 h-4 text-orange-500"/> Como Chegar</a>
      </div>

    </div>
  );
}