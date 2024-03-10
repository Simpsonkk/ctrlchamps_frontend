import {
  CancelAppointmentModal,
  useCancelAppointmentModal,
} from 'src/components/modal-cancel-appointment';
import { useTypedSelector } from 'src/redux/store';
import OneTimeAppointment from './OneTimeAppointment';
import RecurringAppointment from './RecurringAppointment';
import { Appointment } from './enums';
import { Background } from './styles';

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export default function AppointmentScheduling({ onNext, onBack }: Props): JSX.Element {
  const { appointmentType } = useTypedSelector((state) => state.appointment);
  const { modalOpen, setModalOpen } = useCancelAppointmentModal();

  return (
    <>
      <Background>
        {appointmentType === Appointment.oneTime ? (
          <OneTimeAppointment onNext={onNext} onBack={onBack} />
        ) : (
          <RecurringAppointment onNext={onNext} onBack={onBack} />
        )}
      </Background>
      <CancelAppointmentModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
