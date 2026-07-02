"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { FadeImage } from "@/components/fade-image";
import { formatPrice } from "@/lib/format";
import { useCart } from "./cart-provider";

export function CartSheet() {
  const { lines, count, subtotalCents, isOpen, closeCart, setQty, remove } =
    useCart();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({
            productId: l.productId,
            quantity: l.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      toast.error(data.error ?? "Could not start checkout. Please try again.");
    } catch {
      toast.error("Could not start checkout. Please try again.");
    }
    setLoading(false);
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeCart();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <Dialog.Title className="flex items-center gap-2 text-lg font-bold uppercase tracking-widest text-foreground">
              <ShoppingBag className="h-5 w-5" />
              Cart{count > 0 ? ` (${count})` : ""}
            </Dialog.Title>
            <Dialog.Close className="text-muted-foreground transition-colors hover:text-foreground">
              <X className="h-5 w-5" />
              <span className="sr-only">Close cart</span>
            </Dialog.Close>
          </div>

          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              <Dialog.Close className="text-sm text-primary underline underline-offset-4 hover:opacity-80">
                Continue shopping
              </Dialog.Close>
            </div>
          ) : (
            <>
              {/* Line items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <ul className="space-y-5">
                  {lines.map((line) => (
                    <li key={line.productId} className="flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-white">
                        <FadeImage
                          src={line.image || "/placeholder.svg"}
                          alt={line.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-snug text-foreground">
                            {line.name}
                          </p>
                          <button
                            type="button"
                            onClick={() => remove(line.productId)}
                            className="text-muted-foreground transition-colors hover:text-primary"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove {line.name}</span>
                          </button>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatPrice(line.priceCents)}
                        </p>
                        <div className="mt-auto flex items-center gap-3 pt-2">
                          <div className="flex items-center rounded-full border border-border">
                            <button
                              type="button"
                              onClick={() =>
                                setQty(line.productId, line.quantity - 1)
                              }
                              className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <Minus className="h-3.5 w-3.5" />
                              <span className="sr-only">Decrease quantity</span>
                            </button>
                            <span className="w-6 text-center text-sm text-foreground">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setQty(line.productId, line.quantity + 1)
                              }
                              className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span className="sr-only">Increase quantity</span>
                            </button>
                          </div>
                          <span className="ml-auto text-sm font-medium text-foreground">
                            {formatPrice(line.priceCents * line.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="border-t border-border px-6 py-5">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-bold text-foreground">
                    {formatPrice(subtotalCents)}
                  </span>
                </div>
                <p className="mb-4 text-xs text-muted-foreground">
                  Shipping calculated at checkout.
                </p>
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full rounded-full bg-primary py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  {loading ? "Redirecting…" : "Checkout"}
                </button>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
