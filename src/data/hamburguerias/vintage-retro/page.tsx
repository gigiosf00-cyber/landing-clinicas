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

export default function PaginaHamburgueriaVintage() {
  const [lead, setLead] = useState<LeadData | null>(null);

  useEffect(() => {
    fetch('/api/active-lead')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.lead) setLead(data.lead);
      })
      .catch(() => {});
  }, []);

  const nomeExibir = lead?.nome || 'Classic Burger Joint';
  const telLimpo = lead?.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo
    ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(`Olá! Gostaria de pedir na ${nomeExibir}.`)}`
    : '#';

  const fotosExibir = lead?.fotos && lead.fotos.length > 0 ? lead.fotos : lead?.fotos_ambiente || [];
  const fotoCapa = fotosExibir[0] || null;

  return (
    <div style={{ backgroundColor: '#292524', color: '#f5f5f4', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <header style={{ padding: '24px', textAlign: 'center', borderBottom: '2px solid #78350f' }}>
        <h1 style={{ fontSize: '32px', color: '#fef3c7', margin: 0 }}>{nomeExibir}</h1>
        <p style={{ color: '#d97706', fontSize: '13px', textTransform: 'uppercase', marginTop: '6px' }}>Hambúrgueres Tradicionais & Milkshakes</p>
      </header>

      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        {fotoCapa && (
          <div style={{ marginBottom: '24px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #78350f' }}>
            <img src={fotoCapa} alt={nomeExibir} style={{ width: '100%', maxHeight: '350px', objectFit: 'cover' }} />
          </div>
        )}

        <h2 style={{ fontSize: '26px', color: '#fef3c7', marginBottom: '16px' }}>Receita Tradicional e Sabor Inconfundível</h2>
        <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#b91c1c', color: '#fff', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
          Fazer Pedido no WhatsApp
        </a>
      </section>
    </div>
  );
}