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

export default async function BarbeariaMinimalistaPage({ params }: PageProps) {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    notFound();
  }

  const nomeCurto = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Barbearia';
  const msgWhatsApp = `Olá! Vi o site da ${nomeCurto} e gostaria de agendar um horário.`;
  const d = dadosBase(lead, msgWhatsApp);
  const fotosTodas = obterFotos(lead);

  const fotoHeroBase =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg'))) ||
    fotoCapa(lead) ||
    (fotosTodas && fotosTodas[0]) ||
    '';

  const fotoHeroSelecionada =
    (fotosTodas && fotosTodas.find((f: string) => f.toLowerCase().includes('foto2'))) ||
    fotoHeroBase;

  const fotoSede =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11'))) ||
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto8'))) ||
    fotoHeroBase;

  const cidade = (lead.cidade || 'Osasco').replace(/\s*-\s*[A-Z]{2}$/i, '').trim().toUpperCase();
  const uf = (lead.uf || lead.estado || 'SP').toUpperCase();
  const localizacaoTexto = `${cidade} - ${uf}`;

  const corAtiva = lead.corMarca || lead.cor_marca || '#e2c275';
  const corDestaqueAtiva = lead.corDestaque || lead.cor_destaque || corAtiva;
  const corTextoBotao = '#09090b';

  const temaMinimalista = {
    fundo: 'bg-[#050505]',
    card: 'bg-[#0d0d0e]',
    borda: 'border-zinc-800/60',
    texto: 'text-zinc-100',
    sub: 'text-[#e2c275]',
    destaque: 'bg-[#e2c275]',
  };

  const tagCabecalho = `CORTES • BARBA • ${localizacaoTexto}`;
  const tituloHero = (
    <span>
      Seu Visual no Mais Alto <span style={{ color: corAtiva }} className="font-black">Nível.</span>
    </span>
  );
  const descricaoHero = 'unimos a arte da barbearia clássica com as tendências mais modernas, acabamento na navalha e atenção em cada detalhe.';
  const enderecoExibido = d.enderecoCompleto || d.endereco || '';

  return (
    <main
      style={{
        '--cor-marca': corAtiva,
        '--cor-destaque': corDestaqueAtiva,
        '--cor-texto-botao': corTextoBotao,
      } as React.CSSProperties}
      className={`min-h-screen ${temaMinimalista.fundo} ${temaMinimalista.texto}`}
    >
      <HeroSection
        nome={d.nome}
        nomeCurto={nomeCurto}
        tagSubtitulo={tagCabecalho}
        tituloPrincipal={tituloHero}
        descricao={descricaoHero}
        textoBotao="Agendar via WhatsApp"
        whatsappUrl={d.whatsapp}
        temTelefone={Boolean(d.tel)}
        fotoHero={fotoHeroSelecionada}
        fitMode="cover"
        tema={temaMinimalista}
        variacao="minimalista"
      />

      <InfoGoogle
        d={d}
        fotos={fotosTodas}
        tema={temaMinimalista}
        prefixo="barbearia"
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
        labelSede="Nossa Barbearia"
        tema={temaMinimalista}
      />

      <footer className="text-center py-8 border-t border-white/10 text-xs opacity-60">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}