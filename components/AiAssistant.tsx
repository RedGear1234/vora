
import React from 'react';
import { X, Send, Sparkles, Loader2, Sparkle } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Product, ChatMessage } from '../types';

interface AiAssistantProps {
  products: Product[];
}

const AiAssistant: React.FC<AiAssistantProps> = ({ products }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to Vora. I am your concierge. How may I assist in your selection today?" }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const response = await geminiService.getShoppingAdvice(query, products);
      setMessages(prev => [...prev, { role: 'model', text: response || "I apologize, I could not curate a proper response. Please rephrase your inquiry." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "A momentary interruption in our connection. Please wait." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-12 right-12 z-[150] h-16 w-16 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl group"
      >
        <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[300] flex justify-end animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-black/20" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-[500px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-700">
            {/* Header */}
            <div className="p-12 border-b border-gray-100 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-3xl font-serif font-black">Concierge</h3>
                <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-gray-400">Personalized Assistance</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:rotate-90 transition-transform">
                <X className="h-6 w-6 stroke-[1]" />
              </button>
            </div>

            {/* Chat */}
            <div className="flex-1 overflow-y-auto p-12 space-y-10">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-2`}>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-gray-300">
                    {msg.role === 'user' ? 'Inquiry' : 'Response'}
                  </p>
                  <div className={`max-w-[90%] text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'text-right italic text-black font-medium' 
                      : 'text-left text-gray-500'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-200" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-12 bg-gray-50">
              <div className="relative flex items-center gap-4">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Request assistance..."
                  className="flex-1 bg-transparent border-b border-black py-4 text-sm font-medium outline-none placeholder:text-gray-300"
                />
                <button 
                  onClick={handleSend}
                  disabled={!query.trim() || isLoading}
                  className="p-4 hover:opacity-50 transition-opacity disabled:opacity-10"
                >
                  <Send className="h-5 w-5 stroke-[1.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
