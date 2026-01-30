import React, { useState } from 'react';
import { 
  BookOpen, Brain, Activity, ChevronRight, ArrowLeft, 
  RotateCcw, CheckCircle, GraduationCap, Microscope, 
  Library, PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown'; // Se puder instalar, senão uso parser simples
import { courses } from './data';

// --- COMPONENTES UI ---
const Card = ({ children, className = "", onClick }) => (
  <motion.div 
    whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }}
    whileTap={{ scale: 0.99 }}
    onClick={onClick}
    className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-6 cursor-pointer ${className}`}
  >
    {children}
  </motion.div>
);

// --- PARSER SIMPLES DE MARKDOWN (Para não depender de libs externas) ---
const MarkdownViewer = ({ content }) => {
  const lines = content.split('\n');
  return (
    <div className="space-y-4 text-slate-700 leading-relaxed font-serif">
      {lines.map((line, i) => {
        const clean = line.trim();
        if (!clean) return <div key={i} className="h-2" />;
        if (clean.startsWith('# ')) return <h2 key={i} className="text-2xl font-bold text-slate-900 mt-6 border-b pb-2 border-slate-200">{clean.substring(2)}</h2>;
        if (clean.startsWith('## ')) return <h3 key={i} className="text-xl font-bold text-violet-700 mt-4">{clean.substring(3)}</h3>;
        if (clean.startsWith('* ')) return <li key={i} className="ml-4 list-disc marker:text-violet-500 pl-2">{clean.substring(2)}</li>;
        return <p key={i} className="text-lg">{clean}</p>;
      })}
    </div>
  );
};

export default function App() {
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  const [mode, setMode] = useState('home'); // home, course, study
  
  // Estado para Flashcards
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  // Estado para Casos Clínicos
  const [caseFeedback, setCaseFeedback] = useState(null);

  const handleOpenContent = (content) => {
    setActiveContent(content);
    setMode('study');
    setFlashcardFlipped(false);
    setCaseFeedback(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-violet-200">
      
      {/* HEADER ACADÊMICO */}
      <header className="bg-slate-900 text-white p-6 sticky top-0 z-50 shadow-xl">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-violet-600 p-2 rounded-lg">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">PsicoMaster Pro</h1>
              <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Plataforma de Ensino Superior</p>
            </div>
          </div>
          {mode !== 'home' && (
            <button 
              onClick={() => {
                if(mode === 'study') setMode('course');
                else { setActiveCourse(null); setMode('home'); }
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6 pb-24">
        <AnimatePresence mode="wait">
          
          {/* 1. HOME - DASHBOARD DE CURSOS */}
          {mode === 'home' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
              className="grid gap-6"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-slate-800">Seus Cursos</h2>
                <p className="text-slate-500">Selecione um módulo para iniciar seus estudos.</p>
              </div>

              {courses.map((course) => (
                <Card key={course.id} onClick={() => { setActiveCourse(course); setMode('course'); }} className="group relative overflow-hidden border-0 shadow-md">
                  <div className={`absolute top-0 left-0 w-2 h-full ${course.color}`} />
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-xl ${course.color} bg-opacity-10 text-violet-700`}>
                      <course.icon size={32} className={`text-${course.color.split('-')[1]}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors">{course.title}</h3>
                      <p className="text-slate-600 leading-relaxed mb-4">{course.description}</p>
                      <div className="flex gap-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><BookOpen size={14} /> {course.content.filter(c => c.type === 'text').length} Aulas</span>
                        <span className="flex items-center gap-1"><Activity size={14} /> {course.content.filter(c => c.type === 'case_study').length} Casos</span>
                        <span className="flex items-center gap-1"><Brain size={14} /> {course.content.filter(c => c.type === 'flashcard').length} Flashcards</span>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-300 self-center group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              ))}
            </motion.div>
          )}

          {/* 2. COURSE VIEW - LISTA DE CONTEÚDOS */}
          {mode === 'course' && activeCourse && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
                <div className={`inline-block p-4 rounded-full ${activeCourse.color} text-white mb-4 shadow-lg`}>
                  <activeCourse.icon size={48} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{activeCourse.title}</h2>
                <p className="text-slate-500 max-w-md mx-auto">{activeCourse.description}</p>
              </div>

              <div className="grid gap-4">
                {activeCourse.content.map((item, idx) => {
                  let Icon = BookOpen;
                  let typeLabel = "Leitura";
                  let style = "border-l-4 border-slate-300";
                  
                  if (item.type === 'flashcard') { Icon = Brain; typeLabel = "Flashcard"; style = "border-l-4 border-violet-400"; }
                  if (item.type === 'case_study') { Icon = Microscope; typeLabel = "Estudo de Caso"; style = "border-l-4 border-emerald-400"; }

                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                      onClick={() => handleOpenContent(item)}
                      className={`w-full bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all text-left flex items-center gap-4 ${style}`}
                    >
                      <div className="bg-slate-50 p-3 rounded-lg text-slate-500">
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">{typeLabel}</span>
                        <h4 className="font-bold text-slate-800 text-lg">{item.question || item.title}</h4>
                      </div>
                      <PlayCircle className="text-slate-300" />
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* 3. STUDY MODE - VISUALIZAÇÃO DO CONTEÚDO */}
          {mode === 'study' && activeContent && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="h-full">
              
              {/* TIPO: TEXTO ACADÊMICO */}
              {activeContent.type === 'text' && (
                <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 max-w-3xl mx-auto">
                  <div className="flex items-center gap-2 mb-8 text-violet-600 font-bold uppercase tracking-wider text-xs">
                    <Library size={16} /> Material Teórico
                  </div>
                  <MarkdownViewer content={activeContent.text} />
                  <button onClick={() => setMode('course')} className="w-full mt-12 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Concluir Leitura
                  </button>
                </div>
              )}

              {/* TIPO: FLASHCARD (REPETIÇÃO) */}
              {activeContent.type === 'flashcard' && (
                <div className="flex flex-col items-center justify-center min-h-[60vh] perspective-1000">
                  <motion.div 
                    onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                    animate={{ rotateY: flashcardFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="w-full max-w-md aspect-[4/3] bg-white rounded-3xl shadow-2xl border border-slate-100 cursor-pointer relative preserve-3d"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* FRENTE */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center backface-hidden">
                      <Brain size={48} className="text-violet-200 mb-6" />
                      <h3 className="text-2xl font-bold text-slate-800">{activeContent.question}</h3>
                      <p className="text-slate-400 text-sm mt-8 animate-pulse">Toque para ver a resposta</p>
                    </div>

                    {/* VERSO */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-violet-600 text-white rounded-3xl backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
                      <CheckCircle size={48} className="text-violet-200 mb-6" />
                      <p className="text-xl font-medium leading-relaxed">{activeContent.answer}</p>
                    </div>
                  </motion.div>
                  
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setMode('course')} className="px-6 py-3 rounded-full font-bold text-slate-500 hover:bg-slate-200 bg-white shadow-sm">Difícil (Rever)</button>
                    <button onClick={() => setMode('course')} className="px-6 py-3 rounded-full font-bold text-white bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30">Fácil (Memorizado)</button>
                  </div>
                </div>
              )}

              {/* TIPO: ESTUDO DE CASO (CLÍNICA) */}
              {activeContent.type === 'case_study' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl">
                    <div className="flex items-center gap-2 font-bold text-yellow-800 mb-4">
                      <Activity size={20} /> Ficha do Paciente
                    </div>
                    <div className="space-y-3 text-slate-800">
                      <p><strong>Paciente:</strong> {activeContent.patient}</p>
                      <p><strong>Queixa:</strong> {activeContent.complaint}</p>
                      <p className="bg-white p-3 rounded-lg border border-yellow-100 mt-2"><strong>Observação Clínica:</strong> {activeContent.observation}</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <h3 className="font-bold text-xl mb-6">{activeContent.question}</h3>
                    <div className="space-y-3">
                      {activeContent.options.map((opt, idx) => (
                        <button 
                          key={idx}
                          disabled={caseFeedback !== null}
                          onClick={() => setCaseFeedback(idx === activeContent.correct ? 'correct' : 'incorrect')}
                          className={`w-full p-4 rounded-xl text-left border-2 transition-all font-medium
                            ${!caseFeedback ? 'border-slate-100 hover:border-violet-500' : ''}
                            ${caseFeedback && idx === activeContent.correct ? 'bg-green-100 border-green-500 text-green-800' : ''}
                            ${caseFeedback === 'incorrect' && idx !== activeContent.correct ? 'opacity-50' : ''}
                            ${caseFeedback === 'incorrect' && idx === activeContent.correct ? 'bg-green-100 border-green-500 text-green-800' : ''} 
                          `}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    
                    {caseFeedback && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 p-4 bg-slate-800 text-slate-100 rounded-xl text-sm leading-relaxed">
                        <strong className="text-violet-400 block mb-1">Análise do Supervisor:</strong>
                        {activeContent.explanation}
                        <button onClick={() => setMode('course')} className="block mt-4 text-violet-300 font-bold hover:underline">Voltar aos casos</button>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
