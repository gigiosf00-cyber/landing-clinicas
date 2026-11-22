import React from 'react';
import { notFound } from 'next/navigation';
import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import HeroSection from '@/components/sections/HeroSection';
import NossaSedeCard from '@/components/sections/NossaSedeCard';

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

  // Foto Hero (foto1.jpg ou renovar1.jpg ou fotoCapa)
  const fotoFachadaHero =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg') || f.includes('renovar1.jpg'))) ||
    fotoCapa(lead) ||
    (fotosTodas && fotosTodas[0]) ||
    '';

  // Foto Sede Real (foto11.jpg ou renovar11.jpg com a fachada de vidro)
  const fotoSedeReal =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11') || f.includes('renovar11'))) ||
    fotoFachadaHero;

  // Filtra categorias brutas em inglês vindas do Google Maps
  const eIngles = (str: string) => /physical|therapy|clinic|barber|shop/i.test(str || '');
  const nichoFormatado =
    d.nicho && !eIngles(d.nicho)
      ? d.nicho.toUpperCase()
      : 'ATENDIMENTO DOMICILIAR • REABILITAÇÃO • QUIROPRAXIA';

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
    ? `${nichoFormatado} • ${localizacaoTexto}`
    : nichoFormatado;

  const tituloHero = (
    <span>
      Mais Movimento, <br />
      <span style={{ color: corAtiva }} className="italic">Mais Qualidade de Vida.</span>
    </span>
  );

  const descricaoHero =
    'unimos excelência terapêutica e cuidado humanizado para garantir a sua plena recuperação.';

  const enderecoExibido = d.enderecoCompleto || d.endereco || '';

  return (
    <main
      style={{
        '--cor-marca': corAtiva,
        '--cor-texto-botao': corTextoBotao,
      } as React.CSSProperties}
      className="min-h-screen bg-[#f4f1ea] text-[#1b3b2b] font-serif selection:bg-[#c85a32] selection:text-white"
    >
      {/* 1. HERO SECTION MODULAR COM EFEITO SPACE ZOOM */}
      <HeroSection
        nome={d.nome}
        nomeCurto={nomeCurto}
        tagSubtitulo={tagCabecalho}
        complementoSubtitulo="ESPECIALISTA EM ELIMINAR A DOR E DEVOLVER SEU BEM-ESTAR"
        tituloPrincipal={tituloHero}
        descricao={descricaoHero}
        textoBotao="Falar com um Especialista"
        whatsappUrl={d.whatsapp}
        temTelefone={Boolean(d.tel)}
        fotoHero={fotoFachadaHero}
        tema={temaVintageRetro}
      />

      {/* 2. GALERIA E DADOS GOOGLE */}
      <InfoGoogle
        d={d}
        fotos={fotosTodas}
        tema={temaVintageRetro}
        prefixo="vintage"
      />

      {/* 3. CARD FINAL - NOSSA SEDE / INSTALAÇÕES */}
      <NossaSedeCard
        nomeCurto={nomeCurto}
        fotoSede={fotoSedeReal}
        whatsappUrl={d.whatsapp}
        mapaUrl={
          d.mapa && d.mapa !== '#'
            ? d.mapa
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeCurto + ' ' + enderecoExibido)}`
        }
        enderecoCompleto={enderecoExibido}
        labelSede="Nossas Instalações"
        tema={temaVintageRetro}
      />

      <footer className="text-center py-8 bg-[#1b3b2b] text-[#e2d9cc] text-xs font-sans font-medium border-t border-[#132a1f]">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}