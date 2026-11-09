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

export default function PaginaPizzariaUrban() {
  const [lead, setLead] = useState<LeadData | null>(null);

  useEffect(() => {
    fetch('/api/active-lead')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.lead) setLead(data.lead);
      })
      .catch(() => {});
  }, []);

  const nomeExibir = lead?.nome || 'Pizzaria & Delivery';
  const telLimpo = lead?.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo
    ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(`Olá! Gostaria de fazer um pedido na ${nomeExibir}.`)}`
    : '#';

  const fotosExibir = lead?.fotos && lead.fotos.length > 0 ? lead.fotos : lead?.fotos_ambiente || [];
  const fotoCapa = fotosExibir[0] || null;

  return (
    <div style={{ backgroundColor: '#18181b', color: '#f4f4f5', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#dc2626', color: '#ffffff', textAlign: 'center', padding: '8px 16px', fontSize: '13px', fontWeight: 700 }}>
        🍕 PIZZA NIGHT — PROPOSTA PARA {nomeExibir.toUpperCase()}
      </div>

      <header style={{ padding: '16px 20px', backgroundColor: '#09090b', borderBottom: '1px solid #27272a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: 900, color: '#ef4444' }}>{nomeExibir}</span>
        <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#22c55e', color: '#fff', fontWeight: 700, fontSize: '13px', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none' }}>
          Pedir no WhatsApp
        </a>
      </header>

      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        {fotoCapa && (
          <div style={{ marginBottom: '24px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #3f3f46' }}>
            <img src={fotoCapa} alt={nomeExibir} style={{ width: '100%', maxHeight: '380px', objectFit: 'cover' }} />
          </div>
        )}

        <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>A MELHOR PIZZA DA REGIÃO</h1>
        <p style={{ color: '#a1a1aa', marginBottom: '24px' }}>Massa quentinha, borda recheada e entrega super rápida.</p>

        <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#dc2626', color: '#fff', fontWeight: 800, padding: '14px 28px', borderRadius: '8px', textDecoration: 'none' }}>
          VER CARDÁPIO E PEDIR
        </a>
      </section>
    </div>
  );
}