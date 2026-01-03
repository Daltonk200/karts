import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  kartType?: string;
  quantity: number;
  stock: number;
  model?: string;
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
  syncCart: () => Promise<void>;
  isSyncing: boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isSyncing: false,

      // Sync cart with database if user is logged in
      syncCart: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
        if (!token) return; // Guest users - no sync needed

        set({ isSyncing: true });
        try {
          // Fetch cart from API
          const response = await fetch("/api/cart", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            const dbItems = (data.cart || []).map((item: any) => ({
              id: item.productId?._id || item.productId || "",
              name: item.name,
              price: item.price,
              image: item.image,
              category: "",
              brand: "",
              quantity: item.quantity,
              stock: 0,
            }));

            // Merge with local cart (prefer local if exists, otherwise use DB)
            const { items: localItems } = get();
            if (localItems.length > 0) {
              // Merge: update DB with local items
              try {
                const syncResponse = await fetch("/api/cart", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    action: "replaceAll",
                    items: localItems.map(item => ({
                      productId: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
                      quantity: item.quantity,
                    })),
                  }),
                });
                
                if (!syncResponse.ok) {
                  console.error("Failed to sync cart to database");
                }
              } catch (syncError) {
                console.error("Error syncing cart:", syncError);
              }
            } else {
              // Use DB items if local is empty
              set({ items: dbItems });
            }
          }
        } catch (error) {
          console.error("Error syncing cart:", error);
        } finally {
          set({ isSyncing: false });
        }
      },

      addToCart: async (item) => {
        const { items } = get();
        const existingItem = items.find((cartItem) => cartItem.id === item.id);

        let updatedItems: CartItem[];
        if (existingItem) {
          updatedItems = items.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          updatedItems = [...items, { ...item, quantity: 1 }];
        }

        set({ items: updatedItems });

        // Sync with database if user is logged in
        const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
        if (token) {
          try {
            await fetch("/api/cart", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                productId: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1,
              }),
            });
          } catch (error) {
            console.error("Error syncing cart to database:", error);
          }
        }
      },

      removeFromCart: async (itemId: string) => {
        const { items } = get();
        const updatedItems = items.filter((item) => item.id !== itemId);
        set({ items: updatedItems });

        // Sync with database if user is logged in
        const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
        if (token) {
          try {
            await fetch("/api/cart", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                action: "removeItem",
                productId: itemId,
              }),
            });
          } catch (error) {
            console.error("Error syncing cart to database:", error);
          }
        }
      },

      updateQuantity: async (itemId: string, quantity: number) => {
        const { items } = get();
        let updatedItems: CartItem[];
        
        if (quantity <= 0) {
          updatedItems = items.filter((item) => item.id !== itemId);
        } else {
          updatedItems = items.map((cartItem) =>
            cartItem.id === itemId
              ? { ...cartItem, quantity: quantity }
              : cartItem
          );
        }

        set({ items: updatedItems });

        // Sync with database if user is logged in
        const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
        if (token) {
          try {
            await fetch("/api/cart", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                action: "updateQuantity",
                productId: itemId,
                quantity: quantity,
              }),
            });
          } catch (error) {
            console.error("Error syncing cart to database:", error);
          }
        }
      },

      clearCart: async () => {
        set({ items: [] });

        // Sync with database if user is logged in
        const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
        if (token) {
          try {
            await fetch("/api/cart", {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } catch (error) {
            console.error("Error syncing cart to database:", error);
          }
        }
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

      isInCart: (itemId: string) => {
        const { items } = get();
        return items.some((item) => item.id === itemId);
      },
    }),
    {
      name: "cart-storage", // unique name for localStorage key
    }
  )
);
