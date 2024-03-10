// function to calculate time difference between two time values
//  @param startTime - "10:00"
//  @param endTime - "12:20"
//  @return - {hours: 2, minutes: 20}

export function calculateTimeDifference(
  startTime: string,
  endTime: string
): { hours: number; minutes: number } {
  const [hours1, minutes1] = startTime.split(':').map(Number);
  const [hours2, minutes2] = endTime.split(':').map(Number);

  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  const adjustedTotalMinutes2 =
    totalMinutes2 < totalMinutes1 ? totalMinutes2 + 24 * 60 : totalMinutes2;

  const differenceInMinutes = Math.abs(adjustedTotalMinutes2 - totalMinutes1);

  let hours = Math.floor(differenceInMinutes / 60);
  const minutes = differenceInMinutes % 60;

  if (startTime === endTime) {
    hours = 24;
  }

  return { hours, minutes };
}

// function to calculate end time index based on start time
//  @param timeOptions - ['08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00']
//  @param startTime - "08:15"
//  @param specifiedInterval - 2
//  @return - 3

export const calculateEndTime = (
  timeOptions: string[],
  startTime: string,
  specifiedInterval: number
): number => {
  const selectedTimeIdx = timeOptions.findIndex((el) => el === startTime);
  const specifiedIntervalDifferenceIdx = (selectedTimeIdx + specifiedInterval) % timeOptions.length;

  return specifiedIntervalDifferenceIdx;
};
