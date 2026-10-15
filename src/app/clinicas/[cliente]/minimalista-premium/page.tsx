import fs from 'fs';
import path from 'path';

interface Props {
  params: Promise<{
    cliente: string;
  }>;
}

export default async function PaginaClinicaMinimalista({ params }: Props) {
  // 1. Obtém o nome do cliente a partir da URL (ex: 'renovar', 'z1')
  const { cliente } = await params;

  // 2. Caminho do ficheiro JSON em src/data/clinicas/[cliente].json
  const filePath = path.join(process.cwd(), 'src', 'data', 'clinicas', `${cliente}.json`);

  let data = null;
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(fileContents);
  } catch (error) {
    return (
      <div style={{ backgroundColor: '#003a2b', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
        <h2>Nenhum cadastro ativo encontrado para "{cliente}".</h2>
        <p style={{ marginTop: '10px', color: '#cbd5e1' }}>Verifique se o ficheiro {cliente}.json existe na pasta src/data/clinicas/.</p>
      </div>
    );
  }

  const lead = data?.lead;

  if (!lead) {
    return (
      <div style={{ backgroundColor: '#003a2b', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Nenhum lead ativo encontrado no momento.</h2>
      </div>
    );
  }

  // 3. Trava de Expiração de 2 Dias (Degustação Comercial)
  const agora = new Date();
  const dataExpiracao = lead.expira_em ? new Date(lead.expira_em) : null;

  if (!lead.ativo || (dataExpiracao && agora > dataExpiracao)) {
    return (
      <div style={{ backgroundColor: '#0f172a', color: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '40px 24px', maxWidth: '500px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
          <span style={{ fontSize: '40px', marginBottom: '16px', display: 'block' }}>⏳</span>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px', color: '#f8fafc' }}>Demonstração Expirada</h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
            O período de degustação da demonstração do website para <strong>{lead.nome}</strong> chegou ao fim.
          </p>
          <a
            href={`https://wa.me/55${lead.telefone ? lead.telefone.replace(/\D/g, '') : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: '#10b981', color: '#ffffff', fontWeight: 700, fontSize: '14px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}
          >
            Falar no WhatsApp para Reativar
          </a>
        </div>
      </div>
    );
  }

  // Dados do Lead
  const nomeExibir = lead.nome || 'Clínica Renovar - Fisioterapia, Pilates e Estética';
  const telLimpo = lead.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(`Olá! Vi o site da ${nomeExibir} e gostaria de agendar uma consulta.`)}` : '#';
  const mapsURL = lead.maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.endereco || nomeExibir)}`;

  const corVerdeOficial = '#10b981';
  const corVerdeEscuro = '#005c45';
  const corLaranjaOficial = '#e05a10';
  const corTextoVerde = '#0d5c46'; 

  const pastaImagens = '/fotos/clinica-renovar-fisioterapia-pilates-e-estetica-iguatu-ce';
  const fotoLogotipo = `${pastaImagens}/renovar8.jpg`;
  const fotoPrincipal = `${pastaImagens}/renovar7.jpg`; 
  const fotoFachadaReal = `${pastaImagens}/foto1.jpg`; 
  const fotosGaleria = [`${pastaImagens}/renovar2.jpg`];

  const todosOsServicos = [
    { titulo: 'Fisioterapia na Coluna Vertebral', desc: 'Tratamento focado na coluna, alívio contínuo da dor e recuperação do movimento.' },
    { titulo: 'Fisioterapia Traumato-Ortopédica', desc: 'Reabilitação pós-cirúrgica, fraturas, luxações e lesões articulares.' },
    { titulo: 'Atendimento Domiciliar', desc: 'Fisioterapia no conforto do seu lar com flexibilidade e total praticidade.' },
    { titulo: 'Reabilitação do Idoso', desc: 'Treino de equilíbrio, prevenção de quedas e autonomia para a terceira idade.' },
    { titulo: 'Pilates Terapêutico & Clínico', desc: 'Aparelhos completos para postura e flexibilidade com turmas reduzidas.' },
    { titulo: 'Quiropraxia', desc: 'Ajustes articulares focados em restaurar a função da coluna e aliviar dores.' },
    { titulo: 'Ventosaterapia', desc: 'Alívio de tensões musculares, melhora da circulação e relaxamento profundo.' },
    { titulo: 'Estética Avançada', desc: 'Procedimentos faciais e corporais focados no seu cuidado integral.' },
    { titulo: 'Palmilhas Posturais', desc: 'Avaliação biomecânica e confecção de palmilhas sob medida.' }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <div style={{ backgroundColor: corVerdeEscuro, color: '#ffffff', textAlign: 'center', padding: '8px 16px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.02em' }}>
        🏥 PROPOSTA EXCLUSIVA DE WEBSITE DESENVOLVIDA PARA: {nomeExibir.toUpperCase()}
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img src={fotoLogotipo} alt="Logo" style={{ maxHeight: '55px', width: 'auto', objectFit: 'contain' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: 900, color: corTextoVerde, letterSpacing: '0.3px' }}>
                {nomeExibir}
              </span>
              <span style={{ fontSize: '10px', color: corLaranjaOficial, textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.5px', marginTop: '2px' }}>
                ATENDIMENTO DOMICILIAR • REABILITAÇÃO DO IDOSO • QUIROPRAXIA
              </span>
            </div>
          </div>

          <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: corVerdeOficial, color: '#fff', fontWeight: 700, fontSize: '13px', padding: '10px 22px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)' }}>
            Agendar Consulta
          </a>
        </div>
      </header>

      <section style={{ backgroundColor: '#003a2b', color: '#ffffff', padding: '60px 20px', borderBottom: `4px solid ${corVerdeEscuro}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#86efac', border: '1px solid #86efac', fontSize: '12px', fontWeight: 800, padding: '6px 16px', borderRadius: '20px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '16px' }}>
              Especialista em eliminar a dor e devolver seu bem-estar
            </span>
            <h1 style={{ fontSize: '40px', fontWeight: 900, lineHeight: 1.2, marginBottom: '20px', color: '#ffffff' }}>
              Mais Movimento, Mais Qualidade de Vida.
            </h1>
            <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '32px' }}>
              Na <strong>{nomeExibir}</strong>, oferecemos atendimento presencial e domiciliar especializado para sua plena recuperação e saúde.
            </p>
            <div>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: corLaranjaOficial, color: '#fff', fontWeight: 800, fontSize: '16px', padding: '16px 36px', borderRadius: '8px', textDecoration: 'none', boxShadow: `0 8px 20px ${corLaranjaOficial}55` }}>
                Agendar Sua Avaliação
              </a>
            </div>
          </div>

          <div style={{ borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', overflow: 'hidden', width: '100%' }}>
            <img src={fotoPrincipal} alt="Fisioterapia" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 900, textAlign: 'center', color: corVerdeEscuro, marginBottom: '8px' }}>
          Nossas Especialidades
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '15px', marginBottom: '40px' }}>
          Tratamentos completos oferecidos no consultório ou no seu domicílio
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {todosOsServicos.map((s, idx) => (
            <div key={idx} style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>{s.titulo}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, marginBottom: '24px' }}>{s.desc}</p>
              </div>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ color: corVerdeOficial, fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                Consultar Agendamento &rarr;
              </a>
            </div>
          ))}
        </div>
      </section>

      {fotosGaleria.length > 0 && (
        <section style={{ maxWidth: '1200px', margin: '0 auto 60px auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, textAlign: 'center', color: corVerdeEscuro, marginBottom: '8px' }}>
            Nossa Estrutura e Atendimento
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {fotosGaleria.map((foto, idx) => (
              <div key={idx} style={{ width: '280px', height: '220px', borderRadius: '14px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <img src={foto} alt="Estrutura" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '40px 20px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '30px', alignItems: 'center', justifyContent: 'center' }}>
          
          <div style={{ backgroundColor: '#ffffff', padding: '8px', borderRadius: '12px', textAlign: 'center', width: '280px', flexShrink: 0 }}>
            <div style={{ width: '100%', height: 'auto', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={fotoFachadaReal} alt="Fachada" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
            </div>
            <span style={{ display: 'block', fontSize: '12px', color: '#0f172a', fontWeight: 800, marginTop: '8px' }}>
              Nossa Fachada
            </span>
          </div>

          <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '24px 20px', border: '1px solid #334155', textAlign: 'center', flex: '1 1 300px', maxWidth: '400px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: '#ffffff' }}>Localização & Contato</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px', lineHeight: 1.4 }}>
              Dúvidas sobre consultas ou atendimento domiciliar? Fale connosco ou trace sua rota.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ flex: '1 1 auto', minWidth: '140px', backgroundColor: corVerdeOficial, color: '#fff', fontWeight: 700, fontSize: '12px', padding: '10px 12px', borderRadius: '6px', textDecoration: 'none' }}>
                💬 Chamar WhatsApp
              </a>
              <a href={mapsURL} target="_blank" rel="noopener noreferrer" style={{ flex: '1 1 auto', minWidth: '140px', backgroundColor: corLaranjaOficial, color: '#fff', fontWeight: 700, fontSize: '12px', padding: '10px 12px', borderRadius: '6px', textDecoration: 'none' }}>
                📍 Maps (GPS)
              </a>
            </div>
            <p style={{ fontSize: '11px', color: '#64748b', marginTop: '16px' }}>{lead.endereco}</p>
          </div>

        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#020617', color: '#64748b', fontSize: '12px' }}>
        <p>© {new Date().getFullYear()} {nomeExibir}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}