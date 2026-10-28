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

export default function PaginaOficinaEletricaVintage() {
  const [lead, setLead] = useState<LeadData | null>(null);

  useEffect(() => {
    fetch('/api/active-lead')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.lead) setLead(data.lead);
      })
      .catch(() => {});
  }, []);

  const nomeExibir = lead?.nome || 'Auto Elétrica Tradicional';
  const telLimpo = lead?.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo
    ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(`Olá! Gostaria de consultar serviços elétricos na ${nomeExibir}.`)}`
    : '#';

  const fotosExibir = lead?.fotos && lead.fotos.length > 0 ? lead.fotos : lead?.fotos_ambiente || [];
  const fotoCapa = fotosExibir[0] || null;

  return (
    <div style={{ backgroundColor: '#18181b', color: '#f4f4f5', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <header style={{ padding: '24px', textAlign: 'center', borderBottom: '2px solid #0284c7' }}>
        <h1 style={{ fontSize: '30px', color: '#f8fafc', margin: 0 }}>{nomeExibir}</h1>
        <p style={{ color: '#38bdf8', fontSize: '13px', textTransform: 'uppercase', marginTop: '6px' }}>Tradição e Eficiência em Auto Elétrica</p>
      </header>

      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        {fotoCapa && (
          <div style={{ marginBottom: '24px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #3f3f46' }}>
            <img src={fotoCapa} alt={nomeExibir} style={{ width: '100%', maxHeight: '350px', objectFit: 'cover' }} />
          </div>
        )}

        <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '16px' }}>Serviços Elétricos Automotivos com Garantia</h2>
        <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#0284c7', color: '#fff', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
          Solicitar Orçamento no WhatsApp
        </a>
      </section>
    </div>
  );
}