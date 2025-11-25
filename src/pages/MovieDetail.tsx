import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_MOVIES } from '../../constants';
import { Star, Calendar, Clock, Users, Ticket, ChevronLeft, PlayCircle, ThumbsUp, Award } from 'lucide-react';

const MovieDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = MOCK_MOVIES.find(m => m.id === id);

  if (!movie) {
    return <div className="min-h-screen flex items-center justify-center text-white">Movie not found</div>;
  }

  return (
    <div className="min-h-screen bg-brand-900 pt-16">
      {/* Header */}
      <div className="relative h-[50vh] lg:h-[600px]">
        <img 
          src={movie.backdrop} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/60 to-transparent" />
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 md:top-8 md:left-8 bg-black/30 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/20 transition-colors z-20"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 flex flex-col md:flex-row items-end gap-8 z-10">
          {/* Poster */}
          <div className="hidden md:block w-48 lg:w-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-800 relative -mb-20">
            <img src={movie.image} alt={movie.title} className="w-full" />
          </div>

          {/* Info */}
          <div className="flex-1 mb-4">
             <div className="flex gap-2 mb-4">
                {movie.genre.map(g => (
                  <span key={g} className="bg-brand-500/20 text-brand-400 border border-brand-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">{g}</span>
                ))}
              </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10">
                <Star fill="currentColor" size={18} className="text-yellow-400" /> 
                <span className="font-bold text-white text-base">{movie.rating}</span>
                <span className="text-gray-400">/ 10</span>
              </div>
              <span className="flex items-center gap-2">
                <Clock size={18} className="text-gray-400" /> {movie.duration}
              </span>
              <span className="flex items-center gap-2">
                 <Calendar size={18} className="text-gray-400" /> {movie.status === 'now_playing' ? 'Now Showing' : 'Coming Soon'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Synopsis */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              Synopsis
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg border-l-4 border-brand-500 pl-6">
              {movie.description}
            </p>
          </section>

           {/* Trailer */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <PlayCircle className="text-brand-400" /> Official Trailer
            </h3>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`${movie.trailerUrl}?autoplay=0`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              ></iframe>
            </div>
          </section>

          {/* Cast & Crew */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6">Cast & Crew</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-brand-800/40 p-4 rounded-xl border border-brand-700/50 flex items-center gap-4 hover:bg-brand-800/60 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-brand-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award size={24} className="text-brand-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">{movie.director}</p>
                  <p className="text-sm text-gray-400">Director</p>
                </div>
              </div>
              {movie.cast.map((actor, idx) => (
                <div key={idx} className="bg-brand-800/40 p-4 rounded-xl border border-brand-700/50 flex items-center gap-4 hover:bg-brand-800/60 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-brand-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Users size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{actor}</p>
                    <p className="text-sm text-gray-400">Cast</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ratings & Reviews Placeholder */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ThumbsUp className="text-brand-400" /> Ratings & Reviews
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-brand-800/30 p-4 rounded-xl text-center border border-brand-700/30">
                <span className="block text-3xl font-bold text-white mb-1">{movie.rating}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">IMDb</span>
              </div>
              <div className="bg-brand-800/30 p-4 rounded-xl text-center border border-brand-700/30">
                <span className="block text-3xl font-bold text-white mb-1">92%</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Rotten Tomatoes</span>
              </div>
              <div className="bg-brand-800/30 p-4 rounded-xl text-center border border-brand-700/30">
                <span className="block text-3xl font-bold text-white mb-1">4.5/5</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Audience</span>
              </div>
               <div className="bg-brand-800/30 p-4 rounded-xl text-center border border-brand-700/30">
                <span className="block text-3xl font-bold text-white mb-1">88</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Metacritic</span>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Booking CTA */}
        <div className="lg:col-span-1">
          <div className="bg-brand-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-brand-700/50 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6">Showtimes</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between text-gray-300 bg-brand-900/50 p-4 rounded-xl border border-brand-700/30">
                <span className="flex items-center gap-2"><Calendar size={16} className="text-brand-400"/> Today</span>
                <span className="text-brand-400 font-bold text-sm bg-brand-400/10 px-2 py-1 rounded">Selling Fast</span>
              </div>
               <div className="flex gap-2 flex-wrap">
                 <span className="bg-brand-900/50 hover:bg-brand-700 text-gray-300 text-sm py-2 px-3 rounded-lg border border-brand-700/50 cursor-pointer transition-colors">10:30 AM</span>
                 <span className="bg-brand-900/50 hover:bg-brand-700 text-gray-300 text-sm py-2 px-3 rounded-lg border border-brand-700/50 cursor-pointer transition-colors">1:15 PM</span>
                 <span className="bg-brand-900/50 hover:bg-brand-700 text-gray-300 text-sm py-2 px-3 rounded-lg border border-brand-700/50 cursor-pointer transition-colors">4:30 PM</span>
               </div>
            </div>

            <button 
              onClick={() => navigate(`/booking/${movie.id}`)}
              className="w-full bg-gradient-to-r from-brand-500 to-brand-accent hover:from-brand-400 hover:to-pink-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Ticket />
              Book Tickets
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">Prices start from ${movie.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;