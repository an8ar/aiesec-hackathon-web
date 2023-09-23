export function getFormattedTime(timestamp:string) {
  const dateObj = new Date(timestamp);

  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = dateObj.getFullYear();

  const formattedDate = `${hours}:${minutes} ${day}.${month}.${year}`;
  return formattedDate;
}
