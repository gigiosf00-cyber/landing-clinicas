import React from 'react';
import { notFound } from 'next/navigation';
import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import HeroSection from '@/components/sections/HeroSection';
import NossaSedeCard from '@/components/sections/NossaSedeCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    cliente: string;
  }>;
}

export default async function PaginaVintageRetro({ params }: PageProps) {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    notFound();
  }

  const nomeCurto = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Estabelecimento';
  const d = dadosBase(lead, `Olá! Vi o site da ${nomeCurto} e gostaria de agendar um atendimento.`);
  const fotosTodas = obterFotos(lead);

  const fotoHero =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg') || f.includes('renovar1.jpg'))) ||
    fotoCapa(lead) ||
    (fotosTodas && fotosTodas[0]) ||
    '';

  const fotoSede =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11') || f.includes('renovar11'))) ||
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto8') || f.includes('renovar8'))) ||
    fotoHero;

  const cidade = (lead.cidade || '').replace(/\s*-\s*[A-Z]{2}$/i, '').trim().toUpperCase();
  const uf = (lead.uf || lead.estado || '').toUpperCase();
  const localizacaoTexto = cidade && uf ? `${cidade} - ${uf}` : cidade || uf;

  const eBarbearia =
    (`${d.nicho || ''} ${d.nome || ''}`).toLowerCase().includes('barber') ||
    (`${d.nicho || ''} ${d.nome || ''}`).toLowerCase().includes('barbearia');

  // Prioriza cores exclusivas do logo/ambiente/lead antes do padrão do nicho
  const corMarcaLead =
    lead.corLogo ||
    lead.cor_logo ||
    lead.corAmbiente ||
    lead.cor_ambiente ||
    lead.corMarca ||
    lead.cor_marca ||
    (eBarbearia ? '#e2c275' : '#059669');

  const corDestaqueLead =
    lead.corDestaque ||
    lead.cor_destaque ||
    (eBarbearia ? '#c2592b' : '#ea580c');

  const corTextoBotao = '#ffffff';

  const temaVintageRetro = {
    fundo: 'bg-[#f4f1ea]',
    card: 'bg-white',
    borda: 'border-zinc-300',
    texto: 'text-[#18181b]',
    sub: 'text-zinc-600',
    destaque: 'bg-[#c2592b]',
    serif: true,
  };

  const tagCabecalho = localizacaoTexto
    ? `${d.nicho || (eBarbearia ? 'BARBER SHOP' : 'ATENDIMENTO ESPECIALIZADO')} • ${localizacaoTexto}`
    : d.nicho || (eBarbearia ? 'BARBER SHOP' : 'ATENDIMENTO ESPECIALIZADO');

  const tituloHero = (
    <span>
      Tradição &amp; Precisão em Cada Detalhe.
    </span>
  );

  const descricaoHero = eBarbearia
    ? 'unimos o cuidado clássico de barbearia com acabamento preciso e atenção em cada atendimento.'
    : 'unimos atendimento próximo, cuidado técnico e atenção em cada detalhe.';

  const enderecoExibido = d.enderecoCompleto || d.endereco || '';

  return (
    <main
      style={{
        '--cor-marca': corMarcaLead,
        '--cor-destaque': corDestaqueLead,
        '--cor-texto-botao': corTextoBotao,
      } as React.CSSProperties}
      className="min-h-screen bg-[#f4f1ea] text-[#18181b] font-serif selection:bg-zinc-800 selection:text-white"
    >
      <HeroSection
        nome={d.nome}
        nomeCurto={nomeCurto}
        tagSubtitulo={tagCabecalho}
        enderecoExibido={enderecoExibido}
        tituloPrincipal={tituloHero}
        descricao={descricaoHero}
        textoBotao="Agendar via WhatsApp"
        whatsappUrl={d.whatsapp}
        temTelefone={Boolean(d.tel)}
        fotoHero={fotoHero}
        fitMode="cover"
        posicaoFoto="object-[50%_28%]"
        tema={temaVintageRetro}
        variacao="vintage"
      />

      <InfoGoogle
        d={d}
        fotos={fotosTodas}
        tema={temaVintageRetro}
        prefixo="vintage"
      />

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
        labelSede={eBarbearia ? 'Nossa Barbearia' : 'Nossa Sede'}
        tema={temaVintageRetro}
      />

      <footer className="text-center py-8 bg-[#18181b] text-zinc-300 text-xs font-sans font-medium border-t border-zinc-700">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}