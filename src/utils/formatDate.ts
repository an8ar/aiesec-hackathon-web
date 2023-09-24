export function formatDate(date: Date) {
  const isoString = date.toISOString();
  return isoString.slice(0, 10);
}
