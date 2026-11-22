import React from 'react';
import { Metadata } from 'next';
import { carregarLead, dadosBase, fotoCapa, obterFotos } from '@/lib/lead';
import InfoGoogle2 from '@/components/infogoogle2';
import HeroSection from '@/components/sections/HeroSection';
import NossaSedeCard from '@/components/sections/NossaSedeCard';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ cliente: string; modelo: string }>;
}

function limparCidade(cidadeRaw: string | undefined, padrao = 'Osasco'): string {
  const base = (cidadeRaw || padrao).trim();
  return (
    base
      .replace(/\s*-\s*[A-Z]{2}$/i, '')
      .replace(
        /\b(PR|CE|SP|RJ|MG|SC|RS|BA|GO|DF|PE|AM|PA|MT|MS|ES|MA|PB|RN|AL|SE|PI|TO|RO|AC|AP|RR)\b$/i,
        ''
      )
      .trim() || padrao
  );
}

function normalizarHex(corRaw: unknown): string | null {
  if (typeof corRaw !== 'string') return null;
  const limpo = corRaw.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(limpo) || /^#[0-9a-fA-F]{3}$/.test(limpo)) {
    return limpo;
  }
  return null;
}

function obterTextoContraste(hexCor: string): string {
  const hex = hexCor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminancia > 0.55 ? '#09090b' : '#ffffff';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cliente } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) return { title: 'Estabelecimento' };

  const nome = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Estabelecimento';
  const cidade = limparCidade(lead.cidade);
  const uf = (lead.uf || lead.estado || 'SP').toUpperCase();
  const textoBuscaNicho = `${cliente} ${lead.nicho || ''} ${lead.categoria || ''} ${lead.nome || ''}`.toLowerCase();
  const eBarbearia =
    textoBuscaNicho.includes('barber') ||
    textoBuscaNicho.includes('barbearia') ||
    textoBuscaNicho.includes('barbeiro');

  if (eBarbearia) {
    return {
      title: `${nome} — Barbearia, Cortes & Barba | ${cidade} - ${uf}`,
      description: `Conheça a ${nome} em ${cidade} - ${uf}. Cortes modernos, barba na toalha quente e agendamento rápido via WhatsApp.`,
    };
  }

  return {
    title: `${nome} — Atendimento Especializado | ${cidade} - ${uf}`,
    description: `Conheça a ${nome} em ${cidade} - ${uf}. Atendimento especializado via WhatsApp.`,
  };
}

export default async function PaginaDinamica({ params }: PageProps) {
  const { cliente, modelo } = await params;
  const lead: any = carregarLead(cliente);

  if (!lead) {
    notFound();
  }

  const nomeCurto = lead.nome ? lead.nome.split(/[-|:,]/)[0].trim() : 'Estabelecimento';
  const textoBuscaNicho = `${cliente} ${modelo} ${lead.nicho || ''} ${lead.categoria || ''} ${lead.nome || ''}`.toLowerCase();

  const eBarbearia =
    textoBuscaNicho.includes('barber') ||
    textoBuscaNicho.includes('barbearia') ||
    textoBuscaNicho.includes('barbeiro');

  const msgWhatsApp = eBarbearia
    ? `Olá! Vi o site da ${nomeCurto} e gostaria de agendar um horário.`
    : `Olá! Vi o site da ${nomeCurto} e gostaria de agendar uma consulta.`;

  const d = dadosBase(lead, msgWhatsApp);
  const fotosTodas = obterFotos(lead);

  const fotoHeroBase =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto1.jpg'))) ||
    fotoCapa(lead) ||
    (fotosTodas && fotosTodas[0]) ||
    '';

  const fotoMinimalista =
    (fotosTodas && fotosTodas.find((f: string) => f.toLowerCase().includes('foto2'))) ||
    fotoHeroBase;

  const fotoSede =
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto11'))) ||
    (fotosTodas && fotosTodas.find((f: string) => f.includes('foto8'))) ||
    fotoHeroBase;

  const cidadeLimpa = limparCidade(lead.cidade).toUpperCase();
  const ufLimpa = (lead.uf || lead.estado || 'SP').toUpperCase();
  const localizacaoTexto = `${cidadeLimpa} - ${ufLimpa}`;

  const modeloLower = modelo.toLowerCase();
  const eVintage = modeloLower.includes('vintage');
  const eMinimalista = modeloLower.includes('minimalista') || modeloLower.includes('minimal');

  const corMarca = normalizarHex(
    lead.corMarca || lead.cor_marca || lead.corDestaque || lead.cor_destaque
  );

  const corFallback = eBarbearia
    ? (eVintage ? '#8c6d3f' : eMinimalista ? '#e2c275' : '#c99e53')
    : (eVintage ? '#c85a32' : '#059669');

  const corAtiva = corMarca || corFallback;
  const corTextoBotao = obterTextoContraste(corAtiva);

  const temaTeste = eBarbearia
    ? eVintage
      ? {
          fundo: 'bg-[#f4f1ea]',
          card: 'bg-[#fffdf9]',
          borda: 'border-[#d6cfc2]',
          texto: 'text-[#1c1917]',
          sub: 'text-[#8c6d3f]',
          destaque: 'bg-[#8c6d3f]',
        }
      : eMinimalista
        ? {
            fundo: 'bg-[#050505]',
            card: 'bg-[#0d0d0e]',
            borda: 'border-zinc-800/60',
            texto: 'text-zinc-100',
            sub: 'text-[#e2c275]',
            destaque: 'bg-[#e2c275]',
          }
        : {
            fundo: 'bg-[#0f1115]',
            card: 'bg-[#181a20]',
            borda: 'border-zinc-800',
            texto: 'text-white',
            sub: 'text-[#c99e53]',
            destaque: 'bg-[#c99e53]',
          }
    : eVintage
      ? {
          fundo: 'bg-[#f4f1ea]',
          card: 'bg-white',
          borda: 'border-[#dcd6cd]',
          texto: 'text-[#1b3b2b]',
          sub: 'text-[#c85a32]',
          destaque: 'bg-[#c85a32]',
        }
      : {
          fundo: 'bg-[#021a14]',
          card: 'bg-[#042d23]',
          borda: 'border-emerald-900/50',
          texto: 'text-white',
          sub: 'text-emerald-400',
          destaque: 'bg-emerald-600',
        };

  const tagCabecalho = eBarbearia
    ? `CORTES • BARBA • ${localizacaoTexto}`
    : `ATENDIMENTO ESPECIALIZADO • ${localizacaoTexto}`;

  const tituloHero = eBarbearia ? (
    <span>
      Seu Visual no Mais Alto <span style={{ color: corAtiva }} className="font-black">Nível.</span>
    </span>
  ) : (
    <span>
      Cuidado Profissional e <span style={{ color: corAtiva }} className="font-black">Atendimento Dedicado</span>
    </span>
  );

  const descricaoHero = eBarbearia
    ? 'unimos a arte da barbearia clássica com as tendências mais modernas, acabamento na navalha e atenção em cada detalhe.'
    : 'oferecemos atendimento personalizado com foco no seu bem-estar — e dispomos também de opção de atendimento domiciliar.';

  const textoBotaoHero = eBarbearia ? 'Agendar via WhatsApp' : 'Agendar Consulta via WhatsApp';
  const labelSedeFinal = eBarbearia ? 'Nossa Barbearia' : 'Nossa Sede';
  const enderecoExibido = d.enderecoCompleto || d.endereco || '';

  return (
    <main
      style={{
        '--cor-marca': corAtiva,
        '--cor-texto-botao': corTextoBotao,
      } as React.CSSProperties}
      className={`min-h-screen ${temaTeste.fundo} ${temaTeste.texto}`}
    >
      <HeroSection
        nome={d.nome}
        nomeCurto={nomeCurto}
        nichoFormatado=""
        tagSubtitulo={tagCabecalho}
        tituloPrincipal={tituloHero}
        descricao={descricaoHero}
        textoBotao={textoBotaoHero}
        whatsappUrl={d.whatsapp}
        temTelefone={!!d.tel}
        fotoHero={eMinimalista ? '' : fotoHeroBase}
        tema={temaTeste}
      />

      {eMinimalista && fotoMinimalista && (
        <section className="max-w-6xl mx-auto px-6 pb-8">
          <div
            className={`relative overflow-hidden rounded-3xl border shadow-2xl h-[340px] sm:h-[460px] ${temaTeste.borda}`}
          >
            <img
              src={fotoMinimalista}
              alt={`${nomeCurto} — Ambiente`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-10 text-white">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.2em] mb-1"
                style={{ color: corAtiva }}
              >
                ESTILO &amp; PRECISÃO
              </span>
              <p className="text-lg sm:text-2xl font-black tracking-tight max-w-xl">
                {nomeCurto} — {localizacaoTexto}
              </p>
            </div>
          </div>
        </section>
      )}

      <InfoGoogle2
        d={d}
        fotos={fotosTodas}
        tema={temaTeste}
        prefixo={eBarbearia ? 'barbearia' : 'teste'}
      />

      <NossaSedeCard
        nomeCurto={nomeCurto}
        fotoSede={fotoSede}
        whatsappUrl={d.whatsapp}
        mapaUrl={
          d.mapa && d.mapa !== '#'
            ? d.mapa
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nomeCurto)}`
        }
        enderecoCompleto={enderecoExibido}
        labelSede={labelSedeFinal}
        tema={temaTeste}
      />

      <footer className="text-center py-8 border-t border-black/10 dark:border-white/10 text-xs opacity-60">
        <p>© {new Date().getFullYear()} {d.nome}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}