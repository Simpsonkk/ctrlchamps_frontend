export type CaregiverAppointmentI = {
  id: string;
  userId: string;
  caregiverInfoId: string;
  name: string;
  type: string;
  status: string;
  details: string;
  payment: number;
  location: string;
  activityNote: string;
  diagnosisNote: string;
  capabilityNote: string;
  startDate: string;
  endDate: string;
  timezone: string;
  weekday: string[];
  caregiverInfo: {
    id: string;
    timeZone: string;
  };
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  virtualAssessment?: {
    id: string;
    assessmentDate: string;
    startTime: string;
    status: string;
  };
};
