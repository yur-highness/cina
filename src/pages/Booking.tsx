import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_MOVIES, SHOWTIMES, DAYS } from '../../constants';
import type{ Seat, Booking } from '../../types';
import { saveBooking } from '../services/storageService';
import { ChevronLeft, Calendar, Clock, Check } from 'lucide-react';

const ROWS = 8;
const COLS = 8;

const BookingPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = MOCK_MOVIES.find(m => m.id === id);

  const [selectedDate, setSelectedDate] = useState(DAYS[0]);
  const [selectedTime, setSelectedTime] = useState(SHOWTIMES[0]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize seats
  useEffect(() => {
    const newSeats: Seat[] = [];
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const rowChar = String.fromCharCode(65 + i);
        const isVip = i >= 5; // Last 3 rows are VIP
        const isOccupied = Math.random() < 0.3; // Random occupancy
        newSeats.push({
          id: `${rowChar}${j + 1}`,
          row: rowChar,
          number: j + 1,
          status: isOccupied ? 'occupied' : isVip ? 'vip' : 'available',
          priceModifier: isVip ? 5 : 0
        });
      }
    }
    setSeats(newSeats);
  }, [id, selectedDate, selectedTime]);

  const toggleSeat = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'occupied') return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
    } else {
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const calculateTotal = () => {
    if (!movie) return 0;
    return selectedSeats.reduce((total, seatId) => {
      const seat = seats.find(s => s.id === seatId);
      return total + movie.price + (seat?.priceModifier || 0);
    }, 0);
  };

  const handleBooking = () => {
    if (!movie) return;
    setIsProcessing(true);

    setTimeout(() => {
      const booking: Booking = {
        id: Math.random().toString(36).substr(2, 9),
        movieId: movie.id,
        movieTitle: movie.title,
        movieImage: movie.image,
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats,
        totalAmount: calculateTotal(),
        bookingDate: new Date().toISOString(),
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BOOK-${Date.now()}`,
        status: 'confirmed'
      };

      saveBooking(booking);
      setIsProcessing(false);
      navigate('/tickets');
    }, 1500);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-brand-900 pt-20 pb-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Selection */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
             <button 
              onClick={() => navigate(-1)}
              className="bg-brand-800 p-2 rounded-full text-white hover:bg-brand-700"
            >
              <ChevronLeft />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
              <p className="text-gray-400 text-sm">{movie.genre.join(', ')} • {movie.duration}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-brand-800 p-6 rounded-2xl border border-brand-700/50">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Calendar size={18}/> Select Date</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {DAYS.map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedDate === day 
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                      : 'bg-brand-900 text-gray-400 hover:bg-brand-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <h3 className="text-white font-bold mb-4 mt-4 flex items-center gap-2"><Clock size={18}/> Select Time</h3>
            <div className="flex flex-wrap gap-3">
              {SHOWTIMES.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedTime === time 
                      ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' 
                      : 'bg-brand-900 text-gray-400 hover:bg-brand-700'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Cinema Screen Visual */}
          <div className="bg-brand-800 p-6 rounded-2xl border border-brand-700/50 flex flex-col items-center">
            <div className="w-full h-1 bg-linear-to-r from-transparent via-brand-400 to-transparent shadow-[0_10px_30px_rgba(129,140,248,0.5)] mb-12 rounded-full opacity-50"></div>
            
            {/* Seats Grid */}
            <div className="grid gap-3 mb-8" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
              {seats.map(seat => {
                let colorClass = 'bg-brand-900 border-brand-700 text-gray-500 hover:border-brand-500 hover:text-brand-400'; // Available
                if (seat.status === 'occupied') colorClass = 'bg-gray-700 border-transparent text-gray-600 cursor-not-allowed opacity-50';
                if (selectedSeats.includes(seat.id)) colorClass = 'bg-brand-500 border-brand-400 text-white shadow-lg shadow-brand-500/50 scale-105';
                else if (seat.status === 'vip') colorClass = 'bg-brand-900 border-purple-500/50 text-purple-400 hover:bg-purple-500/10';

                return (
                  <button
                    key={seat.id}
                    disabled={seat.status === 'occupied'}
                    onClick={() => toggleSeat(seat.id)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center text-xs font-medium transition-all duration-200 ${colorClass}`}
                  >
                    {seat.status === 'occupied' ? 'X' : seat.id}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 text-xs text-gray-400">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-brand-900 border border-brand-700"></div> Available</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-brand-500"></div> Selected</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-purple-900 border border-purple-500"></div> VIP (+$5)</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-gray-700 opacity-50"></div> Sold</div>
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1">
          <div className="bg-brand-800 p-6 rounded-2xl border border-brand-700 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Booking Summary</h2>
            
            <div className="flex gap-4 mb-6">
              <img src={movie.image} alt="Poster" className="w-20 h-28 object-cover rounded-lg shadow-md" />
              <div>
                <h3 className="text-white font-bold">{movie.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{selectedDate}</p>
                <p className="text-gray-400 text-sm">{selectedTime}</p>
              </div>
            </div>

            <div className="border-t border-brand-700 py-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Seats ({selectedSeats.length})</span>
                <span className="text-white font-medium">{selectedSeats.join(', ')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-300">
                <span>Price</span>
                <span>${movie.price} / ticket</span>
              </div>
            </div>

            <div className="border-t border-brand-700 py-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="text-gray-300">Total Amount</span>
                <span className="text-2xl font-bold text-brand-400">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={selectedSeats.length === 0 || isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                selectedSeats.length === 0 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-linear-to-r from-brand-500 to-brand-accent text-white shadow-lg shadow-brand-500/30 hover:scale-[1.02]'
              }`}
            >
              {isProcessing ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                  Confirm Booking <Check size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;