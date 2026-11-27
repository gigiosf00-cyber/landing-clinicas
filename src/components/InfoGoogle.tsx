'use client';
import { useState } from 'react';
import { Clock, Camera, Star, MapPin, ChevronRight, X, Navigation, MessageCircle, Calendar, HeartPulse, Scissors, Utensils, Building2, Sparkles } from 'lucide-react';

export interface TemaInfo {
  fundo: string; 
  card: string; 
  borda: string; 
  texto: string; 
  sub: string; 
  destaque: string; 
  serif?: boolean;
}

const InstagramIcon = ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const REVIEWS_BARBEARIA = [
  { autor: 'Marcelo Silva', nota: 5, texto: 'Excelente atendimento! O corte ficou perfeito e a barba na toalha quente é sensacional.' },
  { autor: 'Rodrigo Oliveira', nota: 5, texto: 'Ambiente muito agradável, profissionais de altíssima qualidade e boa música.' },
  { autor: 'Fernando Costa', nota: 4, texto: 'Muito bom o atendimento e o corte. Vale muito a pena!' }
];

const REVIEWS_CLINICA = [
  { autor: 'Camila Alencar', nota: 5, texto: 'Profissionais extremamente atenciosos e capacitados. A fisioterapia aliviou minhas dores.' },
  { autor: 'Juliana Mendes', nota: 5, texto: 'Clínica muito limpa, organizada e com equipamentos modernos.' },
  { autor: 'Eduardo Santos', nota: 4, texto: 'Ótimo atendimento e ambiente acolhedor. Recomendo!' }
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
  { nome: 'Quiropraxia', desc: 'Ajustes articulares focados em restaurar a função da coluna e aliviar dores.' }
];

const SERVICOS_HAMBURGUERIA = [
  { nome: 'Burgers Artesanais de Blend Especial', desc: 'Carnes selecionadas preparadas no ponto ideal.' },
  { nome: 'Smash Burgers Crocantes', desc: 'Pão macio, queijo derretido e a crostinha perfeita.' },
  { nome: 'Porções & Batatas Especiais', desc: 'Acompanhamentos crocantes com molhos da casa.' },
  { nome: 'Milkshakes & Sobremesas', desc: 'Bebidas cremosas e sobremesas artesanais.' }
];

function formatarLinhaHorario(linha: string): string {
  const limpo = linha.trim();
  if (!limpo) return '';
  return limpo.charAt(0).toUpperCase() + limpo.slice(1);
}

function montarResumoHorarios(linhas: string[]): string {
  const padrao = 'Seg–Sex 08h–19h • Sáb 08h–13h';
  if (!Array.isArray(linhas) || linhas.length === 0) return padrao;

  const normalizarFaixa = (raw: string) =>
    raw
      .replace(/:00/g, 'h')
      .replace(/\s*–\s*|\s*-\s*|\s*às\s*/gi, '–')
      .replace(/\s+/g, '')
      .trim();

  const segSexLinha = linhas.find((item) => {
    const k = item.toLowerCase();
    return (
      k.includes('segunda') ||
      k.includes('terça') ||
      k.includes('terca') ||
      k.includes('quarta') ||
      k.includes('quinta') ||
      k.includes('sexta')
    );
  });

  const sabadoLinha = linhas.find((item) => {
    const k = item.toLowerCase();
    return k.includes('sábado') || k.includes('sabado');
  });

  const partes: string[] = [];

  if (segSexLinha) {
    const idxDoisPontos = segSexLinha.indexOf(':');
    const trechoHora = idxDoisPontos >= 0 ? segSexLinha.slice(idxDoisPontos + 1).trim() : segSexLinha;
    const faixaSegSex = normalizarFaixa(trechoHora);
    if (faixaSegSex && faixaSegSex.toLowerCase() !== 'fechado') {
      partes.push(`Seg–Sex ${faixaSegSex}`);
    }
  }

  if (sabadoLinha) {
    const idxDoisPontos = sabadoLinha.indexOf(':');
    const trechoHora = idxDoisPontos >= 0 ? sabadoLinha.slice(idxDoisPontos + 1).trim() : sabadoLinha;
    const faixaSab = normalizarFaixa(trechoHora);
    if (faixaSab && faixaSab.toLowerCase() !== 'fechado') {
      partes.push(`Sáb ${faixaSab}`);
    }
  }

  return partes.length > 0 ? partes.join(' • ') : padrao;
}

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
  const [categoriaFotoAtiva, setCategoriaFotoAtiva] = useState<'servicos' | 'instalacoes'>('servicos');

  const safeD = d || {};
  const safeFotos = Array.isArray(fotos) && fotos.length > 0 ? fotos : (Array.isArray(safeD.fotos) ? safeD.fotos : []);
  const safePrefixo = (prefixo || safeD.nicho || safeD.categoria || '').toLowerCase();

  const eBarbearia = safePrefixo.includes('barbearia') || safePrefixo.includes('barber');
  const eClinica = safePrefixo.includes('clinica') || safePrefixo.includes('fisioterapia') || safePrefixo.includes('medica');

  const labelServicos = eBarbearia ? 'Serviços & Cortes' : 'Serviços & Atendimento';
  const labelEspaco = eBarbearia ? 'Nosso Espaço' : eClinica ? 'Instalações & Clínica' : 'Nosso Espaço';

  const eFotoInstalacao = (url: string) => {
    const arq = (url?.split('/').pop() || '').toLowerCase();
    if (eBarbearia) {
      return /(?:^|[^0-9])(foto1|foto8|foto11)(?:[^0-9]|$)|(sede|fachada|ambiente|sala|local|espaco)/.test(arq);
    }
    return /(?:^|[^0-9])(foto2|foto3|foto11|renovar2|renovar3|renovar11)(?:[^0-9]|$)|(sede|fachada|ambiente|recepcao|consultorio|sala|local|espaco)/.test(arq);
  };

  const fotosInstalacoes = safeFotos.filter(eFotoInstalacao);
  const fotosServicos = safeFotos.filter((f: string) => !eFotoInstalacao(f));

  const listaInstalacoesExibir = fotosInstalacoes.length > 0 ? fotosInstalacoes : safeFotos;
  const listaServicosExibir = fotosServicos.length > 0 ? fotosServicos : safeFotos;
  const fotosExibidasGaleria = categoriaFotoAtiva === 'servicos' ? listaServicosExibir : listaInstalacoesExibir;

  let semana: string[] = [];
  const rawSemana = safeD.horariosSemana || safeD.horarios_semana;
  if (Array.isArray(rawSemana) && rawSemana.length > 0) {
    semana = rawSemana.map((s: string) => formatarLinhaHorario(String(s))).filter(Boolean);
  } else if (typeof safeD.horarios === 'string' && safeD.horarios.trim().length > 0) {
    const sep = safeD.horarios.includes('•') ? '•' : safeD.horarios.includes('\n') ? '\n' : ',';
    semana = safeD.horarios
      .split(sep)
      .map((s: string) => formatarLinhaHorario(s))
      .filter(Boolean);
  } else {
    semana = [
      'Segunda-feira: 08:00 – 19:00',
      'Terça-feira: 08:00 – 19:00',
      'Quarta-feira: 08:00 – 19:00',
      'Quinta-feira: 08:00 – 19:00',
      'Sexta-feira: 08:00 – 19:00',
      'Sábado: 08:00 – 13:00',
      'Domingo: Fechado'
    ];
  }

  const resumoHorarios = montarResumoHorarios(semana);

  const st = safeD.statusAgora || safeD.status_agora || { aberto: true, texto: 'Aberto agora' };
  const nomeEstabelecimento = safeD.nome || 'Estabelecimento';
  const termoBuscaNicho = (safePrefixo + ' ' + nomeEstabelecimento).toLowerCase();

  const enderecoBusca = safeD.enderecoCompleto || safeD.endereco || 'Endereço não informado';
  const urlOficialMaps = safeD.mapa && safeD.mapa !== '#' 
    ? safeD.mapa 
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeEstabelecimento + ' ' + enderecoBusca)}`;

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(nomeEstabelecimento + ' ' + enderecoBusca)}&z=17&output=embed`;

  const notaPadrao = eBarbearia ? 4.5 : 5.0;
  const totalAvalPadrao = eBarbearia ? 84 : 45;
  const notaAval = Number(safeD.avaliacao || safeD.rating || safeD.nota || notaPadrao);
  const totalAval = Number(safeD.user_ratings_total || safeD.totalAval || safeD.total_avaliacoes || totalAvalPadrao);

  const telNumero = safeD.tel || safeD.telefone || safeD.phone || '';

  const rawInsta = safeD.instagram || safeD.insta || safeD.instaUrl || '';
  let instaLink = '';
  if (rawInsta) {
    instaLink = rawInsta.startsWith('http') ? rawInsta : `https://instagram.com/${rawInsta.replace('@', '').trim()}`;
  } else {
    instaLink = `https://instagram.com/${nomeEstabelecimento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")}`;
  }

  const reviewsReais = Array.isArray(safeD.reviews) && safeD.reviews.length > 0 
    ? safeD.reviews 
    : (Array.isArray(safeD.avaliacoes) && safeD.avaliacoes.length > 0 ? safeD.avaliacoes : []);

  const depoimentosParaExibir = reviewsReais.length > 0 
    ? reviewsReais 
    : (termoBuscaNicho.includes('barbearia') || termoBuscaNicho.includes('barber') ? REVIEWS_BARBEARIA : REVIEWS_CLINICA);

  let servicosPadraoNicho = SERVICOS_CLINICA;
  let tituloSecao = 'Nossas Especialidades';
  let textoBotaoAgendar = 'AGENDAR CONSULTA / AVALIAÇÃO VIA WHATSAPP';
  let IconeHeader = HeartPulse;

  if (termoBuscaNicho.includes('barbearia') || termoBuscaNicho.includes('barbeiro') || termoBuscaNicho.includes('barber')) {
    servicosPadraoNicho = SERVICOS_BARBEARIA;
    tituloSecao = 'Nossos Serviços';
    textoBotaoAgendar = 'AGENDAR HORÁRIO VIA WHATSAPP';
    IconeHeader = Scissors;
  } else if (termoBuscaNicho.includes('hamburguer') || termoBuscaNicho.includes('burger') || termoBuscaNicho.includes('pizza') || termoBuscaNicho.includes('restaurante')) {
    servicosPadraoNicho = SERVICOS_HAMBURGUERIA;
    tituloSecao = 'Cardápio & Destaques';
    textoBotaoAgendar = 'FAZER PEDIDO VIA WHATSAPP';
    IconeHeader = Utensils;
  }

  const servicosDoLead = Array.isArray(safeD.servicos) && safeD.servicos.length > 0 
    ? safeD.servicos.map((s: any) => typeof s === 'string' ? { nome: s, desc: 'Atendimento especializado e de alta qualidade.' } : { nome: s.nome || s.titulo, desc: s.desc || s.descricao })
    : [];

  const servicosReais = servicosDoLead.length > 0 ? servicosDoLead : servicosPadraoNicho;

  const corMarcaPadrao = eBarbearia ? '#d4af37' : '#059669';
  const corDestaquePadrao = eBarbearia ? '#d97706' : '#0f766e';

  const corMarcaDinamica = `var(--cor-marca, ${corMarcaPadrao})`;
  const corDestaqueDinamica = `var(--cor-destaque, ${corDestaquePadrao})`;
  const corTextoBotaoDinamica = 'var(--cor-texto-botao, #ffffff)';

  const isVintage = Boolean(tema?.serif);
  const isMinimal = !isVintage && (tema?.fundo || '').includes('#fafaf9');

  const cardBg = isMinimal ? 'bg-white' : isVintage ? 'bg-[#ffffff]' : (tema?.card || (eBarbearia ? 'bg-[#17130d]' : 'bg-[#0e1815]'));
  const fundoBg = isMinimal ? 'bg-stone-50/70' : isVintage ? (eBarbearia ? 'bg-[#f6f1e7]' : 'bg-[#f5efe6]') : (tema?.fundo || (eBarbearia ? 'bg-[#0d0b08]' : 'bg-[#060d0a]'));
  const bordaClass = isMinimal ? 'border-stone-200' : isVintage ? (eBarbearia ? 'border-[#dfd2b8]' : 'border-[#e0d3c1]') : (tema?.borda || (eBarbearia ? 'border-amber-500/25' : 'border-emerald-500/30'));

  const textCardTitulo = isMinimal ? 'text-stone-900' : isVintage ? 'text-[#1c1917]' : 'text-white';
  const textCardDesc = isMinimal ? 'text-stone-600' : isVintage ? 'text-[#44382e] font-sans' : 'text-zinc-200/90';
  const textTabInactive = isMinimal ? 'text-stone-600 hover:text-stone-900' : isVintage ? 'text-[#44382e]' : 'text-zinc-300 opacity-75 hover:opacity-100';

  return (
    <div style={{ fontFamily: isVintage ? 'Georgia, serif' : 'inherit' }} className={`w-full relative scroll-smooth ${isMinimal ? 'text-stone-900' : isVintage ? 'text-[#1c1917]' : (tema?.texto || 'text-white')}`}>
      
      {/* 1. BOTÕES DE AÇÕES RÁPIDAS */}
      <section className="max-w-5xl mx-auto px-6 pt-4 pb-10">
        {st.texto && (
          <div className="text-center mb-5">
            <span className={`inline-flex items-center gap-2 border ${bordaClass} ${cardBg} px-4 py-1.5 rounded-full text-xs font-medium ${textCardTitulo}`}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: st.aberto ? corMarcaDinamica : '#ef4444' }} />
              {st.texto}
            </span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-3 justify-center items-start">
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setHorariosAbertos(!horariosAbertos)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border ${bordaClass} ${cardBg} text-xs font-semibold transition cursor-pointer ${textCardTitulo}`}
            >
              <Clock className="w-4 h-4" style={{ color: corDestaqueDinamica }} /> Horários
            </button>
            <p className={`text-xs mt-2 text-center whitespace-nowrap ${isMinimal ? 'text-stone-600' : ''}`} style={!isMinimal ? { color: corMarcaDinamica } : undefined}>
              {resumoHorarios}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <a 
              href="#avaliacoes" 
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border ${bordaClass} ${cardBg} text-xs font-semibold transition ${textCardTitulo}`}
            >
              <Star className="w-4 h-4 fill-current" style={{ color: corDestaqueDinamica }} /> Avaliações
            </a>
            <p className={`text-xs mt-2 text-center whitespace-nowrap ${isMinimal ? 'text-stone-600' : ''}`} style={!isMinimal ? { color: corMarcaDinamica } : undefined}>
              ★ {notaAval.toFixed(1)} • {totalAval} avaliações no Google
            </p>
          </div>

          <div className="flex flex-col items-center">
            <a href="#fotos" className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border ${bordaClass} ${cardBg} text-xs font-semibold transition ${textCardTitulo}`}>
              <Camera className="w-4 h-4" style={{ color: corDestaqueDinamica }} /> Fotos ({safeFotos.length})
            </a>
          </div>

          <div className="flex flex-col items-center">
            <a href={instaLink} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border ${bordaClass} ${cardBg} text-xs font-semibold transition ${textCardTitulo}`}>
              <InstagramIcon className="w-4 h-4" style={{ color: corDestaqueDinamica }} /> Instagram
            </a>
          </div>
        </div>

        {horariosAbertos && (
          <div className={`max-w-md mx-auto mt-6 border ${bordaClass} ${cardBg} rounded-xl p-5`}>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: isMinimal ? '#1c1917' : corMarcaDinamica }}>
              <Clock className="w-4 h-4" style={{ color: corDestaqueDinamica }} /> Grade de Horários
            </h3>
            <ul className="space-y-2">
              {semana.map((l: string, idx: number) => (
                <li key={idx} className={`flex justify-between text-xs py-1 border-b ${bordaClass} last:border-0 ${textCardDesc}`}>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 2. SERVIÇOS */}
      {!semServicos && (
        <section className={`max-w-5xl mx-auto px-6 py-10 border-t ${bordaClass}`}>
          <h2 className={`text-xl font-semibold tracking-tight mb-6 flex items-center gap-2 ${isMinimal ? 'text-stone-900' : ''}`} style={!isMinimal ? { color: corMarcaDinamica } : undefined}>
            <IconeHeader className="w-5 h-5" style={{ color: corDestaqueDinamica }} />
            {tituloSecao}
          </h2>

          <div className={`border ${bordaClass} ${fundoBg} rounded-2xl p-6 space-y-6`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicosReais.map((s: any, idx: number) => (
                <div 
                  key={idx} 
                  className={`border ${bordaClass} ${cardBg} rounded-xl p-4 flex flex-col justify-between transition`}
                >
                  <div>
                    <h3 className={`font-semibold text-sm mb-1.5 ${textCardTitulo}`}>
                      {s.nome}
                    </h3>
                    <p className={`text-xs leading-relaxed ${textCardDesc}`}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {telNumero && (
              <div className="pt-1">
                <a 
                  href={`https://wa.me/55${telNumero}?text=${encodeURIComponent(`Olá! Gostaria de agendar um horário na ${nomeEstabelecimento}.`)}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ 
                    backgroundColor: corDestaqueDinamica,
                    color: corTextoBotaoDinamica 
                  }}
                  className="w-full hover:opacity-90 font-semibold py-3.5 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4"/>
                  <span>{textoBotaoAgendar}</span>
                  <ChevronRight className="w-4 h-4"/>
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. GALERIA DE FOTOS */}
      {safeFotos.length > 0 && (
        <section id="fotos" className={`max-w-5xl mx-auto px-6 py-10 border-t ${bordaClass}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className={`text-xl font-semibold tracking-tight ${isMinimal ? 'text-stone-900' : ''}`} style={!isMinimal ? { color: corMarcaDinamica } : undefined}>
                Galeria de Fotos
              </h2>
              <p className={`text-xs ${textCardDesc} mt-1`}>
                Explore os nossos trabalhos e conheça a nossa estrutura.
              </p>
            </div>

            <div className={`flex items-center gap-1.5 border ${bordaClass} ${cardBg} p-1 rounded-lg w-fit`}>
              <button
                onClick={() => setCategoriaFotoAtiva('servicos')}
                style={categoriaFotoAtiva === 'servicos' ? { backgroundColor: corDestaqueDinamica, color: corTextoBotaoDinamica } : {}}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                  categoriaFotoAtiva !== 'servicos' ? textTabInactive : ''
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{labelServicos}</span>
              </button>

              <button
                onClick={() => setCategoriaFotoAtiva('instalacoes')}
                style={categoriaFotoAtiva === 'instalacoes' ? { backgroundColor: corDestaqueDinamica, color: corTextoBotaoDinamica } : {}}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                  categoriaFotoAtiva !== 'instalacoes' ? textTabInactive : ''
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{labelEspaco}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {fotosExibidasGaleria.map((f: string, i: number) => (
              <div 
                key={i} 
                onClick={() => setFotoModal(f)} 
                className={`aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border ${bordaClass} ${cardBg} group relative`}
              >
                <img 
                  src={f} 
                  alt={`Foto ${i}`} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white"/>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MODAL LIGHTBOX FOTOS */}
      {fotoModal && (
        <div onClick={() => setFotoModal(null)} className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-pointer">
          <img src={fotoModal} alt="Foto Ampliada" className={`max-w-full max-h-[85vh] rounded-xl border ${bordaClass} object-contain`} />
          <button className="absolute top-6 right-6 text-white p-2.5 rounded-full bg-black/80 border border-white/20 hover:bg-black transition">
            <X className="w-6 h-6"/>
          </button>
        </div>
      )}

      {/* 4. AVALIAÇÕES DO GOOGLE */}
      <section id="avaliacoes" className={`max-w-5xl mx-auto px-6 py-10 border-t ${bordaClass}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <h2 className={`text-xl font-semibold tracking-tight ${isMinimal ? 'text-stone-900' : ''}`} style={!isMinimal ? { color: corMarcaDinamica } : undefined}>
            Avaliações no Google ({totalAval})
          </h2>
          <div className={`flex items-center gap-2 text-xs font-semibold border ${bordaClass} ${cardBg} px-3 py-1.5 rounded-full w-fit ${isMinimal ? 'text-stone-800' : ''}`} style={!isMinimal ? { color: corMarcaDinamica } : undefined}>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-3.5 h-3.5 fill-current" style={{ color: idx < Math.floor(notaAval) ? corDestaqueDinamica : '#d1d5db' }} />
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
                className={`border ${bordaClass} ${cardBg} rounded-xl p-5 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" style={{ color: idx < notaCard ? corDestaqueDinamica : '#d1d5db' }} />
                    ))}
                  </div>
                  <p className={`text-xs mb-4 leading-relaxed ${textCardDesc}`}>“{r.texto || r.text}”</p>
                </div>
                <strong className={`text-xs border-t ${bordaClass} pt-3 font-semibold flex items-center justify-between ${textCardTitulo}`}>
                  <span>{r.autor || r.author || 'Cliente Google'}</span>
                  <span className={`text-[10px] font-normal ${isMinimal ? 'text-stone-500' : ''}`} style={!isMinimal ? { color: corMarcaDinamica } : undefined}>Google Review</span>
                </strong>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. LOCALIZAÇÃO */}
      <section className={`max-w-5xl mx-auto px-6 py-10 border-t ${bordaClass} pb-24`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className={`text-xl font-semibold tracking-tight ${isMinimal ? 'text-stone-900' : ''}`} style={!isMinimal ? { color: corMarcaDinamica } : undefined}>Onde Estamos</h2>
            <p className={`text-xs ${textCardDesc} flex items-center gap-1.5 mt-1`}>
              <MapPin className="w-4 h-4 shrink-0" style={{ color: corDestaqueDinamica }} />
              <span>{enderecoBusca}</span>
            </p>
          </div>
          
          <a href={urlOficialMaps} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border ${bordaClass} ${cardBg} text-xs font-semibold transition ${textCardTitulo}`}>
            <Navigation className="w-4 h-4" style={{ color: corDestaqueDinamica }} /> Abrir no Google Maps
          </a>
        </div>

        <div className={`rounded-xl overflow-hidden border ${bordaClass} ${cardBg} h-[360px] relative`}>
          <iframe 
            src={mapEmbedUrl} 
            width="100%" 
            height="100%" 
            style={{
              border: 0,
              filter: isMinimal ? 'none' : 'invert(0.9) hue-rotate(180deg) contrast(1.25) brightness(0.9)'
            }} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade" 
            className="w-full h-full block"
          />
        </div>
      </section>

      {/* DOCK MOBILE FIXO */}
      {telNumero && (
        <div className={`sm:hidden fixed bottom-4 left-4 right-4 z-50 backdrop-blur-md border ${bordaClass} ${cardBg}/95 p-2 rounded-xl flex items-center gap-2 shadow-lg`}>
          <a 
            href={`https://wa.me/55${telNumero}`} 
            target="_blank" 
            rel="noreferrer" 
            style={{ 
              backgroundColor: corDestaqueDinamica,
              color: corTextoBotaoDinamica 
            }}
            className="flex-1 font-semibold text-xs py-2.5 rounded-lg flex justify-center items-center gap-1.5 transition hover:opacity-90"
          >
            <MessageCircle className="w-4 h-4"/> WhatsApp
          </a>
          <a href={urlOficialMaps} target="_blank" rel="noreferrer" className={`flex-1 ${cardBg} ${textCardTitulo} font-semibold text-xs py-2.5 rounded-lg flex justify-center items-center gap-1.5 transition border ${bordaClass}`}>
            <Navigation className="w-4 h-4" style={{ color: corDestaqueDinamica }} /> Como Chegar
          </a>
        </div>
      )}

    </div>
  );
}