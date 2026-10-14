import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Caminho do arquivo onde o Go grava os dados do lead
    const filePath = path.join(process.cwd(), 'src', 'data', 'active_lead.json');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Nenhum lead ativo encontrado' }, { status: 404 });
    }

    const fileData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileData);
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao ler active_lead.json' }, { status: 500 });
  }
}