import React, { useEffect, useState } from 'react';
import { Zap, Leaf, Layers, Tag, Crown, ArrowRight, Sparkles } from 'lucide-react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  gradient?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = "", title, description, icon, gradient }) => {
  return (
    <div className={`relative group overflow-hidden rounded-3xl border border-stone-200 dark:border-stone-800 bg-stone-100/80 dark:bg-stone-900/60 backdrop-blur-xl p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1 ${className}`}>
      {/* Background Gradient Hover Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${gradient || 'from-stone-400 to-stone-600'}`}></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="mb-4 flex items-center justify-between">
           {icon && (
             <div className="w-10 h-10 rounded-full bg-white/80 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 group-hover:scale-110 transition-transform duration-300 shadow-sm">
               {icon}
             </div>
           )}
           {gradient && (
             <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-5 h-5 text-stone-400 dark:text-stone-500" />
             </div>
           )}
        </div>
        
        <div className="flex-1 flex items-center justify-center my-4">
            {children}
        </div>

        <div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2 font-display tracking-tight">{title}</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const DeliverySimulation = () => {
  const [progress, setProgress] = useState(0);
  const [minutes, setMinutes] = useState(35);

  useEffect(() => {
    const duration = 3000; // 3 seconds loop
    const startTime = Date.now();
    let animationFrameId: number;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const loopElapsed = elapsed % duration;
      const fraction = loopElapsed / duration;
      
      // Ease out cubic
      const ease = 1 - Math.pow(1 - fraction, 3);
      
      const currentProgress = ease * 100;
      setProgress(currentProgress);

      // Calculate minutes: start at 35, end at 12
      const startMin = 35;
      const endMin = 12;
      const currentMin = startMin - (ease * (startMin - endMin));
      setMinutes(Math.round(currentMin));

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
        {/* Map Background SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08] dark:opacity-[0.05] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <pattern id="map-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10 10h80v80h-80z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M30 30l40 40M70 30l-40 40" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#map-pattern)" />
        </svg>

        {/* Animated Speed Visual */}
        <div className="relative w-64 h-14 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden shadow-inner border border-stone-100 dark:border-stone-700">
            {/* Continuously Filling Green Bar */}
            <div 
                className="absolute left-0 top-0 h-full bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                style={{ width: `${progress}%` }}
            >
                {/* Subtle shimmer inside the bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shimmer"></div>
            </div>
            
            {/* Dynamic Text */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">Est:</span>
                <span className={`text-lg font-bold font-mono transition-colors duration-200 ${minutes < 20 ? 'text-green-600 dark:text-green-400' : 'text-stone-600 dark:text-stone-300'}`}>
                    {minutes} min
                </span>
            </div>
        </div>
    </div>
  );
}

export const BentoGrid: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-stone-50 dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden">
      
      {/* Cool Divider Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-300 dark:via-stone-700 to-transparent opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 md:w-1/3 h-[1px] bg-gradient-to-r from-transparent via-brand-500 to-transparent shadow-[0_0_15px_rgba(249,115,22,0.6)]"></div>

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"></div>
         <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-stone-900 dark:text-white mb-6 font-display tracking-tight">
            The Future of <span className="font-serif italic text-6xl text-brand-600 dark:text-brand-500 px-1">Snacking</span>
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
            We've rebuilt the snacking experience from the ground up. 
            Everything you crave, delivered with technology that understands your taste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Card 1: Fast Delivery (Large Span) */}
          <BentoCard 
            title="Hyper-Fast Delivery" 
            description="Our predictive logistics network ensures your snacks arrive in under 30 minutes, guaranteed."
            icon={<Zap className="w-5 h-5" />}
            className="md:col-span-2"
            gradient="from-yellow-400 to-orange-500"
          >
            <DeliverySimulation />
          </BentoCard>

          {/* Card 2: Fresh Snacks */}
          <BentoCard 
            title="Farm Fresh" 
            description="Sourced directly from local organic farms daily. No preservatives, just real food."
            icon={<Leaf className="w-5 h-5" />}
            className="md:col-span-1"
            gradient="from-green-400 to-emerald-600"
          >
            <div className="relative w-32 h-32">
               <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
               <img 
                loading="lazy"
                src="https://picsum.photos/seed/salad/200/200" 
                alt="Fresh" 
                className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-stone-800 shadow-lg transform group-hover:rotate-12 transition-transform duration-500" 
               />
               <div className="absolute -bottom-2 -right-2 bg-white dark:bg-stone-800 px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm">100% Organic</div>
            </div>
          </BentoCard>

          {/* Card 3: All Varieties */}
          <BentoCard 
            title="Endless Variety" 
            description="From keto to vegan, sweet to savory. Over 500+ curated snacks to choose from."
            icon={<Layers className="w-5 h-5" />}
            className="md:col-span-1"
            gradient="from-blue-400 to-indigo-600"
          >
             <div className="grid grid-cols-3 gap-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {[1,2,3,4,5,6,7,8,9].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-xs">
                    {['🍩','🍪','🥜','🥨','🥯','🧁','🍫','🍿','🥗'][i-1]}
                  </div>
                ))}
             </div>
          </BentoCard>

          {/* Card 4: High Discount */}
          <BentoCard 
            title="Smart Savings" 
            description="Dynamic pricing engine gives you up to 40% off during off-peak hours."
            icon={<Tag className="w-5 h-5" />}
            className="md:col-span-1"
            gradient="from-pink-400 to-rose-600"
          >
            <div className="relative">
               <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-stone-900 to-stone-500 dark:from-white dark:to-stone-600">
                 40%
               </div>
               <div className="text-sm font-bold text-brand-500 text-center mt-1">OFF</div>
            </div>
          </BentoCard>

          {/* Card 5: Membership */}
          <BentoCard 
            title="Pro Membership" 
            description="Join the club for $0 delivery fees, exclusive weekly drops, and priority support."
            icon={<Crown className="w-5 h-5" />}
            className="md:col-span-1"
            gradient="from-amber-300 to-yellow-600"
          >
             <div className="relative w-24 h-24 flex items-center justify-center">
               <div className="absolute inset-0 border-2 border-dashed border-amber-400/50 rounded-full animate-spin-slow"></div>
               <Crown className="w-10 h-10 text-amber-500 fill-current drop-shadow-lg" />
             </div>
          </BentoCard>

          {/* Card 6: AI Recommendations (Full Width) */}
          <div className="md:col-span-3 rounded-3xl border border-stone-200 dark:border-stone-800 bg-stone-900 dark:bg-black overflow-hidden relative group h-[300px]">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent"></div>
             
             <div className="relative z-10 p-10 h-full flex flex-col justify-center max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                   <Sparkles className="w-3 h-3" /> New Feature
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Your AI Snack Sommelier</h3>
                <p className="text-stone-300 text-lg mb-8 max-w-lg">
                  Our proprietary algorithm analyzes your mood, time of day, and past preferences to curate the perfect box for right now.
                </p>
                <button className="flex items-center gap-2 text-white font-bold hover:text-brand-400 transition-colors group-hover:translate-x-2 duration-300">
                  Try Snack Genius <ArrowRight className="w-5 h-5" />
                </button>
             </div>

             {/* Floating UI Elements for Tech Vibe */}
             <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:block">
                <div className="glass-panel p-4 rounded-xl border-white/10 bg-white/5 backdrop-blur-md w-64 transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                   <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-purple-600"></div>
                      <div className="h-2 w-24 bg-white/20 rounded-full"></div>
                   </div>
                   <div className="space-y-2">
                      <div className="h-2 w-full bg-white/10 rounded-full"></div>
                      <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};