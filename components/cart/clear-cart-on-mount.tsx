"use client";

import { useEffect } from "react";

import { useCart } from "./cart-provider";

/**
 * Clears the cart once, on mount. Rendered on the checkout success page so a
 * completed order empties the cart without the drawer needing to be open.
 */
export function ClearCartOnMount() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
