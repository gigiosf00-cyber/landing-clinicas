import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ─────────────────────────────────────────────────────────────
// Tipagem do Lead (campos do active_lead.json)
// ─────────────────────────────────────────────────────────────
interface Lead {
  nome?: string;
  endereco?: string;
  telefone?: string;
  nicho?: string;
  cidade?: string;
  estado?: string;
  categoria?: string;
  fotos?: string[];
  fotos_ambiente?: string[];
  avaliacao?: number;
  total_avaliacoes?: number;
  horarios?: string;
  servicos?: string[];
  maps_url?: string;
  instagram?: string;
  facebook?: string;
}

// ─────────────────────────────────────────────────────────────
// Leitura do active_lead.json
// ─────────────────────────────────────────────────────────────
function getActiveLead(): Lead | null {
  const filePath = path.join(process.cwd(), 'src', 'data', 'active_lead.json');
  if (!fs.existsSync(filePath)) return null;
  try {
    const fileData = fs.readFileSync(filePath, 'utf8').trim();
    if (fileData && fileData.startsWith('{') && fileData.endsWith('}')) {
      const parsed = JSON.parse(fileData);
      return parsed?.lead ? parsed.lead : parsed;
    }
  } catch (err) {
    console.error('Erro ao ler lead:', err);
  }
  return null;
}

// ─────────────────────────────────────────────────────────────
// Serviços padrão por nicho (fallback se lead.servicos estiver vazio)
// ─────────────────────────────────────────────────────────────
interface Servico {
  nome: string;
  icone: string;
}

const SERVICOS_PADRAO: Record<string, Servico[]> = {
  barbearia: [
    { nome: 'Corte Masculino',          icone: '✂️' },
    { nome: 'Barba Desenhada',          icone: '🪒' },
    { nome: 'Combo Corte + Barba',      icone: '💈' },
    { nome: 'Sobrancelha',              icone: '👁️' },
    { nome: 'Depilação (orelha/nariz)', icone: '🧖' },
    { nome: 'Prótese Capilar',          icone: '👤' },
    { nome: 'Barboterapia',             icone: '🧴' },
    { nome: 'Hidratação & Botox',       icone: '💎' },
  ],
  salao: [
    { nome: 'Corte Feminino',       icone: '✂️' },
    { nome: 'Coloração',            icone: '🎨' },
    { nome: 'Escova Progressiva',   icone: '💇' },
    { nome: 'Manicure & Pedicure',  icone: '💅' },
    { nome: 'Hidratação Capilar',   icone: '💧' },
    { nome: 'Design de Sobrancelha',icone: '👁️' },
  ],
  clinica: [
    { nome: 'Consulta Clínica',     icone: '🩺' },
    { nome: 'Exames Laboratoriais', icone: '🧬' },
    { nome: 'Raio-X & Imagem',      icone: '🏥' },
    { nome: 'Fisioterapia',         icone: '💪' },
    { nome: 'Nutrição',             icone: '🥗' },
    { nome: 'Psicologia',           icone: '🧠' },
  ],
  restaurante: [
    { nome: 'Almoço Executivo',     icone: '🍽️' },
    { nome: 'À La Carte',           icone: '📋' },
    { nome: 'Delivery',             icone: '🛵' },
    { nome: 'Sobremesas',           icone: '🍮' },
    { nome: 'Bebidas & Bar',        icone: '🍺' },
    { nome: 'Eventos & Reservas',   icone: '🎉' },
  ],
  mecanica: [
    { nome: 'Troca de Óleo',        icone: '🛢️' },
    { nome: 'Freios & Suspensão',   icone: '🔧' },
    { nome: 'Alinhamento',          icone: '🚗' },
    { nome: 'Diagnóstico Eletrônico',icone:'💻' },
    { nome: 'Revisão Completa',     icone: '🔩' },
    { nome: 'Ar Condicionado',      icone: '❄️' },
  ],
  default: [
    { nome: 'Atendimento Personalizado', icone: '⭐' },
    { nome: 'Serviço Profissional',      icone: '🏆' },
    { nome: 'Qualidade Garantida',       icone: '✅' },
    { nome: 'Atendimento Rápido',        icone: '⚡' },
    { nome: 'Suporte Especializado',     icone: '🎯' },
    { nome: 'Preço Justo',              icone: '💎' },
  ],
};

function getServicos(lead: Lead): Servico[] {
  // 1. Usa serviços do lead se disponíveis
  if (lead.servicos && lead.servicos.length > 0) {
    return lead.servicos.map((s) => ({ nome: s, icone: '✅' }));
  }
  // 2. Detecta por nicho ou categoria
  const texto = `${lead.nicho || ''} ${lead.categoria || ''}`.toLowerCase();
  if (texto.includes('barbearia') || texto.includes('barber')) return SERVICOS_PADRAO.barbearia;
  if (texto.includes('salao') || texto.includes('salão') || texto.includes('beleza') || texto.includes('cabele')) return SERVICOS_PADRAO.salao;
  if (texto.includes('clinica') || texto.includes('clínica') || texto.includes('consultorio') || texto.includes('consultório') || texto.includes('medic')) return SERVICOS_PADRAO.clinica;
  if (texto.includes('restaurante') || texto.includes('hamburguer') || texto.includes('pizza') || texto.includes('lanch')) return SERVICOS_PADRAO.restaurante;
  if (texto.includes('mecanica') || texto.includes('mecânica') || texto.includes('oficina') || texto.includes('eletrica') || texto.includes('elétrica')) return SERVICOS_PADRAO.mecanica;
  return SERVICOS_PADRAO.default;
}

// ─────────────────────────────────────────────────────────────
// Renderiza estrelas de avaliação
// ─────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  const full  = Math.min(5, Math.floor(rating));
  const half  = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <span className="text-[#c8a96e] text-base tracking-tight">
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Ícone WhatsApp (SVG inline)
// ─────────────────────────────────────────────────────────────
function IconeWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.537 4.049 1.475 5.754L0 24l6.346-1.445A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.365l-.36-.214-3.715.847.863-3.61-.234-.373A9.818 9.818 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Ícone Google Maps (SVG inline)
// ─────────────────────────────────────────────────────────────
function IconeMaps() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4285F4"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// PÁGINA PRINCIPAL
// ─────────────────────────────────────────────────────────────
export default function MinimalistaPremiumPage() {
  const lead: Lead = getActiveLead() || {
    nome:     'Barbearia Exemplo',
    endereco: 'Rua das Flores, 123',
    telefone: '(11) 99999-9999',
    categoria:'Barbearia Premium',
    cidade:   'São Paulo',
    estado:   'SP',
    fotos:    [],
  };

  // ── Fotos ──────────────────────────────────────────────────────────────────
  const todasFotos: string[] =
    (lead.fotos && lead.fotos.length > 0)
      ? lead.fotos
      : lead.fotos_ambiente && lead.fotos_ambiente.length > 0
        ? lead.fotos_ambiente
        : [
            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200',
            'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200',
            'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200',
            'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200',
          ];

  const fotoPrincipal  = todasFotos[0] || '';
  const fotosGaleria   = todasFotos.slice(1, 5);   // até 4 fotos na galeria

  // ── Links ──────────────────────────────────────────────────────────────────
  const telLimpo = lead.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const nomeCod  = encodeURIComponent(lead.nome || '');
  const enderecoCod = encodeURIComponent(
    `${lead.endereco}, ${lead.cidade}, ${lead.estado}`
  );

  const whatsappURL = telLimpo
    ? `https://wa.me/55${telLimpo}?text=Olá!%20Gostaria%20de%20agendar%20um%20horário%20na%20${nomeCod}.`
    : '';

  // Como Chegar — usa maps_url do lead (scraping) ou monta URL de direções
  const comoChegar = lead.maps_url
    ? lead.maps_url
    : `https://www.google.com/maps/dir/?api=1&destination=${enderecoCod}`;

  // Ver no Maps — busca pelo nome+cidade
  const verNoMaps = `https://www.google.com/maps/search/${encodeURIComponent(
    `${lead.nome} ${lead.cidade}`
  )}`;

  // ── Avaliação ──────────────────────────────────────────────────────────────
  const temRating = typeof lead.avaliacao === 'number' && lead.avaliacao > 0;

  // ── Serviços ──────────────────────────────────────────────────────────────
  const servicos = getServicos(lead);

  // ── Categoria / nicho exibição ────────────────────────────────────────────
  const categoriaExibir = lead.categoria || lead.nicho || 'Estabelecimento Premium';

  return (
    <>
    <style>{`
      .srv-card:hover {
        border-color: rgba(200,169,110,0.40) !important;
        background-color: #141414 !important;
      }
      .galeria-img:hover {
        transform: scale(1.06);
      }
      .btn-maps:hover {
        opacity: 0.88 !important;
      }
    `}</style>
    <main
      className="min-h-screen font-sans"
      style={{ backgroundColor: '#0a0a0a', color: '#f0f0f0' }}
    >
      {/* ═══════════════════════════════════════════════════════════
          BARRA DE PROPOSTA — slim topo
      ════════════════════════════════════════════════════════════ */}
      <div
        style={{
          background: 'linear-gradient(90deg, #7a5500 0%, #c8a96e 50%, #7a5500 100%)',
          color: '#000',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          textAlign: 'center',
          padding: '8px 16px',
        }}
      >
        ✦ Proposta Digital Exclusiva para {lead.nome} ✦
      </div>

      {/* ═══════════════════════════════════════════════════════════
          HEADER STICKY — 1 ÚNICO CTA (WhatsApp)
      ════════════════════════════════════════════════════════════ */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #1a1a1a',
        }}
      >
        <div
          style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* Marca */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>💈</span>
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                }}
              >
                {lead.nome}
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '10px',
                  color: '#555',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {categoriaExibir}
              </span>
            </div>
          </div>

          {/* CTA único — WhatsApp */}
          {whatsappURL ? (
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#25d366',
                color: '#000',
                fontWeight: 700,
                fontSize: '12px',
                padding: '9px 18px',
                borderRadius: '8px',
                textDecoration: 'none',
                flexShrink: 0,
                boxShadow: '0 4px 20px rgba(37,211,102,0.2)',
                transition: 'background 0.2s',
              }}
            >
              <IconeWhatsApp />
              Agendar via WhatsApp
            </a>
          ) : (
            /* Sem telefone: mostra o endereço no lugar */
            <span style={{ fontSize: '12px', color: '#555' }}>
              📍 {lead.cidade}
            </span>
          )}
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          HERO — foto full-bleed + gradiente + nome grande
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          height: 'min(88vh, 700px)',
          minHeight: '440px',
          overflow: 'hidden',
        }}
      >
        {/* Foto de fundo */}
        {fotoPrincipal && (
          <img
            src={fotoPrincipal}
            alt={lead.nome}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.30) saturate(0.8)',
              transform: 'scale(1.04)',
            }}
          />
        )}

        {/* Gradiente duplo: topo escuro + base muito escura */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.55) 40%, rgba(10,10,10,0.10) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(10,10,10,0.70) 0%, transparent 60%)',
          }}
        />

        {/* Conteúdo hero */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 32px 56px',
            maxWidth: '1152px',
            margin: '0 auto',
            width: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {/* Badge rating */}
          {temRating && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(200,169,110,0.12)',
                  border: '1px solid rgba(200,169,110,0.30)',
                  borderRadius: '999px',
                  padding: '6px 14px',
                }}
              >
                <Stars rating={lead.avaliacao!} />
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>
                  {lead.avaliacao!.toFixed(1).replace('.', ',')}
                </span>
                {lead.total_avaliacoes && lead.total_avaliacoes > 0 && (
                  <span style={{ color: '#888', fontSize: '12px' }}>
                    ({lead.total_avaliacoes.toLocaleString('pt-BR')} avaliações)
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#c8a96e',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  backgroundColor: 'rgba(200,169,110,0.08)',
                  border: '1px solid rgba(200,169,110,0.20)',
                  borderRadius: '999px',
                  padding: '4px 12px',
                }}
              >
                ✓ Verificado Google Maps
              </span>
            </div>
          )}

          {/* Nome */}
          <h1
            style={{
              fontSize: 'clamp(36px, 8vw, 72px)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              marginBottom: '10px',
            }}
          >
            {lead.nome}
          </h1>

          {/* Linha dourada */}
          <div
            style={{
              width: '56px',
              height: '3px',
              background: 'linear-gradient(90deg, #c8a96e, transparent)',
              marginBottom: '16px',
            }}
          />

          {/* Categoria e cidade */}
          <p
            style={{
              color: '#999',
              fontSize: '14px',
              marginBottom: '24px',
            }}
          >
            {categoriaExibir}
            {lead.cidade ? ` · ${lead.cidade}` : ''}
            {lead.estado  ? `, ${lead.estado}` : ''}
          </p>

          {/* Cidade · categoria apenas — sem botão duplicado (Maps está na seção Como Chegar) */}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          INFO STRIP — endereço · telefone · horário
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: '#111111',
          borderTop: '1px solid #1a1a1a',
          borderBottom: '1px solid #1a1a1a',
        }}
      >
        <div
          style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Endereço */}
          {lead.endereco && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px', color: '#c8a96e', flexShrink: 0, marginTop: '2px' }}>📍</span>
              <div>
                <p
                  style={{
                    fontSize: '10px',
                    color: '#555',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}
                >
                  Localização
                </p>
                <p style={{ fontSize: '13px', color: '#ddd', lineHeight: 1.5 }}>{lead.endereco}</p>
                <p style={{ fontSize: '11px', color: '#666' }}>
                  {lead.cidade}
                  {lead.estado ? ` — ${lead.estado}` : ''}
                </p>
              </div>
            </div>
          )}

          {/* Telefone */}
          {lead.telefone && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px', color: '#c8a96e', flexShrink: 0, marginTop: '2px' }}>📞</span>
              <div>
                <p
                  style={{
                    fontSize: '10px',
                    color: '#555',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}
                >
                  Contato
                </p>
                <p style={{ fontSize: '13px', color: '#ddd' }}>{lead.telefone}</p>
                <p style={{ fontSize: '11px', color: '#666' }}>Atendimento rápido</p>
              </div>
            </div>
          )}

          {/* Horários */}
          {lead.horarios ? (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px', color: '#c8a96e', flexShrink: 0, marginTop: '2px' }}>🕐</span>
              <div>
                <p
                  style={{
                    fontSize: '10px',
                    color: '#555',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}
                >
                  Funcionamento
                </p>
                <p style={{ fontSize: '13px', color: '#ddd', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                  {lead.horarios}
                </p>
              </div>
            </div>
          ) : (
            /* Sem horários: exibe mensagem genérica */
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px', color: '#c8a96e', flexShrink: 0, marginTop: '2px' }}>🕐</span>
              <div>
                <p
                  style={{
                    fontSize: '10px',
                    color: '#555',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}
                >
                  Funcionamento
                </p>
                <p style={{ fontSize: '13px', color: '#ddd' }}>Seg–Sáb</p>
                <p style={{ fontSize: '11px', color: '#666' }}>Consulte horários pelo WhatsApp</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVIÇOS
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '72px 24px',
        }}
      >
        <div style={{ marginBottom: '40px' }}>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#c8a96e',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              marginBottom: '8px',
            }}
          >
            O que oferecemos
          </p>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            Nossos Serviços
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px',
          }}
        >
          {servicos.map((s: Servico, i: number) => (
            <div
              key={i}
              style={{
                backgroundColor: '#111111',
                border: '1px solid #1e1e1e',
                borderRadius: '14px',
                padding: '22px 18px',
                transition: 'border-color 0.2s, background 0.2s',
                cursor: 'default',
              }}
              className="srv-card"
            >
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '10px' }}>
                {s.icone}
              </span>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#ddd',
                  lineHeight: 1.4,
                }}
              >
                {s.nome}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          GALERIA DE FOTOS (somente se houver fotos além da principal)
      ════════════════════════════════════════════════════════════ */}
      {fotosGaleria.length > 0 && (
        <section
          style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: '0 24px 72px',
            borderTop: '1px solid #1a1a1a',
            paddingTop: '64px',
          }}
        >
          <div style={{ marginBottom: '36px' }}>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#c8a96e',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                marginBottom: '8px',
              }}
            >
              Instalações
            </p>
            <h2
              style={{
                fontSize: 'clamp(26px, 4vw, 38px)',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              Nosso Espaço
            </h2>
          </div>

          {/* Grid masonry simples: 1ª foto ocupa 2 colunas se houver 3+ fotos */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '12px',
            }}
          >
            {fotosGaleria.map((foto: string, idx: number) => (
              <div
                key={idx}
                style={{
                  overflow: 'hidden',
                  borderRadius: '14px',
                  border: '1px solid #1e1e1e',
                  backgroundColor: '#111',
                  height: idx === 0 && fotosGaleria.length >= 3 ? '320px' : '220px',
                  gridColumn: idx === 0 && fotosGaleria.length >= 3 ? 'span 2' : 'span 1',
                }}
              >
                <img
                  src={foto}
                  alt={`${lead.nome} — Foto ${idx + 2}`}
                  className="galeria-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.7s ease',
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          COMO CHEGAR — seção com botão Google Maps
      ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '0 24px 80px',
        }}
      >
        <div
          style={{
            backgroundColor: '#111111',
            border: '1px solid #1e1e1e',
            borderRadius: '20px',
            padding: '48px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#c8a96e',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                marginBottom: '8px',
              }}
            >
              Localização
            </p>
            <h2
              style={{
                fontSize: 'clamp(24px, 4vw, 34px)',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.02em',
                marginBottom: '12px',
              }}
            >
              Como Chegar
            </h2>
            <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.7 }}>
              {lead.endereco}
              <br />
              <span style={{ color: '#555' }}>
                {lead.cidade}
                {lead.estado ? `, ${lead.estado}` : ''}
              </span>
            </p>
          </div>

          {/* Botão "Abrir no Google Maps" */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <a
              href={comoChegar}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#ffffff',
                color: '#111',
                fontWeight: 700,
                fontSize: '13px',
                padding: '14px 28px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                transition: 'opacity 0.2s',
                flexShrink: 0,
              }}
              className="btn-maps"
            >
              <IconeMaps />
              Traçar Rota no Google Maps
            </a>

            {/* Sem link duplicado — um botão de rota é suficiente */}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER — apenas texto, SEM botão
      ════════════════════════════════════════════════════════════ */}
      <footer
        style={{
          borderTop: '1px solid #1a1a1a',
          backgroundColor: '#0a0a0a',
          padding: '36px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1152px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div>
            <span
              style={{ color: '#c8a96e', fontWeight: 700, fontSize: '13px' }}
            >
              {lead.nome}
            </span>
            <p style={{ color: '#333', fontSize: '11px', marginTop: '4px' }}>
              {lead.endereco} — {lead.cidade}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              fontSize: '11px',
              color: '#444',
            }}
          >
            {lead.telefone && <span>{lead.telefone}</span>}
            <span>·</span>
            <span suppressHydrationWarning>© {new Date().getFullYear()} {lead.nome}</span>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
