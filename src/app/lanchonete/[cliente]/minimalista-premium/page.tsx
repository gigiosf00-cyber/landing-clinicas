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

export default function PaginaLanchoneteMinimalista() {
  const [lead, setLead] = useState<LeadData | null>(null);

  useEffect(() => {
    fetch('/api/active-lead')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.lead) setLead(data.lead);
      })
      .catch(() => {
        setLead({
          nome: 'Lanchonete & Salgados',
          telefone: '41999999999',
          endereco: 'Lanches Rápido e Delivery',
          cidade: 'Sua Cidade',
          estado: 'UF',
          categoria: 'Lanchonete & Salgaria',
          avaliacao: 4.7,
          total_avaliacoes: 140,
          horarios: 'Segunda a Sábado: 07:00 às 22:00',
        });
      });
  }, []);

  const nomeExibir = lead?.nome || 'Lanchonete Rápida';
  const telLimpo = lead?.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo
    ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(
        `Olá! Gostaria de consultar os lanches disponíveis na ${nomeExibir}.`
      )}`
    : '#';

  const fotosExibir = lead?.fotos && lead.fotos.length > 0 ? lead.fotos : lead?.fotos_ambiente || [];
  const fotoCapa = fotosExibir[0] || null;
  const fotosGaleria = fotosExibir.slice(1, 5);

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#ca8a04', color: '#ffffff', textAlign: 'center', padding: '8px 16px', fontSize: '13px', fontWeight: 600 }}>
        🥪 Proposta de Website para {nomeExibir}
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🥪</span>
            <div>
              <span style={{ display: 'block', fontSize: '16px', fontWeight: 700, color: '#fff' }}>{nomeExibir}</span>
              <span style={{ display: 'block', fontSize: '11px', color: '#eab308', textTransform: 'uppercase' }}>
                {lead?.categoria || 'Lanchonete & Salgados'}
              </span>
            </div>
          </div>

          <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#10b981', color: '#fff', fontWeight: 700, fontSize: '13px', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>
            Fazer Pedido
          </a>
        </div>
      </header>

      <section style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
        {fotoCapa && (
          <div style={{ marginBottom: '30px', borderRadius: '16px', overflow: 'hidden', maxHeight: '400px', width: '100%', border: '1px solid #334155' }}>
            <img src={fotoCapa} alt={nomeExibir} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
          Lanches Frescos, Salgados e Sucos Naturais
        </h1>

        <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '650px', margin: '0 auto 28px auto' }}>
          Qualidade, rapidez no atendimento e o melhor sabor para o seu dia a dia.
        </p>

        {lead?.avaliacao && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', padding: '10px 20px', borderRadius: '30px', marginBottom: '30px', border: '1px solid #334155' }}>
            <span style={{ color: '#eab308', fontSize: '18px' }}>★</span>
            <span style={{ fontWeight: 700, color: '#fff' }}>{lead.avaliacao.toFixed(1)}</span>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>({lead.total_avaliacoes || 0} avaliações no Google)</span>
          </div>
        )}

        <div>
          <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#ca8a04', color: '#fff', fontWeight: 700, fontSize: '16px', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none' }}>
            Pedir no WhatsApp
          </a>
        </div>
      </section>

      {fotosGaleria.length > 0 && (
        <section style={{ padding: '50px 20px', maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, textAlign: 'center', marginBottom: '24px', color: '#fff' }}>Fotos do Cardápio</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {fotosGaleria.map((foto, idx) => (
              <div key={idx} style={{ height: '200px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
                <img src={foto} alt={`Lanche ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>
      )}

      <footer style={{ textAlign: 'center', padding: '30px 20px', backgroundColor: '#090d16', color: '#64748b', fontSize: '13px' }}>
        <p>© {new Date().getFullYear()} {nomeExibir}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}