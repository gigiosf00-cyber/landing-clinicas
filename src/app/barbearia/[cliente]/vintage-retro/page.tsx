import { carregarLead, obterFotos, dadosBase, servicosBarbearia, obterLogo } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { Scissors, MapPin, Star, Calendar, AlertTriangle, ChevronRight } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-[#0d0a07] text-[#fef3c7] font-serif selection:bg-amber-600 selection:text-black">

      <div className="bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 text-amber-100 text-[11px] font-bold uppercase tracking-widest text-center py-2 px-4 shadow-md font-sans">
        ◆ TRADIÇÃO & QUALIDADE GARANTIDA — {lead.nome} ◆
      </div>

      <header className="sticky top-0 z-50 bg-[#0d0a07]/90 backdrop-blur-md border-b border-amber-900/30 font-sans">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {logo ? <img src={logo} alt="Logo" className="h-10 w-auto max-w-[120px] object-contain" /> : <Scissors className="w-6 h-6 text-amber-500" />}
            <span className="text-lg font-black uppercase text-amber-100 tracking-wider">{lead.nome}</span>
          </div>
          {d.tel && (
            <a href={d.whatsapp} target="_blank" rel="noreferrer" className="bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs px-5 py-2.5 rounded-lg transition shadow-lg shadow-amber-900/40 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Agendar Horário
            </a>
          )}
        </div>
      </header>

      {/* Hero Section Vintage */}
      <section className="relative min-h-[480px] flex items-center justify-center text-center p-8 max-w-6xl mx-auto overflow-hidden rounded-3xl my-6 border border-amber-900/40 shadow-2xl bg-[#140e0a]">
        {fotos[0] && <img src={fotos[0]} alt={lead.nome} className="absolute inset-0 w-full h-full object-cover brightness-[0.25] sepia-[0.3]" />}
        <div className="relative z-10 space-y-5 max-w-3xl py-12">
          {d.avaliacao > 0 && (
            <div className="inline-flex items-center gap-2 bg-[#1c140d]/90 border border-amber-600/40 px-4 py-1.5 rounded-full text-xs font-bold text-amber-400 font-sans">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              {d.avaliacao.toFixed(1)} {d.totalAval ? `(${d.totalAval} avaliações)` : ''}
            </div>
          )}
          <h1 className="text-4xl sm:text-7xl font-black text-amber-100 uppercase tracking-tight leading-none">
            {lead.nome}
          </h1>
          <p className="text-amber-200/80 text-sm sm:text-base flex items-center justify-center gap-2 font-sans">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" /> {lead.endereco}
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4 font-sans">
            {d.tel && (
              <a href={d.whatsapp} target="_blank" rel="noreferrer" className="bg-amber-600 hover:bg-amber-500 text-black font-black px-8 py-4 rounded-xl transition text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-950/80">
                AGENDAMENTO DIRETO NO WHATSAPP <ChevronRight className="w-4 h-4" />
              </a>
            )}
            {d.mapa && d.mapa !== '#' && (
              <a href={d.mapa} target="_blank" rel="noreferrer" className="bg-[#1c140d] hover:bg-[#281d13] text-amber-100 font-bold px-6 py-4 rounded-xl border border-amber-900/50 text-xs uppercase tracking-wider flex items-center gap-2">
                Como chegar
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="max-w-6xl mx-auto px-6 py-12 font-sans">
        <h2 className="text-2xl font-black text-amber-400 uppercase tracking-widest text-center mb-10 font-serif">NOSSOS SERVIÇOS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicosBarbearia.map((s, i) => (
            <div key={i} className="bg-[#140e0a] border border-amber-900/30 hover:border-amber-600/50 rounded-2xl p-6 transition group">
              <span className="text-3xl mb-3 block">{s.icone}</span>
              <h3 className="text-amber-100 font-bold text-sm mb-2 group-hover:text-amber-400 transition">{s.titulo}</h3>
              <p className="text-amber-200/60 text-xs leading-relaxed">{s.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* InfoGoogle com os botões, fotos unificadas e mapa */}
      <InfoGoogle d={d} fotos={fotos} tema={temaVintage} prefixo="vint" />

      {/* CTA Rodapé */}
      <section className="max-w-6xl mx-auto px-6 py-12 font-sans">
        <div className="bg-gradient-to-r from-amber-700 to-amber-800 rounded-3xl p-10 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-black text-amber-100 uppercase tracking-tight mb-2 font-serif">PRONTO PARA RENOVAR O VISUAL?</h2>
          <p className="text-amber-200/80 text-sm font-medium">Tradição que cuida de você. Agende agora.</p>
          <a href={d.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-black hover:bg-neutral-900 text-amber-100 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider mt-6 transition shadow-2xl">
            Agendar via WhatsApp <ChevronRight className="w-4 h-4 text-amber-400" />
          </a>
        </div>
      </section>
    </div>
  );
}