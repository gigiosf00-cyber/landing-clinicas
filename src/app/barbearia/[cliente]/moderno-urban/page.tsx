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

export default async function PaginaBarbeariaModerna({ params }: PageProps) {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    notFound();
  }

  const nomeCurto = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Barbearia';
  const d = dadosBase(lead, `Olá! Vi o site da ${nomeCurto} e gostaria de agendar um horário.`);
  const fotosTodas = obterFotos(lead);

  // Foto Fachada/Hero (foto1.jpg ou fotoCapa)
  const fotoFachadaHero =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg'))) ||
    fotoCapa(lead) ||
    (fotosTodas && fotosTodas[0]) ||
    '';

  // Foto da Sede Real (foto8.jpg ou foto11.jpg com o ambiente do salão)
  const fotoSedeReal =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto8'))) ||
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11'))) ||
    fotoFachadaHero;

  const cidade = (lead.cidade || '').replace(/\s*-\s*[A-Z]{2}$/i, '').trim().toUpperCase();
  const uf = (lead.uf || lead.estado || '').toUpperCase();
  const localizacaoTexto = cidade && uf ? `${cidade} - ${uf}` : cidade || uf;

  const corAtiva = lead.corMarca || lead.cor_marca || '#f59e0b';
  const corTextoBotao = '#09090b';

  const temaBarbeariaUrbanBlue = {
    fundo: 'bg-slate-950',
    card: 'bg-slate-900',
    borda: 'border-slate-800',
    texto: 'text-slate-100',
    sub: 'text-amber-400',
    destaque: 'bg-amber-500',
    serif: false,
  };

  const tagCabecalho = localizacaoTexto
    ? `${d.nicho || 'CORTE MASCULINO • BARBA • ESTILO'} • ${localizacaoTexto}`
    : d.nicho || 'CORTE MASCULINO • BARBA • ESTILO';

  const tituloHero = (
    <span>
      Seu Visual no <span style={{ color: corAtiva }} className="font-black">Mais Alto Nível.</span>
    </span>
  );

  const descricaoHero =
    'unimos a arte da barbearia clássica com as tendências mais modernas do mercado.';

  const enderecoExibido = d.enderecoCompleto || d.endereco || '';

  return (
    <main
      style={{
        '--cor-marca': corAtiva,
        '--cor-texto-botao': corTextoBotao,
      } as React.CSSProperties}
      className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950"
    >
      {/* 1. HERO SECTION MODULAR COM SPACE ZOOM */}
      <HeroSection
        nome={d.nome}
        nomeCurto={nomeCurto}
        tagSubtitulo={tagCabecalho}
        complementoSubtitulo="💈 ESTILO E PRECISÃO EM CADA DETALHE"
        tituloPrincipal={tituloHero}
        descricao={descricaoHero}
        textoBotao="Agendar via WhatsApp"
        whatsappUrl={d.whatsapp}
        temTelefone={Boolean(d.tel)}
        fotoHero={fotoFachadaHero}
        tema={temaBarbeariaUrbanBlue}
      />

      {/* 2. GALERIA DE FOTOS POR ABAS E DADOS GOOGLE */}
      <InfoGoogle
        d={d}
        fotos={fotosTodas}
        tema={temaBarbeariaUrbanBlue}
        prefixo="barbearia"
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
        tema={temaBarbeariaUrbanBlue}
      />

      <footer className="text-center py-8 bg-black text-slate-500 text-xs font-medium border-t border-slate-900">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}