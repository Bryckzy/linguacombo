
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ComboComparison from './components/ComboComparison'; // New import
import PricingSection from './components/PricingSection';
import AboutUs from './components/AboutUs';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ComboComparison /> {/* New component added here */}
        <PricingSection />
        <AboutUs />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;
