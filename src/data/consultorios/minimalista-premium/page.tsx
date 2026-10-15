'use client';

import React, { useEffect, useState } from 'react';

interface LeadData {
  nome: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  nicho: string;
  categoria?: string;
  avaliacao?: number;
  total_avaliacoes?: number;
  horarios?: string;
  maps_url?: string;
  fotos?: string[];
  fotos_ambiente?: string[];
}

export default function PaginaConsultorioMinimalista() {
  const [lead, setLead] = useState<LeadData | null>(null);

  useEffect(() => {
    fetch('/api/active-lead')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.lead) setLead(data.lead);
      })
      .catch(() => {
        setLead({
          nome: 'Consultório Especializado',
          telefone: '41999999999',
          endereco: 'Atendimento Presencial e Exclusivo',
          cidade: 'Sua Cidade',
          estado: 'UF',
          categoria: 'Atendimento Especializado',
          avaliacao: 5.0,
          total_avaliacoes: 84,
          horarios: 'Segunda a Sexta: 08:00 às 18:00',
        });
      });
  }, []);

  const nomeExibir = lead?.nome || 'Consultório Especializado';
  const telLimpo = lead?.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo
    ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(
        `Olá! Gostaria de agendar uma consulta no ${nomeExibir}.`
      )}`
    : '#';

  const fotosExibir =
    lead?.fotos && lead.fotos.length > 0
      ? lead.fotos
      : lead?.fotos_ambiente && lead.fotos_ambiente.length > 0
      ? lead.fotos_ambiente
      : [];

  const fotoCapa = fotosExibir[0] || null;
  const fotosGaleria = fotosExibir.slice(1, 5);

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#0284c7', color: '#ffffff', textAlign: 'center', padding: '8px 16px', fontSize: '13px', fontWeight: 600 }}>
        🩺 Proposta de Site Exclusiva preparada para {nomeExibir}
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>👨‍⚕️</span>
            <div>
              <span style={{ display: 'block', fontSize: '16px', fontWeight: 700, color: '#fff' }}>{nomeExibir}</span>
              <span style={{ display: 'block', fontSize: '11px', color: '#0ea5e9', textTransform: 'uppercase' }}>
                {lead?.categoria || 'Consultório Especializado'}
              </span>
            </div>
          </div>

          <a
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#10b981',
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            }}
          >
            Agendar Consulta
          </a>
        </div>
      </header>

      <section style={{ position: 'relative', padding: '60px 20px', textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
        {fotoCapa && (
          <div style={{ marginBottom: '30px', borderRadius: '16px', overflow: 'hidden', maxHeight: '400px', width: '100%', border: '1px solid #334155' }}>
            <img src={fotoCapa} alt={nomeExibir} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', marginBottom: '16px', lineHeight: 1.2 }}>
          Atendimento personalizado com foco na sua saúde e bem-estar
        </h1>

        <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '650px', margin: '0 auto 28px auto' }}>
          Consultas individuais, ambiente acolhedor e dedicação total a cada paciente.
        </p>

        {lead?.avaliacao && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', padding: '10px 20px', borderRadius: '30px', marginBottom: '30px', border: '1px solid #334155' }}>
            <span style={{ color: '#f59e0b', fontSize: '18px' }}>★</span>
            <span style={{ fontWeight: 700, color: '#fff' }}>{lead.avaliacao.toFixed(1)}</span>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>
              ({lead.total_avaliacoes ? `${lead.total_avaliacoes} avaliações no Google` : 'Excelente avaliação'})
            </span>
          </div>
        )}

        <div>
          <a
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#0284c7',
              color: '#fff',
              fontWeight: 700,
              fontSize: '16px',
              padding: '14px 32px',
              borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(2, 132, 199, 0.4)',
            }}
          >
            Agendar Horário via WhatsApp
          </a>
        </div>
      </section>

      <section style={{ backgroundColor: '#1e293b', borderTop: '1px solid #334155', borderBottom: '1px solid #334155', padding: '30px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '16px', backgroundColor: '#0f172a', borderRadius: '10px', border: '1px solid #334155' }}>
            <span style={{ fontSize: '20px', display: 'block', marginBottom: '6px' }}>📍 Endereço</span>
            <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{lead?.endereco || 'Atendimento com hora marcada'}</span>
            <span style={{ display: 'block', fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{lead?.cidade} - {lead?.estado}</span>
          </div>

          <div style={{ padding: '16px', backgroundColor: '#0f172a', borderRadius: '10px', border: '1px solid #334155' }}>
            <span style={{ fontSize: '20px', display: 'block', marginBottom: '6px' }}>🕒 Horários</span>
            <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{lead?.horarios || 'Consulte disponibilidade'}</span>
          </div>

          <div style={{ padding: '16px', backgroundColor: '#0f172a', borderRadius: '10px', border: '1px solid #334155' }}>
            <span style={{ fontSize: '20px', display: 'block', marginBottom: '6px' }}>📞 Agendamento</span>
            <span style={{ fontSize: '14px', color: '#cbd5e1' }}>{lead?.telefone || 'Contato via WhatsApp'}</span>
          </div>
        </div>
      </section>

      {fotosGaleria.length > 0 && (
        <section style={{ padding: '50px 20px', maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, textAlign: 'center', marginBottom: '24px', color: '#fff' }}>
            Conheça Nosso Espaço
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {fotosGaleria.map((foto, idx) => (
              <div key={idx} style={{ height: '200px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
                <img src={foto} alt={`Foto ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>
      )}

      <footer style={{ textAlign: 'center', padding: '30px 20px', backgroundColor: '#090d16', borderTop: '1px solid #1e293b', color: '#64748b', fontSize: '13px' }}>
        <p>© {new Date().getFullYear()} {nomeExibir}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}