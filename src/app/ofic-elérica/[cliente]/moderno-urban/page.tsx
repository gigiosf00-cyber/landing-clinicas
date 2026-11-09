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

export default function PaginaOficinaEletricaUrban() {
  const [lead, setLead] = useState<LeadData | null>(null);

  useEffect(() => {
    fetch('/api/active-lead')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.lead) setLead(data.lead);
      })
      .catch(() => {});
  }, []);

  const nomeExibir = lead?.nome || 'Auto Elétrica & Centro Automotivo';
  const telLimpo = lead?.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo
    ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(`Olá! Preciso de atendimento elétrico para o meu veículo na ${nomeExibir}.`)}`
    : '#';

  const fotosExibir = lead?.fotos && lead.fotos.length > 0 ? lead.fotos : lead?.fotos_ambiente || [];
  const fotoCapa = fotosExibir[0] || null;

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#0284c7', color: '#ffffff', textAlign: 'center', padding: '8px 16px', fontSize: '13px', fontWeight: 700 }}>
        ⚡ DIAGNÓSTICO E ELETRÔNICA AUTOMOTIVA — {nomeExibir.toUpperCase()}
      </div>

      <header style={{ padding: '16px 20px', backgroundColor: '#0284c7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: 900, color: '#fff' }}>{nomeExibir}</span>
        <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#10b981', color: '#fff', fontWeight: 700, fontSize: '13px', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none' }}>
          Chamar no WhatsApp
        </a>
      </header>

      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        {fotoCapa && (
          <div style={{ marginBottom: '24px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
            <img src={fotoCapa} alt={nomeExibir} style={{ width: '100%', maxHeight: '380px', objectFit: 'cover' }} />
          </div>
        )}

        <h1 style={{ fontSize: '34px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>SOLUÇÃO ELÉTRICA E ELETRÔNICA AUTOMOTIVA</h1>
        <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Baterias, alternador, motor de arranque, trava e vidro elétrico com garantia.</p>

        <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#10b981', color: '#fff', fontWeight: 800, padding: '14px 28px', borderRadius: '8px', textDecoration: 'none' }}>
          FALAR COM O ELETRICISTA NO WHATSAPP
        </a>
      </section>
    </div>
  );
}