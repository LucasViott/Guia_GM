import React, { useState, useEffect } from 'react';
import {
  FileText,
  Scale,
  FileCheck,
  BookOpen,
  TrendingUp,
  Tag,
  Building2,
  Search,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Laptop,
  Phone,
  Moon,
  Sun,
  X
} from 'lucide-react';
import { DynamicVars, initialDynamicVars } from './data/guideData';
import { DynamicVariablesBar } from './components/DynamicVariablesBar';
import { ScriptLinearView } from './components/ScriptLinearView';
import { MonitoriaView } from './components/MonitoriaView';
import { InformacoesSistemaView } from './components/InformacoesSistemaView';
import { ProcedimentosView } from './components/ProcedimentosView';
import { TermosJuridicosView } from './components/TermosJuridicosView';
import { CanaisAtendimentoView } from './components/CanaisAtendimentoView';
import { DicasView } from './components/DicasView';
import { TabulacoesView } from './components/TabulacoesView';
import { InstitucionalView } from './components/InstitucionalView';
import { OperationalMuralModal } from './components/OperationalMuralModal';
import { SearchResultsView } from './components/SearchResultsView';
import { FloatingChecklist } from './components/FloatingChecklist';

type TabType =
  | 'script'
  | 'monitoria'
  | 'sistema'
  | 'procedimentos'
  | 'termos_judiciais'
  | 'canais'
  | 'dicas'
  | 'tabulacoes'
  | 'institucional';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('script');
  const [activeStage, setActiveStage] = useState<number>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isMuralOpen, setIsMuralOpen] = useState<boolean>(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dark Mode Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('gm_theme_mode');
    if (saved) return saved === 'dark';
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sync dark class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('gm_theme_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('gm_theme_mode', 'light');
    }
  }, [isDarkMode]);

  // Dynamic values saved in state/localStorage
  const [dynamicVars, setDynamicVars] = useState<DynamicVars>(() => {
    const saved = localStorage.getItem('gm_dynamic_vars');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialDynamicVars;
      }
    }
    return initialDynamicVars;
  });

  // Persist variables
  useEffect(() => {
    localStorage.setItem('gm_dynamic_vars', JSON.stringify(dynamicVars));
  }, [dynamicVars]);

  // Toast auto-clear
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) searchInput.focus();
      }
      if (e.key === 'Escape') {
        if (isMuralOpen) setIsMuralOpen(false);
        if (searchQuery) setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMuralOpen, searchQuery]);

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'script', label: 'Script de Atendimento', icon: <FileText className="w-4 h-4 shrink-0" /> },
    { id: 'monitoria', label: 'Monitoria & Qualidade', icon: <Scale className="w-4 h-4 shrink-0" /> },
    { id: 'sistema', label: 'Informações do Sistema', icon: <Laptop className="w-4 h-4 shrink-0" /> },
    { id: 'procedimentos', label: 'Procedimentos', icon: <FileCheck className="w-4 h-4 shrink-0" /> },
    { id: 'termos_judiciais', label: 'Termos Jurídicos', icon: <BookOpen className="w-4 h-4 shrink-0" /> },
    { id: 'canais', label: 'Canais de Atendimento', icon: <Phone className="w-4 h-4 shrink-0" /> },
    { id: 'dicas', label: 'Dicas de Argumentação', icon: <TrendingUp className="w-4 h-4 shrink-0" /> },
    { id: 'tabulacoes', label: 'Tabulações', icon: <Tag className="w-4 h-4 shrink-0" /> },
    { id: 'institucional', label: 'Institucional', icon: <Building2 className="w-4 h-4 shrink-0" /> }
  ];

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans antialiased relative transition-colors duration-200 ${
      isDarkMode
        ? 'bg-gradient-to-br from-[#050b18] via-[#0a1633] to-[#0d1e44] text-white dark'
        : 'bg-gradient-to-br from-slate-50 via-blue-50/50 to-blue-100/70 text-slate-900'
    }`}>
      {/* Camada Tecnológica de Fundo (Grid + Gradientes de Luz + SVG Mesh) */}
      <div className="tech-bg-pattern" />
      
      {/* SVG Tech Data Constellation & Geometric Waves no Fundo */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 900">
          <defs>
            <linearGradient id="techLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="waveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,180 C320,300 420,120 720,220 C1020,320 1140,160 1440,240 L1440,900 L0,900 Z" fill="url(#waveGrad)" />
          <path d="M0,380 C360,260 540,460 900,340 C1200,240 1340,420 1440,360" fill="none" stroke="url(#techLineGrad)" strokeWidth="1.5" strokeDasharray="6 8" />
          <path d="M0,520 C280,620 620,440 980,560 C1220,640 1360,500 1440,540" fill="none" stroke="url(#techLineGrad)" strokeWidth="1" />
          {/* Tech Nodes (Pontos de Rede Conectados) */}
          <circle cx="280" cy="270" r="3.5" fill="#3b82f6" opacity="0.6" />
          <circle cx="540" cy="460" r="3" fill="#60a5fa" opacity="0.5" />
          <circle cx="900" cy="340" r="4" fill="#2563eb" opacity="0.7" />
          <circle cx="1140" cy="210" r="3" fill="#3b82f6" opacity="0.5" />
          <line x1="280" y1="270" x2="540" y2="460" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.4" />
          <line x1="540" y1="460" x2="900" y2="340" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.4" />
          <line x1="900" y1="340" x2="1140" y2="210" stroke="#93c5fd" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.4" />
        </svg>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0a1633]/95 backdrop-blur-md text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-150 border border-[#234584]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal Mural */}
      <OperationalMuralModal
        isOpen={isMuralOpen}
        onClose={() => setIsMuralOpen(false)}
        onQuickSearch={(term) => setSearchQuery(term)}
      />

      {/* OVERLAY MOBILE QUANDO SIDEBAR ABERTA */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-[#050b18]/60 backdrop-blur-2xs z-30 lg:hidden"
        />
      )}

      {/* BARRA LATERAL (SIDEBAR RETRÁTIL DESLIZANTE) */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white/95 backdrop-blur-xl border-r border-slate-200/90 flex flex-col shrink-0 transition-all duration-300 ease-in-out shadow-md lg:shadow-none ${
          isSidebarOpen ? 'translate-x-0 lg:w-64 lg:opacity-100' : '-translate-x-full lg:w-0 lg:overflow-hidden lg:opacity-0 lg:border-r-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-200/80 flex items-center shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs tracking-tight shadow-2xs shrink-0">
              GM
            </div>
            <div className="leading-tight truncate">
              <span className="block font-bold text-xs text-blue-900 dark:text-white uppercase tracking-wide truncate">
                Guia Operacional
              </span>
              <span className="text-[11px] text-slate-500 dark:text-blue-200 font-medium truncate block">
                Bulgarelli & GM Financial
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = activeTab === item.id && !searchQuery;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSearchQuery('');
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-white hover:bg-slate-100/80 dark:hover:bg-[#162750] hover:text-blue-700 dark:hover:text-[#93c5fd]'
                }`}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer info in sidebar */}
        <div className="p-3 border-t border-slate-200 dark:border-[#1e3a6e] text-[11px] text-slate-500 dark:text-blue-200 bg-slate-50/50 dark:bg-[#0a1633] shrink-0">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-white">Central 0800:</span>
            <span className="font-mono text-slate-600 dark:text-white">0800 056 2410</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="font-semibold text-slate-700 dark:text-white">WhatsApp:</span>
            <span className="font-mono text-slate-600 dark:text-white">(11) 3185-8052</span>
          </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL COM SCROLLBAR DEDICADA E CONTIDA */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-14 bg-white/85 backdrop-blur-xl border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg text-slate-600 dark:text-white hover:text-slate-900 dark:hover:text-blue-200 hover:bg-slate-100/80 dark:hover:bg-[#162750] transition-colors"
              title={isSidebarOpen ? 'Ocultar menu lateral' : 'Expandir menu lateral'}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-5 h-5" />
              ) : (
                <PanelLeftOpen className="w-5 h-5" />
              )}
            </button>

            <div
              className="flex items-center px-2 py-0.5 rounded-md shadow-2xs"
              style={{ backgroundColor: '#ffffff' }}
            >
              <img
                src="https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Gm_financial_logo.svg/3840px-Gm_financial_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail"
                alt="GM Financial"
                className="h-5 sm:h-6 w-auto object-contain shrink-0"
                style={{ backgroundColor: '#fffefe' }}
                loading="eager"
              />
            </div>
          </div>

          {/* Search Box Central */}
          <div className="flex-1 max-w-xl relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-blue-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquise em todo o guia: Antifraude, CAMEC, Ajuizamento, Desconto, 508, Quita+... (Ctrl+K)"
              className="w-full pl-9 pr-8 py-1.5 text-xs rounded-lg border border-slate-300/90 dark:border-[#234584] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20 bg-white/80 dark:bg-[#09142e] focus:bg-white dark:focus:bg-[#0f1f42] text-slate-900 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-blue-200/60 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-blue-300 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Ações do Canto Superior Direito (Tema + Mural + Checklist Flutuante) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Botão de Alternância de Tema (Modo Escuro / Modo Claro) */}
            <button
              onClick={() => {
                const nextMode = !isDarkMode;
                setIsDarkMode(nextMode);
                showToast(nextMode ? '🌙 Modo Escuro ativado (Azul Marinho)' : '☀️ Modo Claro ativado (Azul e Branco)');
              }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 dark:border-[#234584] bg-white/90 dark:bg-[#162750] text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-[#1e3a6e] transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 text-xs font-bold"
              title={isDarkMode ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span className="hidden sm:inline text-white">Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="hidden sm:inline text-slate-700">Escuro</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsMuralOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-blue-50/90 hover:bg-blue-100 border border-blue-200/90 text-blue-700 dark:text-white dark:bg-[#162750] dark:border-[#234584] dark:hover:bg-[#1e3a6e] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
            >
              <Bell className="w-3.5 h-3.5 text-blue-600 dark:text-blue-300" />
              <span className="hidden sm:inline">Mural & Destaques</span>
            </button>

            {/* Checklist Flutuante de Monitoria */}
            <FloatingChecklist
              isOpen={isChecklistOpen}
              onToggle={() => setIsChecklistOpen(!isChecklistOpen)}
              onClose={() => setIsChecklistOpen(false)}
            />
          </div>
        </header>

        {/* ÁREA DE ROLAMENTO INTEGRAL: Barra de rolagem fixada na extremidade direita da tela */}
        <div className="flex-1 overflow-y-auto relative z-10 w-full scroll-smooth">
          <main className="p-4 sm:p-6 lg:p-8 w-[1159px] max-w-full mx-auto">
            {/* Barra de Variáveis Dinâmicas da Ligação */}
            <DynamicVariablesBar
              vars={dynamicVars}
              onChange={(updated) => setDynamicVars(updated)}
            />

            {/* Se houver busca ativa, exibe o painel de busca */}
            {searchQuery ? (
              <SearchResultsView
                query={searchQuery}
                onClear={() => setSearchQuery('')}
              />
            ) : (
              <>
                {activeTab === 'script' && (
                  <ScriptLinearView
                    vars={dynamicVars}
                    activeStage={activeStage}
                    onSelectStage={(st) => setActiveStage(st)}
                    onToast={showToast}
                  />
                )}

                {activeTab === 'monitoria' && <MonitoriaView />}

                {activeTab === 'sistema' && <InformacoesSistemaView />}

                {activeTab === 'procedimentos' && <ProcedimentosView />}

                {activeTab === 'termos_judiciais' && <TermosJuridicosView />}

                {activeTab === 'canais' && <CanaisAtendimentoView />}

                {activeTab === 'dicas' && <DicasView />}

                {activeTab === 'tabulacoes' && <TabulacoesView />}

                {activeTab === 'institucional' && <InstitucionalView />}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
