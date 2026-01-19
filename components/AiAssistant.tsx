
import React from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Product, ChatMessage } from '../types';

interface AiAssistantProps {
  products: Product[];
}

const AiAssistant: React.FC<AiAssistantProps> = ({ products }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to Vora. I am your personal archivist. How may I assist in your selection today?" }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const response = await geminiService.getShoppingAdvice(query, products);
      setMessages(prev => [...prev, { role: 'model', text: response || "Data interruption." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Archival service unavailable." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="ai-trigger" onClick={() => setIsOpen(true)}>
        <Sparkles size={14} strokeWidth={2} />
        <span>Concierge</span>
      </button>

      {isOpen && (
        <>
          <div style={{ 
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.05)', zIndex: 2999, backdropFilter: 'blur(10px)' 
          }} onClick={() => setIsOpen(false)} />
          <div className="concierge-drawer" style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
            <div style={{ padding: 'clamp(20px, 5vw, 40px)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 400 }}>Vora Concierge</h3>
                <p style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--color-neutral-500)', marginTop: '8px' }}>ARCHIVAL ASSISTANCE</p>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <div ref={scrollRef} style={{ flex: 1, padding: 'clamp(20px, 5vw, 40px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '90%' }}>
                  <p style={{ fontSize: '13px', fontWeight: msg.role === 'user' ? 600 : 300, color: 'var(--color-black)', lineHeight: '1.8' }}>
                    {msg.text}
                  </p>
                </div>
              ))}
              {isLoading && (
                <div style={{ fontSize: '9px', fontWeight: 800, color: 'var(--color-neutral-500)', letterSpacing: '0.2em' }}>CONSULTING ARCHIVE...</div>
              )}
            </div>

            <div style={{ padding: 'clamp(20px, 5vw, 40px)', borderTop: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid black', paddingBottom: '12px' }}>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about the collection..."
                  style={{ flex: 1, border: 'none', outline: 'none', background: 'none', fontSize: '12px' }}
                />
                <button onClick={handleSend} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: query.trim() ? 1 : 0.2 }}>
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AiAssistant;
