import React from 'react';
import { X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="archival-modal-overlay">
      <div className="archival-modal">
        <button onClick={onClose} className="modal-close">
          <X size={32} strokeWidth={1} />
        </button>

        <div className="modal-gallery">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="modal-content">
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.6em', color: 'var(--color-neutral-400)', marginBottom: '12px' }}>
              {product.category}
            </p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: '1' }}>
              {product.name}
            </h2>
          </div>

          <p style={{ fontSize: 'var(--step-s)', color: 'var(--color-neutral-400)', fontWeight: 300, lineHeight: '1.7' }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 0', borderTop: '1px solid var(--color-neutral-100)', borderBottom: '1px solid var(--color-neutral-100)' }}>
            <div>
              <p style={{ fontSize: '8px', fontWeight: 900, color: 'var(--color-neutral-400)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '4px' }}>Price</p>
              <p className="font-serif" style={{ fontSize: '1.5rem', fontStyle: 'italic' }}>${product.price}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '8px', fontWeight: 900, color: 'var(--color-neutral-400)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '4px' }}>Reference</p>
              <p style={{ fontSize: '11px', fontWeight: 700 }}>{product.material.split(' ')[0]}</p>
            </div>
          </div>

          <button 
            className="btn-primary" 
            onClick={() => { onAddToCart(product); onClose(); }}
            style={{ width: '100%', padding: '24px' }}
          >
            Add to Bag
            <ArrowRight size={16} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '8px', fontWeight: 900, color: 'var(--color-neutral-400)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            <ShieldCheck size={14} />
            Archival Heritage Guarantee
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;