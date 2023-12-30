// Format a date in a human readable way
export function formatDate(date: Date): string {
  return date.toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Capitalize first letter of a string
export function capitalize(s: string): string {
  if (typeof s !== "string") return s;
  if (s.length === 0) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function findMatch (str: string, query: string): boolean {
  return str.toLowerCase().includes(query.toLowerCase());
}