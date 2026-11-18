import { carregarLead, obterFotos, dadosBase, obterLogo } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { HeartPulse, AlertTriangle, ChevronRight, Navigation, MessageCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps { params: Promise<{ cliente: string }> }

export default async function PaginaClinicaModerna({ params }: PageProps) {
  const { cliente } = await params;
  const lead = carregarLead(cliente);

  if (!lead) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-6 text-white text-center font-sans">
        <div className="max-w-lg bg-emerald-900/50 border border-emerald-700/50 rounded-2xl p-8 space-y-4 shadow-2xl">
          <AlertTriangle className="w-12 h-12 text-emerald-400 mx-auto" />
          <h2 className="text-xl font-bold">Nenhum cadastro ativo encontrado para "{cliente}".</h2>
          <p className="text-xs text-emerald-200">
            Certifique-se de que o ficheiro <strong>{cliente}.json</strong> existe dentro da pasta <strong>src/data/clinica/</strong>.
          </p>
        </div>
      </div>
    );
  }

  const fotosObtidas = obterFotos(lead);
  const logo = obterLogo(lead);
  const pastaImagens = `/fotos/${cliente}`;

  // FALLBACK ROBUSTO DE SEGURANÇA PARA A VERCEL (GEF67.COM.BR)
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
  const fotoSedeReal = fotos.find((f: string) => f.includes('foto11')) || fotos[fotos.length - 1];

  const nomeCurto = lead.nome.split(/[-|:,]/)[0].trim();
  const d = dadosBase(lead, `Olá! Vi o site da ${nomeCurto} e gostaria de agendar uma consulta.`);

  const temaClaroInfo = {
    fundo: '#f1f5f9',
    card: '#ffffff',
    borda: '#cbd5e1',
    texto: '#022c22',
    sub: '#475569',
    destaque: '#10b981',
    serif: false
  };

  const localSimples = lead.cidade ? `${lead.cidade}${lead.estado ? ` - ${lead.estado}` : ''}` : 'Atendimento Presencial e Domiciliar';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans overflow-x-hidden">
      
      {/* BANNER SUPERIOR */}
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-emerald-400 text-[10px] sm:text-xs font-black uppercase tracking-widest text-center py-2.5 px-4">
        ⚡ PROPOSTA DE DESIGN MODERNO PARA: {lead.nome.toUpperCase()}
      </div>

      {/* HEADER FIXO */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {logo ? (
              <img src={logo} alt={`Logo ${nomeCurto}`} className="h-10 sm:h-12 w-auto object-contain" />
            ) : (
              <div className="p-2 bg-emerald-100 rounded-xl">
                <HeartPulse className="w-5 h-5 text-emerald-800" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xs sm:text-base font-black text-emerald-950 tracking-tight leading-tight">
                {lead.nome}
              </span>
              <span className="text-[9px] sm:text-[10px] text-orange-600 font-extrabold uppercase tracking-wider mt-0.5">
                ATENDIMENTO DOMICILIAR • REABILITAÇÃO • QUIROPRAXIA
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION DA CLÍNICA */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
          
          <div className="md:col-span-7 space-y-4 sm:space-y-6">
            <span className="bg-white/10 border border-white/20 text-emerald-300 text-[10px] sm:text-xs font-bold px-3.5 sm:px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              ✦ Especialista em eliminar a dor e devolver seu bem-estar
            </span>
            <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight text-white">
              Sua <span className="text-emerald-400">Qualidade de Vida</span> levada a sério.
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed opacity-90 max-w-xl">
              Na <strong className="text-white">{nomeCurto}</strong>, unimos excelência clínica e atendimento humanizado para a sua plena recuperação.
            </p>
            {d.tel && (
              <div className="pt-2">
                <a 
                  href={d.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg shadow-orange-950/40 transition hover:scale-[1.02]"
                >
                  <span>Falar com Especialista</span>
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl shadow-2xl overflow-hidden h-[300px] sm:h-[380px] bg-emerald-950 border border-emerald-800/50 p-2 flex items-center justify-center">
              <img src={fotoFachadaHero} alt={`Especialidade ${nomeCurto}`} className="w-full h-full object-contain rounded-2xl" />
            </div>
          </div>

        </div>
      </section>

      {/* COMPONENTE INFOGOOGLE */}
      <InfoGoogle d={d} fotos={fotos} tema={temaClaroInfo} prefixo="clin-urb" />

      {/* CARD FINAL - NOSSA SEDE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-white">
          
          <div className="md:col-span-5 relative mx-auto w-full max-w-[280px]">
            <div className="rounded-2xl overflow-hidden border-4 border-white/10 shadow-xl bg-emerald-950 p-1 h-56 sm:h-64 flex items-center justify-center">
              <img src={fotoSedeReal} alt={`Sede ${nomeCurto}`} className="w-full h-full object-contain rounded-xl" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
              Nossa Sede
            </div>
          </div>

          <div className="md:col-span-7 text-center md:text-left space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-white">Visite-nos ou Chame Online</h3>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Estamos prontos para atender você na nossa clínica ou no conforto do seu lar.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <a href={d.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-extrabold text-xs uppercase px-5 py-3.5 rounded-xl transition shadow-md">
                <MessageCircle className="w-4 h-4 fill-white text-orange-500" />
                <span>Chamar no WhatsApp</span>
              </a>
              <a href={d.mapa && d.mapa !== '#' ? d.mapa : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeCurto)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase px-5 py-3.5 rounded-xl border border-white/20 transition">
                <Navigation className="w-4 h-4 text-orange-400" />
                <span>Rota no Mapa</span>
              </a>
            </div>
            <p className="text-xs text-emerald-400 pt-3 border-t border-emerald-800/80">
              📍 {d.enderecoCompleto || localSimples}
            </p>
          </div>

        </div>
      </section>

      <footer className="text-center py-6 bg-slate-950 text-slate-500 text-xs font-semibold border-t border-slate-900">
        <p>© {new Date().getFullYear()} {nomeCurto}. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}