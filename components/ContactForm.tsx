import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    // Basic validation (can be expanded)
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    // In a real app, you would handle form submission here (e.g., API call)
    console.log({ name, email, message }); 
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => {
        setSubmitted(false);
        setError('');
    }, 4000); // Reset message after 4 seconds
  };

  return (
    <section id="contato" className="py-20 md:py-24 bg-combo-yellow">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-combo-red mb-12">
          Vamos Conversar!
        </h2>
        
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl">
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 border border-green-300 rounded-md text-center text-base">
              Mensagem enviada com sucesso! Entraremos em contato em breve. (Simulação)
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md text-center text-base">
              {error}
            </div>
          )}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 text-lg">Seu Nome Completo</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-combo-red focus:border-transparent outline-none transition-shadow text-base"
              placeholder="Ex: Maria Silva"
              required
              aria-required="true"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-lg">Seu Melhor Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-combo-red focus:border-transparent outline-none transition-shadow text-base"
              placeholder="Ex: maria.silva@email.com"
              required
              aria-required="true"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2 text-lg">Sua Mensagem</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-combo-red focus:border-transparent outline-none transition-shadow text-base"
              placeholder="Olá! Gostaria de saber mais detalhes sobre as aulas de..."
              required
              aria-required="true"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-combo-red text-white text-lg font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
            aria-label="Enviar sua mensagem para a Línguacombo"
          >
            Enviar Sua Mensagem Agora
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;