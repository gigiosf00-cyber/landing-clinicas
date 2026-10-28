import { carregarLead, obterFotos, dadosBase, obterLogo } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';

interface Props {
  params: Promise<{
    cliente: string;
  }>;
}

export default async function PaginaClinicaVintage({ params }: Props) {
  // 1. Obtém o nome do cliente a partir da URL
  const { cliente } = await params;

  // Busca em src/data/** (aceita slug completo ou só o início, ex.: clinica-renovar)
  const lead: any = carregarLead(cliente);

  if (!lead) {
    return (
      <div style={{ backgroundColor: '#2e4333', color: '#fdfbf7', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center', fontFamily: 'Georgia, serif' }}>
        <h2>Nenhum cadastro ativo encontrado para "{cliente}".</h2>
        <p style={{ marginTop: '10px', color: '#cbd5e1', fontSize: '14px' }}>
          Certifique-se de que o ficheiro <strong>{cliente}.json</strong> existe dentro da pasta <strong>src/data/clinica/</strong>.
        </p>
      </div>
    );
  }

  const nomeExibir = lead.nome || 'Clínica Renovar - Fisioterapia, Pilates e Estética';
  const telLimpo = lead.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsappURL = telLimpo ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(`Olá! Vi o site da ${nomeExibir} e gostaria de agendar uma consulta.`)}` : '#';
  const mapsURL = lead.maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.endereco || nomeExibir)}`;

  const corFundoCreme = '#fdfbf7';
  const corVerdeMusgo = '#2a4031'; 
  const corLaranjaFerrugem = '#bc561a'; 
  const corTextoEscuro = '#332f2c';
  const corBorda = '#d4ccbf';

  const pastaImagens = '/fotos/clinica-renovar-fisioterapia-pilates-e-estetica-iguatu-ce';
  // Logo real (public/fotos/{slug}/logo.png); a foto 0 da API NÃO é mais usada como logo
  const fotoLogotipo = obterLogo(lead) || ((lead.fotos && lead.fotos.length) ? '' : `${pastaImagens}/renovar8.jpg`);
  const fotosTodas = obterFotos(lead);
  const fachadaNomeada = fotosTodas.find((u) => /\/(fachada|exterior)[^/]*$/i.test(u));
  const d = dadosBase(lead, `Olá! Vi o site da ${lead.nome} e gostaria de agendar uma consulta.`);
  const fotoPrincipal = (lead.fotos && lead.fotos[1]) || `${pastaImagens}/renovar7.jpg`;
  const fotoFachadaReal = fachadaNomeada || (lead.fotos_ambiente && lead.fotos_ambiente[0]) || `${pastaImagens}/foto1.jpg`; 
  const fotosGaleria = (lead.fotos_ambiente && lead.fotos_ambiente.length > 1) 
    ? lead.fotos_ambiente.slice(1) 
    : [`${pastaImagens}/renovar2.jpg`];

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
    <div style={{ backgroundColor: corFundoCreme, color: corTextoEscuro, minHeight: '100vh', fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif' }}>
      
      <div style={{ backgroundColor: '#1a261d', color: '#dce5db', textAlign: 'center', padding: '10px 16px', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        ✧ Proposta de Identidade Clássica: {nomeExibir} ✧
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: corFundoCreme, borderBottom: `2px solid ${corVerdeMusgo}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {fotoLogotipo && <img src={fotoLogotipo} alt={`Logo ${nomeExibir}`} style={{ maxHeight: '50px', width: 'auto', objectFit: 'contain' }} />}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '17px', color: corVerdeMusgo, letterSpacing: '0.5px' }}>
                {nomeExibir}
              </span>
              <span style={{ fontSize: '10px', color: corLaranjaFerrugem, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px', fontFamily: 'system-ui, sans-serif', fontWeight: 700 }}>
                ATENDIMENTO DOMICILIAR • REABILITAÇÃO DO IDOSO • QUIROPRAXIA
              </span>
            </div>
          </div>

          <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: corVerdeMusgo, color: '#fff', fontSize: '12px', padding: '12px 28px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', border: `1px solid ${corVerdeMusgo}` }}>
            Agendar Consulta
          </a>
        </div>
      </header>

      <section style={{ backgroundColor: corVerdeMusgo, color: '#fdfbf7', padding: '70px 20px', borderBottom: `8px solid ${corLaranjaFerrugem}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
          
          <div>
            <span style={{ color: '#dce5db', fontSize: '12px', padding: '0', textTransform: 'uppercase', display: 'inline-block', marginBottom: '24px', letterSpacing: '1.5px', borderBottom: '1px solid #dce5db', paddingBottom: '4px' }}>
              Especialista em eliminar a dor e devolver seu bem-estar
            </span>

            <h1 style={{ fontSize: '44px', lineHeight: 1.2, marginBottom: '24px', color: '#fdfbf7', fontWeight: 'normal' }}>
              Mais Movimento,<br /> Mais <span style={{ color: '#e8a97b', fontStyle: 'italic' }}>Qualidade de Vida</span>.
            </h1>

            <p style={{ fontSize: '17px', color: '#b5c5b8', lineHeight: 1.7, marginBottom: '40px', fontFamily: 'system-ui, sans-serif', fontWeight: 300 }}>
              Na <strong>{nomeExibir}</strong>, unimos excelência terapêutica e cuidado humanizado para garantir a sua plena recuperação, onde quer que você precise.
            </p>

            <div>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: corLaranjaFerrugem, color: '#fff', fontSize: '14px', padding: '16px 40px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid #94400e' }}>
                Fale com um Especialista
              </a>
            </div>
          </div>

          <div style={{ padding: '8px', backgroundColor: '#fdfbf7', border: '1px solid #9baaa0' }}>
            <img src={fotoPrincipal} alt="Tratamento Fisioterapia" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
          </div>

        </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '70px auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '32px', color: corVerdeMusgo, fontWeight: 'normal', position: 'relative', display: 'inline-block' }}>
            Nossas Especialidades
            <div style={{ width: '100%', height: '1px', backgroundColor: corLaranjaFerrugem, marginTop: '16px' }}></div>
          </h2>
          <p style={{ textAlign: 'center', color: '#686058', fontSize: '15px', marginTop: '16px', fontFamily: 'system-ui, sans-serif' }}>
            Tratamentos completos oferecidos no consultório ou no seu domicílio
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {todosOsServicos.map((s, idx) => (
            <div key={idx} style={{ backgroundColor: '#fff', padding: '36px 28px', border: `1px solid ${corBorda}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '4px 4px 0px rgba(0,0,0,0.03)' }}>
              <div>
                <h3 style={{ fontSize: '20px', color: corVerdeMusgo, marginBottom: '14px', fontWeight: 'normal' }}>
                  {s.titulo}
                </h3>
                <p style={{ fontSize: '14px', color: '#59524a', lineHeight: 1.6, marginBottom: '28px', fontFamily: 'system-ui, sans-serif' }}>{s.desc}</p>
              </div>

              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ color: corLaranjaFerrugem, fontSize: '13px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, borderBottom: `1px solid ${corLaranjaFerrugem}`, display: 'inline-block', alignSelf: 'flex-start', paddingBottom: '2px' }}>
                Consultar Horário
              </a>
            </div>
          ))}
        </div>
      </section>

      <InfoGoogle d={d} fotos={fotosTodas} prefixo="kv" tema={{ fundo: '#f5f0e6', card: '#ffffff', borda: '#d4ccbf', texto: '#2a4031', sub: '#57534e', destaque: '#bc561a', serif: true }} />

      <section style={{ backgroundColor: '#eae3d5', padding: '60px 20px', borderTop: `1px solid ${corBorda}` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '50px', alignItems: 'center', justifyContent: 'center' }}>
          
          <div style={{ padding: '8px', backgroundColor: '#fff', border: '1px solid #d1c7b7', textAlign: 'center', width: '280px', flexShrink: 0 }}>
            <img 
              src={fotoFachadaReal} 
              alt="Fachada" 
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} 
            />
            <div style={{ padding: '12px 0 4px 0', fontSize: '11px', color: '#59524a', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Nossas Instalações
            </div>
          </div>

          <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <h3 style={{ fontSize: '26px', color: corVerdeMusgo, marginBottom: '16px', fontWeight: 'normal' }}>Endereço & Contato</h3>
            <p style={{ fontSize: '15px', color: '#59524a', marginBottom: '28px', lineHeight: 1.6, fontFamily: 'system-ui, sans-serif' }}>
              Sinta-se à vontade para nos contactar via WhatsApp ou visitar o nosso espaço.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a href={whatsappURL} target="_blank" rel="noopener noreferrer" style={{ flex: '1 1 auto', minWidth: '150px', backgroundColor: corVerdeMusgo, color: '#fff', fontSize: '12px', padding: '14px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', border: `1px solid ${corVerdeMusgo}` }}>
                Chamar WhatsApp
              </a>

              <a href={mapsURL} target="_blank" rel="noopener noreferrer" style={{ flex: '1 1 auto', minWidth: '150px', backgroundColor: 'transparent', color: corVerdeMusgo, fontSize: '12px', padding: '14px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', border: `1px solid ${corVerdeMusgo}` }}>
                Ver no Mapa
              </a>
            </div>
            
            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: `1px solid #d1c7b7` }}>
              <p style={{ fontSize: '13px', color: '#59524a', fontFamily: 'system-ui, sans-serif', fontStyle: 'italic' }}>
                📍 {lead.endereco}
              </p>
            </div>
          </div>

        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '30px 20px', backgroundColor: corVerdeMusgo, color: '#b5c5b8', fontSize: '12px', fontFamily: 'system-ui, sans-serif' }}>
        <p>© {new Date().getFullYear()} {nomeExibir}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}