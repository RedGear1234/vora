
import React from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation or window resize to desktop
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock scroll when menu is active
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`vora-nav ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-active' : ''}`}>
        <div className="container-full">
          <div className="nav-content">
            <div className="nav-column-left">
              {/* Desktop Only Links */}
              <div className="desktop-links">
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Shop</Link>
                <Link to="/curated" className="nav-link">Curated</Link>
                <Link to="/story" className="nav-link">Our Story</Link>
              </div>
              
              {/* Mobile Only Trigger */}
              <button 
                className="mobile-trigger" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>

            <Link to="/" className="nav-logo">VORA</Link>

            <div className="nav-actions">
              <button className="nav-action-btn search-mobile-hide" aria-label="Search">
                <Search size={18} strokeWidth={1.5} />
              </button>
              <Link to="/cart" className="bag-link">
                <span className="bag-label">Bag</span>
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="bag-count">({cartCount})</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="drawer-inner">
          <div className="drawer-nav">
            <Link to="/" className="drawer-item">
              <span className="drawer-num">01</span>
              <span className="drawer-text">The Archive</span>
              <ArrowRight size={20} strokeWidth={1} />
            </Link>
            <Link to="/curated" className="drawer-item">
              <span className="drawer-num">02</span>
              <span className="drawer-text">Curated Lists</span>
              <ArrowRight size={20} strokeWidth={1} />
            </Link>
            <Link to="/story" className="drawer-item">
              <span className="drawer-num">03</span>
              <span className="drawer-text">Our Story</span>
              <ArrowRight size={20} strokeWidth={1} />
            </Link>
            <Link to="/contact" className="drawer-item">
              <span className="drawer-num">04</span>
              <span className="drawer-text">Concierge</span>
              <ArrowRight size={20} strokeWidth={1} />
            </Link>
          </div>
          
          <div className="drawer-footer">
            <div className="footer-meta">
              <p>Registry No. 01</p>
              <p>Conceived in Paris</p>
            </div>
            <div className="drawer-socials">
              <a href="#">Instagram</a>
              <a href="#">Journal</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
