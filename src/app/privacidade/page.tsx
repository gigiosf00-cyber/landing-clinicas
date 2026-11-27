import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade | Gef67 Ecommerce',
  description: 'Política de Privacidade e Proteção de Dados da Plataforma Gef67 Ecommerce.',
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans px-6 py-12 md:py-20">
      <div className="max-w-3xl mx-auto bg-white border border-stone-200 rounded-2xl p-6 md:p-10 shadow-sm">
        <header className="border-b border-stone-200 pb-6 mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Gef67 Ecommerce
          </span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 mt-1">
            Política de Privacidade
          </h1>
          <p className="text-xs text-stone-500 mt-2">
            Última atualização: Novembro de 2026 (Em conformidade com a LGPD)
          </p>
        </header>

        <article className="space-y-6 text-sm text-stone-700 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-stone-900 mb-2">1. Compromisso com a Privacidade</h2>
            <p>
              A <strong>Gef67 Ecommerce</strong> valoriza a transparência e o respeito à privacidade dos utilizadores e clientes. Esta política explica como as informações são tratadas nas nossas páginas e nos sites desenvolvidos para estabelecimentos comerciais parceiros.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-stone-900 mb-2">2. Coleta e Tratamento de Dados</h2>
            <p>
              Os sites de clientes exibem informações de caráter essencialmente comercial e público (nome do estabelecimento, endereço, número de telefone/WhatsApp, horários de funcionamento e fotografias públicas ou cedidas pelo proprietário).
            </p>
            <p className="mt-2">
              Não realizamos a recolha ou armazenamento de dados pessoais sensíveis dos visitantes da página. Quaisquer contactos iniciados pelos utilizadores são direcionados diretamente para os canais oficiais do estabelecimento (como WhatsApp ou telefone).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-stone-900 mb-2">3. Dados Fiscais e Faturamento</h2>
            <p>
              Para a efetivação da prestação de serviços e cumprimento de obrigações legais e tributárias, os dados cadastrais da empresa contratante (CNPJ/CPF, Razão Social, Endereço e E-mail) são processados exclusivamente para a emissão da <strong>Nota Fiscal Eletrónica de Serviços (NFSe)</strong> e liquidação do pagamento.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-stone-900 mb-2">4. Direitos de Imagem e Alteração de Conteúdo</h2>
            <p>
              Caso o representante legal de qualquer estabelecimento comercial deseje solicitar a atualização, correção ou remoção de fotos, endereço ou dados exibidos na sua página, poderá contactar diretamente o suporte da Gef67 Ecommerce para o imediato atendimento.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-stone-900 mb-2">5. Cookies e Tecnologias de Navegação</h2>
            <p>
              Nossas páginas podem utilizar apenas cookies estritamente necessários para otimizar a velocidade de carregamento, responsividade no telemóvel/computador e a experiência geral de navegação do utilizador.
            </p>
          </section>
        </article>

        <footer className="mt-10 pt-6 border-t border-stone-200 flex flex-wrap justify-between items-center text-xs text-stone-500 gap-4">
          <p>© Gef67 Ecommerce. Todos os direitos reservados.</p>
          <Link href="/termos" className="text-emerald-700 font-medium underline hover:text-emerald-800">
            Ver Termos de Serviço →
          </Link>
        </footer>
      </div>
    </main>
  );
}