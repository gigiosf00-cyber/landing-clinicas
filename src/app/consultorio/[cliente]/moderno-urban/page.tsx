import { carregarLead, obterFotos, dadosBase, servicosConsultorio, obterLogo, fotoCapa as capaFachada } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps { params: Promise<{ cliente: string }> }

export default async function ConsultorioUrban({ params }: PageProps) {
  const { cliente } = await params;
  const lead = carregarLead(cliente);

  if (!lead) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: 520, background: '#fff', border: '1px solid #ef4444', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h1 style={{ fontSize: 20, color: '#0f172a' }}>JSON do cliente não encontrado</h1>
          <p style={{ fontSize: 14, color: '#64748b' }}>Procurei por <strong>{cliente}</strong> em <code>src/data/consultorio/{cliente}.json</code> e não achei.</p>
        </div>
      </div>
    );
  }

  const d = dadosBase(lead, `Olá! Gostaria de agendar uma consulta no ${lead.nome}.`);
  const fotos = obterFotos(lead);
  const fotoCapa = capaFachada(fotos) || null;
  const logo = obterLogo(lead);

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#1e293b', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#0284c7', color: '#fff', textAlign: 'center', padding: '8px 16px', fontSize: 13, fontWeight: 600 }}>
        🩺 Proposta Exclusiva de Website para {d.nome}
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          {logo && <img src={logo} alt={`Logo ${d.nome}`} style={{ height: 44, width: 'auto', maxWidth: 130, objectFit: 'contain' }} />}
          <div>
          <span style={{ display: 'block', fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{d.nome}</span>
          <span style={{ display: 'block', fontSize: 11, color: '#0284c7', fontWeight: 600, textTransform: 'uppercase' }}>{lead.categoria || 'Consultório Especializado'}</span>
          </div>
        </div>
      </header>

      <section style={{ padding: '50px 20px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        {fotoCapa && (
          <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', height: 380, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
            <img src={fotoCapa} alt={d.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#0f172a', marginBottom: 14 }}>Cuidados especializados com foco na sua qualidade de vida</h1>
        <p style={{ fontSize: 16, color: '#64748b', maxWidth: 600, margin: '0 auto 24px' }}>
          Estrutura moderna e atendimento exclusivo para você agendar sua consulta sem complicação.
        </p>
        {d.avaliacao > 0 && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: '#f1f5f9', padding: '8px 18px', borderRadius: 20, marginBottom: 24, border: '1px solid #cbd5e1' }}>
            <span style={{ color: '#d97706' }}>★</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{d.avaliacao.toFixed(1)}</span>
            <span style={{ color: '#64748b', fontSize: 13 }}>({d.totalAval} avaliações no Google)</span>
          </div>
        )}
        <div>
          <a href={d.whatsapp} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#10b981', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 8, textDecoration: 'none' }}>
            Agendar via WhatsApp
          </a>
        </div>
      </section>

      <section style={{ padding: '40px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 20, color: '#0f172a' }}>Atendimentos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
          {servicosConsultorio.map((s) => (
            <div key={s.titulo} style={{ padding: 20, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(15,23,42,0.05)' }}>
              <span style={{ fontSize: 26 }}>{s.icone}</span>
              <h3 style={{ fontSize: 16, color: '#0f172a', margin: '8px 0 6px' }}>{s.titulo}</h3>
              <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>{s.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <InfoGoogle d={d} fotos={fotos} prefixo="cu" tema={{ fundo: '#f8fafc', card: '#ffffff', borda: '#e2e8f0', texto: '#0f172a', sub: '#64748b', destaque: '#0284c7' }} />

      <section style={{ backgroundColor: '#fff', borderTop: '1px solid #e2e8f0', padding: '40px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 14 }}>
            <div><strong style={{ color: '#0f172a' }}>📍 Endereço</strong><p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>{d.enderecoCompleto || 'Atendimento com hora marcada'}</p></div>
            <div><strong style={{ color: '#0f172a' }}>🕒 Horários</strong><p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>{d.horarios}</p></div>
            <div><strong style={{ color: '#0f172a' }}>📞 Telefone</strong><p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>{lead.telefone || 'Contato via WhatsApp'}</p></div>
            <a href={d.mapa} target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center', backgroundColor: '#0284c7', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 20px', borderRadius: 8, textDecoration: 'none' }}>
              🗺️ Como chegar
            </a>
          </div>
          {d.mapaEmbed && <iframe src={d.mapaEmbed} loading="lazy" style={{ width: '100%', height: 320, border: 0, borderRadius: 12 }} title="Mapa" />}
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '24px 20px', backgroundColor: '#e2e8f0', color: '#64748b', fontSize: 13 }}>
        <p>© {new Date().getFullYear()} {d.nome}. Atendimento Especializado.</p>
      </footer>
    </div>
  );
}
