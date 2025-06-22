import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., API call)
    console.log({ name, email, message });
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 3000); // Reset message after 3 seconds
  };

  return (
    <section id="contato" className="py-20 bg-combo-yellow">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-combo-red mb-10">
          Fale Conosco!
        </h2>
        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 border border-green-300 rounded-md text-center">
            Mensagem enviada com sucesso! (Simulação)
          </div>
        )}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Seu Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-combo-red focus:border-transparent outline-none transition-shadow"
              placeholder="João Silva"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Seu Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-combo-red focus:border-transparent outline-none transition-shadow"
              placeholder="joao.silva@email.com"
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Sua Mensagem</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-combo-red focus:border-transparent outline-none transition-shadow"
              placeholder="Olá! Gostaria de saber mais sobre as aulas..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-combo-red text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
          >
            Enviar Mensagem
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;