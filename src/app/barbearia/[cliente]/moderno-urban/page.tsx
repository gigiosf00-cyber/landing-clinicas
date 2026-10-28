import { carregarLead, obterFotos, dadosBase, servicosBarbearia, obterLogo } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { Zap, MapPin, Star, Calendar, AlertTriangle, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps { params: Promise<{ cliente: string }> }

export default async function BarbeariaModernoUrbanPage({ params }: PageProps) {
  const { cliente } = await params;
  const lead = carregarLead(cliente);

  if (!lead) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-neutral-200 font-sans">
        <div className="max-w-lg bg-neutral-900 border border-cyan-500/30 rounded-2xl p-8 text-center space-y-4">
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

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">

      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {logo ? <img src={logo} alt="Logo" className="h-10 w-auto max-w-[120px] object-contain" /> : <Zap className="w-6 h-6 text-cyan-400" />}
            <span className="text-lg font-black uppercase text-white tracking-wider">{lead.nome}</span>
          </div>
          {d.tel && (
            <a href={d.whatsapp} target="_blank" rel="noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs px-5 py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/20 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Agendar Agora
            </a>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          {d.avaliacao > 0 && (
            <div className="inline-flex items-center gap-2 bg-neutral-900 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-cyan-400">
              <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
              {d.avaliacao.toFixed(1)} {d.totalAval ? `(${d.totalAval} avaliações)` : ''}
            </div>
          )}
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            {lead.nome}
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base flex items-start gap-2">
            <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            {lead.endereco}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            {d.tel && (
              <a href={d.whatsapp} target="_blank" rel="noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-7 py-4 rounded-xl transition text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-cyan-500/20">
                Agendar via WhatsApp <ChevronRight className="w-4 h-4" />
              </a>
            )}
            {d.mapa && d.mapa !== '#' && (
              <a href={d.mapa} target="_blank" rel="noreferrer" className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-6 py-4 rounded-xl border border-neutral-800 text-xs uppercase tracking-wider flex items-center gap-2">
                Como chegar
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl h-[380px]">
            {fotos[0] ? (
              <img src={fotos[0]} alt={lead.nome} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-600">Sem Imagem</div>
            )}
          </div>
        </div>
      </section>

      {/* InfoGoogle com Horários, Fotos unificadas e Avaliações */}
      <InfoGoogle d={d} fotos={fotos} tema={temaModerno} prefixo="mod" />

      {/* Rodapé e CTA Final */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-10 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight mb-3">Pronto para o próximo nível?</h2>
          <p className="text-black/80 text-sm font-medium">Agende agora mesmo. Atendimento rápido e sem complicação.</p>
          <a href={d.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-black hover:bg-neutral-900 text-white font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider mt-6 transition shadow-2xl">
            Agendar via WhatsApp <ChevronRight className="w-4 h-4 text-cyan-400" />
          </a>
        </div>
      </section>
    </div>
  );
}