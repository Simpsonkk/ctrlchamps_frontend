import { useLocales } from 'src/locales';
import { useUpdateAppointmentMutation } from 'src/redux/api/appointmentApi';

import { APPOINTMENT_STATUS } from 'src/constants';

import { Container, SubTitle, DoubleButtonBox, StyledButton, CancelBtn } from './styles';

interface IProps {
  onClose: () => void;
  selectedAppointmentId: string;
}

export default function CancelModal({ onClose, selectedAppointmentId }: IProps): JSX.Element {
  const { translate } = useLocales();

  const [updateAppointment] = useUpdateAppointmentMutation();

  const handleCancelAppointment = async (): Promise<void> => {
    try {
      await updateAppointment({
        id: selectedAppointmentId,
        status: APPOINTMENT_STATUS.Rejected,
      }).unwrap();
      onClose();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Container>
      <SubTitle>{translate('appointments_page.modal_subtitle')}</SubTitle>
      <DoubleButtonBox>
        <CancelBtn onClick={handleCancelAppointment} type="button" variant="outlined">
          {translate('appointments_page.cancel_button')}
        </CancelBtn>
        <StyledButton type="button" variant="contained" onClick={onClose}>
          {translate('appointments_page.back_button')}
        </StyledButton>
      </DoubleButtonBox>
    </Container>
  );
}
