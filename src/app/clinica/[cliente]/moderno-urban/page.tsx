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

  const fotoFachadaHero =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg') || f.includes('renovar1.jpg'))) ||
    fotoCapa(lead) ||
    (fotosTodas && fotosTodas[0]) ||
    '';

  const fotoSedeReal =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11') || f.includes('renovar11'))) ||
    fotoFachadaHero;

  const eIngles = (str: string) => /physical|therapy|clinic|barber|shop/i.test(str || '');
  const nichoFormatado =
    d.nicho && !eIngles(d.nicho)
      ? d.nicho.toUpperCase()
      : 'FISIOTERAPIA • PILATES • ESTÉTICA';

  const cidade = (lead.cidade || '').replace(/\s*-\s*[A-Z]{2}$/i, '').trim().toUpperCase();
  const uf = (lead.uf || lead.estado || 'CE').toUpperCase();
  const localizacaoTexto = cidade ? `${cidade} - ${uf}` : `IGUATU - ${uf}`;

  const corAtiva = lead.corMarca || lead.cor_marca || '#10b981';
  const corTextoBotao = '#ffffff';

  // TEMA URBAN COM BASE ESMERALDA TÉCNICA
  const temaModernoUrbanClinica = {
    fundo: 'bg-[#02140e]',
    card: 'bg-[#042117]',
    borda: 'border-emerald-500/40',
    texto: 'text-white',
    sub: 'text-emerald-400',
    destaque: 'bg-[#ea580c]',
    serif: false,
  };

  const tagCabecalho = `${nichoFormatado} • ${localizacaoTexto}`;

  const tituloHero = (
    <span>
      Mais Movimento, <br />
      <span style={{ color: corAtiva }} className="font-black">
        Mais Qualidade de Vida.
      </span>
    </span>
  );

  const descricaoHero =
    'oferecemos atendimento presencial e domiciliar personalizado de fisioterapia, pilates e estética com foco na sua plena recuperação e bem-estar.';

  const enderecoExibido = d.enderecoCompleto || d.endereco || '';

  return (
    <main
      style={{
        '--cor-marca': corAtiva,
        '--cor-texto-botao': corTextoBotao,
      } as React.CSSProperties}
      className="min-h-screen bg-[#02140e] text-white selection:bg-orange-500 selection:text-white"
    >
      <HeroSection
        nome={d.nome}
        nomeCurto={nomeCurto}
        tagSubtitulo={tagCabecalho}
        complementoSubtitulo="FISIOTERAPIA & SAÚDE INTEGRAL"
        tituloPrincipal={tituloHero}
        descricao={descricaoHero}
        textoBotao="AGENDAR AVALIAÇÃO VIA WHATSAPP"
        whatsappUrl={d.whatsapp}
        temTelefone={Boolean(d.tel)}
        fotoHero={fotoFachadaHero}
        tema={temaModernoUrbanClinica}
        variacao="urban"
      />

      <InfoGoogle
        d={d}
        fotos={fotosTodas}
        tema={temaModernoUrbanClinica}
        prefixo="clinica"
      />

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

      <footer className="text-center py-8 bg-[#010b08] text-emerald-600 text-xs font-medium border-t border-emerald-950">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}