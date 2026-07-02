import { redirect } from "next/navigation";

import { getAdminEmail } from "@/lib/admin-auth";
import { listOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/format";
import { OrderStatusControl } from "@/components/admin/order-status-control";
import { LogoutButton } from "@/components/admin/logout-button";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const email = await getAdminEmail();
  if (!email) redirect("/admin/login");

  const orders = await listOrders();

  return (
    <main className="min-h-screen bg-background px-6 py-12 md:px-12 lg:px-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">
            Hyperflux Admin
          </p>
          <h1 className="mt-1 text-3xl font-medium text-foreground">Orders</h1>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {email}
          </span>
          <LogoutButton />
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="text-sm text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 align-top">
                  <td className="px-4 py-4 text-muted-foreground whitespace-nowrap">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-NZ", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-foreground">{order.customerName ?? "—"}</p>
                    <p className="text-muted-foreground">{order.email ?? "—"}</p>
                  </td>
                  <td className="px-4 py-4">
                    <ul className="space-y-1">
                      {order.items.map((it) => (
                        <li key={it.productId} className="text-foreground">
                          {it.productName}
                          <span className="text-muted-foreground"> × {it.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-4 font-medium text-foreground whitespace-nowrap">
                    {formatPrice(order.amountTotalCents, order.currency)}
                  </td>
                  <td className="px-4 py-4">
                    <OrderStatusControl orderId={order.id} status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
