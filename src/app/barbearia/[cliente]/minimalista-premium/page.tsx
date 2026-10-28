import { carregarLead, obterFotos, dadosBase, servicosBarbearia, obterLogo } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { Scissors, MapPin, Star, Calendar, AlertTriangle, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps { params: Promise<{ cliente: string }> }

export default async function BarbeariaMinimalistaPage({ params }: PageProps) {
  const { cliente } = await params;
  const lead = carregarLead(cliente);

  if (!lead) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-neutral-200 font-sans">
        <div className="max-w-lg bg-neutral-900 border border-red-500/30 rounded-2xl p-8 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
          <h1 className="text-xl font-bold text-white">JSON não encontrado</h1>
        </div>
      </div>
    );
  }

  const fotos = obterFotos(lead);
  const logo = obterLogo(lead);
  const d = dadosBase(lead, `Olá! Gostaria de agendar um horário na ${lead.nome}.`);

  const temaMinimalista = {
    fundo: 'transparent', card: '#171717', borda: '#262626', texto: '#ffffff', sub: '#a3a3a3', destaque: '#f59e0b', serif: false
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">

      <div className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 text-black text-[11px] font-bold uppercase tracking-widest text-center py-2 px-4 shadow-md">
        ✦ PROPOSTA DIGITAL EXCLUSIVA PARA {lead.nome} ✦
      </div>

      <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {logo ? <img src={logo} alt="Logo" className="h-10 w-auto max-w-[120px] object-contain" /> : <Scissors className="w-6 h-6 text-amber-500" />}
            <span className="text-lg font-extrabold uppercase text-white tracking-wider">{lead.nome}</span>
          </div>
          {d.tel && (
            <a href={d.whatsapp} target="_blank" rel="noreferrer" className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs px-5 py-2.5 rounded-full transition shadow-lg shadow-amber-500/20 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Agendar
            </a>
          )}
        </div>
      </header>

      <section className="relative h-[70vh] min-h-[480px] flex items-end p-8 max-w-6xl mx-auto overflow-hidden rounded-3xl my-6 border border-neutral-800 shadow-2xl">
        {fotos[0] && <img src={fotos[0]} alt={lead.nome} className="absolute inset-0 w-full h-full object-cover brightness-[0.45]" />}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        <div className="relative z-10 space-y-4 max-w-2xl">
          {d.avaliacao > 0 && (
            <div className="inline-flex items-center gap-2 bg-neutral-900/90 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              {d.avaliacao.toFixed(1)}
            </div>
          )}
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">{lead.nome}</h1>
          <p className="text-neutral-300 text-sm sm:text-base flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" /> {lead.endereco}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {d.tel && (
              <a href={d.whatsapp} target="_blank" rel="noreferrer" className="bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3.5 rounded-full transition text-sm uppercase tracking-wide flex items-center gap-2">
                Agendar via WhatsApp <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-[2px] bg-amber-500" />
          <h2 className="text-2xl font-black text-white uppercase tracking-wide">Nossos Serviços</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicosBarbearia.map((s, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 rounded-2xl p-6 transition group">
              <span className="text-3xl mb-3 block">{s.icone}</span>
              <h3 className="text-white font-bold text-sm mb-2 group-hover:text-amber-400 transition">{s.titulo}</h3>
              <p className="text-neutral-500 text-xs leading-relaxed">{s.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* InfoGoogle com os botões, fotos completas e mapa */}
      <InfoGoogle d={d} fotos={fotos} tema={temaMinimalista} prefixo="min" />

      {d.tel && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-10 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight mb-3">Pronto para renovar o visual?</h2>
            <a href={d.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-black hover:bg-neutral-900 text-white font-black px-8 py-4 rounded-full text-base mt-6 transition shadow-2xl">
              Agendar via WhatsApp <ChevronRight className="w-5 h-5 text-amber-400" />
            </a>
          </div>
        </section>
      )}
    </div>
  );
}