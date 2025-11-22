import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Moon, Sun } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference or local storage
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (id === 'top') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
       return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust based on navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 dark:bg-dark-card/80 backdrop-blur-md shadow-sm border-b border-stone-200 dark:border-stone-800 py-4' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group cursor-pointer" onClick={(e) => scrollToSection(e, 'top')}>
          <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-brand-500/30">
            <span className="text-white font-bold text-lg font-display">S</span>
          </div>
          <span className="text-xl font-bold text-stone-800 dark:text-white tracking-tight font-display">Snack Pack</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Menu</a>
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Features</a>
          <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Pricing</a>
          <a href="#ai-genius" onClick={(e) => scrollToSection(e, 'ai-genius')} className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Snack Genius</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all relative overflow-hidden group"
            aria-label="Toggle theme"
          >
             <div className={`absolute inset-0 transition-all duration-500 flex items-center justify-center ${isDark ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>
               <Sun className="w-5 h-5" />
            </div>
            <div className={`transition-all duration-500 flex items-center justify-center ${isDark ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>
               <Moon className="w-5 h-5" />
            </div>
          </button>

          <button className="text-stone-500 dark:text-stone-300 hover:text-stone-800 dark:hover:text-white transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button className="bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-stone-700 dark:hover:bg-stone-200 transition-all shadow-lg hover:shadow-stone-200 dark:hover:shadow-none active:scale-95">
            Get the App
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
           <button 
              onClick={toggleTheme}
              className="text-stone-700 dark:text-stone-200"
            >
              {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          <button 
            className="text-stone-700 dark:text-stone-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-dark-card border-b border-stone-100 dark:border-dark-border p-6 flex flex-col gap-4 shadow-xl md:hidden animate-slide-up">
           <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-lg font-medium text-stone-700 dark:text-stone-200">Menu</a>
           <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-lg font-medium text-stone-700 dark:text-stone-200">Features</a>
           <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-lg font-medium text-stone-700 dark:text-stone-200">Pricing</a>
           <a href="#ai-genius" onClick={(e) => scrollToSection(e, 'ai-genius')} className="text-lg font-medium text-stone-700 dark:text-stone-200">Snack Genius</a>
           <button className="bg-brand-500 text-white py-3 rounded-xl font-semibold w-full mt-2">
             Get Started
           </button>
        </div>
      )}
    </header>
  );
};