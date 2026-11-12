export interface ScriptStage {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
}

export interface QualityAlert {
  title: string;
  badge: string;
  type: 'critical' | 'warning' | 'info';
  pointsDeduction?: string;
  items: string[];
}

export interface ObjectionItem {
  id: string;
  group: 'propostas' | 'reclamacoes';
  numberLabel: string;
  title: string;
  summary: string;
  speech: string;
  alert: QualityAlert;
  tags: string[];
  tabulationCode?: string;
}

export interface MonitoriaRow {
  peso: number | 'NCG';
  pesoTipo: 'low' | 'mid' | 'high' | 'ncg';
  item: string;
  criterio: string;
}

export interface MonitoriaBlock {
  id: string;
  titulo: string;
  subtitulo: string;
  isNCG?: boolean;
  rows: MonitoriaRow[];
}

export interface TermoJuridico {
  id: string;
  numero: number;
  titulo: string;
  categoria: string;
  conceito: string;
  pontosImportantes?: string[];
  impactoNoCliente: string;
}

export interface TabulacaoItem {
  codigo: string;
  nome: string;
  iconeTipo: string;
  observacao?: string;
  quandoUsar: string;
  restricoes: string;
  riscoNCG?: boolean;
}

export interface DicaArgumentacao {
  id: string;
  categoria: 'gatilhos' | 'venda_calculada' | 'linguagem_persuasiva';
  titulo: string;
  subtitulo: string;
  comoAplicar: string;
  exemplosPraticos?: string[];
  beneficioOperacional: string;
  tags: string[];
}

export interface DynamicVars {
  nomeCliente: string;
  primeiroNomeOperador: string;
  modeloVeiculo: string;
  parcelasAtraso: string;
  vencimentoOriginal: string;
  diasAtraso: string;
  valorAtualizado: string;
  valorAcordo: string;
  dataAcordo: string;
  canalEnvio: 'WhatsApp' | 'E-mail';
  emailCliente: string;
  telefoneCliente: string;
}

export const initialDynamicVars: DynamicVars = {
  nomeCliente: 'Carlos Eduardo Silva',
  primeiroNomeOperador: 'Lucas',
  modeloVeiculo: 'Chevrolet Onix Plus LTZ',
  parcelasAtraso: '08 e 09',
  vencimentoOriginal: '15/09',
  diasAtraso: '48',
  valorAtualizado: '2.840,50',
  valorAcordo: '2.490,00',
  dataAcordo: '10/11',
  canalEnvio: 'WhatsApp',
  emailCliente: 'carlos.silva@email.com',
  telefoneCliente: '(11) 98765-4321'
};

export const SCRIPT_STAGES: ScriptStage[] = [
  { id: 1, title: 'Estágio 1 · Abertura e Identificação Positiva', shortTitle: 'Abertura & Identificação', description: 'Cumprimento cordial, confirmação positiva e atualização cadastral obrigatória sem quebra de sigilo bancário.' },
  { id: 2, title: 'Estágio 2 · Apresentação do Débito e Prazos', shortTitle: 'Apresentação do Débito', description: 'Verbalização das parcelas, dias de atraso e valor total atualizado com juros e encargos legais.' },
  { id: 3, title: 'Estágio 3 · Negociação Assertiva & Catálogo de Objeções', shortTitle: 'Negociação & Objeções', description: 'Sondagem dos motivos reais, desconto progressivo, quebra de objeções e sanções em caso de recusa.' },
  { id: 4, title: 'Estágio 4 · Fechamento, Antifraude & Canais Oficiais', shortTitle: 'Fechamento & Antifraude', description: 'Formalização das datas, valores, alertas antifraude (início 34191, sem Pix) e orientações contratuais.' }
];

export const OBJECTIONS_CATALOG: ObjectionItem[] = [
  // GRUPO 1: PROPOSTAS DE NEGOCIAÇÃO
  {
    id: 'obj_quita_mais',
    group: 'propostas',
    numberLabel: '1',
    title: 'Acordo via Plataforma Quita+ (Cartão de Crédito em até 21x)',
    summary: 'Parcelamento flexível em até 21 parcelas podendo usar múltiplos cartões.',
    speech: 'Temos uma excelente alternativa através da plataforma parceira Quita+, que permite liquidar a dívida de atualização ou quitação do contrato parcelando no cartão de crédito em até 21 vezes, podendo inclusive dividir o valor em mais de um cartão para não comprometer seu limite. Ao aceitar, o débito com a GM é quitado imediatamente e as cobranças são suspensas.',
    alert: {
      title: 'Plataforma Quita+',
      badge: 'Alternativa Elegível',
      type: 'info',
      items: [
        'Parcelamento em até 21x no cartão.',
        'Pode utilizar mais de 1 cartão de crédito (titular ou familiares).',
        'Plataforma parceira homologada; link oficial é enviado via SMS/WhatsApp.',
        'Quitação imediata da pendência na GM Financial.'
      ]
    },
    tags: ['Quita+', 'Cartão de Crédito', 'Parcelamento 21x', 'Proposta'],
    tabulationCode: 'PROMESSA DE PAGAMENTO'
  },
  {
    id: 'obj_devolucao',
    group: 'propostas',
    numberLabel: '2',
    title: 'Proposta de Devolução Amigável do Veículo',
    summary: 'Entrega espontânea evitando custas de oficiais, pátio e leilão com saldo remanescente.',
    speech: 'Quando não há capacidade financeira para manter o financiamento, a Devolução Amigável é a solução mais assertiva. Ela evita as custas processuais, o mandado de busca e apreensão e o constrangimento judicial. O veículo é entregue de forma espontânea, seu nome é excluído dos órgãos de proteção em até 5 dias úteis e o valor do bem é utilizado para abater ou quitar seu saldo devedor.',
    alert: {
      title: 'Regras da Devolução',
      badge: 'Procedimento Formal',
      type: 'warning',
      pointsDeduction: 'Obrigatório Explicar Saldo',
      items: [
        'Com Anistia: Quitação integral sem saldo residual nem cobrança de IPVA/multas.',
        'Sem Anistia: O bem vai a leilão e abate o saldo; o cliente permanece responsável pelo saldo remanescente.',
        'Exclusão dos órgãos de crédito em até 5 dias úteis após a entrega.',
        'Evita mandado judicial de busca e apreensão e despesas de guincho/pátio.'
      ]
    },
    tags: ['Devolução Amigável', 'Leilão', 'Saldo Remanescente', 'Anistia', 'Proposta'],
    tabulationCode: 'DEVOLUÇÃO AMIGÁVEL'
  },
  {
    id: 'obj_extensao',
    group: 'propostas',
    numberLabel: '3',
    title: 'Extensão / Prorrogação de Financiamento',
    summary: 'Diluição da parcela no final do contrato com termo digital assinado em 3 dias úteis.',
    speech: 'Mediante elegibilidade do seu contrato e seu interesse, encaminhamos o pedido de extensão para análise da GM Financial. Toda comunicação será via WhatsApp cadastrado. Há incidência de taxa de deslocamento diluída nas parcelas futuras, e a assinatura digital do termo de aceite deve ocorrer impreterivelmente em até 03 dias úteis para validação.',
    alert: {
      title: 'Prazos da Extensão',
      badge: 'Alerta Operacional',
      type: 'info',
      items: [
        'Assinatura do termo digital em até 3 dias úteis no WhatsApp oficial.',
        'Taxa de deslocamento é diluída nas parcelas restantes.',
        'Se o termo não for assinado no prazo, a proposta é cancelada automaticamente.'
      ]
    },
    tags: ['Extensão', 'Prorrogação', 'Diluição', 'Termo WhatsApp', 'Proposta'],
    tabulationCode: 'SOLICITAÇÃO DE EXTENSÃO'
  },
  {
    id: 'obj_renegociacao',
    group: 'propostas',
    numberLabel: '4',
    title: 'Renegociação do Financiamento (Novo Prazo e Parcela)',
    summary: 'Nova taxa e prazo em análise de 2 dias úteis, boleto de IOF e exclusão de GAP.',
    speech: 'Qual o valor de parcela mensal que o senhor consegue assumir hoje? Encaminharemos sua proposta para avaliação da GM Financial com retorno em até 02 dias úteis por e-mail. Caso aprovada, haverá incidência de IOF que deve ser pago via boleto em até 02 dias úteis juntamente com o aceite do termo. Sem o pagamento do IOF, a proposta é cancelada.',
    alert: {
      title: 'Regras de Renegociação',
      badge: 'Condições Contratuais',
      type: 'warning',
      items: [
        'Retorno da análise em até 02 dias úteis.',
        'Boleto de IOF deve ser pago em até 02 dias úteis para validar.',
        'Permitido apenas 1 única vez durante a vigência do contrato.',
        'Parcela GAP não entra na renegociação (deve ser paga à parte).'
      ]
    },
    tags: ['Renegociação', 'IOF', 'GAP', 'Prazo 2 Dias', 'Proposta'],
    tabulationCode: 'PROPOSTA DE RENEGOCIAÇÃO'
  },
  {
    id: 'obj_pagamento_parcial',
    group: 'propostas',
    numberLabel: '5',
    title: 'Pagamento Parcial Não Elegível (Cláusula G)',
    summary: 'Esclarecimento sobre a impossibilidade contratual de pagar apenas parte da dívida vencida.',
    speech: 'Sr.(a) {nomeCliente}, o acúmulo de parcelas sem pagamento caracteriza descumprimento contratual. Conforme a Cláusula G das Condições Gerais do seu contrato assinado e a legislação do Banco Central, a GM Financial reserva-se ao direito de não aceitar pagamentos parciais, estando autorizada a receber apenas a atualização integral das parcelas vencidas.',
    alert: {
      title: 'Fundamento Contratual',
      badge: 'Cláusula G',
      type: 'warning',
      items: [
        'Exigência de quitação integral do saldo em atraso.',
        'Orientar consulta às Condições Gerais registradas no site da GM Financial.',
        'Se o cliente não tiver o valor total, direcionar para Quita+ ou Devolução.'
      ]
    },
    tags: ['Pagamento Parcial', 'Cláusula G', 'Condições Gerais', 'Recusa'],
    tabulationCode: 'SEM PREVISÃO DE PAGAMENTO'
  },
  {
    id: 'obj_realocacao',
    group: 'propostas',
    numberLabel: '6',
    title: 'Realocação de Pagamento de Parcela',
    summary: 'Ajuste de parcela paga incorretamente dentro do mesmo mês de vencimento.',
    speech: 'Verificamos se o pagamento foi realizado dentro do mês até o vencimento da parcela em atraso. Em caso positivo, direcionamos as informações e o comprovante para a gestão da GM Financial para análise de realocação. Ressaltamos que as ações de cobrança permanecerão ativas até a conclusão da análise pelo Banco.',
    alert: {
      title: 'Validação de Realocação',
      badge: 'Regra de Sistema',
      type: 'info',
      items: [
        'Válido se pago dentro do mês de competência do vencimento.',
        'Cobrança segue ativa até a baixa no sistema.',
        'Tabulação correta: ALEGA PAGAMENTO.'
      ]
    },
    tags: ['Realocação', 'Comprovante', 'Mês Competência', 'Proposta'],
    tabulationCode: 'ALEGA PAGAMENTO'
  },
  {
    id: 'obj_alterar_vencimento',
    group: 'propostas',
    numberLabel: '7',
    title: 'Alteração da Data de Vencimento do Contrato',
    summary: 'Taxa de deslocamento e quitação prévia obrigatória das parcelas em atraso.',
    speech: 'Para solicitar a alteração da data de vencimento original das parcelas futuras, é requisito obrigatório regularizar todas as parcelas em atraso primeiro. Após a baixa no sistema, o senhor poderá contatar a Central GM. O procedimento pode ser realizado até 2 vezes na vigência do contrato e haverá cobrança da taxa de deslocamento para cobrir o período prorrogado.',
    alert: {
      title: 'Condições de Vencimento',
      badge: 'Regra GM',
      type: 'info',
      items: [
        'Exige regularização imediata das parcelas vencidas.',
        'Limite de 2 alterações em todo o contrato.',
        'Incide taxa de deslocamento calculada pela financeira.'
      ]
    },
    tags: ['Alteração de Vencimento', 'Taxa Deslocamento', 'Limite 2x', 'Proposta'],
    tabulationCode: 'SOLICITAÇÃO DE ALTERAÇÃO DE VENCIMENTO'
  },

  // GRUPO 2: RECLAMAÇÕES DO CLIENTE
  {
    id: 'obj_juros',
    group: 'reclamacoes',
    numberLabel: '1',
    title: 'Questionamento de Juros, Multa e Honorários Advocatícios',
    summary: 'Esclarecimento legal: 0,433% ao dia, 2% de multa (CDC) e honorários após 16 dias.',
    speech: 'Sr.(a) {nomeCliente}, a incidência de juros moratórios e multa por atraso está prevista expressamente em seu contrato assinado e regulada pelo Banco Central do Brasil. O atraso gera juros moratórios de 0,433% ao dia, multa de 2% respaldada pelo Código de Defesa do Consumidor e honorários advocatícios a partir de 16 dias de atraso. Consigo hoje aplicar uma condição de campanha para amenizar esses encargos mediante seu pagamento hoje.',
    alert: {
      title: 'Base Legal dos Encargos',
      badge: 'Contrato & CDC',
      type: 'warning',
      items: [
        'Juros: 0,433% ao dia conforme BACEN.',
        'Multa moratória: 2% (Art. 52 do CDC).',
        'Honorários advocatícios: inseridos a partir de 16 dias de atraso.',
        'Use esses números para demonstrar a economia real que o acordo proporciona.'
      ]
    },
    tags: ['Juros', 'Multa 2%', 'Honorários', '0,433% ao dia', 'Reclamação'],
    tabulationCode: 'SEM PREVISÃO DE PAGAMENTO'
  },
  {
    id: 'obj_excesso_ligacoes',
    group: 'reclamacoes',
    numberLabel: '2',
    title: 'Reclamação de Excesso de Ligações / Contatos Diários',
    summary: 'Justificativa legal e cessamento imediato no dia mediante atendimento com dados confirmados.',
    speech: 'Compreendo seu incômodo, Sr.(a) {nomeCliente}. Esclareço que nossos acionamentos estão em estrita conformidade com a legislação vigente e ocorrem diariamente visando alertá-lo para evitar o ajuizamento da ação e busca e apreensão. Uma vez que confirmamos seu atendimento e formalizamos uma proposta hoje, os acionamentos telefônicos são imediatamente cessados para o dia de hoje.',
    alert: {
      title: 'Regra de Acionamentos',
      badge: 'Regra Operacional',
      type: 'info',
      items: [
        'Confirmou dados e atendeu = Acionamentos telefônicos cessados no mesmo dia.',
        'Reforçar que o objetivo do contato é resguardar o bem e evitar a via judicial.'
      ]
    },
    tags: ['Excesso de Ligações', 'Cessamento Diário', 'Cobrança Legal', 'Reclamação'],
    tabulationCode: 'CONTATO COM O CLIENTE'
  },
  {
    id: 'obj_desemprego',
    group: 'reclamacoes',
    numberLabel: '3',
    title: 'Alegação de Desemprego (Acionamento MetLife Seguro)',
    summary: 'Seguro prestamista contratado: acionamento imediato da seguradora (3004-9329).',
    speech: 'Sr.(a) {nomeCliente}, identifiquei em meu sistema que o seu contrato de financiamento inclui a proteção do Seguro Prestamista. Orientamos que o senhor contate com urgência a seguradora MetLife pelos telefones 3004-9329 (capitais) ou 0800 727 9329 para abrir o sinistro de cobertura por perda involuntária de emprego e estancar as ações de cobrança.',
    alert: {
      title: 'Seguro MetLife Prestamista',
      badge: 'Sinistro Imediato',
      type: 'info',
      items: [
        'Central MetLife: 3004-9329 (Capitais) ou 0800 727 9329.',
        'Abrir sinistro para quitação ou amortização de parcelas.',
        'Atenção: o seguro não cobre parcelas que já estavam vencidas antes da demissão.'
      ]
    },
    tags: ['Desemprego', 'MetLife', 'Seguro Prestamista', '3004-9329', 'Reclamação'],
    tabulationCode: 'SEGURO PRESTAMISTA METLIFE'
  },
  {
    id: 'obj_carro_terceiro',
    group: 'reclamacoes',
    numberLabel: '4',
    title: 'Veículo em Posse de Terceiro (Contrato de Gaveta)',
    summary: 'Descumprimento contratual grave; titular continua legalmente e financeiramente responsável.',
    speech: 'Sr.(a) {nomeCliente}, a entrega ou venda do veículo a terceiros sem a anuência prévia e formal da GM Financial (sem cessão de contrato) constitui grave descumprimento contratual e poderá ensejar ajuizamento imediato. Esse repasse não isenta o(a) senhor(a) da responsabilidade pelo pagamento total do financiamento nem das restrições e busca e apreensão em seu CPF.',
    alert: {
      title: 'Veículo com Terceiro',
      badge: 'Risco de Ajuizamento',
      type: 'warning',
      items: [
        'Coletar nome completo, parentesco e telefone do terceiro com quem está o carro.',
        'Pedir autorização expressa para contatar o terceiro.',
        'Tabulação: VEÍCULO COM TERCEIRO SEM PREVISÃO.'
      ]
    },
    tags: ['Terceiro', 'Contrato de Gaveta', 'Cessão Irregular', 'Reclamação'],
    tabulationCode: 'VEÍCULO COM TERCEIRO SEM PREVISÃO'
  },
  {
    id: 'obj_consultoria',
    group: 'reclamacoes',
    numberLabel: '5',
    title: 'Contratou Consultoria Externa / Escritório Revisional',
    summary: 'GM Financial não autoriza nem negocia com intermediários; busca e apreensão segue ativa.',
    speech: 'Sr.(a) {nomeCliente}, informo que a GM Financial não autoriza nem realiza negociações por intermédio de empresas de consultoria ou assessorias externas; todos os acordos devem ser feitos diretamente com o titular. Enquanto não houver formalização amigável conosco, as ações de cobrança e as medidas judiciais de busca e apreensão continuam ativas.',
    alert: {
      title: 'Consultorias Externas',
      badge: 'Alerta Crítico',
      type: 'critical',
      items: [
        'GM NÃO negocia com intermediários.',
        'Alertar com veemência que o processo de busca e apreensão continua correndo.',
        'Muitas consultorias retêm valores e o cliente perde o veículo em leilão.'
      ]
    },
    tags: ['Consultoria', 'Ação Revisional', 'Intermediário', 'Golpe Revisional', 'Reclamação'],
    tabulationCode: 'ASSESSORIA EXTERNA / REVISIONAL'
  },
  {
    id: 'obj_desconhece_divida',
    group: 'reclamacoes',
    numberLabel: '6',
    title: 'Cliente Desconhece a Dívida (Suspeita de Fraude)',
    summary: 'Orientação de registro imediato de Boletim de Ocorrência policial e envio ao CAC.',
    speech: 'Como o(a) senhor(a) não reconhece a contratação deste financiamento, a orientação da GM Financial é que registre imediatamente um Boletim de Ocorrência policial e envie a cópia para documentos.cac@central.gmfinancial.com. Ressaltamos que as ações de cobrança permanecem ativas no sistema até a conclusão da auditoria.',
    alert: {
      title: 'Protocolo de Fraude',
      badge: 'NCG - Sinalizar Gestão',
      type: 'critical',
      items: [
        'Orientar envio de B.O. para: documentos.cac@central.gmfinancial.com.',
        'Avisar que a cobrança permanece ativa até parecer da área de segurança.',
        'Sinalizar à supervisão imediatamente.',
        'Tabulação: DESCONHECE A DÍVIDA.'
      ]
    },
    tags: ['Fraude', 'Desconhece Dívida', 'Boletim de Ocorrência', 'CAC GM', 'Reclamação'],
    tabulationCode: 'DESCONHECE A DÍVIDA'
  },
  {
    id: 'obj_acao_contraria',
    group: 'reclamacoes',
    numberLabel: '7',
    title: 'Alega Ação Contrária / Processo Judicial em Curso',
    summary: 'Coleta de comarca, número de processo e vara, mantendo oferta de acordo amigável.',
    speech: 'Senhor(a), solicito gentilmente que informe os dados da ação para registro: número do processo, comarca e vara correspondente. Informo que as ações de cobrança permanecerão ativas até a citação e notificação legal do Banco. Gostaria de verificar uma proposta amigável hoje para evitar os custos do litígio?',
    alert: {
      title: 'Ação Judicial Informada',
      badge: 'Registro Jurídico',
      type: 'info',
      items: [
        'Coletar número do processo, vara e comarca.',
        'Cobrança segue ativa até notificação oficial do juízo à GM.',
        'Tabulação: ALEGA AÇÃO CONTRÁRIA.'
      ]
    },
    tags: ['Ação Contrária', 'Processo Judicial', 'Comarca', 'Vara', 'Reclamação'],
    tabulationCode: 'ALEGA AÇÃO CONTRÁRIA'
  }
];

export const MONITORIA_DATA: MonitoriaBlock[] = [
  {
    id: 'bloco1',
    titulo: 'Bloco 1 · Abertura da Ligação e Saudação',
    subtitulo: 'Regras de apresentação e formalidades normativas',
    rows: [
      { peso: 2, pesoTipo: 'low', item: 'Nome do operador', criterio: 'Não informar o nome do operador (Apenas primeiro nome).' },
      { peso: 2, pesoTipo: 'low', item: 'Nome do escritório', criterio: 'Não informar o nome do escritório (Bulgarelli Advogados).' },
      { peso: 2, pesoTipo: 'low', item: 'Informar credor GM Financial', criterio: 'Não informar o nome do credor ou quando não for feita a separação entre escritório e credor (Ex: Meu nome é Lucas da Bulgarelli Advogados a serviço da GM Financial).' },
      { peso: 2, pesoTipo: 'low', item: 'Nome completo do responsável/cliente', criterio: 'Em contato com o cliente, não confirmar o nome completo do cliente/empresa ou do terceiro responsável pelo pagamento.' },
      { peso: 2, pesoTipo: 'low', item: 'Aviso de contato gravado/monitorado', criterio: 'Não informar ao cliente ou terceiro que o contato telefônico está sendo gravado e monitorado para segurança.' },
      { peso: 2, pesoTipo: 'low', item: 'Confirmar dados de contato (Cadastro)', criterio: 'Não realizar a confirmação completa dos dados: endereço, telefone com validação de WhatsApp e e-mail ativo.' }
    ]
  },
  {
    id: 'bloco2',
    titulo: 'Bloco 2 · Negociação, Condução & Flexibilidade',
    subtitulo: 'Apresentação dos valores, prazos e aplicação de descontos',
    rows: [
      { peso: 2, pesoTipo: 'low', item: 'Parcelas em atraso', criterio: 'Não verbalizar o(s) número(s) da(s) parcela(s) em aberto.' },
      { peso: 2, pesoTipo: 'low', item: 'Dia do vencimento e dias em atraso', criterio: 'Não informar o dia e mês de vencimento da parcela mais antiga e o total de dias de atraso decorridos.' },
      { peso: 3, pesoTipo: 'low', item: 'Valor atualizado', criterio: 'Não informar o valor da dívida atualizada com juros moratórios e multas contratuais.' },
      { peso: 16, pesoTipo: 'high', item: 'Sondar o motivo de inadimplência', criterio: 'Não realizar a sondagem adequada, utilizando perguntas assertivas investigando a causa real da inadimplência.' },
      { peso: 16, pesoTipo: 'high', item: 'Explorar opções de negociação', criterio: 'Não considerar histórico do cliente e deixar de ofertar as alternativas existentes (Quita+, devolução amigável, extensão, renegociação).' },
      { peso: 12, pesoTipo: 'mid', item: 'Oferta de desconto progressivo', criterio: 'Conceder o desconto máximo de primeira sem contrapartida de data do cliente, ou deixar de aplicar desconto onde havia margem autorizada.' },
      { peso: 4, pesoTipo: 'low', item: 'Comunicação e linguagem', criterio: 'Uso de linguagem confusa, termos técnicos excessivos, gírias, gerundismo ou postura robotizada.' },
      { peso: 2, pesoTipo: 'low', item: 'Tom de voz e ritmo', criterio: 'Tom ríspido, impaciente, rapidez excessiva ou estilo mecanizado desprovido de cordialidade.' },
      { peso: 2, pesoTipo: 'low', item: 'Empatia e escuta ativa', criterio: 'Ignorar o relato do cliente, falta de compreensão pela situação, interrupções constantes ou minimizar problemas expostos.' },
      { peso: 2, pesoTipo: 'low', item: 'Gerenciar tempo de resposta (Mudo)', criterio: 'Pausas em silêncio absoluto sem retorno a cada 30 segundos ou retenção injustificada superior a 5 minutos.' }
    ]
  },
  {
    id: 'bloco3',
    titulo: 'Bloco 3 · Encerramento, Antifraude & Sanções',
    subtitulo: 'Instruções de segurança contra golpes e consequências legais',
    rows: [
      { peso: 11, pesoTipo: 'mid', item: 'Orientações Antifraude', criterio: 'Não informar as orientações antifraude obrigatórias (início 34191, sem Pix/TED, Banco GM/Itaú). Aplicável tanto em Sucesso quanto em Insucesso.' },
      { peso: 11, pesoTipo: 'mid', item: 'Sanções pelo não pagamento', criterio: 'Não comunicar ao cliente ou terceiro as consequências decorrentes da manutenção do atraso (Serasa, juros 0,433% a.d., busca e apreensão).' },
      { peso: 5, pesoTipo: 'low', item: 'Dados da negociação formalizada', criterio: 'Quando houver acordo, não confirmar valor exato acordado, vencimento (dia/mês) e canal de disponibilização do boleto (WhatsApp/E-mail).' },
      { peso: 2, pesoTipo: 'low', item: 'Informar canais e horários oficiais', criterio: 'Não repassar os canais de retorno (0800 056 2410 e WhatsApp) e horários de funcionamento (Seg-Sex 08h-20h / Sáb 08h-14h).' }
    ]
  },
  {
    id: 'bloco4',
    titulo: 'Bloco 4 · Não Conformidade Grave (NCG - Zera a Ligação: 0 Pts)',
    subtitulo: 'Erros capitais que anulam integralmente a avaliação de qualidade',
    isNCG: true,
    rows: [
      { peso: 'NCG', pesoTipo: 'ncg', item: 'Não realizar confirmação positiva', criterio: 'Não realizar a confirmação dos 6 primeiros dígitos do CPF/CNPJ + 1 pergunta de segurança vigente (modelo, ano ou 2 últimos dígitos da placa do veículo).' },
      { peso: 'NCG', pesoTipo: 'ncg', item: 'Ofensas ou desrespeito ao cliente', criterio: 'Atitudes de grosseria, deboche, xingamentos, difamação, constrangimento ou postura invasiva que incomode o interlocutor.' },
      { peso: 'NCG', pesoTipo: 'ncg', item: 'Tabulação incorreta no discador/CRM', criterio: 'Registrar tabulação no sistema divergente do conteúdo real ocorrido na ligação (ex: tabular 508 Queda após diálogo com dados confirmados).' },
      { peso: 'NCG', pesoTipo: 'ncg', item: 'Garantias e promessas indevidas', criterio: 'Prometer abonos, cancelamento de gravame sem quitação ou campanhas inexistentes sem aval prévio da GM Financial, gerando ônus financeiro ao credor.' }
    ]
  }
];

export const TERMOS_JURIDICOS: TermoJuridico[] = [
  {
    id: 'termo-camec',
    numero: 1,
    titulo: 'CAMEC (Câmara de Mediação e Conciliação)',
    categoria: 'Pré-Ajuizamento Extrajudicial',
    conceito: 'A CAMEC é um órgão privado de conciliação que opera na fase pré-processual. Constitui a última oportunidade para o cliente formalizar um acordo extrajudicial amigável com a assessoria antes da distribuição da petição inicial nos tribunais estaduais.',
    pontosImportantes: [
      'Última barreira extrajudicial antes da petição inicial.',
      'Evita que o contrato gere custas de distribuição judicial e honorários sucumbenciais.',
      'Permite condições de campanha que deixam de existir após o ajuizamento.'
    ],
    impactoNoCliente: 'Se recusar a conciliação na CAMEC, o contrato segue de forma irrevogável para ajuizamento imediato perante o Poder Judiciário.'
  },
  {
    id: 'termo-ajuizamento',
    numero: 2,
    titulo: 'Ajuizamento da Ação Judicial',
    categoria: 'Processo Contencioso',
    conceito: 'O ajuizamento é a distribuição formal de uma ação judicial de busca e apreensão movida pela GM Financial perante um juiz de direito em razão da inadimplência. Não é uma taxa nem mera carta de aviso: significa que o cliente agora é réu em um processo judicial.',
    pontosImportantes: [
      'Carteira FPD (First Payment Default): Notificação entre 31 e 60 dias de atraso (DPD), e ajuizamento com até 30 dias após retorno.',
      'Carteira Regular e PJ: Notificação formal a partir de 90 DPD e ajuizamento a partir de 120 DPD.',
      'Após ajuizado, o cliente arca com honorários de sucumbência (10% a 20%) e custas judiciais.'
    ],
    impactoNoCliente: 'Perda do domínio amigável: toda regularização passa a depender de cálculo judicial e custas cartorárias somadas à dívida integral.'
  },
  {
    id: 'termo-custas',
    numero: 3,
    titulo: 'Custas Processuais & Diligências',
    categoria: 'Encargos Sucumbenciais',
    conceito: 'Conjunto de despesas cartorárias decorrentes do andamento do processo judicial, incluindo taxa judiciária, diligências de oficial de justiça, despesas de publicação em edital e honorários sucumbenciais devidos aos patronos do credor.',
    pontosImportantes: [
      'Aumentam exponencialmente conforme novas diligências são cumpridas.',
      'São integralmente repassadas ao cliente inadimplente na planilha de débito judicial.',
      'Não sofrem desconto por campanhas administrativas.'
    ],
    impactoNoCliente: 'Pode encarecer a dívida em 30% a 50% além do valor original financiado.'
  },
  {
    id: 'termo-renajud',
    numero: 4,
    titulo: 'Bloqueio Judicial Renajud',
    categoria: 'Restrição Eletrônica Veicular',
    conceito: 'Sistema eletrônico de integração direta entre o Poder Judiciário e o Denatran/Detran. Por meio dele, o magistrado cadastra restrições de transferência, licenciamento e circulação diretamente no prontuário do veículo financiado.',
    pontosImportantes: [
      'Bloqueio de Transferência: Impede venda, troca ou repasse.',
      'Bloqueio de Licenciamento: Não permite renovar o documento anual do veículo.',
      'Bloqueio de Circulação: Se parado em qualquer blitz policial, o automóvel é apreendido e rebocado para pátio público.'
    ],
    impactoNoCliente: 'O veículo torna-se irregular para rodar em vias públicas, com risco iminente de apreensão em fiscalizações de trânsito.'
  },
  {
    id: 'termo-alienacao',
    numero: 5,
    titulo: 'Alienação Fiduciária em Garantia',
    categoria: 'Direito Real de Garantia',
    conceito: 'Regime jurídico em que a propriedade resolúvel do veículo pertence à GM Financial até o pagamento da última parcela pactuada. O cliente detém exclusivamente a posse direta e o uso do bem enquanto mantiver os pagamentos rigorosamente em dia.',
    pontosImportantes: [
      'A propriedade é do Banco GM; o cliente detém apenas a posse provisória.',
      'O atraso quebra o contrato e autoriza a consolidação da posse nas mãos do credor.',
      'Vender ou repassar o veículo a terceiros sem anuência da financeira constitui quebra contratual.'
    ],
    impactoNoCliente: 'O cliente não é proprietário definitivo e perde o direito de uso do bem havendo inadimplência continuada.'
  },
  {
    id: 'termo-busca',
    numero: 6,
    titulo: 'Busca e Apreensão (Decreto-Lei 911/69)',
    categoria: 'Medida Liminar de Retomada',
    conceito: 'Medida liminar concedida pelo magistrado determinando que um oficial de justiça, amparado por ordem judicial e força policial se necessário, localize e apreenda fisicamente o veículo onde quer que ele esteja (garagem, trabalho ou via pública).',
    pontosImportantes: [
      'Concedida sem necessidade de ouvir previamente o réu (medida liminar inaudita altera parte).',
      'Despesas de guincho e diárias de pátio privado correm por conta do cliente.',
      'Prazo legal de 5 dias após apreensão para purga da mora (pagamento integral de todo o contrato vencido e a vencer).'
    ],
    impactoNoCliente: 'Perda física imediata do veículo, constrangimento público e dívida mantida nos órgãos de proteção.'
  },
  {
    id: 'termo-leilao',
    numero: 7,
    titulo: 'Leilão Público & Saldo Remanescente',
    categoria: 'Liquidação Forçada do Bem',
    conceito: 'Após a apreensão consolidada, o veículo é levado a leilão público para abater o débito. Caso a arrematação não atinja o valor suficiente para cobrir todo o financiamento e as despesas processuais, o cliente continua obrigado pelo saldo residual remanescente.',
    pontosImportantes: [
      'O leilão frequentemente arremata veículos por 50% a 70% do valor da tabela FIPE.',
      'Se o carro arrematado não liquidar a dívida e custas, o processo continua executando contas e bens do titular.',
      'O CPF permanece negativado até a quitação do saldo remanescente.'
    ],
    impactoNoCliente: 'O cliente perde o veículo em definitivo e ainda continua com o nome sujo e devendo o valor residual que o leilão não cobriu.'
  }
];

export const TABULACOES_DATA: TabulacaoItem[] = [
  {
    codigo: '6',
    nome: 'Agendamento',
    iconeTipo: 'calendar',
    observacao: 'Para situações que o cliente solicitar o retorno para outro horário/data.',
    quandoUsar: 'Utilizar quando o cliente estiver em reunião, dirigindo ou solicitar expressamente contato em dia ou horário específico.',
    restricoes: 'Alinhar data e horário exato com o cliente e registrar na agenda do discador/CRM.',
    riscoNCG: false
  },
  {
    codigo: '10',
    nome: 'Suspeita de Fraude',
    iconeTipo: 'shield-alert',
    observacao: 'Para casos em que o cliente informar que o financiamento foi uma fraude realizada, com envio de evidências.',
    quandoUsar: 'Quando o interlocutor relatar não reconhecer a compra ou financiamento do veículo e informar suspeita de contratação indevida por estelionato/golpe.',
    restricoes: 'Orientar registro imediato de Boletim de Ocorrência policial e envio ao e-mail documentos.cac@central.gmfinancial.com. Sinalizar à supervisão imediatamente.',
    riscoNCG: true
  },
  {
    codigo: '18',
    nome: 'Alega Pagamento',
    iconeTipo: 'receipt',
    observacao: 'Cliente informa que já realizou o pagamento.',
    quandoUsar: 'Cliente informa que já realizou o pagamento da(s) parcela(s) em aberto ou quando solicitar realocação de parcela.',
    restricoes: 'Checar se pago há menos de 2 dias úteis (aguardar compensação) ou mais de 2 dias úteis (solicitar envio do comprovante autenticado para documentos.cac).',
    riscoNCG: false
  },
  {
    codigo: '82',
    nome: 'Cli. Desconhecido no Fone',
    iconeTipo: 'user-x',
    observacao: 'Utilizado quando a pessoa que atendeu informa que desconhece o cliente procurado.',
    quandoUsar: 'Quando a pessoa que atendeu a chamada afirmar categoricamente que não conhece o cliente titular do financiamento.',
    restricoes: 'Consultar educadamente se possui outro telefone do titular antes de inativar o número do cadastro.',
    riscoNCG: false
  },
  {
    codigo: '89',
    nome: 'Cliente Falecido',
    iconeTipo: 'shield-alert',
    observacao: 'Para casos em que a pessoa que atendeu informar falecimento do titular e envio de atestado de óbito.',
    quandoUsar: 'Quando o interlocutor comunicar o óbito do titular do contrato de financiamento.',
    restricoes: 'Coletar data do óbito, orientar envio da Certidão de Óbito para documentos.cac e direcionar para acionamento do seguro MetLife Prestamista (3004-9329 / 0800 727 9329).',
    riscoNCG: false
  },
  {
    codigo: '314',
    nome: 'Recado com Terceiro',
    iconeTipo: 'message-square',
    observacao: 'Quando deixarmos um recado com o conhecido do titular.',
    quandoUsar: 'Quando o telefone pertencer confirmadamente ao titular, mas o contato for com terceiro que aceita anotar os números oficiais de retorno.',
    restricoes: 'PROIBIDO informar valores, quantidade de parcelas, juros ou ajuizamento a terceiros (quebra de sigilo bancário). Deixar apenas o 0800 056 2410 e WhatsApp (11) 3185-8052.',
    riscoNCG: true
  },
  {
    codigo: '424',
    nome: 'Preventivo Positivo',
    iconeTipo: 'calendar-check',
    observacao: 'Utilizaremos em caso de contato com o cliente que possui acordo, que informa que fará o pagamento.',
    quandoUsar: 'Contato preventivo de alinhamento com cliente que já firmou promessa de pagamento e confirma expressamente que o pagamento do boleto será liquidado conforme acordado.',
    restricoes: 'Verificar se o cliente já possui a linha digitável e o boleto em mãos. Reenviar por WhatsApp/e-mail se necessário e reforçar as regras antifraude.',
    riscoNCG: false
  },
  {
    codigo: '425',
    nome: 'Preventivo Negativo',
    iconeTipo: 'alert-triangle',
    observacao: 'Utilizaremos em caso de contato com o cliente que possui acordo que informa que não conseguirá realizar o pagamento.',
    quandoUsar: 'Contato preventivo onde o cliente declara que não terá condições financeiras de honrar a promessa de pagamento firmada para a data.',
    restricoes: 'Reiniciar imediatamente a sondagem, investigar o obstáculo e ofertar alternativas viáveis (Quita+ no cartão, prorrogação de data D+2 ou devolução amigável). Se recusar, aplicar sanções.',
    riscoNCG: false
  },
  {
    codigo: '436',
    nome: 'Aguardando Análise do Banco',
    iconeTipo: 'clock',
    observacao: 'Quando estivermos aguardando a resposta do banco para acordos de exceção ou propostas do cliente.',
    quandoUsar: 'Casos em que foi submetida solicitação de alçada especial, proposta de renegociação (prazo de 2 dias úteis), extensão ou verificação de realocação de parcelas à GM Financial.',
    restricoes: 'Registrar no CRM o número do protocolo, valor da proposta e prazo de retorno informado ao cliente. Ações de cobrança permanecem sob monitoramento.',
    riscoNCG: false
  },
  {
    codigo: '508',
    nome: 'Queda de Ligação',
    iconeTipo: 'phone-off',
    observacao: 'Utilizado quando a pessoa que atendeu não se identifica e encerra o contato.',
    quandoUsar: 'Exclusivamente quando a pessoa que atendeu desligar a chamada antes da confirmação de dados, ou em casos de mudez/ruídos que impeçam qualquer identificação inicial.',
    restricoes: 'CRÍTICO: É ESTRITAMENTE PROIBIDO usar o 508 se houve diálogo com confirmação de dados do titular. Se o cliente desligou após a confirmação, o código correto é o 509 (configura NCG por tabulação incorreta e zera a monitoria se errar).',
    riscoNCG: true
  },
  {
    codigo: '509',
    nome: 'Queda de Ligação Cliente',
    iconeTipo: 'phone-missed',
    observacao: 'Utilizado quando a pessoa que atendeu se identificou como o cliente, entretanto encerrou o contato.',
    quandoUsar: 'Quando houve a identificação positiva do cliente titular (ou terceiro responsável), porém a chamada foi encerrada/desconectada durante o atendimento.',
    restricoes: 'Diferencial obrigatório em relação ao 508: usar sempre que a identidade do cliente já foi validada na linha.',
    riscoNCG: false
  },
  {
    codigo: '539',
    nome: 'Renegociação',
    iconeTipo: 'refresh-cw',
    observacao: 'Quando realizarmos uma negociação de renegociação.',
    quandoUsar: 'Formalização de proposta ou fechamento de novo contrato/reparcelamento de dívida com alteração de parcelas futuras e prazo contratual.',
    restricoes: 'Informar ao cliente sobre o retorno da análise em 2 dias úteis e o pagamento obrigatório do boleto de IOF em até 2 dias úteis para validação formal.',
    riscoNCG: false
  },
  {
    codigo: '600',
    nome: 'Comprovante de Pagamento',
    iconeTipo: 'file-check',
    observacao: 'Quando o cliente enviar o comprovante do pagamento.',
    quandoUsar: 'Utilizar quando o cliente tiver enviado o comprovante de pagamento com a devida autenticação bancária pelo WhatsApp ou e-mail da assessoria/GM.',
    restricoes: 'Conferir se o comprovante possui código de autenticação, data, valor exato e beneficiário BANCO GM S/A. Encaminhar para conferência sistêmica.',
    riscoNCG: false
  },
  {
    codigo: '604',
    nome: 'Solic. Proposta de Quitação',
    iconeTipo: 'file-text',
    observacao: 'Utilizado quando subimos uma proposta de quitação para a GM.',
    quandoUsar: 'Utilizar quando for formalizada e submetida uma proposta de quitação integral do saldo devedor do contrato para análise e aprovação da alçada da GM Financial.',
    restricoes: 'Registrar no CRM o valor proposto, percentual de desconto solicitado e prazo de validade estipulado para retorno.',
    riscoNCG: false
  },
  {
    codigo: '610',
    nome: 'Entrega Amigável Cancelada',
    iconeTipo: 'x-circle',
    observacao: 'Utilizada quando o cliente informa que não realizou a entrega amigável/ ou mudou de idéia em relação à entrega.',
    quandoUsar: 'Quando o cliente havia pré-agendado ou aceitado a entrega amigável do veículo, mas informa desistência ou recusa em entregar o bem.',
    restricoes: 'Reiniciar a abordagem de cobrança, alertar sobre a perda de anistia e o risco iminente de ajuizamento com mandado de busca e apreensão forçada.',
    riscoNCG: false
  },
  {
    codigo: '643',
    nome: 'Chamada Transferida',
    iconeTipo: 'phone-forwarded',
    observacao: 'Utilizada quando realizarmos uma transferência de contato para outro agente.',
    quandoUsar: 'Quando for necessário transferir o cliente para outro operador, mesa de supervisão, setor jurídico ou negociação especializada.',
    restricoes: 'Informar o cliente previamente sobre a transferência e repassar o resumo do atendimento ao agente receptor antes de desconectar.',
    riscoNCG: false
  },
  {
    codigo: '654',
    nome: 'Caixa Postal',
    iconeTipo: 'voicemail',
    observacao: 'Utilizada quando o contato for diretamente para a caixa postal.',
    quandoUsar: 'Quando a ligação for atendida por secretária eletrônica ou mensagem automática de caixa postal sem contato humano.',
    restricoes: 'Não deixar recados com dados sigilosos ou valores na caixa postal eletrônica (violação de sigilo bancário).',
    riscoNCG: false
  },
  {
    codigo: '682',
    nome: 'Cliente não Confirmou Dados',
    iconeTipo: 'shield-alert',
    observacao: 'Utilizada quando o cliente se recusar em confirmar os dados (CPF/Modelo do Veículo...)',
    quandoUsar: 'Quando o interlocutor se apresentar como titular, mas se recusar terminantemente a confirmar os 6 primeiros dígitos do CPF ou a pergunta de segurança.',
    restricoes: 'PROIBIDO dar andamento à negociação ou informar valores sem confirmação positiva (configura NCG por quebra de sigilo bancário / LGPD). Informar os canais oficiais para retorno e encerrar.',
    riscoNCG: true
  },
  {
    codigo: '683',
    nome: 'Telefone Inexistente',
    iconeTipo: 'phone-off',
    observacao: 'Utilizada quando houver uma mensagem eletrônica informando que o número não existe.',
    quandoUsar: 'Quando a operadora telefônica emitir mensagem automática de número inexistente, desativado ou impossibilitado de receber chamadas.',
    restricoes: 'Sinalizar a inativação ou higienização do número no sistema do discador.',
    riscoNCG: false
  },
  {
    codigo: '743',
    nome: 'Sem Previsão de Pagamento',
    iconeTipo: 'alert-triangle',
    observacao: 'Utilizada quando o cliente recusar o pagamento, seja por desemprego, doença, dificuldade financeira...',
    quandoUsar: 'Quando o cliente confirma a dívida, mas alega impossibilidade financeira definitiva no momento (desemprego, saúde, crise) e recusa todas as propostas ofertadas.',
    restricoes: 'Aplicar a fala formal de sanções contratuais (Serasa, juros diários de 0,433%, perda de campanhas e risco de busca e apreensão do veículo).',
    riscoNCG: false
  },
  {
    codigo: '898',
    nome: 'Desconhece Dívida',
    iconeTipo: 'help-circle',
    observacao: 'Utilizada quando o cliente informar que não reconhece a dívida, possui o veículo, mas não reconhece os valores/contrato.',
    quandoUsar: 'Quando o cliente afirma ter o financiamento ou veículo, mas contesta a existência da pendência ou alega desconhecer as parcelas cobradas.',
    restricoes: 'Diferencial do cód. 10 (fraude): aqui o cliente tem o veículo, mas contesta os valores. Orientar conferência no aplicativo do Banco GM e registrar detalhes da contestação.',
    riscoNCG: false
  },
  {
    codigo: '930',
    nome: 'Entrega Amigável (Andamento)',
    iconeTipo: 'truck',
    observacao: 'Utilizada quando realizarmos o contato com o cliente, e o mesmo informar que já informou que irá entregar/em andamento.',
    quandoUsar: 'Quando o cliente relatar que o processo de entrega amigável já foi formalizado e aguarda o agendamento de vistoria ou retirada pelo pátio credenciado.',
    restricoes: 'Confirmar no sistema se consta solicitação de entrega amigável ativa e orientar a aguardar o contato da equipe de logística.',
    riscoNCG: false
  },
  {
    codigo: '1097',
    nome: 'Terceiro Recusa Anotar Recado',
    iconeTipo: 'user-x',
    observacao: 'Utilizada quando a pessoa que atendeu informar que conhece o cliente, mas não irá anotar nem passar recado.',
    quandoUsar: 'Quando a pessoa que atendeu confirmar que tem vínculo ou conhece o titular, mas recusa expressamente anotar os telefones de retorno ou transmitir o recado.',
    restricoes: 'Manter a cordialidade, não insistir agressivamente e NUNCA revelar dados da dívida sob pena de violação de sigilo bancário.',
    riscoNCG: false
  },
  {
    codigo: '1141',
    nome: 'Contrato Devolvido',
    iconeTipo: 'corner-up-left',
    observacao: 'Utilizada quando o contrato do cliente está com o status "DEVOLVIDO"',
    quandoUsar: 'Quando a carteira ou contrato do cliente foi devolvido ao banco GM ou transferido de assessoria e não compete mais a cobrança ativa por esta mesa.',
    restricoes: 'Orientar o cliente a contatar a Central de Atendimento da GM Financial pelo 0800 oficial.',
    riscoNCG: false
  },
  {
    codigo: '1120',
    nome: 'SAC - Reclamação',
    iconeTipo: 'alert-circle',
    observacao: 'Utilizada quando o cliente for direcionado para atendimento com o SAC.',
    quandoUsar: 'Quando o cliente manifestar insatisfação grave, contestação formal de atendimento ou solicitar expressamente registro de reclamação no SAC da instituição.',
    restricoes: 'Fornecer os canais oficiais do SAC da GM Financial e registrar os motivos pontuais da insatisfação no histórico do contrato.',
    riscoNCG: false
  },
  {
    codigo: '1491',
    nome: 'Alega Ação Contrária',
    iconeTipo: 'scale',
    observacao: 'Utilizada quando o cliente informar que já abriu um processo judicial contra a GM.',
    quandoUsar: 'Quando o cliente declarar que ingressou com ação revisional ou processo judicial contra a GM Financial.',
    restricoes: 'Coleta mandatória dos dados da ação (número do processo, comarca e vara). Informar que as ações de cobrança seguem ativas até notificação judicial legal. Ofertar acordo amigável.',
    riscoNCG: false
  },
  {
    codigo: '1547',
    nome: 'Reenvio de Boleto',
    iconeTipo: 'send',
    observacao: 'Utilizada em situação de preventivo, no qual o cliente solicitou o reenvio do boleto.',
    quandoUsar: 'Em contato de preventivo ou cobrança onde o cliente solicita que a 2ª via do boleto do acordo seja reenviada.',
    restricoes: 'Confirmar telefone com WhatsApp e e-mail ativo. Reenviar PDF protegido (senha CPF) e código de barras, confirmando recepção em linha.',
    riscoNCG: false
  },
  {
    codigo: '1549',
    nome: 'Promessa de Pagamento',
    iconeTipo: 'calendar-check',
    observacao: 'Utilizada quando realizarmos um acordo com o cliente.',
    quandoUsar: 'Quando for concluída com sucesso a negociação de acordo (à vista ou parcelado) com valor, data de vencimento e meio de envio pactuados com o cliente.',
    restricoes: 'Obrigatório verbalizar: parcelas negociadas, valor em reais, data de vencimento, canal de envio do boleto, alerta de quebra e orientações antifraude completas.',
    riscoNCG: false
  },
  {
    codigo: '2087',
    nome: 'Proposta de Exceção',
    iconeTipo: 'clock',
    observacao: 'Utilizada quando subirmos uma proposta de exceção para que o banco GM possa avaliar.',
    quandoUsar: 'Quando a negociação requerer desconto, prazo ou condição fora da alçada padrão da assessoria, sendo submetida para aprovação especial da gestão da GM Financial.',
    restricoes: 'Registrar detalhadamente a justificativa no sistema CSLOG. Cobrança monitorada até decisão do banco.',
    riscoNCG: false
  },
  {
    codigo: '2396',
    nome: 'Linha Muda',
    iconeTipo: 'phone-off',
    observacao: 'Utilizada quando a ligação estiver totalmente muda.',
    quandoUsar: 'Quando a chamada for atendida mas não houver qualquer áudio, voz ou retorno sonoro de nenhuma das partes.',
    restricoes: 'Aguardar o tempo técnico de identificação padrão antes de desligar para evitar descarte precoce de ligação.',
    riscoNCG: false
  },
  {
    codigo: '2435',
    nome: 'Veículo com terceiro Sem Pagamento',
    iconeTipo: 'user-x',
    observacao: 'Utilizada quando o cliente informar que o veículo se encontra com terceiro, no qual vem dizendo que não pagará ou repassou.',
    quandoUsar: 'Quando o titular declarar que repassou o veículo para terceiro (venda de gaveta / repasse) e este terceiro está inadimplente ou se recusa a pagar.',
    restricoes: 'Alertar com firmeza que perante a GM Financial o contrato e o CPF responsável permanecem em nome do titular, sendo ele o único executado judicialmente com risco de busca e apreensão.',
    riscoNCG: false
  },
  {
    codigo: '2600',
    nome: 'Realocação de Parcela',
    iconeTipo: 'refresh-cw',
    observacao: 'Utilizada quando realizarmos uma negociação em que realocamos as parcelas em atraso para o fim do contrato.',
    quandoUsar: 'Quando for acordada a realocação das parcelas em atraso para o final do prazo de financiamento mediante aprovação sistêmica.',
    restricoes: 'Conferir requisitos de elegibilidade no sistema CSLOG e informar prazos de efetivação da realocação.',
    riscoNCG: false
  },
  {
    codigo: '2604',
    nome: 'Preventivo Sem Sucesso',
    iconeTipo: 'phone-missed',
    observacao: 'Utilizada quando tentarmos realizar um atendimento preventivo e o cliente não atender.',
    quandoUsar: 'Tentativa de contato preventivo de acordo formalizado onde a ligação toca até cair, dá ocupado ou não é atendida pelo cliente.',
    restricoes: 'Agendar nova tentativa preventiva na fila do discador antes da data de vencimento do boleto.',
    riscoNCG: false
  },
  {
    codigo: '4274',
    nome: 'Em Negociação - Consultoria',
    iconeTipo: 'shield-alert',
    observacao: 'Utilizada quando o cliente já estiver negociando através de uma consultora terceirizada.',
    quandoUsar: 'Quando o cliente alegar que contratou empresa de assessoria/consultoria revisional para mediar o débito com a instituição.',
    restricoes: 'Alertar cordialmente que a Bulgarelli é a assessoria jurídica oficial direta da GM Financial. Esclarecer que intermediários cobram honorários sem garantia de desconto e que o canal direto assegura as melhores condições oficiais.',
    riscoNCG: false
  },
  {
    codigo: '4494',
    nome: 'Cliente vai Pagar via Site',
    iconeTipo: 'receipt',
    observacao: 'Utilizada quando o cliente informar que não irá realizar a negociação conosco, pois irá pagar no site.',
    quandoUsar: 'Quando o cliente recusar o fechamento com o operador afirmando que emitirá o boleto e liquidará diretamente pelo portal ou site oficial da GM Financial.',
    restricoes: 'Orientar a conferência da linha digitável oficial (Banco Itaú 34191) e beneficiário BANCO GM S/A para proteção antifraude. Informar que a cobrança permanece ativa até a compensação.',
    riscoNCG: false
  }
];

export const DICAS_ARGUMENTACAO: DicaArgumentacao[] = [
  // 1. APLICAÇÃO DE GATILHOS MENTAIS NA NEGOCIAÇÃO
  {
    id: 'gatilho-urgencia-escassez',
    categoria: 'gatilhos',
    titulo: 'Gatilho da Urgência / Escassez (Desconto Progressivo & CAMEC)',
    subtitulo: 'Prevenção de procrastinação e valorização da fase pré-ajuizamento',
    comoAplicar: 'Evite disponibilizar a melhor condição de imediato. Apresente a oportunidade como um benefício pontual e exclusivo da fase pré-ajuizamento (CAMEC). O cliente precisa entender que postergar o pagamento acarreta a perda da condição e o avanço de custas judiciais.',
    exemplosPraticos: [
      'Argumentar que a alçada com abatimento expressivo é limitada à campanha em vigor no dia.',
      'Ressaltar que o contrato se encontra na CAMEC (Câmara de Conciliação) e que a distribuição da ação judicial retira qualquer margem de desconto da assessoria.',
      'Fixar prazo limite de retorno ou pagamento em D+1 ou D+2.'
    ],
    beneficioOperacional: 'Evita que o cliente adie a decisão ou desligue sem assumir um compromisso imediato.',
    tags: ['Urgência', 'Escassez', 'CAMEC', 'Desconto Progressivo', 'Campanha']
  },
  {
    id: 'gatilho-dor-alivio',
    categoria: 'gatilhos',
    titulo: 'Gatilho da Dor vs. Alívio (Contraste de Cenários)',
    subtitulo: 'Demonstração matemática do custo da inércia em contraste com a tranquilidade do acordo',
    comoAplicar: 'Coloque os valores reais na mesa. Mostre o custo total acumulado (juros, multas, honorários e risco de bloqueio Renajud/busca e apreensão) em contraste com o alívio imediato do valor negociado e a regularização do contrato.',
    exemplosPraticos: [
      'Apresentar primeiro o valor bruto atualizado com juros diários de 0,433% e multa de 2%.',
      'Em seguida, exibir o valor com a campanha de desconto autorizada, enfatizando a economia em reais.',
      'Destacar o fim das ligações diárias, a preservação do CPF sem apontamentos no Serasa/SPC e a retenção segura da posse do veículo.'
    ],
    beneficioOperacional: 'Torna tangível a vantagem financeira e emocional de fechar o acordo no ato.',
    tags: ['Dor vs Alívio', 'Contraste', 'Juros', 'Renajud', 'Busca e Apreensão']
  },
  {
    id: 'gatilho-autoridade-clareza',
    categoria: 'gatilhos',
    titulo: 'Gatilho da Autoridade e Clareza',
    subtitulo: 'Transmissão de domínio técnico, respaldo legal e segurança operacional',
    comoAplicar: 'Conduza o diálogo com firmeza, clareza e domínio dos termos técnicos e legais. A segurança transmitida pelo operador reduz o receio do cliente e gera credibilidade na negociação.',
    exemplosPraticos: [
      'Explicar os procedimentos com base no Código de Defesa do Consumidor e normas do BACEN sem gírias ou hesitação.',
      'Dominar os conceitos jurídicos (Alienação Fiduciária, Notificação Formal, Ajuizamento, Bloqueio Renajud).',
      'Postura resoluta: o operador atua como um consultor jurídico e financeiro da carteira, não como mero cobrador.'
    ],
    beneficioOperacional: 'Reduz contestações descabidas e previne que o cliente recorra a consultorias revisionais externas.',
    tags: ['Autoridade', 'Clareza', 'Termos Legais', 'Credibilidade', 'Firmeza']
  },
  {
    id: 'gatilho-reciprocidade',
    categoria: 'gatilhos',
    titulo: 'Gatilho da Reciprocidade (Concessão com Contrapartida)',
    subtitulo: 'Flexibilização estratégica condicionada a compromissos concretos',
    comoAplicar: 'Nunca entregue flexibilizações de forma gratuita. Cada concessão de desconto, prazo ou parcela deve exigir uma contrapartida direta do cliente (ex.: fechamento imediato ou antecipação de vencimento).',
    exemplosPraticos: [
      'Exemplo de fala: "Sr. Carlos, consigo submeter à supervisão a isenção de parte dos encargos, desde que o senhor assuma o compromisso de realizar a liquidação do boleto impreterivelmente até as 16h de hoje. Podemos fechar desta forma?"',
      'Se o cliente pedir mais prazo, negociar um valor de entrada maior ou pagamento via Quita+.'
    ],
    beneficioOperacional: 'Evita a desvalorização do desconto e garante alta taxa de conversão em pagamentos reais.',
    tags: ['Reciprocidade', 'Contrapartida', 'Concessão', 'Fechamento Imediato']
  },

  // 2. TÉCNICA DA VENDA CALCULADA (NEGOCIAÇÃO ESTRUTURADA)
  {
    id: 'venda-diagnostico-sondagem',
    categoria: 'venda_calculada',
    titulo: 'Diagnóstico e Sondagem Ativa',
    subtitulo: 'Mapeamento minucioso da causa real da inadimplência e capacidade de pagamento',
    comoAplicar: 'Não avance para propostas sem antes mapear o motivo real do atraso. Faça perguntas assertivas para entender a capacidade financeira do cliente e saber exatamente até onde ele pode assumir um compromisso.',
    exemplosPraticos: [
      'Perguntar com empatia: "Para que possamos desenhar a melhor alternativa, o que ocorreu neste período que motivou o atraso da parcela?"',
      'Investigar fluxo de renda: data de pagamento de salário, faturamento da empresa ou previsão de recebimento de valores.',
      'Identificar se o cliente é elegível ao Seguro Prestamista MetLife (em caso de desemprego involuntário).'
    ],
    beneficioOperacional: 'Evita ofertar propostas inviáveis que geram quebra de acordo e perda de tempo na esteira.',
    tags: ['Diagnóstico', 'Sondagem Ativa', 'Motivo Real', 'Capacidade Financeira']
  },
  {
    id: 'venda-margem-manobra',
    categoria: 'venda_calculada',
    titulo: 'Margem de Manobra (Não Queimar a Melhor Proposta)',
    subtitulo: 'Proteção da esteira de recuperação com concessões graduais e planejadas',
    comoAplicar: 'Inicie com uma proposta intermediária que proteja a recuperação do débito. Guarde a melhor condição de desconto/parcelamento como margem de segurança caso haja recusa.',
    exemplosPraticos: [
      'Apresentar primeiro a quitação integral com valor atualizado ou com desconto inicial tímido.',
      'Apenas se o cliente demonstrar recusa justificada, avançar para a alçada de desconto máxima autorizada pelo sistema.',
      'Preservar alçadas especiais de supervisão para momentos decisivos da negociação.'
    ],
    beneficioOperacional: 'Cumpre a regra do Desconto Progressivo da monitoria (-12 pontos se entregar o desconto de largada).',
    tags: ['Margem de Manobra', 'Proposta Intermediária', 'Alçada', 'Desconto Gradual']
  },
  {
    id: 'venda-desconstrucao-objecoes',
    categoria: 'venda_calculada',
    titulo: 'Desconstrução de Objeções',
    subtitulo: 'Transformar o "Não" inicial em oportunidade de alinhamento e alternativa viável',
    comoAplicar: 'Utilize o "Não" inicial como ponto de partida da negociação. Adapte o fluxo conforme o obstáculo apresentado (ampliar prazo, ajustar entrada, explorar alternativas como cartão de crédito ou negociar com base na preservação do bem).',
    exemplosPraticos: [
      'Se o cliente alega falta de limite ou dinheiro em conta: Apresentar a plataforma Quita+ com parcelamento em até 21x no cartão.',
      'Se o cliente reclama de juros altos: Demonstrar a fundamentação contratual (0,433% a.d. e BACEN) e aplicar a campanha.',
      'Se o cliente cogita devolver o carro ou entregar para terceiro: Explicar os riscos de ajuizamento imediato, leilão e saldo remanescente.'
    ],
    beneficioOperacional: 'Eleva a conversão em chamadas que seriam encerradas precocemente como "Sem Previsão".',
    tags: ['Objeções', 'Quita+', 'Adaptação', 'Persuasão', 'Preservação do Bem']
  },
  {
    id: 'venda-fechamento-realista',
    categoria: 'venda_calculada',
    titulo: 'Fechamento Realista (Garantia de Efetividade)',
    subtitulo: 'Alinhamento financeiro focado na liquidação efetiva e não em promessas vazias',
    comoAplicar: 'Alinhe valores e datas que realmente correspondam à realidade do cliente, garantindo que o acordo firmado se converta em pagamento efetivo e evite quebras de compromisso.',
    exemplosPraticos: [
      'Evitar forçar vencimento para data em que o cliente declarou não ter recursos.',
      'Confirmar canal de recebimento imediato (WhatsApp ou E-mail) e reforçar as regras antifraude de ativação (90 minutos) e pagamento.',
      'Salientar que o não pagamento acarreta a perda da campanha de descontos e avanço do ajuizamento.'
    ],
    beneficioOperacional: 'Garante o atingimento da meta de Efetividade (relação entre acordos gerados vs. boletos pagos).',
    tags: ['Fechamento Realista', 'Efetividade', 'Boleto Pago', 'Evitar Quebra']
  },

  // 1. GATILHOS MENTAIS ADICIONAIS DE ALTO IMPACTO
  {
    id: 'gatilho-compromisso-coerencia',
    categoria: 'gatilhos',
    titulo: 'Gatilho do Compromisso & Coerência (Micro-Acordos Sucessivos)',
    subtitulo: 'Condução por pequenas confirmações afirmativas até o fechamento da promessa',
    comoAplicar: 'Faça o cliente concordar com premissas lógicas incontestáveis antes de solicitar a data do pagamento. Quando uma pessoa assume um compromisso verbal passo a passo, a tendência psicológica natural é manter a coerência com suas respostas anteriores.',
    exemplosPraticos: [
      'Pergunta 1: "O senhor concorda que manter o veículo rodando livre de qualquer risco de apreensão é a prioridade da sua família hoje?"',
      'Pergunta 2: "E se conseguirmos uma condição que estanque a incidência de juros diários e retire seu CPF da lista de ajuizamento, seria positivo para o senhor regularizar agora?"',
      'Pergunta de Fechamento: "Perfeito. Sendo assim, o boleto com essa condição especial fica melhor no vencimento para hoje ou amanhã pela manhã?"'
    ],
    beneficioOperacional: 'Quebra posturas defensivas e reduz cancelamentos de promessas de pagamento.',
    tags: ['Compromisso', 'Coerência', 'Micro-Acordos', 'Sim Sucessivo', 'Fechamento']
  },
  {
    id: 'gatilho-prova-social',
    categoria: 'gatilhos',
    titulo: 'Gatilho da Prova Social & Normalização Positiva',
    subtitulo: 'Desestigmatizar a inadimplência e mostrar que a conciliação é a rota padrão de sucesso',
    comoAplicar: 'Mostre que imprevistos financeiros acontecem com diversos clientes da carteira, mas que os clientes mais prudentes utilizam a fase amigável do escritório para proteger seu patrimônio antes da fase de leilão judicial.',
    exemplosPraticos: [
      '"Sr. Carlos, entendemos que imprevistos ocorrem. Grande parte dos clientes que nos contatam nesta semana optaram por liquidar as parcelas pendentes aproveitando a campanha de redução de encargos para não correr o risco de ter o veículo bloqueado via Renajud."',
      '"Essa mesma oportunidade via Quita+ em 21x permitiu que dezenas de clientes regularizassem o contrato sem comprometer o orçamento do mês."'
    ],
    beneficioOperacional: 'Reduz o sentimento de constrangimento do cliente, transformando a negociação em uma decisão inteligente e habitual.',
    tags: ['Prova Social', 'Normalização', 'Empatia', 'CAMEC', 'Patrimônio']
  },

  // 3. TÉCNICAS COMPLEMENTARES DE COMUNICAÇÃO PERSUASIVA
  {
    id: 'linguagem-ancoragem-de-preco',
    categoria: 'linguagem_persuasiva',
    titulo: 'Técnica de Ancoragem de Preço e Valor Percebido',
    subtitulo: 'Fixar o custo total com juros antes de revelar o desconto da campanha',
    comoAplicar: 'O cérebro humano julga valores por comparação direta. Ao verbalizar primeiro o valor total da dívida com juros de mora (0,433% a.d.), multa de 2% e honorários, você estabelece uma âncora alta. Em seguida, ao ofertar o valor negociado com abatimento, o benefício econômico se torna evidente.',
    exemplosPraticos: [
      '1º Passo (Âncora): "Hoje o saldo total atualizado da(s) parcela(s) com todos os encargos legais de contrato atinge R$ 3.200,00."',
      '2º Passo (Contraste): "Porém, conseguimos autorizar uma condição especial com desconto nos encargos trazendo o valor para R$ 2.450,00."',
      '3º Passo (Reforço do Ganho): "Isso representa uma economia imediata de R$ 750,00 para liquidar a pendência hoje."'
    ],
    beneficioOperacional: 'Faz o cliente enxergar a oportunidade imediata de economia em vez de focar apenas no valor a pagar.',
    tags: ['Ancoragem', 'Valor Percebido', 'Contraste Numérico', 'Desconto Progressivo']
  },
  {
    id: 'linguagem-rotulagem-empatica',
    categoria: 'linguagem_persuasiva',
    titulo: 'Técnica de Rotulagem Empática (Desarme de Clientes Exaltados)',
    subtitulo: 'Neutralizar agressividade e reclamações através do reconhecimento verbal',
    comoAplicar: 'Quando o cliente estiver ríspido, agressivo ou reclamando de excesso de ligações, não debata e não tente justificar de imediato. Nomeie o sentimento do cliente ("rotulagem") para desarmar a tensão emocional e trazê-lo de volta para o plano racional da negociação.',
    exemplosPraticos: [
      '"Percebo que essa situação financeira tem sido desgastante e que as ligações frequentes causaram incômodo no seu dia."',
      '"Dá a impressão de que o senhor sente que o banco não está considerando suas dificuldades anteriores, correto?"',
      'Assim que o cliente validar com "Sim, exatamente!", continue: "Entendo perfeitamente, e é justamente para cessar esses acionamentos diários e resolver essa pendência de forma definitiva que estou aqui hoje com uma condição especial."'
    ],
    beneficioOperacional: 'Desarma discussões que poderiam acarretar NCG por atrito verbal e reconduz a chamada para o acordo.',
    tags: ['Rotulagem Empática', 'Desarme', 'Inteligência Emocional', 'Escuta Ativa']
  },
  {
    id: 'linguagem-pergunta-calibrada',
    categoria: 'linguagem_persuasiva',
    titulo: 'Perguntas Calibradas com "Como" e "O Que" (Foco na Ação)',
    subtitulo: 'Substituição de perguntas fechadas ("Sim/Não") por perguntas que forçam a resolução prática',
    comoAplicar: 'Evite fazer perguntas que permitam ao cliente simplesmente responder "Não tenho interesse" ou "Não vou pagar". Utilize perguntas abertas iniciadas por "Como" ou "O que", que transferem a responsabilidade da solução financeira para o interlocutor.',
    exemplosPraticos: [
      'Em vez de: "O senhor quer pagar essa parcela hoje?" (Permite resposta "Não")',
      'Use: "Como podemos estruturar esse valor para que caiba no seu orçamento antes do fechamento bancário de hoje?"',
      'Em vez de: "Vai ficar com o carro ou devolver?"',
      'Use: "O que o senhor planejou para evitar que as medidas judiciais de busca e apreensão avancem sobre o veículo neste mês?"'
    ],
    beneficioOperacional: 'Evita bloqueios rápidos de conversa e estimula o cliente a pensar em soluções financeiras concretas.',
    tags: ['Perguntas Calibradas', 'Perguntas Abertas', 'Condução Firme', 'Sondagem']
  },
  {
    id: 'linguagem-silencio-estrategico',
    categoria: 'linguagem_persuasiva',
    titulo: 'O Silêncio Estratégico Pós-Proposta (Regra do Primeiro a Falar)',
    subtitulo: 'Pausa deliberada imediatamente após a pergunta de fechamento',
    comoAplicar: 'Após apresentar a proposta com desconto e realizar a pergunta de fechamento ("Podemos confirmar o vencimento para hoje às 16h?"), entre em silêncio absoluto e aguarde a resposta do cliente. Jamais continue falando, justificando ou diminuindo mais o valor antes da manifestação dele.',
    exemplosPraticos: [
      'Apresentar o valor acordado com clareza.',
      'Fazer a pergunta de confirmação de data e canal.',
      'Fazer silêncio durante 5 a 10 segundos até o cliente responder.',
      'Se o cliente hesitar, somente então investigue qual o ponto exato que o impede de aceitar.'
    ],
    beneficioOperacional: 'Impede o atendente de conceder concessões desnecessárias por ansiedade e eleva a conversão.',
    tags: ['Silêncio Estratégico', 'Pausa Decisiva', 'Autocontrole', 'Fechamento']
  }
];

