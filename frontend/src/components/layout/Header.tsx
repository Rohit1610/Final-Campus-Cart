import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sun, Moon, Search, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useDarkMode } from '../../hooks/useDarkMode';
import { Badge } from '../ui/Badge';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md dark:bg-gray-900'
          : 'bg-white/80 backdrop-blur-sm dark:bg-gray-900/80'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-primary-500 text-xl font-bold dark:text-white">Campus Cart</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 rounded-full py-2 pl-10 pr-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </form>
              {isAuthenticated && (
                <Link
                  to="/sell"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === '/sell'
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50 dark:text-gray-300 dark:hover:bg-primary-900/20 dark:hover:text-primary-300'
                  }`}
                >
                  Sell
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  to="/orders"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === '/orders'
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50 dark:text-gray-300 dark:hover:bg-primary-900/20 dark:hover:text-primary-300'
                  }`}
                >
                  Orders
                </Link>
              )}
              {isAuthenticated && user?.type === 'Admin' && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === '/admin'
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50 dark:text-gray-300 dark:hover:bg-primary-900/20 dark:hover:text-primary-300'
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <Link
              to="/cart"
              className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-300 relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button
                  className="flex items-center focus:outline-none"
                  aria-label="User menu"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {user?.type}
                    </p>
                  </div>
                  {user?.type === 'Admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/sell"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    Sell Product
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-error-700 hover:bg-gray-100 dark:text-error-300 dark:hover:bg-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-300"
              >
                <User size={20} className="mr-1" />
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-4 shadow-lg animate-fade-in">
          <div className="px-4 space-y-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full py-2 pl-10 pr-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            
            {isAuthenticated && (
              <>
                <Link
                  to="/sell"
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    location.pathname === '/sell'
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50 dark:text-gray-300 dark:hover:bg-primary-900/20 dark:hover:text-primary-300'
                  }`}
                >
                  Sell
                </Link>
                <Link
                  to="/orders"
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    location.pathname === '/orders'
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50 dark:text-gray-300 dark:hover:bg-primary-900/20 dark:hover:text-primary-300'
                  }`}
                >
                  Orders
                </Link>
                {user?.type === 'Admin' && (
                  <Link
                    to="/admin"
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      location.pathname === '/admin'
                        ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-300'
                        : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50 dark:text-gray-300 dark:hover:bg-primary-900/20 dark:hover:text-primary-300'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 text-base font-medium rounded-md text-error-700 bg-error-50 dark:text-error-300 dark:bg-error-900/20"
                >
                  Sign out
                </button>
              </>
            )}
            
            {!isAuthenticated && (
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium rounded-md text-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};