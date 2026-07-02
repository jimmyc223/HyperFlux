/**
 * Money helpers. Prices are stored and computed everywhere as integer cents to
 * avoid floating-point rounding; only the display layer converts to dollars.
 */

export function formatPrice(cents: number, currency = "nzd"): string {
  // Whole-dollar amounts render without decimals ("$89") to match the site's
  // existing price styling; fractional amounts show cents ("$7.99").
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/**
 * Parse a display price like "$89" or "89.00" into integer cents.
 * Used by the seed script to convert the existing hardcoded string prices.
 */
export function parsePriceToCents(price: string): number {
  const numeric = Number(price.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(numeric)) {
    throw new Error(`Cannot parse price: "${price}"`);
  }
  return Math.round(numeric * 100);
}
