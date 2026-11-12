import React, { useState } from 'react';
import {
  Keyboard,
  Search,
  Check,
  Copy,
  Info,
  Layers,
  ArrowRight,
  Sparkles,
  Command
} from 'lucide-react';

interface ShortcutItem {
  tecla: string;
  aba: string;
  paraQueServe: string;
  categoria: 'direta' | 'combinacao';
  tag: string;
}

const SHORTCUTS_DATA: ShortcutItem[] = [
  // 1. Teclas de Função Diretas (Navegação de Abas)
  {
    tecla: 'F1',
    aba: 'Cadastro',
    paraQueServe: 'Consultar dados pessoais do cliente (Nome, CPF/CNPJ, RG, Filiação, Profissão, Idade, Score, etc.).',
    categoria: 'direta',
    tag: 'Dados Pessoais'
  },
  {
    tecla: 'F2',
    aba: 'Endereço',
    paraQueServe: 'Verificar e atualizar contatos do cliente (Logradouros, Telefones, E-mails) e checar o status de confirmação de cada um.',
    categoria: 'direta',
    tag: 'Contatos & Telefones'
  },
  {
    tecla: 'F3',
    aba: 'Avalista',
    paraQueServe: 'Consultar os dados de fiadores, co-obrigados ou garantidores vinculados ao contrato em cobrança.',
    categoria: 'direta',
    tag: 'Garantidores'
  },
  {
    tecla: 'F4',
    aba: 'Dados Bem',
    paraQueServe: 'Visualizar informações da garantia atrelada ao contrato (ex: Marca, Modelo, Placa e Chassi em financiamento de veículos).',
    categoria: 'direta',
    tag: 'Veículo & Garantia'
  },
  {
    tecla: 'F5',
    aba: 'Histórico',
    paraQueServe: 'Acompanhar o log de ações, negociações passadas, andamentos de cobrança (ex: sem condições, envio de e-mail) e andamentos jurídicos.',
    categoria: 'direta',
    tag: 'Log de Ações'
  },
  {
    tecla: 'F6',
    aba: 'Movimento',
    paraQueServe: 'Conferir detalhadamente a composição da dívida (valor principal, juros, correções, dias de atraso e o saldo devedor total).',
    categoria: 'direta',
    tag: 'Composição da Dívida'
  },
  {
    tecla: 'F7',
    aba: 'Cálculo',
    paraQueServe: 'Simular opções de negociação, aplicar alçadas de desconto permitidas e projetar as parcelas e datas de vencimento do acordo.',
    categoria: 'direta',
    tag: 'Simulação & Descontos'
  },
  {
    tecla: 'F8',
    aba: 'Acordo',
    paraQueServe: 'Efetivar a negociação concluída, definir a forma de envio do boleto (ex: FC E-MAIL) e gravar a promessa de pagamento.',
    categoria: 'direta',
    tag: 'Efetivação de Acordo'
  },
  {
    tecla: 'F9',
    aba: 'Busca',
    paraQueServe: 'Pesquisar novos clientes, CPFs, CNPJs ou números de contratos específicos na base de dados (carteira).',
    categoria: 'direta',
    tag: 'Pesquisa na Carteira'
  },
  {
    tecla: 'F10',
    aba: 'Últimos',
    paraQueServe: 'Acessar o histórico recente de contratos ou clientes recém-trabalhados pelo operador na sessão atual.',
    categoria: 'direta',
    tag: 'Contratos Recentes'
  },
  {
    tecla: 'F11',
    aba: 'Próximo',
    paraQueServe: 'Avançar automaticamente para o próximo cliente/contrato na fila de acionamento da régua de cobrança.',
    categoria: 'direta',
    tag: 'Fila do Discador'
  },
  // 2. Combinações com Teclas "F"
  {
    tecla: 'Ctrl + F1',
    aba: 'Anotações',
    paraQueServe: 'Inserir observações textuais livres (ex: particularidades do contato). O texto fica salvo no login do operador para uso posterior.',
    categoria: 'combinacao',
    tag: 'Bloco de Notas do Operador'
  },
  {
    tecla: 'Ctrl + F12',
    aba: 'Sair',
    paraQueServe: 'Encerrar a tela de operação atual com segurança e retornar à tela inicial/login do sistema.',
    categoria: 'combinacao',
    tag: 'Logout / Encerramento'
  }
];

export const InformacoesSistemaView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedTecla, setCopiedTecla] = useState<string | null>(null);

  const handleCopyTecla = (tecla: string) => {
    navigator.clipboard.writeText(tecla);
    setCopiedTecla(tecla);
    setTimeout(() => setCopiedTecla(null), 1800);
  };

  const filteredShortcuts = SHORTCUTS_DATA.filter(item => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      item.tecla.toLowerCase().includes(q) ||
      item.aba.toLowerCase().includes(q) ||
      item.paraQueServe.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q)
    );
  });

  const diretas = filteredShortcuts.filter(s => s.categoria === 'direta');
  const combinacoes = filteredShortcuts.filter(s => s.categoria === 'combinacao');

  return (
    <div className="space-y-6">
      {/* Header Geral da Aba */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
          <Keyboard className="w-4 h-4" />
          <span>Mapeamento Oficial de Teclas de Atalho</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Resumo de Atalhos "F" - Sistema CSLOG
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
          Mapeamento atualizado dos atalhos de teclado extraídos do sistema CSLOG, incluindo a finalidade prática (o que é possível verificar ou executar) em cada módulo.
        </p>

        {/* Barra de Pesquisa Rápida */}
        <div className="mt-4 relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar atalho por tecla, aba ou função (ex: F7, Cálculo, Bem, Ctrl)..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20 bg-slate-50/70 focus:bg-white text-slate-900 transition-all placeholder:text-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* BLOCO 1: TECLAS DE FUNÇÃO DIRETAS (F1 A F11) */}
      {diretas.length > 0 && (
        <div className="bg-white border border-blue-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-blue-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Teclas de Função Diretas (Navegação de Abas)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Pressione a tecla de função correspondente para transitar instantaneamente entre as abas do CSLOG.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
              {diretas.length} {diretas.length === 1 ? 'atalho' : 'atalhos'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {diretas.map(item => (
              <div
                key={item.tecla}
                className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <kbd className="px-2.5 py-1 bg-slate-900 text-white font-mono font-black text-xs rounded-md shadow-inner tracking-wide border-b-2 border-slate-700">
                        {item.tecla}
                      </kbd>
                      <span className="font-extrabold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                        Aba {item.aba}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                    {item.paraQueServe}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-medium text-slate-500">Módulo CSLOG</span>
                  <button
                    onClick={() => handleCopyTecla(item.tecla)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                    title="Copiar atalho"
                  >
                    {copiedTecla === item.tecla ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar tecla</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BLOCO 2: COMBINAÇÕES COM TECLAS "F" */}
      {combinacoes.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Combinações com Teclas "F"
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Atalhos combinados com a tecla Ctrl para funções operacionais e encerramento seguro.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 self-start sm:self-auto">
              {combinacoes.length} combinações
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {combinacoes.map(item => (
              <div
                key={item.tecla}
                className="bg-white rounded-xl border border-indigo-100 p-4 sm:p-5 shadow-2xs hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <kbd className="px-3 py-1 bg-indigo-900 text-white font-mono font-black text-xs rounded-md shadow-inner tracking-wide border-b-2 border-indigo-700">
                        {item.tecla}
                      </kbd>
                      <span className="font-extrabold text-sm text-slate-900">
                        {item.aba}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed mt-2.5">
                    {item.paraQueServe}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-medium text-slate-500">Ação de Teclado</span>
                  <button
                    onClick={() => handleCopyTecla(item.tecla)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                    title="Copiar atalho"
                  >
                    {copiedTecla === item.tecla ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar tecla</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabela de Referência Rápida */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
          <Info className="w-4 h-4 text-blue-600" />
          <h4 className="text-sm font-bold text-slate-900">
            Dica Prática para o Operador no Sistema CSLOG
          </h4>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          O domínio das teclas de função acelera em até 40% o tempo médio de atendimento (TMA) e evita erros de tabulação. Antes de formular a proposta ao cliente, acesse <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-300 font-mono text-[11px]">F6</kbd> (Movimento) para checar o saldo e <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-300 font-mono text-[11px]">F7</kbd> (Cálculo) para verificar as alçadas permitidas. Concluída a negociação, finalize com <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-300 font-mono text-[11px]">F8</kbd> (Acordo).
        </p>
      </div>
    </div>
  );
};
