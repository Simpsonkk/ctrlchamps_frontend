import { APPOINTMENT_STATUS } from 'src/constants';
import { useLocales } from 'src/locales';
import { StatusWrapper } from './styles';

interface IProps {
  status: string;
}

export default function AppointmentStatus({ status }: IProps): JSX.Element {
  const { translate } = useLocales();

  const STATUS_TEXTS = {
    [APPOINTMENT_STATUS.Pending]: translate('appointments_page.status.pending'),
    [APPOINTMENT_STATUS.Accepted]: translate(`appointments_page.status.accepted`),
    [APPOINTMENT_STATUS.Active]: translate('appointments_page.status.active'),
    [APPOINTMENT_STATUS.Paused]: translate('appointments_page.status.paused'),
    [APPOINTMENT_STATUS.Completed]: translate('appointments_page.status.completed'),
    [APPOINTMENT_STATUS.Ongoing]: translate('appointments_page.status.ongoing'),
    [APPOINTMENT_STATUS.Virtual]: translate('appointments_page.status.virtual'),
    [APPOINTMENT_STATUS.SignedSeeker]: translate('appointments_page.status.virtual'),
    [APPOINTMENT_STATUS.SignedCaregiver]: translate('appointments_page.status.virtual'),
    [APPOINTMENT_STATUS.Rejected]: translate('appointments_page.status.rejected'),
    [APPOINTMENT_STATUS.Finished]: translate('appointments_page.status.completed'),
  };

  return <StatusWrapper status={status}>{STATUS_TEXTS[status]}</StatusWrapper>;
}
