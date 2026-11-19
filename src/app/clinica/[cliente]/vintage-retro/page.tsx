import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import SpaceZoomHero from '@/components/SpaceZoomHero';

interface Props {
  params: Promise<{
    cliente: string;
  }>;
}

export default async function PaginaClinicaVintage({ params }: Props) {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    return (
      <div className="min-h-screen bg-[#1b3b2b] text-white flex flex-col items-center justify-center p-6 text-center font-serif">
        <h2 className="text-xl font-bold">Nenhum cadastro ativo encontrado para "{cliente}".</h2>
        <p className="mt-2 text-emerald-200 text-sm font-sans">
          Certifique-se de que o ficheiro <strong>{cliente}.json</strong> existe dentro da pasta <strong>src/data/clinica/</strong>.
        </p>
      </div>
    );
  }

  const d = dadosBase(lead, `Olá! Vi o site da ${lead.nome} e gostaria de agendar uma consulta.`);
  const fotosTodas = obterFotos(lead);

  // Define a foto de capa (prioriza foto1.jpg ou renovar1.jpg)
  const fotoHero = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg') || f.includes('renovar1.jpg'))) 
    || fotoCapa(lead) 
    || (fotosTodas && fotosTodas[0]) 
    || '';

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
      
      {/* BANNER SUPERIOR DE PROPOSTA VINTAGE */}
      <div className="bg-[#132a1f] border-b border-[#1b3b2b]/60 py-2.5 px-4 text-center">
        <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#e2d9cc] uppercase font-sans">
          ✧ PROPOSTA CLÁSSICA PARA: {d.nome.toUpperCase()} ✧
        </p>
      </div>

      {/* CABEÇALHO VINTAGE */}
      <header className="sticky top-0 z-40 bg-[#f4f1ea]/90 backdrop-blur-md border-b border-[#dcd6cd]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-[#1b3b2b] tracking-tight">{d.nome}</h1>
            <p className="text-xs text-[#c85a32] font-semibold uppercase tracking-wider font-sans">
              {d.nicho || 'ATENDIMENTO DOMICILIAR • REABILITAÇÃO • QUIROPRAXIA'}
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
        tema={temaVintageRetro} 
        prefixo="clinica"
      />

      <footer className="text-center py-8 bg-[#1b3b2b] text-[#e2d9cc] text-xs font-sans font-medium border-t border-[#132a1f]">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}