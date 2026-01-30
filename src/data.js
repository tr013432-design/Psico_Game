export const topics = [
  { id: 'dev', name: 'Desenvolvimento Humano', icon: 'Brain' },
  { id: 'dis', name: 'Distúrbios de Aprendizagem', icon: 'AlertCircle' },
  { id: 'int', name: 'Intervenção Psicopedagógica', icon: 'Stethoscope' },
  { id: 'neu', name: 'Neurociência', icon: 'Zap' },
];

export const questions = [
  // Categoria: Desenvolvimento Humano (Piaget, Vygotsky)
  {
    id: 1,
    topic: 'dev',
    type: 'quiz',
    question: "Segundo Jean Piaget, em qual estágio a criança desenvolve a capacidade de pensamento abstrato?",
    options: ["Sensório-motor", "Pré-operatório", "Operatório Concreto", "Operatório Formal"],
    correct: 3,
    explanation: "O estágio Operatório Formal (aprox. 12 anos em diante) é onde surge o pensamento hipotético-dedutivo e abstrato."
  },
  {
    id: 2,
    topic: 'dev',
    type: 'case',
    question: "Uma criança de 4 anos fala sozinha enquanto brinca. Segundo Vygotsky, isso representa:",
    options: ["Egocentrismo imaturo", "Discurso socializado", "Discurso privado (auto-regulação)", "Alucinação auditiva"],
    correct: 2,
    explanation: "Para Vygotsky, o discurso privado é uma ferramenta fundamental para o desenvolvimento do pensamento e auto-regulação."
  },
  // Categoria: Distúrbios
  {
    id: 3,
    topic: 'dis',
    type: 'quiz',
    question: "Qual característica NÃO é típica da Dislexia?",
    options: ["Dificuldade na decodificação leitora", "Baixo QI (Deficiência Intelectual)", "Lentidão na leitura", "Troca de letras com sons similares"],
    correct: 1,
    explanation: "A Dislexia é um transtorno específico de aprendizagem e não está associada a baixo QI. O indivíduo tem inteligência normal."
  },
  {
    id: 4,
    topic: 'int',
    type: 'case',
    question: "Caso Clínico: João, 9 anos, tem TDAH e dificuldade em terminar tarefas. Qual a melhor intervenção inicial?",
    options: ["Repreender quando ele levantar", "Fracionar tarefas em etapas menores", "Aumentar o tempo de aula sem intervalo", "Ignorar o comportamento"],
    correct: 1,
    explanation: "Fracionar tarefas (Chunking) ajuda o cérebro com disfunção executiva a processar o início, meio e fim da atividade sem sobrecarga."
  }
  // Você pode adicionar centenas de perguntas aqui
];

// Função para pegar perguntas aleatórias ou "do dia"
export const getDailyQuestions = () => {
  // Embaralha e pega 3 perguntas para o treino rápido
  return questions.sort(() => 0.5 - Math.random()).slice(0, 3);
};
