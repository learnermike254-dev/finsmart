import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Shield, Home as HomeIcon, LineChart, Sparkles, RefreshCw } from 'lucide-react';
import { INITIAL_ARTICLES } from '../constants';
import { generateTrendingTopics } from '../services/gemini';
import { AdBanner } from '../components/AdBanner';
import { NewsletterSignup } from '../components/NewsletterSignup';

export const Home: React.FC = () => {
  const [trendingTopics, setTrendingTopics] = useState<Array<{title: string, category: string, slug: string}>>([]);
  const [loadingTopics, setLoadingTopics] = useState(false);

  const featuredArticle = INITIAL_ARTICLES[0];
  const latestArticles = INITIAL_ARTICLES.slice(1, 4);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    setLoadingTopics(true);
    // Fetch live ideas from AI
    const topics = await generateTrendingTopics();
    setTrendingTopics(topics);
    setLoadingTopics(false);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-brand-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-800 rounded-full opacity-50 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-money-600 rounded-full opacity-20 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-money-400 font-semibold tracking-wider text-sm uppercase mb-2 block">
              Financial Freedom Starts Here
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Smart Finance & Insurance <br/> Guides for 2025
            </h1>
            <p className="text-brand-100 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
              Navigate the complex world of money with expert advice on credit cards, 
              insurance, investing, and retirement planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/category/credit-cards" className="bg-money-500 hover:bg-money-600 text-white px-8 py-3 rounded-lg font-semibold text-center transition-colors">
                Find Best Credit Cards
              </Link>
              <Link to="/tool/mortgage-calculator" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-lg font-semibold text-center transition-colors">
                Calculate Mortgage
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Trending Section (Self-Updating) */}
      <section className="bg-slate-900 border-b border-slate-800 py-8">
         <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-money-400">
                    <Sparkles className="w-5 h-5" />
                    <h2 className="font-bold uppercase tracking-wider text-sm">AI Market Watch</h2>
                </div>
                <button onClick={fetchTrending} className="text-slate-400 hover:text-white transition-colors">
                    <RefreshCw className={`w-4 h-4 ${loadingTopics ? 'animate-spin' : ''}`} />
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {trendingTopics.length > 0 ? trendingTopics.map((topic, i) => (
                    <Link key={i} to={`/article/${topic.slug}`} className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700 hover:border-money-500 group">
                        <span className="text-[10px] text-brand-400 uppercase font-bold mb-2 block">{topic.category}</span>
                        <h3 className="text-white text-sm font-semibold leading-snug group-hover:text-money-400 line-clamp-3">{topic.title}</h3>
                    </Link>
                )) : (
                    // Skeletons
                    [1,2,3,4,5].map(n => (
                        <div key={n} className="bg-slate-800 p-4 rounded-lg h-24 animate-pulse"></div>
                    ))
                )}
            </div>
         </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="bg-money-500 w-2 h-8 mr-3 rounded-full"></span>
                Editor's Pick
              </h2>
              <Link to={`/article/${featuredArticle.slug}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="aspect-video w-full overflow-hidden">
                    <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-8">
                    <span className="text-money-600 font-semibold text-sm uppercase tracking-wider mb-2 block">{featuredArticle.category}</span>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors">{featuredArticle.title}</h3>
                    <p className="text-slate-600 text-lg mb-6 line-clamp-2">{featuredArticle.summary}</p>
                    <div className="flex items-center text-slate-500 text-sm">
                        <span className="font-medium text-slate-900">{featuredArticle.author}</span>
                        <span className="mx-2">•</span>
                        <span>{featuredArticle.publishDate}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <AdBanner slot="home-middle" className="my-12" />

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Latest Guides</h2>
              <div className="space-y-8">
                {latestArticles.map((article) => (
                  <Link key={article.id} to={`/article/${article.slug}`} className="flex flex-col md:flex-row gap-6 group">
                    <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden">
                      <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 py-2">
                      <span className="text-money-600 text-xs font-bold uppercase tracking-wider mb-2 block">{article.category}</span>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">{article.title}</h3>
                      <p className="text-slate-600 mb-4 line-clamp-2 text-sm md:text-base">{article.summary}</p>
                      <div className="flex items-center text-slate-400 text-xs">
                        <span>{article.publishDate}</span>
                        <span className="mx-2">•</span>
                        <span>5 min read</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <NewsletterSignup />
            <AdBanner slot="sidebar-top" format="rectangle" />
          </aside>

        </div>
      </div>
    </div>
  );
};
