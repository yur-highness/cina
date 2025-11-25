import type{ Booking } from '../../types';

const BOOKINGS_KEY = 'cinesphere_bookings';

export const getBookings = (): Booking[] => {
  try {
    const data = localStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading bookings", e);
    return [];
  }
};

export const saveBooking = (booking: Booking): void => {
  const current = getBookings();
  const updated = [booking, ...current];
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
};

export const updateBookingStatus = (id: string, status: 'confirmed' | 'cancelled'): void => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(b => 
    b.id === id ? { ...b, status } : b
  );
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
};

export const clearBookings = (): void => {
  localStorage.removeItem(BOOKINGS_KEY);
};