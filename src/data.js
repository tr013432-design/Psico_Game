import { Brain, FileText, Users, Activity, Scale, BookOpen } from 'lucide-react';

export const courses = [
  {
    id: 'fundamentos',
    title: 'Módulo 1: Fundamentos Teóricos',
    icon: Brain,
    color: 'bg-violet-600',
    description: 'A base epistemológica: Piaget, Vygotsky, Wallon e a Neurociência.',
    content: [
      {
        id: 'aula1',
        title: 'Epistemologia Genética de Piaget',
        type: 'text',
        text: `
# A Construção do Conhecimento

Jean Piaget rompeu com a ideia de que a inteligência é inata. Ele propôs o **Construtivismo**: o conhecimento é construído na interação sujeito-objeto.

## Os 4 Estágios do Desenvolvimento
1. **Sensório-Motor (0-2 anos):** A inteligência é prática. O bebê pensa através da ação. Conquista principal: *Permanência do Objeto*.
2. **Pré-Operatório (2-7 anos):** O pensamento é simbólico, mas egocêntrico. A criança não conserva (acha que o copo alto tem mais água). Pensamento mágico/animista.
3. **Operatório Concreto (7-12 anos):** Surge a lógica, mas ela precisa da realidade concreta. Domina a *Reversibilidade* e a *Conservação*.
4. **Operatório Formal (12+ anos):** Pensamento hipotético-dedutivo. Abstração pura.

## Mecanismos de Adaptação
* **Assimilação:** O sujeito interpreta o mundo com os esquemas que já tem.
* **Acomodação:** O sujeito altera seus esquemas para entender a novidade.
* **Equilibração:** O motor do aprendizado. O conflito cognitivo gera busca por novo equilíbrio.
        `
      },
      {
        id: 'aula2',
        title: 'Vygotsky e a Zona de Desenvolvimento Proximal',
        type: 'text',
        text: `
# A Teoria Histórico-Cultural

Para Vygotsky, o desenvolvimento é **de fora para dentro**. As funções psicológicas superiores (atenção voluntária, memória lógica) nascem nas relações sociais.

## Conceitos Chave
* **ZDP (Zona de Desenvolvimento Proximal):** A distância entre o que a criança faz sozinha (Nível Real) e o que faz com ajuda (Nível Potencial). É aqui que o psicopedagogo atua!
* **Mediação:** O aprendizado não é direto; é mediado por instrumentos (ferramentas) e signos (linguagem).
* **Pensamento e Linguagem:** No início são separados. Por volta dos 2 anos, o pensamento torna-se verbal e a linguagem, intelectual.
        `
      },
      {
        id: 'flash1',
        type: 'flashcard',
        question: "O que é a 'ZDP' segundo Vygotsky?",
        answer: "Zona de Desenvolvimento Proximal: A distância entre o nível de desenvolvimento real (o que faz sozinho) e o potencial (o que faz com ajuda)."
      },
      {
        id: 'flash2',
        type: 'flashcard',
        question: "Qual a principal característica do estágio Pré-Operatório de Piaget?",
        answer: "O Egocentrismo e a falta de Conservação. A criança centra-se em apenas um aspecto da realidade (ex: altura do copo) e ignora os outros."
      }
    ]
  },
  {
    id: 'diagnostico',
    title: 'Módulo 2: Diagnóstico Clínico',
    icon: Activity,
    color: 'bg-emerald-600',
    description: 'Ferramentas Práticas: EOCA, Anamnese e Provas Operatórias.',
    content: [
      {
        id: 'aula_eoca',
        title: 'EOCA: A Porta de Entrada',
        type: 'text',
        text: `
# Entrevista Operativa Centrada na Aprendizagem (EOCA)

Criada pelo argentino Jorge Visca, a EOCA é geralmente a primeira sessão de avaliação.

## O Objetivo
Não é avaliar "o que" a criança sabe (conteúdo), mas **"como"** ela aprende (modelo de aprendizagem). Observamos os sintomas, defesas e vínculos.

## A Consigna (O Comando)
"Gostaria que você me mostrasse o que sabe fazer, o que lhe ensinaram e o que aprendeu. Utilize este material como quiser."

## Os 3 Pilares da Observação
1. **Temática:** O que ela escolhe fazer? (Desenha, escreve, recorta?)
2. **Dinâmica:** Como ela faz? (Pede ajuda, desiste fácil, é perfeccionista, é impulsiva?)
3. **Produto:** O resultado final tem coerência? Está adequado à idade?
        `
      },
      {
        id: 'caso1',
        title: 'Estudo de Caso: "O Menino que não parava"',
        type: 'case_study',
        patient: "Pedro, 8 anos, 3º ano.",
        complaint: "A escola relata que ele não copia do quadro, levanta o tempo todo e atrapalha os colegas. A mãe diz que em casa ele é 'elétrico' e perde materiais.",
        observation: "Na EOCA, Pedro abriu a caixa, tirou tudo para fora, começou a desenhar, parou em 10 segundos, pegou a massinha, amassou e jogou no chão. Perguntou 5 vezes 'posso ir embora?'.",
        question: "Com base na EOCA e na queixa, qual a hipótese diagnóstica inicial mais provável e qual função cognitiva parece prejudicada?",
        options: [
          "Dislexia / Processamento Fonológico",
          "TDAH / Funções Executivas (Inibição e Planejamento)",
          "TEA / Teoria da Mente",
          "Deficiência Intelectual / Raciocínio Lógico"
        ],
        correct: 1,
        explanation: "A desorganização, a troca rápida de atividades sem concluir (falta de persistência) e a agitação motora apontam para falha nas Funções Executivas, típicas do TDAH. Não há indícios de dificuldade de leitura (Dislexia) descritos ainda."
      }
    ]
  },
  {
    id: 'transtornos',
    title: 'Módulo 3: Transtornos e Dificuldades',
    icon: Scale,
    color: 'bg-rose-600',
    description: 'Dislexia, Discalculia, TDAH e TEA. Critérios do DSM-5.',
    content: [
      {
        id: 'dislexia_aula',
        title: 'Dislexia: Mitos e Verdades',
        type: 'text',
        text: `
# O que é Dislexia?
É um Transtorno Específico de Aprendizagem com prejuízo na **Leitura**.
Origem: Neurobiológica. Há uma falha no **Processamento Fonológico** (a capacidade de manipular os sons da fala).

## Sinais de Alerta
* Leitura lenta, silabada e com esforço.
* Dificuldade em rimas.
* Troca de letras auditivamente próximas (P/B, T/D, F/V).
* Compreensão de texto prejudicada (porque gasta toda energia decodificando).

## O que NÃO é
* Não é problema de visão.
* Não é falta de inteligência (QI é normal).
* Não é preguiça.
        `
      },
      {
        id: 'flash_dislexia',
        type: 'flashcard',
        question: "Qual a diferença central entre Dificuldade de Aprendizagem e Transtorno de Aprendizagem?",
        answer: "A Dificuldade é passageira e externa (ex: má alfabetização, problemas emocionais). O Transtorno é permanente e biológico/interno (ex: Dislexia, TDAH)."
      }
    ]
  }
];
