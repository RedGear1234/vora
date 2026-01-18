
import React from 'react';
import { ShoppingBag, Search, Menu, X, Instagram } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled ? 'bg-white/95 backdrop-blur-md py-4' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-12">
            {/* Left: Navigation Links */}
            <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em]">
              <Link to="/" className={`relative group transition-colors hover:text-black ${location.pathname === '/' ? 'text-black' : 'text-gray-400'}`}>
                The Archive
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-black transition-all duration-500 ${location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
              <Link to="/bestsellers" className={`relative group transition-colors hover:text-black ${location.pathname === '/bestsellers' ? 'text-black' : 'text-gray-400'}`}>
                Curated Edit
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-black transition-all duration-500 ${location.pathname === '/bestsellers' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link to="/" className="text-4xl font-serif font-black tracking-[-0.08em] lowercase hover:opacity-50 transition-opacity duration-500">
                vora.
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-10">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-colors"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
              <Link to="/cart" className="relative group p-2">
                <ShoppingBag className="h-6 w-6 stroke-[1.2] group-hover:opacity-50 transition-all" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-[9px] font-black bg-black text-white w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-8 w-8 stroke-[1]" /> : <Menu className="h-8 w-8 stroke-[1]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-0 bg-white z-[90] p-12 lg:hidden flex flex-col justify-center gap-12 animate-in slide-in-from-right duration-700">
             <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-12 right-12 p-2"
            >
              <X className="h-10 w-10 stroke-[1]" />
            </button>
            <div className="space-y-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-gray-300">Menu</p>
              <div className="flex flex-col gap-6">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-6xl font-serif tracking-tighter hover:italic">The Archive</Link>
                <Link to="/bestsellers" onClick={() => setIsMenuOpen(false)} className="text-6xl font-serif tracking-tighter hover:italic">Curated Edit</Link>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="text-6xl font-serif tracking-tighter hover:italic">Selection</Link>
                <button onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }} className="text-left text-6xl font-serif tracking-tighter hover:italic">Search</button>
              </div>
            </div>
            <div className="mt-auto border-t border-gray-100 pt-12 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
              <span>Login / Register</span>
              <Instagram className="h-5 w-5" />
            </div>
          </div>
        )}
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[200] bg-white animate-in fade-in duration-500 flex flex-col p-12 lg:p-24">
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="self-end p-2 mb-12"
          >
            <X className="h-10 w-10 stroke-[1]" />
          </button>
          <div className="max-w-4xl mx-auto w-full">
            <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-gray-300 mb-8">What are you seeking?</p>
            <form onSubmit={handleSearchSubmit}>
              <input 
                autoFocus
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search..."
                className="w-full text-5xl md:text-8xl font-serif font-black tracking-tighter border-b border-black pb-8 outline-none placeholder:text-gray-100"
              />
              <div className="mt-12 flex flex-wrap gap-8 text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">
                <span>Quick Search:</span>
                <button type="button" onClick={() => { setSearchQuery('Fashion'); }} className="hover:text-black transition-colors underline decoration-gray-200 underline-offset-8">Fashion</button>
                <button type="button" onClick={() => { setSearchQuery('Beauty'); }} className="hover:text-black transition-colors underline decoration-gray-200 underline-offset-8">Beauty</button>
                <button type="button" onClick={() => { setSearchQuery('Tote'); }} className="hover:text-black transition-colors underline decoration-gray-200 underline-offset-8">Tote</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
