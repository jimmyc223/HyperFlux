"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

import type { CartLine } from "@/lib/types";

const STORAGE_KEY = "hyperflux-cart-v1";

type Action =
  | { type: "HYDRATE"; lines: CartLine[] }
  | { type: "ADD"; line: CartLine }
  | { type: "REMOVE"; productId: string }
  | { type: "SET_QTY"; productId: string; quantity: number }
  | { type: "CLEAR" };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "HYDRATE":
      return action.lines;
    case "ADD": {
      const existing = state.find((l) => l.productId === action.line.productId);
      if (existing) {
        return state.map((l) =>
          l.productId === action.line.productId
            ? { ...l, quantity: l.quantity + action.line.quantity }
            : l,
        );
      }
      return [...state, action.line];
    }
    case "REMOVE":
      return state.filter((l) => l.productId !== action.productId);
    case "SET_QTY":
      if (action.quantity <= 0) {
        return state.filter((l) => l.productId !== action.productId);
      }
      return state.map((l) =>
        l.productId === action.productId
          ? { ...l, quantity: action.quantity }
          : l,
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotalCents: number;
  isOpen: boolean;
  add: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", lines: JSON.parse(raw) });
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Persist on every change (after hydration, so we never clobber storage
  // with the initial empty state before it's loaded).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore quota/serialisation errors
    }
  }, [lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotalCents = lines.reduce(
      (n, l) => n + l.priceCents * l.quantity,
      0,
    );
    return {
      lines,
      count,
      subtotalCents,
      isOpen,
      add: (line) =>
        dispatch({ type: "ADD", line: { quantity: 1, ...line } }),
      remove: (productId) => dispatch({ type: "REMOVE", productId }),
      setQty: (productId, quantity) =>
        dispatch({ type: "SET_QTY", productId, quantity }),
      clear: () => dispatch({ type: "CLEAR" }),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [lines, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
