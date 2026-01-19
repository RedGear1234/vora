
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from './types';
import { db } from './services/db';
import { geminiService } from './services/geminiService';
import ProductCard from './components/ProductCard';
import { ArrowRight, ShieldCheck, Compass, Star, ChevronLeft } from 'lucide-react';

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
      <div className="container-full" style={{ paddingTop: '160px', paddingBottom: '160px' }}>
        <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em' }}>Retrieving Entry...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-full" style={{ paddingTop: '160px', paddingBottom: '160px', textAlign: 'center' }}>
        <h2 className="font-serif" style={{ fontSize: '2rem', marginBottom: '24px' }}>Archive Entry Missing</h2>
        <Link to="/" style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', borderBottom: '1px solid black', paddingBottom: '4px', textDecoration: 'none', color: 'inherit' }}>Return to Core</Link>
      </div>
    );
  }

  return (
    <div className="product-page-root" style={{ paddingTop: 'clamp(100px, 12vw, 140px)', paddingBottom: '120px' }}>
      <div className="container-full">
        <Link to="/" className="back-archival-link" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5em', textDecoration: 'none', color: 'var(--color-neutral-400)', marginBottom: '40px' }}>
          <ChevronLeft size={16} />
          Back to Archive
        </Link>

        <div className="product-detail-layout">
          <div className="product-visual-col">
            <div className="card-image-wrap" style={{ aspectRatio: '4/5', boxShadow: '0 40px 100px rgba(0,0,0,0.05)' }}>
              <img src={product.image} alt={product.name} className="card-image" style={{ filter: 'grayscale(0)' }} />
            </div>
          </div>

          <div className="product-info-col">
            <div className="info-header">
              <p style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.8em', color: 'var(--color-neutral-400)', marginBottom: '16px' }}>Ref. 2025-{product.id.padStart(3, '0')}</p>
              <h1 className="font-serif product-main-title">{product.name}</h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--color-neutral-100)' }}>
                <p className="font-serif" style={{ fontSize: '2rem', fontStyle: 'italic' }}>${product.price.toFixed(0)}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-neutral-400)' }}>
                  <Star size={12} style={{ fill: 'var(--color-neutral-400)' }} />
                  {product.rating} / 5.0
                </div>
              </div>
            </div>

            <p className="product-desc-text">
              {product.description}
            </p>

            <button className="btn-primary buy-btn-action" onClick={() => onAddToCart(product)}>
              Allocate to Bag
              <ArrowRight size={18} />
            </button>

            <div className="utility-grid">
              <div className="utility-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  <ShieldCheck size={14} strokeWidth={1.5} />
                  Guarantee
                </div>
                <p style={{ fontSize: '10px', color: 'var(--color-neutral-500)', lineHeight: '1.6' }}>Sourced from certified workshops for permanence.</p>
              </div>
              <div className="utility-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  <Compass size={14} strokeWidth={1.5} />
                  Origin
                </div>
                <p style={{ fontSize: '10px', color: 'var(--color-neutral-500)', lineHeight: '1.6' }}>Conceived in Paris. Artisan crafted in small batches.</p>
              </div>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div style={{ marginTop: 'clamp(60px, 10vw, 120px)' }}>
            <h2 className="font-serif" style={{ fontSize: '2rem', marginBottom: '48px', borderBottom: '1px solid var(--color-neutral-100)', paddingBottom: '24px' }}>Similar Archives.</h2>
            <div className="product-grid">
              {similarProducts.slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onQuickView={() => {}} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .product-detail-layout {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 64px;
        }
        .product-visual-col { grid-column: span 7; }
        .product-info-col { grid-column: span 5; display: flex; flex-direction: column; gap: 48px; }
        .product-main-title { font-size: clamp(2.5rem, 4vw, 4.5rem); font-weight: 900; letter-spacing: -0.04em; lineHeight: 1.1; margin-bottom: 24px; }
        .product-desc-text { font-size: 1.1rem; color: var(--color-neutral-500); font-weight: 300; line-height: 1.8; }
        .buy-btn-action { width: 100%; padding: 24px; }
        .utility-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; border-top: 1px solid var(--color-neutral-100); padding-top: 32px; }

        @media (max-width: 1024px) {
          .product-detail-layout { grid-template-columns: 1fr; gap: 40px; }
          .product-visual-col, .product-info-col { grid-column: span 1; }
          .product-info-col { gap: 32px; }
          .product-main-title { font-size: 2.8rem; }
        }
        @media (max-width: 640px) {
          .utility-grid { grid-template-columns: 1fr; gap: 24px; }
        }
      `}} />
    </div>
  );
};

export default ProductPage;
