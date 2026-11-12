import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Send,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  Check,
  ShieldCheck
} from 'lucide-react';
import { DynamicVars } from '../data/guideData';
import { SpeechCard } from './SpeechCard';
import { QualityAlertBox } from './QualityAlertBox';

interface ScriptPreventivoViewProps {
  vars: DynamicVars;
  onToast: (msg: string) => void;
}

export const ScriptPreventivoView: React.FC<ScriptPreventivoViewProps> = ({
  vars,
  onToast
}) => {
  const [selectedCenario, setSelectedCenario] = useState<'recebeu_vai_pagar' | 'nao_recebeu' | 'nao_vai_pagar'>('recebeu_vai_pagar');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner de Identificação do Modo Preventivo */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-200 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Capítulo 7 do Guia de Atendimento</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Script de Atendimento Preventivo
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
            Acompanhamento proativo de acordos formalizados antes da data de vencimento. Confirmação do recebimento do boleto bancário, reforço das orientações antifraude e garantia da liquidação do compromisso.
          </p>
        </div>
        <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold shrink-0 self-start sm:self-auto">
          <span className="block text-emerald-200 text-[10px] uppercase">Objetivo Operacional</span>
          <span className="font-bold text-white">Garantir Efetivação do Acordo</span>
        </div>
      </div>

      {/* ETAPA 1: APRESENTAÇÃO E IDENTIFICAÇÃO POSITIVA (LGPD) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Etapa 1 · Apresentação & Identificação Positiva
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              Identificação do Titular e Validação de Sigilo
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Preventivo Obrigatório
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-8 space-y-3">
            <SpeechCard
              label="Fala de Apresentação Preventiva Oficial"
              speech={`Bom dia/Boa tarde, posso falar com o(a) Sr.(a) ${vars.nomeCliente}? Meu nome é ${vars.primeiroNomeOperador} do escritório Bulgarelli Advogados em nome da GM Financial. Informo que este contato está sendo gravado para sua segurança. Para que possamos confirmar as informações do seu contrato com total privacidade, poderia por gentileza confirmar os 06 (seis) primeiros dígitos do seu CPF?`}
              note="Se o cliente questionar a GM Financial, esclareça ser o novo nome da Chevrolet Serviços Financeiros. Após o CPF, aplique 1 pergunta de segurança."
              onCopySuccess={() => onToast('Fala de abertura preventiva copiada!')}
            />

            {/* Pergunta de Segurança */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-xs text-slate-900 block uppercase tracking-wide">
                🔒 Pergunta de Segurança Obrigatória (Aplicar 1 das opções):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-slate-700">
                  <span className="font-bold text-emerald-700 block">Opção 1:</span>
                  Qual o <strong>modelo do veículo</strong> financiado? ({vars.modeloVeiculo || 'Ex: Onix'})
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-slate-700">
                  <span className="font-bold text-emerald-700 block">Opção 2:</span>
                  Qual o <strong>ano de fabricação</strong> do veículo?
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-slate-700">
                  <span className="font-bold text-emerald-700 block">Opção 3:</span>
                  Quais os <strong>02 últimos dígitos da placa</strong>?
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <QualityAlertBox
              alert={{
                title: 'Confirmação Positiva no Preventivo',
                badge: 'NCG - Zera (0)',
                type: 'critical',
                pointsDeduction: 'Zera a chamada se falhar',
                items: [
                  'Confirmar 6 primeiros dígitos do CPF do titular.',
                  'Fazer 1 pergunta de segurança do veículo.',
                  'Citar Bulgarelli Advogados em nome da GM Financial.',
                  'Avisar que a ligação é gravada.'
                ]
              }}
            />
          </div>
        </div>
      </div>

      {/* ETAPA 2: CONFIRMAÇÃO DO ACORDO E RECEPÇÃO DO BOLETO */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Etapa 2 · Confirmação do Acordo Formalizado
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              Verificação do Recebimento e Status do Pagamento
            </h3>
          </div>
        </div>

        {/* Informar o acordo */}
        <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
          <SpeechCard
            label="Fala de Abordagem do Acordo Formalizado"
            speech={`Sr.(a) ${vars.nomeCliente}, o motivo do nosso contato é referente ao acordo formalizado recentemente com a GM Financial, referente à(s) parcela(s) número ${vars.parcelasAtraso}, no valor acordado de R$ ${vars.valorAcordo}, com vencimento programado para o dia ${vars.dataAcordo}. Gostaria de confirmar se o senhor(a) recebeu o boleto corretamente e se está tudo certo para a realização do pagamento até a data de vencimento?`}
            onCopySuccess={() => onToast('Fala de abordagem do acordo copiada!')}
          />
        </div>

        {/* Seleção do Cenário do Preventivo */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
            Selecione a Resposta do Cliente:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => setSelectedCenario('recebeu_vai_pagar')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedCenario === 'recebeu_vai_pagar'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs">Cenário A: Recebeu e Vai Pagar</span>
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/20">Cód. 424</span>
              </div>
              <p className={`text-[11px] ${selectedCenario === 'recebeu_vai_pagar' ? 'text-emerald-100' : 'text-slate-500'}`}>
                Cliente confirma recebimento do boleto e compromisso de pagamento.
              </p>
            </button>

            <button
              onClick={() => setSelectedCenario('nao_recebeu')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedCenario === 'nao_recebeu'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs">Cenário B: Não Recebeu o Boleto</span>
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/20">Reenvio</span>
              </div>
              <p className={`text-[11px] ${selectedCenario === 'nao_recebeu' ? 'text-blue-100' : 'text-slate-500'}`}>
                Cliente relata que não localizou a fatura ou código de barras.
              </p>
            </button>

            <button
              onClick={() => setSelectedCenario('nao_vai_pagar')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedCenario === 'nao_vai_pagar'
                  ? 'bg-red-600 text-white border-red-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs">Cenário C: Não Vai Pagar / Quebra</span>
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/20">Cód. 425</span>
              </div>
              <p className={`text-[11px] ${selectedCenario === 'nao_vai_pagar' ? 'text-red-100' : 'text-slate-500'}`}>
                Cliente alega imprevisto ou que não conseguirá quitar o boleto.
              </p>
            </button>
          </div>
        </div>

        {/* RESPOSTA CENÁRIO A: RECEBEU E VAI PAGAR */}
        {selectedCenario === 'recebeu_vai_pagar' && (
          <div className="p-4 sm:p-5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Preventivo Positivo (Compromisso Confirmado)</span>
              </h4>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Tabulação: PREVENTIVO POSITIVO (Cód. 424)
              </span>
            </div>

            <SpeechCard
              label="Fala de Confirmação e Segurança (Preventivo Positivo)"
              speech={`Excelente, Sr.(a) ${vars.nomeCliente}! Ficamos muito felizes com a sua pontualidade na regularização. Para sua total segurança, lembre-se de conferir no momento do pagamento se o beneficiário consta exclusivamente BANCO GM S/A e o banco emissor Itaú. Assim que o pagamento for compensado pelo sistema financeiro, em até 02 dias úteis ocorrerá a baixa definitiva da pendência e o encerramento das cobranças. Caso precise nos contatar, nosso WhatsApp é o (11) 3185-8052 e o 0800 056 2410. Agradeço sua atenção e tenha um excelente dia!`}
              onCopySuccess={() => onToast('Fala de preventivo positivo copiada!')}
            />
          </div>
        )}

        {/* RESPOSTA CENÁRIO B: NÃO RECEBEU O BOLETO */}
        {selectedCenario === 'nao_recebeu' && (
          <div className="p-4 sm:p-5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-blue-950 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span>Reenvio Imediato de Boleto com Validação Cadastral</span>
              </h4>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Reenvio em Linha
              </span>
            </div>

            <div className="p-3 bg-white rounded-lg border border-blue-200 text-xs text-slate-700">
              <strong>Conduta Obrigatória:</strong> Confirme imediatamente o telefone celular com WhatsApp (${vars.telefoneCliente}) e o e-mail cadastrado (${vars.emailCliente}). Reenvie o PDF protegido por senha (número do CPF) e a linha digitável. Peça para o cliente verificar o recebimento durante a ligação.
            </div>

            <SpeechCard
              label="Fala para Reenvio Imediato do Boleto"
              speech={`Sem problemas, Sr.(a) ${vars.nomeCliente}! Vamos reenviar agora mesmo para que não perca o prazo do seu desconto. Seu e-mail cadastrado continua sendo ${vars.emailCliente}? E este telefone ${vars.telefoneCliente} possui WhatsApp ativo para receber o PDF e o código de barras? Perfeito, acabei de realizar o reenvio! O senhor(a) poderia conferir se já chegou na sua caixa de entrada ou no WhatsApp? Lembrando que a senha para abrir o arquivo é o seu CPF completo e o beneficiário oficial deve ser BANCO GM S/A.`}
              onCopySuccess={() => onToast('Fala de reenvio copiada!')}
            />
          </div>
        )}

        {/* RESPOSTA CENÁRIO C: NÃO VAI PAGAR (PREVENTIVO NEGATIVO) */}
        {selectedCenario === 'nao_vai_pagar' && (
          <div className="p-4 sm:p-5 rounded-xl border border-red-200 bg-red-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-red-950 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Cliente Informa Impossibilidade de Pagamento</span>
              </h4>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
                Tabulação: PREVENTIVO NEGATIVO (Cód. 425)
              </span>
            </div>

            <div className="p-3 bg-white rounded-lg border border-red-200 text-xs text-slate-700">
              <strong>Conduta Obrigatória:</strong> Identifique o motivo da impossibilidade. Alerte cordialmente sobre as consequências do não pagamento (cancelamento do acordo, perda irrevogável do desconto, juros diários de 0,433% e prosseguimento da cobrança/medidas judiciais). Caso o cliente consiga ajustar para nova data dentro da vigência da campanha, reinicie a negociação.
            </div>

            <SpeechCard
              label="Fala Formal de Alerta em Preventivo Negativo"
              speech={`Compreendo sua situação, Sr.(a) ${vars.nomeCliente}. Porém, é meu dever profissional alertá-lo(a) que, caso o pagamento deste acordo não seja realizado até ${vars.dataAcordo}, o desconto especial concedido sobre os encargos para o valor de R$ ${vars.valorAcordo} será automaticamente cancelado pelo sistema do Banco GM. Além disso, haverá incidência diária de juros (0,433% ao dia) e multa, continuidade das cobranças e o contrato poderá avançar para ajuizamento com ordem de busca e apreensão do veículo ${vars.modeloVeiculo}. Não haveria a possibilidade de utilizarmos uma alternativa como parcelamento no cartão de crédito ou anteciparmos outro recurso para não perder essa condição?`}
              onCopySuccess={() => onToast('Fala de preventivo negativo copiada!')}
            />
          </div>
        )}
      </div>

      {/* REGRAS DO PREVENTIVO */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          Norma Operacional do Preventivo (Regra GM Financial):
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-0.5">Manutenção de Cobrança:</strong>
            Informar ao cliente que os contatos de cobrança preventiva e administrativa poderão continuar ocorrendo no sistema até que o pagamento seja devidamente compensado e baixado pela rede bancária.
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-0.5">Canais de Confirmação:</strong>
            Disponibilize sempre o WhatsApp oficial (11) 3185-8052 para que o cliente envie o comprovante assim que realizar a liquidação, agilizando o registro no sistema CSLOG.
          </div>
        </div>
      </div>
    </div>
  );
};
