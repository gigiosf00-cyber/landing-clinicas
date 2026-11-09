'use client';
import { useState, useMemo } from 'react';
import { Clock, Camera, Star, MapPin, ChevronRight, X, Navigation, MessageCircle, Calendar, HeartPulse, Scissors, Utensils } from 'lucide-react';

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

const REVIEWS_BARBEARIA = [
  { autor: 'Marcelo Silva', nota: 5, texto: 'Excelente atendimento! O corte ficou perfeito e a barba na toalha quente é sensacional.' },
  { autor: 'Rodrigo Oliveira', nota: 5, texto: 'Ambiente muito agradável, profissionais de altíssima qualidade e boa música.' },
  { autor: 'Fernando Costa', nota: 4, texto: 'Muito bom o atendimento e o corte. Às vezes tem uma pequena espera nos horários de pico, mas vale muito a pena!' }
];

const REVIEWS_CLINICA = [
  { autor: 'Camila Alencar', nota: 5, texto: 'Profissionais extremamente atenciosos e capacitados. A fisioterapia aliviou minhas dores.' },
  { autor: 'Juliana Mendes', nota: 5, texto: 'Clínica muito limpa, organizada e com equipamentos modernos.' },
  { autor: 'Eduardo Santos', nota: 4, texto: 'Ótimo atendimento e ambiente acolhedor. Recomendo para quem busca tratamento de qualidade.' }
];

const SERVICOS_BARBEARIA = [
  { nome: 'Corte Tradicional & Degradê', desc: 'Tesoura, máquina, degradê e acabamento de alta precisão.' },
  { nome: 'Barba Completa & Toalha Quente', desc: 'Modelagem com navalha, hidratação de fios e relaxamento.' },
  { nome: 'Combo Barba + Cabelo', desc: 'Visual completo renovado com atendimento exclusivo.' },
  { nome: 'Pigmentação de Barba & Cabelo', desc: 'Disfarce de fios brancos e alinhamento de contorno.' },
  { nome: 'Selagem & Alisamento Masculino', desc: 'Redução de volume, alinhamento e brilho natural.' },
  { nome: 'Acabamento & Pezinho', desc: 'Manutenção rápida do contorno do cabelo e da barba.' }
];

const SERVICOS_CLINICA = [
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

const SERVICOS_HAMBURGUERIA = [
  { nome: 'Burgers Artesanais de Blend Especial', desc: 'Carnes selecionadas preparadas no ponto ideal.' },
  { nome: 'Smash Burgers Crocantes', desc: 'Pão macio, queijo derretido e a crostinha perfeita.' },
  { nome: 'Porções & Batatas Especiais', desc: 'Acompanhamentos crocantes com molhos da casa.' },
  { nome: 'Milkshakes & Sobremesas', desc: 'Bebidas cremosas e sobremesas artesanais.' }
];

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
  prefixo?: string;
}) {
  const [fotoModal, setFotoModal] = useState<string | null>(null);
  const [horariosAbertos, setHorariosAbertos] = useState<boolean>(false);

  const safeD = useMemo(() => d || {}, [d]);
  const safeFotos = useMemo(() => Array.isArray(fotos) && fotos.length > 0 ? fotos : (Array.isArray(safeD.fotos) ? safeD.fotos : []), [fotos, safeD.fotos]);

  const semana = useMemo(() => {
    const rawSemana = safeD.horariosSemana || safeD.horarios_semana;
    if (Array.isArray(rawSemana) && rawSemana.length > 0) return rawSemana;
    if (typeof safeD.horarios === 'string' && safeD.horarios.trim().length > 0) {
      const sep = safeD.horarios.includes('•') ? '•' : safeD.horarios.includes('\n') ? '\n' : ',';
      return safeD.horarios.split(sep).map((s: string) => s.trim()).filter(Boolean);
    }
    return [
      'segunda-feira: 08:00 – 19:00',
      'terça-feira: 08:00 – 19:00',
      'quarta-feira: 08:00 – 19:00',
      'quinta-feira: 08:00 – 19:00',
      'sexta-feira: 08:00 – 19:00',
      'sábado: 08:00 – 13:00',
      'domingo: Fechado'
    ];
  }, [safeD]);

  const st = safeD.statusAgora || safeD.status_agora || { aberto: true, texto: 'Aberto agora' };
  const nomeEstabelecimento = safeD.nome || 'Estabelecimento';
  const nichoLead = (safeD.nicho || safeD.categoria || prefixo || '').toLowerCase();
  const termoBuscaNicho = (nichoLead + ' ' + nomeEstabelecimento).toLowerCase();
  
  const enderecoBusca = safeD.enderecoCompleto || safeD.endereco || 'Endereço não informado';
  
  const urlOficialMaps = safeD.mapa && safeD.mapa !== '#' 
    ? safeD.mapa 
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeEstabelecimento + ', ' + enderecoBusca)}`;
    
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(nomeEstabelecimento + ', ' + enderecoBusca)}&z=17&output=embed`;
  
  const notaAval = Number(safeD.avaliacao || safeD.rating || safeD.nota || 4.5);
  const totalAval = Number(safeD.user_ratings_total || safeD.totalAval || safeD.total_avaliacoes || 84);
  const telNumero = safeD.tel || safeD.telefone || safeD.phone || '';

  const rawInsta = safeD.instagram || safeD.insta || safeD.instaUrl || '';
  const instaLink = useMemo(() => {
    if (rawInsta) return rawInsta.startsWith('http') ? rawInsta : `https://instagram.com/${rawInsta.replace('@', '').trim()}`;
    return `https://instagram.com/${nomeEstabelecimento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")}`;
  }, [rawInsta, nomeEstabelecimento]);

  const depoimentosParaExibir = useMemo(() => {
    const reviewsReais = Array.isArray(safeD.reviews) && safeD.reviews.length > 0 
      ? safeD.reviews 
      : (Array.isArray(safeD.avaliacoes) && safeD.avaliacoes.length > 0 ? safeD.avaliacoes : []);
    if (reviewsReais.length > 0) return reviewsReais;
    return termoBuscaNicho.includes('barbearia') || termoBuscaNicho.includes('barber') ? REVIEWS_BARBEARIA : REVIEWS_CLINICA;
  }, [safeD.reviews, safeD.avaliacoes, termoBuscaNicho]);

  const configNicho = useMemo(() => {
    if (termoBuscaNicho.includes('barbearia') || termoBuscaNicho.includes('barbeiro') || termoBuscaNicho.includes('barber')) {
      return {
        servicosPadrao: SERVICOS_BARBEARIA,
        tituloSecao: 'Nossos Serviços',
        textoBotaoAgendar: 'Agendar Horário via WhatsApp',
        IconeHeader: Scissors,
        estiloCores: {
          bgCard: 'bg-[#18181b]',
          bordaCard: 'border-zinc-800',
          hoverBorda: 'hover:border-amber-500',
          textoTituloGeral: 'text-amber-500',
          textoTituloCard: 'text-zinc-100 group-hover:text-amber-400',
          textoDescCard: 'text-zinc-400',
          btnRapido: 'inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-800 bg-[#18181b] hover:bg-zinc-800 hover:border-amber-500 text-zinc-100 text-xs font-bold transition-all duration-300 shadow-md hover:scale-[1.02]',
          btnWhatsapp: 'w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black py-4 px-6 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.005]',
          corIcone: 'text-amber-500',
          tagStatus: 'bg-[#18181b] border-zinc-800 text-amber-400',
          gradeHorarioBg: 'bg-[#18181b] border-zinc-800',
          gradeHorarioTexto: 'text-amber-400'
        }
      };
    }
    if (termoBuscaNicho.includes('hamburguer') || termoBuscaNicho.includes('burger') || termoBuscaNicho.includes('pizza') || termoBuscaNicho.includes('restaurante')) {
      return {
        servicosPadrao: SERVICOS_HAMBURGUERIA,
        tituloSecao: 'Cardápio & Destaques',
        textoBotaoAgendar: 'Fazer Pedido via WhatsApp',
        IconeHeader: Utensils,
        estiloCores: {
          bgCard: 'bg-[#2a1208]',
          bordaCard: 'border-amber-900/60',
          hoverBorda: 'hover:border-orange-500',
          textoTituloGeral: 'text-orange-500',
          textoTituloCard: 'text-white group-hover:text-amber-400',
          textoDescCard: 'text-amber-100/80',
          btnRapido: 'inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-900/50 bg-[#2a1208] hover:bg-[#431c0a] hover:border-orange-500 text-white text-xs font-bold transition-all duration-300 shadow-md hover:scale-[1.02]',
          btnWhatsapp: 'w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.005]',
          corIcone: 'text-orange-500',
          tagStatus: 'bg-[#2a1208] border-amber-900/50 text-amber-400',
          gradeHorarioBg: 'bg-[#2a1208] border-amber-900/60',
          gradeHorarioTexto: 'text-amber-400'
        }
      };
    }
    return {
      servicosPadrao: SERVICOS_CLINICA,
      tituloSecao: 'Nossas Especialidades',
      textoBotaoAgendar: 'Agendar Consulta / Avaliação via WhatsApp',
      IconeHeader: HeartPulse,
      estiloCores: {
        bgCard: 'bg-[#022c22]',
        bordaCard: 'border-emerald-900/60',
        hoverBorda: 'hover:border-orange-500',
        textoTituloGeral: 'text-[#022c22]',
        textoTituloCard: 'text-white group-hover:text-orange-400',
        textoDescCard: 'text-emerald-100/80',
        btnRapido: 'inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-900/50 bg-[#022c22] hover:bg-[#064e3b] hover:border-orange-500 text-white text-xs font-bold transition-all duration-300 shadow-md hover:scale-[1.02]',
        btnWhatsapp: 'w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.005]',
        corIcone: 'text-orange-500',
        tagStatus: 'bg-[#022c22] border-emerald-900/50 text-emerald-300',
        gradeHorarioBg: 'bg-[#022c22] border-emerald-900/60',
        gradeHorarioTexto: 'text-emerald-400'
      }
    };
  }, [termoBuscaNicho]);

  const servicosReais = useMemo(() => {
    if (Array.isArray(safeD.servicos) && safeD.servicos.length > 0) {
      return safeD.servicos.map((s: any) => typeof s === 'string' ? { nome: s, desc: 'Atendimento especializado e de alta qualidade.' } : { nome: s.nome || s.titulo, desc: s.desc || s.descricao });
    }
    return configNicho.servicosPadrao;
  }, [safeD.servicos, configNicho.servicosPadrao]);

  const { estiloCores, IconeHeader, tituloSecao, textoBotaoAgendar } = configNicho;

  return (
    <div style={{ fontFamily: tema?.serif ? 'Georgia, serif' : 'inherit' }} className="w-full select-none relative scroll-smooth">
      
      {/* 1. BOTÕES DE AÇÕES RÁPIDAS */}
      <section className="max-w-6xl mx-auto px-6 pt-6 pb-10">
        {st.texto && (
          <div className="text-center mb-6">
            <span className={`inline-flex items-center gap-2 border px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm ${estiloCores.tagStatus}`}>
              <span className={`h-2 w-2 rounded-full ${st.aberto ? 'bg-emerald-400' : 'bg-red-500'}`} />
              {st.texto}
            </span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => setHorariosAbertos(!horariosAbertos)} className={estiloCores.btnRapido}>
            <Clock className={`w-4 h-4 ${estiloCores.corIcone}`} /> Horários
          </button>
          <a href="#fotos" className={estiloCores.btnRapido}>
            <Camera className={`w-4 h-4 ${estiloCores.corIcone}`} /> Fotos ({safeFotos.length})
          </a>
          <a href="#avaliacoes" className={estiloCores.btnRapido}>
            <Star className={`w-4 h-4 ${estiloCores.corIcone} fill-current`} /> Avaliações ({totalAval})
          </a>
          <a href={instaLink} target="_blank" rel="noreferrer" className={estiloCores.btnRapido}>
            <InstagramIcon className={`w-4 h-4 ${estiloCores.corIcone}`} /> Instagram
          </a>
        </div>

        {horariosAbertos && (
          <div className={`max-w-md mx-auto mt-6 border rounded-2xl p-5 text-neutral-100 shadow-xl ${estiloCores.gradeHorarioBg}`}>
            <h3 className={`font-bold text-sm mb-3 flex items-center gap-2 ${estiloCores.gradeHorarioTexto}`}><Clock className="w-4 h-4"/> Grade de Horários</h3>
            <ul className="space-y-2">
              {semana.map((l: string, idx: number) => (
                <li key={idx} className="flex justify-between text-xs py-1 border-b border-white/10 last:border-0 opacity-90">
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 2. SERVIÇOS E ESPECIALIDADES */}
      {!semServicos && (
        <section className="max-w-6xl mx-auto px-6 py-10 border-t border-zinc-800">
          <h2 className={`text-xl font-bold tracking-tight mb-6 flex items-center gap-2 ${estiloCores.textoTituloGeral}`}>
            <IconeHeader className={`w-5 h-5 ${estiloCores.corIcone}`} />
            {tituloSecao}
          </h2>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicosReais.map((s: any, idx: number) => (
                <div 
                  key={idx} 
                  className={`border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group cursor-pointer shadow-md hover:scale-[1.01] ${estiloCores.bgCard} ${estiloCores.bordaCard} ${estiloCores.hoverBorda}`}
                >
                  <div>
                    <h3 className={`font-bold text-sm mb-2 transition-colors ${estiloCores.textoTituloCard}`}>
                      {s.nome}
                    </h3>
                    <p className={`text-xs leading-relaxed ${estiloCores.textoDescCard}`}>
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
                className={estiloCores.btnWhatsapp}
              >
                <Calendar className="w-4 h-4"/>
                <span>{textoBotaoAgendar}</span>
                <ChevronRight className="w-4 h-4"/>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 3. GALERIA COMPLETA DE FOTOS */}
      {safeFotos.length > 0 && (
        <section id="fotos" className="max-w-6xl mx-auto px-6 py-10 border-t border-zinc-800">
          <h2 className={`text-xl font-bold tracking-tight mb-6 ${estiloCores.textoTituloGeral}`}>Galeria</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {safeFotos.map((f: string, i: number) => (
              <div 
                key={i} 
                onClick={() => setFotoModal(f)} 
                className="aspect-square rounded-2xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-amber-500 group relative shadow-sm bg-zinc-900"
              >
                <img 
                  src={f} 
                  alt={`Foto ${i}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
      <section id="avaliacoes" className="max-w-6xl mx-auto px-6 py-10 border-t border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <h2 className={`text-xl font-bold tracking-tight ${estiloCores.textoTituloGeral}`}>
            Avaliações no Google ({totalAval})
          </h2>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full w-fit">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className={`w-3.5 h-3.5 fill-current ${idx < Math.floor(notaAval) ? 'text-amber-400' : 'text-zinc-600'}`} />
              ))}
            </div>
            <span>{notaAval.toFixed(1)} de 5.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {depoimentosParaExibir.map((r: any, i: number) => {
            const notaCard = Number(r.nota || r.rating || 5);
            return (
              <div 
                key={i} 
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-amber-500/50 transition-all"
              >
                <div>
                  <div className="flex text-amber-400 gap-1 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className={`w-4 h-4 fill-current ${idx < notaCard ? 'text-amber-400' : 'text-zinc-700'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-300 mb-4 italic leading-relaxed">“{r.texto || r.text}”</p>
                </div>
                <strong className="text-xs text-white border-t border-zinc-800/80 pt-3 font-semibold flex items-center justify-between">
                  <span>{r.autor || r.author || 'Cliente Google'}</span>
                  <span className="text-[10px] text-zinc-500 font-normal">Google Review</span>
                </strong>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. LOCALIZAÇÃO COM MAPA NOTURNO */}
      <section className="max-w-6xl mx-auto px-6 py-10 border-t border-zinc-800 pb-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className={`text-xl font-bold tracking-tight ${estiloCores.textoTituloGeral}`}>Onde Estamos</h2>
            <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
              <MapPin className={`w-4 h-4 shrink-0 ${estiloCores.corIcone}`} />
              <span>{enderecoBusca}</span>
            </p>
          </div>
          
          <a href={urlOficialMaps} target="_blank" rel="noreferrer" className={estiloCores.btnRapido}>
            <Navigation className={`w-4 h-4 fill-current ${estiloCores.corIcone}`}/> Abrir no Google Maps
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden border border-zinc-800 h-[380px] bg-neutral-900 shadow-xl relative">
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
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 p-2.5 rounded-2xl flex items-center gap-2 shadow-2xl">
        <a href={`https://wa.me/55${telNumero}`} target="_blank" rel="noreferrer" className="flex-1 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs py-3 rounded-xl flex justify-center items-center gap-1.5 transition">
          <MessageCircle className="w-4 h-4"/> WhatsApp
        </a>
        <a href={urlOficialMaps} target="_blank" rel="noreferrer" className="flex-1 bg-zinc-950 text-white font-bold text-xs py-3 rounded-xl flex justify-center items-center gap-1.5 transition">
          <Navigation className={`w-4 h-4 ${estiloCores.corIcone}`}/> Como Chegar
        </a>
      </div>

    </div>
  );
}