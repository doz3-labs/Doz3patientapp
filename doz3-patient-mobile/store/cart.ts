import { create } from "zustand";
import type { CartItem } from "../types";

interface CartState {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  remove: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clear: () => void;
}

export function useCartTotal() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
}

export function useCartCount() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  add: (item) =>
    set((s) => {
      const existing = s.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i
          ),
        };
      }
      return { items: [...s.items, { ...item, quantity: item.quantity ?? 1 }] };
    }),

  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

  updateQty: (id, delta) =>
    set((s) => ({
      items: s.items
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i))
        .filter((i) => i.quantity > 0),
    })),

  clear: () => set({ items: [] }),
}));
