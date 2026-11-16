import { carregarLead, obterFotos, dadosBase, obterLogo } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';

interface Props {
  params: Promise<{
    cliente: string;
  }>;
}

export default async function PaginaClinicaVintage({ params }: Props) {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    return (
      <div style={{ background: '#1b3b2b', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
        <h2>Nenhum cadastro ativo encontrado para "{cliente}".</h2>
        <p style={{ marginTop: '10px', color: '#a7f3d0' }}>
          Certifique-se de que o ficheiro <strong>{cliente}.json</strong> existe dentro da pasta <strong>src/data/clinica/</strong>.
        </p>
      </div>
    );
  }

  const nomeExibir = lead.nome || 'Clínica Renovar - Fisioterapia, Pilates e Estética';
  const telLimpo = lead.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(`Olá! Vi o site da ${nomeExibir} e gostaria de agendar uma consulta.`)}` : '#';
  const mapsURL = lead.maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.endereco || nomeExibir)}`;

  const pastaImagens = '/fotos/clinica-renovar-fisioterapia-pilates-e-estetica-iguatu-ce';
  const fotoLogotipo = obterLogo(lead) || ((lead.fotos && lead.fotos.length) ? '' : `${pastaImagens}/renovar8.jpg`);
  const fotosTodas = obterFotos(lead);
  
  const d = dadosBase(lead, `Olá! Vi o site da ${lead.nome} e gostaria de agendar uma consulta.`);

  // 1. FACHADA PRINCIPAL (CAPA): Procura renovar1.jpg ou foto1.jpg
  const fotoFachadaHero = (lead.fotos && lead.fotos.find((f: string) => f.includes('renovar1.jpg') || f.includes('foto1.jpg'))) 
    || (lead.fotos && lead.fotos[0]) 
    || `${pastaImagens}/renovar1.jpg`; 

  // 2. NOSSA SEDE / INSTALAÇÕES (RODAPÉ): Procura especificamente renovar11.jpg ou foto11.jpg
  const fotoSedeRodape = (lead.fotos && lead.fotos.find((f: string) => f.includes('renovar11.jpg') || f.includes('foto11.jpg'))) 
    || (lead.fotos && lead.fotos[10]) 
    || fotoFachadaHero;

  const temaVintageInfo = {
    fundo: '#f4f1ea',
    card: '#ffffff',
    borda: '#dcd6cd',
    texto: '#1b3b2b',
    sub: '#5a6b5c',
    destaque: '#c85a32',
    serif: true
  };

  return (
    <div style={{ backgroundColor: '#f4f1ea', color: '#1b3b2b', minHeight: '100vh', fontFamily: '"Georgia", "Times New Roman", serif', overflowX: 'hidden' }}>
      
      {/* BANNER SUPERIOR */}
      <div style={{ background: '#132a1f', color: '#e2d9cc', textAlign: 'center', padding: '10px 12px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1.4 }}>
        ✧ Proposta Clássica: {nomeExibir} ✧
      </div>

      {/* HEADER VINTAGE FIXO */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#f4f1ea', borderBottom: '1px solid #dcd6cd', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', overflow: 'hidden' }}>
            {fotoLogotipo && <img src={fotoLogotipo} alt={`Logo ${nomeExibir}`} style={{ maxHeight: '38px', width: 'auto', objectFit: 'contain', flexShrink: 0 }} />}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1b3b2b', letterSpacing: '0.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {nomeExibir}
              </span>
              <span style={{ fontSize: '8px', color: '#c85a32', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '1px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                ATENDIMENTO DOMICILIAR • REABILITAÇÃO • QUIROPRAXIA
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* HERO VINTAGE COM FOTO DA FACHADA */}
      <section style={{ background: '#1b3b2b', color: '#f4f1ea', padding: '40px 16px 60px 16px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'center' }}>
          
          <div style={{ textAlign: 'left' }}>
            <span style={{ color: '#dcd6cd', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '6px', maxWidth: 'max-content' }}>
              Especialista em eliminar a dor e devolver seu bem-estar
            </span>
            <h1 style={{ fontSize: '30px', fontWeight: 'normal', lineHeight: 1.2, marginBottom: '18px', color: '#ffffff' }}>
              Mais Movimento, <br />
              <span style={{ fontStyle: 'italic', color: '#e2d9cc' }}>Mais Qualidade de Vida.</span>
            </h1>
            <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '28px', opacity: 0.9, fontFamily: 'sans-serif' }}>
              Na <strong>{nomeExibir}</strong>, unimos excelência terapêutica e cuidado humanizado para garantir a sua plena recuperação, onde quer que você precise.
            </p>
            <div>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', backgroundColor: '#c85a32', color: '#ffffff', fontWeight: 'bold', fontSize: '14px', padding: '16px 24px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 10px 25px rgba(200, 90, 50, 0.3)' }}>
                Falar com um Especialista
              </a>
            </div>
          </div>

          <div style={{ border: '4px solid #f4f1ea', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', overflow: 'hidden', width: '100%', backgroundColor: '#132a1f', padding: '4px' }}>
            <img src={fotoFachadaHero} alt="Fachada da Clínica" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
          </div>

        </div>
      </section>

      {/* COMPONENTE INFOGOOGLE */}
      <InfoGoogle d={d} fotos={fotosTodas} tema={temaVintageInfo} />

      {/* CARD FINAL - NOSSA SEDE / INSTALAÇÕES */}
      <section style={{ padding: '30px 16px 60px 16px', backgroundColor: '#e2d9cc' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: '#f4f1ea', border: '1px solid #dcd6cd', padding: '24px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          
          <div style={{ width: '240px', maxWidth: '100%', position: 'relative', margin: '0 auto' }}>
            <div style={{ width: '100%', height: 'auto', border: '1px solid #dcd6cd', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', backgroundColor: '#fff', padding: '4px' }}>
              <img src={fotoSedeRodape} alt="Nossas Instalações" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#c85a32', color: '#fff', fontSize: '9px', fontWeight: 'bold', padding: '5px 14px', textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
              Nossas Instalações
            </div>
          </div>

          <div style={{ width: '100%' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 'normal', marginBottom: '10px', color: '#1b3b2b' }}>Endereço & Contato</h3>
            <p style={{ fontSize: '14px', color: '#5a6b5c', marginBottom: '22px', lineHeight: 1.6, fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto 22px auto' }}>
              Sinta-se à vontade para nos contactar via WhatsApp ou visitar o nosso espaço.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ background: '#1b3b2b', color: '#fff', fontWeight: 'bold', fontSize: '12px', padding: '14px 20px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', flex: '1 1 140px', textAlign: 'center' }}>
                💬 WhatsApp
              </a>
              <a href={mapsURL} target="_blank" rel="noopener noreferrer" style={{ background: 'transparent', color: '#1b3b2b', fontWeight: 'bold', fontSize: '12px', padding: '14px 20px', textDecoration: 'none', border: '1px solid #1b3b2b', textTransform: 'uppercase', letterSpacing: '1px', flex: '1 1 140px', textAlign: 'center' }}>
                📍 Ver no Mapa
              </a>
            </div>
            <p style={{ fontSize: '11px', color: '#5a6b5c', marginTop: '18px', fontStyle: 'italic', wordBreak: 'break-word' }}>
              📍 R. Antônio Mendonça, 479a - Planalto, Iguatu - CE, 63500-775
            </p>
          </div>

        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '24px', backgroundColor: '#1b3b2b', color: '#e2d9cc', fontSize: '12px' }}>
        <p>© {new Date().getFullYear()} {nomeExibir}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}