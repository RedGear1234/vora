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
    <div className="fixed inset-0 z-[200] flex items-center justify-center animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full h-full md:w-[90vw] md:h-[80vh] lg:max-w-[1200px] bg-white overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in slide-in-from-bottom-12 duration-700">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-20 p-2 hover:rotate-90 transition-transform duration-500"
        >
          <X className="h-8 w-8 stroke-[1]" />
        </button>

        {/* Gallery / Image */}
        <div className="w-full md:w-[60%] h-[40vh] md:h-auto bg-gray-50 overflow-hidden relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale scale-100 hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute bottom-6 left-6 flex gap-4">
             <div className="bg-white/90 backdrop-blur px-4 py-2 text-[9px] font-black uppercase tracking-[0.4em]">Reference Capture 01</div>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-[40%] p-8 lg:p-12 flex flex-col justify-center gap-8 border-l border-gray-100 overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-gray-400">{product.category}</p>
              <h2 className="text-4xl lg:text-5xl font-serif font-black tracking-tight leading-tight">{product.name}</h2>
            </div>
            <div className="flex items-center gap-4">
               <p className="text-3xl font-serif italic text-gray-900">${product.price}</p>
               <div className="h-[1px] flex-1 bg-gray-100"></div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-500 leading-relaxed font-light">
              {product.description}
            </p>
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
               <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300 mb-1">Heritage</p>
                  <p className="text-[11px] font-bold">Parisian Concept</p>
               </div>
               <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300 mb-1">Availability</p>
                  <p className="text-[11px] font-bold text-green-600">In Archive</p>
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => { onAddToCart(product); onClose(); }}
              className="group flex items-center justify-between bg-black text-white px-8 py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all shadow-lg"
            >
              Add to Bag
              <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
            <div className="flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
               <ShieldCheck className="h-4 w-4" />
               Secured Allocation & Global Transit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;