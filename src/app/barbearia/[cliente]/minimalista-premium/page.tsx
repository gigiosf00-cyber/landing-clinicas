import { carregarLead, obterFotos, dadosBase, obterLogo } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import SpaceZoomHero from '@/components/SpaceZoomHero';
import { Scissors, AlertTriangle, ChevronRight, MessageSquare } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps { params: Promise<{ cliente: string }> }

export default async function BarbeariaMinimalistaPage({ params }: PageProps) {
  const { cliente } = await params;
  const lead = carregarLead(cliente);

  if (!lead) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-neutral-200 font-sans">
        <div className="max-w-lg bg-neutral-900 border border-red-500/30 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
          <h1 className="text-xl font-bold text-white">JSON não encontrado</h1>
          <p className="text-xs text-neutral-400">Verifique se o ficheiro do cliente existe na pasta de leads.</p>
        </div>
      </div>
    );
  }

  const fotos = obterFotos(lead);
  const logo = obterLogo(lead);
  const d = dadosBase(lead, `Olá! Gostaria de agendar um horário na ${lead.nome}.`);

  const temaMinimalista = {
    fundo: 'transparent', 
    card: '#171717', 
    borda: '#262626', 
    texto: '#ffffff', 
    sub: '#a3a3a3', 
    destaque: '#f59e0b', 
    serif: false
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">

      {/* BANNER PROMOCIONAL SUPERIOR */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 text-black text-[11px] font-black uppercase tracking-widest text-center py-2 px-4 shadow-md">
        ✦ PROPOSTA DIGITAL EXCLUSIVA PARA {lead.nome} ✦
      </div>

      {/* HEADER FIXO MINIMALISTA (SEM BOTÃO DUPLICADO) */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {logo ? (
              <img src={logo} alt="Logo" className="h-10 w-auto max-w-[140px] object-contain" />
            ) : (
              <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <Scissors className="w-5 h-5 text-amber-500" />
              </div>
            )}
            <span className="text-base sm:text-lg font-black uppercase text-white tracking-wider truncate max-w-[200px] sm:max-w-none">
              {lead.nome}
            </span>
          </div>
        </div>
      </header>

      {/* HERO SECTION COM SPACE ZOOM */}
      <SpaceZoomHero
        nome={lead.nome}
        endereco={lead.endereco}
        avaliacao={d.avaliacao}
        foto={fotos[0]}
        whatsappUrl={d.whatsapp}
        temTelefone={Boolean(d.tel)}
      />

      {/* COMPONENTE PRINCIPAL (SERVIÇOS UNIFICADOS, GALERIA, AVALIAÇÕES E MAPA NOTURNO) */}
      <InfoGoogle d={d} fotos={fotos} tema={temaMinimalista} prefixo="min" />

      {/* CHAMADA FINAL PARA AÇÃO (CTA) */}
      {d.tel && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight mb-3">
                Pronto para renovar o visual?
              </h2>
              <p className="text-black/80 text-xs sm:text-sm font-semibold max-w-md mx-auto">
                Agende o seu horário diretamente pelo WhatsApp sem filas nem complicações.
              </p>
              <a 
                href={d.whatsapp} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 bg-black hover:bg-neutral-900 text-white font-black px-8 py-4 rounded-full text-xs sm:text-sm mt-6 transition shadow-2xl transform hover:scale-105"
              >
                <span>Agendar via WhatsApp</span>
                <ChevronRight className="w-5 h-5 text-amber-400" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* BOTÃO FLUTUANTE FIXO NO CANTO INFERIOR DIREITO (DESKTOP) */}
      {d.tel && (
        <div className="hidden sm:block fixed bottom-6 right-6 z-50">
          <a
            href={d.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="Agendar WhatsApp"
            className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-2xl shadow-emerald-950 transition-all duration-300 transform hover:scale-110"
          >
            <span className="absolute -inset-1 rounded-full bg-emerald-400 animate-ping opacity-30"></span>
            <MessageSquare className="w-6 h-6 relative z-10" />
          </a>
        </div>
      )}

    </div>
  );
}