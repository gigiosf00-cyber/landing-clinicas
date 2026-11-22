import { Metadata } from 'next';
import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import HeroSection from '@/components/sections/HeroSection';
import NossaSedeCard from '@/components/sections/NossaSedeCard';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ cliente: string; modelo: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) return { title: 'Estabelecimento' };

  const nome = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Estabelecimento';
  const cidade = (lead.cidade || 'Iguatu').replace(/-\s*CE/gi, '').replace(/CE/gi, '').trim();

  return {
    title: `${nome} — Fisioterapia, Pilates e Estética | ${cidade} - CE`,
    description: `Conheça a ${nome} em ${cidade} - CE. Atendimento em consultório e opção de atendimento domiciliar via WhatsApp.`,
  };
}

export default async function PaginaTesteModular({ params }: PageProps) {
  const { cliente, modelo } = await params;
  
  const lead: any = carregarLead(cliente);

  if (!lead) {
    notFound();
  }

  const nomeCurto = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Estabelecimento';
  const d = dadosBase(lead, `Olá! Vi o site da ${nomeCurto} e gostaria de agendar uma consulta.`);
  const fotosTodas = obterFotos(lead);

  const fotoHero = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg'))) 
    || fotoCapa(lead) 
    || (fotosTodas && fotosTodas[0]) 
    || '';

  const fotoSede = (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11'))) 
    || (fotosTodas && fotosTodas.find((f: string) => f.includes('foto8'))) 
    || fotoHero;

  let cidadeLimpa = (lead.cidade || 'Iguatu').replace(/-\s*CE/gi, '').replace(/CE/gi, '').trim();
  const localizacaoTexto = `${cidadeLimpa.toUpperCase()} - CE`;

  const eVintage = modelo.includes('vintage');
  const temaTeste = {
    fundo: eVintage ? 'bg-[#f4f1ea]' : 'bg-[#011c15]',
    card: eVintage ? 'bg-white' : 'bg-[#022c22]',
    borda: eVintage ? 'border-[#dcd6cd]' : 'border-emerald-900/60',
    texto: eVintage ? 'text-[#1b3b2b]' : 'text-white',
    sub: eVintage ? 'text-[#c85a32]' : 'text-emerald-400',
    destaque: eVintage ? 'bg-[#c85a32]' : 'bg-orange-500'
  };

  return (
    <main className={`min-h-screen ${temaTeste.fundo} ${temaTeste.texto}`}>
      
      <HeroSection
        nome={d.nome}
        nomeCurto={nomeCurto}
        nichoFormatado=""
        tagSubtitulo={`ATENDIMENTO ESPECIALIZADO • ${localizacaoTexto}`}
        tituloPrincipal={<span>Cuidado Profissional para Sua <span className={`${temaTeste.sub} font-black`}>Saúde & Movimento</span></span>}
        descricao="oferecemos atendimento personalizado de fisioterapia, pilates e estética com foco no seu bem-estar — e dispomos também de opção de atendimento domiciliar."
        textoBotao="Agendar Consulta via WhatsApp"
        whatsappUrl={d.whatsapp}
        temTelefone={!!d.tel}
        fotoHero={fotoHero}
        tema={temaTeste}
      />

      <InfoGoogle d={d} fotos={fotosTodas} tema={temaTeste} prefixo="teste" />

      <NossaSedeCard
        nomeCurto={nomeCurto}
        fotoSede={fotoSede}
        whatsappUrl={d.whatsapp}
        mapaUrl={d.mapa && d.mapa !== '#' ? d.mapa : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeCurto)}`}
        enderecoCompleto={d.enderecoCompleto || d.endereco}
        labelSede="Nossa Clínica"
        tema={temaTeste}
      />

      <footer className="text-center py-8 border-t border-white/10 text-xs opacity-60">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}