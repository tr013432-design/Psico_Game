import { Brain, BookOpen, Activity, Scale, Users, FileText } from 'lucide-react';

export const courseData = [
  {
    id: 'fundamentos',
    title: 'Módulo 1: Fundamentos Teóricos',
    icon: Brain,
    color: 'from-violet-500 to-purple-600',
    description: 'Os gigantes da psicologia do desenvolvimento: Piaget, Vygotsky e Wallon.',
    lessons: [
      {
        id: 'piaget-deep',
        title: 'Jean Piaget e a Epistemologia Genética',
        readTime: '10 min',
        content: `
          # O Construtivismo Piagetiano
          Jean Piaget revolucionou a educação ao provar que a criança não é um "adulto em miniatura". Ela constrói conhecimento ativamente.

          ## Os 4 Estágios do Desenvolvimento Cognitivo
          1. **Sensório-motor (0-2 anos):** A inteligência é prática. O bebê explora o mundo via reflexos e movimentos. A grande conquista é a **Permanência do Objeto** (saber que a mãe existe mesmo quando sai do quarto).
          2. **Pré-operatório (2-7 anos):** O império do **Egocentrismo**. A criança não consegue assumir o ponto de vista do outro. Surge o "Faz de Conta" (Função Simbólica) e a linguagem explode. O pensamento é mágico e animista (a lua me segue).
          3. **Operatório Concreto (7-11 anos):** O início da Lógica. A criança entende **Reversibilidade** (o gelo vira água e a água vira gelo) e **Conservação** (copo fino vs. copo largo). Mas ela ainda precisa do objeto físico/concreto para raciocinar.
          4. **Operatório Formal (11+ anos):** O pensamento científico. O adolescente consegue fazer **Hipotético-Dedução** (pensar sobre possibilidades, não apenas realidades). Discute ética, política e conceitos abstratos.

          ## Mecanismos de Adaptação
          * **Assimilação:** Incorporar algo novo a um esquema que já existe (chamar um cavalo de "cachorro grande").
          * **Acomodação:** Mudar o esquema mental para aceitar a novidade (entender que cavalo é uma categoria diferente).
        `
      },
      {
        id: 'vygotsky-wallon',
        title: 'Vygotsky e Wallon: O Social e o Afetivo',
        readTime: '8 min',
        content: `
          # Lev Vygotsky: A Teoria Histórico-Cultural
          Diferente de Piaget (focado no biológico), Vygotsky foca no **Social**. Nós nos tornamos humanos através da interação com outros humanos.

          ## Conceitos Chave
          * **ZDP (Zona de Desenvolvimento Proximal):** A distância entre o que o aluno faz sozinho (Nível Real) e o que faz com ajuda (Nível Potencial). O psicopedagogo atua AQUI.
          * **Mediação:** O aprendizado é mediado por ferramentas (linguagem, símbolos) e por "outros mais capazes" (professores, pais).

          ---
          
          # Henri Wallon: A Psicogênese da Pessoa Completa
          Wallon traz o coração para a sala de aula. Para ele, **não existe cognição sem emoção**.

          ## Estágios de Wallon
          1. **Impulsivo-Emocional:** O bebê se comunica pela emoção (choro, riso).
          2. **Sensório-Motor e Projetivo:** Exploração do mundo físico.
          3. **Personalismo (3-6 anos):** A fase da "crise de oposição" (o famoso "NÃO!"). É a construção do "EU".
          4. **Categorial:** Idade escolar, foco no intelectual.
          
          > "O homem é um ser geneticamente social." - Wallon
        `
      }
    ],
    quiz: [
      {
        question: "Uma criança de 4 anos chora porque 'o sol foi dormir e a deixou sozinha'. Segundo Piaget, isso demonstra:",
        options: ["Pensamento Lógico-Matemático", "Animismo (Pensamento Mágico)", "Reversibilidade", "Conservação de Massa"],
        correct: 1,
        explanation: "No estágio Pré-operatório, o Animismo é a atribuição de vida e sentimentos a seres inanimados."
      },
      {
        question: "Qual conceito de Vygotsky define a área onde o psicopedagogo deve intervir para promover avanço?",
        options: ["Zona de Desenvolvimento Real", "Estágio Sensório-Motor", "Zona de Desenvolvimento Proximal (ZDP)", "Inconsciente Coletivo"],
        correct: 2,
        explanation: "A ZDP é o espaço de potencial onde a aprendizagem ocorre com mediação."
      }
    ]
  },
  {
    id: 'diagnostico',
    title: 'Módulo 2: Avaliação e Diagnóstico',
    icon: Activity,
    color: 'from-blue-500 to-cyan-600',
    description: 'Ferramentas práticas: EOCA, Anamnese e Testes Projetivos.',
    lessons: [
      {
        id: 'eoca-visca',
        title: 'A EOCA de Jorge Visca',
        readTime: '12 min',
        content: `
          # Entrevista Operativa Centrada na Aprendizagem (EOCA)
          Criada por Jorge Visca, é geralmente a **primeira sessão** de avaliação psicopedagógica. O objetivo não é testar conteúdo, mas observar o **MODELO DE APRENDIZAGEM** do sujeito.

          ## A Consigna (O Comando)
          O psicopedagogo apresenta uma caixa com materiais (papel, lápis, cola, revista, jogos) e diz:
          > "Gostaria que você me mostrasse o que sabe fazer, o que lhe ensinaram e o que aprendeu. Utilize estes materiais como quiser."

          ## O Que Observar? (Os 3 Pilares)
          1. **Temática:** O que ele escolhe fazer? (Desenha? Escreve? Foge da tarefa?)
          2. **Dinâmica:** Como ele faz? (É ansioso? Organizado? Pede ajuda o tempo todo? Desiste fácil?)
          3. **Produto:** O resultado final tem qualidade? É coerente com a idade?

          ## Sintomas na EOCA
          * **Hiperassimilação:** A criança "engole" tudo sem criticar, decora sem aprender.
          * **Hipoacomodação:** Dificuldade de mudar, rigidez cognitiva.
        `
      },
      {
        id: 'testes-padrao',
        title: 'Principais Testes Psicopedagógicos',
        readTime: '15 min',
        content: `
          # Caixa de Ferramentas
          
          ## 1. TDE (Teste de Desempenho Escolar)
          Avalia as capacidades fundamentais de: **Escrita, Aritmética e Leitura**. É quantitativo e compara o aluno com a média da idade.

          ## 2. PROLEC (Avaliação dos Processos de Leitura)
          Foca não só se a criança lê, mas **COMO** ela lê.
          * Usa rota fonológica (letra por letra)?
          * Usa rota lexical (lê a palavra visualmente inteira)?

          ## 3. Testes Projetivos (Par Educativo / Família)
          Baseados na psicanálise. Pede-se para desenhar "uma família", "uma sala de aula".
          * **Objetivo:** Entender o vínculo emocional da criança com a aprendizagem. Ela vê a escola como um lugar seguro ou ameaçador?

          ## 4. Avaliação Psicomotora (Bateria Psicomotora)
          Avalia lateralidade, equilíbrio, esquema corporal e coordenação fina. Muitas vezes a "letra feia" (disgrafia) é um problema motor, não cognitivo.
        `
      }
    ],
    quiz: [
      {
        question: "Na EOCA, se a criança apenas empilha os materiais sem criar nada com sentido, podemos suspeitar de:",
        options: ["Alta criatividade", "Inibição Cognitiva ou Dificuldade de Planejamento", "Superdotação", "Pensamento Operatório Formal"],
        correct: 1,
        explanation: "A falta de intencionalidade ou paralisia diante da consigna aberta pode indicar insegurança ou bloqueio na aprendizagem."
      },
      {
        question: "O TDE (Teste de Desempenho Escolar) avalia quais três áreas fundamentais?",
        options: ["Física, Química e Biologia", "Leitura, Escrita e Aritmética", "Desenho, Pintura e Colagem", "Memória, Atenção e Emoção"],
        correct: 1,
        explanation: "O TDE é o padrão ouro no Brasil para rastreio rápido de dificuldades escolares básicas."
      }
    ]
  },
  {
    id: 'transtornos',
    title: 'Módulo 3: Transtornos de Aprendizagem',
    icon: Scale,
    color: 'from-orange-500 to-red-500',
    description: 'Dislexia, TDAH, Discalculia e TEA: Critérios diagnósticos.',
    lessons: [
      {
        id: 'dislexia-tdah',
        title: 'Diferenciando Dislexia e TDAH',
        readTime: '10 min',
        content: `
          # Dislexia
          É um transtorno neurobiológico específico da leitura.
          * **Causa:** Déficit no processamento fonológico (dificuldade em manipular os sons da fala).
          * **Sinais:** Leitura lenta/silabada, troca de letras com sons parecidos (F/V, P/B), dificuldade em rimas.
          * **QI:** Normal ou acima da média. Não é falta de inteligência!

          # TDAH (Transtorno de Déficit de Atenção/Hiperatividade)
          É um transtorno das **Funções Executivas** (o gerente do cérebro).
          * **Sinais:** Dificuldade de sustentar foco em tarefas chatas, impulsividade (age sem pensar), agitação motora.
          * **Na Escola:** O aluno erra por desatenção, esquece material, não termina a prova a tempo.

          ## Diagnóstico Diferencial
          * O Disléxico tenta ler e não consegue decodificar.
          * O TDAH consegue ler, mas se perde no meio do texto porque viu uma mosca voando.
        `
      }
    ],
    quiz: [
      {
        question: "Qual a principal origem da dificuldade na Dislexia?",
        options: ["Problema visual (vista cansada)", "Déficit no Processamento Fonológico", "Preguiça de ler", "Baixo QI"],
        correct: 1,
        explanation: "A Dislexia é a dificuldade do cérebro em conectar o símbolo (letra) ao som (fonema)."
      },
      {
        question: "Alunos com TDAH geralmente apresentam falhas em qual área cognitiva?",
        options: ["Funções Executivas (Planejamento/Inibição)", "Reconhecimento de Cores", "Vocabulário", "Coordenação Grossa"],
        correct: 0,
        explanation: "O TDAH afeta o córtex pré-frontal, responsável pelo controle inibitório e foco."
      }
    ]
  },
  {
    id: 'legislacao',
    title: 'Módulo 4: Legislação e Ética',
    icon: FileText,
    color: 'from-emerald-500 to-green-600',
    description: 'Regulamentação, CBO e Direitos do Aprendente.',
    lessons: [
      {
        id: 'leis-psico',
        title: 'Regulamentação e CBO',
        readTime: '5 min',
        content: `
          # A Profissão no Brasil
          Embora a Psicopedagogia exista há décadas, a regulamentação oficial plena está em trâmite final (PL 1675/2023 e PL 116/2024).

          ## CBO (Classificação Brasileira de Ocupações)
          O código oficial é **CBO 2394-25**. Isso garante que o psicopedagogo pode ser contratado com carteira assinada sob essa função.

          ## Código de Ética (ABPp)
          * **Sigilo Profissional:** Tudo o que é ouvido no consultório é sagrado.
          * **Devolutiva:** É obrigatório dar um retorno compreensível para a família e para a escola após a avaliação.
        `
      }
    ],
    quiz: [
      {
        question: "Qual o número da CBO (Classificação Brasileira de Ocupações) para Psicopedagogo?",
        options: ["CBO 1234-56", "CBO 2394-25", "CBO 0000-00", "Não existe CBO"],
        correct: 1,
        explanation: "A CBO 2394-25 reconhece a existência da ocupação no mercado de trabalho brasileiro."
      }
    ]
  }
];
