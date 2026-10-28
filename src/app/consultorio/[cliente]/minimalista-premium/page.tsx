import { carregarLead, obterFotos, dadosBase, servicosConsultorio, obterLogo, fotoCapa as capaFachada } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps { params: Promise<{ cliente: string }> }

export default async function ConsultorioMinimalista({ params }: PageProps) {
  const { cliente } = await params;
  const lead = carregarLead(cliente);

  if (!lead) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', color: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: 520, background: '#1e293b', border: '1px solid #ef4444', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h1 style={{ fontSize: 20, color: '#fff' }}>JSON do cliente não encontrado</h1>
          <p style={{ fontSize: 14, color: '#94a3b8' }}>Procurei por <strong>{cliente}</strong> em <code>src/data/consultorio/{cliente}.json</code> e não achei.</p>
        </div>
      </div>
    );
  }

  const d = dadosBase(lead, `Olá! Gostaria de agendar uma consulta no ${lead.nome}.`);
  const fotos = obterFotos(lead);
  const fotoCapa = capaFachada(fotos) || null;
  const logo = obterLogo(lead);

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#0284c7', color: '#fff', textAlign: 'center', padding: '8px 16px', fontSize: 13, fontWeight: 600 }}>
        🩺 Proposta de Site Exclusiva preparada para {d.nome}
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
          {logo ? <img src={logo} alt={`Logo ${d.nome}`} style={{ height: 44, width: 'auto', maxWidth: 130, objectFit: 'contain' }} /> : <span style={{ fontSize: 24 }}>👨‍⚕️</span>}
          <div>
            <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: '#fff' }}>{d.nome}</span>
            <span style={{ display: 'block', fontSize: 11, color: '#0ea5e9', textTransform: 'uppercase' }}>{lead.categoria || 'Consultório Especializado'}</span>
          </div>
        </div>
      </header>

      <section style={{ padding: '60px 20px', textAlign: 'center', maxWidth: 1100, margin: '0 auto' }}>
        {fotoCapa && (
          <div style={{ marginBottom: 30, borderRadius: 16, overflow: 'hidden', height: 400, border: '1px solid #334155' }}>
            <img src={fotoCapa} alt={d.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
          Atendimento personalizado com foco na sua saúde e bem-estar
        </h1>
        <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 650, margin: '0 auto 28px' }}>
          Consultas individuais, ambiente acolhedor e dedicação total a cada paciente.
        </p>
        {d.avaliacao > 0 && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#1e293b', padding: '10px 20px', borderRadius: 30, marginBottom: 30, border: '1px solid #334155' }}>
            <span style={{ color: '#f59e0b', fontSize: 18 }}>★</span>
            <span style={{ fontWeight: 700, color: '#fff' }}>{d.avaliacao.toFixed(1)}</span>
            <span style={{ color: '#94a3b8', fontSize: 14 }}>({d.totalAval > 0 ? `${d.totalAval} avaliações no Google` : 'Excelente avaliação'})</span>
          </div>
        )}
        <div>
          <a href={d.whatsapp} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#10b981', color: '#fff', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 10, textDecoration: 'none', boxShadow: '0 6px 20px rgba(16,185,129,0.35)' }}>
            Agendar Consulta pelo WhatsApp
          </a>
        </div>
      </section>

      <section style={{ padding: '50px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 24, color: '#fff' }}>Atendimentos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
          {servicosConsultorio.map((s) => (
            <div key={s.titulo} style={{ padding: 20, backgroundColor: '#1e293b', borderRadius: 12, border: '1px solid #334155' }}>
              <span style={{ fontSize: 26 }}>{s.icone}</span>
              <h3 style={{ fontSize: 16, color: '#fff', margin: '8px 0 6px' }}>{s.titulo}</h3>
              <p style={{ fontSize: 14, color: '#94a3b8', margin: 0 }}>{s.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <InfoGoogle d={d} fotos={fotos} prefixo="cm" tema={{ fundo: '#0f172a', card: '#1e293b', borda: '#334155', texto: '#ffffff', sub: '#94a3b8', destaque: '#0284c7' }} />

      <section style={{ backgroundColor: '#1e293b', borderTop: '1px solid #334155', padding: '40px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ padding: 16, backgroundColor: '#0f172a', borderRadius: 10, border: '1px solid #334155' }}>
              <span style={{ fontSize: 18, display: 'block', marginBottom: 6 }}>📍 Endereço</span>
              <span style={{ fontSize: 14, color: '#cbd5e1' }}>{d.enderecoCompleto || 'Atendimento com hora marcada'}</span>
            </div>
            <div style={{ padding: 16, backgroundColor: '#0f172a', borderRadius: 10, border: '1px solid #334155' }}>
              <span style={{ fontSize: 18, display: 'block', marginBottom: 6 }}>🕒 Horários</span>
              <span style={{ fontSize: 14, color: '#cbd5e1' }}>{d.horarios}</span>
            </div>
            <div style={{ padding: 16, backgroundColor: '#0f172a', borderRadius: 10, border: '1px solid #334155' }}>
              <span style={{ fontSize: 18, display: 'block', marginBottom: 6 }}>📞 Telefone</span>
              <span style={{ fontSize: 14, color: '#cbd5e1' }}>{lead.telefone || 'Contato via WhatsApp'}</span>
            </div>
            <a href={d.mapa} target="_blank" rel="noopener noreferrer" style={{ textAlign: 'center', backgroundColor: '#0284c7', color: '#fff', fontWeight: 700, fontSize: 15, padding: '12px 20px', borderRadius: 10, textDecoration: 'none' }}>
              🗺️ Como chegar
            </a>
          </div>
          {d.mapaEmbed && (
            <iframe src={d.mapaEmbed} loading="lazy" style={{ width: '100%', height: 340, border: 0, borderRadius: 12 }} title="Mapa" />
          )}
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '30px 20px', backgroundColor: '#090d16', borderTop: '1px solid #1e293b', color: '#64748b', fontSize: 13 }}>
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
