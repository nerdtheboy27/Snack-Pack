import React, { useState, useEffect, useRef } from 'react';
import { Check, Crown, Users } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "0",
    description: "Perfect for the occasional snacker.",
    features: ["Pay as you go", "Standard Delivery", "Access to full menu", "Basic support"],
    cta: "Get Started",
    popular: false,
    theme: "stone"
  },
  {
    name: "Pro Member",
    price: "19",
    description: "For the daily foodie.",
    features: ["Free Priority Delivery", "10% Off all orders", "Exclusive drops", "Priority support", "Nutrition tracking"],
    cta: "Join Pro",
    popular: true,
    theme: "gold"
  },
  {
    name: "Team",
    price: "49",
    description: "Snacks for the whole office.",
    features: ["Free Delivery for 5 users", "15% Off all orders", "Catering menu access", "Dedicated account manager", "Monthly billing"],
    cta: "Contact Sales",
    popular: false,
    theme: "indigo"
  }
];

const AnimatedPrice: React.FC<{ value: string }> = ({ value }) => {
  const numericValue = parseFloat(value);
  const [displayValue, setDisplayValue] = useState(numericValue);
  const previousValue = useRef(numericValue);

  useEffect(() => {
    const start = previousValue.current;
    const end = numericValue;
    
    // If no change, do nothing
    if (start === end) return;

    const duration = 500; // 0.5s animation
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease Out Quart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const current = start + (end - start) * ease;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end); // Ensure exact final value
        previousValue.current = end;
      }
    };

    requestAnimationFrame(animate);
  }, [numericValue]);

  // Format logic: if it's an integer, show integer. If decimals (unlikely here but safe), show fixed.
  const formatted = Math.round(displayValue).toString();

  return <>{formatted}</>;
};

export const Pricing: React.FC = () => {
  const [yearly, setYearly] = useState(false);

  const getThemeClasses = (theme: string) => {
      switch(theme) {
          case 'gold':
              return "bg-gradient-to-b from-white to-amber-50/50 dark:from-stone-900 dark:to-amber-900/10 border-amber-400/60 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/50";
          case 'indigo':
              return "bg-gradient-to-b from-white to-indigo-50/50 dark:from-stone-900 dark:to-indigo-900/10 border-indigo-400/60 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-400/30";
          default:
              return "bg-white dark:bg-dark-card border-stone-200 dark:border-dark-border";
      }
  }

  return (
    <section id="pricing" className="py-24 bg-stone-50 dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden">
      {/* BG Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-brand-100/30 to-olive-100/30 dark:from-brand-900/10 dark:to-olive-900/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-stone-900 dark:text-white mb-4 font-display tracking-tight">Simple Pricing</h2>
          <p className="text-stone-500 dark:text-stone-400 mb-10 text-lg md:text-xl">Choose the plan that fits your appetite.</p>
          
          <div className="inline-flex items-center bg-white dark:bg-dark-card p-1.5 rounded-full border border-stone-200 dark:border-dark-border shadow-sm">
            <button 
              onClick={() => setYearly(false)}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${!yearly ? 'bg-stone-900 text-white shadow-md' : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'}`}
            >
              Monthly
            </button>
            <button 
               onClick={() => setYearly(true)}
               className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${yearly ? 'bg-stone-900 text-white shadow-md' : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'}`}
            >
              Yearly <span className="text-brand-500 text-xs ml-1 font-extrabold">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, idx) => {
            // Calculate price
            const basePrice = parseInt(plan.price);
            const finalPrice = yearly && idx !== 0 ? (basePrice * 0.8).toFixed(0) : plan.price;

            return (
            <div 
              key={plan.name} 
              className={`relative rounded-[2.5rem] p-8 md:p-10 border backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full ${getThemeClasses(plan.theme)} ${plan.popular ? 'z-10 md:scale-105 md:-mt-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 uppercase tracking-wide border border-white dark:border-stone-900">
                  <Crown className="w-3 h-3 fill-white" /> Most Popular
                </div>
              )}
              
              {plan.theme === 'indigo' && (
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 uppercase tracking-wide border border-white dark:border-stone-900">
                  <Users className="w-3 h-3 fill-current" /> Best Value
                </div>
              )}

              <div className="mb-8 text-center mt-2">
                <h3 className={`text-xl font-bold mb-2 font-display uppercase tracking-wider ${
                    plan.theme === 'gold' ? 'text-amber-600 dark:text-amber-400' : 
                    (plan.theme === 'indigo' ? 'text-indigo-600 dark:text-indigo-400' : 'text-stone-500 dark:text-stone-400')
                }`}>{plan.name}</h3>
                
                <div className="flex items-baseline justify-center gap-1 my-4">
                  <span className="text-sm font-bold text-stone-400 align-top mt-2">$</span>
                  <span className="text-6xl font-bold text-stone-900 dark:text-white tracking-tighter">
                    <AnimatedPrice value={finalPrice} />
                  </span>
                  <span className="text-stone-500 text-sm font-medium">/mo</span>
                </div>
                <p className="text-stone-500 dark:text-stone-400 text-sm mt-2 px-2 leading-relaxed font-medium">{plan.description}</p>
              </div>

              <div className={`h-px w-full mb-8 ${
                  plan.theme === 'gold' ? 'bg-gradient-to-r from-transparent via-amber-500/30 to-transparent' : 
                  (plan.theme === 'indigo' ? 'bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent' : 'bg-stone-200 dark:bg-stone-800')
              }`}></div>

              <ul className="space-y-5 mb-10 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-stone-600 dark:text-stone-300 font-medium">
                    {/* Solid Checkmarks */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm
                        ${plan.theme === 'gold' ? 'bg-amber-500 text-white' : 
                        (plan.theme === 'indigo' ? 'bg-indigo-500 text-white' : 
                        'bg-stone-300 text-white dark:bg-stone-700 dark:text-stone-300')}`}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all shadow-sm active:scale-95 mt-auto text-sm uppercase tracking-wide ${
                plan.theme === 'gold'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-lg hover:shadow-amber-500/30' 
                  : (plan.theme === 'indigo'
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:shadow-lg hover:shadow-indigo-500/30'
                    : 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200')
              }`}>
                {plan.cta}
              </button>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};