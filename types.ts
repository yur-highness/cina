export interface Movie {
  id: string;
  title: string;
  genre: string[];
  rating: number;
  duration: string;
  image: string;
  backdrop: string;
  description: string;
  director: string;
  cast: string[];
  price: number;
  status: 'now_playing' | 'coming_soon';
  trailerUrl: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'occupied' | 'selected' | 'vip';
  priceModifier: number;
}

export interface Booking {
  id: string;
  movieId: string;
  movieTitle: string;
  movieImage: string;
  date: string;
  time: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  qrCode: string;
  status: 'confirmed' | 'cancelled';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export enum AppRoute {
  HOME = '/',
  DETAILS = '/movie/:id',
  BOOKING = '/booking/:id',
  TICKETS = '/tickets',
  AI_CHAT = '/ai-chat',
  NEWS = '/news',
}