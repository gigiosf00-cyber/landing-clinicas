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

export default async function PaginaClinicaMinimalista({ params }: PageProps) {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    notFound();
  }

  const nomeCurto = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Clínica';
  const msgWhatsApp = `Olá! Vi o site da ${nomeCurto} e gostaria de agendar uma consulta.`;
  const d = dadosBase(lead, msgWhatsApp);
  const fotosTodas = obterFotos(lead);

  // 1. CAPA HERO DA CLÍNICA: Coluna Vertebral / Banner (foto1.jpg)
  const fotoColunaHero =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg') || f.includes('renovar1.jpg'))) ||
    fotoCapa(lead) ||
    (fotosTodas && fotosTodas[0]) ||
    '';

  // 2. NOSSA SEDE: Fachada com Porta de Vidro (foto11.jpg)
  const fotoFachadaSede =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11') || f.includes('renovar11'))) ||
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto8') || f.includes('renovar8'))) ||
    fotoColunaHero;

  const cidade = (lead.cidade || 'Iguatu').replace(/-\s*CE/gi, '').replace(/CE/gi, '').trim().toUpperCase();
  const uf = (lead.uf || lead.estado || 'CE').toUpperCase();
  const localizacaoTexto = `${cidade} - ${uf}`;

  const corAtiva = lead.corMarca || lead.cor_marca || '#10b981'; // Verde Esmeralda (Marca)
  const corDestaque = '#ea580c'; // Laranja Vibrante (Botões e Badges)
  const corTextoBotao = '#ffffff';

  const temaClinica = {
    fundo: 'bg-[#0a0a0a]',
    card: 'bg-[#171717]',
    borda: 'border-neutral-800',
    texto: 'text-neutral-100',
    sub: 'text-emerald-400',
    destaque: 'bg-emerald-600',
    serif: false,
  };

  const tagCabecalho = `FISIOTERAPIA • PILATES • ESTÉTICA • ${localizacaoTexto}`;

  const tituloHero = (
    <span>
      Mais Movimento, Mais <span style={{ color: corAtiva }} className="font-black">Qualidade de Vida.</span>
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
      className="min-h-screen bg-[#0a0a0a] text-neutral-100 selection:bg-emerald-500 selection:text-black"
    >
      {/* 1. HERO SECTION COM IMAGEM SEM CORTE E BOTÃO LARANJA */}
      <HeroSection
        nome={d.nome}
        nomeCurto={nomeCurto}
        tagSubtitulo={tagCabecalho}
        complementoSubtitulo="🏥 FISIOTERAPIA & SAÚDE INTEGRAL"
        tituloPrincipal={tituloHero}
        descricao={descricaoHero}
        textoBotao="Agendar Avaliação via WhatsApp"
        whatsappUrl={d.whatsapp}
        temTelefone={Boolean(d.tel)}
        fotoHero={fotoColunaHero}
        fitMode="contain"
        tema={temaClinica}
      />

      {/* 2. COMPONENTE PRINCIPAL INFOGOOGLE UNIFICADO */}
      <InfoGoogle
        d={d}
        fotos={fotosTodas}
        tema={temaClinica}
        prefixo="clinica"
      />

      {/* 3. CARD NOSSA SEDE */}
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
        labelSede="Nossa Clínica"
        tema={temaClinica}
      />

      <footer className="text-center py-8 bg-black text-neutral-500 text-xs font-medium border-t border-neutral-900">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}