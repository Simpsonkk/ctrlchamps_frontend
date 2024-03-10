// function to generate an array of time periods with defined interval
//  @param startTime - '08:00'
//  @param endTime - '10:00'
//  @param intervalMinutes - 15
//  @return -  ['08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00']

const DATE_CONSTANT = '1970-01-01T';

export function generateTimeWithInterval(
  startTime: string,
  endTime: string,
  intervalMinutes: number
): string[] {
  const startDate = new Date(`${DATE_CONSTANT}${startTime}:00`);
  let endDate = new Date(`${DATE_CONSTANT}${endTime}:00`);

  if (endDate < startDate) {
    endDate = new Date(endDate.getTime() + 24 * 60 * 60 * 1000);
  }

  const timeArray = [];
  const currentTime = startDate;

  while (currentTime <= endDate) {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    timeArray.push(formattedTime);
    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }

  return timeArray;
}
