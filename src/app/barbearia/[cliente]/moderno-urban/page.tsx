import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ cliente: string }>;
}

export default async function PaginaBarbeariaVintage({ params }: PageProps) {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    notFound();
  }

  const nomeCurto = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Barbearia';
  const d = dadosBase(lead, `Olá! Vi o site da ${nomeCurto} e gostaria de agendar um horário.`);
  const fotosTodas = obterFotos(lead);

  const fotoFachadaHero = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg')))
    || fotoCapa(lead)
    || (fotosTodas && fotosTodas[0])
    || '';

  const temaBarbeariaVintage = {
    fundo: 'bg-[#18181b]',
    card: 'bg-zinc-900',
    borda: 'border-zinc-800',
    texto: 'text-zinc-100',
    sub: 'text-amber-500',
    destaque: 'bg-amber-500',
    serif: true
  };

  return (
    <main className="min-h-screen bg-[#18181b] text-zinc-100 font-serif selection:bg-amber-500 selection:text-zinc-950">
      <div className="bg-zinc-950 border-b border-zinc-800 py-2.5 px-4 text-center font-sans">
        <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-amber-500 uppercase">
          ✧ PROPOSTA VINTAGE PARA: {d.nome.toUpperCase()} ✧
        </p>
      </div>

      <header className="sticky top-0 z-40 bg-[#18181b]/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">{d.nome}</h1>
            <p className="text-xs text-amber-500 font-semibold uppercase tracking-wider font-sans">
              {d.nicho || 'TRADIÇÃO • BARBA NA TOALHA QUENTE • CORTE CLÁSSICO'}
            </p>
          </div>
          {d.tel && (
            <a
              href={d.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex bg-amber-500 hover:bg-amber-600 text-zinc-950 text-xs font-bold px-5 py-2.5 rounded-full transition shadow-md font-sans uppercase tracking-wider"
            >
              Agendar Horário
            </a>
          )}
        </div>
      </header>

      {/* LAYOUT 2 COLUNAS VINTAGE: TEXTO NA ESQUERDA, FOTO COM ZOOM NA DIREITA */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="text-amber-500 text-[10px] sm:text-xs font-semibold uppercase tracking-widest border-b border-zinc-800 pb-2 inline-block font-sans">
            Tradição, Respeito e Cuidado Masculino
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal text-white leading-tight">
            A Verdadeira Experiência <br />
            <span className="italic text-amber-500">da Barbearia Clássica.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
            Na <strong className="text-white">{nomeCurto}</strong>, resgatamos o ritual do café, conversa boa e acabamento impecável na navalha.
          </p>
          {d.tel && (
            <div className="pt-2 font-sans">
              <a
                href={d.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105"
              >
                Agendar via WhatsApp
              </a>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden rounded-2xl border-2 border-zinc-800 shadow-2xl aspect-[4/3] sm:aspect-square bg-zinc-950">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes space-zoom-pan {
              0% { transform: scale(1.04) translate(0%, 0%); }
              50% { transform: scale(1.20) translate(-1.5%, -1%); }
              100% { transform: scale(1.04) translate(0%, 0%); }
            }
            .animate-space-zoom {
              animation: space-zoom-pan 14s ease-in-out infinite;
              transform-origin: center center;
              will-change: transform;
            }
          `}} />
          {fotoFachadaHero && (
            <img
              src={fotoFachadaHero}
              alt={d.nome}
              className="w-full h-full object-cover brightness-[0.90] contrast-[1.08] animate-space-zoom"
            />
          )}
        </div>
      </section>

      <InfoGoogle d={d} fotos={fotosTodas} tema={temaBarbeariaVintage} prefixo="barbearia" />

      <footer className="text-center py-8 bg-black text-zinc-500 text-xs font-sans font-medium border-t border-zinc-900">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}