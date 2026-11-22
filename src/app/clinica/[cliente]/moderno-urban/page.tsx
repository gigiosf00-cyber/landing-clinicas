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

export default async function PaginaClinicaModerna({ params }: PageProps) {
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

  const corAtiva = lead.corMarca || lead.cor_marca || '#10b981';
  const corTextoBotao = '#ffffff';

  const temaModernoUrbanClinica = {
    fundo: 'bg-[#011c15]',
    card: 'bg-[#022c22]',
    borda: 'border-emerald-900/60',
    texto: 'text-white',
    sub: 'text-emerald-400',
    destaque: 'bg-orange-500',
    serif: false,
  };

  const tagCabecalho = localizacaoTexto
    ? `${nichoFormatado} • ${localizacaoTexto}`
    : nichoFormatado;

  const tituloHero = (
    <span>
      Sua <span style={{ color: corAtiva }} className="font-black">Qualidade de Vida</span> levada a sério.
    </span>
  );

  const descricaoHero =
    'unimos excelência clínica e atendimento humanizado para a sua plena recuperação.';

  const enderecoExibido = d.enderecoCompleto || d.endereco || '';

  return (
    <main
      style={{
        '--cor-marca': corAtiva,
        '--cor-texto-botao': corTextoBotao,
      } as React.CSSProperties}
      className="min-h-screen bg-[#011c15] text-white selection:bg-orange-500 selection:text-white"
    >
      {/* 1. HERO SECTION MODULAR COM SPACE ZOOM INTEGRADO */}
      <HeroSection
        nome={d.nome}
        nomeCurto={nomeCurto}
        tagSubtitulo={tagCabecalho}
        complementoSubtitulo="✦ ESPECIALISTA EM ELIMINAR A DOR E DEVOLVER SEU BEM-ESTAR"
        tituloPrincipal={tituloHero}
        descricao={descricaoHero}
        textoBotao="Falar com Especialista"
        whatsappUrl={d.whatsapp}
        temTelefone={Boolean(d.tel)}
        fotoHero={fotoFachadaHero}
        tema={temaModernoUrbanClinica}
      />

      {/* 2. GALERIA E DADOS GOOGLE COM MAPA NOTURNO */}
      <InfoGoogle
        d={d}
        fotos={fotosTodas}
        tema={temaModernoUrbanClinica}
        prefixo="clinica"
      />

      {/* 3. CARD FINAL - NOSSA SEDE */}
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
        labelSede="Nossa Sede"
        tema={temaModernoUrbanClinica}
      />

      <footer className="text-center py-8 bg-[#01140f] text-emerald-600 text-xs font-medium border-t border-emerald-950">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}