import { DetailedAppointment } from 'src/redux/api/appointmentApi';

export type Task = {
  appointmentId: string;
  name: string;
};

export type Activity = {
  id: string;
  name: string;
  answer: string;
};

export type Capability = {
  id: string;
  name: string;
};

export type Diagnosis = {
  id: string;
  name: string;
};

export type AppointmentRequestModalProps = {
  appointment: DetailedAppointment;
  isOpen: boolean;
  onClose: () => void;
};
