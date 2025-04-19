import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 pt-10 pb-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-6 w-6 text-primary-500" />
              <h2 className="text-xl font-bold ml-2 text-gray-900 dark:text-white">Campus Cart</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The ultimate marketplace for university students and societies to buy and sell items.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Sell an Item
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/?category=Books" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/?category=Electronics" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/?category=Clothing" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/?category=Furniture" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Furniture
                </Link>
              </li>
              <li>
                <Link to="/?category=Other" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                  Other
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">support@campuscart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Campus Cart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};