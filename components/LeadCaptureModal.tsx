import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { supabase } from '../lib/supabaseClient';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (formData: LeadFormData) => void;
  initialCursoValue?: string;
  defaultPlano?: string;
  origem: string;
}

export interface LeadFormData {
  nome: string;
  email: string;
  whatsapp: string; // Will store the raw digits, e.g., 11987654321
  curso: string;
  plano?: string;
  observacao: string;
  origem: string;
}

// SVG Icons for inputs
const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EmailIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const WhatsAppIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.173.2-.297.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.47.074-.742.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.206 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z"/>
  </svg>
);

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  initialCursoValue,
  defaultPlano,
  origem,
}) => {
  const [formData, setFormData] = useState<{
    nome: string;
    email: string;
    whatsappUserInput: string; // Stores formatted number for display
    curso: string;
    plano: string;
    observacao: string;
  }>({
    nome: '',
    email: '',
    whatsappUserInput: '',
    curso: '',
    plano: '',
    observacao: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const modalRootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById('modal-root');
    if (!element) {
        element = document.createElement('div');
        element.id = 'modal-root';
        document.body.appendChild(element);
    }
    modalRootRef.current = element;

    if (isOpen) {
        let initialCursoSelection = '';
        if (initialCursoValue) {
            const lowerInitialCurso = initialCursoValue.toLowerCase();
            if (lowerInitialCurso.includes('inglês')) {
                initialCursoSelection = 'Inglês';
            } else if (lowerInitialCurso.includes('francês')) {
                initialCursoSelection = 'Francês';
            }
        }
        setFormData({
            nome: '',
            email: '',
            whatsappUserInput: '',
            curso: initialCursoSelection,
            plano: defaultPlano || '',
            observacao: '',
        });
        setError(null);
        setSuccessMessage(null);
    }
  }, [initialCursoValue, defaultPlano, isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', handleEsc);
      firstInputRef.current?.focus();
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  const handleWhatsAppInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '').substring(0, 11);
    let formattedValue = '';

    if (rawValue.length === 0) {
        // formattedValue remains ''
    } else if (rawValue.length <= 2) { 
        formattedValue = `(${rawValue}`;
    } else if (rawValue.length <= 6) { 
        formattedValue = `(${rawValue.substring(0, 2)}) ${rawValue.substring(2)}`;
    } else if (rawValue.length <= 10) { 
        formattedValue = `(${rawValue.substring(0, 2)}) ${rawValue.substring(2, 6)}-${rawValue.substring(6)}`;
    } else { 
        formattedValue = `(${rawValue.substring(0, 2)}) ${rawValue.substring(2, 7)}-${rawValue.substring(7, 11)}`;
    }
    setFormData(prev => ({ ...prev, whatsappUserInput: formattedValue }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "whatsappUserInput") {
        handleWhatsAppInputChange(e as React.ChangeEvent<HTMLInputElement>);
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.nome.trim()) {
      setError('Nome completo é obrigatório.');
      firstInputRef.current?.focus();
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email é obrigatório.');
      document.getElementById('email')?.focus();
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Por favor, insira um email válido (ex: seu.email@dominio.com).');
      document.getElementById('email')?.focus();
      return false;
    }

    const cleanedWhatsApp = formData.whatsappUserInput.replace(/\D/g, '');
    if (!cleanedWhatsApp) {
        setError('WhatsApp é obrigatório.');
        document.getElementById('whatsappUserInput')?.focus();
        return false;
    }
    if (!/^\d{10,11}$/.test(cleanedWhatsApp)) { 
        setError('WhatsApp inválido. Insira DDD + número completo (ex: (11) 98765-4321).');
        document.getElementById('whatsappUserInput')?.focus();
        return false;
    }

    if (!formData.curso) {
      setError('Por favor, selecione o idioma de interesse.');
      document.getElementById('curso')?.focus();
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!supabase) {
      setError("Falha na conexão com o serviço de dados. Verifique se as variáveis de ambiente SUPABASE_URL e SUPABASE_ANON_KEY estão configuradas corretamente. Tente novamente mais tarde.");
      console.error("Supabase client is not initialized. Ensure SUPABASE_URL and SUPABASE_ANON_KEY environment variables are set.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const cleanedWhatsApp = formData.whatsappUserInput.replace(/\D/g, '');

    const submissionData: LeadFormData = {
        nome: formData.nome,
        email: formData.email,
        whatsapp: cleanedWhatsApp, // Use raw digits
        curso: formData.curso,
        plano: formData.plano || undefined,
        observacao: formData.observacao,
        origem: origem,
    };

    try {
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([
          {
            nome: submissionData.nome,
            email: submissionData.email,
            whatsapp: submissionData.whatsapp,
            curso: submissionData.curso,
            plano: submissionData.plano || null,
            origem: submissionData.origem,
            observacao: submissionData.observacao,
          },
        ]);

      if (supabaseError) {
        throw supabaseError;
      }

      setSuccessMessage('Informações enviadas! Você será redirecionado para o WhatsApp em instantes...');
      setTimeout(() => {
        onSubmitSuccess(submissionData);
      }, 2000);

    } catch (err: any) {
      console.error('Supabase submission error:', err);
      setError(
        `Ocorreu um erro ao enviar seus dados: ${err.message || 'Verifique sua conexão e as configurações do Supabase (tabela, RLS)'}. Tente novamente.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white p-5 md:p-6 rounded-xl shadow-2xl w-full max-w-md relative border-2 border-gray-300" // Adjusted max-w-xl to max-w-md, p-6 md:p-8 to p-5 md:p-6
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-gray-400" // Adjusted top-3 right-3 to top-2.5 right-2.5, p-1.5 to p-1
          aria-label="Fechar modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> {/* Adjusted w-7 h-7 to w-6 h-6 */}
        </button>

        <h2 id="lead-modal-title" className="text-2xl md:text-3xl font-bold text-combo-red mb-2 text-center"> {/* Adjusted text-3xl md:text-4xl to text-2xl md:text-3xl, mb-3 to mb-2 */}
          Só mais um passo!
        </h2>
        <p className="text-gray-700 mb-6 text-sm md:text-base text-center"> {/* Adjusted text-base md:text-lg to text-sm md:text-base, mb-8 to mb-6 */}
          Preencha abaixo para falarmos diretamente pelo WhatsApp.
        </p>

        {error && (
          <div className="mb-4 p-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm shadow-sm"> {/* Adjusted mb-5 to mb-4, p-3 to p-2.5 */}
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-2.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm shadow-sm"> {/* Adjusted mb-5 to mb-4, p-3 to p-2.5 */}
            {successMessage}
          </div>
        )}

        {!successMessage && (
          <form onSubmit={handleSubmit} className="space-y-4"> {/* Adjusted space-y-5 to space-y-4 */}
            <div>
              <label htmlFor="nome" className="block text-sm font-semibold text-gray-800 mb-1"> {/* Adjusted mb-1.5 to mb-1 */}
                Nome Completo <span className="text-combo-red">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> {/* Adjusted pl-3.5 to pl-3 */}
                  <UserIcon />
                </div>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  ref={firstInputRef}
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-combo-red focus:border-combo-red text-base text-gray-900 transition-colors bg-white focus:bg-white placeholder-gray-500" // Adjusted pl-12 to pl-10, py-3 to py-2.5
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-1"> {/* Adjusted mb-1.5 to mb-1 */}
                Email <span className="text-combo-red">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> {/* Adjusted pl-3.5 to pl-3 */}
                  <EmailIcon />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-combo-red focus:border-combo-red text-base text-gray-900 transition-colors bg-white focus:bg-white placeholder-gray-500" // Adjusted pl-12 to pl-10, py-3 to py-2.5
                  placeholder="seu.email@exemplo.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="whatsappUserInput" className="block text-sm font-semibold text-gray-800 mb-1"> {/* Adjusted mb-1.5 to mb-1 */}
                WhatsApp <span className="text-combo-red">*</span>
              </label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> {/* Adjusted pl-3.5 to pl-3 */}
                  <WhatsAppIcon />
                </div>
                <input
                  type="tel"
                  name="whatsappUserInput"
                  id="whatsappUserInput"
                  value={formData.whatsappUserInput}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-combo-red focus:border-combo-red text-base text-gray-900 transition-colors bg-white focus:bg-white placeholder-gray-500" // Adjusted pl-12 to pl-10, py-3 to py-2.5
                  placeholder="(XX) XXXXX-XXXX"
                  maxLength={15}
                  required
                />
              </div>
            </div>
             <div>
              <label htmlFor="curso" className="block text-sm font-semibold text-gray-800 mb-1"> {/* Adjusted mb-1.5 to mb-1 */}
                Idioma de Interesse <span className="text-combo-red">*</span>
              </label>
              <select
                name="curso"
                id="curso"
                value={formData.curso}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-combo-red focus:border-combo-red text-base text-gray-900 transition-colors bg-white focus:bg-white" // Adjusted py-3 to py-2.5
                required
              >
                <option value="" disabled>Selecione o idioma...</option>
                <option value="Inglês">Inglês</option>
                <option value="Francês">Francês</option>
              </select>
            </div>
            <div>
              <label htmlFor="observacao" className="block text-sm font-semibold text-gray-800 mb-1"> {/* Adjusted mb-1.5 to mb-1 */}
                Observação <span className="text-gray-500 text-xs">(Opcional)</span>
              </label>
              <textarea
                name="observacao"
                id="observacao"
                value={formData.observacao}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-combo-red focus:border-combo-red text-base text-gray-900 transition-colors bg-white focus:bg-white placeholder-gray-500" // Adjusted py-3 to py-2.5
                placeholder="Alguma informação adicional..."
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-combo-red text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400 disabled:opacity-70 disabled:cursor-not-allowed text-base" // Adjusted py-3.5 to py-3, text-lg to text-base
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </div>
              ) : (
                'Falar no WhatsApp Agora'
              )}
            </button>
          </form>
        )}
         <p className="text-xs text-gray-600 mt-5 text-center"> {/* Adjusted mt-6 to mt-5 */}
            Seus dados estão protegidos. Usaremos apenas para o contato sobre nossos cursos.
          </p>
      </div>
    </div>
  );

  if (!isOpen || !modalRootRef.current) return null;

  return ReactDOM.createPortal(modalContent, modalRootRef.current);
};

export default LeadCaptureModal;