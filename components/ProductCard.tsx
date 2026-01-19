import React from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="archival-card reveal">
      <Link to={`/product/${product.id}`} className="card-image-wrap">
        <img src={product.image} alt={product.name} className="card-image" />
        <div className="card-badges" style={{ position: 'absolute', top: '20px', left: '20px' }}>
          {product.isAiGenerated && (
            <span style={{
              background: 'rgba(255,255,255,0.9)',
              padding: '6px 12px',
              fontSize: '8px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.2em'
            }}>Archival Rare</span>
          )}
        </div>
      </Link>
      
      <div className="card-info">
        <div className="card-label">
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
            <h3 className="card-title">{product.name}</h3>
          </Link>
          <span className="card-price" style={{ fontSize: '20px', fontWeight: 500 }}>${product.price}</span>
        </div>
        
        <div style={{ 
          marginTop: '16px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingTop: '16px',
          borderTop: '1px solid var(--color-border)'
        }}>
          <span style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-muted)', letterSpacing: '0.2em' }}>
            {product.category}
          </span>
          <span style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-muted)' }}>
            Ref. {product.material.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;