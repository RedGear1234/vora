import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import AiAssistant from './components/AiAssistant';
import ProductPage from './ProductPage';
import QuickViewModal from './components/QuickViewModal';
import { db } from './services/db';
import { Product, CartItem } from './types';
import { ArrowRight, Eye } from 'lucide-react';

const HomeView: React.FC<{ 
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
}> = ({ onAddToCart, onQuickView }) => {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    db.getProducts().then(setProducts);
  }, []);

  return (
    <div className="page-view">
      {/* Asymmetric Split Hero */}
      <section className="hero-split">
        <div className="hero-visual">
          <img 
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=2000" 
            alt="Vora Archival Editorial Concept" 
            fetchPriority="high"
          />
        </div>
        
        <div className="hero-content-zone">
          <div className="reveal active">
            <h1 className="hero-main-title">
              <span className="block">Refined</span>
              <span className="indent italic">Materiality.</span>
            </h1>
            <p className="hero-description">
              A curated marketplace for architectural utility and aesthetic permanence. 
              Discover objects conceived through the intersection of form and void.
            </p>
            <div className="hero-cta-group">
              <button 
                className="hero-cta-main" 
                onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Enter Archive
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Press Strip */}
      <section className="press-strip reveal">
        <span className="press-logo">Vogue</span>
        <span className="press-logo">Wallpaper*</span>
        <span className="press-logo">Hypebeast</span>
        <span className="press-logo">AD</span>
        <span className="press-logo">Monocle</span>
      </section>

      {/* Editorial Series Section */}
      <section className="section-padding reveal">
        <div className="container-full">
           <div style={{ marginBottom: '60px' }}>
              <span className="hero-tag">THE EDITORIAL SERIES</span>
              <h2 className="font-serif" style={{ fontSize: 'var(--step-l)' }}>Stories of <span className="italic">Form</span></h2>
           </div>
           
           <div className="editorial-grid">
              <div className="editorial-item large">
                 <div className="editorial-img-wrap">
                    <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" alt="Editorial 01" />
                 </div>
                 <span className="hero-tag">SERIES NO. 04 / LIGHT STUDY</span>
                 <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>The Interaction of Shadow and Structure</h3>
                 <p style={{ fontSize: '12px', color: 'var(--color-neutral-400)', maxWidth: '400px' }}>Exploring how the brutalist base of our Desk Lamp transforms an environment through diffused warmth.</p>
              </div>
              
              <div className="editorial-item small">
                 <div className="editorial-img-wrap portrait">
                    <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800" alt="Editorial 02" />
                 </div>
                 <span className="hero-tag">ARCHIVE 012</span>
                 <h3 className="font-serif" style={{ fontSize: '1.5rem' }}>Textural Permanence</h3>
              </div>
           </div>
        </div>
      </section>

      {/* Brand Ethos Section */}
      <section className="ethos-section reveal">
        <div className="container-full">
          <div className="ethos-content">
            <span className="hero-tag" style={{ marginBottom: '24px', display: 'block' }}>OUR ETHOS</span>
            <h2 className="font-serif" style={{ fontSize: 'var(--step-m)', maxWidth: '700px', margin: '0 auto 32px', lineHeight: '1.6', fontWeight: 400 }}>
              "Sustainability is not a feature; it is the natural consequence of objects that are designed never to be replaced."
            </h2>
            <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--color-neutral-500)' }}>— Founder's Note</p>
          </div>
        </div>
      </section>

      {/* Product Archive Grid */}
      <section id="collections" className="reveal">
        <div className="container-full">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="hero-tag">REGISTRY NO. 01</span>
            <h2 className="font-serif" style={{ fontSize: 'var(--step-xl)', fontWeight: 400, letterSpacing: '-0.02em' }}>The Core Collection</h2>
          </div>
          
          <div className="product-grid">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
                onQuickView={onQuickView} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Private Archive CTA */}
      <section className="reveal section-padding" style={{ background: 'var(--color-black)', color: 'white' }}>
        <div className="container-full">
           <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(40px, 8vw, 120px)', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 500px' }}>
                 <span className="hero-tag" style={{ color: 'var(--color-neutral-500)', marginBottom: '40px' }}>VORA PRIVATE REGISTRY</span>
                 <h2 className="font-serif" style={{ fontSize: 'var(--step-xl)', marginBottom: '32px', lineHeight: 1 }}>Secure Early Access.</h2>
                 <p style={{ fontSize: '14px', opacity: 0.6, marginBottom: '48px', maxWidth: '440px', lineHeight: '2' }}>
                    Join the Vora Registry to receive curated archival notifications, private workshop invites, and the opportunity to acquire limited series before general release.
                 </p>
                 <button className="btn-primary" style={{ background: 'white', color: 'black', border: 'none' }}>
                    Request Invitation
                 </button>
              </div>
              <div style={{ flex: '1 1 500px', position: 'relative' }}>
                 <div style={{ 
                   border: '1px solid rgba(255,255,255,0.1)', 
                   padding: 'clamp(60px, 10vw, 120px)', 
                   textAlign: 'center',
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                   justifyContent: 'center',
                   transition: 'border-color 0.4s ease'
                 }}>
                    <Eye size={64} strokeWidth={1} style={{ marginBottom: '32px', opacity: 0.2 }} />
                    <p style={{ 
                      fontSize: '11px', 
                      fontWeight: 900, 
                      letterSpacing: '0.6em', 
                      lineHeight: '2',
                      maxWidth: '240px'
                    }}>
                      ACCESS GRANTED TO MEMBERS ONLY
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Flagship Locations */}
      <section className="reveal">
        <div className="container-full">
           <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', paddingBottom: '20px', marginBottom: '80px' }}>
              <span className="hero-tag" style={{ margin: 0 }}>GLOBAL FLAGSHIPS</span>
              <span className="hero-tag" style={{ margin: 0 }}>PRIVATE APPOINTMENTS</span>
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
              <div>
                <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: 400 }}>Paris</h3>
                <p style={{ fontSize: '11px', color: 'var(--color-neutral-500)', letterSpacing: '0.05em' }}>42 Rue de Rivoli, 75004</p>
              </div>
              <div>
                <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: 400 }}>Athens</h3>
                <p style={{ fontSize: '11px', color: 'var(--color-neutral-500)', letterSpacing: '0.05em' }}>Mitropoleos 5, Syntagma</p>
              </div>
              <div>
                <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: 400 }}>London</h3>
                <p style={{ fontSize: '11px', color: 'var(--color-neutral-500)', letterSpacing: '0.05em' }}>18 Conduit St, Mayfair</p>
              </div>
           </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="reveal section-padding" style={{ textAlign: 'center', background: 'var(--color-white)', color: 'black', borderTop: '1px solid var(--color-border)' }}>
        <div className="container-full">
          <span className="hero-tag">STAY UPDATED</span>
          <h2 className="font-serif" style={{ fontSize: 'var(--step-l)', marginBottom: '40px' }}>Archival Insights</h2>
          <div style={{ maxWidth: '500px', margin: '0 auto', borderBottom: '1px solid var(--color-black)', paddingBottom: '12px', display: 'flex' }}>
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              style={{ flex: 1, border: 'none', outline: 'none', background: 'none', fontSize: '11px', letterSpacing: '0.2em', color: 'black' }} 
            />
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'black' }}>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const App: React.FC = () => {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [previewProduct, setPreviewProduct] = React.useState<Product | null>(null);

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
          <Route path="/" element={<HomeView onAddToCart={addToCart} onQuickView={setPreviewProduct} />} />
          <Route path="/product/:id" element={<ProductPage onAddToCart={addToCart} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <AiAssistant products={products} />
        
        <QuickViewModal 
          product={previewProduct} 
          isOpen={!!previewProduct} 
          onClose={() => setPreviewProduct(null)} 
          onAddToCart={addToCart}
        />

        <footer className="vora-footer">
          <div className="container-full">
            <div className="footer-top-grid">
              <div className="footer-col">
                <span className="footer-heading">Collections</span>
                <ul className="footer-nav-list">
                  <li><Link to="/" className="footer-nav-link">Main Archive</Link></li>
                  <li><Link to="/" className="footer-nav-link">Curated Selection</Link></li>
                  <li><Link to="/" className="footer-nav-link">Private Registry</Link></li>
                  <li><Link to="/" className="footer-nav-link">Limited Editions</Link></li>
                </ul>
              </div>
              <div className="footer-col">
                <span className="footer-heading">Ateliers</span>
                <ul className="footer-nav-list">
                  <li><Link to="/" className="footer-nav-link">Our Story</Link></li>
                  <li><Link to="/" className="footer-nav-link">Material Study</Link></li>
                  <li><Link to="/" className="footer-nav-link">Sustainability</Link></li>
                  <li><Link to="/" className="footer-nav-link">Craftsmanship</Link></li>
                </ul>
              </div>
              <div className="footer-col">
                <span className="footer-heading">Service</span>
                <ul className="footer-nav-list">
                  <li><Link to="/" className="footer-nav-link">Client Relations</Link></li>
                  <li><Link to="/" className="footer-nav-link">Shipping & Returns</Link></li>
                  <li><Link to="/" className="footer-nav-link">Appointments</Link></li>
                  <li><Link to="/" className="footer-nav-link">Contact</Link></li>
                </ul>
              </div>
              <div className="footer-col">
                <span className="footer-heading">Social</span>
                <ul className="footer-nav-list">
                  <li><a href="#" className="footer-nav-link">Instagram</a></li>
                  <li><a href="#" className="footer-nav-link">Pinterest</a></li>
                  <li><a href="#" className="footer-nav-link">LinkedIn</a></li>
                  <li><a href="#" className="footer-nav-link">Journal</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-brand-signature">
              <div className="footer-massive-logo">VORA</div>
              <div className="footer-bottom-meta">
                <div className="footer-meta-group">
                  <span>© 2025 VORA ARCHIVAL MARKET</span>
                  <span>EST. MMXV</span>
                </div>
                <div className="footer-meta-group">
                  <span>ATHENS — PARIS — LONDON</span>
                  <span>ALL RIGHTS RESERVED</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;