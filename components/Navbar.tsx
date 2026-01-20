import React from 'react';
import { ShoppingBag, Search, Menu as MenuIcon, X } from 'lucide-react';
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

  // Close menu when location changes
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`vora-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container-full">
          <div className="nav-content">
            <div className="nav-column-left">
              {/* Desktop Links - Visible on Desktop only */}
              <div className="desktop-links mobile-hide">
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Shop</Link>
                <Link to="/curated" className="nav-link">Curated</Link>
                <Link to="/story" className="nav-link">Our Story</Link>
              </div>
              
              {/* Mobile Menu Trigger - Visible on Mobile only */}
              <button 
                className="nav-action-btn desktop-hide" 
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open Menu"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <MenuIcon size={20} strokeWidth={1.5} />
                <span className="menu-trigger-label">Menu</span>
              </button>
            </div>

            <Link to="/" className="nav-logo">VORA</Link>

            <div className="nav-actions">
              <button className="nav-action-btn search-mobile-hide" aria-label="Search" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
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

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}>
        <div className="menu-header">
          <span className="nav-logo">VORA</span>
          <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={32} strokeWidth={1} />
          </button>
        </div>
        
        <div className="menu-links-container">
          <Link to="/" className="menu-link">Shop</Link>
          <Link to="/curated" className="menu-link">Curated Selection</Link>
          <Link to="/story" className="menu-link">Our Story</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;