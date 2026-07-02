"use server";

import { revalidatePath } from "next/cache";

import { getAdminEmail } from "@/lib/admin-auth";
import { updateOrderStatus } from "@/lib/orders";
import type { OrderStatus } from "@/lib/types";

const VALID: OrderStatus[] = ["PENDING", "PAID", "FULFILLED", "CANCELLED"];

export async function updateOrderStatusAction(
  orderId: string,
  status: OrderStatus,
) {
  // Re-check auth inside the action — Server Actions are independently POST-able.
  const email = await getAdminEmail();
  if (!email) throw new Error("Unauthorised");
  if (!VALID.includes(status)) throw new Error("Invalid status");

  await updateOrderStatus(orderId, status);
  revalidatePath("/admin/orders");
}
