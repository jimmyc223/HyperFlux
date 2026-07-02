"use client";

import { toast } from "sonner";

import { useCart } from "./cart-provider";

interface AddToCartButtonProps {
  productId: string;
  name: string;
  priceCents: number;
  image: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Wraps the existing per-page "Add to Cart" button markup — pass the page's
 * exact className so the button looks identical to before, while gaining the
 * cart behaviour. Adds the item, pops a toast, and opens the cart drawer.
 */
export function AddToCartButton({
  productId,
  name,
  priceCents,
  image,
  className,
  children = "Add to Cart",
}: AddToCartButtonProps) {
  const { add, openCart } = useCart();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        add({ productId, name, priceCents, image });
        toast.success(`${name} added to cart`);
        openCart();
      }}
    >
      {children}
    </button>
  );
}
