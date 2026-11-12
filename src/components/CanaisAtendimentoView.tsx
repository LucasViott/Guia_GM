import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Clock,
  Check,
  Copy,
  Shield,
  Smartphone,
  AlertTriangle,
  Building2,
  Calendar,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const CanaisAtendimentoView: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Geral da Aba */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
          <Phone className="w-4 h-4" />
          <span>Comunicação e Diretrizes Regulatórias</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Canais de Atendimento
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Pontos de contato oficiais da GM Financial e da assessoria Bulgarelli Advogados, canais de envio de documentos e horários regulamentares de acionamento.
        </p>
      </div>

      {/* BLOCO 1: E-MAILS & CANAIS OFICIAIS */}
      <div className="bg-white border border-blue-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5 bg-gradient-to-br from-white via-blue-50/20 to-white">
        <div className="flex items-center justify-between pb-3 border-b border-blue-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-blue-100 text-blue-700">
                <Mail className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                E-mails & Canais Oficiais
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Canais institucionais homologados para envio de documentos, suporte ao cliente e sinistros.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* E-mail CAC GM Financial */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                  CAC GM Financial · Envio de Documentos
                </span>
                <span className="font-extrabold text-slate-900 text-sm block mt-0.5">
                  Boletim de Ocorrência & Certidão de Óbito
                </span>
              </div>
              <button
                onClick={() => handleCopy('documentos.cac@central.gmfinancial.com', 'email_cac')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors shrink-0"
                title="Copiar e-mail"
              >
                {copiedKey === 'email_cac' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar E-mail</span>
                  </>
                )}
              </button>
            </div>
            <div className="mt-2.5 p-2 bg-slate-50 rounded-lg border border-slate-200/80 font-mono text-xs font-bold text-slate-800 break-all">
              documentos.cac@central.gmfinancial.com
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Utilizado para encaminhar evidências de fraude/desconhecimento de dívida e certidões de óbito do titular.
            </p>
          </div>

          {/* Central Telefônica 0800 */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                  Central Telefônica Gratuita
                </span>
                <span className="font-extrabold text-slate-900 text-sm block mt-0.5">
                  Linha 0800 para Retorno e Informações
                </span>
              </div>
              <button
                onClick={() => handleCopy('0800 056 2410', 'tel_0800')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors shrink-0"
                title="Copiar telefone 0800"
              >
                {copiedKey === 'tel_0800' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Número</span>
                  </>
                )}
              </button>
            </div>
            <div className="mt-2.5 p-2 bg-slate-50 rounded-lg border border-slate-200/80 font-mono text-xs font-bold text-slate-800">
              0800 056 2410
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Canal gratuito informado obrigatoriamente no fechamento e nos recados com terceiros.
            </p>
          </div>

          {/* WhatsApp Oficial da Assessoria */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Canal Digital Oficial
                </span>
                <span className="font-extrabold text-slate-900 text-sm block mt-0.5">
                  WhatsApp Bulgarelli Advogados
                </span>
              </div>
              <button
                onClick={() => handleCopy('(11) 3185-8052', 'whatsapp')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors shrink-0"
                title="Copiar WhatsApp"
              >
                {copiedKey === 'whatsapp' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar WhatsApp</span>
                  </>
                )}
              </button>
            </div>
            <div className="mt-2.5 p-2 bg-emerald-50/60 rounded-lg border border-emerald-200 font-mono text-xs font-bold text-emerald-900">
              (11) 3185-8052
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Envio homologado de boletos em PDF, código de barras digitável e atendimento de suporte digital.
            </p>
          </div>

          {/* Seguradora MetLife */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                  Seguro Prestamista
                </span>
                <span className="font-extrabold text-slate-900 text-sm block mt-0.5">
                  Central de Sinistros MetLife
                </span>
              </div>
              <button
                onClick={() => handleCopy('3004-9329 / 0800 727 9329', 'metlife')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors shrink-0"
                title="Copiar telefones MetLife"
              >
                {copiedKey === 'metlife' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Contatos</span>
                  </>
                )}
              </button>
            </div>
            <div className="mt-2.5 p-2 bg-slate-50 rounded-lg border border-slate-200/80 font-mono text-xs font-bold text-slate-800">
              3004-9329 (Capitais) / 0800 727 9329 (Demais)
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Para abertura de sinistro de falecimento em contratos com cobertura prestamista ativa.
            </p>
          </div>
        </div>
      </div>

      {/* BLOCO 2: HORÁRIOS REGULAMENTARES DO DISCADOR & ACIONAMENTO */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-amber-100 text-amber-800">
                <Clock className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                Horários Regulamentares do Discador & Acionamento
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Limites legais de acionamento em estrita conformidade com o CDC, Autorregulação Febraban e Procon.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Segunda a Sexta */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
              Dias Úteis
            </span>
            <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
              Segunda a Sexta-feira
            </h4>
            <div className="mt-3 py-2 px-3 bg-white rounded-lg border border-slate-200 inline-block font-mono text-base font-extrabold text-blue-700">
              08h00 às 20h00
            </div>
            <p className="text-xs text-slate-600 mt-3">
              Período legal para acionamento ativo via discador e ligações manuais de cobrança amigável.
            </p>
          </div>

          {/* Sábados */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
              Fim de Semana
            </span>
            <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
              Sábados
            </h4>
            <div className="mt-3 py-2 px-3 bg-white rounded-lg border border-slate-200 inline-block font-mono text-base font-extrabold text-amber-700">
              08h00 às 14h00
            </div>
            <p className="text-xs text-slate-600 mt-3">
              Horário reduzido obrigatório aos sábados. Ligações após às 14h00 são expressamente vedadas.
            </p>
          </div>

          {/* Domingos e Feriados */}
          <div className="p-4 bg-red-50/70 rounded-xl border border-red-200">
            <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider block">
              Vedação Legal Absoluta
            </span>
            <h4 className="text-base font-extrabold text-red-950 mt-0.5">
              Domingos e Feriados
            </h4>
            <div className="mt-3 py-2 px-3 bg-white rounded-lg border border-red-200 inline-block font-mono text-sm font-extrabold text-red-700">
              Acionamento Proibido por Lei
            </div>
            <p className="text-xs text-red-800 mt-3">
              Bloqueio sistêmico permanente. É estritamente proibido qualquer contato de cobrança ativa.
            </p>
          </div>
        </div>

        {/* Diretrizes Operacionais e Normativas */}
        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2.5">
          <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
            ⚖️ Diretrizes Obrigatórias de Conformidade Regulamentar:
          </span>
          <ul className="space-y-1.5 pl-1">
            <li className="flex items-start gap-1.5">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Fuso Horário do Cliente:</strong> Para clientes residentes em estados com fuso horário diferenciado (ex.: Amazonas, Acre, Mato Grosso, Rondônia), o operador deve respeitar o horário local do cliente, evitando acionamentos precoces antes das 08h00 locais.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Limite de Tentativas:</strong> O sistema de discagem respeita o limite estipulado pelas regras de autorregulação para evitar caracterização de excesso ou perturbação de sossego.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Agendamento Específico:</strong> Caso o cliente atenda e solicite agendamento para horário conveniente dentro da faixa legal, utilize a tabulação <strong>Agendamento (Cód. 6)</strong> especificando a data e o horário acordados.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
