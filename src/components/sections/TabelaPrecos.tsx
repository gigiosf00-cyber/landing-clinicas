import React from 'react';
import { Tag } from 'lucide-react';

export interface ItemPreco {
  titulo: string;
  preco: string;
  descricao?: string;
}

export default function TabelaPrecos({
  precos,
  tema
}: {
  precos?: ItemPreco[];
  tema: {
    card: string;
    borda: string;
    texto: string;
    sub: string;
    destaque: string;
  };
}) {
  // Renderização condicional limpa: se não houver dados de preço, não exibe nada
  if (!precos || !Array.isArray(precos) || precos.length === 0) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-10 border-t border-white/10">
      <h2 className={`text-xl font-bold tracking-tight mb-6 flex items-center gap-2 ${tema.sub}`}>
        <Tag className="w-5 h-5" />
        Tabela de Valores & Serviços
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {precos.map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border shadow-md flex justify-between items-center ${tema.card} ${tema.borda}`}
          >
            <div>
              <h3 className={`font-bold text-sm ${tema.texto}`}>{item.titulo}</h3>
              {item.descricao && (
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.descricao}</p>
              )}
            </div>
            <span className={`font-black text-base ml-4 ${tema.sub}`}>
              {item.preco}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}