import { NextResponse } from 'next/server';
import { promises as fs, existsSync } from 'fs';
import path from 'path';

// Desativa o cache do Next.js para que a interface leia sempre o lead atualizado
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'active_lead.json');

    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'Nenhum lead ativo encontrado' }, { status: 404 });
    }

    const fileData = await fs.readFile(filePath, 'utf-8');

    if (!fileData.trim()) {
      return NextResponse.json({ error: 'Arquivo active_lead.json temporariamente vazio' }, { status: 404 });
    }

    const data = JSON.parse(fileData);

    // Função auxiliar para formatar telefone com DDI 55
    const formatarDDI = (tel: string | number) => {
      const apenasNumeros = tel.toString().replace(/\D/g, '');
      if (!apenasNumeros) return tel;
      return (apenasNumeros.length === 10 || apenasNumeros.length === 11) 
        ? `55${apenasNumeros}` 
        : apenasNumeros;
    };

    // Formata o telefone na raiz ou dentro de data.lead (gerado pelo Go)
    if (data) {
      if (data.telefone) {
        data.telefone = formatarDDI(data.telefone);
      }
      if (data.lead && data.lead.telefone) {
        data.lead.telefone = formatarDDI(data.lead.telefone);
      }
    }

    return NextResponse.json(data);

  } catch (error: unknown) {
    console.error('❌ Erro ao ler active_lead.json:', error);
    return NextResponse.json({ error: 'Erro ao ler active_lead.json' }, { status: 500 });
  }
}