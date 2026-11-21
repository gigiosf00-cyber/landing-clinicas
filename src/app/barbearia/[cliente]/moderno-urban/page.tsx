import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { notFound } from 'next/navigation';
import { MessageCircle, Navigation } from 'lucide-react';

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

  // Foto Hero Capa (foto1.jpg ou fotoCapa)
  const fotoFachadaHero = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg'))) 
    || fotoCapa(lead) 
    || (fotosTodas && fotosTodas[0]) 
    || '';

  // Foto Sede Real (foto11.jpg com a porta de vidro/fachada)
  const fotoSedeReal = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11'))) 
    || fotoFachadaHero;

  const temaModernoUrbanClinica = {
    fundo: 'bg-[#011c15]',
    card: 'bg-[#022c22]',
    borda: 'border-emerald-900/60',
    texto: 'text-white',
    sub: 'text-emerald-400',
    destaque: 'bg-orange-500',
    serif: false
  };

  return (
    <main className="min-h-screen bg-[#011c15] text-white selection:bg-orange-500 selection:text-white">
      {/* BANNER SUPERIOR */}
      <div className="bg-gradient-to-r from-[#022c22] via-[#064e3b] to-[#022c22] border-b border-emerald-900/60 py-2.5 px-4 text-center">
        <p className="text-[10px] sm:text-xs font-black tracking-widest text-emerald-400 uppercase">
          ⚡ PROPOSTA DE DESIGN MODERNO PARA: {d.nome.toUpperCase()}
        </p>
      </div>

      {/* CABEÇALHO */}
      <header className="sticky top-0 z-40 bg-[#011c15]/95 backdrop-blur-md border-b border-emerald-900/60">
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

      {/* HERO SECTION 2 COLUNAS */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-[#022c22] text-emerald-300 border border-emerald-800/60 uppercase tracking-wider">
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

        {/* FOTO DO HERO COM ANIMAÇÃO CONTÍNUA SEM CORTAR */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-900/60 shadow-2xl aspect-[4/3] sm:aspect-square bg-[#022c22] p-3 flex items-center justify-center">
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

      {/* GALERIA E DADOS GOOGLE */}
      <InfoGoogle d={d} fotos={fotosTodas} tema={temaModernoUrbanClinica} prefixo="clinica" />

      {/* CARD FINAL - NOSSA SEDE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-gradient-to-br from-[#022c22] to-[#064e3b] border border-emerald-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-white">
          
          <div className="md:col-span-5 relative mx-auto w-full max-w-[280px]">
            <div className="rounded-2xl overflow-hidden border-4 border-white/10 shadow-xl bg-[#022c22] p-1 h-56 sm:h-64 flex items-center justify-center">
              <img src={fotoSedeReal} alt={`Sede ${nomeCurto}`} className="w-full h-full object-contain rounded-xl" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
              Nossa Sede
            </div>
          </div>

          <div className="md:col-span-7 text-center md:text-left space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-white">Visite-nos ou Chame Online</h3>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Estamos prontos para atender você na nossa clínica ou no conforto do seu lar.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <a href={d.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-extrabold text-xs uppercase px-5 py-3.5 rounded-xl transition shadow-md">
                <MessageCircle className="w-4 h-4 fill-white text-orange-500" />
                <span>Chamar no WhatsApp</span>
              </a>
              <a href={d.mapa && d.mapa !== '#' ? d.mapa : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeCurto)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase px-5 py-3.5 rounded-xl border border-white/20 transition">
                <Navigation className="w-4 h-4 text-orange-400" />
                <span>Rota no Mapa</span>
              </a>
            </div>
            <p className="text-xs text-emerald-400 pt-3 border-t border-emerald-800/80">
              📍 {d.enderecoCompleto || d.endereco}
            </p>
          </div>

        </div>
      </section>

      <footer className="text-center py-8 bg-[#01140f] text-emerald-600 text-xs font-medium border-t border-emerald-950">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}