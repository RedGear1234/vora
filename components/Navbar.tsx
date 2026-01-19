import React from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`vora-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-full">
        <div className="nav-content">
          <div className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Archive</Link>
            <Link to="/bestsellers" className={`nav-link ${location.pathname === '/bestsellers' ? 'active' : ''}`}>Edit</Link>
          </div>

          <Link to="/" className="nav-logo">vora.</Link>

          <div className="nav-actions" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link to="/cart" style={{ position: 'relative', color: 'inherit' }}>
              <ShoppingBag size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: 'black',
                  color: 'white',
                  fontSize: '8px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="mobile-toggle" style={{ display: 'none', background: 'none', border: 'none' }}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;