import { ActivityLog } from 'src/redux/api/activityLogApi';
import { AppointmentDebtStatus } from './enums';

export type Appointment = {
  id: string;
  userId: string;
  caregiverInfoId: string;
  name: string;
  type: string;
  status: string;
  details?: string;
  location: string;
  activityNote?: string;
  diagnosisNote?: string;
  capabilityNote?: string;
  startDate: string;
  endDate: string;
  timezone: string;
  weekdays?: string[];
  payment?: number;
  signingDate: string | null;
  activityLog: ActivityLog[];
  debtStatus: AppointmentDebtStatus;
  seekerDebt: number;
};

export type AppointmentsProps = {
  appointments: Appointment[];
};

export type SeekerTask = {
  appointmentId: string;
  name: string;
};

export type CaregiverInfo = {
  id: string;
  hourlyRate?: number;
  timeZone?: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

export type SeekerInfo = {
  id: string;
  firstName: string;
  lastName: string;
};
