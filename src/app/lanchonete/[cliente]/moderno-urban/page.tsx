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

export default function PaginaLanchoneteUrban() {
  const [lead, setLead] = useState<LeadData | null>(null);

  useEffect(() => {
    fetch('/api/active-lead')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.lead) setLead(data.lead);
      })
      .catch(() => {});
  }, []);

  const nomeExibir = lead?.nome || 'Lanchonete e Snack Bar';
  const telLimpo = lead?.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo
    ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(`Olá! Gostaria de fazer um pedido na ${nomeExibir}.`)}`
    : '#';

  const fotosExibir = lead?.fotos && lead.fotos.length > 0 ? lead.fotos : lead?.fotos_ambiente || [];
  const fotoCapa = fotosExibir[0] || null;

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header style={{ padding: '16px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '18px', fontWeight: 800, color: '#ca8a04' }}>{nomeExibir}</span>
        <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#10b981', color: '#fff', fontWeight: 700, fontSize: '13px', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none' }}>
          Pedir no WhatsApp
        </a>
      </header>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        {fotoCapa && (
          <div style={{ marginBottom: '24px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
            <img src={fotoCapa} alt={nomeExibir} style={{ width: '100%', maxHeight: '380px', objectFit: 'cover' }} />
          </div>
        )}

        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>OS MELHORES LANCHES DA REGIÃO</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Salgados assados e fritos na hora, sucos e x-salada completo.</p>

        <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#ca8a04', color: '#fff', fontWeight: 700, padding: '12px 24px', borderRadius: '6px', textDecoration: 'none' }}>
          CHAMAR NO WHATSAPP
        </a>
      </section>
    </div>
  );
}