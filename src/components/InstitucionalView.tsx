import React from 'react';
import { Building2, Shield, Info, Phone, ExternalLink } from 'lucide-react';

export const InstitucionalView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
          <Building2 className="w-4 h-4" />
          <span>Institucional & Governança</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          GM Financial & Bulgarelli Advogados
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Papéis, representação jurídica e conformidade regulatória perante o cliente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-3 pb-3 mb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
              GM
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">GM Financial</h3>
              <p className="text-xs text-slate-500">Banco General Motors S/A</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            A <strong>GM Financial</strong> é a instituição financeira cativa da General Motors no Brasil. Atua no financiamento direto de veículos novos e seminovos em toda a rede de concessionárias Chevrolet.
          </p>
          <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-1">
            <div>• Razão Social: Banco GM S/A</div>
            <div>• Banco Emissor Oficial dos Boletos: Banco Itaú</div>
            <div>• Código Bancário da Linha Digitável: 34191</div>
            <div>• Portal Oficial: www.gmfinancial.com.br</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-3 pb-3 mb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
              BA
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Bulgarelli Advogados</h3>
              <p className="text-xs text-slate-500">Assessoria Jurídica de Cobrança Credenciada</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            A <strong>Bulgarelli Advogados</strong> é o escritório de advocacia parceiro responsável pela recuperação amigável, conciliação e condução processual das carteiras de financiamento da GM Financial.
          </p>
          <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-1">
            <div>• Telefone Gratuito: 0800 056 2410</div>
            <div>• WhatsApp Oficial: (11) 3185-8052</div>
            <div>• Atendimento: Seg a Sex 08h às 20h · Sáb 08h às 14h</div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-5 text-xs text-blue-950 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="block text-sm font-bold text-blue-900 mb-0.5">
            Regra Fundamental de Apresentação em Todas as Chamadas:
          </strong>
          O operador deve impreterivelmente se apresentar como membro da <strong>Bulgarelli Advogados a serviço / em nome da GM Financial</strong>. Nunca diga que é funcionário direto do banco, mas deixe claro que representa oficialmente a financeira.
        </div>
      </div>
    </div>
  );
};
