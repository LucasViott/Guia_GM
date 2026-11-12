import React, { useState } from 'react';
import {
  Shield,
  Clock,
  FileCheck,
  RefreshCw
} from 'lucide-react';

export const ProcedimentosView: React.FC = () => {
  const [filterSituacao, setFilterSituacao] = useState<'todas' | 'fraude' | 'acao_contraria' | 'falecido' | 'reclame_aqui' | 'gravacao' | 'calamidade'>('todas');

  return (
    <div className="space-y-6">
      {/* Header Geral */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
          <FileCheck className="w-4 h-4" />
          <span>Políticas e Procedimentos Operacionais</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Diretrizes Detalhadas de Pagamento, Prazos & Situações Específicas
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Regulamentos oficiais da GM Financial e da assessoria Bulgarelli Advogados extraídos da norma operacional vigente.
        </p>
      </div>

      {/* BLOCO COMPLETO: 8. DIRETRIZES PARA SITUAÇÕES ESPECÍFICAS (DO PDF) */}
      <div className="bg-white border border-blue-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-100">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              8. Diretrizes para Situações Específicas
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Condutas mandatórias, falas recomendadas, tabulações sistêmicas e fluxos de exceção para casos complexos.
            </p>
          </div>

          {/* Filtros das Situações Específicas */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            <button
              onClick={() => setFilterSituacao('todas')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                filterSituacao === 'todas'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todas (6 Casos)
            </button>
            <button
              onClick={() => setFilterSituacao('fraude')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                filterSituacao === 'fraude'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Desconhece Dívida
            </button>
            <button
              onClick={() => setFilterSituacao('acao_contraria')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                filterSituacao === 'acao_contraria'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Ação Contrária
            </button>
            <button
              onClick={() => setFilterSituacao('falecido')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                filterSituacao === 'falecido'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Falecido & MetLife
            </button>
            <button
              onClick={() => setFilterSituacao('reclame_aqui')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                filterSituacao === 'reclame_aqui'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Reclame Aqui
            </button>
            <button
              onClick={() => setFilterSituacao('gravacao')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                filterSituacao === 'gravacao'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Solicita Gravação
            </button>
            <button
              onClick={() => setFilterSituacao('calamidade')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                filterSituacao === 'calamidade'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Calamidade Pública
            </button>
          </div>
        </div>

        {/* CASO 1: DESCONHECE DÍVIDA */}
        {(filterSituacao === 'todas' || filterSituacao === 'fraude') && (
          <div className="bg-white rounded-xl border border-red-200 p-5 shadow-xs transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-red-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-red-100 text-red-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                  8.1
                </span>
                <h4 className="text-base font-bold text-red-950">
                  Desconhece Dívida (Suspeita de Fraude)
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  Ocorrência: DESCONHECE A DÍVIDA (Cód. 10)
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
                  Sinalizar Supervisão
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-red-600 font-bold">•</span>
                  <span><strong>Orientar B.O.:</strong> Oriente o cliente a registrar o Boletim de Ocorrência policial e encaminhar imediatamente para a GM Financial no e-mail: <strong className="text-blue-700">documentos.cac@central.gmfinancial.com</strong>.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-600 font-bold">•</span>
                  <span><strong>Manutenção de Cobrança:</strong> Informe com clareza que as ações de cobrança permanecerão ativas no sistema até a finalização da análise da auditoria.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-600 font-bold">•</span>
                  <span><strong>Já enviou anteriormente:</strong> Caso o cliente informe que já enviou o boletim, solicite a evidência/protocolo e compartilhe imediatamente com a gestão da GM Financial.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-600 font-bold">•</span>
                  <span><strong>Ação Obrigatória do Operador:</strong> Ao finalizar o contato, sinalize sua supervisão para que de imediato a GM Financial seja informada da ocorrência. Encerre cordialmente.</span>
                </li>
              </ul>

              {/* Exemplo de fala */}
              <div className="mt-3 p-3.5 bg-red-50/70 border-l-3 border-red-500 rounded-r-lg text-red-950 font-normal leading-relaxed">
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-red-700 mb-1">
                  🗣️ Exemplo de Fala Recomendada:
                </span>
                "Como o Sr.(a) não reconhece a dívida, a orientação da GM Financial é que registre um boletim de ocorrência e envie uma cópia para o e-mail documentos.cac@central.gmfinancial.com, lembrando que as ações de cobrança permanecem até a finalização da análise em sistema."
              </div>
            </div>
          </div>
        )}

        {/* CASO 2: AÇÃO CONTRÁRIA */}
        {(filterSituacao === 'todas' || filterSituacao === 'acao_contraria') && (
          <div className="bg-white rounded-xl border border-amber-200 p-5 shadow-xs transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-amber-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                  8.2
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  Ação Contrária (Processo Judicial em Curso)
                </h4>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                Ocorrência: ALEGA AÇÃO CONTRÁRIA
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Coleta de Dados Processuais:</strong> Solicite ao cliente os dados completos da ação para cadastro: <strong>Número do processo, Comarca e Vara</strong> correspondente.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Validade da Cobrança:</strong> Informe com clareza que as ações de cobrança permanecerão ativas até que haja a notificação legal da GM Financial pelo juízo.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Tentativa de Conciliação Amigável:</strong> Questione se o cliente tem interesse em negociar amigavelmente hoje e ofereça as opções disponíveis de campanha para estancar os custos do litígio. Encerre cordialmente.</span>
                </li>
              </ul>

              {/* Exemplo de fala */}
              <div className="mt-3 p-3.5 bg-amber-50/70 border-l-3 border-amber-500 rounded-r-lg text-amber-950 font-normal leading-relaxed">
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-amber-800 mb-1">
                  🗣️ Exemplo de Fala Recomendada:
                </span>
                "Senhor(a), solicito gentilmente que informe os dados da ação para cadastro, incluindo o número do processo, a comarca e a vara correspondente. Informo que as ações de cobrança permanecerão ativas até a notificação legal da GM Financial. Portanto, no momento, não há interesse em realizar um acordo?"
              </div>
            </div>
          </div>
        )}

        {/* CASO 3: FALECIDO */}
        {(filterSituacao === 'todas' || filterSituacao === 'falecido') && (
          <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                  8.3
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  Cliente Falecido (Óbito & Acionamento MetLife)
                </h4>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                Ocorrência: CLIENTE FALECIDO (Cód. 89)
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-600 font-bold">•</span>
                  <span><strong>Apresentação & Identificação:</strong> Realize a apresentação cordial e identificação com o terceiro que atendeu (sem quebra de sigilo).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-600 font-bold">•</span>
                  <span><strong>Certidão de Óbito:</strong> Solicite o envio de cópia da certidão de óbito para a GM Financial no e-mail: <strong className="text-blue-700">documentos.cac@central.gmfinancial.com</strong>. Caso o terceiro já tenha enviado, solicite evidência e compartilhe com a gestão.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-600 font-bold">•</span>
                  <span><strong>Novo Responsável:</strong> Identifique o novo responsável pelo financiamento, registrando nome completo e telefone de contato no sistema.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-600 font-bold">•</span>
                  <span><strong>Ações de Cobrança:</strong> Informe que as ações de cobrança permanecerão até a finalização da análise da certidão pela GM Financial. Encerre cordialmente.</span>
                </li>
              </ul>

              {/* SE O CONTRATO POSSUI MARCAÇÃO DE SEGURO PRESTAMISTA */}
              <div className="mt-4 p-4 bg-blue-50/80 rounded-xl border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-blue-900 text-xs">
                  <Shield className="w-4 h-4 text-blue-700" />
                  <span>Se o Contrato Possui Marcação de Seguro Prestamista (MetLife):</span>
                </div>
                <div className="text-blue-950 font-normal leading-relaxed">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-blue-800 mb-1">
                    🗣️ Exemplo de Fala Recomendada:
                  </span>
                  <p>
                    "Sr.(a) [NOME TERCEIRO], gostaria de informá-lo que em meu sistema consta que o contrato de financiamento possui seguro prestamista contratado. Orientamos que entre em contato com a seguradora MetLife pelos telefones <strong>3004-9329</strong> (capitais e grandes centros) ou <strong>0800 727 9329</strong> (demais cidades), e faça a abertura do sinistro para Cobertura de Falecimento e o envio da documentação necessária para que a seguradora possa analisar se tem direito à cobertura de quitação de saldo devedor do contrato após a data do óbito.
                  </p>
                  <p className="mt-2">
                    Lembramos que o seguro prestamista <strong>não cobre parcelas em atraso com vencimentos anteriores ao óbito</strong>. E que toda a troca e o envio de documentação do sinistro deve ser realizada pela família do cliente diretamente com a Seguradora MetLife."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CASO 4: RECLAME AQUI */}
        {(filterSituacao === 'todas' || filterSituacao === 'reclame_aqui') && (
          <div className="bg-white rounded-xl border border-blue-200 p-5 shadow-xs transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-blue-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                  8.4
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  Reclame Aqui - Fluxo de Atendimento em que os Escritórios Serão Envolvidos
                </h4>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Experiência do Cliente GM
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p className="leading-relaxed">
                Para os clientes que abrirem reclamação reivindicando o abono dos encargos, não sendo possível atendê-los diretamente pela ouvidoria, a equipe de <strong>Experiência do Cliente da GM Financial</strong> encaminhará e-mail ao escritório responsável pela cobrança do contrato, sinalizando sobre a ocorrência.
              </p>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Contato Ativo pelo Escritório:</strong> O escritório deverá contatar o cliente, sinalizando expressamente que o contato está sendo realizado em virtude da ocorrência aberta por ele no Reclame Aqui, visando a regularização amigável do contrato, conforme os procedimentos de cobrança vigentes.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Alinhamento GM e Escritório:</strong> O objetivo é que o cliente tenha um atendimento personalizado, além da ciência sobre o alinhamento institucional entre a GM Financial e o escritório no sentido de <strong>não ser possível isentá-lo integralmente do pagamento dos encargos</strong>, mas oferecendo as melhores condições e campanhas possíveis para fechamento.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Condução:</strong> Siga rigorosamente a apresentação formal, contate o cliente sobre a ocorrência registrada no Reclame Aqui e negocie a regularização do contrato.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* CASO 5: CASO CLIENTE SOLICITE A GRAVAÇÃO DO ATENDIMENTO */}
        {(filterSituacao === 'todas' || filterSituacao === 'gravacao') && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                  8.5
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  Caso o Cliente Solicite a Gravação do Atendimento
                </h4>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Fundamento Normativo
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 leading-relaxed text-slate-800">
                <strong className="text-slate-900 block mb-1">Diretriz Oficial Obrigatória:</strong>
                <p>
                  Orientar que as ligações são gravadas para fins de monitoria de qualidade, <strong>porém não são mantidas em arquivo após o atendimento</strong>. Dessa forma, não é possível atender a eventuais solicitações de disponibilização dessas gravações.
                </p>
                <p className="mt-2">
                  Ressaltar ao cliente que a ausência de arquivamento das gravações <strong>não configura descumprimento de qualquer regulamentação ou legislação vigente</strong>, uma vez que não há exigência legal para a manutenção dessas gravações telefônicas em arquivo permanente pela assessoria.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CASO 6: APOIO AO CLIENTE EM MOMENTOS DE CALAMIDADES PÚBLICAS */}
        {(filterSituacao === 'todas' || filterSituacao === 'calamidade') && (
          <div className="bg-white rounded-xl border border-teal-200 p-5 shadow-xs transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-teal-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                  8.6
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  Apoio ao Cliente em Momentos de Calamidades Públicas Decretadas pelo Poder Público
                </h4>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                Sensibilidade & Gestão GM
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p className="leading-relaxed">
                Seguir os itens de apresentação e identificação conforme script vigente. Identificando que o motivo do atraso decorre de <strong>calamidade pública decretada pelo Poder Público Municipal ou Estadual</strong> (ex.: enchentes, deslizamentos ou desastres climáticos reconhecidos), seguir:
              </p>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Empatia Dirigida:</strong> Demonstre empatia sincera pela situação do cliente em nome da GM Financial, oferecendo apoio e buscando compreender sua realidade imediata.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Capacidade de Pagamento:</strong> Entender com o cliente qual a sua situação real diante da calamidade pública e se há capacidade residual de regularização do débito. Havendo capacidade, seguir com as alternativas do script.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Incapacidade de Pagamento no Momento:</strong> Caso o cliente demonstre incapacidade temporária de realizar qualquer pagamento, o <strong>gestor do escritório deverá contatar o banco</strong> para identificar qual ação de contingência será adotada para aquela praça/contrato.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Orientações ao Cliente:</strong> Informar ao cliente que serão verificadas alternativas junto ao banco para buscar outras formas de atendimento, e que ele será contatado assim que houver definição sobre novas possibilidades. Ressaltar a importância de permanecer disponível e registrar todas as informações passadas pelo cliente para reportar à GM Financial.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Diretrizes Antifraude Oficiais */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
          <Shield className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">
            Regras Oficiais de Conferência Antifraude do Boleto
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="font-bold text-blue-900 block mb-1">1. Senha do Arquivo PDF:</span>
            A senha de segurança corresponde exatamente ao número do CPF ou CNPJ completo do titular do financiamento, sem pontos, barras ou traços.
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="font-bold text-blue-900 block mb-1">2. Beneficiário Oficial:</span>
            O beneficiário no comprovante deve ser exclusivamente <strong>BANCO GM S/A</strong>. Nunca realize pagamentos para intermediários ou nomes de pessoas físicas.
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="font-bold text-blue-900 block mb-1">3. Banco Emissor e Linha:</span>
            O banco emissor é o <strong>Banco ITAÚ</strong>. O código de barras sempre inicia com o número <strong>34191</strong> e finaliza exatamente com o valor em reais do boleto.
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="font-bold text-red-700 block mb-1">4. Proibição de Pix e TED:</span>
            A GM Financial <strong>NÃO solicita pagamentos via chave Pix ou transferências bancárias TED</strong>, nem recebe por plataformas como PagSeguro ou Mercado Pago.
          </div>
        </div>
      </div>

      {/* Prazos Sistêmicos */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">
            Prazos Operacionais e Baixas
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="font-mono font-bold text-base text-blue-700 block mb-1">02 Dias Úteis</span>
            <strong className="text-slate-900 block mb-1">Compensação Bancária:</strong>
            Prazo padrão de baixa no sistema financeiro após pagamento em agências bancárias ou internet banking.
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="font-mono font-bold text-base text-blue-700 block mb-1">05 a 07 Dias Úteis</span>
            <strong className="text-slate-900 block mb-1">Baixa Serasa/SPC:</strong>
            Prazo legal para exclusão definitiva do apontamento nos órgãos de proteção ao crédito após a identificação do pagamento.
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="font-mono font-bold text-base text-blue-700 block mb-1">10 Dias Corridos</span>
            <strong className="text-slate-900 block mb-1">Baixa do Gravame:</strong>
            Após a quitação integral da última parcela do financiamento, a baixa no Detran ocorre automaticamente em até 10 dias corridos.
          </div>
        </div>
      </div>

      {/* Antecipação do Mês */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
          <RefreshCw className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">
            Antecipação do Mês (Pagamento Invertido de Parcela)
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200">
            <strong className="text-blue-900 font-bold block mb-1">Cenário 1: Pago e acionado no mês anterior</strong>
            Exemplo: O cliente estava no mês 08, pagou a fatura do mês 10 por engano e, ainda dentro do mês 08, percebeu o erro e acionou o escritório.
            <div className="mt-2 text-slate-600">
              <strong>Conduta:</strong> Direcionamos o caso para a gestão do Banco GM, e no prazo de até 7 dias úteis ele recebe o estorno do valor na conta corrente.
            </div>
          </div>
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200">
            <strong className="text-blue-900 font-bold block mb-1">Cenário 2: Pagamento percebido no mês atual</strong>
            Exemplo: O cliente pagou a fatura 10 no mês 08, mas só percebeu o erro no mês 09 ao ser cobrado pela parcela em aberto.
            <div className="mt-2 text-slate-600">
              <strong>Conduta:</strong> Informamos que a parcela do mês 08 permaneceu pendente e deve ser quitada normalmente. No mês 10 não haverá cobrança, pois já se encontra liquidada.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
