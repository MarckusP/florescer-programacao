/* =========================================================================
   Florescer 2026 — dados da programação
   Congresso de Mulheres Brasileiras da Flórida · 14 a 16 de Agosto
   Programação FICTÍCIA para demonstração do app de crachá (PWA).
   ========================================================================= */

const EVENT = {
  name: "Florescer 2026",
  motto: "Florescendo no tempo de Deus",
  dates: "14 a 16 de Agosto · Flórida",
};

/* ---- Palestrantes ------------------------------------------------------- */
const SPEAKERS = {
  leiliane: {
    id: "leiliane",
    name: "Leiliane Rocha",
    role: "Palestrante",
    tag: "Proteção da Infância",
    photo: "img/leiliane-rocha.webp",
    bio: "Psicóloga (CRP 09/013199), especialista em sexualidade e autora do método ESEPAS — Educação Sexual, Emocional e Prevenção ao Abuso Sexual. Desde 2003 dedica sua carreira à proteção da infância, com mais de 23 mil alunos formados no Brasil e no mundo.",
    ig: "leilianerochapsicologa",
  },
  eidiomara: {
    id: "eidiomara",
    name: "Eidiomara Carvalho",
    role: "Palestrante",
    tag: "Sexualidade & Saúde Íntima",
    photo: "img/eidiomara-carvalho.webp",
    bio: "Fisioterapeuta pélvica, sexóloga, escritora e palestrante. Atua na saúde íntima, educação sexual e fortalecimento de casais, com foco na sexualidade feminina e no bem-estar conjugal sob uma perspectiva cristã.",
    ig: "eidiomara.carvalho",
  },
  rosanaAlves: {
    id: "rosanaAlves",
    name: "Rosana Alves",
    role: "Palestrante",
    tag: "Neurociência & Comportamento",
    photo: "img/rosana-alves.webp",
    bio: "Psicóloga e neurocientista, doutora pela UNIFESP e pós-doutora no Brasil e nos EUA. Reconhecida por tornar a neurociência acessível e aplicável ao dia a dia. Autora de best-sellers sobre inteligência emocional.",
    ig: null,
  },
  rosanaFonseca: {
    id: "rosanaFonseca",
    name: "Rosana Fonseca",
    role: "Palestrante",
    tag: "Palavra & Transformação",
    photo: "img/rosana-fonseca.webp",
    bio: "Palestrante, mentora e ministra cristã, conhecida por sua comunicação sensível, acolhedora e profundamente bíblica. Ministra há mais de 20 anos em conferências e retiros femininos.",
    ig: null,
  },
  riane: {
    id: "riane",
    name: "Riane Junqueira",
    role: "Cantora Convidada",
    tag: "Louvor & Adoração",
    photo: "img/riane-junqueira.webp",
    bio: "Cantora e compositora evangélica, com milhões de visualizações em suas músicas. Uma das vozes mais marcantes da música cristã contemporânea brasileira, conduz momentos de intimidade com Deus.",
    ig: null,
  },
};

/* ---- Salas -------------------------------------------------------------- */
const ROOMS = {
  principal: { name: "Salão Amarílis", short: "Salão Principal", color: "wine" },
  jardim: { name: "Sala Jardim", short: "Sala Jardim", color: "sage" },
  renascer: { name: "Sala Renascer", short: "Sala Renascer", color: "coral" },
  capela: { name: "Capela", short: "Capela", color: "gold" },
  geral: { name: "Área de Convivência", short: "Convivência", color: "muted" },
};

/* ---- Tipos de atividade ------------------------------------------------- */
// kinds: palestra | louvor | devocional | pausa | plenaria
//
// Cada "slot" tem um horário e uma lista de sessões.
// Quando um slot tem mais de uma sessão de PALESTRA, elas são simultâneas
// e a pessoa escolhe para qual quer ir (marca no "Meu Roteiro").

const SCHEDULE = [
  {
    id: "sex",
    label: "Sexta",
    date: "14 de Agosto",
    weekday: "Sexta-feira",
    slots: [
      {
        time: "17:00",
        sessions: [
          { id: "s1", kind: "pausa", title: "Credenciamento & Boas-vindas", room: "geral", desc: "Retire seu crachá, kit e conheça o espaço." },
        ],
      },
      {
        time: "19:00",
        sessions: [
          { id: "s2", kind: "plenaria", title: "Abertura Oficial — O Florescer Começa", room: "principal", speaker: "rosanaFonseca", desc: "Uma palavra de acolhimento para abrir três dias de transformação." },
        ],
      },
      {
        time: "20:30",
        sessions: [
          { id: "s3", kind: "louvor", title: "Noite de Louvor & Adoração", room: "principal", speaker: "riane", desc: "Uma atmosfera de intimidade com Deus para começar o congresso." },
        ],
      },
      {
        time: "22:00",
        sessions: [
          { id: "s4", kind: "pausa", title: "Comunhão & Café", room: "geral", desc: "Momento de conexão entre as participantes." },
        ],
      },
    ],
  },
  {
    id: "sab",
    label: "Sábado",
    date: "15 de Agosto",
    weekday: "Sábado",
    slots: [
      {
        time: "07:30",
        sessions: [
          { id: "b1", kind: "devocional", title: "Devocional Matinal", room: "capela", speaker: "rosanaFonseca", desc: "Comece o dia recentrando o coração." },
        ],
      },
      {
        time: "08:30",
        sessions: [
          { id: "b2", kind: "pausa", title: "Café da Manhã", room: "geral" },
        ],
      },
      {
        time: "09:30",
        note: "Sessões simultâneas — escolha uma",
        sessions: [
          { id: "b3", kind: "palestra", title: "Protegendo Nossos Filhos", room: "principal", speaker: "leiliane", desc: "Como reconhecer sinais e prevenir o abuso sexual infantil antes que ele aconteça." },
          { id: "b4", kind: "palestra", title: "Reprogramando a Mente para Florescer", room: "jardim", speaker: "rosanaAlves", desc: "A neurociência das emoções: como criar novos caminhos mentais na prática." },
        ],
      },
      {
        time: "11:00",
        note: "Sessões simultâneas — escolha uma",
        sessions: [
          { id: "b5", kind: "palestra", title: "Sexualidade com Propósito", room: "principal", speaker: "eidiomara", desc: "Intimidade, saúde e bem-estar conjugal sob a ótica da fé." },
          { id: "b6", kind: "palestra", title: "A Cura que Vem da Palavra", room: "renascer", speaker: "rosanaFonseca", desc: "Ensino bíblico e aconselhamento para dores silenciosas." },
        ],
      },
      {
        time: "12:30",
        sessions: [
          { id: "b7", kind: "pausa", title: "Almoço & Conexões", room: "geral" },
        ],
      },
      {
        time: "14:30",
        note: "Sessões simultâneas — escolha uma",
        sessions: [
          { id: "b8", kind: "palestra", title: "ESEPAS na Prática", room: "principal", speaker: "leiliane", desc: "Oficina prática do método de educação sexual e prevenção ao abuso." },
          { id: "b9", kind: "palestra", title: "Inteligência Emocional no Dia a Dia", room: "jardim", speaker: "rosanaAlves", desc: "Ferramentas para regular emoções e fortalecer relações." },
          { id: "b10", kind: "palestra", title: "Roda de Conversa: Casamento & Intimidade", room: "renascer", speaker: "eidiomara", desc: "Um espaço aberto para perguntas sobre relacionamento conjugal." },
        ],
      },
      {
        time: "16:30",
        sessions: [
          { id: "b11", kind: "pausa", title: "Momento de Autocuidado", room: "geral", desc: "Intervalo livre para respirar, orar e descansar." },
        ],
      },
      {
        time: "19:30",
        sessions: [
          { id: "b12", kind: "plenaria", title: "Noite de Celebração", room: "principal", speaker: "rosanaFonseca", desc: "Ministração de fé e propósito para todas as participantes." },
          { id: "b13", kind: "louvor", title: "Louvor de Celebração", room: "principal", speaker: "riane", desc: "Adoração ao encerrar o dia." },
        ],
      },
    ],
  },
  {
    id: "dom",
    label: "Domingo",
    date: "16 de Agosto",
    weekday: "Domingo",
    slots: [
      {
        time: "08:00",
        sessions: [
          { id: "d1", kind: "devocional", title: "Devocional de Encerramento", room: "capela", speaker: "rosanaFonseca" },
        ],
      },
      {
        time: "09:00",
        sessions: [
          { id: "d2", kind: "pausa", title: "Café da Manhã", room: "geral" },
        ],
      },
      {
        time: "09:30",
        note: "Sessões simultâneas — escolha uma",
        sessions: [
          { id: "d3", kind: "palestra", title: "Florescer no Tempo de Deus", room: "principal", speaker: "rosanaAlves", desc: "Ciência e fé juntas para uma vida emocionalmente saudável." },
          { id: "d4", kind: "palestra", title: "A Prevenção Começa em Casa", room: "jardim", speaker: "leiliane", desc: "Como levar a proteção da infância para dentro da família." },
        ],
      },
      {
        time: "11:00",
        sessions: [
          { id: "d5", kind: "plenaria", title: "Ministração Final & Consagração", room: "principal", speaker: "rosanaFonseca", desc: "O envio: florescendo para transformar o mundo ao redor." },
          { id: "d6", kind: "louvor", title: "Louvor de Encerramento", room: "principal", speaker: "riane" },
        ],
      },
      {
        time: "12:30",
        sessions: [
          { id: "d7", kind: "pausa", title: "Brunch de Despedida", room: "geral", desc: "Até o próximo Florescer!" },
        ],
      },
    ],
  },
];
