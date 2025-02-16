export function getMinutesDifferenceWithTimezone(date1: Date, date2: Date) {
  const utcDate1 = new Date(date1.getTime() + date1.getTimezoneOffset() * 60000);
  const utcDate2 = new Date(date2.getTime() + date2.getTimezoneOffset() * 60000);

  const diffInMs = Math.abs(utcDate1.getTime() - utcDate2.getTime());
  return Math.round(diffInMs / (1000 * 60));
}
