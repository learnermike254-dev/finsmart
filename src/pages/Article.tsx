import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_ARTICLES } from '../constants';
import { generateArticleContent, generateArticleMetadata, askAIAboutArticle } from '../services/gemini';
import { AdBanner } from '../components/AdBanner';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { Loader2, AlertCircle, Sparkles, Send } from 'lucide-react';
import type { Article as ArticleType } from '../types';

export const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // State
  const [articleData, setArticleData] = useState<ArticleType | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Chat State
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatAnswer, setChatAnswer] = useState<string | null>(null);
  const [isChatting, setIsChatting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadArticle();
  }, [slug]);

  const loadArticle = async () => {
    setIsLoading(true);
    setError(null);
    setContent(null);
    setChatAnswer(null);

    try {
      // 1. Check if it's a hardcoded starter article
      const existing = INITIAL_ARTICLES.find(a => a.slug === slug);
      
      if (existing) {
        setArticleData(existing);
        // Generate body
        const html = await generateArticleContent(existing.title, existing.category);
        setContent(html);
      } else {
        // 2. It's a DYNAMIC article (Self-updating feature)
        // Generate metadata first
        if (!slug) throw new Error("No slug");
        const meta = await generateArticleMetadata(slug);
        
        const newArticle: ArticleType = {
          id: slug,
          slug: slug,
          title: meta.title,
          category: meta.category,
          summary: meta.summary,
          author: meta.author || "FinSmart AI",
          publishDate: new Date().toLocaleDateString(),
          imageUrl: `https://picsum.photos/seed/${slug}/800/600`
        };
        
        setArticleData(newArticle);
        
        // Generate body
        const html = await generateArticleContent(meta.title, meta.category);
        setContent(html);
      }
    } catch (err) {
      console.error(err);
      setError("We couldn't generate this article right now. Please check your connection or API Key.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAiChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuestion.trim() || !content) return;
    
    setIsChatting(true);
    try {
      const answer = await askAIAboutArticle(chatQuestion, content);
      setChatAnswer(answer);
    } catch (e) {
      setChatAnswer("Sorry, I'm having trouble thinking right now.");
    } finally {
      setIsChatting(false);
    }
  };

  if (isLoading && !articleData) {
     return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="w-12 h-12 text-brand-600 animate-spin mb-4" />
            <p className="text-slate-500 text-lg">FinSmart AI is writing your article...</p>
        </div>
     );
  }

  if (error) {
    return (
        <div className="max-w-4xl mx-auto py-20 px-4 text-center">
            <div className="bg-red-50 text-red-600 p-8 rounded-xl">
                <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Generation Failed</h2>
                <p>{error}</p>
                <Link to="/" className="inline-block mt-6 text-brand-600 hover:underline">Return Home</Link>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Article Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-money-400 font-bold uppercase tracking-wider text-sm mb-4 block">
            {articleData?.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {articleData?.title}
          </h1>
          <div className="flex items-center justify-center space-x-4 text-slate-300 text-sm">
            <span className="font-medium text-white">{articleData?.author}</span>
            <span>•</span>
            <span>{articleData?.publishDate}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
            <img 
                src={articleData?.imageUrl} 
                alt={articleData?.title}
                className="w-full h-[400px] object-cover rounded-xl mb-10 shadow-md"
            />
            
            {isLoading ? (
               <div className="space-y-4 animate-pulse">
                 <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                 <div className="h-4 bg-slate-200 rounded w-full"></div>
                 <div className="h-4 bg-slate-200 rounded w-5/6"></div>
               </div>
            ) : (
              <article 
                className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-brand-600 hover:prose-a:text-brand-500 prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: content || '' }}
              />
            )}

            <AdBanner slot="article-bottom" className="mt-8" />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
            
            {/* AI Assistant Widget */}
            <div className="bg-brand-50 border border-brand-200 p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-brand-800">
                    <Sparkles className="w-5 h-5 text-brand-600" />
                    <h3 className="font-bold">Ask AI about this topic</h3>
                </div>
                
                {chatAnswer && (
                    <div className="bg-white p-3 rounded-lg text-sm text-slate-700 mb-4 border border-brand-100">
                        {chatAnswer}
                    </div>
                )}

                <form onSubmit={handleAiChat} className="relative">
                    <input 
                        type="text" 
                        placeholder="e.g., Explain this in simple terms..."
                        className="w-full p-3 pr-10 rounded-lg border border-brand-200 focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                        value={chatQuestion}
                        onChange={e => setChatQuestion(e.target.value)}
                        disabled={isChatting}
                    />
                    <button 
                        type="submit" 
                        disabled={isChatting}
                        className="absolute right-2 top-2.5 text-brand-600 hover:text-brand-800 disabled:opacity-50"
                    >
                        {isChatting ? <Loader2 className="w-5 h-5 animate-spin"/> : <Send className="w-5 h-5" />}
                    </button>
                </form>
            </div>

            <AdBanner slot="sidebar-article" format="rectangle" />
            <NewsletterSignup />
        </aside>
      </div>
    </div>
  );
};
