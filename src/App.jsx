import React, { useState, useEffect } from 'react';
import { BookOpen, Trophy, Flame, CheckCircle, XCircle, RefreshCw, Gamepad2, Library, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { getDailyQuestions, topics, studyMaterials } from './data';

function App() {
  const [activeTab, setActiveTab] = useState('game'); // 'game' ou 'study'
  const [readingMaterial, setReadingMaterial] = useState(null); // Material sendo lido
  
  // Estados do Jogo
  const [gameScreen, setGameScreen] = useState('start'); // start, play, result
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

  // --- LÓGICA DO JOGO ---
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
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
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
    const xpGained = finalScore * 50;
    const newXp = xp + xpGained;
    setXp(newXp);
    localStorage.setItem('psico_xp', newXp);
    if (finalScore > 0) {
      setStreak(s => s + 1);
      localStorage.setItem('psico_streak', streak + 1);
    }
    setGameScreen('result');
  };

  // --- RENDERIZAÇÃO DAS TELAS ---

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative">
      
      {/* HEADER FIXO */}
      <div className="bg-brand-600 p-4 pt-8 text-white flex justify-between items-center shadow-lg z-10">
        <div>
          <h1 className="font-bold text-xl">PsicoDaily</h1>
          <p className="text-brand-100 text-xs">Estude um pouco todo dia</p>
        </div>
        <div className="flex gap-3 text-xs font-bold">
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
            <Flame size={14} className="text-orange-300" /> {streak}
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
            <Trophy size={14} className="text-yellow-300" /> {xp}
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL (COM SCROLL) */}
      <div className="flex-1 overflow-y-auto pb-24 bg-slate-50">
        
        {/* === ABA ESTUDAR === */}
        {activeTab === 'study' && !readingMaterial && (
          <div className="p-4 space-y-4">
            <h2 className="font-bold text-slate-700 text-lg mb-2">Biblioteca de Resumos</h2>
            {studyMaterials.map(item => {
              const cat = topics.find(t => t.id === item.categoryId);
              return (
                <div key={item.id} onClick={() => setReadingMaterial(item)} 
                     className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-brand-500 transition-all cursor-pointer flex justify-between items-center group">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${cat?.color || 'bg-gray-100'}`}>
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm leading-tight">{item.title}</h3>
                      <span className="text-xs text-slate-400 mt-1 block">{item.readTime} de leitura • {cat?.name}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-500" />
                </div>
              );
            })}
          </div>
        )}

        {/* === LEITURA DO MATERIAL === */}
        {activeTab === 'study' && readingMaterial && (
          <div className="p-4 bg-white min-h-full">
            <button onClick={() => setReadingMaterial(null)} className="mb-4 flex items-center text-slate-500 hover:text-brand-600 font-medium text-sm">
              <ArrowLeft size={18} className="mr-1" /> Voltar
            </button>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">{readingMaterial.title}</h1>
            <div className="prose prose-slate text-slate-600 leading-relaxed whitespace-pre-line text-sm">
              {readingMaterial.content}
            </div>
            <button onClick={() => { setReadingMaterial(null); setActiveTab('game'); }} 
                    className="w-full mt-8 bg-brand-100 text-brand-700 py-3 rounded-xl font-bold hover:bg-brand-200">
              Li tudo! Ir para o Quiz
            </button>
          </div>
        )}

        {/* === ABA JOGAR (HOME) === */}
        {activeTab === 'game' && gameScreen === 'start' && (
          <div className="p-6 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-6 text-white shadow-lg text-center">
              <h2 className="font-bold text-xl mb-2">Quiz do Dia</h2>
              <p className="opacity-90 text-sm mb-4">Teste seus conhecimentos sobre o que você acabou de ler.</p>
              <button onClick={startGame} className="bg-white text-brand-600 px-6 py-2 rounded-full font-bold shadow-md hover:scale-105 transition-transform">
                Começar Agora
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {topics.map(t => (
                <div key={t.id} className={`${t.color} p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-transparent hover:brightness-95`}>
                  <t.icon size={24} />
                  <span className="font-bold text-xs">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === JOGO EM ANDAMENTO === */}
        {activeTab === 'game' && gameScreen === 'play' && (
          <div className="p-6">
            <div className="mb-4 flex justify-between text-xs font-bold text-slate-400 uppercase">
              <span>Questão {qIndex + 1}/{currentQuestions.length}</span>
              <span>{currentQuestions[qIndex].type === 'case' ? 'Caso Clínico' : 'Teoria'}</span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-6">{currentQuestions[qIndex].question}</h3>
            
            <div className="space-y-3">
              {currentQuestions[qIndex].options.map((opt, idx) => (
                <button key={idx} disabled={feedback !== null} onClick={() => handleAnswer(idx)}
                  className={`w-full p-4 rounded-xl text-left text-sm font-medium border-2 transition-all
                    ${feedback === null ? 'border-slate-100 hover:border-brand-500 bg-white' : ''}
                    ${feedback && idx === currentQuestions[qIndex].correct ? 'border-green-500 bg-green-50 text-green-700' : ''}
                    ${feedback === 'incorrect' && idx !== currentQuestions[qIndex].correct ? 'opacity-50' : ''}
                  `}>
                  {opt}
                </button>
              ))}
            </div>
            
            {feedback && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`mt-4 p-4 rounded-lg text-sm ${feedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <strong>{feedback === 'correct' ? 'Isso aí!' : 'Ops...'}</strong> {currentQuestions[qIndex].explanation}
              </motion.div>
            )}
          </div>
        )}

        {/* === TELA FINAL === */}
        {activeTab === 'game' && gameScreen === 'result' && (
          <div className="p-8 text-center flex flex-col items-center">
            <Trophy size={64} className="text-yellow-400 mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-slate-800">Parabéns!</h2>
            <p className="text-slate-500 mb-8">Você acertou <strong className="text-brand-600">{score} de {currentQuestions.length}</strong></p>
            <button onClick={() => setGameScreen('start')} className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold">Voltar ao Início</button>
          </div>
        )}

      </div>

      {/* MENU INFERIOR DE NAVEGAÇÃO */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-200 flex justify-around p-2 pb-4 z-20">
        <button 
          onClick={() => { setActiveTab('game'); setReadingMaterial(null); }}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg w-20 transition-colors ${activeTab === 'game' ? 'text-brand-600 bg-brand-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Gamepad2 size={24} />
          <span className="text-[10px] font-bold">Jogar</span>
        </button>
        <button 
          onClick={() => setActiveTab('study')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg w-20 transition-colors ${activeTab === 'study' ? 'text-brand-600 bg-brand-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Library size={24} />
          <span className="text-[10px] font-bold">Estudar</span>
        </button>
      </div>

    </div>
  );
}

export default App;
