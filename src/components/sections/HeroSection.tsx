import React from 'react';

export interface TemaHero {
  fundo: string;
  card: string;
  borda: string;
  texto: string;
  sub: string;
  destaque: string;
}

export interface HeroProps {
  nome: string;
  nomeCurto: string;
  nichoFormatado: string;
  tagSubtitulo: string;
  complementoSubtitulo?: string;
  tituloPrincipal: React.ReactNode;
  descricao: string;
  textoBotao: string;
  whatsappUrl: string;
  temTelefone: boolean;
  fotoHero: string;
  tema: TemaHero;
}

export default function HeroSection({
  nome,
  nomeCurto,
  nichoFormatado,
  tagSubtitulo,
  complementoSubtitulo,
  tituloPrincipal,
  descricao,
  textoBotao,
  whatsappUrl,
  temTelefone,
  fotoHero,
  tema
}: HeroProps) {
  return (
    <>
      {/* BANNER SUPERIOR INFORMATIVO */}
      <div className={`border-b py-2.5 px-4 text-center ${tema.fundo} ${tema.borda}`}>
        <p className={`text-[10px] sm:text-xs font-black tracking-widest uppercase ${tema.sub}`}>
          ⚡ PROPOSTA DE DESIGN EXCLUSIVA PARA: {nome.toUpperCase()}
        </p>
      </div>

      {/* HEADER NAVEGAÇÃO */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${tema.fundo}/95 ${tema.borda}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
          <div>
            <h1 className={`text-base sm:text-lg font-black tracking-tight ${tema.texto}`}>{nome}</h1>
            <p className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider mt-0.5 ${tema.sub}`}>
              {tagSubtitulo}
            </p>
            {nichoFormatado && (
              <p className={`text-[11px] font-semibold uppercase tracking-wider opacity-80 mt-0.5 ${tema.texto}`}>
                {nichoFormatado}
              </p>
            )}
          </div>
          {temTelefone && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className={`hidden sm:inline-flex text-white text-xs font-bold px-5 py-2.5 rounded-full transition shadow-md uppercase tracking-wider shrink-0 ${tema.destaque}`}
            >
              {textoBotao}
            </a>
          )}
        </div>
      </header>

      {/* HERO SECTION 2 COLUNAS */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          {complementoSubtitulo && (
            <div className="inline-block">
              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border uppercase tracking-wider shadow-sm ${tema.card} ${tema.sub} ${tema.borda}`}>
                {complementoSubtitulo}
              </span>
            </div>
          )}

          <h2 className={`text-3xl sm:text-5xl font-black leading-tight tracking-tight ${tema.texto}`}>
            {tituloPrincipal}
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed opacity-90 ${tema.texto}`}>
            Na <strong className="font-bold">{nomeCurto}</strong>, {descricao}
          </p>

          {temTelefone && (
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-center text-white font-bold px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 ${tema.destaque}`}
              >
                {textoBotao}
              </a>
            </div>
          )}
        </div>

        {/* CONTAINER DA IMAGEM */}
        <div className={`relative overflow-hidden rounded-3xl border shadow-2xl aspect-[4/3] sm:aspect-square p-3 flex items-center justify-center ${tema.card} ${tema.borda}`}>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes subtle-float {
              0% { transform: scale(1); }
              50% { transform: scale(1.03); }
              100% { transform: scale(1); }
            }
            .animate-subtle-zoom {
              animation: subtle-float 8s ease-in-out infinite;
              will-change: transform;
            }
          `}} />
          {fotoHero && (
            <img
              src={fotoHero}
              alt={nome}
              className="w-full h-full object-contain rounded-2xl animate-subtle-zoom"
            />
          )}
        </div>
      </section>
    </>
  );
}