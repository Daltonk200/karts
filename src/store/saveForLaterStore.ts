import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SavedItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  skinType: string;
  size: string;
  savedAt: Date;
}

interface SaveForLaterStore {
  items: SavedItem[];
  addToSaved: (item: Omit<SavedItem, "savedAt">) => void;
  removeFromSaved: (itemId: string) => void;
  clearSaved: () => void;
  getSavedCount: () => number;
  isSaved: (itemId: string) => boolean;
  moveToCart: (itemId: string) => SavedItem | null;
}

export const useSaveForLaterStore = create<SaveForLaterStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToSaved: (item) => {
        const { items } = get();
        const existingItem = items.find(
          (savedItem) => savedItem.id === item.id
        );

        if (!existingItem) {
          set({
            items: [...items, { ...item, savedAt: new Date() }],
          });
        }
      },

      removeFromSaved: (itemId) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== itemId) });
      },

      clearSaved: () => {
        set({ items: [] });
      },

      getSavedCount: () => {
        const { items } = get();
        return items.length;
      },

      isSaved: (itemId) => {
        const { items } = get();
        return items.some((item) => item.id === itemId);
      },

      moveToCart: (itemId) => {
        const { items } = get();
        const item = items.find((savedItem) => savedItem.id === itemId);

        if (item) {
          set({ items: items.filter((savedItem) => savedItem.id !== itemId) });
          return item;
        }

        return null;
      },
    }),
    {
      name: "save-for-later-storage", // unique name for localStorage key
    }
  )
);
