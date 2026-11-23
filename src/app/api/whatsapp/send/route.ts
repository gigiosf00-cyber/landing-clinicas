import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Formato esperado do evento de mensagem recebida do WhatsApp
    const telefoneCliente = body.telefone || body.from;
    const textoMensagem = (body.mensagem || body.text || body.body || '').trim();

    if (!telefoneCliente || !textoMensagem) {
      return NextResponse.json({ status: 'ignorado', motivo: 'Sem telefone ou texto' });
    }

    console.log(`📥 Mensagem recebida de ${telefoneCliente}: "${textoMensagem}"`);

    let respostaMapeada = '';

    // Mapeia as opções digitadas pelo cliente para os comandos do motor Go
    if (textoMensagem === '1' || textoMensagem.toLowerCase().includes('sim')) {
      respostaMapeada = 'SIM_QUERO_VER';
    } else if (textoMensagem === '2' || textoMensagem.toLowerCase().includes('nao') || textoMensagem.toLowerCase().includes('não')) {
      respostaMapeada = 'NAO_OBRIGADO';
    } else if (textoMensagem === '9' || textoMensagem.toLowerCase().includes('duvida') || textoMensagem.toLowerCase().includes('dúvida')) {
      respostaMapeada = 'CONVERSAR';
    } else {
      respostaMapeada = textoMensagem; // Trata perguntas e textos livres
    }

    // Limpa o número de telefone
    const telLimpo = telefoneCliente.toString().replace(/\D/g, '');

    // Envia a instrução para o servidor Go na porta 8083
    const webhookGoUrl = 'http://127.0.0.1:8083/api/webhook/resposta';
    
    const resGo = await fetch(webhookGoUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telefone: telLimpo,
        resposta: respostaMapeada,
        subdominio: body.subdominio || '' // Se vier vazio, o Go localiza na memória pelo telefone
      }),
    });

    const dataGo = await resGo.json();
    console.log(`✅ Resposta "${respostaMapeada}" enviada ao Go:`, dataGo);

    return NextResponse.json({ status: 'sucesso', processado: true, respostaMapeada });

  } catch (error: unknown) {
    const mensagem = error instanceof Error ? error.message : 'Erro ao processar webhook';
    console.error('❌ Erro no webhook de resposta:', error);
    return NextResponse.json({ status: 'erro', error: mensagem }, { status: 500 });
  }
}