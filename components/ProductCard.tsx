import React from 'react';
import { Eye, Plus } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickView }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="group relative flex flex-col gap-8">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50 border border-neutral-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-200">
              <span className="text-6xl font-serif font-black lowercase select-none">v.</span>
            </div>
          ) : (
            <img 
              src={product.image} 
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
          )}
        </Link>
        
        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8 pointer-events-none group-hover:pointer-events-auto">
          <div className="space-y-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-black hover:text-white transition-all flex items-center justify-between px-8"
            >
              Examine
              <Eye className="h-4 w-4" />
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-neutral-800 transition-all flex items-center justify-between px-8"
            >
              Add to Bag
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-8 left-8 flex flex-col gap-2 pointer-events-none">
          {product.isAiGenerated && (
            <span className="bg-white/95 backdrop-blur-sm px-4 py-2 text-[9px] font-black uppercase tracking-[0.3em] border border-neutral-100 shadow-sm">
              Limited Archive
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 px-1">
        <div className="flex justify-between items-start gap-6">
          <Link to={`/product/${product.id}`} className="flex-1 hover:opacity-70 transition-opacity">
            <h3 className="text-lg font-serif font-black tracking-tight text-neutral-900 leading-tight group-hover:italic transition-all">
              {product.name}
            </h3>
          </Link>
          <span className="text-base font-serif font-bold text-neutral-900">${product.price.toFixed(0)}</span>
        </div>
        <div className="flex items-center justify-between">
           <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold">
            {product.category}
          </p>
          <div className="w-0 group-hover:w-8 h-[1px] bg-black transition-all duration-700"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;