'use client';
import { useState } from 'react';

export interface TemaInfo {
  fundo: string; 
  card: string; 
  borda: string; 
  texto: string; 
  sub: string; 
  destaque: string; 
  serif?: boolean;
}

function diaHoje(): string {
  const dias = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  return dias[new Date().getDay()];
}

function linhaDoDia(horariosSemana: string[], hoje: string): string {
  if (!Array.isArray(horariosSemana)) return '';
  const linha = horariosSemana.find(h => h.toLowerCase().startsWith(hoje));
  return linha || '';
}

export default function InfoGoogle({ 
  d, 
  fotos, 
  tema, 
  prefixo 
}: { 
  d: any; 
  fotos: string[]; 
  tema: TemaInfo; 
  prefixo?: string 
}) {
  const [fotoModal, setFotoModal] = useState<string | null>(null);
  const [horariosAbertos, setHorariosAbertos] = useState<boolean>(false);

  const safeD = d || {};
  const safeFotos = Array.isArray(fotos) && fotos.length > 0 
    ? fotos 
    : (Array.isArray(safeD.fotos) ? safeD.fotos : []);

  // Leitura e fallback dos horários
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

  const hoje = linhaDoDia(semana, diaHoje());
  
  const st = safeD.statusAgora || safeD.status_agora || { aberto: true, texto: 'Aberto agora' };
  const corSt = st.aberto === true ? '#10b981' : st.aberto === false ? '#ef4444' : (tema?.sub || '#a3a3a3');
  const fonte = tema?.serif ? 'Georgia, serif' : 'inherit';

  const corDestaque = tema?.destaque || '#f59e0b';
  const corCard = tema?.card || '#171717';
  const corBorda = tema?.borda || '#262626';
  const corTexto = tema?.texto || '#ffffff';
  const corSub = tema?.sub || '#a3a3a3';

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex', 
    alignItems: 'center', 
    gap: 6, 
    padding: '10px 18px', 
    borderRadius: 30,
    border: `1px solid ${corBorda}`, 
    background: corCard, 
    color: corTexto, 
    fontSize: 13,
    fontWeight: 600, 
    textDecoration: 'none', 
    cursor: 'pointer', 
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease'
  };

  const wrap: React.CSSProperties = { maxWidth: 1100, margin: '0 auto', padding: '0 20px' };

  const enderecoParaMapa = safeD.enderecoCompleto || safeD.endereco || safeD.nome || '';
  const mapUrl = safeD.mapaEmbed || `https://www.google.com/maps?q=${encodeURIComponent(enderecoParaMapa)}&output=embed`;

  const handleToggleHorarios = () => {
    setHorariosAbertos(prev => !prev);
    setTimeout(() => {
      document.getElementById('sec-horarios')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const reviewsList = Array.isArray(safeD.reviews) ? safeD.reviews : (Array.isArray(safeD.avaliacoes) ? safeD.avaliacoes : []);
  const totalAval = safeD.totalAval || safeD.total_avaliacoes || (reviewsList.length > 0 ? reviewsList.length : 4);
  const telNumero = safeD.tel || safeD.telefone || safeD.phone || '';
  const instaLink = safeD.instagram || safeD.insta || '';

  return (
    <div style={{ fontFamily: fonte }}>
      
      {/* 1. BARRA DE AÇÕES RÁPIDAS (TODOS OS 5 BOTÕES GARANTIDOS) */}
      <section style={{ ...wrap, paddingTop: 20, paddingBottom: 30 }}>
        {st.texto && (
          <div style={{ textAlign: 'center', margin: '0 0 16px' }}>
            <span style={{ display: 'inline-block', background: corCard, border: `1px solid ${corBorda}`, padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, color: corTexto }}>
              <span style={{ color: corSt, marginRight: 6 }}>●</span> {st.texto}
            </span>
          </div>
        )}
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {/* Botão Horários */}
          <button type="button" onClick={handleToggleHorarios} style={btnStyle}>
            🕒 Horários
          </button>

          {/* Botão Fotos */}
          <a href="#fotos" style={btnStyle}>
            📷 Fotos ({safeFotos.length})
          </a>

          {/* Botão Avaliações */}
          <a href="#avaliacoes" style={btnStyle}>
            ⭐ Avaliações ({totalAval})
          </a>

          {/* Botão Instagram */}
          <a href={instaLink || '#'} target={instaLink ? "_blank" : "_self"} rel="noopener noreferrer" style={btnStyle}>
            📸 Instagram
          </a>

          {/* Botão Ligar */}
          <a href={telNumero ? `tel:${telNumero}` : '#'} style={btnStyle}>
            📞 Ligar
          </a>
        </div>

        {/* CONSULTA DE HORÁRIOS EXPANSAO DIRETA */}
        <div id="sec-horarios" style={{ maxWidth: 520, margin: '20px auto 0' }}>
          <details 
            open={horariosAbertos}
            onToggle={(e: any) => setHorariosAbertos(e.currentTarget.open)}
            style={{ background: corCard, border: `1px solid ${corBorda}`, borderRadius: 16, padding: '14px 20px', color: corTexto }}
          >
            <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: 14, userSelect: 'none' }}>
              🕒 Consultar Grade de Horários
            </summary>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0' }}>
              {semana.map((l, idx) => {
                const eHoje = hoje && l.toLowerCase().includes(hoje.split('-')[0]);
                return (
                  <li 
                    key={idx} 
                    style={{ 
                      padding: '6px 0', 
                      fontSize: 13, 
                      borderBottom: `1px solid ${corBorda}33`, 
                      color: eHoje ? corDestaque : corSub, 
                      fontWeight: eHoje ? 700 : 400 
                    }}
                  >
                    {l}
                  </li>
                );
              })}
            </ul>
          </details>
        </div>
      </section>

      {/* 2. GALERIA DE FOTOS UNIFICADA */}
      {safeFotos.length > 0 && (
        <section id="fotos" style={{ ...wrap, padding: '30px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 32, height: 2, background: corDestaque }} />
            <h2 style={{ fontSize: 24, fontWeight: 900, textTransform: 'uppercase', color: corTexto, margin: 0 }}>Galeria de Fotos</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {safeFotos.map((f, i) => (
              <div 
                key={`${f}-${i}`} 
                onClick={() => setFotoModal(f)}
                style={{ height: 200, borderRadius: 16, overflow: 'hidden', border: `1px solid ${corBorda}`, background: corCard, cursor: 'pointer', position: 'relative' }}
                title="Clique para ampliar"
              >
                <img src={f} alt={`Foto ${i + 1}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MODAL LIGHTBOX / ZOOM */}
      {fotoModal && (
        <div 
          onClick={() => setFotoModal(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, cursor: 'pointer' }}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <img src={fotoModal} alt="Foto Ampliada" style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: 12, border: `2px solid ${corDestaque}` }} />
            <p style={{ color: '#fff', textAlign: 'center', marginTop: 10, fontSize: 13, opacity: 0.8 }}>Clique em qualquer lugar para fechar</p>
          </div>
        </div>
      )}

      {/* 3. AVALIAÇÕES DO GOOGLE */}
      {reviewsList.length > 0 && (
        <section id="avaliacoes" style={{ ...wrap, padding: '30px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 32, height: 2, background: corDestaque }} />
            <h2 style={{ fontSize: 24, fontWeight: 900, textTransform: 'uppercase', color: corTexto, margin: 0 }}>O que dizem no Google</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {reviewsList.map((r: any, i: number) => (
              <div key={i} style={{ background: corCard, border: `1px solid ${corBorda}`, borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ color: corDestaque, marginBottom: 8, fontSize: 14 }}>{'★'.repeat(Math.round(r.nota || r.rating || 5))}</div>
                  <p style={{ fontSize: 14, color: corSub, margin: '0 0 16px', lineHeight: 1.6 }}>
                    “{String(r.texto || r.text || '')}”
                  </p>
                </div>
                <div>
                  <strong style={{ fontSize: 13, color: corTexto, display: 'block' }}>{r.autor || r.author || 'Cliente'}</strong>
                  {(r.tempo || r.time) && <span style={{ fontSize: 11, color: corSub }}>{r.tempo || r.time} · Google Maps</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. LOCALIZAÇÃO E MAPA */}
      {(safeD.enderecoCompleto || safeD.endereco || safeD.nome) && (
        <section style={{ ...wrap, padding: '30px 20px 50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 2, background: corDestaque }} />
              <h2 style={{ fontSize: 24, fontWeight: 900, textTransform: 'uppercase', color: corTexto, margin: 0 }}>Onde Estamos</h2>
            </div>
            {safeD.mapa && safeD.mapa !== '#' && (
              <a href={safeD.mapa} target="_blank" rel="noreferrer" style={{ background: corCard, color: corDestaque, border: `1px solid ${corBorda}`, fontSize: 12, fontWeight: 900, padding: '8px 16px', borderRadius: 10, textDecoration: 'none' }}>
                Como Chegar no Maps ➔
              </a>
            )}
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${corBorda}`, height: 320, background: corCard }}>
            <iframe src={mapUrl} width="100%" height="100%" style={{ border: 0, filter: 'grayscale(100%) contrast(120%) opacity(85%)' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <p style={{ fontSize: 14, color: corSub, marginTop: 12, textAlign: 'center' }}>
            📍 {safeD.enderecoCompleto || safeD.endereco}
          </p>
        </section>
      )}

    </div>
  );
}