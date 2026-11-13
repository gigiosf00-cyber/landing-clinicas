import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Validação de segurança do número recebido
    if (!payload || !payload.telefone) {
      return NextResponse.json(
        { status: 'erro', error: 'O número de telefone é obrigatório.' },
        { status: 400 }
      );
    }

    // Limpa pontuações/espaços e injeta o DDI 55 se o número tiver apenas DDD + telefone
    const apenasNumeros = payload.telefone.toString().replace(/\D/g, '');
    const telFormatado = (apenasNumeros.length === 10 || apenasNumeros.length === 11) 
      ? `55${apenasNumeros}` 
      : apenasNumeros;

    console.log('🤖 OpenMausBot registrou o disparo para:', telFormatado);

    return NextResponse.json({ 
      status: 'sucesso', 
      enviado: true, 
      destino: telFormatado,
      subdominio: payload.subdominio || payload.id || ''
    });

  } catch (error: unknown) {
    const mensagem = error instanceof Error ? error.message : 'Erro interno ao processar disparo';
    console.error('❌ Erro no disparo do WhatsApp:', error);
    
    return NextResponse.json({ status: 'erro', error: mensagem }, { status: 500 });
  }
}