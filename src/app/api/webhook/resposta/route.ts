import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    let body;
    const textData = await request.text();

    if (!textData || !textData.trim()) {
      return NextResponse.json({ status: 'erro', error: 'Corpo da requisição vazio' }, { status: 400 });
    }

    try {
      body = JSON.parse(textData);
    } catch {
      return NextResponse.json({ status: 'erro', error: 'JSON malformado' }, { status: 400 });
    }

    const telefoneCliente = body.telefone || body.from || body.sender;
    const textoMensagem = (body.mensagem || body.text || body.body || '').toString().trim();

    if (!telefoneCliente || !textoMensagem) {
      return NextResponse.json({ status: 'ignorado', motivo: 'Sem telefone ou texto' });
    }

    console.log(`📥 Mensagem recebida no WhatsApp de ${telefoneCliente}: "${textoMensagem}"`);

    let respostaMapeada = '';

    if (textoMensagem === '1' || textoMensagem.toLowerCase().includes('sim')) {
      respostaMapeada = 'SIM_QUERO_VER';
    } else if (textoMensagem === '2' || textoMensagem.toLowerCase().includes('nao') || textoMensagem.toLowerCase().includes('não')) {
      respostaMapeada = 'NAO_OBRIGADO';
    } else if (textoMensagem === '9' || textoMensagem.toLowerCase().includes('duvida') || textoMensagem.toLowerCase().includes('dúvida')) {
      respostaMapeada = 'CONVERSAR';
    } else {
      respostaMapeada = textoMensagem;
    }

    const telLimpo = telefoneCliente.toString().replace(/\D/g, '');
    const webhookGoUrl = 'http://127.0.0.1:8083/api/webhook/resposta';

    const resGo = await fetch(webhookGoUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telefone: telLimpo,
        resposta: respostaMapeada,
        subdominio: body.subdominio || ''
      }),
    });

    const dataGo = await resGo.json();
    console.log(`✅ Resposta "${respostaMapeada}" repassada ao servidor Go com sucesso:`, dataGo);

    return NextResponse.json({ status: 'sucesso', processado: true, respostaMapeada, retornoGo: dataGo });

  } catch (error: unknown) {
    const mensagem = error instanceof Error ? error.message : 'Erro no processamento do webhook';
    console.error('❌ Erro no webhook de resposta:', error);
    return NextResponse.json({ status: 'erro', error: mensagem }, { status: 500 });
  }
}