/**
 * Formats a number to Nepali Currency format (रु 10,00,000)
 */
export function formatNepaliCurrency(amount: number): string {
  return new Intl.NumberFormat("ne-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("NPR", "रु");
}

/**
 * Standard English currency formatting fallback ($ / NPR 100,000)
 */
export function formatFormattedNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num);
}

/**
 * Format ISO date string into readable English date
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Sanitizes IRD bill numbers (strips extra spaces, standardizes hyphenation)
 */
export function sanitizeBillNumber(billNo: string): string {
  return billNo.trim().toUpperCase().replace(/\s+/g, "");
}
