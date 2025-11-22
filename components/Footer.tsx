import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-dark-card border-t border-stone-100 dark:border-dark-border pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-brand-500 rounded-lg flex items-center justify-center rotate-3">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="text-lg font-bold text-stone-800 dark:text-white">Snack Pack</span>
            </div>
            <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
              Redefining the modern break with curated, intelligent snacking delivered in minutes.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-stone-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400">
              <li><a href="#" className="hover:text-brand-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 dark:text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400">
              <li><a href="#" className="hover:text-brand-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 dark:text-white mb-4">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-stone-50 dark:bg-stone-800 rounded-full flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-brand-50 dark:hover:bg-brand-900 hover:text-brand-500 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-stone-50 dark:bg-stone-800 rounded-full flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-brand-50 dark:hover:bg-brand-900 hover:text-brand-500 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-stone-50 dark:bg-stone-800 rounded-full flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-brand-50 dark:hover:bg-brand-900 hover:text-brand-500 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-stone-100 dark:border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 dark:text-stone-500">
          <p>&copy; 2024 Snack Pack Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-stone-600 dark:hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-600 dark:hover:text-stone-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};