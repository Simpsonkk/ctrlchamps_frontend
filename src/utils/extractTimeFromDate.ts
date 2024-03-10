// function to extract time from date stored in ISO 8601 format
//  @param date - 2023-12-20T23:15:00.000Z
//  @return - '01:15"

export function extractTimeFromDate(dateString: Date): string {
  const dateObject = new Date(dateString);

  dateObject.setUTCHours(dateObject.getUTCHours() + 2);

  const hours = String(dateObject.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObject.getUTCMinutes()).padStart(2, '0');

  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
}
