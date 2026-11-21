import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { notFound } from 'next/navigation';
import { MessageCircle, Navigation } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ cliente: string }>;
}

export default async function PaginaClinicaVintage({ params }: PageProps) {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    notFound();
  }

  const nomeCurto = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Clínica';
  const d = dadosBase(lead, `Olá! Vi o site da ${nomeCurto} e gostaria de agendar uma consulta.`);
  const fotosTodas = obterFotos(lead);

  // Foto Hero (foto1.jpg ou fotoCapa)
  const fotoFachadaHero = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg') || f.includes('renovar1.jpg'))) 
    || fotoCapa(lead) 
    || (fotosTodas && fotosTodas[0]) 
    || '';

  // Foto Sede Real (foto11.jpg com a fachada de vidro)
  const fotoSedeReal = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11') || f.includes('renovar11'))) 
    || fotoFachadaHero;

  // Filtra categorias brutas em inglês vindas do Google Maps
  const eIngles = (str: string) => /physical|therapy|clinic|barber|shop/i.test(str || '');
  const nichoFormatado = (d.nicho && !eIngles(d.nicho)) 
    ? d.nicho.toUpperCase() 
    : 'ATENDIMENTO DOMICILIAR • REABILITAÇÃO • QUIROPRAXIA';

  const temaVintageRetro = {
    fundo: 'bg-[#f4f1ea]',
    card: 'bg-white',
    borda: 'border-[#dcd6cd]',
    texto: 'text-[#1b3b2b]',
    sub: 'text-[#5a6b5c]',
    destaque: 'bg-[#c85a32]',
    serif: true
  };

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#1b3b2b] font-serif selection:bg-[#c85a32] selection:text-white">
      {/* BANNER SUPERIOR VINTAGE */}
      <div className="bg-[#132a1f] border-b border-[#1b3b2b]/60 py-2.5 px-4 text-center font-sans">
        <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#e2d9cc] uppercase">
          ✧ PROPOSTA CLÁSSICA PARA: {d.nome.toUpperCase()} ✧
        </p>
      </div>

      {/* HEADER VINTAGE */}
      <header className="sticky top-0 z-40 bg-[#f4f1ea]/90 backdrop-blur-md border-b border-[#dcd6cd]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-[#1b3b2b] tracking-tight">{d.nome}</h1>
            <p className="text-xs text-[#c85a32] font-semibold uppercase tracking-wider font-sans">
              {nichoFormatado}
            </p>
          </div>
          {d.tel && (
            <a
              href={d.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex bg-[#c85a32] hover:bg-[#b04d28] text-white text-xs font-bold px-5 py-2.5 rounded-full transition shadow-md font-sans uppercase tracking-wider"
            >
              Agendar Atendimento
            </a>
          )}
        </div>
      </header>

      {/* HERO SECTION 2 COLUNAS */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="text-[#5a6b5c] text-[10px] sm:text-xs font-semibold uppercase tracking-widest border-b border-[#dcd6cd] pb-2 inline-block font-sans">
            Especialista em eliminar a dor e devolver seu bem-estar
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#1b3b2b] leading-tight">
            Mais Movimento, <br />
            <span className="italic text-[#c85a32]">Mais Qualidade de Vida.</span>
          </h2>
          <p className="text-[#5a6b5c] text-sm sm:text-base leading-relaxed font-sans">
            Na <strong className="text-[#1b3b2b]">{nomeCurto}</strong>, unimos excelência terapêutica e cuidado humanizado para garantir a sua plena recuperação.
          </p>
          {d.tel && (
            <div className="pt-2 font-sans">
              <a
                href={d.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-[#c85a32] hover:bg-[#b04d28] text-white font-bold px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105"
              >
                Falar com um Especialista
              </a>
            </div>
          )}
        </div>

        {/* FOTO HERO COM ANIMAÇÃO SUAVE */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-[#1b3b2b]/30 shadow-2xl aspect-[4/3] sm:aspect-square bg-[#132a1f] p-3 flex items-center justify-center">
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

      {/* GALERIA E DADOS GOOGLE COM MAPA */}
      <InfoGoogle d={d} fotos={fotosTodas} tema={temaVintageRetro} prefixo="vintage" />

      {/* CARD FINAL - NOSSA SEDE */}
      <section className="bg-[#e2d9cc] py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-[#f4f1ea] border border-[#dcd6cd] p-6 sm:p-10 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 relative mx-auto w-full max-w-[280px]">
            <div className="border border-[#dcd6cd] shadow-md bg-[#132a1f] p-1 h-56 sm:h-64 flex items-center justify-center">
              <img src={fotoSedeReal} alt={`Sede ${nomeCurto}`} className="w-full h-full object-contain" />
            </div>
            <div className="text-center mt-3 bg-[#c85a32] text-white text-[10px] font-bold py-1 px-3 uppercase tracking-widest inline-block font-sans shadow-sm">
              Nossas Instalações
            </div>
          </div>

          <div className="md:col-span-7 text-center md:text-left space-y-4">
            <h3 className="text-2xl sm:text-3xl font-normal text-[#1b3b2b]">Endereço & Contato</h3>
            <p className="text-[#5a6b5c] text-sm leading-relaxed font-sans">
              Sinta-se à vontade para nos contactar via WhatsApp ou visitar o nosso espaço.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2 font-sans">
              <a href={d.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#1b3b2b] hover:bg-[#132a1f] text-white font-bold text-xs uppercase px-5 sm:px-6 py-3.5 tracking-wider transition">
                <MessageCircle className="w-4 h-4 fill-white text-[#1b3b2b]" />
                <span>Chamar WhatsApp</span>
              </a>
              <a href={d.mapa && d.mapa !== '#' ? d.mapa : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeCurto)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-transparent hover:bg-[#1b3b2b]/10 text-[#1b3b2b] font-bold text-xs uppercase px-5 py-3.5 border border-[#1b3b2b] tracking-wider transition">
                <Navigation className="w-4 h-4 text-[#c85a32]" />
                <span>Ver no Mapa</span>
              </a>
            </div>
            <p className="text-xs text-[#5a6b5c] pt-3 border-t border-[#dcd6cd] italic font-sans">
              📍 {d.enderecoCompleto || d.endereco}
            </p>
          </div>

        </div>
      </section>

      <footer className="text-center py-8 bg-[#1b3b2b] text-[#e2d9cc] text-xs font-sans font-medium border-t border-[#132a1f]">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}