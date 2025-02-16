import { getMinutesDifferenceWithTimezone } from './getMinutesDifferenceWithTimezone';

function getHourWord(hours: number): string {
  if (hours % 100 >= 11 && hours % 100 <= 14) {
    return 'часов';
  }
  switch (hours % 10) {
    case 1:
      return 'час';
    case 2:
    case 3:
    case 4:
      return 'часа';
    default:
      return 'часов';
  }
}

function getMinuteWord(minutes: number): string {
  if (minutes % 100 >= 11 && minutes % 100 <= 14) {
    return 'минут';
  }
  switch (minutes % 10) {
    case 1:
      return 'минуту';
    case 2:
    case 3:
    case 4:
      return 'минуты';
    default:
      return 'минут';
  }
}

function getDayWord(days: number): string {
  if (days % 100 >= 11 && days % 100 <= 14) {
    return 'дней';
  }
  switch (days % 10) {
    case 1:
      return 'день';
    case 2:
    case 3:
    case 4:
      return 'дня';
    default:
      return 'дней';
  }
}

export function getFormattedDate(date: Date): string {
  const minuteDiff = getMinutesDifferenceWithTimezone(date, new Date());

  if (minuteDiff < 60) {
    return `${minuteDiff} ${getMinuteWord(minuteDiff)} назад`;
  }
  if (minuteDiff < 1440) {
    const hours = Math.floor(minuteDiff / 60);
    return `${hours} ${getHourWord(hours)} назад`;
  }

  const days = Math.floor(minuteDiff / (60 * 24));
  return `${days} ${getDayWord(days)} назад`;
}
