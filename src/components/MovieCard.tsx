import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Ticket, Info } from 'lucide-react';
import type{ Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="group relative bg-brand-800 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-brand-500/20 border border-brand-700/50">
      {/* Image Container - Clickable to go to Details */}
      <div className="aspect-2/3 overflow-hidden relative">
        <Link to={`/movie/${movie.id}`} className="block w-full h-full cursor-pointer">
          <img 
            src={movie.image} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-900 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
        </Link>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="flex gap-2 pointer-events-auto">
             <Link 
              to={`/booking/${movie.id}`}
              className="flex-1 bg-brand-500 hover:bg-brand-400 text-white font-bold py-3 px-2 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/30 transition-all active:scale-95 text-sm"
            >
              <Ticket size={16} />
              Book
            </Link>
            <Link 
              to={`/movie/${movie.id}`}
              className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-3 px-2 rounded-xl flex items-center justify-center gap-2 border border-white/10 transition-all active:scale-95 text-sm"
            >
              <Info size={16} />
              Details
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/movie/${movie.id}`} className="hover:text-brand-400 transition-colors block flex-1">
            <h3 className="text-lg font-bold text-white truncate pr-2">{movie.title}</h3>
          </Link>
          <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded-md text-xs font-bold shrink-0">
            <Star size={12} fill="currentColor" />
            {movie.rating}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
          <Clock size={12} />
          <span>{movie.duration}</span>
          <span className="mx-1">•</span>
          <span className="truncate">{movie.genre.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;