import { carregarLead, obterFotos, dadosBase, obterLogo } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { Scissors, Star, AlertTriangle, ChevronRight, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps { params: Promise<{ cliente: string }> }

export default async function BarbeariaVintagePage({ params }: PageProps) {
  const { cliente } = await params;
  const lead = carregarLead(cliente);

  if (!lead) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-neutral-200 font-sans">
        <div className="max-w-lg bg-neutral-900 border border-amber-600/30 rounded-2xl p-8 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
          <h1 className="text-xl font-bold text-white">Lead não encontrado</h1>
        </div>
      </div>
    );
  }

  const fotos = obterFotos(lead);
  const logo = obterLogo(lead);
  const d = dadosBase(lead, `Olá! Gostaria de agendar um horário na ${lead.nome}.`);

  const temaVintage = {
    fundo: '#0d0a07', card: '#17120e', borda: '#2e2015', texto: '#fef3c7', sub: '#a89a8a', destaque: '#d97706', serif: true
  };

  const localSimples = lead.cidade ? `${lead.cidade}${lead.estado ? ` - ${lead.estado}` : ''}` : 'Jardim Elvira - Osasco, SP';

  return (
    <div className="min-h-screen bg-[#0d0a07] text-[#fef3c7] font-serif selection:bg-amber-600 selection:text-black">

      <div className="bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 text-amber-100 text-[11px] font-bold uppercase tracking-widest text-center py-2 px-4 shadow-md font-sans">
        ◆ TRADIÇÃO & QUALIDADE GARANTIDA — {lead.nome} ◆
      </div>

      {/* HEADER MINIMALISTA (SEM BOTÃO REPETIDO DE AGENDAR) */}
      <header className="sticky top-0 z-50 bg-[#0d0a07]/90 backdrop-blur-md border-b border-amber-900/30 font-sans">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {logo ? <img src={logo} alt="Logo" className="h-10 w-auto max-w-[140px] object-contain" /> : <Scissors className="w-6 h-6 text-amber-500" />}
            <span className="text-lg font-black uppercase text-amber-100 tracking-wider">{lead.nome}</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION VINTAGE */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes kb-vintage-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.10); }
        }
        .animate-vintage-zoom {
          animation: kb-vintage-zoom 15s ease-in-out infinite alternate;
        }
      `}} />
      <section className="relative min-h-[480px] flex items-center justify-center text-center p-8 max-w-6xl mx-auto overflow-hidden rounded-3xl my-6 border border-amber-900/40 shadow-2xl bg-[#140e0a]">
        {fotos[0] && (
          <div className="absolute inset-0 overflow-hidden">
            <img src={fotos[0]} alt={lead.nome} className="w-full h-full object-cover brightness-[0.40] sepia-[0.2] animate-vintage-zoom" />
          </div>
        )}
        
        <div className="relative z-10 space-y-6 max-w-3xl py-12">
          
          <h1 className="text-4xl sm:text-7xl font-black text-amber-100 uppercase tracking-tight leading-none drop-shadow-md">
            {lead.nome}
          </h1>

          {/* BADGE COM NOTA 4.5 E CIDADE (SUBSTITUINDO O ENDEREÇO LONGO) */}
          <div className="flex flex-wrap items-center justify-center gap-3 font-sans">
            <div className="inline-flex items-center gap-2 bg-[#1c140d]/90 border border-amber-600/40 px-4 py-2 rounded-full text-xs font-bold text-amber-400 backdrop-blur-sm shadow-lg">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{d.avaliacao > 0 ? d.avaliacao.toFixed(1) : '4.5'} Google Maps</span>
              <span className="text-amber-200/50">•</span>
              <span className="text-amber-200/90">{d.totalAval || 84} avaliações</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-200/80 bg-black/40 px-3.5 py-2 rounded-full border border-amber-900/30">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{localSimples}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-2 font-sans">
            {d.tel && (
              <a href={d.whatsapp} target="_blank" rel="noreferrer" className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-black px-8 py-4 rounded-xl transition text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-950/80 hover:scale-105">
                <span>AGENDAMENTO DIRETO NO WHATSAPP</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>
      </section>

      {/* InfoGoogle com Serviços Reais unificados */}
      <InfoGoogle d={d} fotos={fotos} tema={temaVintage} prefixo="vint" />

      {/* CTA Rodapé */}
      <section className="max-w-6xl mx-auto px-6 py-12 font-sans">
        <div className="bg-gradient-to-r from-amber-700 to-amber-800 rounded-3xl p-10 text-center shadow-2xl hover:scale-[1.01] transition-transform duration-300 border border-amber-500/20">
          <h2 className="text-3xl sm:text-4xl font-black text-amber-100 uppercase tracking-tight mb-2 font-serif">PRONTO PARA RENOVAR O VISUAL?</h2>
          <p className="text-amber-200/80 text-sm font-medium">Tradição que cuida de você. Agende agora.</p>
          <a href={d.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-black hover:bg-neutral-900 text-amber-100 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider mt-6 transition shadow-2xl hover:-translate-y-1">
            <span>Agendar via WhatsApp</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </a>
        </div>
      </section>
    </div>
  );
}