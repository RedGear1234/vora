
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import AiAssistant from './components/AiAssistant';
import QuickViewModal from './components/QuickViewModal';
import ProductPage from './ProductPage';
import { db } from './services/db';
import { Product, CartItem, Category, Feedback } from './types';
import { ArrowRight, Compass, Wind, Diamond, Quote, SlidersHorizontal, X } from 'lucide-react';
import { HeroSkeleton, ProductSkeleton } from './components/Skeletons';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const useReveal = (trigger?: any) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal:not(.active)');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [trigger]);
};

const HomeView: React.FC<{
  onAddToCart: (p: Product) => void,
  setQuickViewProduct: (p: Product | null) => void
}> = ({ onAddToCart, setQuickViewProduct }) => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [feedback, setFeedback] = React.useState<Feedback[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  // Refinement State
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedMaterial, setSelectedMaterial] = React.useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = React.useState<[number, number] | null>(null);

  useReveal(products.length > 0 && !loading);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [prodRes, feedRes] = await Promise.all([
        db.getProducts(),
        db.getFeedback()
      ]);
      setProducts(prodRes);
      setFeedback(feedRes);
      setLoading(false);
    };
    fetchData();
  }, []);

  const materials = React.useMemo(() => {
    const set = new Set(products.map(p => p.material));
    return Array.from(set);
  }, [products]);

  const filteredProducts = products.filter(p => {
    const matchesCategory = !categoryId || p.category.toLowerCase().replace(/\s+/g, '-') === categoryId;
    const matchesMaterial = !selectedMaterial || p.material === selectedMaterial;
    const matchesPrice = !selectedPriceRange || (p.price >= selectedPriceRange[0] && p.price <= selectedPriceRange[1]);
    return matchesCategory && matchesMaterial && matchesPrice;
  });

  if (loading) return (
    <div className="space-y-32 pb-32">
      <HeroSkeleton />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
        {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
      </div>
    </div>
  );

  return (
    <div className="space-y-32 md:space-y-48 lg:space-y-64 pb-32 overflow-hidden page-transition-enter">
      {/* Editorial Hero */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-12 pt-20">
        <div className="absolute inset-0 -z-10 bg-neutral-100 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&q=80&w=2400" 
            className="w-full h-full object-cover opacity-20 grayscale scale-110" 
            alt="Hero bg" 
          />
        </div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10 animate-in slide-in-from-left duration-1000">
            <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-neutral-400">Vol. 01 / Selected Archive</p>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif font-black tracking-[-0.04em] leading-[0.9] text-black">
              Pure <br /> <span className="italic font-light">Elegance.</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
              <button 
                onClick={() => document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] border-b border-black pb-3 transition-all hover:opacity-50"
              >
                Explore The Studio <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
          <div className="hidden lg:flex justify-end animate-in slide-in-from-right duration-1000">
            <div className="w-[450px] aspect-[4/5] bg-white p-3 shadow-2xl relative group">
              <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]" alt="Featured item" />
              <div className="absolute -bottom-8 -left-8 bg-black text-white p-6 hidden md:block group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700">
                <p className="text-[9px] font-bold uppercase tracking-[0.4em]">Core Piece 001</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Block */}
      <section className="reveal max-w-5xl mx-auto px-6 text-center space-y-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-neutral-300">Our Ethos</p>
        <h2 className="text-4xl md:text-6xl font-serif italic text-neutral-900 leading-tight">
          "We believe in the longevity of form and the quiet power of exceptional materiality."
        </h2>
        <div className="w-16 h-[1px] bg-black mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12">
          <div className="space-y-4">
            <Diamond className="h-6 w-6 mx-auto stroke-[1]" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em]">Permanence</h3>
            <p className="text-[11px] text-neutral-400 font-medium">Objects designed to transcend trends.</p>
          </div>
          <div className="space-y-4">
            <Wind className="h-6 w-6 mx-auto stroke-[1]" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em]">Fluidity</h3>
            <p className="text-[11px] text-neutral-400 font-medium">Adapting to the modern landscape.</p>
          </div>
          <div className="space-y-4">
            <Compass className="h-6 w-6 mx-auto stroke-[1]" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em]">Precision</h3>
            <p className="text-[11px] text-neutral-400 font-medium">Every texture is intentional.</p>
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="reveal max-w-7xl mx-auto px-6 lg:px-12" id="archive">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 border-b border-neutral-100 pb-12 gap-12">
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-400">Featured Curations</p>
            <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter leading-none">The Archive.</h2>
          </div>
          
          <div className="flex flex-col items-end gap-6">
            <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Link to="/" className={`hover:text-black transition-all ${!categoryId ? 'text-black border-b border-black pb-2' : 'text-neutral-300'}`}>All Works</Link>
              {Object.values(Category).map(cat => {
                const urlCat = cat.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link key={cat} to={`/archive/${urlCat}`} className={`hover:text-black transition-all ${categoryId === urlCat ? 'text-black border-b border-black pb-2' : 'text-neutral-300'}`}>
                    {cat}
                  </Link>
                );
              })}
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest border border-neutral-200 px-6 py-3 hover:bg-black hover:text-white transition-all"
            >
              <SlidersHorizontal className="h-3 w-3" />
              {isFilterOpen ? 'Hide Refinement' : 'Refine Selection'}
            </button>
          </div>
        </div>

        {/* Dynamic Filter Tray */}
        <div className={`overflow-hidden transition-all duration-700 ${isFilterOpen ? 'max-h-[500px] mb-20 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 py-12 border-b border-neutral-100">
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Material Essence</p>
              <div className="flex flex-wrap gap-3">
                {materials.map(m => (
                  <button 
                    key={m}
                    onClick={() => setSelectedMaterial(selectedMaterial === m ? null : m)}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${selectedMaterial === m ? 'bg-black text-white' : 'bg-neutral-50 hover:bg-neutral-100'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Archival Value</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Under $250', range: [0, 250] as [number, number] },
                  { label: '$250 - $500', range: [250, 500] as [number, number] },
                  { label: '$500+', range: [500, 10000] as [number, number] }
                ].map(tier => (
                  <button 
                    key={tier.label}
                    onClick={() => setSelectedPriceRange(selectedPriceRange?.[0] === tier.range[0] ? null : tier.range)}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${selectedPriceRange?.[0] === tier.range[0] ? 'bg-black text-white' : 'bg-neutral-50 hover:bg-neutral-100'}`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-end">
              {(selectedMaterial || selectedPriceRange) && (
                <button 
                  onClick={() => { setSelectedMaterial(null); setSelectedPriceRange(null); }}
                  className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-neutral-300 hover:text-black transition-all"
                >
                  <X className="h-3 w-3" />
                  Clear All Refinements
                </button>
              )}
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-40 border-y border-neutral-100">
             <p className="text-2xl font-serif italic text-neutral-300 mb-6">No matches found within the archive.</p>
             <button 
               onClick={() => { setSelectedMaterial(null); setSelectedPriceRange(null); }}
               className="text-[10px] font-black uppercase tracking-[0.5em] border-b border-black pb-2"
             >
               Reset Refinements
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
            {filteredProducts.map((product, i) => (
              <div key={product.id} className="reveal" style={{ transitionDelay: `${(i % 4) * 100}ms` }}>
                <ProductCard product={product} onAddToCart={onAddToCart} onQuickView={setQuickViewProduct} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Feedback Section */}
      <section className="reveal max-w-7xl mx-auto px-6 lg:px-12 py-32 bg-white">
        <div className="text-center mb-24">
          <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-neutral-300 mb-6">Collectors' Voice</p>
          <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter">What They Say.</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {feedback.map((f, idx) => (
            <div key={f.id} className="space-y-8 p-12 bg-neutral-50 border border-neutral-100 flex flex-col items-center text-center reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
              <div className="w-20 h-20 rounded-full overflow-hidden grayscale border-2 border-white shadow-xl">
                <img src={f.avatar} alt={f.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-xl font-serif italic text-neutral-800 leading-relaxed">"{f.quote}"</p>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.3em]">{f.name}</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">{f.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Quote */}
      <section className="reveal max-w-3xl mx-auto px-6 text-center py-20 pb-40">
        <Quote className="h-10 w-10 mx-auto text-neutral-100 mb-8" />
        <p className="text-2xl font-serif italic text-neutral-500 leading-relaxed">"Vora represents a shift in modern consumption."</p>
        <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-black">— Elena V., Creative Director</p>
      </section>
    </div>
  );
};

const SearchView: React.FC<{ onAddToCart: (p: Product) => void, setQuickViewProduct: (p: Product | null) => void }> = ({ onAddToCart, setQuickViewProduct }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  useReveal(results.length > 0 && !loading);

  React.useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      const res = await db.searchProducts(query);
      setResults(res);
      setLoading(false);
    };
    performSearch();
  }, [query]);

  return (
    <div className="pt-40 pb-40 max-w-7xl mx-auto px-6 lg:px-12 page-transition-enter">
      <div className="mb-20 space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-neutral-400">Search Results</p>
        <h2 className="text-5xl font-serif font-black tracking-tight leading-none">Seeking: "{query}"</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
        {loading ? (
          [...Array(4)].map((_, i) => <ProductSkeleton key={i} />)
        ) : results.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onQuickView={setQuickViewProduct} />
        ))}
      </div>
    </div>
  );
};

const BestsellersView: React.FC<{ onAddToCart: (p: Product) => void, setQuickViewProduct: (p: Product | null) => void }> = ({ onAddToCart, setQuickViewProduct }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  useReveal(products.length > 0 && !loading);

  React.useEffect(() => {
    db.getProducts().then(res => {
      setProducts(res.filter(p => p.rating >= 4.8));
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-40 pb-40 max-w-7xl mx-auto px-6 lg:px-12 page-transition-enter">
      <div className="mb-20 space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-neutral-400">Archival Favorites</p>
        <h2 className="text-5xl font-serif font-black tracking-tight leading-none">Curated Edit.</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
        {loading ? (
          [...Array(4)].map((_, i) => <ProductSkeleton key={i} />)
        ) : (
          products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onQuickView={setQuickViewProduct} />
          ))
        )}
      </div>
    </div>
  );
};

const CartView: React.FC<{ cart: CartItem[], setCart: React.Dispatch<React.SetStateAction<CartItem[]>> }> = ({ cart, setCart }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  return (
    <div className="pt-40 pb-40 max-w-5xl mx-auto px-6 lg:px-12 page-transition-enter">
      <div className="mb-20 space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-neutral-400">Your Archive</p>
        <h2 className="text-5xl font-serif font-black tracking-tight leading-none">Current Selection.</h2>
      </div>
      {cart.length === 0 ? (
        <div className="text-center py-40 border-y border-neutral-100">
           <p className="text-2xl font-serif italic text-neutral-300 mb-12">Your selection is currently empty.</p>
           <Link to="/" className="text-[11px] font-black uppercase tracking-[0.5em] border-b border-black pb-2">Explore the Archive</Link>
        </div>
      ) : (
        <div className="space-y-12">
          {cart.map(item => (
            <div key={item.id} className="flex gap-10 py-10 border-b border-neutral-100 items-center">
              <div className="w-32 aspect-[3/4] bg-neutral-50 overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover grayscale" alt={item.name} />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-serif font-black tracking-tight">{item.name}</h3>
                <p className="text-lg font-serif italic">${item.price}</p>
              </div>
              <div className="flex items-center gap-6 border border-neutral-200 px-6 py-3">
                <button onClick={() => updateQuantity(item.id, -1)}>－</button>
                <span className="text-sm font-black">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>＋</button>
              </div>
              <div className="text-right w-32">
                <p className="text-xl font-serif font-black">${(item.price * item.quantity).toFixed(0)}</p>
              </div>
            </div>
          ))}
          <div className="pt-12 flex flex-col items-end gap-10">
            <div className="w-full max-w-sm space-y-6">
              <div className="flex justify-between items-baseline border-b border-neutral-100 pb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Subtotal</p>
                <p className="text-3xl font-serif font-black">${subtotal.toFixed(0)}</p>
              </div>
            </div>
            <button className="w-full max-w-sm bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.6em] hover:bg-neutral-800 transition-all shadow-2xl flex items-center justify-between px-10">
              Checkout Selection
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    db.getProducts().then(setProducts);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar cartCount={cart.reduce((a, b) => a + b.quantity, 0)} />
        <Routes>
          <Route path="/" element={<HomeView onAddToCart={addToCart} setQuickViewProduct={setQuickViewProduct} />} />
          <Route path="/archive/:categoryId" element={<HomeView onAddToCart={addToCart} setQuickViewProduct={setQuickViewProduct} />} />
          <Route path="/product/:id" element={<ProductPage onAddToCart={addToCart} />} />
          <Route path="/bestsellers" element={<BestsellersView onAddToCart={addToCart} setQuickViewProduct={setQuickViewProduct} />} />
          <Route path="/search" element={<SearchView onAddToCart={addToCart} setQuickViewProduct={setQuickViewProduct} />} />
          <Route path="/cart" element={<CartView cart={cart} setCart={setCart} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <AiAssistant products={products} />
        <QuickViewModal product={quickViewProduct} isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} onAddToCart={addToCart} />
        <footer className="bg-neutral-50 py-24 border-t border-neutral-100 mt-40">
           <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-black lowercase tracking-tighter">vora.</h2>
              <p className="text-[11px] text-neutral-400 font-medium leading-relaxed uppercase tracking-widest">Curating modern form.</p>
            </div>
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em]">Navigation</p>
              <ul className="space-y-3 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                <li><Link to="/" className="hover:text-black transition-colors">The Archive</Link></li>
                <li><Link to="/bestsellers" className="hover:text-black transition-colors">Curated Edit</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em]">Connect</p>
              <p className="text-[11px] font-bold text-neutral-400 leading-relaxed uppercase tracking-widest">studio@vora.market<br />© 2025 Vora Studio.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
