// function to generate an array of week days within specified date interval
//  @param inputStartDate - Wed Dec 20 2023 17:27:39 GMT+0200
//  @param inputEndDate - Fri Dec 22 2023 17:27:39 GMT+0200
//  @return -  ['Wednesday', 'Thursday', 'Friday']

export function getWeekDaysRange(inputStartDate: Date | null, inputEndDate: Date | null): string[] {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  if (!inputStartDate || !inputEndDate) {
    throw new Error('Specify start and end date');
  }

  const startDate = new Date(inputStartDate);
  const endDate = new Date(inputEndDate);

  const result = [];

  const currentDate = startDate;

  while (currentDate <= endDate) {
    result.push(daysOfWeek[currentDate.getDay()]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}
