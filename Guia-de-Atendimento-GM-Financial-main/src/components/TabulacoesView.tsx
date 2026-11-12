import React, { useState } from 'react';
import {
  Tag,
  AlertTriangle,
  PhoneOff,
  PhoneMissed,
  VolumeX,
  CheckCircle,
  Receipt,
  MessageSquare,
  UserX,
  ShieldAlert,
  Calendar,
  Clock,
  RefreshCw,
  FileCheck,
  Search,
  Info,
  FileText,
  XCircle,
  PhoneForwarded,
  Voicemail,
  Scale,
  Truck,
  Send,
  CornerUpLeft,
  AlertCircle,
  Users,
  Globe,
  HelpCircle
} from 'lucide-react';
import { TABULACOES_DATA } from '../data/guideData';

export const TabulacoesView: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [showOnlyNCG, setShowOnlyNCG] = useState(false);

  const filteredTabs = TABULACOES_DATA.filter(tab => {
    const matchesQuery =
      tab.codigo.toLowerCase().includes(filterQuery.toLowerCase()) ||
      tab.nome.toLowerCase().includes(filterQuery.toLowerCase()) ||
      (tab.observacao && tab.observacao.toLowerCase().includes(filterQuery.toLowerCase())) ||
      tab.quandoUsar.toLowerCase().includes(filterQuery.toLowerCase());
    
    if (showOnlyNCG) {
      return matchesQuery && tab.riscoNCG;
    }
    return matchesQuery;
  });

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'calendar': return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'shield-alert': return <ShieldAlert className="w-4 h-4 text-red-600" />;
      case 'receipt': return <Receipt className="w-4 h-4 text-emerald-600" />;
      case 'user-x': return <UserX className="w-4 h-4 text-slate-600" />;
      case 'message-square': return <MessageSquare className="w-4 h-4 text-amber-600" />;
      case 'calendar-check': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'clock': return <Clock className="w-4 h-4 text-indigo-600" />;
      case 'phone-off': return <PhoneOff className="w-4 h-4 text-red-600" />;
      case 'phone-missed': return <PhoneMissed className="w-4 h-4 text-amber-600" />;
      case 'refresh-cw': return <RefreshCw className="w-4 h-4 text-teal-600" />;
      case 'file-check': return <FileCheck className="w-4 h-4 text-emerald-600" />;
      case 'file-text': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'x-circle': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'phone-forwarded': return <PhoneForwarded className="w-4 h-4 text-blue-600" />;
      case 'voicemail': return <Voicemail className="w-4 h-4 text-slate-500" />;
      case 'scale': return <Scale className="w-4 h-4 text-amber-700" />;
      case 'truck': return <Truck className="w-4 h-4 text-indigo-600" />;
      case 'send': return <Send className="w-4 h-4 text-blue-600" />;
      case 'corner-up-left': return <CornerUpLeft className="w-4 h-4 text-slate-600" />;
      case 'alert-circle': return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case 'users': return <Users className="w-4 h-4 text-indigo-600" />;
      case 'globe': return <Globe className="w-4 h-4 text-teal-600" />;
      case 'help-circle': return <HelpCircle className="w-4 h-4 text-purple-600" />;
      case 'alert-triangle': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Tag className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
          <Tag className="w-4 h-4" />
          <span>Diretrizes Oficiais de Tabulação</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Tabela Oficial de Códigos & Ocorrências
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Relação cadastrada de ocorrências no discador/CRM. O registro incorreto de tabulação configura <strong>NCG (Não Conformidade Grave)</strong> e zera a monitoria.
        </p>

        {/* Barra de Filtro Local */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filtrar por código (ex: 508, 6, 424) ou nome..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400 bg-slate-50/50"
            />
          </div>

          <button
            onClick={() => setShowOnlyNCG(!showOnlyNCG)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
              showOnlyNCG
                ? 'bg-red-50 border-red-300 text-red-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>{showOnlyNCG ? 'Exibindo Apenas Riscos de NCG' : 'Filtrar Riscos de NCG'}</span>
          </button>
        </div>
      </div>

      {/* Grid de Cards de Tabulação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTabs.map(tab => (
          <div
            key={tab.codigo}
            className={`bg-white border rounded-xl p-5 shadow-xs transition-all flex flex-col justify-between ${
              tab.riscoNCG
                ? 'border-red-300 ring-1 ring-red-200 bg-red-50/15'
                : 'border-slate-200 hover:border-blue-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    {getIcon(tab.iconeTipo)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Código no Sistema
                    </span>
                    <span
                      className={`font-mono font-extrabold text-sm px-2.5 py-0.5 rounded-md inline-block shadow-2xs ${
                        tab.riscoNCG
                          ? 'bg-red-600 text-white'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {tab.codigo}
                    </span>
                  </div>
                </div>

                {tab.riscoNCG && (
                  <span className="text-[11px] font-bold text-red-700 bg-red-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Risco de NCG</span>
                  </span>
                )}
              </div>

              {/* Nome Oficial */}
              <h3 className="text-base font-bold text-slate-900 mb-2.5">
                {tab.nome}
              </h3>

              {/* Detalhamento Adicional */}
              <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <div>
                  <strong className="text-slate-800">Quando Utilizar: </strong>
                  {tab.quandoUsar}
                </div>
                <div>
                  <strong className={tab.riscoNCG ? 'text-red-700' : 'text-slate-800'}>
                    Atenção & Restrições: </strong>
                  {tab.restricoes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
