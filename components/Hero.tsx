import React from 'react';
import { ArrowRight, Star, PlayCircle, Bell, Heart, MapPin } from 'lucide-react';

const TESTIMONIALS = [
  { id: 1, name: 'Alex R.', role: 'Designer', img: 'https://picsum.photos/seed/avatar1/100/100' },
  { id: 2, name: 'Sarah M.', role: 'Product Manager', img: 'https://picsum.photos/seed/avatar2/100/100' },
  { id: 3, name: 'James K.', role: 'Developer', img: 'https://picsum.photos/seed/avatar3/100/100' },
  { id: 4, name: 'Emily T.', role: 'Food Blogger', img: 'https://picsum.photos/seed/avatar4/100/100' },
];

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-stone-50 dark:bg-dark-bg transition-colors duration-300">
      
      {/* Faded Grid Background */}
      <div className="absolute inset-0 bg-grid z-0 opacity-60 dark:opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"></div>

      {/* Background Decorations */}
      {/* Top Right - Orange (No blinking) */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-200 dark:bg-brand-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 pointer-events-none"></div>
      
      {/* Bottom Left - Olive */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-olive-200 dark:bg-olive-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 pointer-events-none"></div>

      {/* Extra Colors - Randomly placed */}
      <div className="absolute top-[40%] left-[-5%] w-[300px] h-[300px] bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-float pointer-events-none" style={{animationDelay: '2s'}}></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-card border border-stone-200 dark:border-dark-border rounded-full shadow-sm">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 uppercase tracking-wide">Waitlist Open</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-stone-900 dark:text-white leading-[1.1] tracking-tight font-display">
            Snacking, <br />
            <span className="relative inline-block">
              {/* Electric Glow Behind */}
              <span className="absolute -inset-1 bg-brand-500/20 blur-xl rounded-lg opacity-50 animate-pulse"></span>
              
              {/* Electric Text */}
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-yellow-300 to-brand-600 bg-[length:200%_auto] animate-electric filter drop-shadow-sm">
                Reimagined.
              </span>
            </span>
          </h1>
          
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Curated, chef-crafted snack boxes delivered to your door in under 30 minutes. Powered by AI to match your mood and cravings perfectly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            {/* Cool Button with Moving Orb Effect */}
            <button className="relative group px-8 py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full font-semibold text-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="absolute inset-0 bg-stone-900 dark:bg-white z-0"></div>
              {/* Orb Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-brand-500/50 blur-[40px] rounded-full animate-blob group-hover:w-32 group-hover:h-32 transition-all duration-500"></div>
              
              <div className="relative z-10 flex items-center gap-2">
                Order Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button className="px-8 py-4 bg-white dark:bg-transparent text-stone-700 dark:text-white border border-stone-200 dark:border-stone-700 rounded-full font-semibold text-lg hover:bg-stone-50 dark:hover:bg-white/5 transition-all flex items-center gap-2">
              <PlayCircle className="w-5 h-5" /> How it works
            </button>
          </div>

          {/* Animated Testimonials with Pop-out Tooltip */}
          <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
            <div className="flex -space-x-3">
              {TESTIMONIALS.map((user) => (
                <div key={user.id} className="relative group/avatar transition-all duration-300 hover:-translate-y-2 hover:z-20">
                  <img 
                    src={user.img} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-full border-2 border-white dark:border-dark-bg object-cover shadow-md group-hover/avatar:shadow-xl cursor-pointer"
                  />
                  
                  {/* Pop-out Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs rounded-lg py-2 px-3 opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 pointer-events-none transform scale-90 group-hover/avatar:scale-100 origin-bottom shadow-xl text-center">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-stone-400 dark:text-stone-500 text-[10px]">{user.role}</p>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900 dark:border-t-white"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Loved by <span className="text-stone-900 dark:text-white font-bold">10,000+</span> foodies</p>
            </div>
          </div>
        </div>

        {/* Right Visual - Enhanced Mobile Mockup */}
        <div className="relative lg:h-[600px] flex items-center justify-center perspective-1000">
          
          <div className="relative w-[320px] h-[640px] bg-stone-900 rounded-[3rem] shadow-2xl border-8 border-stone-900 overflow-hidden transform rotate-[-6deg] hover:rotate-0 transition-all duration-700 ease-out z-20 group">
             {/* Phone Reflection */}
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 to-transparent pointer-events-none z-30 opacity-50 rounded-[2.5rem]"></div>

             {/* Mockup Screen */}
             <div className="w-full h-full bg-stone-50 dark:bg-neutral-900 overflow-hidden flex flex-col relative">
                
                {/* Dynamic Notification */}
                <div className="absolute top-24 left-4 right-4 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md p-3 rounded-xl shadow-lg z-40 transform translate-y-[-150%] animate-[slideUp_1s_ease-out_2s_forwards] border border-stone-100 dark:border-neutral-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-800 dark:text-white">Order Arriving!</p>
                      <p className="text-[10px] text-stone-500">Driver is 2 mins away</p>
                    </div>
                  </div>
                </div>

                {/* Mockup Header */}
                <div className="h-24 bg-gradient-to-b from-brand-50 to-transparent dark:from-brand-900/20 p-6 flex items-end justify-between z-10">
                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">Location</p>
                    <div className="flex items-center gap-1 text-brand-600 dark:text-brand-400 text-sm font-bold">
                      <MapPin className="w-3 h-3" /> Downtown, NY
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-stone-200 overflow-hidden border-2 border-white dark:border-neutral-700">
                     <img src="https://picsum.photos/seed/user/100/100" alt="Profile" />
                  </div>
                </div>
                
                {/* Mockup Body - Scroll Content */}
                <div className="p-4 space-y-4 overflow-hidden flex-1">
                   {/* Search Bar placeholder */}
                   <div className="w-full h-10 bg-white dark:bg-neutral-800 rounded-full shadow-sm mb-4 flex items-center px-4 text-stone-400 text-xs">
                      Find your craving...
                   </div>

                   <div className="h-48 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm overflow-hidden relative group cursor-pointer transition-transform hover:scale-[1.02]">
                      <img src="https://picsum.photos/seed/bowl/400/300" className="w-full h-full object-cover" alt="Featured" />
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm flex items-center gap-1">
                        🔥 Trending
                      </div>
                      <div className="absolute top-3 right-3 w-8 h-8 bg-white/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:text-white transition-colors">
                        <Heart className="w-4 h-4" />
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-3">
                      <div className="h-32 rounded-2xl bg-olive-100 dark:bg-olive-900/40 flex items-center justify-center flex-col gap-2 text-olive-800 dark:text-olive-200 cursor-pointer hover:bg-olive-200 dark:hover:bg-olive-900/60 transition-colors relative overflow-hidden">
                        <div className="w-10 h-10 bg-white dark:bg-olive-800 rounded-full flex items-center justify-center shadow-sm text-xl z-10">🥗</div>
                        <span className="text-xs font-bold z-10">Healthy</span>
                         <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-olive-300/20 rounded-full"></div>
                      </div>
                      <div className="h-32 rounded-2xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-col gap-2 text-orange-800 dark:text-orange-200 cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-900/60 transition-colors relative overflow-hidden">
                         <div className="w-10 h-10 bg-white dark:bg-orange-800 rounded-full flex items-center justify-center shadow-sm text-xl z-10">🍪</div>
                         <span className="text-xs font-bold z-10">Sweet</span>
                         <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-300/20 rounded-full"></div>
                      </div>
                   </div>
                </div>
                
                {/* Mockup Floating Button */}
                <div className="mx-4 mb-6 z-10">
                  <div className="bg-stone-900 dark:bg-brand-600 text-white py-3 rounded-xl text-center font-medium shadow-lg flex justify-between px-6 items-center cursor-pointer hover:bg-stone-800 dark:hover:bg-brand-500 transition-colors">
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded">3 Items</span>
                    <span className="font-bold text-sm">Checkout $24.00</span>
                  </div>
                </div>
             </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-10 bg-white dark:bg-dark-card border border-stone-100 dark:border-dark-border p-4 rounded-2xl shadow-xl z-30 animate-float">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-800 dark:text-white">Top Rated</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Acai Bowls</p>
                </div>
             </div>
          </div>

          <div className="absolute bottom-40 left-0 bg-white dark:bg-dark-card border border-stone-100 dark:border-dark-border p-4 rounded-2xl shadow-xl z-30 animate-float" style={{animationDelay: '2s'}}>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">
                  🔥
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-800 dark:text-white">450 kcal</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Protein Pack</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};