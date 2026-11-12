import React from 'react';
import { ShieldAlert, AlertTriangle, Scale, CheckCircle } from 'lucide-react';
import { MONITORIA_DATA } from '../data/guideData';

export const MonitoriaView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
          <Scale className="w-4 h-4" />
          <span>Matriz de Qualidade & Monitoria Operacional</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Critérios de Pontuação e Regras de Não Conformidade
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Cobrança Administrativa · Atendimento por Voz e WhatsApp oficial da Bulgarelli Advogados & GM Financial.
        </p>
      </div>

      {MONITORIA_DATA.map(block => (
        <div
          key={block.id}
          className={`bg-white border rounded-xl overflow-hidden shadow-xs transition-shadow ${
            block.isNCG
              ? 'border-red-300 ring-1 ring-red-200'
              : 'border-slate-200'
          }`}
        >
          <div
            className={`p-4 sm:px-6 flex items-center justify-between border-b ${
              block.isNCG
                ? 'bg-red-50/80 border-red-200'
                : 'bg-slate-50/80 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                {block.isNCG ? (
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                )}
                <h3
                  className={`text-sm sm:text-base font-bold ${
                    block.isNCG ? 'text-red-950' : 'text-slate-900'
                  }`}
                >
                  {block.titulo}
                </h3>
              </div>
              <p
                className={`text-xs mt-0.5 ${
                  block.isNCG ? 'text-red-700' : 'text-slate-500'
                }`}
              >
                {block.subtitulo}
              </p>
            </div>
            {block.isNCG && (
              <span className="text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md bg-red-600 text-white shadow-xs">
                Falha Crítica (Zera)
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-4 w-28">Peso</th>
                  <th className="py-2.5 px-4 w-60">Item Avaliado</th>
                  <th className="py-2.5 px-4">Considerar Não Conforme Quando</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {block.rows.map((row, idx) => {
                  const isNCG = row.pesoTipo === 'ncg';
                  const isHigh = row.pesoTipo === 'high';
                  const isMid = row.pesoTipo === 'mid';

                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isNCG ? 'bg-red-50/30' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-bold align-top">
                        {isNCG ? (
                          <span className="inline-block px-2 py-0.5 rounded font-mono font-extrabold text-[11px] bg-red-700 text-white">
                            NCG (0)
                          </span>
                        ) : isHigh ? (
                          <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-red-100 text-red-800">
                            Peso {row.peso}
                          </span>
                        ) : isMid ? (
                          <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-amber-100 text-amber-800">
                            Peso {row.peso}
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-slate-100 text-slate-700">
                            Peso {row.peso}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 align-top font-bold text-slate-800">
                        {row.item}
                      </td>
                      <td className="py-3 px-4 align-top text-slate-600 leading-relaxed">
                        {row.criterio}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};
