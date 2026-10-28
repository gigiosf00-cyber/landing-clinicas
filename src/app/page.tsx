import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ─────────────────────────────────────────────────────────────
// Tipagem do Lead
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

interface Servico {
  nome: string;
  icone: string;
}

// Helper para normalizar textos e slugs
function slugify(s: string): string {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

// ─────────────────────────────────────────────────────────────
// Busca de Fotos Locais em public/fotos/
// ─────────────────────────────────────────────────────────────
function getLocalPhotos(leadNome?: string): string[] {
  const pastaPublicFotos = path.join(process.cwd(), 'public', 'fotos');
  if (!fs.existsSync(pastaPublicFotos)) return [];

  const termosAlvo = [leadNome, slugify(leadNome || '')].filter(Boolean) as string[];

  try {
    const itens = fs.readdirSync(pastaPublicFotos, { withFileTypes: true });

    for (const item of itens) {
      if (!item.isDirectory()) continue;
      const nomePasta = item.name;
      const slugPasta = slugify(nomePasta);

      const encontrou = termosAlvo.some((termo) => {
        const slugTermo = slugify(termo);
        if (!slugTermo) return false;
        const palavrasChave = slugTermo.split('-').filter((p) => p.length > 3);
        return (
          slugPasta === slugTermo ||
          slugPasta.includes(slugTermo) ||
          slugTermo.includes(slugPasta) ||
          palavrasChave.some((p) => slugPasta.includes(p))
        );
      });

      if (encontrou) {
        const caminhoAbsoluto = path.join(pastaPublicFotos, nomePasta);
        const arquivos = fs.readdirSync(caminhoAbsoluto);
        const fotos = arquivos
          .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
          .map((f) => `/fotos/${encodeURIComponent(nomePasta)}/${f}`);

        if (fotos.length > 0) return fotos;
      }
    }
  } catch (err) {
    console.error('Erro ao buscar fotos locais:', err);
  }

  return [];
}

// ─────────────────────────────────────────────────────────────
// Leitura Dinâmica do Lead Ativo ou Mais Recente em src/data
// ─────────────────────────────────────────────────────────────
function getActiveLead(): Lead | null {
  const pastaData = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(pastaData)) return null;

  // 1. Tenta active_lead.json na raiz de src/data
  const activePath = path.join(pastaData, 'active_lead.json');
  if (fs.existsSync(activePath)) {
    try {
      const content = fs.readFileSync(activePath, 'utf8').trim();
      if (content) {
        const parsed = JSON.parse(content);
        return parsed?.lead ? parsed.lead : parsed;
      }
    } catch (e) {
      console.error('Erro ao ler active_lead.json:', e);
    }
  }

  // 2. Tenta varrer subpastas para pegar o primeiro arquivo JSON válido
  try {
    const itens = fs.readdirSync(pastaData, { withFileTypes: true });
    for (const item of itens) {
      if (item.isDirectory()) {
        const subFolder = path.join(pastaData, item.name);
        const arquivos = fs.readdirSync(subFolder);
        const jsonFile = arquivos.find((f) => f.endsWith('.json'));
        if (jsonFile) {
          const filePath = path.join(subFolder, jsonFile);
          const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          return parsed?.lead ? parsed.lead : parsed;
        }
      }
    }
  } catch (err) {
    console.error('Erro ao buscar leads em src/data:', err);
  }

  return null;
}

// ─────────────────────────────────────────────────────────────
// Serviços Padrão
// ─────────────────────────────────────────────────────────────
const SERVICOS_PADRAO: Record<string, Servico[]> = {
  barbearia: [
    { nome: 'Corte Masculino',          icone: '✂️' },
    { nome: 'Barba Desenhada',          icone: '🪒' },
    { nome: 'Combo Corte + Barba',      icone: '💈' },
    { nome: 'Sobrancelha',              icone: '👁️' },
    { nome: 'Depilação (orelha/nariz)', icone: '🧖' },
    { nome: 'Barboterapia',             icone: '🧴' },
  ],
  default: [
    { nome: 'Atendimento Personalizado', icone: '⭐' },
    { nome: 'Serviço Profissional',      icone: '🏆' },
    { nome: 'Qualidade Garantida',       icone: '✅' },
    { nome: 'Atendimento Rápido',        icone: '⚡' },
  ],
};

function getServicos(lead: Lead): Servico[] {
  if (lead.servicos && lead.servicos.length > 0) {
    return lead.servicos.map((s) => ({ nome: s, icone: '✅' }));
  }
  const texto = `${lead.nicho || ''} ${lead.categoria || ''}`.toLowerCase();
  if (texto.includes('barbearia') || texto.includes('barber')) return SERVICOS_PADRAO.barbearia;
  return SERVICOS_PADRAO.default;
}

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

function IconeWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.537 4.049 1.475 5.754L0 24l6.346-1.445A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.365l-.36-.214-3.715.847.863-3.61-.234-.373A9.818 9.818 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
    </svg>
  );
}

function IconeMaps() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4285F4"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// PÁGINA PRINCIPAL DO ROOT (src/app/page.tsx)
// ─────────────────────────────────────────────────────────────
export default async function RootPage() {
  const lead: Lead = getActiveLead() || {
    nome:     'Gusmão barbershop',
    endereco: 'R. Eurípedes de Paula, 213 - Jardim Elvira',
    telefone: '(11) 98648-3600',
    categoria:'Barber shop',
    cidade:   'Osasco',
    estado:   'SP',
    fotos:    [],
  };

  let todasFotos: string[] = [];

  if (lead.fotos && lead.fotos.length > 0) {
    todasFotos = lead.fotos;
  } else if (lead.fotos_ambiente && lead.fotos_ambiente.length > 0) {
    todasFotos = lead.fotos_ambiente;
  }

  if (todasFotos.length === 0) {
    todasFotos = getLocalPhotos(lead.nome);
  }

  if (todasFotos.length === 0) {
    todasFotos = [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200',
    ];
  }

  const fotoPrincipal  = todasFotos[0];
  const fotosGaleria   = todasFotos.slice(1, 5);

  const telLimpo = lead.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const nomeCod  = encodeURIComponent(lead.nome || '');
  const enderecoCod = encodeURIComponent(
    `${lead.endereco}, ${lead.cidade}, ${lead.estado}`
  );

  const whatsappURL = telLimpo
    ? `https://wa.me/55${telLimpo}?text=Olá!%20Gostaria%20de%20agendar%20um%20horário%20na%20${nomeCod}.`
    : '';

  const comoChegar = lead.maps_url
    ? lead.maps_url
    : `https://www.google.com/maps/dir/?api=1&destination=${enderecoCod}`;

  const temRating = typeof lead.avaliacao === 'number' && lead.avaliacao > 0;
  const servicos = getServicos(lead);
  const categoriaExibir = lead.categoria || lead.nicho || 'Estabelecimento Comercial';

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
      {/* BARRA DE PROPOSTA */}
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

      {/* HEADER STICKY */}
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
            <span style={{ fontSize: '12px', color: '#555' }}>
              📍 {lead.cidade}
            </span>
          )}
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          position: 'relative',
          height: 'min(88vh, 700px)',
          minHeight: '440px',
          overflow: 'hidden',
        }}
      >
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

          <div
            style={{
              width: '56px',
              height: '3px',
              background: 'linear-gradient(90deg, #c8a96e, transparent)',
              marginBottom: '16px',
            }}
          />

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
        </div>
      </section>

      {/* INFO STRIP */}
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

      {/* SERVIÇOS */}
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

      {/* GALERIA DE FOTOS GOOGLE PLACES */}
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

      {/* COMO CHEGAR */}
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
          </div>
        </div>
      </section>

      {/* FOOTER */}
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