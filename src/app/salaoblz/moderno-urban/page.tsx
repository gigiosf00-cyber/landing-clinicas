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

export default function PaginaSalaoBelezaUrban() {
  const [lead, setLead] = useState<LeadData | null>(null);

  useEffect(() => {
    fetch('/api/active-lead')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.lead) setLead(data.lead);
      })
      .catch(() => {});
  }, []);

  const nomeExibir = lead?.nome || 'Studio de Beleza & Hair';
  const telLimpo = lead?.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo
    ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(`Olá! Gostaria de agendar um horário no ${nomeExibir}.`)}`
    : '#';

  const fotosExibir = lead?.fotos && lead.fotos.length > 0 ? lead.fotos : lead?.fotos_ambiente || [];
  const fotoCapa = fotosExibir[0] || null;

  return (
    <div style={{ backgroundColor: '#fdf2f8', color: '#831843', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#db2777', color: '#ffffff', textAlign: 'center', padding: '8px 16px', fontSize: '13px', fontWeight: 600 }}>
        💅 APRESENTAÇÃO EXCLUSIVA DE SITE PARA {nomeExibir.toUpperCase()}
      </div>

      <header style={{ padding: '16px 20px', backgroundColor: '#fff', borderBottom: '1px solid #fbcfe8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: 800, color: '#db2777' }}>{nomeExibir}</span>
        <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#10b981', color: '#fff', fontWeight: 700, fontSize: '13px', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none' }}>
          Marcar Horário
        </a>
      </header>

      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        {fotoCapa && (
          <div style={{ marginBottom: '24px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #fbcfe8' }}>
            <img src={fotoCapa} alt={nomeExibir} style={{ width: '100%', maxHeight: '380px', objectFit: 'cover' }} />
          </div>
        )}

        <h1 style={{ fontSize: '34px', fontWeight: 800, color: '#831843', marginBottom: '12px' }}>CUIDADOS E ESTÉRICA DE ALTO PADRÃO</h1>
        <p style={{ color: '#9d174d', marginBottom: '24px' }}>Tratamentos capilares, manicure, pedicure e estética facial com atendimento exclusivo.</p>

        <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#db2777', color: '#fff', fontWeight: 800, padding: '14px 28px', borderRadius: '8px', textDecoration: 'none' }}>
          AGENDAR VIA WHATSAPP
        </a>
      </section>
    </div>
  );
}