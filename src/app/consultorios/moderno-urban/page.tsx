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

export default function PaginaConsultorioUrban() {
  const [lead, setLead] = useState<LeadData | null>(null);

  useEffect(() => {
    fetch('/api/active-lead')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.lead) setLead(data.lead);
      })
      .catch(() => {});
  }, []);

  const nomeExibir = lead?.nome || 'Consultório Médico & Especializado';
  const telLimpo = lead?.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo
    ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(`Olá! Gostaria de agendar uma consulta no ${nomeExibir}.`)}`
    : '#';

  const fotosExibir = lead?.fotos && lead.fotos.length > 0 ? lead.fotos : lead?.fotos_ambiente || [];
  const fotoCapa = fotosExibir[0] || null;
  const fotosGaleria = fotosExibir.slice(1, 5);

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#1e293b', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#0284c7', color: '#ffffff', textAlign: 'center', padding: '8px 16px', fontSize: '13px', fontWeight: 600 }}>
        🩺 Proposta Exclusiva de Website para {nomeExibir}
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'block', fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{nomeExibir}</span>
            <span style={{ display: 'block', fontSize: '11px', color: '#0284c7', fontWeight: 600, textTransform: 'uppercase' }}>
              {lead?.categoria || 'Consultório Especializado'}
            </span>
          </div>

          <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#0284c7', color: '#fff', fontWeight: 700, fontSize: '13px', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>
            Agendar Horário
          </a>
        </div>
      </header>

      <section style={{ padding: '50px 20px', maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        {fotoCapa && (
          <div style={{ marginBottom: '24px', borderRadius: '16px', overflow: 'hidden', maxHeight: '380px', width: '100%', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
            <img src={fotoCapa} alt={nomeExibir} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <h1 style={{ fontSize: '34px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
          Cuidados especializados com foco na sua qualidade de vida
        </h1>
        <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '600px', margin: '0 auto 24px auto' }}>
          Estrutura moderna e atendimento exclusivo para você agendar sua consulta sem complicação.
        </p>

        {lead?.avaliacao && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '8px 18px', borderRadius: '20px', marginBottom: '24px', border: '1px solid #cbd5e1' }}>
            <span style={{ color: '#d97706' }}>★</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{lead.avaliacao.toFixed(1)}</span>
            <span style={{ color: '#64748b', fontSize: '13px' }}>({lead.total_avaliacoes || 0} avaliações no Google)</span>
          </div>
        )}

        <div>
          <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#10b981', color: '#fff', fontWeight: 700, fontSize: '15px', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none' }}>
            Agendar via WhatsApp
          </a>
        </div>
      </section>

      {fotosGaleria.length > 0 && (
        <section style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, textAlign: 'center', marginBottom: '20px', color: '#0f172a' }}>Estrutura e Consultório</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {fotosGaleria.map((foto, idx) => (
              <div key={idx} style={{ height: '180px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <img src={foto} alt={`Foto ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>
      )}

      <footer style={{ textAlign: 'center', padding: '24px 20px', backgroundColor: '#e2e8f0', color: '#64748b', fontSize: '13px' }}>
        <p>© {new Date().getFullYear()} {nomeExibir}. Atendimento Especializado.</p>
      </footer>
    </div>
  );
}