
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ComboComparison from './components/ComboComparison';
import PricingSection from './components/PricingSection';
import PromotionalCombos from './components/PromotionalCombos'; // Added import
import AboutUs from './components/AboutUs';
import WhatsAppCTA from './components/WhatsAppCTA'; // Changed from ContactForm
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ComboComparison />
        <PricingSection />
        <PromotionalCombos /> {/* Added new section */}
        <AboutUs />
        <WhatsAppCTA /> {/* Changed from ContactForm */}
      </main>
      <Footer />
    </div>
  );
};

export default App;