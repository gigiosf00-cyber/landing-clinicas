import { carregarLead, obterFotos, dadosBase, obterLogo } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { HeartPulse, AlertTriangle, ChevronRight, Navigation, MessageCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps { params: Promise<{ cliente: string }> }

export default async function PaginaClinicaVintage({ params }: PageProps) {
  const { cliente } = await params;
  const lead = carregarLead(cliente);

  if (!lead) {
    return (
      <div className="min-h-screen bg-[#1b3b2b] flex items-center justify-center p-6 text-white text-center font-serif">
        <div className="max-w-lg bg-emerald-900/40 border border-emerald-700/40 rounded-2xl p-8 space-y-4 shadow-2xl">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold">Nenhum cadastro ativo encontrado para "{cliente}".</h2>
          <p className="text-xs text-emerald-200 font-sans">
            Certifique-se de que o ficheiro <strong>{cliente}.json</strong> existe dentro da pasta <strong>src/data/clinica/</strong>.
          </p>
        </div>
      </div>
    );
  }

  const fotosObtidas = obterFotos(lead);
  const logo = obterLogo(lead);
  const pastaImagens = `/fotos/${cliente}`;

  // FALLBACK ROBUSTO DE SEGURANÇA PARA PRODUÇÃO (VERCEL)
  const fotos = (fotosObtidas && fotosObtidas.length > 0) ? fotosObtidas : [
    `${pastaImagens}/foto1.jpg`,
    `${pastaImagens}/foto2.jpg`,
    `${pastaImagens}/foto3.jpg`,
    `${pastaImagens}/foto6.jpg`,
    `${pastaImagens}/foto7.jpg`,
    `${pastaImagens}/foto8.jpg`,
    `${pastaImagens}/foto9.jpg`,
    `${pastaImagens}/foto11.jpg`
  ];

  // 1. CAPA HERO: Foto da coluna (foto1.jpg)
  const fotoFachadaHero = fotos.find((f: string) => f.includes('foto1.jpg')) || fotos[0];

  // 2. NOSSA SEDE: Foto da fachada com porta de vidro (foto11.jpg)
  const fotoSedeRodape = fotos.find((f: string) => f.includes('foto11')) || fotos[fotos.length - 1];

  const nomeCurto = lead.nome.split(/[-|:,]/)[0].trim();
  const d = dadosBase(lead, `Olá! Vi o site da ${nomeCurto} e gostaria de agendar uma consulta.`);

  const temaVintageInfo = {
    fundo: '#f4f1ea',
    card: '#ffffff',
    borda: '#dcd6cd',
    texto: '#1b3b2b',
    sub: '#5a6b5c',
    destaque: '#c85a32',
    serif: true
  };

  const localSimples = lead.cidade ? `${lead.cidade}${lead.estado ? ` - ${lead.estado}` : ''}` : 'Atendimento Presencial e Domiciliar';

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#1b3b2b] font-serif overflow-x-hidden">
      
      {/* BANNER SUPERIOR */}
      <div className="bg-[#132a1f] text-[#e2d9cc] text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-center py-2 px-4 font-sans">
        ✧ PROPOSTA CLÁSSICA PARA: {lead.nome.toUpperCase()} ✧
      </div>

      {/* HEADER VINTAGE FIXO */}
      <header className="sticky top-0 z-50 bg-[#f4f1ea]/95 backdrop-blur-md border-b border-[#dcd6cd] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 sm:gap-4">
            {logo ? (
              <img src={logo} alt={`Logo ${nomeCurto}`} className="h-10 sm:h-12 w-auto object-contain" />
            ) : (
              <div className="p-2 bg-[#1b3b2b]/10 rounded-xl">
                <HeartPulse className="w-5 h-5 text-[#1b3b2b]" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-[#1b3b2b] tracking-wider leading-tight">
                {lead.nome}
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#c85a32] font-semibold uppercase tracking-widest mt-0.5 font-sans">
                ATENDIMENTO DOMICILIAR • REABILITAÇÃO • QUIROPRAXIA
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO VINTAGE COM FOTO DA FACHADA */}
      <section className="bg-[#1b3b2b] text-[#f4f1ea] py-12 sm:py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          <div className="md:col-span-7 space-y-4 sm:space-y-6">
            <span className="text-[#dcd6cd] text-[10px] sm:text-xs font-semibold uppercase tracking-widest border-b border-white/20 pb-2 inline-block font-sans">
              Especialista em eliminar a dor e devolver seu bem-estar
            </span>
            <h1 className="text-3xl sm:text-5xl font-normal leading-tight text-white">
              Mais Movimento, <br />
              <span className="italic text-[#e2d9cc]">Mais Qualidade de Vida.</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed opacity-90 max-w-xl font-sans">
              Na <strong className="text-white">{nomeCurto}</strong>, unimos excelência terapêutica e cuidado humanizado para garantir a sua plena recuperação, onde quer que você precise.
            </p>
            {d.tel && (
              <div className="pt-2 font-sans">
                <a 
                  href={d.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-[#c85a32] hover:bg-[#b04d28] text-white font-bold text-xs sm:text-sm px-7 sm:px-9 py-4 uppercase tracking-wider transition shadow-lg hover:scale-[1.02]"
                >
                  <span>Falar com um Especialista</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          <div className="md:col-span-5">
            <div className="border-4 border-[#f4f1ea] shadow-2xl overflow-hidden h-[300px] sm:h-[380px] bg-[#132a1f] p-2 flex items-center justify-center">
              <img src={fotoFachadaHero} alt={`Especialidade ${nomeCurto}`} className="w-full h-full object-contain" />
            </div>
          </div>

        </div>
      </section>

      {/* COMPONENTE INFOGOOGLE */}
      <InfoGoogle d={d} fotos={fotos} tema={temaVintageInfo} prefixo="clin-vint" />

      {/* CARD FINAL - NOSSA SEDE / INSTALAÇÕES */}
      <section className="bg-[#e2d9cc] py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-[#f4f1ea] border border-[#dcd6cd] p-6 sm:p-10 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 relative mx-auto w-full max-w-[280px]">
            <div className="border border-[#dcd6cd] shadow-md bg-[#132a1f] p-1 h-56 sm:h-64 flex items-center justify-center">
              <img src={fotoSedeRodape} alt={`Sede ${nomeCurto}`} className="w-full h-full object-contain" />
            </div>
            <div className="text-center mt-3 bg-[#c85a32] text-white text-[10px] font-bold py-1 px-3 uppercase tracking-widest inline-block font-sans shadow-sm">
              Nossas Instalações
            </div>
          </div>

          <div className="md:col-span-7 text-center md:text-left space-y-4">
            <h3 className="text-2xl sm:text-3xl font-normal text-[#1b3b2b]">Endereço & Contato</h3>
            <p className="text-[#5a6b5c] text-sm leading-relaxed font-sans">
              Sinta-se à vontade para nos contactar via WhatsApp ou visitar o nosso espaço.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2 font-sans">
              <a href={d.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#1b3b2b] hover:bg-[#132a1f] text-white font-bold text-xs uppercase px-5 sm:px-6 py-3.5 tracking-wider transition">
                <MessageCircle className="w-4 h-4 fill-white text-[#1b3b2b]" />
                <span>Chamar WhatsApp</span>
              </a>
              <a href={d.mapa && d.mapa !== '#' ? d.mapa : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeCurto)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-transparent hover:bg-[#1b3b2b]/10 text-[#1b3b2b] font-bold text-xs uppercase px-5 sm:px-6 py-3.5 border border-[#1b3b2b] tracking-wider transition">
                <Navigation className="w-4 h-4 text-[#c85a32]" />
                <span>Ver no Mapa</span>
              </a>
            </div>
            <p className="text-xs text-[#5a6b5c] pt-3 border-t border-[#dcd6cd] italic font-sans">
              📍 {d.enderecoCompleto || localSimples}
            </p>
          </div>

        </div>
      </section>

      <footer className="text-center py-6 bg-[#1b3b2b] text-[#dcd6cd] text-xs font-sans">
        <p>© {new Date().getFullYear()} {nomeCurto}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}