
import React from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="archival-card reveal">
      <div className="card-image-wrap">
        <img src={product.image} alt={product.name} className="card-image" />
        <button 
          className="quick-view-btn" 
          onClick={handleQuickView}
          aria-label={`Quick view ${product.name}`}
        >
          <Eye size={14} strokeWidth={1.5} />
          <span>Quick View</span>
        </button>
      </div>
      
      <div className="card-info">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-price">${product.price.toFixed(0)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
