type AppointmentTypeI = 'One time' | 'Recurring';

type AppointmentDurationI = {
  hours: number;
  minutes: number;
};

export type { AppointmentTypeI, AppointmentDurationI };
