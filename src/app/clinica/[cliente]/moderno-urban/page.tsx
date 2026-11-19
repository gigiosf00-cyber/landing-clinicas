import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import SpaceZoomHero from '@/components/SpaceZoomHero';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    cliente: string;
  }>;
}

export default async function PaginaClinicaModerna({ params }: Props) {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    return (
      <div className="min-h-screen bg-emerald-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold">Nenhum cadastro ativo encontrado para "{cliente}".</h2>
        <p className="mt-2 text-emerald-300 text-sm">
          Certifique-se de que o arquivo JSON existe na pasta <strong>src/data/clinica/</strong>.
        </p>
      </div>
    );
  }

  const d = dadosBase(lead, `Olá! Vi o site da ${lead.nome} e gostaria de agendar uma consulta.`);
  const fotosTodas = obterFotos(lead);
  
  // Define a foto de capa (prioriza foto1.jpg ou fotoCapa)
  const fotoHero = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg'))) 
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
      
      {/* BANNER SUPERIOR DE PROPOSTA */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-b border-emerald-900/60 py-2 px-4 text-center">
        <p className="text-[10px] sm:text-xs font-black tracking-widest text-emerald-400 uppercase">
          ⚡ PROPOSTA DE DESIGN MODERNO PARA: {d.nome.toUpperCase()}
        </p>
      </div>

      {/* CABEÇALHO */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-base sm:text-lg font-black text-white tracking-tight">{d.nome}</h1>
            <p className="text-xs text-orange-400 font-bold uppercase tracking-wider">
              {d.nicho || 'ATENDIMENTO ESPECIALIZADO • REABILITAÇÃO • SAÚDE'}
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

      {/* COMPONENTE DE INFORMAÇÕES DO GOOGLE E GALERIA CATEGORIZADA POR ABAS */}
      <InfoGoogle 
        d={d} 
        fotos={fotosTodas} 
        tema={temaModernoUrban} 
        prefixo="clinica"
      />

      <footer className="text-center py-8 bg-black text-zinc-500 text-xs font-medium border-t border-zinc-900">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}