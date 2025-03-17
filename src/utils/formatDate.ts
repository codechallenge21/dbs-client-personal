/**
 * Format a date into the standard format used across the application using toLocaleString()
 * @param date Date to format. If not provided, current date is used.
 * @returns Formatted date string using the browser's locale settings
 */
export function formatDate(date: Date = new Date()): string {
  return date.toLocaleString();
}