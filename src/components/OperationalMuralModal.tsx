import React from 'react';
import { X, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

interface OperationalMuralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickSearch: (term: string) => void;
}

export const OperationalMuralModal: React.FC<OperationalMuralModalProps> = ({
  isOpen,
  onClose,
  onQuickSearch
}) => {
  if (!isOpen) return null;

  const quickTerms = [
    { label: 'Antifraude (34191)', query: 'Antifraude' },
    { label: 'CAMEC Conciliação', query: 'CAMEC' },
    { label: 'Ajuizamento & Prazos', query: 'Ajuizamento' },
    { label: 'Desconto Progressivo', query: 'Desconto progressivo' },
    { label: 'Não Acordo (Sanções)', query: 'Não acordo' },
    { label: '508 Queda (NCG)', query: '508' },
    { label: 'Quita+ (Cartão 21x)', query: 'Quita+' },
    { label: 'Bloqueio Renajud', query: 'Renajud' },
    { label: 'Cliente Falecido', query: 'Falecido' },
    { label: 'MetLife Seguro', query: 'MetLife' },
    { label: 'Mês Invertido', query: 'Mês Invertido' },
    { label: 'Devolução Amigável', query: 'Devolução' },
    { label: 'Confirmação Positiva', query: 'Confirmação positiva' }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-7 relative text-slate-900">
        <div className="flex items-start justify-between pb-4 mb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📢</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-blue-900 tracking-tight">
                Mural Operacional & Diretrizes Críticas
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              GM Financial & Bulgarelli Advogados · Atualização Contínua da Operação
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            title="Fechar mural (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Atalhos Rápidos */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Atalhos Rápidos de Consulta Direta</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickTerms.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onQuickSearch(item.query);
                  onClose();
                }}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 hover:border-blue-200 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Destaques Operacionais */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Orientações de Conformidade & Monitoria</span>
          </div>

          <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
            <div>
              <strong className="text-blue-900">1. Confirmação Positiva Inegociável (NCG):</strong>{' '}
              Exija sempre os 6 primeiros dígitos do CPF/CNPJ + 1 pergunta de segurança (modelo, ano ou últimos 2 da placa). Omitir zera a nota da chamada (0 pts).
            </div>
            <div>
              <strong className="text-blue-900">2. Roteiro Antifraude Completo:</strong>{' '}
              Sempre repasse código bancário inicial <strong>34191</strong>, Banco Itaú/GM e o aviso categórico de que <strong>NÃO recebemos via Pix ou TED</strong>.
            </div>
            <div>
              <strong className="text-blue-900">3. Comunicação das Sanções no Insucesso:</strong>{' '}
              Mesmo quando o cliente recusar todas as propostas, a leitura das sanções (juros 0,433% ao dia, Serasa e ajuizamento/busca e apreensão) é obrigatória (-11 pts se omitir).
            </div>
            <div>
              <strong className="text-blue-900">4. Desconto Progressivo:</strong>{' '}
              Nunca forneça a condição máxima na abertura. Exija uma contrapartida de data do cliente antes de aplicar alçada.
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
        >
          Entendido, Iniciar Atendimento
        </button>
      </div>
    </div>
  );
};
