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
}

export function carregarLead(cliente: string): LeadData | null {
  const pastas = ['barbearia', 'clinica', 'consultorio'];

  // 1. Tenta carregar via require dinâmico (Empacotado nativamente no build da Vercel)
  for (const pasta of pastas) {
    try {
      const parsed = require(`@/data/${pasta}/${cliente}.json`);
      if (parsed && parsed.lead) {
        return parsed.lead;
      }
      if (parsed) {
        return parsed;
      }
    } catch {
      // Continua a busca na próxima pasta caso não encontre nesta
    }
  }

  // 2. Fallback via sistema de ficheiros (fs) para ambiente de desenvolvimento local
  for (const pasta of pastas) {
    try {
      const filePath = path.join(process.cwd(), 'src', 'data', pasta, `${cliente}.json`);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(fileContent);
        if (parsed && parsed.lead) {
          return parsed.lead;
        }
        return parsed;
      }
    } catch (errorFs) {
      console.error(`Erro ao carregar lead localmente (${pasta}):`, errorFs);
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

// Exportação necessária para evitar falhas de compilação em rotas legadas no build da Vercel
export function fotoCapa(lead: LeadData): string | null {
  if (lead && Array.isArray(lead.fotos) && lead.fotos.length > 0) {
    return lead.fotos[0];
  }
  return null;
}

export function dadosBase(lead: LeadData, mensagemWhatsapp: string) {
  const telLimpo = lead.telefone ? lead.telefone.replace(/\D/g, '') : '';
  const whatsapp = telLimpo ? `https://wa.me/55${telLimpo}?text=${encodeURIComponent(mensagemWhatsapp)}` : '#';

  return {
    nome: lead.nome || 'Estabelecimento',
    endereco: lead.endereco || '',
    enderecoCompleto: lead.endereco || '',
    tel: telLimpo,
    whatsapp,
    instagram: lead.instagram || '',
    avaliacao: lead.avaliacao || 0,
    totalAval: lead.totalAval || 0,
    reviews: lead.reviews || [],
    horarios: lead.horarios || '',
    horariosSemana: lead.horariosSemana || [],
    statusAgora: lead.statusAgora || { aberto: null, texto: '' },
    resumo: lead.resumo || '',
    mapa: lead.mapa || '#',
    mapaEmbed: lead.mapaEmbed || '',
    streetView: lead.streetView || ''
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

// Compatibilidade para evitar falhas no build da Vercel em rotas de consultório
export const servicosConsultorio = servicosBarbearia;

export function fotosPorCategoria(fotos: string[]) {
  if (!Array.isArray(fotos)) {
    return [];
  }
  
  const nomeArq = (u: string) => (u?.split('/').pop() || '').toLowerCase();
  const cat = (re: RegExp) => fotos.filter((u) => re.test(nomeArq(u)));

  return [
    { id: 'tudo', label: 'Tudo', fotos },
    { id: 'trabalhos', label: 'Trabalhos', fotos: cat(/^(trabalho|corte|penteado|servico|gusmao)/) },
  ];
}

export function diaHoje(): string {
  const dias = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  return dias[new Date().getDay()];
}

export function linhaDoDia(horariosSemana: string[], hoje: string): string {
  if (!Array.isArray(horariosSemana)) return '';
  const linha = horariosSemana.find(h => h.toLowerCase().startsWith(hoje));
  return linha || '';
}