import React, { useState } from 'react';
import { MOCK_NEWS } from '../../constants';
import { Search, Clock, ArrowRight, Award } from 'lucide-react';

const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Awards', 'Reviews', 'Movies', 'Box Office', 'Festivals'];

  const filteredNews = activeCategory === 'All' 
    ? MOCK_NEWS 
    : MOCK_NEWS.filter(n => n.category === activeCategory);

  return (
    <div className="min-h-screen bg-brand-900 pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 flex items-center gap-3">
              <Award className="text-brand-500" size={48} />
              <span>News & <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-400 to-brand-accent">Awards</span></span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              The latest coverage on Oscars, Golden Globes, box office hits, and exclusive movie reviews.
            </p>
          </div>
          
          {/* Search (Visual only for now) */}
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-brand-800 border border-brand-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-white text-brand-900'
                  : 'bg-brand-800 text-gray-400 hover:bg-brand-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <div key={news.id} className="group bg-brand-800 rounded-2xl overflow-hidden border border-brand-700 hover:border-brand-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10">
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-brand-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                  {news.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <span>{news.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {news.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors line-clamp-2">
                  {news.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {news.excerpt}
                </p>

                <button className="text-brand-400 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read Full Story <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Box */}
        <div className="mt-20 bg-linear-to-r from-brand-800 to-brand-900 rounded-3xl p-8 md:p-12 border border-brand-700 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Awards Season Updates</h2>
            <p className="text-gray-300 mb-8">Get the latest predictions, winner announcements, and red carpet coverage delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-brand-900/50 border border-brand-600 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-400 transition-colors"
              />
              <button className="bg-brand-500 hover:bg-brand-400 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-brand-500/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;