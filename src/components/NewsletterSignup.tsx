import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setStatus('success'), 1000);
  };

  if (status === 'success') {
    return (
      <div className="bg-brand-50 border border-brand-100 p-8 rounded-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-brand-500 rounded-full p-2 text-white">
            <Mail size={24} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-brand-900 mb-2">You're Subscribed!</h3>
        <p className="text-brand-800">Watch your inbox for the latest financial tips.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500 opacity-10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2">Join 50,000+ Smart Investors</h3>
        <p className="text-slate-300 mb-6">Get our weekly roundup of the best credit card deals, insurance tips, and market news.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            required
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-brand-500 hover:bg-brand-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </div>
  );
};