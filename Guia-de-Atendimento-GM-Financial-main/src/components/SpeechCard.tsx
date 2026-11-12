import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Send, Smartphone } from 'lucide-react';

interface SpeechCardProps {
  label?: string;
  speech: string;
  note?: string;
  digitalMessage?: string; // Optional custom digital template
  onCopySuccess?: () => void;
}

export const SpeechCard: React.FC<SpeechCardProps> = ({
  label = 'Fala Sugerida ao Atendente',
  speech,
  note,
  digitalMessage,
  onCopySuccess
}) => {
  const [copiedType, setCopiedType] = useState<'speech' | 'digital' | null>(null);

  // Formats text specifically for digital channels (WhatsApp, SMS, Chat, Web)
  const getFormattedDigitalText = (): string => {
    if (digitalMessage) return digitalMessage;
    
    // Clean text for digital sending:
    // 1. Remove wrapping quotes
    // 2. Adjust verbal greeting "Bom dia/Boa tarde," to "Olá,"
    // 3. Keep clear paragraphs and line breaks
    let clean = speech.trim();
    if (clean.startsWith('"') && clean.endsWith('"')) {
      clean = clean.slice(1, -1);
    }
    clean = clean.replace(/^Bom dia\/Boa tarde,?\s*/i, 'Olá, ');
    return clean;
  };

  const handleCopySpeech = async () => {
    try {
      await navigator.clipboard.writeText(speech);
      setCopiedType('speech');
      if (onCopySuccess) onCopySuccess();
      setTimeout(() => setCopiedType(null), 2200);
    } catch (err) {
      console.error('Falha ao copiar fala:', err);
    }
  };

  const handleCopyDigital = async () => {
    try {
      const digitalText = getFormattedDigitalText();
      await navigator.clipboard.writeText(digitalText);
      setCopiedType('digital');
      if (onCopySuccess) onCopySuccess();
      setTimeout(() => setCopiedType(null), 2200);
    } catch (err) {
      console.error('Falha ao copiar mensagem digital:', err);
    }
  };

  return (
    <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 sm:p-5 relative group transition-colors hover:border-blue-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 mb-3 border-b border-blue-200/60">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-800 tracking-wide uppercase">
          <MessageSquare className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>{label}</span>
        </div>

        {/* Botões de Ação: Copiar Fala Verbal e Copiar Mensagem para Envio Digital */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Botão Copiar para Envio Digital (WhatsApp / SMS / Chat) */}
          <button
            onClick={handleCopyDigital}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer shadow-2xs ${
              copiedType === 'digital'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
            }`}
            title="Copiar mensagem formatada para WhatsApp, SMS ou Chat digital"
          >
            {copiedType === 'digital' ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span className="font-bold">Mensagem Copiada!</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copiar p/ Envio Digital</span>
              </>
            )}
          </button>

          {/* Botão Copiar Fala */}
          <button
            onClick={handleCopySpeech}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer shadow-2xs ${
              copiedType === 'speech'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
            }`}
            title="Copiar transcrição completa da fala para o operador"
          >
            {copiedType === 'speech' ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span className="font-bold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-blue-500" />
                <span>Copiar fala</span>
              </>
            )}
          </button>
        </div>
      </div>

      <p className="text-sm sm:text-base leading-relaxed text-blue-950 font-normal select-text whitespace-pre-line">
        "{speech}"
      </p>

      {note && (
        <div className="mt-3 pt-2.5 border-t border-blue-200/50 text-xs text-slate-600">
          <span className="font-bold text-slate-800">Nota Operacional: </span>
          {note}
        </div>
      )}
    </div>
  );
};
