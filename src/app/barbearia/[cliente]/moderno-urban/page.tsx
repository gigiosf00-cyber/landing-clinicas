import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import SpaceZoomHero from '@/components/SpaceZoomHero';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    cliente: string;
  }>;
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

  // Foto de capa Hero (prioriza foto1.jpg ou fotoCapa)
  const fotoHero = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg')))
    || fotoCapa(lead)
    || (fotosTodas && fotosTodas[0])
    || '';

  const temaBarbeariaUrban = {
    fundo: 'bg-zinc-950',
    card: 'bg-zinc-900',
    borda: 'border-zinc-800',
    texto: 'text-zinc-100',
    sub: 'text-amber-500',
    destaque: 'bg-amber-500',
    serif: false
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-zinc-950">
      
      {/* BANNER SUPERIOR */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-b border-zinc-800 py-2.5 px-4 text-center">
        <p className="text-[10px] sm:text-xs font-black tracking-widest text-amber-500 uppercase">
          ⚡ PROPOSTA DE DESIGN URBAN PARA: {d.nome.toUpperCase()}
        </p>
      </div>

      {/* CABEÇALHO */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-base sm:text-lg font-black text-white tracking-tight">{d.nome}</h1>
            <p className="text-xs text-amber-500 font-bold uppercase tracking-wider">
              {d.nicho || 'CORTE MASCULINO • BARBA • ESTILO'}
            </p>
          </div>
          {d.tel && (
            <a
              href={d.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex bg-amber-500 hover:bg-amber-600 text-zinc-950 text-xs font-black px-5 py-2.5 rounded-full transition shadow-md uppercase tracking-wider"
            >
              Agendar Horário
            </a>
          )}
        </div>
      </header>

      {/* HERO COM ANIMAÇÃO SPACE ZOOM INTEGRADA */}
      <div className="px-4">
        <SpaceZoomHero
          nome={d.nome}
          endereco={d.enderecoCompleto || d.endereco}
          avaliacao={d.avaliacao}
          foto={fotoHero}
          whatsappUrl={d.whatsapp}
          temTelefone={Boolean(d.tel)}
        />
      </div>

      {/* COMPONENTE DE INFORMAÇÕES DO GOOGLE E GALERIA CATEGORIZADA */}
      <InfoGoogle 
        d={d} 
        fotos={fotosTodas} 
        tema={temaBarbeariaUrban} 
        prefixo="barbearia"
      />

      <footer className="text-center py-8 bg-black text-zinc-500 text-xs font-medium border-t border-zinc-900">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}