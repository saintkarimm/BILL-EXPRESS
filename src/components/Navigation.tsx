import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, User, Package, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationProps {
  scrollY: number;
}

export default function Navigation({ scrollY }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getCartCount } = useCart();

  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Shop', href: '/shop' },
    { name: 'Tracking', href: '/tracking' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1D2F42] rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className={`font-bold text-lg tracking-tight transition-colors ${
              isScrolled ? 'text-[#1D2F42]' : 'text-[#1D2F42]'
            }`}>
              HAYYU GOLDCoast
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#1D2F42] ${
                  isActive(link.href)
                    ? 'text-[#1D2F42]'
                    : isScrolled
                    ? 'text-[#1D2F42]'
                    : 'text-[#1D2F42]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className={`w-5 h-5 ${isScrolled ? 'text-[#1D2F42]' : 'text-[#1D2F42]'}`} />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#1D2F42] text-white text-xs rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-[#1D2F42] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-[#1D2F42]">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#1D2F42] text-white rounded-lg text-sm font-medium hover:bg-[#0f1a25] transition-colors"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}

            {/* CTA Button */}
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#1D2F42] text-white rounded-lg text-sm font-medium hover:bg-[#0f1a25] transition-colors"
            >
              Buy Electronics
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-white p-0">
                <SheetHeader className="p-4 border-b border-gray-100">
                  <SheetTitle className="text-left font-bold text-lg">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-[calc(100%-65px)]">
                  <nav className="flex-1 overflow-y-auto px-4 py-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-base font-medium py-3 border-b border-gray-50 hover:text-[#1D2F42] transition-colors ${
                          isActive(link.href) ? 'text-[#1D2F42]' : 'text-[#1D2F42]'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="p-4 border-t border-gray-100 space-y-3">
                    {!isAuthenticated && (
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#1D2F42] text-white rounded-lg font-medium text-sm"
                      >
                        <User className="w-4 h-4" />
                        Login
                      </Link>
                    )}
                    <a
                      href="https://wa.me/233257721337?text=Hello%20Hayyu%20GoldCoast%20Logistics%20,%20I%20would%20like%20to%20inquire%20about%20your%20services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white rounded-lg font-medium text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

