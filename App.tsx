
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ComboComparison from './components/ComboComparison';
import PricingSection from './components/PricingSection';
import PromotionalCombos from './components/PromotionalCombos';
import AboutUs from './components/AboutUs';
import TeacherSection from './components/TeacherSection'; // Added import
// import WhatsAppCTA from './components/WhatsAppCTA'; // Removed import
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ComboComparison />
        <PricingSection />
        <PromotionalCombos />
        <AboutUs />
        <TeacherSection /> {/* Added new section */}
        {/* <WhatsAppCTA /> */} {/* Removed component */}
      </main>
      <Footer />
    </div>
  );
};

export default App;