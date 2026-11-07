import { carregarLead, obterFotos, dadosBase, obterLogo } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';

interface Props {
  params: Promise<{
    cliente: string;
  }>;
}

export default async function PaginaClinicaModerna({ params }: Props) {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    return (
      <div style={{ background: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
        <h2>Nenhum cadastro ativo encontrado para "{cliente}".</h2>
        <p style={{ marginTop: '10px', color: '#cbd5e1' }}>
          Certifique-se de que o ficheiro <strong>{cliente}.json</strong> existe dentro da pasta <strong>src/data/clinica/</strong>.
        </p>
      </div>
    );
  }

  const nomeExibir = lead.nome || 'Clínica Renovar - Fisioterapia, Pilates e Estética';
  const telLimpo = lead.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(`Olá! Vi o site da ${nomeExibir} e gostaria de agendar uma consulta.`)}` : '#';
  const mapsURL = lead.maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.endereco || nomeExibir)}`;

  const corLaranjaOficial = '#f97316'; 
  const corTextoVerde = '#064e3b'; 

  const pastaImagens = '/fotos/clinica-renovar-fisioterapia-pilates-e-estetica-iguatu-ce';
  const fotoLogotipo = obterLogo(lead) || ((lead.fotos && lead.fotos.length) ? '' : `${pastaImagens}/renovar8.jpg`);
  const fotosTodas = obterFotos(lead);
  
  const d = dadosBase(lead, `Olá! Vi o site da ${lead.nome} e gostaria de agendar uma consulta.`);

  // FACHADA REAL NA CAPA DO HERO E NA SEDE
  const fotoFachadaReal = (lead.fotos && lead.fotos[0]) || `${pastaImagens}/foto1.jpg`; 

  // TEMA CLARO E HARMONIOSO
  const temaClaroInfo = {
    fundo: '#f1f5f9',
    card: '#ffffff',
    borda: '#cbd5e1',
    texto: '#022c22',
    sub: '#475569',
    destaque: '#10b981',
    serif: false
  };

  return (
    <div style={{ backgroundColor: '#f1f5f9', color: '#0f172a', minHeight: '100vh', fontFamily: '"Inter", system-ui, sans-serif' }}>
      
      {/* BANNER SUPERIOR */}
      <div style={{ background: 'linear-gradient(90deg, #022c22 0%, #064e3b 100%)', color: '#34d399', textAlign: 'center', padding: '10px 16px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.05em' }}>
        ⚡ PROPOSTA DE DESIGN MODERNO PARA: {nomeExibir.toUpperCase()}
      </div>

      {/* HEADER FIXO */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {fotoLogotipo && <img src={fotoLogotipo} alt={`Logo ${nomeExibir}`} style={{ maxHeight: '50px', width: 'auto', objectFit: 'contain' }} />}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '15px', fontWeight: 900, color: corTextoVerde, letterSpacing: '0.3px' }}>
                {nomeExibir}
              </span>
              <span style={{ fontSize: '10px', color: corLaranjaOficial, textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.8px', marginTop: '2px' }}>
                ATENDIMENTO DOMICILIAR • REABILITAÇÃO DO IDOSO • QUIROPRAXIA
              </span>
            </div>
          </div>

          <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', color: '#fff', fontWeight: 800, fontSize: '13px', padding: '10px 24px', borderRadius: '999px', textDecoration: 'none' }}>
            Agendar Agora
          </a>
        </div>
      </header>

      {/* HERO SECTION DA CLÍNICA COM FOTO DA FACHADA */}
      <section style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)', color: '#ffffff', padding: '80px 20px 100px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center', position: 'relative', zIndex: 10 }}>
          
          <div>
            <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#6ee7b7', fontSize: '11px', fontWeight: 800, padding: '8px 18px', borderRadius: '999px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '20px', letterSpacing: '1px' }}>
              ✦ Especialista em eliminar a dor e devolver seu bem-estar
            </span>
            <h1 style={{ fontSize: '46px', fontWeight: 900, lineHeight: 1.15, marginBottom: '24px', color: '#ffffff', letterSpacing: '-1px' }}>
              Sua <span style={{ color: '#34d399' }}>Qualidade de Vida</span> levada a sério.
            </h1>
            <p style={{ fontSize: '17px', color: '#d1fae5', lineHeight: 1.6, marginBottom: '40px', opacity: 0.9 }}>
              Na <strong>{nomeExibir}</strong>, unimos excelência clínica e atendimento humanizado para a sua plena recuperação.
            </p>
            <div>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'linear-gradient(90deg, #ea580c 0%, #f97316 100%)', color: '#fff', fontWeight: 800, fontSize: '16px', padding: '18px 40px', borderRadius: '999px', textDecoration: 'none' }}>
                Falar com Especialista
              </a>
            </div>
          </div>

          <div style={{ borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden', width: '100%', transform: 'translateY(-10px)' }}>
            <img src={fotoFachadaReal} alt="Fachada da Clínica" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
          </div>

        </div>
      </section>

      {/* COMPONENTE PRINCIPAL (RÁPIDOS, ESPECIALIDADES COM HOVER LARANJA, GALERIA, AVALIAÇÕES E MAPA) */}
      <InfoGoogle d={d} fotos={fotosTodas} tema={temaClaroInfo} />

      {/* CARD FINAL - NOSSA SEDE */}
      <section style={{ padding: '40px 20px 80px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '40px', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          
          <div style={{ width: '260px', flexShrink: 0, position: 'relative' }}>
            <div style={{ width: '100%', height: 'auto', borderRadius: '20px', overflow: 'hidden', border: '4px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
              <img src={fotoFachadaReal} alt="Fachada" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#f97316', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '6px 16px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Nossa Sede
            </div>
          </div>

          <div style={{ flex: '1 1 300px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '12px', color: '#ffffff' }}>Visite-nos ou Chame Online</h3>
            <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '28px', lineHeight: 1.5 }}>
              Estamos prontos para atender você na nossa clínica ou no conforto do seu lar.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ background: '#10b981', color: '#fff', fontWeight: 800, fontSize: '13px', padding: '14px 20px', borderRadius: '12px', textDecoration: 'none' }}>
                💬 Chamar no WhatsApp
              </a>
              <a href={mapsURL} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 800, fontSize: '13px', padding: '14px 20px', borderRadius: '12px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
                📍 Rota no Mapa
              </a>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '20px' }}>{lead.endereco}</p>
          </div>

        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#020617', color: '#475569', fontSize: '12px', fontWeight: 600 }}>
        <p>© {new Date().getFullYear()} {nomeExibir}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}