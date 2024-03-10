import { intervalToDuration } from 'date-fns';

// function to calculate duration of one single appointment
//  @param startTime - "2022-12-22 00:30:00"
//  @param endTime - "2022-12-22 02:45:00"
//  @return -  2h 15m`

export function calculateDateDifference(startTime: string, endTime: string): string {
  const duration = intervalToDuration({
    start: new Date(startTime),
    end: new Date(endTime),
  });

  const hours = duration.hours || 0;
  const minutes = duration.minutes || 0;

  return `${hours}h ${minutes}m`;
}
