import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Loader2, RefreshCw, Lightbulb } from 'lucide-react';
import { generateSnackRecommendation } from '../services/geminiService';
import { SnackRecommendation, LoadingState } from '../types';

const TIPS = [
  "Feeling stressed? Try crunchy.",
  "Need a boost? Go for protein.",
  "Late night? Keep it light.",
  "Post-workout? Carbs & protein.",
  "Movie night? Sweet & salty mix."
];

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶअआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह";

const ScrambleText: React.FC<{ text: string; className?: string; delay?: number; speed?: 'slow' | 'fast' }> = ({ 
  text, 
  className, 
  delay = 0,
  speed = 'slow' 
}) => {
  const [displayText, setDisplayText] = useState(() => 
    // Initialize with random characters of the same length
    text.split('').map((c) => c === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]).join('')
  );
  
  useEffect(() => {
    let iteration = 0;
    let interval: any = null;
    
    // 'fast' is now significantly faster (4 chars per tick) vs slow (0.5 chars per tick)
    const increment = speed === 'fast' ? 4 : 0.5;
    
    const startScramble = () => {
        iteration = 0;
        
        interval = setInterval(() => {
            setDisplayText(prev => {
                return text
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    if (letter === ' ') return ' ';
                    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                })
                .join("");
            });

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += increment; 
        }, 30);
    };

    const timeout = setTimeout(startScramble, delay);

    return () => {
        clearTimeout(timeout);
        if (interval) clearInterval(interval);
    };
  }, [text, delay, speed]);

  return <span className={className}>{displayText}</span>;
};

export const SnackGenius: React.FC = () => {
  const [mood, setMood] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<SnackRecommendation | null>(null);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;
    
    setStatus(LoadingState.LOADING);
    try {
      const data = await generateSnackRecommendation(mood);
      setResult(data);
      setStatus(LoadingState.SUCCESS);
    } catch (err) {
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <section id="ai-genius" className="py-24 relative overflow-hidden bg-stone-50 dark:bg-dark-bg transition-colors duration-300">
      
      {/* Decorative Section Divider - Purple Glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 dark:via-stone-700 to-transparent opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 md:w-1/3 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.6)]"></div>

      {/* Dotted Background Pattern (Local to this section) */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>

      {/* Modern Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
         <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-40"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles className="w-3 h-3" /> Powered by Nerd 2.0
          </div>
          <h2 className="text-6xl md:text-6xl font-bold text-stone-900 dark:text-white mb-6 font-display tracking-tight leading-tight">
            Snack Genius
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Describe your current vibe, and let our AI sommelier curate the perfect bite for you.
          </p>
        </div>

        {/* Main Card - Reverted to clean glass design */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-3xl border border-stone-200 dark:border-stone-700 p-2 md:p-4 transform transition-all hover:scale-[1.01] duration-500">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/20 to-transparent opacity-50"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 items-stretch">
              
              {/* Left: Input Section */}
              <div className="p-8 md:p-12 flex flex-col justify-center space-y-8">
                 <div>
                   <label className="block text-sm font-bold text-stone-500 dark:text-stone-400 mb-3 ml-2 uppercase tracking-wider">How are you feeling?</label>
                   <form onSubmit={handlePredict} className="relative group">
                     <input 
                        type="text" 
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        placeholder="e.g. Just finished a marathon..."
                        className="w-full bg-white dark:bg-black/50 border border-stone-200 dark:border-stone-700 rounded-2xl pl-6 pr-20 py-6 text-lg md:text-xl text-stone-800 dark:text-stone-200 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all shadow-inner"
                     />
                     <button 
                      type="submit"
                      disabled={status === LoadingState.LOADING || !mood}
                      className="absolute right-3 top-3 bottom-3 aspect-square rounded-xl flex items-center justify-center bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                     >
                       {status === LoadingState.LOADING ? (
                         <Loader2 className="w-6 h-6 animate-spin" />
                       ) : (
                         <ArrowRight className="w-6 h-6" />
                       )}
                     </button>
                     
                     {/* Glow Effect on Focus/Hover */}
                     <div className="absolute inset-0 rounded-2xl ring-4 ring-brand-500/20 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500"></div>
                   </form>
                 </div>
                 
                 {/* Animated Tips */}
                 <div className="flex items-center gap-3 text-stone-500 dark:text-stone-400 bg-stone-100/50 dark:bg-stone-800/30 px-4 py-3 rounded-xl w-fit">
                   <Lightbulb className="w-4 h-4 text-brand-500" />
                   <div className="h-5 overflow-hidden relative w-64">
                     {TIPS.map((tip, idx) => (
                       <span 
                        key={idx}
                        className={`absolute top-0 left-0 w-full transition-all duration-500 text-sm font-medium ${
                          idx === tipIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                        }`}
                       >
                         {tip}
                       </span>
                     ))}
                   </div>
                 </div>

                 <div className="flex flex-wrap gap-2">
                   {['Need energy', 'Midnight snack', 'Stressed out', 'Celebration'].map(tag => (
                     <button 
                      key={tag} 
                      onClick={() => setMood(tag)}
                      className="text-xs font-medium px-4 py-2 rounded-full border border-stone-200 dark:border-stone-700 hover:border-brand-400 dark:hover:border-brand-500 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all hover:shadow-sm active:scale-95"
                     >
                       {tag}
                     </button>
                   ))}
                 </div>
              </div>

              {/* Right: Result Section */}
              <div className="relative min-h-[400px] bg-stone-100 dark:bg-black/20 lg:rounded-[2.5rem] lg:m-2 rounded-b-[2.5rem] flex items-center justify-center overflow-hidden border border-white/50 dark:border-white/5">
                
                {/* Idle State */}
                {status === LoadingState.IDLE && (
                   <div className="text-center text-stone-400 dark:text-stone-600 p-8 animate-in fade-in zoom-in duration-700">
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-2xl animate-pulse"></div>
                        <div className="relative bg-white dark:bg-stone-800 w-full h-full rounded-full flex items-center justify-center shadow-xl">
                          <Sparkles className="w-12 h-12 text-stone-300 dark:text-stone-600" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-stone-500 dark:text-stone-500">Ready to Crave?</h3>
                      <p className="text-sm max-w-xs mx-auto">Enter your mood and watch the magic happen.</p>
                   </div>
                )}

                {/* Error State */}
                {status === LoadingState.ERROR && (
                   <div className="text-center text-red-500 p-8 animate-in fade-in slide-in-from-bottom-4">
                      <p className="font-bold text-lg">Oops!</p>
                      <p>The AI is out to lunch. Try again.</p>
                   </div>
                )}

                {/* Success State */}
                {status === LoadingState.SUCCESS && result && (
                  <div className="w-full h-full p-8 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                         <div className="bg-brand-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-brand-500/30">
                           Perfect Match
                         </div>
                         <div className="text-stone-400 text-xs font-mono border border-stone-200 dark:border-stone-700 px-2 py-1 rounded-md">
                           {result.calories} KCAL
                         </div>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 font-display leading-tight">
                        <ScrambleText 
                          text={result.name} 
                          className="text-orange-600 dark:text-orange-400 drop-shadow-sm" 
                          delay={0} 
                          speed="slow"
                        />
                      </h3>
                      
                      <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed mb-8 border-l-2 border-brand-500 pl-4 min-h-[4.5rem]">
                        {/* Increased speed here */}
                        <ScrambleText text={result.description} delay={500} speed="fast" />
                      </p>
                      
                      <div className="bg-white dark:bg-stone-800/50 rounded-2xl p-5 mb-6 shadow-sm border border-stone-100 dark:border-stone-700/50">
                        <p className="text-xs text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Sparkles className="w-3 h-3" /> Why it fits
                        </p>
                        <p className="text-stone-700 dark:text-stone-300 text-sm italic font-medium">
                          "<ScrambleText text={result.matchReason} delay={1000} speed="fast" />"
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {result.tags.map((t, i) => (
                          <span key={t} className="text-xs font-semibold bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-3 py-1 rounded-lg">
                            #<ScrambleText text={t} delay={1500 + (i * 100)} speed="fast" />
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {setStatus(LoadingState.IDLE); setMood(''); setResult(null)}}
                      className="absolute bottom-6 right-6 w-12 h-12 bg-white dark:bg-stone-800 rounded-full shadow-xl border border-stone-100 dark:border-stone-700 flex items-center justify-center text-stone-400 hover:text-brand-500 hover:rotate-180 transition-all duration-500 group"
                    >
                      <RefreshCw className="w-5 h-5 group-hover:text-brand-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};