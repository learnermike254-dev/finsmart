import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_ARTICLES } from '../constants';
import { AdBanner } from '../components/AdBanner';

export const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Helper to match slug to category name in constant (simple fuzzy match for demo)
  const categoryName = slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) 
    .replace('And', '&') // Fix "Loans & Mortgages" etc
    .replace('Budgeting & Apps', 'Budgeting & Apps'); // Edge case handling could be better in real app
    
  // Filter logic
  // Since slug "credit-cards" maps to "Credit Cards", we do a includes check or simple mapping
  // Real app would have a map.
  let displayCategory = '';
  
  if (slug === 'credit-cards') displayCategory = 'Credit Cards';
  else if (slug === 'insurance') displayCategory = 'Insurance';
  else if (slug === 'loans-mortgages') displayCategory = 'Loans & Mortgages';
  else if (slug === 'investing-retirement') displayCategory = 'Investing & Retirement';
  
  const articles = INITIAL_ARTICLES.filter(a => a.category === displayCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
           <span className="text-money-600 font-bold uppercase tracking-wider text-sm mb-2 block">Category</span>
           <h1 className="text-4xl font-bold text-slate-900">{displayCategory || 'All Articles'}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
            {articles.length === 0 && (
                <p className="text-slate-500">No articles found in this category.</p>
            )}
            
            {articles.map(article => (
                <Link to={`/article/${article.slug}`} key={article.id} className="block group bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600">{article.title}</h2>
                            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{article.summary}</p>
                            <span className="text-money-600 text-xs font-semibold uppercase">Read Guide &rarr;</span>
                        </div>
                    </div>
                </Link>
            ))}
            
            <AdBanner slot="category-feed" />
        </div>

        <aside className="lg:col-span-4">
             <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                    {['Credit Score', 'Life Insurance', 'Crypto', '401k', 'Savings'].map(tag => (
                        <span key={tag} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs hover:bg-slate-200 cursor-pointer">
                            #{tag}
                        </span>
                    ))}
                </div>
             </div>
        </aside>
      </div>
    </div>
  );
};