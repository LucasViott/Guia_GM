import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Square,
  X,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Percent
} from 'lucide-react';

export interface ChecklistItem {
  id: string;
  etapa: '1. Abertura' | '2. Débito' | '3. Negociação' | '4. Fechamento';
  texto: string;
  peso: string;
  isNCG?: boolean;
}

export const ATENDIMENTO_CHECKLIST_DATA: ChecklistItem[] = [
  // ETAPA 1: ABERTURA
  {
    id: 'ck_identificacao',
    etapa: '1. Abertura',
    texto: 'Falar 1º nome, Bulgarelli Advogados e em nome da GM Financial',
    peso: '-2 pts cada'
  },
  {
    id: 'ck_gravada',
    etapa: '1. Abertura',
    texto: 'Avisar que o contato está sendo gravado e monitorado',
    peso: '-2 pts'
  },
  {
    id: 'ck_positiva',
    etapa: '1. Abertura',
    texto: 'Confirmação Positiva: 6 dígitos CPF/CNPJ + 1 pergunta do veículo',
    peso: 'NCG (Zera: 0)',
    isNCG: true
  },
  {
    id: 'ck_cadastro',
    etapa: '1. Abertura',
    texto: 'Atualizar cadastro (Endereço com CEP, Telefone/WhatsApp e E-mail)',
    peso: '-2 pts'
  },

  // ETAPA 2: DÉBITO
  {
    id: 'ck_parcelas',
    etapa: '2. Débito',
    texto: 'Verbalizar número(s) da(s) parcela(s) vencida(s)',
    peso: '-2 pts'
  },
  {
    id: 'ck_dias_atraso',
    etapa: '2. Débito',
    texto: 'Informar dia/mês do vencimento mais antigo e total de dias em atraso',
    peso: '-2 pts'
  },
  {
    id: 'ck_valor_atualizado',
    etapa: '2. Débito',
    texto: 'Verbalizar o valor total atualizado com juros diários e encargos',
    peso: '-3 pts'
  },

  // ETAPA 3: NEGOCIAÇÃO
  {
    id: 'ck_sondagem',
    etapa: '3. Negociação',
    texto: 'Sondagem Assertiva: Investigar o real motivo da inadimplência',
    peso: '-16 pts',
    isNCG: false
  },
  {
    id: 'ck_alternativas',
    etapa: '3. Negociação',
    texto: 'Explorar alternativas viáveis (Quita+ 21x, prorrogação, devolução amigável)',
    peso: '-16 pts'
  },
  {
    id: 'ck_desconto',
    etapa: '3. Negociação',
    texto: 'Desconto Progressivo: Conceder apenas mediante contrapartida de data do cliente',
    peso: '-12 pts'
  },

  // ETAPA 4: FECHAMENTO
  {
    id: 'ck_fechamento_dados',
    etapa: '4. Fechamento',
    texto: 'Confirmar dados acordados: Valor em R$, data do vencimento e canal (WhatsApp/E-mail)',
    peso: '-5 pts'
  },
  {
    id: 'ck_antifraude',
    etapa: '4. Fechamento',
    texto: 'Antifraude: Senha CPF, Beneficiário Banco GM S/A, Itaú 34191 e SEM Pix/TED',
    peso: '-11 pts'
  },
  {
    id: 'ck_sancoes',
    etapa: '4. Fechamento',
    texto: 'Sanções Contratuais: Juros 0,433% a.d., Serasa/SPC e risco de busca e apreensão',
    peso: '-11 pts'
  },
  {
    id: 'ck_canais',
    etapa: '4. Fechamento',
    texto: 'Informar 0800 056 2410, WhatsApp e horário (Seg-Sex 8-20h / Sáb 8-14h)',
    peso: '-2 pts'
  },
  {
    id: 'ck_tabulacao',
    etapa: '4. Fechamento',
    texto: 'Tabulação correta no discador/CRM (Nunca usar 508 se confirmou dados)',
    peso: 'NCG (Zera: 0)',
    isNCG: true
  }
];

interface FloatingChecklistProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const FloatingChecklist: React.FC<FloatingChecklistProps> = ({
  isOpen,
  onToggle,
  onClose
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('gm_checklist_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('gm_checklist_state', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleReset = () => {
    setCheckedItems({});
  };

  const total = ATENDIMENTO_CHECKLIST_DATA.length;
  const completed = Object.values(checkedItems).filter(Boolean).length;
  const percentage = Math.round((completed / total) * 100);

  // Group by etapa
  const etapas: Array<'1. Abertura' | '2. Débito' | '3. Negociação' | '4. Fechamento'> = [
    '1. Abertura',
    '2. Débito',
    '3. Negociação',
    '4. Fechamento'
  ];

  return (
    <div className="relative">
      {/* Botão Gatilho no Cabeçalho Superior Direito */}
      <button
        onClick={onToggle}
        className={`px-3 py-1.5 rounded-lg border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
          isOpen
            ? 'bg-blue-600 text-white border-blue-700 shadow-xs ring-2 ring-blue-500/30'
            : completed === total
            ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800 dark:bg-emerald-950/70 dark:border-emerald-600 dark:text-emerald-300'
            : 'bg-white/95 hover:bg-blue-50/80 border-slate-300/90 text-slate-700 hover:text-blue-700 dark:bg-[#162750] dark:border-[#234584] dark:text-white dark:hover:bg-[#1e3a6e]'
        }`}
        title="Checklist de Monitoria e Qualidade"
      >
        <div className="relative flex items-center justify-center">
          <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-300" />
          {completed > 0 && completed < total && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500" />
          )}
        </div>
        <span className="hidden sm:inline">Checklist de Qualidade</span>
        <span
          className={`font-mono text-[11px] font-bold px-1.5 py-0.2 rounded ${
            isOpen
              ? 'bg-blue-700 text-white'
              : completed === total
              ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-700 dark:text-white'
              : 'bg-slate-100 text-slate-700 dark:bg-[#0f1f42] dark:text-blue-200'
          }`}
        >
          {completed}/{total}
        </span>
      </button>

      {/* Pop-up Flutuante Suspenso */}
      {isOpen && (
        <div
          className="absolute right-0 top-11 mt-1 w-88 sm:w-96 max-h-[82vh] bg-white/98 backdrop-blur-2xl rounded-2xl border border-slate-200/90 shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 text-slate-900"
        >
          {/* Header do Checklist */}
          <div className="p-3.5 bg-gradient-to-r from-blue-50/90 to-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                  Checklist de Atendimento
                </h4>
                <p className="text-[10px] text-slate-500">
                  Garantia de conformidade com a monitoria GM & Bulgarelli
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                title="Limpar todas as marcações para nova ligação"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                title="Fechar checklist"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-3 text-xs">
            <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  percentage === 100
                    ? 'bg-emerald-500'
                    : percentage > 60
                    ? 'bg-blue-600'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="font-mono font-bold text-[11px] text-slate-600 shrink-0">
              {percentage}% Concluído
            </span>
          </div>

          {/* Lista com Rolagem */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3.5 text-xs">
            {etapas.map(etapa => {
              const items = ATENDIMENTO_CHECKLIST_DATA.filter(it => it.etapa === etapa);

              return (
                <div key={etapa} className="space-y-1.5">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 bg-blue-50/60 px-2 py-0.5 rounded">
                    {etapa}
                  </div>
                  <div className="space-y-1 pl-1">
                    {items.map(item => {
                      const isChecked = !!checkedItems[item.id];

                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`p-2 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                            isChecked
                              ? 'bg-emerald-50/50 border-emerald-200 text-slate-700'
                              : item.isNCG
                              ? 'bg-red-50/20 border-red-200/80 hover:bg-red-50/40 text-slate-900'
                              : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 text-slate-800'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-300" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-xs leading-snug ${
                                isChecked ? 'line-through text-slate-400' : 'font-medium'
                              }`}
                            >
                              {item.texto}
                            </p>
                            <div className="mt-1 flex items-center gap-1.5">
                              {item.isNCG ? (
                                <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                                  <ShieldAlert className="w-3 h-3" />
                                  <span>{item.peso}</span>
                                </span>
                              ) : (
                                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                                  {item.peso}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer do Pop-up */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>Reinicia a cada nova chamada</span>
            <button
              onClick={handleReset}
              className="text-blue-700 hover:underline font-semibold"
            >
              Zerar Itens
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
