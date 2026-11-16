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

  // HERO CAPA: Pega a foto da coluna (foto1.jpg)
  const fotoFachadaHero = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg'))) 
    || (fotosTodas && fotosTodas[0]) 
    || `${pastaImagens}/foto1.jpg`;

  // NOSSA SEDE (RODAPÉ): Força a busca pela foto11.jpg (fachada real com a porta de vidro)
  const fotoSedeReal = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11'))) 
    || `${pastaImagens}/foto11.jpg`; 

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
    <div style={{ backgroundColor: '#f1f5f9', color: '#0f172a', minHeight: '100vh', fontFamily: '"Inter", system-ui, sans-serif', overflowX: 'hidden' }}>
      
      {/* BANNER SUPERIOR */}
      <div style={{ background: 'linear-gradient(90deg, #022c22 0%, #064e3b 100%)', color: '#34d399', textAlign: 'center', padding: '10px 12px', fontSize: '10px', fontWeight: 800, letterSpacing: '0.05em', lineHeight: 1.4 }}>
        ⚡ PROPOSTA DE DESIGN MODERNO PARA: {nomeExibir.toUpperCase()}
      </div>

      {/* HEADER FIXO */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', overflow: 'hidden' }}>
            {fotoLogotipo && <img src={fotoLogotipo} alt={`Logo ${nomeExibir}`} style={{ maxHeight: '38px', width: 'auto', objectFit: 'contain', flexShrink: 0 }} />}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
              <span style={{ fontSize: '13px', fontWeight: 900, color: corTextoVerde, letterSpacing: '0.3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {nomeExibir}
              </span>
              <span style={{ fontSize: '8px', color: corLaranjaOficial, textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.5px', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                ATENDIMENTO DOMICILIAR • REABILITAÇÃO • QUIROPRAXIA
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* HERO SECTION DA CLÍNICA */}
      <section style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)', color: '#ffffff', padding: '40px 16px 60px 16px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'center', position: 'relative', zIndex: 10 }}>
          
          <div style={{ textAlign: 'left' }}>
            <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#6ee7b7', fontSize: '10px', fontWeight: 800, padding: '6px 14px', borderRadius: '999px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '16px', letterSpacing: '1px' }}>
              ✦ Especialista em eliminar a dor e devolver seu bem-estar
            </span>
            <h1 style={{ fontSize: '30px', fontWeight: 900, lineHeight: 1.15, marginBottom: '16px', color: '#ffffff', letterSpacing: '-1px' }}>
              Sua <span style={{ color: '#34d399' }}>Qualidade de Vida</span> levada a sério.
            </h1>
            <p style={{ fontSize: '15px', color: '#d1fae5', lineHeight: 1.6, marginBottom: '28px', opacity: 0.9 }}>
              Na <strong>{nomeExibir}</strong>, unimos excelência clínica e atendimento humanizado para a sua plena recuperação.
            </p>
            <div>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', background: 'linear-gradient(90deg, #ea580c 0%, #f97316 100%)', color: '#fff', fontWeight: 800, fontSize: '15px', padding: '16px 24px', borderRadius: '999px', textDecoration: 'none', boxShadow: '0 10px 25px rgba(234, 88, 12, 0.3)' }}>
                Falar com Especialista
              </a>
            </div>
          </div>

          <div style={{ borderRadius: '20px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)', overflow: 'hidden', width: '100%', height: '280px', backgroundColor: '#022c22', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px' }}>
            <img src={fotoFachadaHero} alt="Foto Capa" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '14px' }} />
          </div>

        </div>
      </section>

      {/* COMPONENTE INFOGOOGLE */}
      <InfoGoogle d={d} fotos={fotosTodas} tema={temaClaroInfo} />

      {/* CARD FINAL - NOSSA SEDE */}
      <section style={{ padding: '30px 16px 60px 16px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '24px', padding: '24px 20px', boxShadow: '0 15px 30px rgba(2, 44, 34, 0.3)', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', justifyContent: 'center', color: '#fff', textAlign: 'center' }}>
          
          <div style={{ width: '240px', maxWidth: '100%', position: 'relative', margin: '0 auto' }}>
            <div style={{ width: '100%', height: 'auto', borderRadius: '16px', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 16px rgba(0,0,0,0.3)', backgroundColor: '#022c22', padding: '4px' }}>
              <img src={fotoSedeReal} alt="Nossa Sede" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain', borderRadius: '12px' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#f97316', color: '#fff', fontSize: '9px', fontWeight: 900, padding: '5px 14px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
              Nossa Sede
            </div>
          </div>

          <div style={{ width: '100%' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '10px', color: '#ffffff' }}>Visite-nos ou Chame Online</h3>
            <p style={{ fontSize: '14px', color: '#a7f3d0', marginBottom: '22px', lineHeight: 1.5, maxWidth: '500px', margin: '0 auto 22px auto' }}>
              Estamos prontos para atender você na nossa clínica ou no conforto do seu lar.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ background: '#f97316', color: '#fff', fontWeight: 800, fontSize: '13px', padding: '14px 20px', borderRadius: '12px', textDecoration: 'none', flex: '1 1 140px', textAlign: 'center' }}>
                💬 WhatsApp
              </a>
              <a href={mapsURL} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 800, fontSize: '13px', padding: '14px 20px', borderRadius: '12px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', flex: '1 1 140px', textAlign: 'center' }}>
                📍 Rota no Mapa
              </a>
            </div>
            <p style={{ fontSize: '11px', color: '#6ee7b7', marginTop: '18px', wordBreak: 'break-word' }}>📍 {d.enderecoCompleto || lead.endereco}</p>
          </div>

        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#020617', color: '#475569', fontSize: '12px', fontWeight: 600 }}>
        <p>© {new Date().getFullYear()} {nomeExibir}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}