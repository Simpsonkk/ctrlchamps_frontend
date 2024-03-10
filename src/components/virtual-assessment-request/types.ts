import { DetailedAppointment } from 'src/redux/api/appointmentApi';

export type VirtualAssessmentRequestModalProps = {
  appointment: DetailedAppointment;
  isOpen: boolean;
  switchModalVisibility: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};
