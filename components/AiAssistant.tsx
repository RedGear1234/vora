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
    { role: 'model', text: "Welcome to Vora. I am your personal archivist. How may I assist you today?" }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSend = async () => {
    if (!query.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const response = await geminiService.getShoppingAdvice(query, products);
      setMessages(prev => [...prev, { role: 'model', text: response || "Interrupted." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Service unavailable." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="ai-trigger" onClick={() => setIsOpen(true)}>
        <Sparkles size={20} />
      </button>

      {isOpen && (
        <div className="concierge-drawer">
          <div style={{ padding: '40px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="font-serif" style={{ fontSize: '32px' }}>Concierge</h3>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>

          <div style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                <p style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: '8px', color: 'var(--color-muted)' }}>
                  {msg.role === 'user' ? 'Collector' : 'Archivist'}
                </p>
                <p style={{ fontSize: '15px', fontWeight: 300, fontStyle: msg.role === 'user' ? 'italic' : 'normal' }}>
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          <div style={{ padding: '40px', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid black', paddingBottom: '12px' }}>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Request an archival search..."
                style={{ flex: 1, border: 'none', outline: 'none', background: 'none', fontSize: '14px' }}
              />
              <button onClick={handleSend} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;