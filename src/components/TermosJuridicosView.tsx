import React from 'react';
import { BookOpen, ShieldCheck, Scale, FileText, Clock, HelpCircle } from 'lucide-react';
import { TERMOS_JURIDICOS } from '../data/guideData';

export const TermosJuridicosView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Dicionário Jurídico da Cobrança</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Conceitos Jurídicos Individuais & Impactos Práticos
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Fundamentos essenciais para responder com autoridade, segurança jurídica e sem promessas indevidas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {TERMOS_JURIDICOS.map(termo => (
          <div
            key={termo.id}
            className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs hover:border-blue-200 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  {termo.numero}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {termo.titulo}
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                {termo.categoria}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {termo.conceito}
            </p>

            {termo.pontosImportantes && (
              <div className="mt-3.5 bg-slate-50 rounded-lg p-3 border border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Pontos Determinantes:
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {termo.pontosImportantes.map((ponto, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{ponto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-amber-900 bg-amber-50/60 p-3 rounded-lg border border-amber-200/50">
              <span className="font-bold shrink-0">⚠️ Impacto Prático no Cliente:</span>
              <span>{termo.impactoNoCliente}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
