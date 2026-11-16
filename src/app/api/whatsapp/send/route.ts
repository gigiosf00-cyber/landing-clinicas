import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Formato esperado do evento de mensagem recebida do seu bot/provedor de WhatsApp
    const telefoneCliente = body.telefone || body.from;
    const textoMensagem = (body.mensagem || body.text || '').trim();

    if (!telefoneCliente || !textoMensagem) {
      return NextResponse.json({ status: 'ignorado', motivo: 'Sem telefone ou texto' });
    }

    console.log(`📥 Mensagem recebida de ${telefoneCliente}: "${textoMensagem}"`);

    let respostaMapeada = '';

    // Mapeia o que o cliente digitou para os comandos que o Go entende
    if (textoMensagem === '1' || textoMensagem.toLowerCase().includes('sim')) {
      respostaMapeada = 'SIM_QUERO_VER';
    } else if (textoMensagem === '2' || textoMensagem.toLowerCase().includes('nao') || textoMensagem.toLowerCase().includes('não')) {
      respostaMapeada = 'NAO_OBRIGADO';
    }

    if (respostaMapeada) {
      // Limpa o número de telefone (remove DDI duplicado ou caracteres especiais)
      const telLimpo = telefoneCliente.toString().replace(/\D/g, '');

      // Envia o aviso para o servidor Go na porta 8083
      const webhookGoUrl = 'http://127.0.0.1:8083/api/webhook/resposta';
      
      await fetch(webhookGoUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telefone: telLimpo,
          resposta: respostaMapeada,
          subdominio: body.subdominio || '' // Passa o subdomínio para montar o link correto
        }),
      });

      console.log(`✅ Resposta "${respostaMapeada}" repassada com sucesso para o motor Go.`);
    }

    return NextResponse.json({ status: 'sucesso', processado: true });

  } catch (error: unknown) {
    const mensagem = error instanceof Error ? error.message : 'Erro ao processar webhook';
    console.error('❌ Erro no webhook de resposta:', error);
    return NextResponse.json({ status: 'erro', error: mensagem }, { status: 500 });
  }
}