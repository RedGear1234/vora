
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import AiAssistant from './components/AiAssistant';
import ProductPage from './ProductPage';
import QuickViewModal from './components/QuickViewModal';
import { db } from './services/db';
import { Product, CartItem } from './types';
import { ArrowRight, ChevronDown, Fingerprint, Eye } from 'lucide-react';

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
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            alt="Refined Materiality Concept" 
            fetchPriority="high"
          />
        </div>
        
        <div className="hero-content-zone">
          <div className="reveal active">
            <span className="hero-meta-tag">VORA REGISTRY NO. 01 / COLLECTION 2025</span>
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
                onClick={() => document.getElementById('atelier')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Enter Archive
              </button>
              <div style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.4, cursor: 'default' }}>
                Conceived in Paris
              </div>
            </div>
          </div>
          
          <div style={{ position: 'absolute', bottom: '40px', left: '0', padding: '0 var(--space-l)', display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.3 }}>
             <div style={{ width: '40px', height: '1px', background: 'black' }} />
             <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.2em' }}>01. ATELIER</span>
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

      {/* The Atelier Section */}
      <section id="atelier" className="atelier-section">
        <div className="atelier-visual reveal">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
            alt="The Atelier Workspace" 
          />
        </div>
        <div className="atelier-content reveal reveal-delay-1">
          <span className="hero-tag" style={{ color: 'var(--color-neutral-300)', letterSpacing: '0.4em' }}>THE ATELIER</span>
          <h2 className="atelier-title">Where Form <br />Meets <span className="italic">Void.</span></h2>
          <p className="atelier-description">
            Our workspace is a sanctuary of silence and precision. It is here that raw materials—titanium, organic wool, and hand-poured glass—are transformed into objects of permanence. Every curve is calculated; every texture is felt. 
            We manifestation a philosophy of architectural utility.
          </p>
          <button className="btn-minimal">
            View Process <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Micro Focus Immersive Section */}
      <section className="micro-focus reveal">
        <div className="micro-bg">
          <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=2000" alt="Texture Close-up" />
        </div>
        <div className="micro-content">
          <Fingerprint size={32} strokeWidth={1} style={{ marginBottom: '24px' }} />
          <h2 className="font-serif" style={{ fontSize: 'var(--step-l)', marginBottom: '24px' }}>Sensory Integrity</h2>
          <p style={{ fontSize: '13px', opacity: 0.8, letterSpacing: '0.02em', lineHeight: '2' }}>
            We study materials at the grain. The tactile response of an object is as vital as its silhouette. Vora objects are designed to age with grace, absorbing the history of their environment.
          </p>
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '48px' }}>
            <div style={{ textAlign: 'center' }}>
               <p style={{ fontSize: '18px', fontFamily: 'var(--font-serif)' }}>0.01mm</p>
               <p style={{ fontSize: '8px', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Precision Tolerance</p>
            </div>
            <div style={{ textAlign: 'center' }}>
               <p style={{ fontSize: '18px', fontFamily: 'var(--font-serif)' }}>100%</p>
               <p style={{ fontSize: '8px', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Organic Origin</p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Series Section */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container-full">
           <div style={{ marginBottom: '60px' }}>
              <span className="hero-tag" style={{ color: 'var(--color-neutral-300)' }}>THE EDITORIAL SERIES</span>
              <h2 className="font-serif" style={{ fontSize: 'var(--step-l)' }}>Stories of <span className="italic">Form</span></h2>
           </div>
           
           <div className="editorial-grid">
              <div className="editorial-item large reveal">
                 <div className="editorial-img-wrap">
                    <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" alt="Editorial 01" />
                 </div>
                 <p style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.4em', marginBottom: '12px' }}>SERIES NO. 04 / LIGHT STUDY</p>
                 <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>The Interaction of Shadow and Structure</h3>
                 <p style={{ fontSize: '12px', color: 'var(--color-neutral-400)', maxWidth: '400px' }}>Exploring how the brutalist base of our Desk Lamp transforms an environment through diffused warmth.</p>
              </div>
              
              <div className="editorial-item small reveal reveal-delay-1">
                 <div className="editorial-img-wrap portrait">
                    <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800" alt="Editorial 02" />
                 </div>
                 <p style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.4em', marginBottom: '12px' }}>ARCHIVE 012</p>
                 <h3 className="font-serif" style={{ fontSize: '1.5rem' }}>Textural Permanence</h3>
              </div>

              <div className="editorial-item small reveal">
                 <div className="editorial-img-wrap portrait">
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" alt="Editorial 03" />
                 </div>
                 <h3 className="font-serif" style={{ fontSize: '1.5rem', marginTop: '24px' }}>The Human Component</h3>
              </div>

              <div className="editorial-item large reveal reveal-delay-1">
                 <div className="editorial-img-wrap">
                    <img src="https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=1200" alt="Editorial 04" />
                 </div>
                 <p style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.4em', marginBottom: '12px' }}>GLOBAL / TOKYO</p>
                 <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Minimalism in the Metropolis</h3>
                 <p style={{ fontSize: '12px', color: 'var(--color-neutral-400)', maxWidth: '400px' }}>A visual diary of our latest flagship installation in the heart of Aoyama.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Brand Ethos Section */}
      <section className="ethos-section reveal">
        <div className="container-full">
          <div className="ethos-content">
            <span className="hero-tag" style={{ marginBottom: '24px', display: 'block', color: 'var(--color-neutral-300)' }}>OUR ETHOS</span>
            <h2 className="font-serif" style={{ fontSize: 'var(--step-m)', maxWidth: '700px', margin: '0 auto 32px', lineHeight: '1.6', fontWeight: 400 }}>
              "Sustainability is not a feature; it is the natural consequence of objects that are designed never to be replaced."
            </h2>
            <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--color-neutral-500)' }}>— Founder's Note</p>
          </div>
        </div>
      </section>

      {/* Product Archive Grid */}
      <section id="collections" className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container-full">
          <div style={{ textAlign: 'center', marginBottom: '80px' }} className="reveal">
            <span className="hero-tag" style={{ color: 'var(--color-neutral-300)' }}>REGISTRY NO. 01</span>
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

      {/* Private Archive CTA (Dark Mode Break) */}
      <section className="section-padding" style={{ background: 'var(--color-black)', color: 'white' }}>
        <div className="container-full">
           <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
              <div style={{ flex: 1 }} className="reveal">
                 <span className="hero-tag" style={{ color: 'var(--color-neutral-500)' }}>VORA PRIVATE REGISTRY</span>
                 <h2 className="font-serif" style={{ fontSize: 'var(--step-xl)', marginBottom: '32px' }}>Secure Early Access.</h2>
                 <p style={{ fontSize: '14px', opacity: 0.6, marginBottom: '48px', maxWidth: '440px', lineHeight: '2' }}>
                    Join the Vora Registry to receive curated archival notifications, private workshop invites, and the opportunity to acquire limited series before general release.
                 </p>
                 <button className="hero-cta-main" style={{ background: 'white', color: 'black', border: 'none' }}>
                    Request Invitation
                 </button>
              </div>
              <div style={{ flex: 1, position: 'relative' }} className="reveal reveal-delay-1">
                 <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '24px', textAlign: 'center' }}>
                    <Eye size={40} strokeWidth={1} style={{ marginBottom: '16px', opacity: 0.3 }} />
                    <p style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.4em' }}>ACCESS GRANTED TO MEMBERS ONLY</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Material Registry Section */}
      <section className="section-padding" style={{ background: 'var(--color-linen)' }}>
        <div className="container-full">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
             <span className="hero-tag" style={{ color: 'var(--color-neutral-300)' }}>ANATOMY OF FORM</span>
             <h2 className="font-serif" style={{ fontSize: 'var(--step-l)' }}>Material Study</h2>
          </div>
          <div className="registry-grid reveal">
            <div className="registry-item">
              <h4 className="font-serif" style={{ marginBottom: '16px', fontSize: '1.25rem' }}>01. Grade 5 Titanium</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-neutral-500)', lineHeight: '1.8' }}>Chosen for its strength-to-weight ratio and hypoallergenic properties. Used in our Chrono series for absolute precision.</p>
            </div>
            <div className="registry-item">
               <h4 className="font-serif" style={{ marginBottom: '16px', fontSize: '1.25rem' }}>02. Virgin Wool</h4>
               <p style={{ fontSize: '12px', color: 'var(--color-neutral-500)', lineHeight: '1.8' }}>Ethically sourced from Italian mills. Spun to create the structured drape and thermal regulation found in our archive.</p>
            </div>
            <div className="registry-item">
               <h4 className="font-serif" style={{ marginBottom: '16px', fontSize: '1.25rem' }}>03. Borosilicate Glass</h4>
               <p style={{ fontSize: '12px', color: 'var(--color-neutral-500)', lineHeight: '1.8' }}>Hand-poured for exceptional clarity and thermal shock resistance. The pure vessel for our cold-pressed Santal essences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Locations */}
      <section className="section-padding">
        <div className="container-full">
           <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', paddingBottom: '20px', marginBottom: '80px' }}>
              <span className="hero-tag" style={{ margin: 0, color: 'var(--color-neutral-300)' }}>GLOBAL FLAGSHIPS</span>
              <span className="hero-tag" style={{ margin: 0, color: 'var(--color-neutral-300)' }}>PRIVATE APPOINTMENTS</span>
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }} className="reveal">
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
      <section className="section-padding reveal" style={{ textAlign: 'center', background: 'var(--color-white)', color: 'black', borderTop: '1px solid var(--color-border)' }}>
        <div className="container-full">
          <span className="hero-tag" style={{ color: 'var(--color-neutral-300)' }}>STAY UPDATED</span>
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
            <div className="footer-main">
              <div className="footer-col">
                <h4>Registry</h4>
                <ul>
                  <li><a href="#">Shop Collection</a></li>
                  <li><a href="#">The Archive</a></li>
                  <li><a href="#">Sizing Guide</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Atelier</h4>
                <ul>
                  <li><a href="#">Our Process</a></li>
                  <li><a href="#">Materiality</a></li>
                  <li><a href="#">Sustainability</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#">Terms</a></li>
                  <li><a href="#">Privacy</a></li>
                  <li><a href="#">Cookies</a></li>
                </ul>
              </div>
              <div className="footer-col footer-brand-col">
                <Link to="/" className="nav-logo">VORA</Link>
                <p className="footer-meta-label">
                  ESTABLISHED MMXV
                </p>
              </div>
            </div>
            <div className="footer-bottom">
              <div>© 2025 VORA ARCHIVAL MARKET.</div>
              <div>DESIGNED IN ATHENS</div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
