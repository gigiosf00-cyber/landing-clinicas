import { carregarLead, obterFotos, dadosBase, obterLogo } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { HeartPulse, AlertTriangle, ChevronRight, MessageSquare, MapPin, Star, Navigation, MessageCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps { params: Promise<{ cliente: string }> }

export default async function PaginaClinicaMinimalista({ params }: PageProps) {
  const { cliente } = await params;
  const lead = carregarLead(cliente);

  if (!lead) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-neutral-200 font-sans">
        <div className="max-w-lg bg-neutral-900 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
          <AlertTriangle className="w-12 h-12 text-emerald-500 mx-auto" />
          <h1 className="text-xl font-bold text-white">Nenhum cadastro encontrado</h1>
          <p className="text-xs text-neutral-400">Verifique se o ficheiro do cliente existe na pasta de leads.</p>
        </div>
      </div>
    );
  }

  const fotos = obterFotos(lead);
  const logo = obterLogo(lead);
  const d = dadosBase(lead, `Olá! Vi o site da ${lead.nome} e gostaria de agendar uma consulta.`);

  const pastaImagens = '/fotos/clinica-renovar-fisioterapia-pilates-e-estetica-iguatu-ce';

  // 1. CAPA HERO: Foto da Coluna Vertebral (foto1.jpg)
  const fotoColunaHero = (fotos && fotos.find((f: string) => f.includes('foto1.jpg'))) 
    || (fotos && fotos[0]) 
    || `${pastaImagens}/foto1.jpg`;

  // 2. NOSSA SEDE (RODAPÉ): Foto da Fachada com Porta de Vidro (foto11.jpg)
  const fotoFachadaSede = (fotos && fotos.find((f: string) => f.includes('foto11'))) 
    || `${pastaImagens}/foto11.jpg`;

  const temaClinica = {
    fundo: '#0a0a0a', 
    card: '#171717', 
    borda: '#262626', 
    texto: '#ffffff', 
    sub: '#a3a3a3', 
    destaque: '#10b981', 
    serif: false
  };

  const localSimples = lead.cidade ? `${lead.cidade}${lead.estado ? ` - ${lead.estado}` : ''}` : 'Planalto - Iguatu, CE';

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-emerald-500 selection:text-black">

      {/* BANNER SUPERIOR DE PROPOSTA */}
      <div className="bg-emerald-950 border-b border-emerald-800/40 text-emerald-400 text-[11px] font-bold uppercase tracking-widest text-center py-2 px-4">
        🏥 PROPOSTA DIGITAL EXCLUSIVA PARA {lead.nome} 🏥
      </div>

      {/* HEADER FIXO DE CLÍNICA */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {logo ? (
              <img src={logo} alt="Logo" className="h-10 w-auto max-w-[140px] object-contain" />
            ) : (
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <HeartPulse className="w-5 h-5 text-emerald-400" />
              </div>
            )}
            <span className="text-base sm:text-lg font-black uppercase text-white tracking-wider truncate max-w-[200px] sm:max-w-none">
              {lead.nome}
            </span>
          </div>
        </div>
      </header>

      {/* HERO SECTION DA CLÍNICA (FOTO DA COLUNA - INTEIRA SEM CORTE) */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-400 shadow-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{d.avaliacao > 0 ? d.avaliacao.toFixed(1) : '5.0'} Google Maps</span>
              <span className="text-neutral-700">•</span>
              <span className="text-neutral-400">{d.totalAval || 15} avaliações</span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-900 px-3.5 py-1.5 rounded-full border border-neutral-800">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>{localSimples}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Mais Movimento, Mais Qualidade de Vida.
          </h1>

          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl">
            Na <strong className="text-white">{lead.nome}</strong>, oferecemos atendimento presencial e domiciliar especializado para sua plena recuperação e bem-estar.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {d.tel && (
              <a 
                href={d.whatsapp} 
                target="_blank" 
                rel="noreferrer" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-4 rounded-xl transition text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-950/50 hover:scale-[1.02]"
              >
                <span>AGENDAR AVALIAÇÃO NO WHATSAPP</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* CARD HERO DA COLUNA VERTEBRAL (AJUSTE OBJECT-CONTAIN) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl h-[380px] bg-neutral-900 flex items-center justify-center p-3">
            <img 
              src={fotoColunaHero} 
              alt={`Especialidade ${lead.nome}`} 
              className="w-full h-full object-contain rounded-2xl brightness-95 hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </div>
      </section>

      {/* COMPONENTE PRINCIPAL */}
      <InfoGoogle d={d} fotos={fotos} tema={temaClinica} prefixo="clin" />

      {/* BLOCO FINAL - VISITE-NOS OU CHAME ONLINE (FOTO11 DA FACHADA DA SEDE) */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
          
          {/* COLUNA ESQUERDA: FOTO11 DA SEDE COM BADGE LARANJA */}
          <div className="md:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-lg h-60 sm:h-64 bg-neutral-950 flex items-center justify-center p-2">
              <img 
                src={fotoFachadaSede} 
                alt={`Sede ${lead.nome}`} 
                className="w-full h-full object-contain rounded-xl" 
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-500 text-black font-black text-[10px] uppercase tracking-wider px-4 py-1 rounded-full shadow-md whitespace-nowrap">
              Nossa Sede
            </div>
          </div>

          {/* COLUNA DIREITA: TEXTO E BOTÕES */}
          <div className="md:col-span-7 space-y-4 text-center md:text-left pt-2 md:pt-0">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Visite-nos ou Chame Online
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Estamos prontos para atender você na nossa clínica ou no conforto do seu lar.
            </p>

            {/* BOTÕES DE AÇÃO DUPLA */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <a 
                href={d.whatsapp} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-950/50 hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Chamar no WhatsApp</span>
              </a>

              <a 
                href={d.mapa && d.mapa !== '#' ? d.mapa : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.nome)}`} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider border border-neutral-700 transition"
              >
                <Navigation className="w-4 h-4 text-orange-500" />
                <span>Rota no Mapa</span>
              </a>
            </div>

            {/* ENDEREÇO EM TEXTO DISCRETO */}
            <p className="text-[11px] text-neutral-400 pt-3 border-t border-neutral-800/80">
              {lead.nome} — {d.enderecoCompleto || 'Rua Antônio Mendonça, 479a - Planalto, Iguatu - CE, 63500-775'}
            </p>
          </div>

        </div>
      </section>

      {/* BOTÃO FLUTUANTE DIREITO (DESKTOP) */}
      {d.tel && (
        <div className="hidden sm:block fixed bottom-6 right-6 z-50">
          <a
            href={d.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="Agendar WhatsApp"
            className="relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
          >
            <span className="absolute -inset-1 rounded-full bg-emerald-500 animate-ping opacity-20"></span>
            <MessageSquare className="w-6 h-6 relative z-10" />
          </a>
        </div>
      )}

    </div>
  );
}