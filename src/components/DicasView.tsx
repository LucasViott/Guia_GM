import React, { useState } from 'react';
import {
  BrainCircuit,
  Calculator,
  Compass,
  Lightbulb,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Target,
  Shield,
  Layers,
  Zap,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { DICAS_ARGUMENTACAO } from '../data/guideData';

export const DicasView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'gatilhos' | 'venda_calculada' | 'linguagem_persuasiva'>('todos');

  const gatilhos = DICAS_ARGUMENTACAO.filter(d => d.categoria === 'gatilhos');
  const vendaCalculada = DICAS_ARGUMENTACAO.filter(d => d.categoria === 'venda_calculada');
  const linguagemPersuasiva = DICAS_ARGUMENTACAO.filter(d => d.categoria === 'linguagem_persuasiva');

  return (
    <div className="space-y-6">
      {/* Header da Aba */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
          <BrainCircuit className="w-4 h-4" />
          <span>Inteligência de Negociação & Persuasão</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Dicas de Argumentação, Gatilhos Mentais & Venda Calculada
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Metodologia completa aplicada para contornar objeções com firmeza, despertar urgência real, estruturar propostas viáveis e desarmar atritos verbais.
        </p>

        {/* Filtros rápidos */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-600 mr-1">Filtrar Seções:</span>
          <button
            onClick={() => setActiveFilter('todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'todos'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todos os Campos ({DICAS_ARGUMENTACAO.length})
          </button>
          <button
            onClick={() => setActiveFilter('gatilhos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'gatilhos'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ⚡ 1. Gatilhos Mentais na Negociação ({gatilhos.length})
          </button>
          <button
            onClick={() => setActiveFilter('venda_calculada')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'venda_calculada'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📊 2. Técnica da Venda Calculada ({vendaCalculada.length})
          </button>
          <button
            onClick={() => setActiveFilter('linguagem_persuasiva')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'linguagem_persuasiva'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🗣️ 3. Técnicas Avançadas de Comunicação ({linguagemPersuasiva.length})
          </button>
        </div>
      </div>

      {/* SEÇÃO 1: APLICAÇÃO DE GATILHOS MENTAIS NA NEGOCIAÇÃO */}
      {(activeFilter === 'todos' || activeFilter === 'gatilhos') && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50/80 via-white to-slate-50 border border-blue-200/80 rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wide">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Seção 1 · Aplicação de Gatilhos Mentais na Negociação</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Direcionando a Decisão do Financiado e Reduzindo a Procrastinação
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Os gatilhos mentais direcionam a tomada de decisão do cliente, reduzindo a procrastinação e quebrando objeções de forma ética e amparada pelo contrato:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gatilhos.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        1.{idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {item.titulo}
                      </h4>
                    </div>
                  </div>

                  <p className="text-[11px] font-semibold text-slate-500 mb-2">
                    {item.subtitulo}
                  </p>

                  {/* Campo Como Aplicar */}
                  <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100/80 text-xs text-blue-950 leading-relaxed mb-3">
                    <strong className="text-blue-900 block mb-1">Como Aplicar:</strong>
                    {item.comoAplicar}
                  </div>

                  {/* Exemplos Práticos */}
                  {item.exemplosPraticos && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 mb-3 space-y-1.5">
                      <strong className="text-slate-800 text-[11px] uppercase tracking-wider block">
                        Conduta no Diálogo:
                      </strong>
                      <ul className="space-y-1">
                        {item.exemplosPraticos.map((ex, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                            <span className="text-blue-600 font-bold shrink-0">•</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Benefício Operacional */}
                <div className="pt-2.5 border-t border-slate-100 flex items-start gap-2 text-xs text-emerald-900 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Impacto na Chamada: </span>
                    <span>{item.beneficioOperacional}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEÇÃO 2: TÉCNICA DA VENDA CALCULADA (NEGOCIAÇÃO ESTRUTURADA) */}
      {(activeFilter === 'todos' || activeFilter === 'venda_calculada') && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-amber-50/80 via-white to-slate-50 border border-amber-200/80 rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wide">
              <Calculator className="w-4 h-4 text-amber-600" />
              <span>Seção 2 · Técnica da Venda Calculada (Negociação Estruturada)</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Recuperação de Crédito como Entrega Orientada de Solução Financeira
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              A "venda calculada" consiste em conduzir a recuperação do crédito não como uma simples cobrança coercitiva, mas como a entrega orientada de uma solução financeira viável:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vendaCalculada.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                        2.{idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {item.titulo}
                      </h4>
                    </div>
                  </div>

                  <p className="text-[11px] font-semibold text-slate-500 mb-2">
                    {item.subtitulo}
                  </p>

                  {/* Campo Como Aplicar */}
                  <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/60 text-xs text-amber-950 leading-relaxed mb-3">
                    <strong className="text-amber-900 block mb-1">Como Aplicar:</strong>
                    {item.comoAplicar}
                  </div>

                  {/* Exemplos Práticos */}
                  {item.exemplosPraticos && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 mb-3 space-y-1.5">
                      <strong className="text-slate-800 text-[11px] uppercase tracking-wider block">
                        Passo a Passo Operacional:
                      </strong>
                      <ul className="space-y-1">
                        {item.exemplosPraticos.map((ex, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                            <span className="text-amber-600 font-bold shrink-0">•</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Benefício Operacional */}
                <div className="pt-2.5 border-t border-slate-100 flex items-start gap-2 text-xs text-emerald-900 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Efetividade: </span>
                    <span>{item.beneficioOperacional}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEÇÃO 3: TÉCNICAS COMPLEMENTARES DE COMUNICAÇÃO PERSUASIVA */}
      {(activeFilter === 'todos' || activeFilter === 'linguagem_persuasiva') && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-emerald-50/80 via-white to-slate-50 border border-emerald-200/80 rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Seção 3 · Técnicas Avançadas de Comunicação Persuasiva & Desarme</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Ancoragem Numérica, Rotulagem de Emoções e Perguntas Calibradas
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Ferramentas de psicologia comportamental e negociação de alta tensão para conduzir a conversa com assertividade e sem atritos:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {linguagemPersuasiva.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                        3.{idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {item.titulo}
                      </h4>
                    </div>
                  </div>

                  <p className="text-[11px] font-semibold text-slate-500 mb-2">
                    {item.subtitulo}
                  </p>

                  {/* Campo Como Aplicar */}
                  <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200/60 text-xs text-emerald-950 leading-relaxed mb-3">
                    <strong className="text-emerald-900 block mb-1">Como Aplicar:</strong>
                    {item.comoAplicar}
                  </div>

                  {/* Exemplos Práticos */}
                  {item.exemplosPraticos && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 mb-3 space-y-1.5">
                      <strong className="text-slate-800 text-[11px] uppercase tracking-wider block">
                        Exemplo de Fraseamento:
                      </strong>
                      <ul className="space-y-1">
                        {item.exemplosPraticos.map((ex, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                            <span className="text-emerald-600 font-bold shrink-0">•</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Benefício Operacional */}
                <div className="pt-2.5 border-t border-slate-100 flex items-start gap-2 text-xs text-emerald-900 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Resultado na Operação: </span>
                    <span>{item.beneficioOperacional}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compreendendo Seus 3 Indicadores Operacionais */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          <span>Compreendendo Seus 3 Grandes Indicadores da Operação</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="font-bold text-blue-800 text-sm block mb-1">1. Contato Positivo (CP)</span>
            <p className="text-slate-600 leading-relaxed">
              Ocorre quando localizamos o titular ou o terceiro responsável legal e realizamos com sucesso a confirmação positiva (6 dígitos do CPF + pergunta de segurança).
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="font-bold text-blue-800 text-sm block mb-1">2. Taxa de Conversão</span>
            <p className="text-slate-600 leading-relaxed">
              Mede a quantidade de promessas firmadas dividida pelo total de contatos com o cliente. Se a taxa está baixa, a sondagem ou a quebra de objeções precisam de ajuste.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="font-bold text-blue-800 text-sm block mb-1">3. Efetividade (Boleto Pago)</span>
            <p className="text-slate-600 leading-relaxed">
              Percentual de promessas que efetivamente foram liquidadas na data. Alinhar datas compatíveis com o recebimento do cliente aumenta a efetividade real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
