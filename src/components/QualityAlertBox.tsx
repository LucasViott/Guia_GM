import React from 'react';
import { ShieldAlert, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { QualityAlert } from '../data/guideData';

interface QualityAlertBoxProps {
  alert: QualityAlert;
}

export const QualityAlertBox: React.FC<QualityAlertBoxProps> = ({ alert }) => {
  const isCritical = alert.type === 'critical';
  const isWarning = alert.type === 'warning';

  return (
    <div
      className={`rounded-xl border p-4 text-xs transition-shadow ${
        isCritical
          ? 'bg-red-50/80 border-red-200 text-red-950 shadow-xs'
          : isWarning
          ? 'bg-amber-50/80 border-amber-200 text-amber-950 shadow-xs'
          : 'bg-blue-50/80 border-blue-200 text-blue-950 shadow-xs'
      }`}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/10">
        <div className="flex items-center gap-1.5 font-bold tracking-tight uppercase">
          {isCritical ? (
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
          ) : isWarning ? (
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
          )}
          <span>{alert.title}</span>
        </div>
        <span
          className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
            isCritical
              ? 'bg-red-100 text-red-700'
              : isWarning
              ? 'bg-amber-100 text-amber-800'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {alert.badge}
        </span>
      </div>

      <ul className="space-y-1.5 leading-relaxed text-slate-700">
        {alert.items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-1.5">
            <span
              className={`font-bold text-sm leading-none shrink-0 ${
                isCritical
                  ? 'text-red-600'
                  : isWarning
                  ? 'text-amber-600'
                  : 'text-blue-600'
              }`}
            >
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {alert.pointsDeduction && (
        <div className="mt-2.5 pt-2 border-t border-black/5 font-semibold text-[11px] text-red-700 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Penalidade: {alert.pointsDeduction}</span>
        </div>
      )}
    </div>
  );
};
