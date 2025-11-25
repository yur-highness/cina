import type{ Movie, NewsArticle } from './types';

export const MOCK_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Cyber Horizon',
    genre: ['Sci-Fi', 'Action'],
    rating: 8.7,
    duration: '2h 15m',
    image: 'https://picsum.photos/seed/cyber/300/450',
    backdrop: 'https://picsum.photos/seed/cyber/1200/600',
    description: 'In a future where consciousness is currency, a rogue hacker uncovers a conspiracy that threatens to wipe out humanity\'s digital existence.',
    director: 'Elena Void',
    cast: ['Alex Mercer', 'Sarah Connor', 'Neo Anderson'],
    price: 12,
    status: 'now_playing',
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0'
  },
  {
    id: '2',
    title: 'The Last Alchemist',
    genre: ['Fantasy', 'Adventure'],
    rating: 9.1,
    duration: '2h 45m',
    image: 'https://picsum.photos/seed/magic/300/450',
    backdrop: 'https://picsum.photos/seed/magic/1200/600',
    description: 'An ancient order returns to reclaim the lost city of Gold. One young alchemist stands between them and infinite power.',
    director: 'Guillermo Del Toro-ish',
    cast: ['Tom Hollander', 'Emma Stone-ish', 'Ian McKellen-ish'],
    price: 14,
    status: 'now_playing',
    trailerUrl: 'https://www.youtube.com/embed/d73bCqiAPLI'
  },
  {
    id: '3',
    title: 'Velocity Shift',
    genre: ['Action', 'Thriller'],
    rating: 7.5,
    duration: '1h 50m',
    image: 'https://picsum.photos/seed/cars/300/450',
    backdrop: 'https://picsum.photos/seed/cars/1200/600',
    description: 'Street racers are recruited by an underground agency to transport a volatile energy source across the wasteland.',
    director: 'Michael Bay-ish',
    cast: ['Vin Diesel-ish', 'The Rock-ish'],
    price: 12,
    status: 'now_playing',
    trailerUrl: 'https://www.youtube.com/embed/2t12Y2G8I90'
  },
  {
    id: '4',
    title: 'Echoes of Silence',
    genre: ['Drama', 'Mystery'],
    rating: 8.2,
    duration: '2h 05m',
    image: 'https://picsum.photos/seed/drama/300/450',
    backdrop: 'https://picsum.photos/seed/drama/1200/600',
    description: 'A detective solves a cold case only to realize the clues point to his own forgotten past.',
    director: 'Christopher Nolan-ish',
    cast: ['Leonardo DiCaprio-ish', 'Jessica Chastain-ish'],
    price: 10,
    status: 'coming_soon',
    trailerUrl: 'https://www.youtube.com/embed/JfVOs4VSpmA'
  },
  {
    id: '5',
    title: 'Nebula Hearts',
    genre: ['Romance', 'Sci-Fi'],
    rating: 7.8,
    duration: '1h 55m',
    image: 'https://picsum.photos/seed/space/300/450',
    backdrop: 'https://picsum.photos/seed/space/1200/600',
    description: 'Love transcends lightyears as two astronauts separated by a black hole communicate through quantum entanglement.',
    director: 'Greta Gerwig-ish',
    cast: ['Timothée Chalamet-ish', 'Saoirse Ronan-ish'],
    price: 12,
    status: 'now_playing',
    trailerUrl: 'https://www.youtube.com/embed/h25ZbdM-GvY'
  },
  {
    id: '6',
    title: 'Shadows of Tokyo',
    genre: ['Animation', 'Action'],
    rating: 9.5,
    duration: '1h 40m',
    image: 'https://picsum.photos/seed/anime/300/450',
    backdrop: 'https://picsum.photos/seed/anime/1200/600',
    description: 'A ronin in neo-Tokyo fights against the Yakuza syndicates controlling the city\'s water supply.',
    director: 'Hayao Miyazaki-ish',
    cast: ['Voice Actor A', 'Voice Actor B'],
    price: 13,
    status: 'coming_soon',
    trailerUrl: 'https://www.youtube.com/embed/4Jp7l77t0fA'
  }
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'Oscars 2024: Complete List of Nominations',
    category: 'Awards',
    image: 'https://picsum.photos/seed/oscar/600/400',
    excerpt: 'The Academy has revealed the nominees for the 96th Academy Awards. "The Last Alchemist" leads the pack with 12 nominations including Best Picture.',
    date: 'Mar 15, 2024',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Review: "Cyber Horizon" is a Visual Masterpiece',
    category: 'Reviews',
    image: 'https://picsum.photos/seed/review/600/400',
    excerpt: 'Elena Void\'s latest sci-fi thriller sets a new standard for visual effects, though the plot sometimes struggles to keep up with the spectacle.',
    date: 'Mar 14, 2024',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Golden Globes Highlights: Best Moments',
    category: 'Awards',
    image: 'https://picsum.photos/seed/globes/600/400',
    excerpt: 'From surprising wins to emotional speeches, here are the most memorable moments from last night\'s Golden Globe ceremony.',
    date: 'Mar 10, 2024',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Box Office: "Velocity Shift" Smashes Records',
    category: 'Box Office',
    image: 'https://picsum.photos/seed/money/600/400',
    excerpt: 'The high-octane action film grossed over $150M globally in its opening weekend, signaling a strong return for the summer blockbuster.',
    date: 'Mar 08, 2024',
    readTime: '3 min read'
  },
  {
    id: '5',
    title: 'Cannes Film Festival Announces Jury President',
    category: 'Festivals',
    image: 'https://picsum.photos/seed/cannes/600/400',
    excerpt: 'The prestigious festival has selected a legendary director to lead this year\'s jury. Find out who will decide the next Palme d\'Or winner.',
    date: 'Mar 05, 2024',
    readTime: '4 min read'
  },
  {
    id: '6',
    title: 'Upcoming Releases: What to Watch This Spring',
    category: 'Movies',
    image: 'https://picsum.photos/seed/spring/600/400',
    excerpt: 'A curated list of the most anticipated films hitting theaters this season, from indie darlings to major franchise installments.',
    date: 'Mar 01, 2024',
    readTime: '7 min read'
  }
];

export const SHOWTIMES = ['10:30 AM', '1:15 PM', '4:30 PM', '7:45 PM', '10:15 PM'];

export const DAYS = ['Today', 'Tomorrow', 'Wed, 24', 'Thu, 25', 'Fri, 26'];