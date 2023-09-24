export function getFollowingDay(currentDate: Date) {
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);
  return nextDate;
}
