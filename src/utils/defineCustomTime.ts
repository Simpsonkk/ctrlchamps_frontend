// function to combine specified date and time in a single date
//  @param date - Thu Dec 21 2023 00:00:00 GMT+0200
//  @param timeString - '01:15'
//  @return - Thu Dec 21 2023 01:15:00 GMT+0200

export function setCustomTime(date: Date, timeString: string): Date {
  const newDate = new Date(date);

  const match = timeString.match(/^(\d{1,2}):(\d{2})$/);

  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);

    newDate.setHours(hours, minutes, 0, 0);
  }

  return newDate;
}
