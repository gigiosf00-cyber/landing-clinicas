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

export default function PaginaPizzariaMinimalista() {
  const [lead, setLead] = useState<LeadData | null>(null);

  useEffect(() => {
    fetch('/api/active-lead')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.lead) setLead(data.lead);
      })
      .catch(() => {
        setLead({
          nome: 'Pizzaria Artesanal & Forno a Lenha',
          telefone: '41999999999',
          endereco: 'Atendimento Presencial e Delivery',
          cidade: 'Sua Cidade',
          estado: 'UF',
          categoria: 'Pizzaria & Delivery',
          avaliacao: 4.9,
          total_avaliacoes: 185,
          horarios: 'Terça a Domingo: 18:00 às 23:30',
        });
      });
  }, []);

  const nomeExibir = lead?.nome || 'Pizzaria Artesanal';
  const telLimpo = lead?.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo
    ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(
        `Olá! Gostaria de ver o cardápio e fazer um pedido na ${nomeExibir}.`
      )}`
    : '#';

  const fotosExibir = lead?.fotos && lead.fotos.length > 0 ? lead.fotos : lead?.fotos_ambiente || [];
  const fotoCapa = fotosExibir[0] || null;
  const fotosGaleria = fotosExibir.slice(1, 5);

  return (
    <div style={{ backgroundColor: '#09090b', color: '#f4f4f5', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#dc2626', color: '#ffffff', textAlign: 'center', padding: '8px 16px', fontSize: '13px', fontWeight: 600 }}>
        🍕 Proposta de Cardápio e Site Exclusiva para {nomeExibir}
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(9, 9, 11, 0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #27272a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🍕</span>
            <div>
              <span style={{ display: 'block', fontSize: '16px', fontWeight: 700, color: '#fff' }}>{nomeExibir}</span>
              <span style={{ display: 'block', fontSize: '11px', color: '#ef4444', textTransform: 'uppercase' }}>
                {lead?.categoria || 'Pizzaria & Forno a Lenha'}
              </span>
            </div>
          </div>

          <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#22c55e', color: '#fff', fontWeight: 700, fontSize: '13px', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>
            Fazer Pedido
          </a>
        </div>
      </header>

      <section style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
        {fotoCapa && (
          <div style={{ marginBottom: '30px', borderRadius: '16px', overflow: 'hidden', maxHeight: '400px', width: '100%', border: '1px solid #27272a' }}>
            <img src={fotoCapa} alt={nomeExibir} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <h1 style={{ fontSize: '38px', fontWeight: 800, color: '#ffffff', marginBottom: '16px', lineHeight: 1.2 }}>
          Pizzas Crocantes, Recheadas e Assadas no Ponto Certo
        </h1>

        <p style={{ fontSize: '16px', color: '#a1a1aa', maxWidth: '650px', margin: '0 auto 28px auto' }}>
          Massa de fermentação natural, molho artesanal e ingredientes selecionados. Entrega rápida no conforto da sua casa!
        </p>

        {lead?.avaliacao && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#18181b', padding: '10px 20px', borderRadius: '30px', marginBottom: '30px', border: '1px solid #27272a' }}>
            <span style={{ color: '#eab308', fontSize: '18px' }}>★</span>
            <span style={{ fontWeight: 700, color: '#fff' }}>{lead.avaliacao.toFixed(1)}</span>
            <span style={{ color: '#a1a1aa', fontSize: '14px' }}>({lead.total_avaliacoes || 0} avaliações no Google)</span>
          </div>
        )}

        <div>
          <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#dc2626', color: '#fff', fontWeight: 700, fontSize: '16px', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)' }}>
            Pedir no WhatsApp
          </a>
        </div>
      </section>

      {fotosGaleria.length > 0 && (
        <section style={{ padding: '50px 20px', maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, textAlign: 'center', marginBottom: '24px', color: '#fff' }}>Nossos Sabores</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {fotosGaleria.map((foto, idx) => (
              <div key={idx} style={{ height: '200px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #27272a' }}>
                <img src={foto} alt={`Pizza ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>
      )}

      <footer style={{ textAlign: 'center', padding: '30px 20px', backgroundColor: '#000', borderTop: '1px solid #18181b', color: '#71717a', fontSize: '13px' }}>
        <p>© {new Date().getFullYear()} {nomeExibir}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}