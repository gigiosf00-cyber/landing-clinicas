import { carregarLead, obterFotos, dadosBase, servicosConsultorio, obterLogo, fotoCapa as capaFachada } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps { params: Promise<{ cliente: string }> }

export default async function ConsultorioVintage({ params }: PageProps) {
  const { cliente } = await params;
  const lead = carregarLead(cliente);

  if (!lead) {
    return (
      <div style={{ minHeight: '100vh', background: '#fafaf9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Georgia, serif' }}>
        <div style={{ maxWidth: 520, background: '#fff', border: '1px solid #ef4444', borderRadius: 8, padding: 32, textAlign: 'center' }}>
          <h1 style={{ fontSize: 20, color: '#0f172a' }}>JSON do cliente não encontrado</h1>
          <p style={{ fontSize: 14, color: '#57534e' }}>Procurei por <strong>{cliente}</strong> em <code>src/data/consultorio/{cliente}.json</code> e não achei.</p>
        </div>
      </div>
    );
  }

  const d = dadosBase(lead, `Olá! Gostaria de agendar uma consulta no ${lead.nome}.`);
  const fotos = obterFotos(lead);
  const fotoCapa = capaFachada(fotos) || null;
  const logo = obterLogo(lead);

  return (
    <div style={{ backgroundColor: '#fafaf9', color: '#292524', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', textAlign: 'center', padding: '8px 16px', fontSize: 12, letterSpacing: '0.05em' }}>
        PROPOSTA DE WEBSITE INSTITUCIONAL — {d.nome.toUpperCase()}
      </div>

      <header style={{ padding: '24px 20px', textAlign: 'center', borderBottom: '2px solid #e7e5e4' }}>
        {logo && <img src={logo} alt={`Logo ${d.nome}`} style={{ height: 70, width: 'auto', maxWidth: 180, objectFit: 'contain', margin: '0 auto 10px', display: 'block' }} />}
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', margin: 0 }}>{d.nome}</h1>
        <p style={{ fontSize: 13, color: '#0284c7', margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {lead.categoria || 'Atendimento Médico e Especializado'}
        </p>
      </header>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        {fotoCapa && (
          <div style={{ marginBottom: 30, borderRadius: 8, overflow: 'hidden', border: '1px solid #d6d3d1', height: 400 }}>
            <img src={fotoCapa} alt={d.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <h2 style={{ fontSize: 30, color: '#0f172a', marginBottom: 16 }}>Tradição, ética e cuidado individualizado</h2>
        <p style={{ fontSize: 17, color: '#57534e', lineHeight: 1.6, marginBottom: 20 }}>
          Atendimento dedicado e focado em oferecer a melhor experiência para a sua saúde.
        </p>
        {d.avaliacao > 0 && (
          <p style={{ fontSize: 15, color: '#78716c', marginBottom: 24 }}>
            <span style={{ color: '#b45309' }}>★ {d.avaliacao.toFixed(1)}</span> — {d.totalAval} avaliações no Google
          </p>
        )}
        <a href={d.whatsapp} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#0f172a', color: '#fff', padding: '14px 28px', borderRadius: 4, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
          Agendar Consulta pelo WhatsApp
        </a>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '20px 20px 40px' }}>
        <h2 style={{ fontSize: 24, color: '#0f172a', textAlign: 'center', marginBottom: 24, borderBottom: '1px solid #e7e5e4', paddingBottom: 12 }}>Atendimentos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {servicosConsultorio.map((s) => (
            <div key={s.titulo} style={{ textAlign: 'center', padding: '10px 6px' }}>
              <span style={{ fontSize: 24 }}>{s.icone}</span>
              <h3 style={{ fontSize: 17, color: '#0f172a', margin: '8px 0 6px' }}>{s.titulo}</h3>
              <p style={{ fontSize: 14, color: '#57534e', margin: 0, lineHeight: 1.5 }}>{s.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <InfoGoogle d={d} fotos={fotos} prefixo="cv" tema={{ fundo: '#fafaf9', card: '#ffffff', borda: '#e7e5e4', texto: '#0f172a', sub: '#57534e', destaque: '#0284c7', serif: true }} />

      <section style={{ borderTop: '2px solid #e7e5e4', padding: '40px 20px', backgroundColor: '#f5f5f4' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 12, fontSize: 15 }}>
            <p style={{ margin: 0 }}><strong>Endereço:</strong> {d.enderecoCompleto || 'Atendimento com hora marcada'}</p>
            <p style={{ margin: 0 }}><strong>Horários:</strong> {d.horarios}</p>
            <p style={{ margin: 0 }}><strong>Telefone:</strong> {lead.telefone || 'Contato via WhatsApp'}</p>
            <a href={d.mapa} target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center', border: '1px solid #0f172a', color: '#0f172a', padding: '12px 20px', borderRadius: 4, textDecoration: 'none', fontWeight: 600 }}>
              Como chegar
            </a>
          </div>
          {d.mapaEmbed && <iframe src={d.mapaEmbed} loading="lazy" style={{ width: '100%', height: 300, border: '1px solid #d6d3d1', borderRadius: 4 }} title="Mapa" />}
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '30px 20px', borderTop: '1px solid #e7e5e4', color: '#64748b', fontSize: 13 }}>
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
