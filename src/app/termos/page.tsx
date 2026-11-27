import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Termos de Serviço | Gef67 Ecommerce',
  description: 'Termos e Condições de Uso da Plataforma Gef67 Ecommerce e dos sites parceiros.',
};

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans px-6 py-12 md:py-20">
      <div className="max-w-3xl mx-auto bg-white border border-stone-200 rounded-2xl p-6 md:p-10 shadow-sm">
        <header className="border-b border-stone-200 pb-6 mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Gef67 Ecommerce
          </span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 mt-1">
            Termos de Serviço
          </h1>
          <p className="text-xs text-stone-500 mt-2">
            Última atualização: Novembro de 2026
          </p>
        </header>

        <article className="space-y-6 text-sm text-stone-700 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-stone-900 mb-2">1. Objeto e Âmbito</h2>
            <p>
              Os presentes Termos de Serviço regem o acesso e utilização da plataforma <strong>Gef67 Ecommerce</strong> e de todas as páginas e sites institucionais desenvolvidos para estabelecimentos comerciais parceiros. Ao navegar nesta página ou utilizar os serviços prestados, o utilizador concorda com as condições descritas neste documento.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-stone-900 mb-2">2. Modelo Sem Mensalidade e Manutenção</h2>
            <p>
              Os sites fornecidos no modelo sem mensalidade não incluem serviços de manutenção contínua, alterações periódicas gratuitas ou gestão de conteúdo inclusas após a entrega inicial.
            </p>
            <p className="mt-2">
              O proprietário do estabelecimento possui autonomia para realizar atualizações cadastrais pontuais (como imagem de capa inicial, foto da sede, telefone de contacto, endereço e horário de funcionamento) através das ferramentas de edição rápida embutidas. Alterações solicitadas à equipa da Gef67 Ecommerce após a entrega estão sujeitas à cobrança de taxa de serviço complementar avulsa.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-stone-900 mb-2">3. Responsabilidade pelo Conteúdo e Ofertas</h2>
            <p>
              O estabelecimento comercial titular da página é o único responsável pela exatidão das informações prestadas, preços exibidos, horários de atendimento, disponibilidade de produtos/serviços, bem como pela legitimidade das imagens e marcas fornecidas. A Gef67 Ecommerce atua estritamente como desenvolvedora da infraestrutura tecnológica da página.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-stone-900 mb-2">4. Emissão de Nota Fiscal (NFSe)</h2>
            <p>
              A Gef67 Ecommerce emite a competente Nota Fiscal Eletrónica de Serviços (NFSe) correspondente ao valor contratado do projeto de desenvolvimento do site, enviada após a confirmação do pagamento e validação dos dados cadastrais.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-stone-900 mb-2">5. Direitos de Propriedade Intelectual</h2>
            <p>
              A estrutura da plataforma, código-fonte e elementos visuais proprietários pertencem à Gef67 Ecommerce. As marcas, logótipos e imagens públicas do estabelecimento parceiro permanecem sob a propriedade legal de seus respetivos titulares.
            </p>
          </section>
        </article>

        <footer className="mt-10 pt-6 border-t border-stone-200 flex flex-wrap justify-between items-center text-xs text-stone-500 gap-4">
          <p>© Gef67 Ecommerce. Todos os direitos reservados.</p>
          <Link href="/privacidade" className="text-emerald-700 font-medium underline hover:text-emerald-800">
            Ver Política de Privacidade →
          </Link>
        </footer>
      </div>
    </main>
  );
}