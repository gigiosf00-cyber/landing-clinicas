import { carregarLead, obterFotos, dadosBase, obterLogo } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { Zap, MapPin, Star, AlertTriangle, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps { params: Promise<{ cliente: string }> }

export default async function BarbeariaModernoUrbanPage({ params }: PageProps) {
  const { cliente } = await params;
  const lead = carregarLead(cliente);

  if (!lead) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-neutral-200 font-sans">
        <div className="max-w-lg bg-neutral-900 border border-cyan-500/30 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
          <AlertTriangle className="w-12 h-12 text-cyan-400 mx-auto" />
          <h1 className="text-xl font-bold text-white">Lead não encontrado</h1>
        </div>
      </div>
    );
  }

  const fotos = obterFotos(lead);
  const logo = obterLogo(lead);
  const d = dadosBase(lead, `Olá! Gostaria de agendar um horário na ${lead.nome}.`);

  const temaModerno = {
    fundo: '#000000', card: '#0a0a0a', borda: '#1f2937', texto: '#ffffff', sub: '#9ca3af', destaque: '#06b6d4', serif: false
  };

  const localSimples = lead.cidade ? `${lead.cidade}${lead.estado ? ` - ${lead.estado}` : ''}` : 'Jardim Elvira - Osasco, SP';

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">

      {/* HEADER MINIMALISTA (SEM BOTÃO DUPLICADO) */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {logo ? <img src={logo} alt="Logo" className="h-10 w-auto max-w-[140px] object-contain" /> : <Zap className="w-6 h-6 text-cyan-400" />}
            <span className="text-lg font-black uppercase text-white tracking-wider">{lead.nome}</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION MODERNO URBAN */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          
          {/* BADGES DE AVALIAÇÃO E LOCALIZAÇÃO */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-neutral-900 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-cyan-400 shadow-md">
              <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
              <span>{d.avaliacao > 0 ? d.avaliacao.toFixed(1) : '4.5'} Google Maps</span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-300">{d.totalAval || 84} avaliações</span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-900/80 px-3.5 py-1.5 rounded-full border border-neutral-800">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{localSimples}</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            {lead.nome}
          </h1>

          <div className="flex flex-wrap gap-4 pt-2">
            {d.tel && (
              <a 
                href={d.whatsapp} 
                target="_blank" 
                rel="noreferrer" 
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-7 py-4 rounded-xl transition text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-cyan-500/20 hover:scale-105"
              >
                <span>AGENDAMENTO DIRETO NO WHATSAPP</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes slow-pan-moderno {
              0% { transform: scale(1); }
              100% { transform: scale(1.15); }
            }
            .animate-slow-pan-mod {
              animation: slow-pan-moderno 15s ease-in-out infinite alternate;
            }
          `}} />
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl h-[380px] bg-neutral-900">
            {fotos[0] ? (
              <img src={fotos[0]} alt={lead.nome} className="w-full h-full object-cover animate-slow-pan-mod brightness-90 contrast-110" />
            ) : (
              <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-600">Sem Imagem</div>
            )}
          </div>
        </div>
      </section>

      {/* COMPONENTE PRINCIPAL (SERVIÇOS UNIFICADOS, GALERIA, AVALIAÇÕES E MAPA NOTURNO) */}
      <InfoGoogle d={d} fotos={fotos} tema={temaModerno} prefixo="mod" />

      {/* CALL TO ACTION RODAPÉ */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight mb-3">Pronto para o próximo nível?</h2>
            <p className="text-black/80 text-sm font-medium">Agende agora mesmo. Atendimento rápido e sem complicação.</p>
            <a href={d.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-black hover:bg-neutral-900 text-white font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider mt-6 transition shadow-2xl hover:scale-105">
              <span>Agendar via WhatsApp</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}