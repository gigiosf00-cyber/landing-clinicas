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

export default function PaginaConsultorioVintage() {
  const [lead, setLead] = useState<LeadData | null>(null);

  useEffect(() => {
    fetch('/api/active-lead')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.lead) setLead(data.lead);
      })
      .catch(() => {});
  }, []);

  const nomeExibir = lead?.nome || 'Consultório Particular & Especializado';
  const telLimpo = lead?.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo
    ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(`Olá! Gostaria de mais informações sobre agendamento no ${nomeExibir}.`)}`
    : '#';

  const fotosExibir = lead?.fotos && lead.fotos.length > 0 ? lead.fotos : lead?.fotos_ambiente || [];
  const fotoCapa = fotosExibir[0] || null;

  return (
    <div style={{ backgroundColor: '#fafaf9', color: '#292524', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', textAlign: 'center', padding: '8px 16px', fontSize: '12px', letterSpacing: '0.05em' }}>
        PROPOSTA DE WEBSITE INSTITUCIONAL — {nomeExibir.toUpperCase()}
      </div>

      <header style={{ padding: '24px 20px', textAlign: 'center', borderBottom: '2px solid #e7e5e4' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{nomeExibir}</h1>
        <p style={{ fontSize: '13px', color: '#0284c7', margin: '4px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {lead?.categoria || 'Atendimento Médico e Especializado'}
        </p>
      </header>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        {fotoCapa && (
          <div style={{ marginBottom: '30px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #d6d3d1' }}>
            <img src={fotoCapa} alt={nomeExibir} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
          </div>
        )}

        <h2 style={{ fontSize: '30px', color: '#0f172a', marginBottom: '16px' }}>
          Tradição, ética e cuidado individualizado
        </h2>

        <p style={{ fontSize: '17px', color: '#57534e', lineHeight: 1.6, marginBottom: '28px' }}>
          Atendimento dedicado e focado em oferecer a melhor experiência para a sua saúde.
        </p>

        <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#0f172a', color: '#fff', padding: '14px 28px', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>
          Agendar Consulta
        </a>
      </section>

      <footer style={{ textAlign: 'center', padding: '30px 20px', borderTop: '1px solid #e7e5e4', color: '#64748b', fontSize: '13px' }}>
        <p>© {new Date().getFullYear()} {nomeExibir}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}