import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  UserCheck,
  CreditCard,
  FileText,
  AlertOctagon,
  ChevronRight,
  ShieldAlert,
  PhoneForwarded,
  Shield,
  PhoneOutgoing,
  PhoneIncoming,
  ShieldCheck
} from 'lucide-react';
import { DynamicVars, SCRIPT_STAGES, OBJECTIONS_CATALOG } from '../data/guideData';
import { SpeechCard } from './SpeechCard';
import { QualityAlertBox } from './QualityAlertBox';
import { ScriptReceptivoView } from './ScriptReceptivoView';
import { ScriptPreventivoView } from './ScriptPreventivoView';

interface ScriptLinearViewProps {
  vars: DynamicVars;
  activeStage: number;
  onSelectStage: (stage: number) => void;
  onToast: (msg: string) => void;
}

export const ScriptLinearView: React.FC<ScriptLinearViewProps> = ({
  vars,
  activeStage,
  onSelectStage,
  onToast
}) => {
  // Modalidade de Atendimento: Ativo, Receptivo ou Preventivo
  const [modalidadeAtendimento, setModalidadeAtendimento] = useState<'ativo' | 'receptivo' | 'preventivo'>('ativo');

  // Branch sub-selections
  const [selectedBranchStage1, setSelectedBranchStage1] = useState<string | null>(null);
  const [selectedBranchStage2, setSelectedBranchStage2] = useState<string | null>(null);
  const [selectedObjectionId, setSelectedObjectionId] = useState<string | null>(null);

  // Group filter for Stage 3 objections
  const [objectionTab, setObjectionTab] = useState<'propostas' | 'reclamacoes'>('propostas');

  const filteredObjections = OBJECTIONS_CATALOG.filter(obj => obj.group === objectionTab);
  const selectedObjection = OBJECTIONS_CATALOG.find(obj => obj.id === selectedObjectionId);

  return (
    <div className="space-y-6">
      {/* CAMPO DE SELEÇÃO: ATENDIMENTO ATIVO, RECEPTIVO E PREVENTIVO */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Modalidade do Contato
            </span>
            <span className="font-bold text-sm text-slate-800">
              Selecione o Roteiro Operacional:
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 max-w-md w-full sm:w-auto">
            <button
              onClick={() => setModalidadeAtendimento('ativo')}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                modalidadeAtendimento === 'ativo'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <PhoneOutgoing className="w-3.5 h-3.5 shrink-0" />
              <span>Ativo</span>
            </button>

            <button
              onClick={() => setModalidadeAtendimento('receptivo')}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                modalidadeAtendimento === 'receptivo'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <PhoneIncoming className="w-3.5 h-3.5 shrink-0" />
              <span>Receptivo</span>
            </button>

            <button
              onClick={() => setModalidadeAtendimento('preventivo')}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                modalidadeAtendimento === 'preventivo'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Preventivo</span>
            </button>
          </div>
        </div>
      </div>

      {/* RENDERIZAÇÃO CONFORME A MODALIDADE */}
      {modalidadeAtendimento === 'receptivo' && (
        <ScriptReceptivoView vars={vars} onToast={onToast} />
      )}

      {modalidadeAtendimento === 'preventivo' && (
        <ScriptPreventivoView vars={vars} onToast={onToast} />
      )}

      {modalidadeAtendimento === 'ativo' && (
        <>
          {/* Indicador de Passos das 4 Etapas */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SCRIPT_STAGES.map(stage => {
            const isActive = activeStage === stage.id;
            const isCompleted = activeStage > stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => onSelectStage(stage.id)}
                className={`flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isActive
                      ? 'bg-white text-blue-700'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {isCompleted ? '✓' : stage.id}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">
                    {stage.shortTitle}
                  </div>
                  <div
                    className={`text-[10px] truncate ${
                      isActive ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    Passo {stage.id} de 4
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= ESTÁGIO 1 ================= */}
      {activeStage === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Etapa 1.1 · Apresentação & Identificação Positiva
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Abertura Segura sem Quebra de Sigilo Bancário
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-8">
                <SpeechCard
                  speech={`Bom dia/Boa tarde, posso falar com o(a) Sr.(a) ${vars.nomeCliente}? Meu nome é ${vars.primeiroNomeOperador} do escritório Bulgarelli Advogados em nome da GM Financial. Informo que este contato está sendo gravado, e para seguirmos com o atendimento com total segurança, poderia por gentileza confirmar os 06 (seis) primeiros números do seu CPF?`}
                  note={`Se o cliente indagar o que é a GM Financial, esclareça que é o novo nome de relacionamento da Chevrolet Serviços Financeiros. Em casos de PJ, solicite os 6 dígitos do CNPJ ou CPF do avalista.`}
                  onCopySuccess={() => onToast('Fala da Etapa 1 copiada!')}
                />
              </div>
              <div className="lg:col-span-4">
                <QualityAlertBox
                  alert={{
                    title: 'Confirmação Positiva (NCG)',
                    badge: 'NCG - Zera (0)',
                    type: 'critical',
                    pointsDeduction: 'Zera a chamada se falhar',
                    items: [
                      'Confirmar 6 primeiros dígitos do CPF/CNPJ.',
                      'Fazer 1 pergunta de segurança (modelo do veículo, ano ou 2 últimos dígitos da placa).',
                      'Falar seu primeiro nome (-2 pts se omitir).',
                      'Citar Bulgarelli Advogados (-2 pts).',
                      'Separar Bulgarelli da GM Financial (-2 pts).',
                      'Avisar que o contato é gravado (-2 pts).'
                    ]
                  }}
                />
              </div>
            </div>
          </div>

          {/* Atualização Cadastral */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Etapa 1.2 · Confirmação dos Dados Cadastrais
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Atualização Obrigatória em 100% dos Contatos
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-8">
                <SpeechCard
                  speech={`Para mantermos seu cadastro protegido e garantir o envio correto de segundas vias e comprovantes, vamos confirmar seus dados: seu e-mail cadastrado continua sendo ${vars.emailCliente}? Este telefone ${vars.telefoneCliente} possui WhatsApp ativo para receber o código de barras e o boleto em PDF? Gostaria de adicionar outro número para recados?`}
                  onCopySuccess={() => onToast('Fala cadastral copiada!')}
                />
              </div>
              <div className="lg:col-span-4">
                <QualityAlertBox
                  alert={{
                    title: 'Atualização Cadastral',
                    badge: '-2 Pts',
                    type: 'warning',
                    pointsDeduction: '-2 pontos por omissão',
                    items: [
                      'Obrigatório em 100% dos contatos:',
                      '1. Endereço completo com CEP',
                      '2. Telefone válido com WhatsApp',
                      '3. E-mail ativo para envio do PDF protegido'
                    ]
                  }}
                />
              </div>
            </div>

            {/* Caminhos de Resposta do Passo 1 */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                ➔ Qual foi o desfecho da identificação? (Selecione o Próximo Caminho):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  onClick={() => onSelectStage(2)}
                  className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 text-left transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                    <span>Confirmou Dados</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-[11px] text-blue-700 mt-1">
                    Avançar para Apresentação do Débito (Etapa 2).
                  </div>
                </button>

                <button
                  onClick={() => setSelectedBranchStage1('terceiro_responsavel')}
                  className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedBranchStage1 === 'terceiro_responsavel'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-800">Terceiro Responsável</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Quem atendeu responde financeiramente pelo veículo.
                  </div>
                </button>

                <button
                  onClick={() => setSelectedBranchStage1('terceiro_recado')}
                  className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedBranchStage1 === 'terceiro_recado'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-800">Recado com Terceiro</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Não responsável; deixar 0800 sem expor valores.
                  </div>
                </button>

                <button
                  onClick={() => setSelectedBranchStage1('falecido')}
                  className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedBranchStage1 === 'falecido'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-800">Cliente Falecido</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Certidão de óbito e seguro MetLife Prestamista.
                  </div>
                </button>
              </div>

              {/* Detalhe da Ramificação do Estágio 1 */}
              {selectedBranchStage1 === 'terceiro_responsavel' && (
                <div className="mt-4 p-4 rounded-xl border border-blue-200 bg-white grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-8">
                    <SpeechCard
                      label="Fala com Terceiro Responsável pelo Pagamento"
                      speech={`Bom dia/Boa tarde. Gostaria de falar com o(a) Sr.(a) [NOME RESPONSÁVEL]. Meu nome é ${vars.primeiroNomeOperador} do escritório Bulgarelli Advogados em nome da GM Financial. Este contato é gravado. O contato diz respeito ao contrato do cliente ${vars.nomeCliente}. O(a) senhor(a) é quem responde pelo pagamento? Para darmos continuidade com segurança, poderia confirmar os 6 primeiros dígitos do CPF do titular e modelo do carro?`}
                    />
                    <div className="mt-3">
                      <button
                        onClick={() => onSelectStage(2)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5"
                      >
                        <span>Dados Confirmados · Avançar para Apresentação do Débito</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-4">
                    <QualityAlertBox
                      alert={{
                        title: 'Atenção com Terceiro',
                        badge: 'NCG se vazar',
                        type: 'critical',
                        items: [
                          'Confirmar expressamente se responde financeiramente pelo veículo.',
                          '6 primeiros dígitos do CPF do titular + 1 pergunta de segurança.',
                          'Atualizar telefone e e-mail do terceiro no sistema.'
                        ]
                      }}
                    />
                  </div>
                </div>
              )}

              {selectedBranchStage1 === 'terceiro_recado' && (
                <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-white grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-8">
                    <SpeechCard
                      label="Fala para Recado (Sigilo Bancário)"
                      speech={`Sr.(a) [NOME DO INTERLOCUTOR], meu nome é ${vars.primeiroNomeOperador} da Bulgarelli Advogados em nome da GM Financial. Por gentileza, o(a) senhor(a) poderia anotar um recado importante para que o(a) Sr.(a) ${vars.nomeCliente} nos retorne no telefone gratuito 0800 056 2410 ou WhatsApp oficial (11) 3185-8052? Nosso horário é de segunda a sexta das 08h às 20h e sábados das 08h às 14h.`}
                    />
                  </div>
                  <div className="lg:col-span-4">
                    <QualityAlertBox
                      alert={{
                        title: 'Sigilo Bancário',
                        badge: 'Regra Absoluta',
                        type: 'critical',
                        items: [
                          'NUNCA informe valores, parcelas ou ajuizamento a terceiros.',
                          'Tabulação obrigatória: RECADO COM TERCEIROS.',
                          'Perguntar melhor horário para encontrar o titular.'
                        ]
                      }}
                    />
                  </div>
                </div>
              )}

              {selectedBranchStage1 === 'falecido' && (
                <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-white grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-8">
                    <SpeechCard
                      label="Procedimento para Cliente Falecido"
                      speech={`Meus sinceros sentimentos à família. Para registrarmos o óbito no contrato e suspendermos as cobranças, peço por gentileza que nos informe a data do falecimento e encaminhe uma cópia da Certidão de Óbito para o e-mail oficial: documentos.cac@central.gmfinancial.com.\n\nConsta em sistema que o contrato possui Seguro Prestamista contratado. Orientamos que a família entre em contato com a seguradora MetLife pelos telefones 3004-9329 ou 0800 727 9329 para abertura do sinistro de cobertura do saldo devedor.`}
                    />
                  </div>
                  <div className="lg:col-span-4">
                    <QualityAlertBox
                      alert={{
                        title: 'Sinistro MetLife Óbito',
                        badge: 'Tabular Falecido',
                        type: 'info',
                        items: [
                          'Coletar data do óbito e nome do inventariante/responsável.',
                          'Orientar envio da certidão para documentos.cac.',
                          'Fornecer telefones MetLife (3004-9329 / 0800 727 9329).'
                        ]
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= ESTÁGIO 2 ================= */}
      {activeStage === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Etapa 2.1 · Apresentação das Parcelas e Valores
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Verbalização Completa das Pendências Financeiras
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-8">
                <SpeechCard
                  speech={`Sr.(a) ${vars.nomeCliente}, entramos em contato referente ao financiamento do seu veículo ${vars.modeloVeiculo}. Identificamos atraso de ${vars.diasAtraso} dias na(s) parcela(s) de número ${vars.parcelasAtraso}, com vencimento original desde ${vars.vencimentoOriginal}, totalizando o valor atualizado com encargos de R$ ${vars.valorAtualizado}. O(a) senhor(a) confirma se esta(s) parcela(s) já foi(foram) paga(s)?`}
                  onCopySuccess={() => onToast('Fala da apresentação do débito copiada!')}
                />
              </div>
              <div className="lg:col-span-4">
                <QualityAlertBox
                  alert={{
                    title: 'Verbalização Obrigatória',
                    badge: '-7 Pts Total',
                    type: 'warning',
                    pointsDeduction: 'Até -7 pontos se omitir itens',
                    items: [
                      'Verbalizar números das parcelas em aberto (-2 pts).',
                      'Informar dia e mês da mais antiga + dias de atraso (-2 pts).',
                      'Verbalizar valor atualizado com juros e multas (-3 pts).'
                    ]
                  }}
                />
              </div>
            </div>

            {/* Caminhos da Resposta no Estágio 2 */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                ➔ O que o cliente respondeu sobre as parcelas?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedBranchStage2('alega_pago')}
                  className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedBranchStage2 === 'alega_pago'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-800">Afirma que Já Pagou</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Verificar prazo de compensação (D+2) ou comprovante.
                  </div>
                </button>

                <button
                  onClick={() => setSelectedBranchStage2('quer_pagar_imediato')}
                  className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedBranchStage2 === 'quer_pagar_imediato'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-800">Quer Pagar Hoje</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Sem objeção; avançar direto para Fechamento e Antifraude.
                  </div>
                </button>

                <button
                  onClick={() => setSelectedBranchStage2('mes_invertido')}
                  className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedBranchStage2 === 'mes_invertido'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-800">Pagou Mês Invertido</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Antecipou parcela futura e deixou antiga aberta.
                  </div>
                </button>

                <button
                  onClick={() => onSelectStage(3)}
                  className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 text-left transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                    <span>Sem Condições / Dúvida</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-[11px] text-blue-700 mt-1">
                    Avançar para Sondagem e Quebra de Objeções (Passo 3).
                  </div>
                </button>
              </div>

              {/* Ramificações do Estágio 2 */}
              {selectedBranchStage2 === 'alega_pago' && (
                <div className="mt-4 p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-8">
                    <SpeechCard
                      label="Procedimento: Cliente Alega Pagamento"
                      speech={`Pode me confirmar a data em que o pagamento foi realizado e o valor exato pago?\n\n• Se pago há menos de 2 dias úteis: O prazo bancário de compensação é de até 48h úteis. Agradeça e aguarde a baixa sistêmica.\n• Se pago há mais de 2 dias úteis: Solicite o envio do comprovante autenticado e cópia do boleto para documentos.cac@central.gmfinancial.com com cópia ao escritório.`}
                    />
                  </div>
                  <div className="lg:col-span-4">
                    <QualityAlertBox
                      alert={{
                        title: 'Alega Pagamento',
                        badge: 'Registrar Data/Valor',
                        type: 'info',
                        items: [
                          'Registrar data e valor informado pelo cliente.',
                          'Avisar que ações de cobrança seguem até a baixa efetiva.',
                          'Tabulação: ALEGA PAGAMENTO.'
                        ]
                      }}
                    />
                  </div>
                </div>
              )}

              {selectedBranchStage2 === 'quer_pagar_imediato' && (
                <div className="mt-4 p-4 rounded-xl border border-blue-200 bg-white grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-8">
                    <SpeechCard
                      label="Pagamento Imediato sem Objeção"
                      speech={`Perfeito, Sr.(a) ${vars.nomeCliente}! Vamos gerar o código com vencimento para hoje no valor acordado de R$ ${vars.valorAcordo} e enviar imediatamente para seu ${vars.canalEnvio}.\n\nPara seguirmos com total segurança, vamos repassar os dados de conferência do boleto contra fraudes.`}
                    />
                    <div className="mt-3">
                      <button
                        onClick={() => onSelectStage(4)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5"
                      >
                        <span>Avançar para Fechamento & Antifraude (Passo 4)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-4">
                    <QualityAlertBox
                      alert={{
                        title: 'Antifraude Obrigatório',
                        badge: 'Regra Rígida',
                        type: 'critical',
                        items: [
                          'Mesmo pagando na hora, é OBRIGATÓRIO passar as instruções antifraude e sanções!',
                          'Omitir antifraude desconta 11 pontos.'
                        ]
                      }}
                    />
                  </div>
                </div>
              )}

              {selectedBranchStage2 === 'mes_invertido' && (
                <div className="mt-4 p-4 rounded-xl border border-purple-200 bg-purple-50/40 grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-8">
                    <SpeechCard
                      label="Regra de Mês Invertido"
                      speech={`Identificamos que houve o pagamento da parcela futura em vez da mais antiga. Caso o senhor tenha efetuado o pagamento do mês 10 no mês 08 e esteja entrando em contato ainda no mês 08, direcionamos o estorno em até 7 dias úteis. Caso já estejamos no mês 09, a parcela 08 continua pendente e deve ser quitada, não havendo boleto de cobrança no mês 10.`}
                    />
                  </div>
                  <div className="lg:col-span-4">
                    <QualityAlertBox
                      alert={{
                        title: 'Regra GM Mês Invertido',
                        badge: 'Regra Financeira',
                        type: 'info',
                        items: [
                          'No mês anterior: Estorno em 7 dias úteis pelo Banco GM.',
                          'No mês atual: Deve quitar a atrasada; a futura já consta paga.'
                        ]
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= ESTÁGIO 3 ================= */}
      {activeStage === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Sondagem & Desconto */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Etapa 3.1 · Sondagem Assertiva & Desconto Progressivo
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Investigação da Inadimplência e Flexibilidade Estratégica
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-8">
                <SpeechCard
                  speech={`Compreendo sua situação, Sr.(a) ${vars.nomeCliente}. Para que possamos encontrar uma condição especial que caiba no seu momento financeiro e mantenha seu contrato e seu veículo ${vars.modeloVeiculo} protegidos, o que aconteceu que motivou esse atraso e qual o valor que o(a) senhor(a) possui disponível hoje para regularizarmos?`}
                  onCopySuccess={() => onToast('Fala de sondagem copiada!')}
                />
              </div>
              <div className="lg:col-span-4">
                <QualityAlertBox
                  alert={{
                    title: 'Sondagem & Desconto',
                    badge: '-28 Pts Total',
                    type: 'critical',
                    pointsDeduction: 'Omissão de sondagem: -16 pts',
                    items: [
                      'Sondar o motivo real do atraso (-16 pts se omitir).',
                      'Desconto Progressivo: Nunca dê o desconto máximo de primeira sem contrapartida de data do cliente (-12 pts).',
                      'Sempre demonstre a economia real que o desconto traz.'
                    ]
                  }}
                />
              </div>
            </div>
          </div>

          {/* Catálogo de Objeções Dividido em 2 Grupos */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Etapa 3.2 · Catálogo Detalhado de Objeções
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Selecione o Cenário Apresentado pelo Cliente
                </h3>
              </div>

              {/* Alternador de Grupo de Objeção */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setObjectionTab('propostas')}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    objectionTab === 'propostas'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  💼 Grupo 1: Propostas (7)
                </button>
                <button
                  onClick={() => setObjectionTab('reclamacoes')}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    objectionTab === 'reclamacoes'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🗣️ Grupo 2: Reclamações (7)
                </button>
              </div>
            </div>

            {/* Grid dos Botões de Objeção */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredObjections.map(item => {
                const isSelected = selectedObjectionId === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedObjectionId(item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/70 shadow-xs ring-1 ring-blue-400'
                        : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 leading-snug">
                        {item.numberLabel}. {item.title}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? 'rotate-90 text-blue-600' : 'text-slate-400'
                        }`}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Exibição Dinâmica do Item Selecionado */}
            {selectedObjection && (
              <div className="mt-5 p-5 rounded-xl border border-blue-200 bg-blue-50/30 grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in fade-in duration-150">
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                      Cenário Ativo: {selectedObjection.title}
                    </span>
                    {selectedObjection.tabulationCode && (
                      <span className="text-[11px] font-mono font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                        Tabulação: {selectedObjection.tabulationCode}
                      </span>
                    )}
                  </div>
                  <SpeechCard
                    speech={selectedObjection.speech.replace('{nomeCliente}', vars.nomeCliente)}
                    onCopySuccess={() => onToast(`Fala de "${selectedObjection.title}" copiada!`)}
                  />
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => onSelectStage(4)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Acordo Aceito · Avançar para Fechamento & Antifraude (Passo 4)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <QualityAlertBox alert={selectedObjection.alert} />
                </div>
              </div>
            )}
          </div>

          {/* Bloco 3.3: Não Acordo e Sanções */}
          <div className="bg-red-50/40 border border-red-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-red-200/60">
              <div>
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                  Etapa 3.3 · Conduta e Sanções em Caso de Não Acordo
                </span>
                <h3 className="text-base sm:text-lg font-bold text-red-950 mt-0.5">
                  Comunicação Obrigatória das Consequências Legais em Caso de Recusa
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-8">
                <SpeechCard
                  label="Fala Formal de Sanções no Não Acordo"
                  speech={`Compreendo perfeitamente sua decisão no momento, Sr.(a) ${vars.nomeCliente}. No entanto, como dever contratual, preciso alertá-lo(a) que a manutenção da pendência acarretará as seguintes sanções:\n\n1. Manutenção do registro do seu CPF junto aos órgãos de proteção ao crédito (Serasa/SPC);\n2. Incidência diária de juros moratórios de 0,433% ao dia somados à multa contratual de 2%;\n3. Continuidade das tentativas diárias de contato de cobrança;\n4. Perda irreversível da campanha atual de descontos sobre os juros;\n5. Inclusão de honorários advocatícios a partir de 16 dias de atraso;\n6. Medidas Judiciais: Para contratos a partir de 31 dias de atraso (carteira FPD) e a partir de 120 dias (Regular e PJ), poderá ocorrer o acionamento judicial com busca e apreensão do veículo ${vars.modeloVeiculo}. Havendo a retomada, o banco não realiza campanhas de desconto e o bem será leiloado, permanecendo o senhor responsável pelo saldo remanescente caso o leilão não liquide a dívida integral.\n\nCaso decida regularizar para estancar estas medidas, nossos canais oficiais são o WhatsApp (11) 3185-8052 e o 0800 056 2410, de segunda a sexta das 08h às 20h e sábados das 08h às 14h. Alguma dúvida adicional? Agradeço a atenção e tenha um bom dia.`}
                  onCopySuccess={() => onToast('Fala de sanções copiada!')}
                />
              </div>
              <div className="lg:col-span-4">
                <QualityAlertBox
                  alert={{
                    title: 'Sanções no Insucesso',
                    badge: '-11 Pts',
                    type: 'critical',
                    pointsDeduction: '-11 pontos se omitir sanções',
                    items: [
                      'OBRIGATÓRIO NO INSUCESSO: Comunicar sanções mesmo quando o cliente NÃO fechar acordo.',
                      'Repassar canais e horários de atendimento (-2 pts se omitir).',
                      'Tabulação correta: SEM PREVISÃO DE PAGAMENTO.'
                    ]
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ESTÁGIO 4 ================= */}
      {activeStage === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Fechamento */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Etapa 4.1 · Fechamento do Acordo
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Confirmação Formal dos Dados da Negociação
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-8">
                <SpeechCard
                  speech={`Excelente, Sr.(a) ${vars.nomeCliente}! Confirmando os dados do nosso acordo: parcela(s) número ${vars.parcelasAtraso}, no valor final acordado de R$ ${vars.valorAcordo}, com vencimento para o dia ${vars.dataAcordo}. O boleto será disponibilizado através do seu ${vars.canalEnvio} cadastrado (${vars.canalEnvio === 'WhatsApp' ? vars.telefoneCliente : vars.emailCliente}).`}
                  onCopySuccess={() => onToast('Fala do fechamento copiada!')}
                />
              </div>
              <div className="lg:col-span-4">
                <QualityAlertBox
                  alert={{
                    title: 'Dados do Acordo',
                    badge: '-5 Pts',
                    type: 'warning',
                    pointsDeduction: '-5 pontos por omissão',
                    items: [
                      'Verbalizar valor acordado em reais.',
                      'Verbalizar vencimento (dia e mês).',
                      'Verbalizar canal de envio do boleto (WhatsApp ou E-mail).'
                    ]
                  }}
                />
              </div>
            </div>
          </div>

          {/* Diretrizes Antifraude */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Etapa 4.2 · Orientações Antifraude Obrigatórias
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Conferência de Segurança Contra Golpes (Sucesso e Insucesso)
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-8">
                <SpeechCard
                  label="Orientações Antifraude ao Cliente"
                  speech={`Para a sua total segurança financeira, anote com atenção as orientações de conferência do seu boleto:\n\n1. Senha do PDF: É o número completo do seu CPF ou CNPJ (sem pontos ou traços);\n2. Beneficiário Oficial: Deve constar exclusivamente BANCO GM S/A. Nunca realize pagamentos com beneficiário em nome de pessoa física;\n3. Banco Emissor: É sempre o Banco ITAÚ;\n4. Linha Digitável: O código de barras sempre inicia com 34191 e termina exatamente com os números do valor do boleto;\n5. Sem Pix ou TED: A GM Financial NÃO recebe pagamentos via Pix ou TED, nem por plataformas como Mercado Pago ou PagSeguro;\n6. Ativação: Aguarde 90 minutos após o recebimento para realizar o pagamento devido ao registro bancário;\n7. Compensação: A baixa no sistema ocorre em até 02 dias úteis e a baixa nos órgãos de proteção em até 5 dias úteis.`}
                  onCopySuccess={() => onToast('Roteiro Antifraude copiado!')}
                />
              </div>
              <div className="lg:col-span-4">
                <QualityAlertBox
                  alert={{
                    title: 'Alerta Antifraude',
                    badge: '-11 Pts',
                    type: 'critical',
                    pointsDeduction: '-11 pontos se omitir',
                    items: [
                      'Senha = CPF/CNPJ completo sem pontuação.',
                      'Beneficiário = BANCO GM S/A.',
                      'Emissor = Banco Itaú.',
                      'Início = 34191 / Final = Valor em reais.',
                      'NÃO aceitamos Pix ou TED!',
                      'Aplicável em Sucesso e Insucesso.'
                    ]
                  }}
                />
              </div>
            </div>
          </div>

          {/* Sanções e Canais */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Etapa 4.3 · Sanções por Quebra e Canais de Retorno
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Consequências do Descumprimento e Encerramento Cordial
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-8">
                <SpeechCard
                  speech={`Ressaltamos que a quebra deste acordo ou a falta de pagamento na data acarretará na perda da campanha de descontos, incidência de juros diários (0,433% ao dia) e multa de 2%, continuidade dos contatos de cobrança e o prosseguimento das medidas judiciais cabíveis, como o ajuizamento da ação e a busca e apreensão do veículo ${vars.modeloVeiculo}.\n\nCaso precise nos contatar para confirmar o recebimento ou tirar dúvidas, nossos canais oficiais são o WhatsApp (11) 3185-8052 e o telefone gratuito 0800 056 2410, de segunda a sexta das 08h às 20h e sábados das 08h às 14h. Alguma dúvida adicional? Agradeço sua atenção e tenha um ótimo dia!`}
                  onCopySuccess={() => onToast('Fala final copiada!')}
                />
              </div>
              <div className="lg:col-span-4">
                <QualityAlertBox
                  alert={{
                    title: 'Sanções e Canais',
                    badge: '-13 Pts Total',
                    type: 'warning',
                    items: [
                      'Sanções por Atraso: alertar sobre perda do desconto, juros e ajuizamento (-11 pts).',
                      'Canais & Horários: 0800, WhatsApp e horário (08h às 20h / sáb 08h às 14h). Omitir custa -2 pts.'
                    ]
                  }}
                />
              </div>
            </div>

            {/* Ações de Tabulação */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  onToast('Tabulação Registrada: PROMESSA DE PAGAMENTO');
                  onSelectStage(1);
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finalizar Atendimento: Tabular PROMESSA DE PAGAMENTO</span>
              </button>

              <button
                onClick={() => onSelectStage(1)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Roteiro para Nova Ligação</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )}
</div>
);
};
