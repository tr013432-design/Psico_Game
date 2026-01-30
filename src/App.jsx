import React, { useState, useEffect } from 'react';
import { BookOpen, Trophy, Flame, CheckCircle, XCircle, Gamepad2, Library, ChevronRight, ArrowLeft, Star, Sparkles, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { getDailyQuestions, topics, studyMaterials } from './data';

function App() {
  const [activeTab, setActiveTab] = useState('game'); 
  const [readingMaterial, setReadingMaterial] = useState(null); 
  
  const [gameScreen, setGameScreen] = useState('start'); 
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const savedXp = localStorage.getItem('psico_xp');
    const savedStreak = localStorage.getItem('psico_streak');
    if (savedXp) setXp(parseInt(savedXp));
    if (savedStreak) setStreak(parseInt(savedStreak));
  }, []);

  const startGame = () => {
    setCurrentQuestions(getDailyQuestions());
    setQIndex(0);
    setScore(0);
    setGameScreen('play');
    setFeedback(null);
  };

  const handleAnswer = (idx) => {
    const isCorrect = idx === currentQuestions[qIndex].correct;
    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 }, colors: ['#a855f7', '#ec4899'] });
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      if (qIndex + 1 < currentQuestions.length) {
        setQIndex(q => q + 1);
        setFeedback(null);
      } else {
        finishGame(isCorrect ? score + 1 : score);
      }
    }, 2000);
  };

  const finishGame = (finalScore) => {
    const xpGained = finalScore * 100; // Mais XP para ser mais gratificante
    const newXp = xp + xpGained;
    setXp(newXp);
    localStorage.setItem('psico_xp', newXp);
    if (finalScore > 0) {
      setStreak(s => s + 1);
      localStorage.setItem('psico_streak', streak + 1);
    }
    setGameScreen('result');
  };

  // --- COMPONENTES VISUAIS (GLASSMORPHISM) ---
  
  const GlassCard = ({ children, className = "", onClick }) => (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-5 ${className}`}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen flex justify-center items-start pt-0 sm:pt-10 overflow-hidden font-sans">
      <div className="w-full max-w-md h-[100vh] sm:h-[850px] bg-white/90 backdrop-blur-md sm:rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col">
        
        {/* HEADER PREMIUM */}
        <div className="px-6 pt-12 pb-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-b-[40px] shadow-lg z-10 relative">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-sm">
                <BrainCircuit size={24} className="text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl leading-none">PsicoDaily</h1>
                <p className="text-white/70 text-xs font-medium">Sua evolução diária</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center overflow-hidden">
               {/* Avatar placeholder */}
               <span className="font-bold text-sm">EA</span>
            </div>
          </div>

          {/* HUD de Gamificação */}
          <div className="flex gap-4">
            <div className="flex-1 bg-black/20 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3 border border-white/10">
              <div className="bg-orange-500/80 p-2 rounded-xl text-white shadow-lg shadow-orange-500/30">
                <Flame size={18} fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Ofensiva</p>
                <p className="text-lg font-bold">{streak} dias</p>
              </div>
            </div>
            <div className="flex-1 bg-black/20 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3 border border-white/10">
              <div className="bg-yellow-500/80 p-2 rounded-xl text-white shadow-lg shadow-yellow-500/30">
                <Trophy size={18} fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Total XP</p>
                <p className="text-lg font-bold">{xp}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTEÚDO SCROLLÁVEL */}
        <div className="flex-1 overflow-y-auto pb-32 px-6 pt-6 scrollbar-hide">
          
          <AnimatePresence mode='wait'>
            
            {/* === ABA ESTUDAR === */}
            {activeTab === 'study' && !readingMaterial && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-bold text-slate-800 text-xl flex items-center gap-2">
                  <Library className="text-violet-600" />
                  Biblioteca
                </h2>
                
                <div className="grid gap-4">
                  {studyMaterials.map((item, idx) => {
                    const cat = topics.find(t => t.id === item.categoryId);
                    return (
                      <GlassCard key={item.id} onClick={() => setReadingMaterial(item)} className="cursor-pointer group hover:bg-white transition-colors relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat?.color || 'from-gray-100 to-gray-200'} opacity-20 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
                        <div className="flex items-start gap-4 relative z-10">
                          <div className={`p-3 rounded-2xl ${cat?.color.replace('bg-', 'bg-opacity-20 bg-') || 'bg-gray-100'} shadow-sm`}>
                            <BookOpen size={24} className={cat?.color.split(' ')[1]} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-800 leading-tight mb-1">{item.title}</h3>
                            <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                              <span>{cat?.name}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300" />
                              <span>{item.readTime}</span>
                            </div>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-violet-600 group-hover:text-white transition-all">
                            <ChevronRight size={18} />
                          </div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* === LEITURA === */}
            {activeTab === 'study' && readingMaterial && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                className="pb-10"
              >
                <button onClick={() => setReadingMaterial(null)} className="mb-6 flex items-center text-slate-500 hover:text-violet-600 font-bold text-sm bg-white/50 px-4 py-2 rounded-full w-max backdrop-blur-sm">
                  <ArrowLeft size={18} className="mr-2" /> Voltar
                </button>
                
                <div className="bg-white rounded-[32px] p-6 shadow-xl border border-slate-100">
                  <h1 className="text-2xl font-bold text-slate-900 mb-6 leading-tight">{readingMaterial.title}</h1>
                  <div className="prose prose-slate text-slate-600 leading-relaxed text-base">
                    {readingMaterial.content}
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => { setReadingMaterial(null); setActiveTab('game'); }} 
                  className="w-full mt-8 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2"
                >
                  <Gamepad2 size={20} />
                  Praticar Agora
                </motion.button>
              </motion.div>
            )}

            {/* === ABA JOGAR (HOME) === */}
            {activeTab === 'game' && gameScreen === 'start' && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Banner Principal */}
                <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white p-8 shadow-2xl shadow-purple-500/40">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black opacity-10 rounded-full blur-2xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={18} className="text-yellow-300" />
                      <span className="text-sm font-bold uppercase tracking-wider text-purple-200">Desafio do Dia</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Quiz Diário</h2>
                    <p className="text-purple-100 mb-6 max-w-[80%]">3 perguntas rápidas para manter seu cérebro ativo.</p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={startGame} 
                      className="bg-white text-purple-700 px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2"
                    >
                      <Gamepad2 size={20} />
                      Jogar Agora
                    </motion.button>
                  </div>
                </div>

                {/* Categorias */}
                <div>
                  <h3 className="font-bold text-slate-800 text-lg mb-4 ml-1">Tópicos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {topics.map(t => (
                      <GlassCard key={t.id} className="flex flex-col items-center justify-center gap-3 aspect-[4/3] hover:border-violet-300 transition-colors">
                        <div className={`p-3 rounded-2xl ${t.color.replace('text-', 'bg-opacity-20 text-').replace('bg-', 'bg-')} mb-1`}>
                          <t.icon size={28} />
                        </div>
                        <span className="font-bold text-slate-700 text-sm">{t.name}</span>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* === JOGO EM ANDAMENTO === */}
            {activeTab === 'game' && gameScreen === 'play' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    {currentQuestions[qIndex].type === 'case' ? 'Estudo de Caso' : 'Teoria'}
                  </span>
                  <span className="text-sm font-black text-violet-600">
                    {qIndex + 1} <span className="text-slate-300">/</span> {currentQuestions.length}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-snug">
                    {currentQuestions[qIndex].question}
                  </h3>
                  
                  <div className="space-y-4">
                    {currentQuestions[qIndex].options.map((opt, idx) => (
                      <motion.button 
                        key={idx} 
                        whileTap={{ scale: 0.98 }}
                        disabled={feedback !== null} 
                        onClick={() => handleAnswer(idx)}
                        className={`w-full p-5 rounded-2xl text-left text-sm font-semibold border transition-all shadow-sm
                          ${feedback === null ? 'bg-white border-slate-100 hover:border-violet-500 hover:shadow-md' : ''}
                          ${feedback && idx === currentQuestions[qIndex].correct ? 'bg-green-500 border-green-500 text-white shadow-green-200' : ''}
                          ${feedback === 'incorrect' && idx === currentQuestions[qIndex].correct ? 'bg-green-500 border-green-500 text-white' : ''} 
                          ${feedback === 'incorrect' && idx !== currentQuestions[qIndex].correct ? 'opacity-40 bg-slate-100' : ''}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt}</span>
                          {feedback && idx === currentQuestions[qIndex].correct && <CheckCircle size={20} />}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <AnimatePresence>
                  {feedback && (
                    <motion.div 
                      initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
                      className={`mt-auto p-5 rounded-2xl text-sm shadow-lg border-l-4 ${feedback === 'correct' ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'}`}
                    >
                      <strong className="block mb-1 text-base">{feedback === 'correct' ? 'Excelente!' : 'Atenção aos detalhes!'}</strong> 
                      {currentQuestions[qIndex].explanation}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* === TELA FINAL === */}
            {activeTab === 'game' && gameScreen === 'result' && (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-40 animate-pulse" />
                  <Trophy size={100} className="text-yellow-400 relative z-10 drop-shadow-lg" fill="currentColor" />
                </div>
                
                <h2 className="text-3xl font-black text-slate-800 mb-2">Treino Concluído!</h2>
                <p className="text-slate-500 mb-10">Você acabou de ficar mais inteligente.</p>

                <div className="grid grid-cols-2 gap-4 w-full mb-10">
                  <div className="bg-violet-50 p-4 rounded-2xl border border-violet-100">
                    <p className="text-xs text-violet-400 font-bold uppercase">Acertos</p>
                    <p className="text-3xl font-black text-violet-600">{score}/{currentQuestions.length}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                    <p className="text-xs text-orange-400 font-bold uppercase">XP Ganho</p>
                    <p className="text-3xl font-black text-orange-500">+{score * 100}</p>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setGameScreen('start')} 
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-900/20"
                >
                  Continuar
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* MENU INFERIOR FLUTUANTE */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-xl p-2 rounded-full shadow-2xl border border-white/50 flex gap-2 pointer-events-auto">
            <button 
              onClick={() => { setActiveTab('game'); setReadingMaterial(null); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-bold text-sm ${activeTab === 'game' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
            >
              <Gamepad2 size={20} />
              {activeTab === 'game' && <span>Jogar</span>}
            </button>
            <button 
              onClick={() => setActiveTab('study')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-bold text-sm ${activeTab === 'study' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
            >
              <Library size={20} />
              {activeTab === 'study' && <span>Estudar</span>}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
