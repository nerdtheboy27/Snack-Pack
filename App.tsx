import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { Pricing } from './components/Pricing';
import { SnackGenius } from './components/SnackGenius';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-stone-50 dark:bg-dark-bg transition-colors duration-300 relative">
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <BentoGrid />
        <Pricing />
        <SnackGenius />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}