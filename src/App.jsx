import React, { useState, useEffect } from 'react';
import { BookOpen, Trophy, Flame, CheckCircle, XCircle, RefreshCw, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { getDailyQuestions, topics } from './data';

function App() {
  const [screen, setScreen] = useState('home'); // home, game, result
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // null, correct, incorrect

  // Carregar dados salvos (persistência)
  useEffect(() => {
    const savedXp = localStorage.getItem('psico_xp');
    const savedStreak = localStorage.getItem('psico_streak');
    if (savedXp) setXp(parseInt(savedXp));
    if (savedStreak) setStreak(parseInt(savedStreak));
  }, []);

  const startGame = () => {
    const dailySet = getDailyQuestions();
    setCurrentQuestions(dailySet);
    setQIndex(0);
    setScore(0);
    setScreen('game');
    setFeedback(null);
  };

  const handleAnswer = (optionIndex) => {
    const currentQ = currentQuestions[qIndex];
    const isCorrect = optionIndex === currentQ.correct;

    if (isCorrect) {
      setFeedback('correct');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      setScore(score + 1);
    } else {
      setFeedback('incorrect');
    }

    // Delay para ler a explicação
    setTimeout(() => {
      if (qIndex + 1 < currentQuestions.length) {
        setQIndex(qIndex + 1);
        setFeedback(null);
      } else {
        finishGame(isCorrect ? score + 1 : score);
      }
    }, 2500); // 2.5 segundos para ler a explicação
  };

  const finishGame = (finalScore) => {
    const xpGained = finalScore * 50;
    const newXp = xp + xpGained;
    setXp(newXp);
    localStorage.setItem('psico_xp', newXp);
    
    // Lógica simples de Streak (idealmente verificaria datas)
    if (finalScore > 0) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('psico_streak', newStreak);
    }

    setScreen('result');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col relative">
        
        {/* Header Fixo */}
        <div className="bg-brand-600 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain size={24} />
            <h1 className="font-bold text-lg">PsicoQuest</h1>
          </div>
          <div className="flex gap-4 text-sm font-medium">
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg">
              <Flame size={16} className="text-orange-300" />
              <span>{streak} Dias</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg">
              <Trophy size={16} className="text-yellow-300" />
              <span>{xp} XP</span>
            </div>
          </div>
        </div>

        {/* --- TELA INICIAL --- */}
        {screen === 'home' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="flex-1 p-6 flex flex-col gap-6"
          >
            <div className="bg-brand-100 p-4 rounded-xl border border-brand-500/20">
              <h2 className="text-brand-600 font-bold text-lg mb-1">Meta Diária</h2>
              <p className="text-slate-600 text-sm">Estude 3 tópicos hoje para manter sua ofensiva!</p>
              <div className="w-full bg-white h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-brand-500 h-full w-0" /> {/* Barra de progresso visual */}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {topics.map(t => (
                <div key={t.id} className="p-4 border rounded-xl hover:border-brand-500 hover:shadow-md transition-all cursor-pointer bg-slate-50">
                  <span className="font-semibold text-sm text-slate-700">{t.name}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={startGame}
              className="mt-auto bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 shadow-lg shadow-brand-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <BookOpen size={24} />
              Começar Treino Diário
            </button>
          </motion.div>
        )}

        {/* --- TELA DO JOGO --- */}
        {screen === 'game' && currentQuestions.length > 0 && (
          <div className="flex-1 flex flex-col p-6">
             <div className="mb-6 flex justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
               <span>Questão {qIndex + 1} de {currentQuestions.length}</span>
               <span>{currentQuestions[qIndex].type === 'case' ? 'Estudo de Caso' : 'Quiz Teórico'}</span>
             </div>

             <AnimatePresence mode='wait'>
               <motion.div 
                 key={qIndex}
                 initial={{ x: 50, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 exit={{ x: -50, opacity: 0 }}
                 className="flex-1"
               >
                 <h3 className="text-xl font-bold text-slate-800 mb-6 leading-relaxed">
                   {currentQuestions[qIndex].question}
                 </h3>

                 <div className="flex flex-col gap-3">
                   {currentQuestions[qIndex].options.map((opt, idx) => {
                     let btnClass = "p-4 rounded-xl border-2 text-left transition-all font-medium text-slate-600 ";
                     
                     if (feedback) {
                       if (idx === currentQuestions[qIndex].correct) btnClass += "border-green-500 bg-green-50 text-green-700";
                       else if (feedback === 'incorrect' && idx !== currentQuestions[qIndex].correct) btnClass += "opacity-50 border-slate-200";
                     } else {
                       btnClass += "border-slate-200 hover:border-brand-500 hover:bg-brand-50 cursor-pointer";
                     }

                     return (
                       <button 
                         key={idx}
                         disabled={feedback !== null}
                         onClick={() => handleAnswer(idx)}
                         className={btnClass}
                       >
                         {opt}
                       </button>
                     )
                   })}
                 </div>

                 {feedback && (
                   <motion.div 
                     initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                     className={`mt-6 p-4 rounded-lg text-sm ${feedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                   >
                     <strong>{feedback === 'correct' ? 'Excelente!' : 'Atenção!'}</strong>
                     <p className="mt-1">{currentQuestions[qIndex].explanation}</p>
                   </motion.div>
                 )}
               </motion.div>
             </AnimatePresence>
          </div>
        )}

        {/* --- TELA DE RESULTADO --- */}
        {screen === 'result' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <Trophy size={64} className="text-yellow-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-800">Treino Concluído!</h2>
            <p className="text-slate-500 mt-2">Você ganhou <span className="text-brand-600 font-bold">+{score * 50} XP</span> hoje.</p>
            
            <div className="bg-slate-100 w-full p-4 rounded-xl mt-8 mb-8">
              <div className="text-sm text-slate-500 uppercase font-bold">Acertos</div>
              <div className="text-3xl font-black text-slate-800">{score}/{currentQuestions.length}</div>
            </div>

            <button 
              onClick={() => setScreen('home')}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              Voltar ao Início
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
