import React from 'react';
import { notFound } from 'next/navigation';
import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import SpaceZoomHero from '@/components/SpaceZoomHero';
import NossaSedeCard from '@/components/sections/NossaSedeCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    cliente: string;
  }>;
}

export default async function PaginaClinicaVintage({ params }: PageProps) {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    notFound();
  }

  const nomeCurto = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Estabelecimento';
  const d = dadosBase(lead, `Olá! Vi o site da ${nomeCurto} e gostaria de agendar um atendimento.`);
  const fotosTodas = obterFotos(lead);

  // Foto de capa Hero (prioriza foto1.jpg ou renovar1.jpg)
  const fotoHero =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg') || f.includes('renovar1.jpg'))) ||
    fotoCapa(lead) ||
    (fotosTodas && fotosTodas[0]) ||
    '';

  // Foto da Sede Real
  const fotoSede =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11') || f.includes('renovar11'))) ||
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto8') || f.includes('renovar8'))) ||
    fotoHero;

  const cidade = (lead.cidade || '').replace(/\s*-\s*[A-Z]{2}$/i, '').trim().toUpperCase();
  const uf = (lead.uf || lead.estado || '').toUpperCase();
  const localizacaoTexto = cidade && uf ? `${cidade} - ${uf}` : cidade || uf;

  const corAtiva = lead.corMarca || lead.cor_marca || '#c85a32';
  const corTextoBotao = '#ffffff';

  const temaVintageRetro = {
    fundo: 'bg-[#f4f1ea]',
    card: 'bg-white',
    borda: 'border-[#dcd6cd]',
    texto: 'text-[#1b3b2b]',
    sub: 'text-[#5a6b5c]',
    destaque: 'bg-[#c85a32]',
    serif: true,
  };

  const tagCabecalho = localizacaoTexto
    ? `${d.nicho || 'ATENDIMENTO ESPECIALIZADO • SAÚDE • BEM-ESTAR'} • ${localizacaoTexto}`
    : d.nicho || 'ATENDIMENTO ESPECIALIZADO • SAÚDE • BEM-ESTAR';

  const enderecoExibido = d.enderecoCompleto || d.endereco || '';

  return (
    <main
      style={{
        '--cor-marca': corAtiva,
        '--cor-texto-botao': corTextoBotao,
      } as React.CSSProperties}
      className="min-h-screen bg-[#f4f1ea] text-[#1b3b2b] font-serif selection:bg-[#c85a32] selection:text-white"
    >
      {/* BANNER SUPERIOR DE PROPOSTA VINTAGE */}
      <div className="bg-[#132a1f] border-b border-[#1b3b2b]/60 py-2.5 px-4 text-center font-sans">
        <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#e2d9cc] uppercase">
          ✧ PROPOSTA CLÁSSICA PARA: {d.nome.toUpperCase()} ✧
        </p>
      </div>

      {/* CABEÇALHO VINTAGE */}
      <header className="sticky top-0 z-40 bg-[#f4f1ea]/90 backdrop-blur-md border-b border-[#dcd6cd] font-sans">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-[#1b3b2b] tracking-tight">{d.nome}</h1>
            <p 
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: corAtiva }}
            >
              {tagCabecalho}
            </p>
          </div>
          {d.tel && (
            <a
              href={d.whatsapp}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: corAtiva,
                color: corTextoBotao,
              }}
              className="hidden sm:inline-flex text-xs font-bold px-5 py-2.5 rounded-full transition shadow-md uppercase tracking-wider hover:brightness-110"
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
          endereco={enderecoExibido}
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
        prefixo="vintage"
      />

      {/* CARD NOSSA SEDE CLÁSSICO */}
      <NossaSedeCard
        nomeCurto={nomeCurto}
        fotoSede={fotoSede}
        whatsappUrl={d.whatsapp}
        mapaUrl={
          d.mapa && d.mapa !== '#'
            ? d.mapa
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeCurto + ' ' + enderecoExibido)}`
        }
        enderecoCompleto={enderecoExibido}
        labelSede="Nossa Sede"
        tema={temaVintageRetro}
      />

      <footer className="text-center py-8 bg-[#1b3b2b] text-[#e2d9cc] text-xs font-sans font-medium border-t border-[#132a1f]">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}