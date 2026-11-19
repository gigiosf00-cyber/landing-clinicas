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
    fundo: 'bg-[#f4f1ea]',
    card: 'bg-white',
    borda: 'border-[#dcd6cd]',
    texto: 'text-[#1b3b2b]',
    sub: 'text-[#c85a32]',
    destaque: 'bg-[#c85a32]',
    serif: true
  };

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#1b3b2b] font-serif selection:bg-[#c85a32] selection:text-white">
      <div className="bg-[#132a1f] border-b border-[#1b3b2b]/60 py-2.5 px-4 text-center font-sans">
        <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#e2d9cc] uppercase">
          ✧ PROPOSTA VINTAGE PARA: {d.nome.toUpperCase()} ✧
        </p>
      </div>

      <header className="sticky top-0 z-40 bg-[#f4f1ea]/90 backdrop-blur-md border-b border-[#dcd6cd]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-[#1b3b2b] tracking-tight">{d.nome}</h1>
            <p className="text-xs text-[#c85a32] font-semibold uppercase tracking-wider font-sans">
              {d.nicho || 'TRADIÇÃO • BARBA NA TOALHA QUENTE • CORTE CLÁSSICO'}
            </p>
          </div>
          {d.tel && (
            <a
              href={d.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex bg-[#c85a32] hover:bg-[#b04d28] text-white text-xs font-bold px-5 py-2.5 rounded-full transition shadow-md font-sans uppercase tracking-wider"
            >
              Agendar Horário
            </a>
          )}
        </div>
      </header>

      {/* HERO SECTION 2 COLUNAS BARBEARIA VINTAGE */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="text-[#c85a32] text-[10px] sm:text-xs font-semibold uppercase tracking-widest border-b border-[#dcd6cd] pb-2 inline-block font-sans">
            Tradição, Respeito e Cuidado Masculino
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#1b3b2b] leading-tight">
            A Verdadeira Experiência <br />
            <span className="italic text-[#c85a32]">da Barbearia Clássica.</span>
          </h2>
          <p className="text-[#5a6b5c] text-sm sm:text-base leading-relaxed font-sans">
            Na <strong className="text-[#1b3b2b]">{nomeCurto}</strong>, resgatamos o ritual do café, conversa boa e acabamento impecável na navalha.
          </p>
          {d.tel && (
            <div className="pt-2 font-sans">
              <a
                href={d.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-[#c85a32] hover:bg-[#b04d28] text-white font-bold px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105"
              >
                Agendar via WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* FOTO COMPLETA SEM CORTES COM MOVIMENTO SUAVE */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-[#dcd6cd] shadow-2xl aspect-[4/3] sm:aspect-square bg-[#132a1f] p-3 flex items-center justify-center">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes subtle-float {
              0% { transform: scale(1); }
              50% { transform: scale(1.03); }
              100% { transform: scale(1); }
            }
            .animate-subtle-zoom {
              animation: subtle-float 8s ease-in-out infinite;
              will-change: transform;
            }
          `}} />
          {fotoFachadaHero && (
            <img
              src={fotoFachadaHero}
              alt={d.nome}
              className="w-full h-full object-contain rounded-xl animate-subtle-zoom"
            />
          )}
        </div>
      </section>

      <InfoGoogle d={d} fotos={fotosTodas} tema={temaBarbeariaVintage} prefixo="barbearia" />

      <footer className="text-center py-8 bg-[#132a1f] text-[#e2d9cc] text-xs font-sans font-medium border-t border-[#1b3b2b]">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}