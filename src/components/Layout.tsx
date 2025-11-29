import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, TrendingUp, Shield, CreditCard, DollarSign } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center space-x-2 text-white font-bold text-xl mb-4">
          <TrendingUp className="text-money-500" />
          <span>FinSmart</span>
        </div>
        <p className="text-sm text-slate-400">
          Empowering your financial future with expert advice, tools, and real-time market insights.
        </p>
      </div>
      
      <div>
        <h4 className="text-white font-semibold mb-4">Categories</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/category/credit-cards" className="hover:text-white">Credit Cards</Link></li>
          <li><Link to="/category/insurance" className="hover:text-white">Insurance</Link></li>
          <li><Link to="/category/loans-mortgages" className="hover:text-white">Loans</Link></li>
          <li><Link to="/category/investing-retirement" className="hover:text-white">Investing</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-4">Company</h4>
        <ul className="space-y-2 text-sm">
          <li><span className="cursor-pointer hover:text-white">About Us</span></li>
          <li><span className="cursor-pointer hover:text-white">Contact</span></li>
          <li><span className="cursor-pointer hover:text-white">Privacy Policy</span></li>
          <li><span className="cursor-pointer hover:text-white">Terms of Service</span></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-4">Disclaimer</h4>
        <p className="text-xs text-slate-500">
          FinSmart is for informational purposes only and does not constitute financial advice. 
          We may earn a commission from affiliate links.
        </p>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
      &copy; {new Date().getFullYear()} FinSmart Media. All rights reserved.
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Top Bar */}
      <div className="bg-brand-900 text-white text-xs py-2">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span>Trending: Mortgage rates drop to 6.2%</span>
          <div className="flex space-x-4">
            <span>Newsletter</span>
            <span>Login</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 text-brand-900 font-bold text-2xl tracking-tight">
              <TrendingUp className="text-money-500 w-8 h-8" />
              <span>FinSmart</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`text-sm font-medium hover:text-brand-600 transition-colors ${
                    location.pathname === item.path ? 'text-brand-600' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button className="text-slate-600 hover:text-brand-600">
                <Search className="w-5 h-5" />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <nav className="flex flex-col p-4 space-y-4">
              {NAV_ITEMS.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className="text-slate-700 font-medium py-2 px-2 hover:bg-slate-50 rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
};