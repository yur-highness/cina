import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_MOVIES } from '../../constants';
import MovieCard from '../components/MovieCard';
import { Play, Info } from 'lucide-react';

const Home: React.FC = () => {
  const featuredMovie = MOCK_MOVIES[0];
  const nowPlaying = useMemo(() => MOCK_MOVIES.filter(m => m.status === 'now_playing'), []);
  const comingSoon = useMemo(() => MOCK_MOVIES.filter(m => m.status === 'coming_soon'), []);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={featuredMovie.backdrop} 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-900 via-brand-900/50 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-brand-900 via-brand-900/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex items-end">
          <div className="max-w-3xl animate-slideUp">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-500/20 text-brand-400 text-sm font-bold mb-4 border border-brand-500/20">
              #1 Trending in Sci-Fi
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
              {featuredMovie.title}
            </h1>
            <p className="text-lg text-gray-300 mb-8 line-clamp-3 max-w-xl">
              {featuredMovie.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to={`/booking/${featuredMovie.id}`}
                className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-brand-500/30 active:scale-95"
              >
                <Play fill="currentColor" size={20} />
                Book Tickets
              </Link>
              <Link 
                to={`/movie/${featuredMovie.id}`}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all border border-white/10"
              >
                <Info size={20} />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {/* Now Playing */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-brand-500 rounded-full"></span>
              Now Playing
            </h2>
            <Link to="#" className="text-brand-400 hover:text-brand-300 text-sm font-medium">View All</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nowPlaying.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mb-16">
           <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-brand-accent rounded-full"></span>
              Coming Soon
            </h2>
            <Link to="#" className="text-brand-accent hover:text-pink-400 text-sm font-medium">View All</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {comingSoon.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;