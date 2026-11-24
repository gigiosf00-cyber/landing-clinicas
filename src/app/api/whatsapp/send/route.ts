import { NextResponse } from 'next/server';

type WhatsAppClientLike = {
  sendMessage?: (chatId: string, content: string) => Promise<unknown>;
};

const globalForWhatsApp = globalThis as typeof globalThis & {
  whatsappClient?: WhatsAppClientLike;
};

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown> = {};

    try {
      const parsed = await request.json();
      if (parsed && typeof parsed === 'object') {
        body = parsed as Record<string, unknown>;
      }
    } catch {
      const rawText = await request.text();
      if (!rawText || !rawText.trim()) {
        return NextResponse.json(
          { status: 'erro', error: 'Corpo da requisição vazio no envio' },
          { status: 400 }
        );
      }
      body = JSON.parse(rawText) as Record<string, unknown>;
    }

    const numeroRaw =
      body.telefone ?? body.number ?? body.to ?? body.chatId ?? '';
    const textoRaw =
      body.conteudo ?? body.text ?? body.mensagem ?? body.body ?? '';

    const numeroStr = String(numeroRaw).trim();
    const mensagemTexto = String(textoRaw).trim();

    if (!numeroStr || !mensagemTexto) {
      return NextResponse.json(
        { status: 'erro', error: 'Telefone e conteúdo são obrigatórios' },
        { status: 400 }
      );
    }

    const telLimpo = numeroStr.replace(/\D/g, '');
    if (!telLimpo) {
      return NextResponse.json(
        { status: 'erro', error: 'Número de telefone inválido' },
        { status: 400 }
      );
    }

    const chatId = numeroStr.includes('@') ? numeroStr : `${telLimpo}@c.us`;
    const client = globalForWhatsApp.whatsappClient;

    console.log(`🚀 [SEND] Solicitação para ${chatId}`);

    if (client && typeof client.sendMessage === 'function') {
      await client.sendMessage(chatId, mensagemTexto);
      console.log(`✅ [SEND] Mensagem enviada com sucesso para ${chatId}`);
      return NextResponse.json({
        status: 'sucesso',
        enviado: true,
        destino: chatId,
      });
    }

    const botSendUrl =
      process.env.WHATSAPP_BOT_SEND_URL ||
      'http://127.0.0.1:3001/api/whatsapp/send';

    try {
      const resBot = await fetch(botSendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telefone: telLimpo,
          number: chatId,
          conteudo: mensagemTexto,
          text: mensagemTexto,
        }),
      });

      if (resBot.ok) {
        const dataBot = await resBot.text();
        console.log(`✅ [SEND] Encaminhado para o bot (${botSendUrl}):`, dataBot);
        return NextResponse.json({
          status: 'sucesso',
          enviado: true,
          destino: chatId,
          via: botSendUrl,
        });
      }

      const erroBotTexto = await resBot.text();
      console.error(
        `❌ [SEND] Bot respondeu HTTP ${resBot.status} em ${botSendUrl}: ${erroBotTexto}`
      );
    } catch (fetchErr: unknown) {
      const msgFetch =
        fetchErr instanceof Error ? fetchErr.message : 'Falha de ligação ao bot';
      console.error(
        `❌ [SEND] Sem ligação ao serviço do bot em ${botSendUrl}: ${msgFetch}`
      );
    }

    return NextResponse.json(
      {
        status: 'erro',
        error: 'Cliente WhatsApp desconectado ou não inicializado na memória',
      },
      { status: 500 }
    );
  } catch (error: unknown) {
    const msgErro =
      error instanceof Error ? error.message : 'Erro interno ao enviar mensagem';
    console.error('❌ [SEND] Falha na rota /api/whatsapp/send:', msgErro);
    return NextResponse.json(
      { status: 'erro', error: msgErro },
      { status: 500 }
    );
  }
}