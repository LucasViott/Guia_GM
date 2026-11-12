import React from 'react';
import { Search, X, ArrowRight, Tag, BookOpen, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { OBJECTIONS_CATALOG, TERMOS_JURIDICOS, TABULACOES_DATA, MONITORIA_DATA, DICAS_ARGUMENTACAO } from '../data/guideData';

interface SearchResultsViewProps {
  query: string;
  onClear: () => void;
  onNavigateToStage?: (stageId: number) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  query,
  onClear
}) => {
  const q = query.toLowerCase().trim();

  // Search in Dicas de Argumentação
  const matchedDicas = DICAS_ARGUMENTACAO.filter(
    d =>
      d.titulo.toLowerCase().includes(q) ||
      d.subtitulo.toLowerCase().includes(q) ||
      d.comoAplicar.toLowerCase().includes(q) ||
      d.beneficioOperacional.toLowerCase().includes(q) ||
      d.tags.some(t => t.toLowerCase().includes(q))
  );

  // Search in Objections
  const matchedObjections = OBJECTIONS_CATALOG.filter(
    obj =>
      obj.title.toLowerCase().includes(q) ||
      obj.summary.toLowerCase().includes(q) ||
      obj.speech.toLowerCase().includes(q) ||
      obj.tags.some(t => t.toLowerCase().includes(q))
  );

  // Search in Termos Juridicos
  const matchedTermos = TERMOS_JURIDICOS.filter(
    t =>
      t.titulo.toLowerCase().includes(q) ||
      t.conceito.toLowerCase().includes(q) ||
      t.impactoNoCliente.toLowerCase().includes(q) ||
      t.categoria.toLowerCase().includes(q)
  );

  // Search in Tabulações
  const matchedTabulacoes = TABULACOES_DATA.filter(
    tab =>
      tab.codigo.toLowerCase().includes(q) ||
      tab.nome.toLowerCase().includes(q) ||
      tab.quandoUsar.toLowerCase().includes(q) ||
      tab.restricoes.toLowerCase().includes(q)
  );

  // Search in Monitoria
  const matchedMonitoria: { bloco: string; row: any }[] = [];
  MONITORIA_DATA.forEach(bloco => {
    bloco.rows.forEach(r => {
      if (
        r.item.toLowerCase().includes(q) ||
        r.criterio.toLowerCase().includes(q)
      ) {
        matchedMonitoria.push({ bloco: bloco.titulo, row: r });
      }
    });
  });

  const totalMatches =
    matchedDicas.length +
    matchedObjections.length +
    matchedTermos.length +
    matchedTabulacoes.length +
    matchedMonitoria.length;

  const highlightText = (text: string) => {
    if (!q) return text;
    const parts = text.split(new RegExp(`(${q})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === q ? (
        <mark key={i} className="bg-amber-200 text-slate-900 px-0.5 rounded font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Resultados da Pesquisa por: "{query}"
            </h2>
            <p className="text-xs text-slate-500">
              {totalMatches} resultado(s) encontrado(s) em toda a base operacional
            </p>
          </div>
        </div>
        <button
          onClick={onClear}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
          <span>Limpar Busca</span>
        </button>
      </div>

      {totalMatches === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-500 text-xs sm:text-sm">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          Nenhum resultado encontrado para "<strong>{query}</strong>". Tente termos como: <em>Antifraude, Ajuizamento, Desconto progressivo, 508, Renajud, Quita+, MetLife, Falecido</em>.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Dicas de Argumentação */}
          {matchedDicas.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                <Tag className="w-3.5 h-3.5" />
                <span>Dicas de Argumentação ({matchedDicas.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {matchedDicas.map(dica => (
                  <div
                    key={dica.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                        {dica.categoria === 'gatilhos' ? 'Gatilho Mental' : 'Venda Calculada'}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {highlightText(dica.titulo)}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">
                      <strong>Como Aplicar:</strong> {highlightText(dica.comoAplicar)}
                    </p>
                    <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-100">
                      <strong>Benefício:</strong> {highlightText(dica.beneficioOperacional)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Objeções e Roteiros */}
          {matchedObjections.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                <FileText className="w-3.5 h-3.5" />
                <span>Roteiros & Quebra de Objeções ({matchedObjections.length})</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {matchedObjections.map(obj => (
                  <div
                    key={obj.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                        {obj.group === 'propostas' ? 'Proposta de Negociação' : 'Reclamação do Cliente'}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {highlightText(obj.title)}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                      {highlightText(obj.summary)}
                    </p>
                    <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-lg text-xs text-blue-950 font-normal">
                      "{highlightText(obj.speech)}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Termos Jurídicos */}
          {matchedTermos.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Termos Jurídicos Encontrados ({matchedTermos.length})</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {matchedTermos.map(termo => (
                  <div
                    key={termo.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {termo.categoria}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {highlightText(termo.titulo)}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {highlightText(termo.conceito)}
                    </p>
                    <div className="mt-2 text-xs text-amber-900 bg-amber-50 p-2 rounded border border-amber-200/50">
                      <strong>Impacto no Cliente:</strong> {highlightText(termo.impactoNoCliente)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tabulações */}
          {matchedTabulacoes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                <Tag className="w-3.5 h-3.5" />
                <span>Códigos de Tabulação ({matchedTabulacoes.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {matchedTabulacoes.map(tab => (
                  <div
                    key={tab.codigo}
                    className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono font-bold text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        Código {highlightText(tab.codigo)}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">
                        {highlightText(tab.nome)}
                      </h4>
                    </div>
                    {tab.observacao && (
                      <p className="text-xs text-blue-900 bg-blue-50/70 p-1.5 rounded mb-1.5">
                        <strong>Obs:</strong> {highlightText(tab.observacao)}
                      </p>
                    )}
                    <div className="text-xs text-slate-600">
                      <strong>Quando Usar:</strong> {highlightText(tab.quandoUsar)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monitoria */}
          {matchedMonitoria.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Critérios de Monitoria & Qualidade ({matchedMonitoria.length})</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="py-2.5 px-4 w-24">Peso</th>
                      <th className="py-2.5 px-4 w-52">Item</th>
                      <th className="py-2.5 px-4">Critério</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {matchedMonitoria.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold font-mono">
                          {m.row.peso === 'NCG' ? (
                            <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[10px]">
                              NCG
                            </span>
                          ) : (
                            `Peso ${m.row.peso}`
                          )}
                        </td>
                        <td className="py-2.5 px-4 font-semibold text-slate-800">
                          {highlightText(m.row.item)}
                        </td>
                        <td className="py-2.5 px-4 text-slate-600">
                          {highlightText(m.row.criterio)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
