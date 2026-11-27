import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import HeroSection from '@/components/sections/HeroSection';
import NossaSedeCard from '@/components/sections/NossaSedeCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ cliente: string; template?: string }>;
}

export default async function PaginaClinicaMinimalista({ params }: PageProps) {
  const { cliente, template } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    notFound();
  }

  const tempLower = (template || '').toLowerCase();
  const variacaoHero: 'minimalista' | 'urban' | 'vintage' =
    tempLower.includes('urban') || tempLower.includes('moderno')
      ? 'urban'
      : tempLower.includes('vintage') || tempLower.includes('retro')
      ? 'vintage'
      : 'minimalista';

  const nomeCurto = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Clínica';
  const msgWhatsApp = `Olá! Vi o site da ${nomeCurto} e gostaria de agendar uma consulta.`;
  const d = dadosBase(lead, msgWhatsApp);
  const fotosTodas = obterFotos(lead);

  const fotoColunaHero =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg') || f.includes('renovar1.jpg'))) ||
    fotoCapa(lead) ||
    (fotosTodas && fotosTodas[0]) ||
    '';

  const fotoFachadaSede =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11') || f.includes('renovar11'))) ||
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto8') || f.includes('renovar8'))) ||
    fotoColunaHero;

  const cidade = (lead.cidade || 'Iguatu').replace(/-\s*CE/gi, '').replace(/CE/gi, '').trim().toUpperCase();
  const uf = (lead.uf || lead.estado || 'CE').toUpperCase();
  const localizacaoTexto = `${cidade} - ${uf}`;

  const corAtiva = lead.corMarca || lead.cor_marca || '#10b981';
  const corDestaque = '#059669';
  const corTextoBotao = '#ffffff';

  const isVintage = variacaoHero === 'vintage';

  const temaClinica = {
    fundo: isVintage ? 'bg-[#f5efe6]' : 'bg-[#0a0a0a]',
    card: isVintage ? 'bg-[#ffffff]' : 'bg-[#141414]',
    borda: isVintage ? 'border-[#e0d3c1]' : 'border-neutral-800',
    texto: isVintage ? 'text-[#1c1917]' : 'text-neutral-100',
    sub: 'text-emerald-400',
    destaque: 'bg-emerald-600',
    serif: isVintage,
  };

  const tagCabecalho = `FISIOTERAPIA • PILATES • ESTÉTICA • ${localizacaoTexto}`;

  const tituloHero = (
    <span>
      Mais Movimento, Mais <span style={{ color: corAtiva }} className="font-extrabold">Qualidade de Vida.</span>
    </span>
  );

  const descricaoHero =
    'oferecemos atendimento presencial e domiciliar personalizado de fisioterapia, pilates e estética com foco na sua plena recuperação e bem-estar.';

  const enderecoExibido = d.enderecoCompleto || d.endereco || localizacaoTexto;

  return (
    <main
      style={{
        '--cor-marca': corAtiva,
        '--cor-destaque': corDestaque,
        '--cor-texto-botao': corTextoBotao,
      } as React.CSSProperties}
      className={`min-h-screen ${
        isVintage
          ? 'bg-[#f5efe6] text-[#1c1917] selection:bg-emerald-500 selection:text-black'
          : 'bg-[#0a0a0a] text-neutral-100 selection:bg-emerald-500 selection:text-black'
      }`}
    >
      <HeroSection
        nome={d.nome}
        nomeCurto={nomeCurto}
        tagSubtitulo={tagCabecalho}
        complementoSubtitulo="FISIOTERAPIA & SAÚDE INTEGRAL"
        tituloPrincipal={tituloHero}
        descricao={descricaoHero}
        textoBotao="Agendar Avaliação via WhatsApp"
        whatsappUrl={d.whatsapp}
        temTelefone={Boolean(d.tel)}
        fotoHero={fotoColunaHero}
        fitMode="contain"
        tema={temaClinica}
        variacao={variacaoHero}
      />

      <InfoGoogle
        d={d}
        fotos={fotosTodas}
        tema={temaClinica}
        prefixo="clinica"
      />

      <NossaSedeCard
        nomeCurto={nomeCurto}
        fotoSede={fotoFachadaSede}
        whatsappUrl={d.whatsapp}
        mapaUrl={
          d.mapa && d.mapa !== '#'
            ? d.mapa
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeCurto + ' ' + enderecoExibido)}`
        }
        enderecoCompleto={enderecoExibido}
        labelSede="Nossa Sede"
        tema={temaClinica}
      />

      <footer className={`text-center py-8 px-4 text-xs font-medium border-t ${
        isVintage ? 'bg-[#eae3d5] text-stone-600 border-[#e0d3c1]' : 'bg-black text-neutral-500 border-neutral-900'
      }`}>
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
        <p className="mt-2 flex items-center justify-center gap-3">
          <Link href="/termos" className="underline hover:opacity-80">
            Termos de Serviço
          </Link>
          <span>•</span>
          <Link href="/privacidade" className="underline hover:opacity-80">
            Política de Privacidade
          </Link>
        </p>
      </footer>
    </main>
  );
}