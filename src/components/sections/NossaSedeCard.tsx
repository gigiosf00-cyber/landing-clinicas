import React from 'react';
import { MessageCircle, Navigation, MapPin } from 'lucide-react';

export interface SedeProps {
  nomeCurto: string;
  fotoSede: string;
  whatsappUrl: string;
  mapaUrl: string;
  enderecoCompleto: string;
  labelSede?: string;
  tema: {
    fundo: string;
    card: string;
    borda: string;
    texto: string;
    sub: string;
    destaque: string;
  };
}

export default function NossaSedeCard({
  nomeCurto,
  fotoSede,
  whatsappUrl,
  mapaUrl,
  enderecoCompleto,
  labelSede = "Nossa Sede",
  tema
}: SedeProps) {
  const corMarcaDinamica = 'var(--cor-marca, #10b981)';
  const corDestaqueDinamica = 'var(--cor-destaque, #ea580c)';
  const corTextoBotaoDinamica = 'var(--cor-texto-botao, #ffffff)';

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className={`border rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${tema.card} ${tema.borda} ${tema.texto}`}>
        
        {/* FOTO DA SEDE E ETIQUETA COM COR DE DESTAQUE */}
        <div className="md:col-span-5 relative mx-auto w-full max-w-[280px]">
          <div className={`rounded-2xl overflow-hidden border-4 border-white/10 shadow-xl p-1 h-56 sm:h-64 flex items-center justify-center ${tema.fundo}`}>
            <img src={fotoSede} alt={`Sede ${nomeCurto}`} className="w-full h-full object-contain rounded-xl" />
          </div>
          <div 
            style={{
              backgroundColor: corDestaqueDinamica,
              color: corTextoBotaoDinamica
            }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap"
          >
            {labelSede}
          </div>
        </div>

        {/* INFORMAÇÕES E BOTÕES DE AÇÃO */}
        <div className="md:col-span-7 text-center md:text-left space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black">Visite-nos ou Chame Online</h3>
          
          <p 
            className="text-sm font-semibold leading-relaxed"
            style={{ color: corMarcaDinamica }}
          >
            Estamos prontos para atender você com excelência no nosso espaço físico ou presencialmente.
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
            {/* BOTÃO CHAMAR NO WHATSAPP COM COR DE DESTAQUE */}
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                backgroundColor: corDestaqueDinamica,
                color: corTextoBotaoDinamica
              }}
              className="inline-flex items-center gap-2 font-extrabold text-xs uppercase px-5 py-3.5 rounded-xl transition shadow-md hover:brightness-110"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chamar no WhatsApp</span>
            </a>

            {/* BOTÃO ROTA NO MAPA */}
            <a 
              href={mapaUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`inline-flex items-center gap-2 font-bold text-xs uppercase px-5 py-3.5 rounded-xl border border-current/20 transition ${tema.card}`}
            >
              <Navigation className="w-4 h-4" style={{ color: corDestaqueDinamica }} />
              <span>Rota no Mapa</span>
            </a>
          </div>

          <p 
            className="text-xs pt-3 border-t border-current/10 flex items-center justify-center md:justify-start gap-1.5 font-semibold"
            style={{ color: corMarcaDinamica }}
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: corMarcaDinamica }} />
            <span>{enderecoCompleto}</span>
          </p>
        </div>

      </div>
    </section>
  );
}