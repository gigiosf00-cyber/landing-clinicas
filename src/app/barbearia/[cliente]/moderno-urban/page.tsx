import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { notFound } from 'next/navigation';
import { MessageCircle, Navigation } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ cliente: string }>;
}

export default async function PaginaBarbeariaModerna({ params }: PageProps) {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    notFound();
  }

  const nomeCurto = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Barbearia';
  const d = dadosBase(lead, `Olá! Vi o site da ${nomeCurto} e gostaria de agendar um horário.`);
  const fotosTodas = obterFotos(lead);

  // Foto Fachada/Hero (foto1.jpg ou fotoCapa)
  const fotoFachadaHero = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg')))
    || fotoCapa(lead)
    || (fotosTodas && fotosTodas[0])
    || '';

  // Foto da Sede Real (foto8.jpg ou foto11.jpg com o ambiente do salão)
  const fotoSedeReal = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto8')))
    || (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11')))
    || fotoFachadaHero;

  const temaBarbeariaUrbanBlue = {
    fundo: 'bg-slate-950',
    card: 'bg-slate-900',
    borda: 'border-slate-800',
    texto: 'text-slate-100',
    sub: 'text-amber-400',
    destaque: 'bg-amber-500',
    serif: false
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* BANNER SUPERIOR */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 py-2.5 px-4 text-center">
        <p className="text-[10px] sm:text-xs font-black tracking-widest text-amber-400 uppercase">
          ⚡ PROPOSTA DE DESIGN URBAN PARA: {d.nome.toUpperCase()}
        </p>
      </div>

      {/* CABEÇALHO */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-base sm:text-lg font-black text-white tracking-tight">{d.nome}</h1>
            <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">
              {d.nicho || 'CORTE MASCULINO • BARBA • ESTILO'}
            </p>
          </div>
          {d.tel && (
            <a
              href={d.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-5 py-2.5 rounded-full transition shadow-md uppercase tracking-wider"
            >
              Agendar Horário
            </a>
          )}
        </div>
      </header>

      {/* HERO SECTION 2 COLUNAS */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-slate-900 text-amber-400 border border-slate-800 uppercase tracking-wider shadow-sm">
            💈 ESTILO E PRECISÃO EM CADA DETALHE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            Seu Visual no <span className="text-amber-400">Mais Alto Nível.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Na <strong className="text-white">{nomeCurto}</strong>, unimos a arte da barbearia clássica com as tendências mais modernas do mercado.
          </p>
          {d.tel && (
            <div className="pt-2">
              <a
                href={d.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105"
              >
                Agendar via WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* FOTO HERO COM ANIMAÇÃO SUAVE */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 shadow-2xl aspect-[4/3] sm:aspect-square bg-slate-900 p-3 flex items-center justify-center">
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
              className="w-full h-full object-contain rounded-2xl animate-subtle-zoom"
            />
          )}
        </div>
      </section>

      {/* GALERIA DE FOTOS POR ABAS E DADOS GOOGLE */}
      <InfoGoogle d={d} fotos={fotosTodas} tema={temaBarbeariaUrbanBlue} prefixo="barbearia" />

      {/* CARD FINAL - NOSSA SEDE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-white">
          
          <div className="md:col-span-5 relative mx-auto w-full max-w-[280px]">
            <div className="rounded-2xl overflow-hidden border-4 border-white/10 shadow-xl bg-slate-950 p-1 h-56 sm:h-64 flex items-center justify-center">
              <img src={fotoSedeReal} alt={`Sede ${nomeCurto}`} className="w-full h-full object-contain rounded-xl" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
              Nossa Sede
            </div>
          </div>

          <div className="md:col-span-7 text-center md:text-left space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-white">Visite-nos ou Agende Online</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Estamos prontos para atender você com horário marcado e o melhor atendimento da região.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <a href={d.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase px-5 py-3.5 rounded-xl transition shadow-md">
                <MessageCircle className="w-4 h-4 fill-slate-950 text-amber-500" />
                <span>Chamar no WhatsApp</span>
              </a>
              <a href={d.mapa && d.mapa !== '#' ? d.mapa : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeCurto)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase px-5 py-3.5 rounded-xl border border-white/20 transition">
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Rota no Mapa</span>
              </a>
            </div>
            <p className="text-xs text-amber-400 pt-3 border-t border-slate-800">
              📍 {d.enderecoCompleto || d.endereco}
            </p>
          </div>

        </div>
      </section>

      <footer className="text-center py-8 bg-black text-slate-500 text-xs font-medium border-t border-slate-900">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}