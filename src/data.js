import { Brain, AlertCircle, Stethoscope, Zap, BookOpen, GraduationCap } from 'lucide-react';

// --- CATEGORIAS ---
export const topics = [
  { id: 'dev', name: 'Desenvolvimento', icon: Brain, color: 'bg-purple-100 text-purple-600' },
  { id: 'dis', name: 'Distúrbios', icon: AlertCircle, color: 'bg-red-100 text-red-600' },
  { id: 'int', name: 'Intervenção', icon: Stethoscope, color: 'bg-blue-100 text-blue-600' },
  { id: 'teor', name: 'Teóricos', icon: GraduationCap, color: 'bg-green-100 text-green-600' },
];

// --- MATERIAIS DE ESTUDO (A novidade!) ---
export const studyMaterials = [
  {
    id: 'piaget-resumo',
    categoryId: 'dev',
    title: 'Resumo: Os 4 Estágios de Piaget',
    readTime: '3 min',
    content: `
      Jean Piaget propõe que o desenvolvimento cognitivo ocorre em 4 estágios universais:
      
      1. Sensório-motor (0-2 anos): A inteligência é prática. A criança explora o mundo pelos sentidos e movimento. Conquista principal: Permanência do objeto.
      
      2. Pré-operatório (2-7 anos): Surge a função simbólica (linguagem, faz-de-conta). O pensamento é egocêntrico (dificuldade em ver o ponto de vista do outro) e centrado (foca em apenas um aspecto da situação).
      
      3. Operatório Concreto (7-11 anos): Início da lógica, mas dependente de objetos concretos. Domina conceitos de conservação (ex: quantidade de água não muda se o copo muda) e reversibilidade.
      
      4. Operatório Formal (11+ anos): Pensamento abstrato e hipotético-dedutivo. Capacidade de pensar sobre o próprio pensamento (metacognição) e discutir valores éticos e políticos.
    `
  },
  {
    id: 'dislexia-guia',
    categoryId: 'dis',
    title: 'Guia Rápido: O que é Dislexia?',
    readTime: '2 min',
    content: `
      A Dislexia é um Transtorno Específico de Aprendizagem (TEA) de origem neurobiológica.
      
      Principais Sinais:
      - Dificuldade no reconhecimento preciso ou fluente de palavras.
      - Problemas de decodificação e soletração.
      - Leitura lenta e trabalhosa.
      
      O que NÃO é:
      - Não é falta de inteligência (QI é normal ou acima da média).
      - Não é preguiça ou falta de interesse.
      - Não é causado por problemas de visão (embora possam coexistir).
      
      Intervenção Psicopedagógica:
      Foco na consciência fonológica, ensino multissensorial e adaptações curriculares (ex: mais tempo de prova, leitura em voz alta pelo aplicador).
    `
  },
  {
    id: 'vygotsky-zona',
    categoryId: 'teor',
    title: 'ZDP: Zona de Desenvolvimento Proximal',
    readTime: '2 min',
    content: `
      Lev Vygotsky trouxe um conceito fundamental para a psicopedagogia: a ZDP.
      
      Ela é a distância entre:
      1. O que a criança já faz sozinha (Nível de Desenvolvimento Real).
      2. O que ela consegue fazer com ajuda (Nível de Desenvolvimento Potencial).
      
      O papel do psicopedagogo (e do professor) é atuar justamente nessa zona. O profissional serve como um "andaime" (scaffolding), dando o suporte necessário até que a criança consiga realizar a tarefa autonomamente.
    `
  }
];

// --- PERGUNTAS DO JOGO ---
export const questions = [
  {
    id: 1,
    topic: 'dev',
    type: 'quiz',
    question: "Segundo Piaget, em qual estágio surge o pensamento abstrato?",
    options: ["Sensório-motor", "Pré-operatório", "Operatório Concreto", "Operatório Formal"],
    correct: 3,
    explanation: "O estágio Operatório Formal (aprox. 12 anos+) permite o pensamento hipotético e abstrato, sem depender do concreto."
  },
  {
    id: 2,
    topic: 'teor',
    type: 'case',
    question: "Uma criança fala sozinha enquanto tenta resolver um quebra-cabeça. Para Vygotsky, isso é:",
    options: ["Um sinal de imaturidade", "Discurso egocêntrico sem função", "Discurso privado para auto-regulação", "Falta de socialização"],
    correct: 2,
    explanation: "O discurso privado é uma ferramenta essencial onde a criança 'pensa em voz alta' para planejar e regular suas ações."
  },
  {
    id: 3,
    topic: 'dis',
    type: 'quiz',
    question: "Qual característica NÃO define a Dislexia?",
    options: ["Dificuldade na decodificação", "Baixo QI (Deficiência Intelectual)", "Lentidão na leitura", "Origem neurobiológica"],
    correct: 1,
    explanation: "A Dislexia ocorre em indivíduos com inteligência normal. O baixo QI caracterizaria Deficiência Intelectual, não Dislexia."
  },
  {
    id: 4,
    topic: 'int',
    type: 'case',
    question: "Ao atender um aluno com TDAH, qual estratégia é mais adequada?",
    options: ["Exigir longos períodos de foco", "Fracionar tarefas em etapas menores", "Repreender a agitação motora", "Evitar rotinas visuais"],
    correct: 1,
    explanation: "O 'Chunking' (fracionar tarefas) reduz a sobrecarga da memória de trabalho e ajuda a criança a completar atividades passo a passo."
  }
];

export const getDailyQuestions = () => {
  return questions.sort(() => 0.5 - Math.random()).slice(0, 3);
};
