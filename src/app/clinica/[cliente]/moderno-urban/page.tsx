import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ cliente: string }>;
}

export default async function PaginaClinicaModerna({ params }: PageProps) {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    notFound();
  }

  const nomeCurto = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Clínica';
  const d = dadosBase(lead, `Olá! Vi o site da ${nomeCurto} e gostaria de agendar uma consulta.`);
  const fotosTodas = obterFotos(lead);

  const fotoFachadaHero = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg'))) 
    || fotoCapa(lead) 
    || (fotosTodas && fotosTodas[0]) 
    || '';

  const temaModernoUrban = {
    fundo: 'bg-zinc-950',
    card: 'bg-zinc-900',
    borda: 'border-zinc-800',
    texto: 'text-white',
    sub: 'text-emerald-400',
    destaque: 'bg-orange-500',
    serif: false
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-orange-500 selection:text-white">
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-b border-emerald-900/60 py-2.5 px-4 text-center">
        <p className="text-[10px] sm:text-xs font-black tracking-widest text-emerald-400 uppercase">
          ⚡ PROPOSTA DE DESIGN MODERNO PARA: {d.nome.toUpperCase()}
        </p>
      </div>

      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-base sm:text-lg font-black text-white tracking-tight">{d.nome}</h1>
            <p className="text-xs text-orange-400 font-bold uppercase tracking-wider">
              {d.nicho || 'ATENDIMENTO DOMICILIAR • REABILITAÇÃO • QUIROPRAXIA'}
            </p>
          </div>
          {d.tel && (
            <a
              href={d.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-2.5 rounded-full transition shadow-md"
            >
              Agendar Consulta
            </a>
          )}
        </div>
      </header>

      {/* LAYOUT 2 COLUNAS CLÍNICA URBAN */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-900/50 text-emerald-300 border border-emerald-800/60 uppercase tracking-wider">
            ✦ ESPECIALISTA EM ELIMINAR A DOR E DEVOLVER SEU BEM-ESTAR
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            Sua <span className="text-emerald-400">Qualidade de Vida</span> levada a sério.
          </h2>
          <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
            Na <strong className="text-white">{nomeCurto}</strong>, unimos excelência clínica e atendimento humanizado para a sua plena recuperação.
          </p>
          {d.tel && (
            <div className="pt-2">
              <a
                href={d.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105"
              >
                Falar com Especialista
              </a>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-emerald-900/60 shadow-2xl aspect-[4/3] sm:aspect-square bg-emerald-950">
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
              className="w-full h-full object-cover brightness-[0.92] contrast-[1.05] animate-space-zoom"
            />
          )}
        </div>
      </section>

      <InfoGoogle d={d} fotos={fotosTodas} tema={temaModernoUrban} prefixo="clinica" />

      <footer className="text-center py-8 bg-black text-zinc-500 text-xs font-medium border-t border-zinc-900">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}