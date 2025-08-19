import { create } from "zustand";

export interface Guitar {
  id: number| string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  brand: string;
  condition: string;
  rating: number;
  reviews: number;
  isFeatured: boolean;
  isOnSale: boolean;
}

interface WishlistStore {
  items: Guitar[];
  addToWishlist: (guitar: Guitar) => void;
  removeFromWishlist: (guitarId: string) => void;
  isInWishlist: (guitarId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  addToWishlist: (guitar: Guitar) => {
    const { items } = get();
    if (!items.find((item) => item.id === guitar.id)) {
      set({ items: [...items, guitar] });
    }
  },

  removeFromWishlist: (guitarId: string) => {
    const { items } = get();
    set({ items: items.filter((item) => item.id !== guitarId) });
  },

  isInWishlist: (guitarId: string) => {
    const { items } = get();
    return items.some((item) => item.id === guitarId);
  },

  clearWishlist: () => {
    set({ items: [] });
  },
}));
