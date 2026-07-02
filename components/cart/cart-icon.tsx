"use client";

import { ShoppingBag } from "lucide-react";

import { useCart } from "./cart-provider";

/**
 * Header cart trigger with a live item-count badge. Opens the CartSheet (which
 * is rendered once at the app root and shares open state via the provider).
 */
export function CartIcon({
  className = "text-foreground hover:text-primary",
}: {
  className?: string;
}) {
  const { count, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart${count > 0 ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
      className={`relative inline-flex items-center justify-center transition-colors ${className}`}
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white">
          {count}
        </span>
      )}
    </button>
  );
}
