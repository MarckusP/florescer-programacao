/* =========================================================================
   Florescer 2026 — dados da programação
   Congresso de Mulheres Brasileiras da Flórida · 14 a 16 de Agosto
   Roteiro oficial fornecido pela organização. Nomes de salas e alguns
   horários de rodadas de workshop foram estimados e devem ser confirmados
   com a produção do evento.
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
  amanda: {
    id: "amanda",
    name: "Amanda Leonardi",
    role: "Palestrante",
    tag: "Adolescentes & Jovens",
    photo: null,
    bio: "Palestrante convidada do Florescer 2026, conduz os workshops e o talk voltados para meninas e adolescentes.",
    ig: null,
  },
};

/* ---- Salas -------------------------------------------------------------- */
const ROOMS = {
  principal: { name: "Salão Amarílis", short: "Salão Principal", color: "wine" },
  jardim: { name: "Sala Jardim", short: "Sala Jardim", color: "sage" },
  renascer: { name: "Sala Renascer", short: "Sala Renascer", color: "coral" },
  recomeco: { name: "Sala Recomeço", short: "Sala Recomeço", color: "gold" },
  capela: { name: "Capela", short: "Capela", color: "gold" },
  externa: { name: "Área Externa", short: "Área Externa", color: "sage" },
  geral: { name: "Área de Convivência", short: "Convivência", color: "muted" },
};

/* ---- Tipos de atividade ------------------------------------------------- */
// kinds: palestra | louvor | devocional | pausa | plenaria | testemunho
//
// Cada "slot" tem um horário e uma lista de sessões.
// Quando um slot tem mais de uma sessão de PALESTRA, elas são simultâneas
// e a pessoa escolhe para qual quer ir (marca no "Meu Roteiro").
//
// `notify: true` marca sessões de destaque (não-palestra) que também entram
// automaticamente nos lembretes locais, mesmo sem estarem no roteiro.

const SCHEDULE = [
  {
    id: "sex",
    label: "Sexta",
    date: "14 de Agosto",
    iso: "2026-08-14",
    weekday: "Sexta-feira",
    slots: [
      {
        time: "16:00",
        sessions: [
          { id: "s1", kind: "pausa", title: "Check-in", room: "geral", desc: "Chegue, retire seu crachá e conheça o espaço." },
        ],
      },
      {
        time: "18:30",
        sessions: [
          { id: "s2", kind: "plenaria", title: "Abertura Oficial", room: "principal", notify: true, desc: "Vídeo curto do Florescer, vídeo-testemunho e um momento musical com Riane Junqueira." },
        ],
      },
      {
        time: "18:40",
        sessions: [
          { id: "s3", kind: "louvor", title: "Louvor", room: "principal", speaker: "riane", desc: "20–25 minutos de louvor e adoração para abrir o coração." },
        ],
      },
      {
        time: "19:05",
        sessions: [
          { id: "s4", kind: "plenaria", title: "Boas-vindas + Visão do Evento", room: "principal", desc: "Palavra de boas-vindas e apresentação da visão do Florescer 2026." },
        ],
      },
      {
        time: "19:20",
        sessions: [
          { id: "s5", kind: "palestra", title: "Primeira Ministração", room: "principal", speaker: "rosanaAlves", desc: "35–40 minutos de ministração." },
        ],
      },
      {
        time: "20:00",
        sessions: [
          { id: "s6", kind: "louvor", title: "Música Especial", room: "principal", speaker: "riane", desc: "Momento musical especial com a cantora convidada." },
        ],
      },
      {
        time: "20:15",
        sessions: [
          { id: "s7", kind: "palestra", title: "Segunda Ministração", room: "principal", speaker: "rosanaFonseca", desc: "35–40 minutos de ministração." },
        ],
      },
      {
        time: "21:00",
        sessions: [
          { id: "s8", kind: "devocional", title: "Oração Final", room: "principal", desc: "Momento de oração para encerrar a noite." },
        ],
      },
      {
        time: "21:20",
        sessions: [
          { id: "s9", kind: "pausa", title: "Avisos", room: "principal", desc: "Informações e avisos importantes para o fim de semana." },
        ],
      },
      {
        time: "21:30",
        sessions: [
          { id: "s10", kind: "pausa", title: "Encerramento", room: "geral", notify: true, desc: "Fim da primeira noite do Florescer." },
        ],
      },
    ],
  },
  {
    id: "sab",
    label: "Sábado",
    date: "15 de Agosto",
    iso: "2026-08-15",
    weekday: "Sábado",
    slots: [
      {
        time: "07:00",
        sessions: [
          { id: "b1", kind: "devocional", title: "Culto", room: "capela", speaker: "rosanaFonseca", notify: true, desc: "Culto matinal para começar o dia com Deus." },
        ],
      },
      {
        time: "08:00",
        sessions: [
          { id: "b2", kind: "pausa", title: "Café da Manhã", room: "geral" },
        ],
      },
      {
        time: "09:00",
        sessions: [
          { id: "b3", kind: "louvor", title: "Louvor", room: "principal", speaker: "riane" },
        ],
      },
      {
        time: "09:25",
        sessions: [
          { id: "b4", kind: "testemunho", title: "Testemunho", room: "principal", desc: "Um testemunho de vida e fé." },
        ],
      },
      {
        time: "09:40",
        sessions: [
          { id: "b5", kind: "louvor", title: "Mensagem Musical", room: "principal", speaker: "riane" },
        ],
      },
      {
        time: "09:50",
        sessions: [
          { id: "b6", kind: "palestra", title: "Primeira Ministração", room: "principal", speaker: "leiliane" },
        ],
      },
      {
        time: "10:35",
        sessions: [
          { id: "b7", kind: "plenaria", title: "Roda de Conversa com as Palestrantes", room: "principal", desc: "Bate-papo em roda com Leiliane Rocha, Eidiomara Carvalho e Dra. Rosana Alves." },
        ],
      },
      {
        time: "11:10",
        sessions: [
          { id: "b8", kind: "palestra", title: "Segunda Ministração", room: "principal", speaker: "rosanaAlves" },
        ],
      },
      {
        time: "11:55",
        sessions: [
          { id: "b9", kind: "louvor", title: "Mensagem Musical", room: "principal", speaker: "riane" },
        ],
      },
      {
        time: "12:15",
        sessions: [
          { id: "b10", kind: "devocional", title: "Oração Final", room: "principal" },
        ],
      },
      {
        time: "12:30",
        sessions: [
          { id: "b11", kind: "pausa", title: "Almoço & Conexões", room: "geral" },
        ],
      },
      {
        time: "13:30",
        sessions: [
          { id: "b12", kind: "pausa", title: "Descanso — Tempo Livre", room: "geral", desc: "Tempo livre para descansar antes dos workshops." },
        ],
      },
      {
        time: "15:00",
        note: "Workshops · Rodada 1 — escolha uma",
        sessions: [
          { id: "b13", kind: "palestra", title: "Workshop · Mulheres Adultas", room: "jardim", speaker: "eidiomara", desc: "Workshop para mulheres adultas." },
          { id: "b14", kind: "palestra", title: "Workshop Teen 1", room: "renascer", speaker: "amanda", desc: "Workshop para meninas e adolescentes." },
          { id: "b15", kind: "palestra", title: "Workshop Teen 2", room: "recomeco", speaker: "leiliane", desc: "Workshop para meninas e adolescentes." },
        ],
      },
      {
        time: "16:00",
        note: "Workshops · Rodada 2 (troca de turma) — escolha uma",
        sessions: [
          { id: "b16", kind: "palestra", title: "Workshop Teen 1", room: "renascer", speaker: "leiliane", desc: "Workshop para meninas e adolescentes — troca de turma." },
          { id: "b17", kind: "palestra", title: "Workshop Teen 2", room: "recomeco", speaker: "amanda", desc: "Workshop para meninas e adolescentes — troca de turma." },
        ],
      },
      {
        time: "17:30",
        sessions: [
          { id: "b18", kind: "devocional", title: "Momento Externo no Pôr do Sol", room: "externa", speaker: "rosanaAlves", notify: true, desc: "Um momento especial ao ar livre, ao pôr do sol." },
        ],
      },
      {
        time: "18:30",
        sessions: [
          { id: "b19", kind: "pausa", title: "Tempo Livre Para Se Arrumar", room: "geral" },
        ],
      },
      {
        time: "19:30",
        sessions: [
          { id: "b20", kind: "pausa", title: "Jantar e Festa", room: "geral", notify: true, desc: "Jantar especial e festa de celebração." },
        ],
      },
      {
        time: "20:15",
        note: "Sessões simultâneas — escolha uma",
        sessions: [
          { id: "b21", kind: "palestra", title: "Talk Íntimo no Sofá · Mulheres Adultas", room: "jardim", speaker: "eidiomara", desc: "Talk íntimo no sofá para mulheres adultas, com brindes." },
          { id: "b22", kind: "palestra", title: "Talk Íntimo no Sofá · Meninas", room: "renascer", speaker: "amanda", desc: "Talk íntimo no sofá para meninas e adolescentes." },
        ],
      },
      {
        time: "21:40",
        sessions: [
          { id: "b23", kind: "pausa", title: "Encerramento", room: "geral", desc: "Fim da noite de sábado." },
        ],
      },
    ],
  },
  {
    id: "dom",
    label: "Domingo",
    date: "16 de Agosto",
    iso: "2026-08-16",
    weekday: "Domingo",
    slots: [
      {
        time: "08:00",
        sessions: [
          { id: "d1", kind: "pausa", title: "Café", room: "geral" },
        ],
      },
      {
        time: "09:00",
        sessions: [
          { id: "d2", kind: "louvor", title: "Louvor — Programa de Encerramento", room: "principal", speaker: "riane", notify: true },
        ],
      },
      {
        time: "09:20",
        sessions: [
          { id: "d3", kind: "palestra", title: "Ministração", room: "principal", speaker: "rosanaAlves" },
        ],
      },
      {
        time: "09:50",
        sessions: [
          { id: "d4", kind: "louvor", title: "Mensagem Musical", room: "principal", speaker: "riane" },
        ],
      },
      {
        time: "10:00",
        sessions: [
          { id: "d5", kind: "pausa", title: "Brindes", room: "geral", desc: "Momento de brindes e lembranças." },
        ],
      },
      {
        time: "10:15",
        sessions: [
          { id: "d6", kind: "palestra", title: "Palavra Final", room: "principal", speaker: "rosanaAlves" },
        ],
      },
      {
        time: "10:45",
        sessions: [
          { id: "d7", kind: "louvor", title: "Mensagem Musical", room: "principal", speaker: "riane" },
        ],
      },
      {
        time: "10:55",
        sessions: [
          { id: "d8", kind: "plenaria", title: "Batismo", room: "capela", notify: true, desc: "Momento especial de batismo nas águas." },
        ],
      },
      {
        time: "12:00",
        sessions: [
          { id: "d9", kind: "pausa", title: "Agradecimentos e Encerramento", room: "geral", notify: true, desc: "Agradecimentos finais e encerramento do Florescer 2026." },
        ],
      },
    ],
  },
];
