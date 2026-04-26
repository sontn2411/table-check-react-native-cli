import { create } from 'zustand';

interface BookingState {
  location: string;
  date: Date;
  time: string;
  guests: string;

  // Actions
  setLocation: (location: string) => void;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
  setGuests: (guests: string) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>(set => ({
  location: 'Hà Nội',
  date: new Date(),
  time: '19:00',
  guests: '2',

  setLocation: location => set({ location }),
  setDate: date => set({ date }),
  setTime: time => set({ time }),
  setGuests: guests => set({ guests }),
  resetBooking: () =>
    set({
      location: 'Hà Nội',
      date: new Date(),
      time: '19:00',
      guests: '2',
    }),
}));
