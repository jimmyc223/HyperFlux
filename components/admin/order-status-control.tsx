"use client";

import { useTransition } from "react";

import { updateOrderStatusAction } from "@/app/actions/orders";
import type { OrderStatus } from "@/lib/types";

const STATUSES: OrderStatus[] = ["PENDING", "PAID", "FULFILLED", "CANCELLED"];

export function OrderStatusControl({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) =>
        startTransition(() =>
          updateOrderStatusAction(orderId, e.target.value as OrderStatus),
        )
      }
      className="rounded-lg border border-border bg-transparent px-3 py-1.5 text-sm text-foreground focus:border-foreground focus:outline-none disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="bg-background">
          {s}
        </option>
      ))}
    </select>
  );
}
