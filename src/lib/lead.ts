import fs from 'fs';
import path from 'path';

export interface LeadData {
  nome: string;
  endereco: string;
  telefone?: string;
  instagram?: string;
  fotos?: string[];
  reviews?: Array<{ autor: string; nota: number; texto: string; tempo: string; foto?: string }>;
  avaliacao?: number;
  totalAval?: number;
  horarios?: string;
  horariosSemana?: string[];
  statusAgora?: { aberto: boolean | null; texto: string };
  resumo?: string;
  mapa?: string;
  mapaEmbed?: string;
  streetView?: string;
  nicho?: string;
  cidade?: string;
  estado?: string;
  categoria?: string;
  total_avaliacoes?: number;
}

export function carregarLead(cliente: string): LeadData | null {
  const dataDir = path.join(process.cwd(), 'src', 'data');

  try {
    if (fs.existsSync(dataDir)) {
      // Lê dinamicamente todas as subpastas em src/data (barbearia, clinica, salaoblz, etc.)
      const pastas = fs.readdirSync(dataDir).filter(item => {
        return fs.statSync(path.join(dataDir, item)).isDirectory();
      });

      for (const pasta of pastas) {
        const pastaPath = path.join(dataDir, pasta);

        // 1. Tenta a correspondência exata do arquivo JSON
        const filePath = path.join(pastaPath, `${cliente}.json`);
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const parsed = JSON.parse(fileContent);
          return parsed.lead || parsed;
        }

        // 2. Fallback Inteligente: Garante abertura do site se o arquivo gravado for mais longo ou mais curto que a URL
        const arquivos = fs.readdirSync(pastaPath).filter(f => f.endsWith('.json') && f !== 'active_lead.json');
        for (const arq of arquivos) {
          const nomeSemExt = arq.replace('.json', '');
          if (nomeSemExt.startsWith(cliente) || cliente.startsWith(nomeSemExt)) {
            const fileContent = fs.readFileSync(path.join(pastaPath, arq), 'utf-8');
            const parsed = JSON.parse(fileContent);
            return parsed.lead || parsed;
          }
        }
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Erro ao carregar lead [${cliente}]:`, error);
    }
  }

  return null;
}

export function obterFotos(lead: LeadData): string[] {
  if (!lead || !Array.isArray(lead.fotos)) {
    return [];
  }
  return lead.fotos;
}

export function obterLogo(lead: LeadData): string | null {
  return null;
}

export function fotoCapa(lead: LeadData): string | null {
  if (lead && Array.isArray(lead.fotos) && lead.fotos.length > 0) {
    return lead.fotos[0];
  }
  return null;
}

export function dadosBase(lead: LeadData, mensagemWhatsapp: string) {
  const telLimpo = lead?.telefone ? lead.telefone.replace(/\D/g, '') : '';
  
  // Formatação de DDI: injeta o prefixo 55 apenas para números com 10 ou 11 dígitos
  const telComDDI = (telLimpo.length === 10 || telLimpo.length === 11) ? `55${telLimpo}` : telLimpo;
  const whatsapp = telLimpo ? `https://wa.me/${telComDDI}?text=${encodeURIComponent(mensagemWhatsapp)}` : '#';
  
  const totalAvaliacoesReal = lead?.totalAval ?? lead?.total_avaliacoes ?? 0;
  const nichoDetectado = lead?.nicho || lead?.categoria || '';

  return {
    nome: lead?.nome || 'Estabelecimento', // Preserva o nome completo oficial extraído do Maps
    endereco: lead?.endereco || '',
    enderecoCompleto: lead?.endereco || '',
    cidade: lead?.cidade || '',
    estado: lead?.estado || '',
    tel: telLimpo,
    whatsapp,
    instagram: lead?.instagram || '',
    avaliacao: lead?.avaliacao || 0,
    totalAval: totalAvaliacoesReal,
    total_avaliacoes: totalAvaliacoesReal,
    reviews: lead?.reviews || [],
    horarios: lead?.horarios || '',
    horariosSemana: lead?.horariosSemana || [],
    statusAgora: lead?.statusAgora || { aberto: null, texto: '' },
    resumo: lead?.resumo || '',
    mapa: lead?.mapa || '#',
    mapaEmbed: lead?.mapaEmbed || '',
    streetView: lead?.streetView || '',
    nicho: nichoDetectado,
    categoria: lead?.categoria || nichoDetectado
  };
}

export const servicosBarbearia = [
  {
    icone: '✂️',
    titulo: 'Corte Masculino',
    texto: 'Corte moderno ou clássico, na tesoura ou máquina com acabamento impecável.'
  },
  {
    icone: '🪒',
    titulo: 'Barba Desenhada',
    texto: 'Modelagem e design de barba com navalha e alinhamento preciso.'
  },
  {
    icone: '💈',
    titulo: 'Combo Corte + Barba',
    texto: 'Experiência completa de cuidado pessoal com desconto especial.'
  },
  {
    icone: '💧',
    titulo: 'Hidratação Capilar',
    texto: 'Tratamento revitalizante para cabelos e couro cabeludo.'
  }
];

export function fotosPorCategoria(fotos: string[]) {
  if (!Array.isArray(fotos)) {
    return [];
  }
  
  const nomeArq = (u: string) => (u?.split('/').pop() || '').toLowerCase();
  const cat = (re: RegExp) => fotos.filter((u) => re.test(nomeArq(u)));

  return [
    { id: 'tudo', label: 'Tudo', fotos },
    { id: 'trabalhos', label: 'Galeria', fotos: cat(/(trabalho|corte|penteado|servico|clinica|procedimento|ambiente|foto)/) },
  ];
}

export function diaHoje(): string {
  const dias = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  return dias[new Date().getDay()];
}

export function linhaDoDia(horariosSemana: string[], hoje: string): string {
  if (!Array.isArray(horariosSemana)) return '';
  const hojeLimpo = hoje.toLowerCase().replace('-feira', '');
  const linha = horariosSemana.find(h => h.toLowerCase().includes(hojeLimpo));
  return linha || '';
}