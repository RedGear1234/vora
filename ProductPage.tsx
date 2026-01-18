
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from './types';
import { db } from './services/db';
import { geminiService } from './services/geminiService';
import ProductCard from './components/ProductCard';
import { ArrowRight, ShieldCheck, Compass, Wind, Diamond, Star, ChevronLeft, Loader2 } from 'lucide-react';
import { ProductSkeleton } from './components/Skeletons';

interface ProductPageProps {
  onAddToCart: (p: Product) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setIsLoading(true);
      window.scrollTo(0, 0);
      
      const foundProduct = await db.getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        try {
          const allProducts = await db.getProducts();
          const suggested = await geminiService.suggestSimilarProducts(foundProduct.id, allProducts);
          setSimilarProducts(suggested.filter(p => p.id !== foundProduct.id));
        } catch (e) {
          const allProducts = await db.getProducts();
          setSimilarProducts(allProducts.filter(p => p.id !== foundProduct.id).slice(0, 3));
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-24 lg:pt-32 pb-40 max-w-7xl mx-auto px-6 lg:px-12 animate-pulse">
        <div className="h-4 bg-neutral-100 w-32 mb-16" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-7">
            <div className="aspect-[4/5] bg-neutral-100" />
          </div>
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="h-3 bg-neutral-50 w-24" />
              <div className="h-16 bg-neutral-100 w-full" />
              <div className="h-12 bg-neutral-100 w-1/3 mt-8" />
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-neutral-100 w-full" />
              <div className="h-4 bg-neutral-100 w-full" />
              <div className="h-4 bg-neutral-100 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-64 pb-64 text-center">
        <h2 className="text-4xl font-serif italic text-gray-200 mb-8">Archive Reference Missing</h2>
        <Link to="/" className="text-[11px] font-black uppercase tracking-[0.5em] border-b border-black pb-2">Return to Core Archive</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-32 pb-40 animate-in fade-in duration-1000">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Link to="/" className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.5em] text-gray-300 hover:text-black transition-all mb-16">
          <ChevronLeft className="h-4 w-4" />
          Back to Archive
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-7">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden shadow-2xl reveal active">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover grayscale scale-100 hover:grayscale-0 hover:scale-105 transition-all duration-[2s]" 
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-[11px] font-black uppercase tracking-[0.8em] text-gray-300">Ref. 2025-{product.id.padStart(3, '0')}</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-[-0.04em] leading-tight">{product.name}</h1>
              </div>
              
              <div className="flex items-center gap-6 py-4 border-b border-gray-100">
                <p className="text-4xl font-serif italic text-black">${product.price.toFixed(0)}</p>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                  <Star className="h-3 w-3 fill-gray-300" />
                  <span>{product.rating} / 5.0</span>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <p className="text-xl text-gray-500 font-light leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-6 pt-8">
                <button 
                  onClick={() => onAddToCart(product)}
                  className="w-full group bg-black text-white px-10 py-6 flex items-center justify-between text-[11px] font-black uppercase tracking-[0.6em] hover:bg-neutral-800 transition-all shadow-xl"
                >
                  Allocate to Bag
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-4 transition-transform duration-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-gray-100 pt-10">
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-black">
                       <ShieldCheck className="h-4 w-4 stroke-[1.5]" />
                       Archival Guarantee
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">Sourced from certified workshops ensuring permanent longevity.</p>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-black">
                       <Compass className="h-4 w-4 stroke-[1.5]" />
                       Global Origin
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">Conceived in Paris. Formulated with artisan precision.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-40 lg:mt-64 reveal active">
             <div className="flex justify-between items-baseline mb-16 border-b border-gray-100 pb-8">
                <h2 className="text-4xl font-serif font-black tracking-tight">Similar Archive Entry.</h2>
                <Link to="/" className="text-[10px] font-black uppercase tracking-widest hover:opacity-50">View All</Link>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {similarProducts.slice(0, 3).map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onQuickView={() => {}} />
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
