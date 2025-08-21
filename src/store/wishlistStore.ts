import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CosmeticProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  skinType: string;
  size: string;
  isFeatured: boolean;
}

interface WishlistStore {
  items: CosmeticProduct[];
  addToWishlist: (product: CosmeticProduct) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product: CosmeticProduct) => {
        const { items } = get();
        if (!items.find((item) => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },

      removeFromWishlist: (productId: string) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== productId) });
      },

      isInWishlist: (productId: string) => {
        const { items } = get();
        return items.some((item) => item.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: "wishlist-storage", // unique name for localStorage key
    }
  )
);
