import React, { useState } from 'react';
import { Sliders, RotateCcw, ChevronDown, ChevronUp, User, Car, Calendar, DollarSign, Phone, Mail } from 'lucide-react';
import { DynamicVars, initialDynamicVars } from '../data/guideData';

interface DynamicVariablesBarProps {
  vars: DynamicVars;
  onChange: (updated: DynamicVars) => void;
}

export const DynamicVariablesBar: React.FC<DynamicVariablesBarProps> = ({ vars, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (field: keyof DynamicVars, value: string) => {
    onChange({
      ...vars,
      [field]: value
    });
  };

  const handleReset = () => {
    onChange(initialDynamicVars);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl mb-6 shadow-xs overflow-hidden transition-all">
      <div className="p-3.5 sm:px-5 flex items-center justify-between gap-4 bg-slate-50/80 border-b border-slate-200/80">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Campos Dinâmicos da Ligação (Preenchimento em Tempo Real)
              </span>
              <span className="hidden sm:inline-block text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Gera roteiro com dados reais
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Cliente atual: <strong className="text-slate-700">{vars.nomeCliente}</strong> · Veículo: <strong className="text-slate-700">{vars.modeloVeiculo}</strong> · Valor: <strong className="text-slate-700 font-mono">R$ {vars.valorAtualizado}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 px-2.5 py-1 rounded hover:bg-slate-200/60 transition-colors flex items-center gap-1"
            title="Restaurar dados de exemplo padrão"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Restaurar</span>
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>{isOpen ? 'Recolher Campos' : 'Editar Dados'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 sm:p-5 bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Nome do Cliente:
            </label>
            <input
              type="text"
              value={vars.nomeCliente}
              onChange={(e) => handleChange('nomeCliente', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50/50"
              placeholder="Ex: Carlos Eduardo Silva"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Seu Primeiro Nome (Operador):
            </label>
            <input
              type="text"
              value={vars.primeiroNomeOperador}
              onChange={(e) => handleChange('primeiroNomeOperador', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50/50"
              placeholder="Ex: Lucas"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-slate-400" />
              Modelo do Veículo:
            </label>
            <input
              type="text"
              value={vars.modeloVeiculo}
              onChange={(e) => handleChange('modeloVeiculo', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50/50"
              placeholder="Ex: Onix Plus LTZ"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Parcelas Vencidas:
            </label>
            <input
              type="text"
              value={vars.parcelasAtraso}
              onChange={(e) => handleChange('parcelasAtraso', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50/50 font-mono"
              placeholder="Ex: 08 e 09"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Vencimento Original Antigo:
            </label>
            <input
              type="text"
              value={vars.vencimentoOriginal}
              onChange={(e) => handleChange('vencimentoOriginal', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50/50 font-mono"
              placeholder="Ex: 15/09"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Dias em Atraso:
            </label>
            <input
              type="text"
              value={vars.diasAtraso}
              onChange={(e) => handleChange('diasAtraso', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50/50 font-mono"
              placeholder="Ex: 48"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" />
              Valor Atualizado Total (R$):
            </label>
            <input
              type="text"
              value={vars.valorAtualizado}
              onChange={(e) => handleChange('valorAtualizado', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50/50 font-mono"
              placeholder="Ex: 2.840,50"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" />
              Valor com Acordo (R$):
            </label>
            <input
              type="text"
              value={vars.valorAcordo}
              onChange={(e) => handleChange('valorAcordo', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50/50 font-mono"
              placeholder="Ex: 2.490,00"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Data do Acordo (Vencimento):
            </label>
            <input
              type="text"
              value={vars.dataAcordo}
              onChange={(e) => handleChange('dataAcordo', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50/50 font-mono"
              placeholder="Ex: 10/11"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">
              Canal de Envio do Boleto:
            </label>
            <select
              value={vars.canalEnvio}
              onChange={(e) => handleChange('canalEnvio', e.target.value as 'WhatsApp' | 'E-mail')}
              className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50/50"
            >
              <option value="WhatsApp">WhatsApp Oficial (11) 3185-8052</option>
              <option value="E-mail">E-mail Cadastrado</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              E-mail do Cliente:
            </label>
            <input
              type="text"
              value={vars.emailCliente}
              onChange={(e) => handleChange('emailCliente', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50/50"
              placeholder="Ex: cliente@email.com"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              Telefone WhatsApp:
            </label>
            <input
              type="text"
              value={vars.telefoneCliente}
              onChange={(e) => handleChange('telefoneCliente', e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-blue-500 text-slate-900 bg-slate-50/50 font-mono"
              placeholder="Ex: (11) 98765-4321"
            />
          </div>
        </div>
      )}
    </div>
  );
};
