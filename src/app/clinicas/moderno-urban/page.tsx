'use client';

import React, { useEffect, useState } from 'react';

export default function PaginaClinicaModerna() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/active-lead')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar active_lead.json:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ background: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>A carregar experiência moderna...</h2>
      </div>
    );
  }

  const lead = data?.lead;

  if (!lead) {
    return (
      <div style={{ background: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Nenhum lead ativo encontrado.</h2>
      </div>
    );
  }

  const nomeExibir = lead.nome || 'Clínica Renovar - Fisioterapia, Pilates e Estética';
  const telLimpo = lead.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(`Olá! Vi o site da ${nomeExibir} e gostaria de agendar uma consulta.`)}` : '#';
  const mapsURL = lead.maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.endereco || nomeExibir)}`;

  const corVerdeOficial = '#10b981';
  const corVerdeEscuro = '#022c22';
  const corLaranjaOficial = '#f97316'; 
  const corTextoVerde = '#064e3b'; 

  const pastaImagens = '/fotos/clinica-renovar-fisioterapia-pilates-e-estetica-iguatu-ce';
  const fotoLogotipo = `${pastaImagens}/renovar8.jpg`;
  const fotoPrincipal = `${pastaImagens}/renovar7.jpg`; 
  const fotoFachadaReal = `${pastaImagens}/foto1.jpg`; 
  const fotosGaleria = [`${pastaImagens}/renovar2.jpg`];

  const todosOsServicos = [
    { titulo: 'Fisioterapia na Coluna Vertebral', desc: 'Tratamento focado na coluna, alívio contínuo da dor e recuperação do movimento.' },
    { titulo: 'Fisioterapia Traumato-Ortopédica', desc: 'Reabilitação pós-cirúrgica, fraturas, luxações e lesões articulares.' },
    { titulo: 'Atendimento Domiciliar', desc: 'Fisioterapia no conforto do seu lar com flexibilidade e total praticidade.' },
    { titulo: 'Reabilitação do Idoso', desc: 'Treino de equilíbrio, prevenção de quedas e autonomia para a terceira idade.' },
    { titulo: 'Pilates Terapêutico & Clínico', desc: 'Aparelhos completos para postura e flexibilidade com turmas reduzidas.' },
    { titulo: 'Quiropraxia', desc: 'Ajustes articulares focados em restaurar a função da coluna e aliviar dores.' },
    { titulo: 'Ventosaterapia', desc: 'Alívio de tensões musculares, melhora da circulação e relaxamento profundo.' },
    { titulo: 'Estética Avançada', desc: 'Procedimentos faciais e corporais focados no seu cuidado integral.' },
    { titulo: 'Palmilhas Posturais', desc: 'Avaliação biomecânica e confecção de palmilhas sob medida.' }
  ];

  return (
    <div style={{ backgroundColor: '#f1f5f9', color: '#0f172a', minHeight: '100vh', fontFamily: '"Inter", system-ui, sans-serif' }}>
      
      <div style={{ background: 'linear-gradient(90deg, #022c22 0%, #064e3b 100%)', color: '#34d399', textAlign: 'center', padding: '10px 16px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em' }}>
        ⚡ PROPOSTA DE DESIGN MODERNO PARA: {nomeExibir.toUpperCase()}
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src={fotoLogotipo} alt="Logo" style={{ maxHeight: '50px', width: 'auto', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '15px', fontWeight: 900, color: corTextoVerde, letterSpacing: '0.3px' }}>
                Clínica Renovar - Fisioterapia, Pilates e Estética
              </span>
              <span style={{ fontSize: '10px', color: corLaranjaOficial, textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.8px', marginTop: '2px' }}>
                ATENDIMENTO DOMICILIAR • REABILITAÇÃO DO IDOSO • QUIROPRAXIA
              </span>
            </div>
          </div>

          <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', color: '#fff', fontWeight: 800, fontSize: '13px', padding: '10px 24px', borderRadius: '999px', textDecoration: 'none' }}>
            Agendar Agora
          </a>
        </div>
      </header>

      <section style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)', color: '#ffffff', padding: '80px 20px 100px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center', position: 'relative', zIndex: 10 }}>
          
          <div>
            <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#6ee7b7', fontSize: '11px', fontWeight: 800, padding: '8px 18px', borderRadius: '999px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '20px', letterSpacing: '1px' }}>
              ✦ Especialista em eliminar a dor e devolver seu bem-estar
            </span>
            <h1 style={{ fontSize: '46px', fontWeight: 900, lineHeight: 1.15, marginBottom: '24px', color: '#ffffff', letterSpacing: '-1px' }}>
              Sua <span style={{ color: '#34d399' }}>Qualidade de Vida</span> levada a sério.
            </h1>
            <p style={{ fontSize: '17px', color: '#d1fae5', lineHeight: 1.6, marginBottom: '40px', opacity: 0.9 }}>
              Na <strong>{nomeExibir}</strong>, unimos excelência clínica e atendimento humanizado para a sua plena recuperação.
            </p>
            <div>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'linear-gradient(90deg, #ea580c 0%, #f97316 100%)', color: '#fff', fontWeight: 800, fontSize: '16px', padding: '18px 40px', borderRadius: '999px', textDecoration: 'none' }}>
                Falar com Especialista
              </a>
            </div>
          </div>

          <div style={{ borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden', width: '100%', transform: 'translateY(-10px)' }}>
            <img src={fotoPrincipal} alt="Fisioterapia" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>

        </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '-40px auto 80px auto', padding: '0 20px', position: 'relative', zIndex: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: corVerdeEscuro, letterSpacing: '-0.5px' }}>Tratamentos de Ponta</h2>
          <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #10b981, #f97316)', margin: '16px auto', borderRadius: '4px' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {todosOsServicos.map((s, idx) => (
            <div key={idx} style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.02)', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>{s.titulo}</h3>
                <p style={{ fontSize: '14.5px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>{s.desc}</p>
              </div>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ color: corVerdeOficial, fontWeight: 800, fontSize: '14px', textDecoration: 'none' }}>
                Saber Mais &rsaquo;
              </a>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '40px 20px 80px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '40px', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          
          <div style={{ width: '260px', flexShrink: 0, position: 'relative' }}>
            <div style={{ width: '100%', height: 'auto', borderRadius: '20px', overflow: 'hidden', border: '4px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
              <img src={fotoFachadaReal} alt="Fachada" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <div style={{ position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#f97316', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '6px 16px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Nossa Sede
            </div>
          </div>

          <div style={{ flex: '1 1 300px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '12px', color: '#ffffff' }}>Visite-nos ou Chame Online</h3>
            <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '28px', lineHeight: 1.5 }}>
              Estamos prontos para atender você na nossa clínica em Iguatu ou no conforto do seu lar.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ background: '#10b981', color: '#fff', fontWeight: 800, fontSize: '13px', padding: '14px 20px', borderRadius: '12px', textDecoration: 'none' }}>
                💬 Chamar no WhatsApp
              </a>
              <a href={mapsURL} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 800, fontSize: '13px', padding: '14px 20px', borderRadius: '12px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
                📍 Rota no Mapa
              </a>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '20px' }}>{lead.endereco}</p>
          </div>

        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#020617', color: '#475569', fontSize: '12px', fontWeight: 600 }}>
        <p>© {new Date().getFullYear()} {nomeExibir}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}