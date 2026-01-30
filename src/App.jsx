import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Trophy, Flame, ChevronRight, ArrowLeft, 
  PlayCircle, CheckCircle2, Lock, GraduationCap, 
  MoreHorizontal, BrainCircuit, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { courseData } from './data';

// --- COMPONENTES UI (DESIGN SYSTEM) ---
const Card = ({ children, className = "", onClick, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`bg-white rounded-3xl p-6 shadow-xl border border-slate-100 cursor-pointer relative overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

const ProgressBar = ({ progress, color }) => (
  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mt-2">
    <motion.div 
      initial={{ width: 0 }} 
      animate={{ width: `${progress}%` }} 
      className={`h-full rounded-full bg-gradient-to-r ${color}`} 
    />
  </div>
);

function App() {
  // --- ESTADO GLOBAL ---
  const [view, setView] = useState('dashboard'); // dashboard, module, lesson, quiz
  const [activeModule, setActiveModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  
  // --- ESTADO DE PROGRESSO (PERSISTENTE) ---
  const [userProgress, setUserProgress] = useState({
    xp: 0,
    streak: 1,
    completedLessons: [], // IDs das lições
    completedQuizzes: [] // IDs dos módulos
  });

  useEffect(() => {
    const saved = localStorage.getItem('psico_pro_data');
    if (saved) setUserProgress(JSON.parse(saved));
  }, []);

  const saveProgress = (newData) => {
    const updated = { ...userProgress, ...newData };
    setUserProgress(updated);
    localStorage.setItem('psico_pro_data', JSON.stringify(updated));
  };

  // --- LÓGICA DO QUIZ ---
  const [quizState, setQuizState] = useState({ qIndex: 0, score: 0, showResult: false, feedback: null });

  const startQuiz = (module) => {
    setActiveModule(module);
    setQuizState({ qIndex: 0, score: 0, showResult: false, feedback: null });
    setView('quiz');
  };

  const handleQuizAnswer = (optionIndex) => {
    const currentQ = activeModule.quiz[quizState.qIndex];
    const isCorrect = optionIndex === currentQ.correct;
    
    setQuizState(prev => ({ ...prev, feedback: isCorrect ? 'correct' : 'incorrect' }));

    if (isCorrect) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ['#8b5cf6', '#ec4899'] });
    }

    setTimeout(() => {
      if (quizState.qIndex + 1 < activeModule.quiz.length) {
        setQuizState(prev => ({ 
          ...prev, 
          qIndex: prev.qIndex + 1, 
          score: isCorrect ? prev.score + 1 : prev.score,
          feedback: null 
        }));
      } else {
        const finalScore = isCorrect ? quizState.score + 1 : quizState.score;
        finishQuiz(finalScore);
      }
    }, 2000);
  };

  const finishQuiz = (finalScore) => {
    const xpGained = finalScore * 100;
    saveProgress({ 
      xp: userProgress.xp + xpGained,
      completedQuizzes: [...new Set([...userProgress.completedQuizzes, activeModule.id])]
    });
    setQuizState(prev => ({ ...prev, score: finalScore, showResult: true }));
  };

  const markLessonComplete = () => {
    if (!userProgress.completedLessons.includes(activeLesson.id)) {
      saveProgress({
        xp: userProgress.xp + 50,
        completedLessons: [...userProgress.completedLessons, activeLesson.id]
      });
      confetti();
    }
    setView('module');
  };

  // --- RENDERIZAÇÃO ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex justify-center selection:bg-violet-200">
      
      <div className="w-full max-w-lg bg-white min-h-screen sm:h-[900px] sm:my-8 sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative border-4 border-slate-900/5">
        
        {/* --- CABEÇALHO COM NAV --- */}
        <div className="bg-white/80 backdrop-blur-md p-6 sticky top-0 z-20 border-b border-slate-100 flex justify-between items-center">
          {view === 'dashboard' ? (
            <div className="flex items-center gap-3">
              <div className="bg-violet-600 p-2 rounded-xl text-white shadow-lg shadow-violet-500/30">
                <BrainCircuit size={24} />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-none text-slate-900">PsicoPro</h1>
                <p className="text-xs text-slate-500 font-medium">Plataforma de Ensino</p>
              </div>
            </div>
          ) : (
            <button onClick={() => setView(view === 'lesson' ? 'module' : 'dashboard')} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-slate-700" />
            </button>
          )}

          <div className="flex gap-3">
            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
              <Flame size={16} className="text-orange-500 fill-orange-500" />
              <span className="text-xs font-bold text-orange-700">{userProgress.streak}</span>
            </div>
            <div className="flex items-center gap-1 bg-violet-50 px-3 py-1.5 rounded-full border border-violet-100">
              <Trophy size={16} className="text-violet-600 fill-violet-600" />
              <span className="text-xs font-bold text-violet-700">{userProgress.xp} XP</span>
            </div>
          </div>
        </div>

        {/* --- ÁREA DE CONTEÚDO SCROLLÁVEL --- */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide pb-24">
          <AnimatePresence mode='wait'>
            
            {/* 1. DASHBOARD (LISTA DE MÓDULOS) */}
            {view === 'dashboard' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                
                {/* Banner de Boas Vindas */}
                <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                  <h2 className="text-2xl font-bold mb-2">Olá, Estudante!</h2>
                  <p className="text-slate-300 text-sm mb-4">Sua jornada rumo à excelência psicopedagógica continua.</p>
                  <div className="flex gap-4 text-xs font-bold">
                    <div className="bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                      {userProgress.completedLessons.length} Lições Feitas
                    </div>
                    <div className="bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                      {Math.floor(userProgress.xp / 1000) + 1} Nível Atual
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-slate-800 px-1">Seus Módulos</h3>
                
                <div className="grid gap-5">
                  {courseData.map((module, idx) => {
                    const moduleLessons = module.lessons.map(l => l.id);
                    const completedInModule = moduleLessons.filter(id => userProgress.completedLessons.includes(id)).length;
                    const progressPercent = (completedInModule / moduleLessons.length) * 100;
                    
                    return (
                      <Card key={module.id} delay={idx * 0.1} onClick={() => { setActiveModule(module); setView('module'); }}>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-2xl bg-gradient-to-br ${module.color} text-white shadow-lg`}>
                            <module.icon size={24} />
                          </div>
                          {progressPercent === 100 && <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 size={12} /> Concluído</div>}
                        </div>
                        <h4 className="font-bold text-lg mb-1">{module.title}</h4>
                        <p className="text-sm text-slate-500 mb-4 leading-relaxed">{module.description}</p>
                        
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                          <span>{completedInModule}/{moduleLessons.length} Aulas</span>
                          <span>{Math.round(progressPercent)}%</span>
                        </div>
                        <ProgressBar progress={progressPercent} color={module.color} />
                      </Card>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* 2. VISÃO DO MÓDULO (LISTA DE AULAS) */}
            {view === 'module' && activeModule && (
              <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <div className="text-center mb-8">
                  <div className={`inline-flex p-4 rounded-3xl bg-gradient-to-br ${activeModule.color} text-white shadow-xl mb-4`}>
                    <activeModule.icon size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 px-4">{activeModule.title}</h2>
                </div>

                <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                    <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider">Trilha de Aprendizagem</h3>
                  </div>
                  
                  <div className="divide-y divide-slate-100">
                    {activeModule.lessons.map((lesson, idx) => {
                      const isDone = userProgress.completedLessons.includes(lesson.id);
                      return (
                        <div 
                          key={lesson.id} 
                          onClick={() => { setActiveLesson(lesson); setView('lesson'); }}
                          className="p-5 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-4 group"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
                            ${isDone ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400 group-hover:bg-violet-100 group-hover:text-violet-600'}
                          `}>
                            {isDone ? <CheckCircle2 size={20} /> : idx + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-bold text-sm mb-1 ${isDone ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                              {lesson.title}
                            </h4>
                            <p className="text-xs text-slate-400">{lesson.readTime}</p>
                          </div>
                          <ChevronRight size={16} className="text-slate-300 group-hover:text-violet-500" />
                        </div>
                      )
                    })}
                  </div>
                </div>

                <button 
                  onClick={() => startQuiz(activeModule)}
                  className="w-full bg-slate-900 text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-slate-900/20 active:scale-95 transition-transform"
                >
                  <GraduationCap size={24} className="text-yellow-400" />
                  <div className="text-left">
                    <span className="block text-xs text-slate-400 uppercase tracking-wider">Avaliação Final</span>
                    <span>Iniciar Quiz do Módulo</span>
                  </div>
                </button>
              </motion.div>
            )}

            {/* 3. VISÃO DA LIÇÃO (LEITURA) */}
            {view === 'lesson' && activeLesson && (
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="pb-10">
                <div className="prose prose-slate prose-lg max-w-none">
                  <div className="bg-white p-8 rounded-[32px] shadow-xl border border-slate-100 mb-8">
                    <div className="flex items-center gap-2 text-violet-600 font-bold text-xs uppercase tracking-wider mb-4">
                      <BookOpen size={16} /> Aula Teórica
                    </div>
                    <ReactMarkdownWrapper content={activeLesson.content} />
                  </div>
                </div>

                <button 
                  onClick={markLessonComplete}
                  className="w-full bg-violet-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-violet-600/30 active:scale-95 transition-transform"
                >
                  Concluir Leitura & Ganhar XP
                </button>
              </motion.div>
            )}

            {/* 4. VISÃO DO QUIZ */}
            {view === 'quiz' && (
              <div className="h-full flex flex-col">
                 {!quizState.showResult ? (
                   <>
                     <div className="mb-8 flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-400 uppercase">Questão {quizState.qIndex + 1} de {activeModule.quiz.length}</span>
                       <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-violet-600 transition-all duration-500" style={{ width: `${((quizState.qIndex + 1) / activeModule.quiz.length) * 100}%` }} />
                       </div>
                     </div>
                     
                     <h3 className="text-xl font-bold text-slate-900 mb-8 leading-snug">
                       {activeModule.quiz[quizState.qIndex].question}
                     </h3>
                     
                     <div className="space-y-4">
                       {activeModule.quiz[quizState.qIndex].options.map((opt, idx) => (
                         <button 
                           key={idx} 
                           disabled={quizState.feedback !== null} 
                           onClick={() => handleQuizAnswer(idx)}
                           className={`w-full p-5 rounded-2xl text-left text-sm font-semibold border-2 transition-all
                             ${!quizState.feedback ? 'border-slate-100 bg-white hover:border-violet-500 hover:bg-violet-50' : ''}
                             ${quizState.feedback === 'correct' && idx === activeModule.quiz[quizState.qIndex].correct ? 'border-green-500 bg-green-100 text-green-800' : ''}
                             ${quizState.feedback === 'incorrect' && idx !== activeModule.quiz[quizState.qIndex].correct ? 'opacity-50' : ''}
                             ${quizState.feedback === 'incorrect' && idx === activeModule.quiz[quizState.qIndex].correct ? 'border-green-500 bg-green-100 text-green-800' : ''}
                           `}
                         >
                           {opt}
                         </button>
                       ))}
                     </div>
                     
                     {quizState.feedback && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-slate-800 text-slate-200 rounded-2xl text-sm leading-relaxed">
                         <span className="font-bold text-white block mb-1">Explicação:</span>
                         {activeModule.quiz[quizState.qIndex].explanation}
                       </motion.div>
                     )}
                   </>
                 ) : (
                   <div className="text-center py-10">
                     <Trophy size={80} className="text-yellow-400 mx-auto mb-6 animate-bounce" />
                     <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Finalizado!</h2>
                     <p className="text-slate-500 mb-8">Você acertou <strong className="text-violet-600">{quizState.score}</strong> de {activeModule.quiz.length} questões.</p>
                     <button onClick={() => setView('dashboard')} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold w-full">Voltar ao Menu</button>
                   </div>
                 )}
              </div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Mini parser para renderizar o Markdown simples que usamos nos dados
const ReactMarkdownWrapper = ({ content }) => {
  // Tratamento básico para exibir títulos e listas do texto cru
  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      const cleanLine = line.trim();
      if (!cleanLine) return <br key={i} />;
      if (cleanLine.startsWith('# ')) return <h3 key={i} className="text-xl font-bold text-slate-900 mt-6 mb-3">{cleanLine.replace('# ', '')}</h3>;
      if (cleanLine.startsWith('## ')) return <h4 key={i} className="text-lg font-bold text-violet-700 mt-4 mb-2">{cleanLine.replace('## ', '')}</h4>;
      if (cleanLine.startsWith('* ')) return <li key={i} className="ml-4 list-disc marker:text-violet-500 mb-2 text-slate-600">{cleanLine.replace('* ', '')}</li>;
      if (cleanLine.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-violet-400 pl-4 italic text-slate-500 my-4 bg-slate-50 p-2 rounded-r-lg">{cleanLine.replace('> ', '')}</blockquote>;
      return <p key={i} className="mb-2 text-slate-600 leading-relaxed">{cleanLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Regex simples para negrito
        .split(/(<strong>.*?<\/strong>)/g).map((part, j) => 
          part.startsWith('<strong>') ? <strong key={j} className="text-slate-800">{part.replace(/<\/?strong>/g, '')}</strong> : part
        )}</p>;
    });
  };
  return <div>{formatText(content)}</div>;
};

export default App;
