import { carregarLead, obterFotos, dadosBase, obterLogo } from '@/lib/lead';
import InfoGoogle from '@/components/InfoGoogle';
import { HeartPulse, AlertTriangle, ChevronRight, MessageSquare, MapPin, Star } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps { params: Promise<{ cliente: string }> }

export default async function PaginaClinicaMinimalista({ params }: PageProps) {
  const { cliente } = await params;
  const lead = carregarLead(cliente);

  if (!lead) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-neutral-200 font-sans">
        <div className="max-w-lg bg-neutral-900 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
          <AlertTriangle className="w-12 h-12 text-emerald-500 mx-auto" />
          <h1 className="text-xl font-bold text-white">Nenhum cadastro encontrado</h1>
          <p className="text-xs text-neutral-400">Verifique se o ficheiro do cliente existe na pasta de leads.</p>
        </div>
      </div>
    );
  }

  const fotos = obterFotos(lead);
  const logo = obterLogo(lead);
  const d = dadosBase(lead, `Olá! Vi o site da ${lead.nome} e gostaria de agendar uma consulta.`);

  // TEMA DE CORES DA MARCA (VERDE ESMERALDA / SAÚDE)
  const temaClinica = {
    fundo: '#022c22', 
    card: '#064e3b', 
    borda: '#047857', 
    texto: '#ffffff', 
    sub: '#a7f3d0', 
    destaque: '#10b981', 
    serif: false
  };

  const localSimples = lead.cidade ? `${lead.cidade}${lead.estado ? ` - ${lead.estado}` : ''}` : 'Planalto - Iguatu, CE';

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-emerald-500 selection:text-black">

      {/* BANNER SUPERIOR DE PROPOSTA */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700 text-black text-[11px] font-black uppercase tracking-widest text-center py-2 px-4 shadow-md">
        🏥 PROPOSTA DIGITAL EXCLUSIVA PARA {lead.nome} 🏥
      </div>

      {/* HEADER FIXO DE CLÍNICA */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-emerald-900/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {logo ? (
              <img src={logo} alt="Logo" className="h-10 w-auto max-w-[140px] object-contain" />
            ) : (
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <HeartPulse className="w-5 h-5 text-emerald-400" />
              </div>
            )}
            <span className="text-base sm:text-lg font-black uppercase text-white tracking-wider truncate max-w-[200px] sm:max-w-none">
              {lead.nome}
            </span>
          </div>
        </div>
      </header>

      {/* HERO SECTION DA CLÍNICA COM FOTO DA FACHADA CORTADA (foto1.jpg) */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-400 shadow-md">
              <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>{d.avaliacao > 0 ? d.avaliacao.toFixed(1) : '5.0'} Google Maps</span>
              <span className="text-emerald-700">•</span>
              <span className="text-emerald-200">{d.totalAval || 42} avaliações</span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-900/80 px-3.5 py-1.5 rounded-full border border-neutral-800">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{localSimples}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Mais Movimento, Mais Qualidade de Vida.
          </h1>

          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl">
            Na <strong className="text-white">{lead.nome}</strong>, oferecemos atendimento presencial e domiciliar especializado para sua plena recuperação e bem-estar.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {d.tel && (
              <a 
                href={d.whatsapp} 
                target="_blank" 
                rel="noreferrer" 
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-7 py-4 rounded-xl transition text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-emerald-500/20 hover:scale-105"
              >
                <span>AGENDAR AVALIAÇÃO NO WHATSAPP</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* CARD DE FOTO DA FACHADA (COM FOTO1.JPG FOCADA NO TOPO) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden border border-emerald-900/60 shadow-2xl h-[380px] bg-neutral-900">
            {fotos[0] ? (
              <img 
                src={fotos[0]} 
                alt={lead.nome} 
                className="w-full h-full object-cover object-top brightness-95 hover:scale-105 transition-transform duration-700" 
              />
            ) : (
              <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-600">Sem Imagem</div>
            )}
          </div>
        </div>
      </section>

      {/* COMPONENTE PRINCIPAL (SERVIÇOS DE SAÚDE, GALERIA, AVALIAÇÕES E MAPA NOTURNO) */}
      <InfoGoogle d={d} fotos={fotos} tema={temaClinica} prefixo="clin" />

      {/* CALL TO ACTION RODAPÉ */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight mb-3">Pronto para viver sem dor?</h2>
            <p className="text-black/80 text-sm font-semibold max-w-md mx-auto">Agende sua avaliação agora mesmo com nossos especialistas via WhatsApp.</p>
            <a href={d.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-black hover:bg-neutral-900 text-white font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider mt-6 transition shadow-2xl hover:scale-105">
              <span>Agendar Consulta</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </a>
          </div>
        </div>
      </section>

      {/* BOTÃO FLUTUANTE DIREITO (DESKTOP) */}
      {d.tel && (
        <div className="hidden sm:block fixed bottom-6 right-6 z-50">
          <a
            href={d.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="Agendar WhatsApp"
            className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full shadow-2xl shadow-emerald-950 transition-all duration-300 transform hover:scale-110"
          >
            <span className="absolute -inset-1 rounded-full bg-emerald-400 animate-ping opacity-30"></span>
            <MessageSquare className="w-6 h-6 relative z-10" />
          </a>
        </div>
      )}

    </div>
  );
}