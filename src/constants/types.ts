type daySelectedType =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

type AppointmentType = null | 'One time' | 'Recurring';

export type { daySelectedType, AppointmentType };
