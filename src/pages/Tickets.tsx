import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBookings, clearBookings, updateBookingStatus } from '../services/storageService';
import type{ Booking } from '../../types';
import { Ticket, Calendar, Clock, MapPin, Trash2, Eye, X, Slash } from 'lucide-react';

const Tickets: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Booking | null>(null);

  useEffect(() => {
    refreshBookings();
  }, []);

  const refreshBookings = () => {
    setBookings(getBookings());
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire booking history?")) {
      clearBookings();
      setBookings([]);
    }
  };

  const handleCancelBooking = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) {
      updateBookingStatus(id, 'cancelled');
      refreshBookings();
      if (selectedTicket?.id === id) {
        setSelectedTicket(null); // Close modal if open
      }
    }
  };

  const openTicketDetails = (booking: Booking) => {
    setSelectedTicket(booking);
  };

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-brand-900 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-brand-800 rounded-full flex items-center justify-center mb-6 text-brand-400">
          <Ticket size={40} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No Tickets Yet</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't booked any movies yet.</p>
        <Link to="/" className="bg-brand-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-400 transition-colors">
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-900 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Tickets</h1>
          <button 
            onClick={handleClearHistory}
            className="text-gray-400 hover:text-red-400 text-sm flex items-center gap-2 transition-colors"
          >
            <Trash2 size={16} /> Clear History
          </button>
        </div>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className={`bg-brand-800 rounded-2xl overflow-hidden border transition-all flex flex-col md:flex-row shadow-xl relative ${
                booking.status === 'cancelled' 
                  ? 'border-gray-700 opacity-60 grayscale' 
                  : 'border-brand-700 hover:border-brand-500/50'
              }`}
            >
              {/* Cancelled Overlay Badge */}
              {booking.status === 'cancelled' && (
                <div className="absolute top-4 right-4 z-20 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider transform rotate-12 shadow-lg border border-red-400">
                  Cancelled
                </div>
              )}

              {/* Movie Image */}
              <div className="md:w-48 h-48 md:h-auto relative shrink-0">
                <img src={booking.movieImage} alt={booking.movieTitle} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-brand-800 to-transparent md:hidden" />
              </div>

              {/* Ticket Info */}
              <div className="flex-1 p-6 flex flex-col justify-center border-r border-dashed border-brand-700 relative">
                {/* Notch */}
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-brand-900 rounded-full z-10 hidden md:block"></div>
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-brand-900 rounded-full z-10 hidden md:block"></div>

                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-bold text-white">{booking.movieTitle}</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-brand-400"/> {booking.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-brand-400"/> {booking.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-brand-400"/> Hall 4, CineSphere
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket size={16} className="text-brand-400"/> Seats: {booking.seats.join(', ')}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                   <p className="text-xs text-gray-500">ID: {booking.id.toUpperCase()}</p>
                   
                   <div className="flex gap-3">
                      {booking.status === 'confirmed' && (
                        <button 
                          onClick={(e) => handleCancelBooking(booking.id, e)}
                          className="px-4 py-2 text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                        >
                          Cancel
                        </button>
                      )}
                      <button 
                        onClick={() => openTicketDetails(booking)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-brand-700 hover:bg-brand-600 text-white rounded-lg transition-colors border border-brand-600"
                      >
                        <Eye size={16} /> View Details
                      </button>
                   </div>
                </div>
              </div>

              {/* QR Code Section (Hidden on mobile for compactness, visible in modal) */}
              <div className="bg-white p-6 hidden md:flex flex-col items-center justify-center w-48 shrink-0 relative overflow-hidden">
                {booking.status === 'cancelled' && (
                   <div className="absolute inset-0 bg-gray-200/90 flex items-center justify-center z-10">
                      <Slash className="text-gray-400 w-full h-full p-8" />
                   </div>
                )}
                <img src={booking.qrCode} alt="QR Code" className={`w-24 h-24 mb-2 ${booking.status === 'cancelled' ? 'opacity-20' : ''}`} />
                <span className={`text-black font-mono font-bold text-sm tracking-widest ${booking.status === 'cancelled' ? 'text-gray-400' : ''}`}>SCAN ME</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-brand-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-brand-700 relative animate-slideUp">
            <button 
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/20 p-2 rounded-full z-20"
            >
              <X size={20} />
            </button>

            {/* Modal Header Image */}
            <div className="h-40 relative">
              <img src={selectedTicket.movieImage} alt={selectedTicket.movieTitle} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-brand-800" />
              <div className="absolute bottom-4 left-6">
                <h2 className="text-2xl font-bold text-white shadow-black drop-shadow-md">{selectedTicket.movieTitle}</h2>
                <div className="flex gap-2 text-sm text-gray-200 mt-1">
                   <span className="bg-brand-500/80 px-2 py-0.5 rounded text-xs backdrop-blur-md">{selectedTicket.status === 'cancelled' ? 'Cancelled' : 'Confirmed'}</span>
                   <span>•</span>
                   <span>{selectedTicket.date}</span>
                </div>
              </div>
            </div>

            {/* Ticket Details Body */}
            <div className="p-6 space-y-6">
              {/* QR Code */}
              <div className="flex justify-center">
                 <div className="bg-white p-4 rounded-xl shadow-lg relative">
                    {selectedTicket.status === 'cancelled' && (
                       <div className="absolute inset-0 flex items-center justify-center bg-white/90">
                          <span className="text-red-500 font-bold border-2 border-red-500 px-2 py-1 transform -rotate-12 rounded">VOID</span>
                       </div>
                    )}
                    <img src={selectedTicket.qrCode} alt="QR" className="w-40 h-40" />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-brand-900/50 p-4 rounded-xl border border-brand-700/50">
                 <div>
                    <p className="text-xs text-gray-500 uppercase">Time</p>
                    <p className="text-white font-medium">{selectedTicket.time}</p>
                 </div>
                 <div>
                    <p className="text-xs text-gray-500 uppercase">Seats</p>
                    <p className="text-white font-medium">{selectedTicket.seats.join(', ')}</p>
                 </div>
                 <div>
                    <p className="text-xs text-gray-500 uppercase">Hall</p>
                    <p className="text-white font-medium">Screen 4</p>
                 </div>
                 <div>
                    <p className="text-xs text-gray-500 uppercase">Booking ID</p>
                    <p className="text-white font-mono text-sm">{selectedTicket.id.toUpperCase()}</p>
                 </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-brand-700">
                <span className="text-gray-400">Total Paid</span>
                <span className={`text-2xl font-bold ${selectedTicket.status === 'cancelled' ? 'text-gray-500 line-through' : 'text-brand-400'}`}>
                  ${selectedTicket.totalAmount.toFixed(2)}
                </span>
              </div>

              {selectedTicket.status === 'confirmed' && (
                <button 
                  onClick={(e) => handleCancelBooking(selectedTicket.id, e)}
                  className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-medium text-sm"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;