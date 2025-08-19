import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  condition: string;
  quantity: number;
  stock: number;
  model: string;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getUniqueItems: () => number;
  getTotalPrice: () => number;
  isInCart: (itemId: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const { items } = get();
        const existingItem = items.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
          // If item exists, increase quantity (no stock limit)
          set({
            items: items.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
          });
        } else {
          // If item doesn't exist, add it with quantity 1
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },

      removeFromCart: (itemId) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          set({ items: items.filter((item) => item.id !== itemId) });
        } else {
          // Update quantity (no stock limit)
          set({
            items: items.map((cartItem) =>
              cartItem.id === itemId
                ? { ...cartItem, quantity: quantity }
                : cartItem
            ),
          });
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getUniqueItems: () => {
        const { items } = get();
        return items.length;
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      isInCart: (itemId) => {
        const { items } = get();
        return items.some((item) => item.id === itemId);
      },
    }),
    {
      name: "cart-storage", // unique name for localStorage key
    }
  )
);
