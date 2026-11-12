import React, { useState } from 'react';
import {
  PhoneIncoming,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
  Send,
  HelpCircle,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { DynamicVars } from '../data/guideData';
import { SpeechCard } from './SpeechCard';
import { QualityAlertBox } from './QualityAlertBox';

interface ScriptReceptivoViewProps {
  vars: DynamicVars;
  onToast: (msg: string) => void;
}

export const ScriptReceptivoView: React.FC<ScriptReceptivoViewProps> = ({
  vars,
  onToast
}) => {
  const [selectedMotivo, setSelectedMotivo] = useState<'negociar' | 'alega_pago' | 'segunda_via' | 'renegociar'>('negociar');
  const [alegaPagoDias, setAlegaPagoDias] = useState<'menos_2' | 'mais_2'>('menos_2');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner de Identificação do Modo Receptivo */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200 mb-1">
            <PhoneIncoming className="w-4 h-4 text-blue-300" />
            <span>Capítulo 6 do Guia de Atendimento</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Script de Atendimento Receptivo
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl leading-relaxed">
            Roteiro estruturado para chamadas recebidas de clientes ou responsáveis pelo pagamento. Validação mandatória de sigilo bancário (LGPD), identificação do motivo e condução resolutiva.
          </p>
        </div>
        <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold shrink-0 self-start sm:self-auto">
          <span className="block text-blue-200 text-[10px] uppercase">Padrão Operacional</span>
          <span className="font-bold text-white">Receptivo GM Financial</span>
        </div>
      </div>

      {/* ETAPA 1: APRESENTAÇÃO E IDENTIFICAÇÃO POSITIVA (LGPD) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Etapa 1 · Abertura & Identificação Positiva
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              Validação de Segurança sem Quebra de Sigilo Bancário
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            LGPD Obrigatória
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-8 space-y-3">
            <SpeechCard
              label="Fala de Abertura Receptiva Oficial"
              speech={`Olá, bom dia/boa tarde! Meu nome é ${vars.primeiroNomeOperador}, do escritório Bulgarelli Advogados em nome da GM Financial. Como posso ajudá-lo(a)? Informo que nosso atendimento está sendo gravado e, para prosseguirmos com total segurança, poderia por gentileza confirmar seu nome completo e os 06 (seis) primeiros dígitos do seu CPF?`}
              note="Se o cliente questionar o que é a GM Financial, esclareça: 'Esse é o novo nome de referência no nosso relacionamento com o cliente, substituindo Chevrolet Serviços Financeiros'. Se o contato for com responsável pelo pagamento, este deve saber o CPF do titular."
              onCopySuccess={() => onToast('Fala de abertura receptiva copiada!')}
            />

            {/* Pergunta de Segurança após validação do CPF */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-xs text-slate-900 block uppercase tracking-wide">
                🔒 Pergunta de Segurança Obrigatória (Escolher 1 das 3 opções):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-slate-700">
                  <span className="font-bold text-blue-700 block">Opção 1:</span>
                  Qual o <strong>modelo do veículo</strong> financiado? ({vars.modeloVeiculo || 'Ex: Onix'})
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-slate-700">
                  <span className="font-bold text-blue-700 block">Opção 2:</span>
                  Qual o <strong>ano de fabricação/modelo</strong> do veículo?
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-slate-700">
                  <span className="font-bold text-blue-700 block">Opção 3:</span>
                  Quais os <strong>02 últimos dígitos da placa</strong> do veículo?
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                * Resposta validada? Atualize os dados cadastrais (e-mail e WhatsApp com DDD) e prossiga para a identificação da solicitação.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <QualityAlertBox
              alert={{
                title: 'Confirmação Positiva no Receptivo',
                badge: 'NCG - Zera (0)',
                type: 'critical',
                pointsDeduction: 'Zera a chamada se falhar',
                items: [
                  'Pedir nome completo e 6 primeiros dígitos do CPF do titular.',
                  'Aplicar 1 pergunta de segurança (modelo, ano ou final da placa).',
                  'Falar seu primeiro nome e Bulgarelli Advogados.',
                  'Informar que o contato é em nome da GM Financial.',
                  'Avisar que o contato é gravado.'
                ]
              }}
            />
          </div>
        </div>
      </div>

      {/* ETAPA 2: IDENTIFICAÇÃO DO MOTIVO DO CLIENTE */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Etapa 2 · Condução Conforme Solicitação do Cliente
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              Identifique o Motivo da Ligação Recebida
            </h3>
          </div>
        </div>

        {/* Seletores de Cenário Receptivo */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => setSelectedMotivo('negociar')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedMotivo === 'negociar'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="block font-bold text-xs">1. Regularizar / Pagar</span>
            <span className={`text-[11px] block mt-0.5 ${selectedMotivo === 'negociar' ? 'text-blue-100' : 'text-slate-500'}`}>
              Negociação de débito
            </span>
          </button>

          <button
            onClick={() => setSelectedMotivo('alega_pago')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedMotivo === 'alega_pago'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="block font-bold text-xs">2. Alega Pagamento</span>
            <span className={`text-[11px] block mt-0.5 ${selectedMotivo === 'alega_pago' ? 'text-blue-100' : 'text-slate-500'}`}>
              Já realizou o pagamento
            </span>
          </button>

          <button
            onClick={() => setSelectedMotivo('segunda_via')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedMotivo === 'segunda_via'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="block font-bold text-xs">3. Segunda Via Boleto</span>
            <span className={`text-[11px] block mt-0.5 ${selectedMotivo === 'segunda_via' ? 'text-blue-100' : 'text-slate-500'}`}>
              Reenvio de fatura de acordo
            </span>
          </button>

          <button
            onClick={() => setSelectedMotivo('renegociar')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedMotivo === 'renegociar'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="block font-bold text-xs">4. Renegociação</span>
            <span className={`text-[11px] block mt-0.5 ${selectedMotivo === 'renegociar' ? 'text-blue-100' : 'text-slate-500'}`}>
              Quebra / Novo parcelamento
            </span>
          </button>
        </div>

        {/* CENÁRIO 1: CLIENTE QUER NEGOCIAR / PAGAR */}
        {selectedMotivo === 'negociar' && (
          <div className="p-4 sm:p-5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-4">
            <h4 className="font-bold text-sm text-blue-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Cliente Deseja Regularizar Pendência Financeira</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              O cliente tomou a iniciativa de contatar a assessoria para pagar. Essa é uma excelente oportunidade para fechar o acordo de imediato com a melhor condição sem queima desnecessária de alçada.
            </p>

            <SpeechCard
              label="Fala de Proposta de Regularização no Receptivo"
              speech={`Perfeito, Sr.(a) ${vars.nomeCliente}! Em nosso sistema consta em aberto a(s) parcela(s) número ${vars.parcelasAtraso}, vencida(s) desde ${vars.vencimentoOriginal}. O valor atualizado do débito é de R$ ${vars.valorAtualizado}. Como o senhor(a) tomou a iniciativa de entrar em contato conosco hoje, temos uma condição especial autorizada pelo Banco GM para pagamento à vista por R$ ${vars.valorAcordo} com vencimento para ${vars.dataAcordo}. Podemos confirmar e enviar seu boleto oficial com o código de barras no seu WhatsApp?`}
              onCopySuccess={() => onToast('Fala de negociação receptiva copiada!')}
            />
          </div>
        )}

        {/* CENÁRIO 2: CLIENTE ALEGA PAGAMENTO */}
        {selectedMotivo === 'alega_pago' && (
          <div className="p-4 sm:p-5 rounded-xl border border-amber-200 bg-amber-50/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="font-bold text-sm text-amber-950 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Cliente Informa que Já Realizou o Pagamento</span>
              </h4>
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className="text-slate-500 text-[11px]">Quando ocorreu o pagamento?</span>
                <button
                  onClick={() => setAlegaPagoDias('menos_2')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    alegaPagoDias === 'menos_2'
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Há menos de 2 dias úteis
                </button>
                <button
                  onClick={() => setAlegaPagoDias('mais_2')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    alegaPagoDias === 'mais_2'
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Há mais de 2 dias úteis
                </button>
              </div>
            </div>

            {alegaPagoDias === 'menos_2' ? (
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs text-slate-700">
                  <strong className="text-amber-900 block mb-1">Regra Oficial da Norma Operacional:</strong>
                  Caso o pagamento tenha sido realizado há <strong>menos de 02 dias úteis</strong>, informe o prazo padrão de compensação bancária e encerre cordialmente, <strong>sem direcionamento para a Central de Atendimento (CAC)</strong>.
                </div>
                <SpeechCard
                  label="Fala Oficial para Pagamento com Menos de 2 Dias"
                  speech={`Compreendo perfeitamente, Sr.(a) ${vars.nomeCliente}! Como o pagamento foi realizado há menos de 02 dias úteis, informo que o prazo padrão de compensação bancária entre as instituições financeiras é de até 02 dias úteis. Assim que o valor for liquidado pela rede bancária, a baixa ocorrerá automaticamente em nosso sistema e as ações de cobrança serão cessadas. Agradeço sua atenção e tenha um ótimo dia!`}
                  note="Tabulação recomendada: ALEGA PAGAMENTO (Cód. 18)."
                  onCopySuccess={() => onToast('Fala de compensação copiada!')}
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs text-slate-700">
                  <strong className="text-amber-900 block mb-1">Regra Oficial para Pagamento com Mais de 2 Dias:</strong>
                  Questionar se o assunto já foi direcionado ao CAC. Solicitar o envio de cópia do comprovante de pagamento, cópia do boleto pago e breve relato para <strong className="text-blue-700 font-mono">documentos.cac@central.gmfinancial.com</strong>.
                </div>
                <SpeechCard
                  label="Fala Oficial para Pagamento com Mais de 2 Dias"
                  speech={`Sr.(a) ${vars.nomeCliente}, como o pagamento foi realizado há mais de 02 dias úteis e ainda não constou a baixa no sistema financeiro, para que a auditoria da GM Financial possa localizar e regularizar sua parcela imediatamente, solicito que encaminhe uma foto ou PDF do comprovante de pagamento e do boleto quitado para o e-mail: documentos.cac@central.gmfinancial.com, com um breve relato. Assim que enviado, a auditoria fará a validação em sistema. O senhor(a) também pode nos enviar pelo WhatsApp oficial (11) 3185-8052 para anexarmos ao contrato.`}
                  note="Tabulação: ALEGA PAGAMENTO (Cód. 18) ou COMPROVANTE DE PAGAMENTO (Cód. 600)."
                  onCopySuccess={() => onToast('Fala de evidências copiada!')}
                />
              </div>
            )}
          </div>
        )}

        {/* CENÁRIO 3: SEGUNDA VIA DE BOLETO */}
        {selectedMotivo === 'segunda_via' && (
          <div className="p-4 sm:p-5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3">
            <h4 className="font-bold text-sm text-blue-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Cliente Solicita Segunda Via do Boleto de Acordo</span>
            </h4>
            <p className="text-xs text-slate-700">
              Confirme os dados cadastrais (telefone WhatsApp e e-mail) e realize o envio imediato da 2ª via protegida por senha (CPF do titular) com reforço antifraude.
            </p>
            <SpeechCard
              label="Fala para Envio de Segunda Via"
              speech={`Com certeza, Sr.(a) ${vars.nomeCliente}! Estou confirmando o envio da 2ª via do seu boleto no valor de R$ ${vars.valorAcordo} com vencimento para ${vars.dataAcordo}. O boleto está sendo encaminhado em PDF protegido no seu WhatsApp (${vars.telefoneCliente}) e no seu e-mail cadastrado (${vars.emailCliente}). Lembrando que a senha para abrir o arquivo é o número completo do seu CPF/CNPJ, o banco emissor é o Itaú e o beneficiário é exclusivamente BANCO GM S/A. O senhor(a) já pode acessar o aplicativo do seu banco para pagamento.`}
              onCopySuccess={() => onToast('Fala de 2ª via copiada!')}
            />
          </div>
        )}

        {/* CENÁRIO 4: RENEGOCIAÇÃO / DIFICULDADE */}
        {selectedMotivo === 'renegociar' && (
          <div className="p-4 sm:p-5 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-3">
            <h4 className="font-bold text-sm text-indigo-900 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-indigo-600" />
              <span>Pedido de Renegociação ou Nova Data de Pagamento</span>
            </h4>
            <p className="text-xs text-slate-700">
              Acesse a tecla <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[11px]">F7</kbd> (Cálculo) no sistema CSLOG para verificar a elegibilidade do contrato para reparcelamento ou novo acordo.
            </p>
            <SpeechCard
              label="Fala de Sondagem para Renegociação"
              speech={`Entendo perfeitamente sua situação, Sr.(a) ${vars.nomeCliente}. Vamos verificar em nosso sistema quais alternativas estão disponíveis para o seu contrato hoje. Me informe, por gentileza: qual o valor que o senhor(a) tem disponível hoje como entrada e qual o valor de parcela mensal que realmente cabe no seu orçamento sem comprometer suas despesas essenciais?`}
              onCopySuccess={() => onToast('Fala de renegociação copiada!')}
            />
          </div>
        )}
      </div>

      {/* ETAPA 3: ORIENTAÇÕES ANTIFRAUDE E ENCERRAMENTO */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Etapa 3 · Encerramento & Protocolos de Segurança
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              Orientações de Segurança do Boleto e Finalização
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-8">
            <SpeechCard
              label="Fala de Encerramento e Segurança Antifraude"
              speech={`Para sua total segurança financeira, ao abrir o boleto certifique-se de que o beneficiário seja exclusivamente BANCO GM S/A e o banco emissor o Itaú (início 34191). Lembramos que a GM Financial não solicita pagamentos via Pix ou TED para pessoas físicas. Alguma dúvida adicional sobre o atendimento? Agradeço o seu contato e tenha um ótimo dia!`}
              onCopySuccess={() => onToast('Encerramento receptivo copiado!')}
            />
          </div>
          <div className="lg:col-span-4">
            <QualityAlertBox
              alert={{
                title: 'Encerramento Receptivo',
                badge: '-5 Pts',
                type: 'warning',
                items: [
                  'Informar canais oficiais (0800 056 2410 e WhatsApp).',
                  'Alertar sobre Beneficiário oficial BANCO GM S/A.',
                  'Não direcionar ao CAC pagamentos com menos de 2 dias.',
                  'Agradecer cordialmente e registrar a tabulação imediata no CSLOG.'
                ]
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
