import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import AiAssistant from './components/AiAssistant';
import ProductPage from './ProductPage';
import { db } from './services/db';
import { Product, CartItem, Category } from './types';
import { ArrowDownRight } from 'lucide-react';

const HomeView: React.FC<{ onAddToCart: (p: Product) => void }> = ({ onAddToCart }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    db.getProducts().then(res => {
      setProducts(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="page-view">
      {/* Editorial Hero */}
      <section className="hero">
        <div className="container-full">
          <div className="hero-grid">
            <div className="hero-main">
              <p className="uppercase tracking-widest" style={{ fontSize: '10px', color: 'var(--color-muted)' }}>Archival Collection / No. 001</p>
              <h1 className="hero-title">Quiet <br /> <span className="italic" style={{ fontWeight: 300, opacity: 0.6 }}>Luxury.</span></h1>
              <div style={{ display: 'flex', gap: '60px', marginTop: '40px', alignItems: 'start' }}>
                <p style={{ maxWidth: '340px', color: 'var(--color-muted)', fontWeight: 300 }}>
                  A sanctuary for objects that defy the temporality of trends. Every piece in our archive is selected for its structural integrity.
                </p>
                <button className="nav-link active" style={{ background: 'none', border: 'none', borderBottom: '1px solid black', paddingBottom: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  Enter Archive <ArrowDownRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Archive Grid */}
      <section className="container-full" style={{ paddingBottom: '160px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'end', 
          marginBottom: '80px',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '40px'
        }}>
          <div>
            <p className="uppercase tracking-widest" style={{ fontSize: '10px', color: 'var(--color-muted)', marginBottom: '16px' }}>The Database</p>
            {/* Fix: Replaced invalid trackingTight with letterSpacing */}
            <h2 className="font-serif" style={{ fontSize: '64px', fontWeight: 900, letterSpacing: '-0.04em' }}>Available <span className="italic" style={{ opacity: 0.3 }}>Works.</span></h2>
          </div>
        </div>

        <div className="product-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
              onQuickView={() => {}} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const App: React.FC = () => {
  const [cart, setCart] = React.useState<CartItem[]>([]);
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
      <div className="app-container">
        <Navbar cartCount={cart.reduce((a, b) => a + b.quantity, 0)} />
        <Routes>
          <Route path="/" element={<HomeView onAddToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductPage onAddToCart={addToCart} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <AiAssistant products={products} />
        
        <footer style={{ background: 'var(--color-bone)', padding: '120px 0 60px', marginTop: '160px', borderTop: '1px solid var(--color-border)' }}>
          <div className="container-full">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '80px' }}>
              <div style={{ gridColumn: 'span 4' }}>
                <h2 className="nav-logo" style={{ fontSize: '48px', marginBottom: '32px' }}>vora.</h2>
                <p style={{ fontSize: '12px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  An archival project dedicated to the intersection of modern form and ancestral materiality.
                </p>
              </div>
              <div style={{ gridColumn: 'span 8', display: 'flex', justifyContent: 'end', gap: '80px' }}>
                <div>
                  <h4 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--color-muted)', marginBottom: '24px' }}>Studio</h4>
                  <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-muted)' }}>Paris / Tokyo / London</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--color-border)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--color-muted)' }}>
              © 2025 VORA ARCHIVAL MARKET.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;