import { Brain, AlertCircle, Stethoscope, GraduationCap } from 'lucide-react';

// --- CATEGORIAS (Cores otimizadas) ---
export const topics = [
  { id: 'dev', name: 'Desenvolvimento', icon: Brain, color: 'bg-purple-500 text-white' },
  { id: 'dis', name: 'Distúrbios', icon: AlertCircle, color: 'bg-pink-500 text-white' },
  { id: 'int', name: 'Intervenção', icon: Stethoscope, color: 'bg-cyan-500 text-white' },
  { id: 'teor', name: 'Teóricos', icon: GraduationCap, color: 'bg-emerald-500 text-white' },
];

// --- MATERIAIS DE ESTUDO ---
export const studyMaterials = [
  {
    id: 'piaget-resumo',
    categoryId: 'dev',
    title: 'Resumo: Os 4 Estágios de Piaget',
    readTime: '3 min',
    content: `
      Jean Piaget propõe que o desenvolvimento cognitivo ocorre em 4 estágios universais:
      
      1. Sensório-motor (0-2 anos): A inteligência é prática. A criança explora o mundo pelos sentidos e movimento. Conquista principal: Permanência do objeto.
      
      2. Pré-operatório (2-7 anos): Surge a função simbólica (linguagem, faz-de-conta). O pensamento é egocêntrico e centrado.
      
      3. Operatório Concreto (7-11 anos): Início da lógica. Domina conceitos de conservação e reversibilidade.
      
      4. Operatório Formal (11+ anos): Pensamento abstrato e hipotético-dedutivo.
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
      - Dificuldade no reconhecimento preciso de palavras.
      - Leitura lenta e trabalhosa.
      
      O que NÃO é:
      - Não é falta de inteligência.
      - Não é preguiça.
      - Não é causado por problemas de visão.
    `
  },
  {
    id: 'vygotsky-zona',
    categoryId: 'teor',
    title: 'ZDP: Zona de Desenvolvimento Proximal',
    readTime: '2 min',
    content: `
      Lev Vygotsky trouxe um conceito fundamental: a ZDP.
      
      Ela é a distância entre:
      1. O que a criança já faz sozinha (Nível Real).
      2. O que ela consegue fazer com ajuda (Nível Potencial).
      
      O papel do psicopedagogo é atuar nessa zona, servindo como um "andaime" (scaffolding).
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
    explanation: "O estágio Operatório Formal (aprox. 12 anos+) permite o pensamento hipotético e abstrato."
  },
  {
    id: 2,
    topic: 'teor',
    type: 'case',
    question: "Uma criança fala sozinha enquanto tenta resolver um problema. Para Vygotsky, isso é:",
    options: ["Imaturidade", "Discurso egocêntrico", "Discurso privado (auto-regulação)", "Falta de socialização"],
    correct: 2,
    explanation: "O discurso privado é uma ferramenta essencial onde a criança 'pensa em voz alta' para planejar ações."
  },
  {
    id: 3,
    topic: 'dis',
    type: 'quiz',
    question: "Qual característica NÃO define a Dislexia?",
    options: ["Dificuldade na decodificação", "Baixo QI (Deficiência Intelectual)", "Lentidão na leitura", "Origem neurobiológica"],
    correct: 1,
    explanation: "A Dislexia ocorre em indivíduos com inteligência normal ou superior."
  }
];

export const getDailyQuestions = () => {
  return questions.sort(() => 0.5 - Math.random()).slice(0, 3);
};
