import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { useLocales } from 'src/locales';
import { ROUTES } from 'src/routes';

import { APPOINTMENT_STATUS } from 'src/constants';
import AppointmentDebtModal from './appointment-debt-modal/AppointmentDebtModal';
import AppointmentsList from './appointments-list/AppointmentsList';
import { AppointmentDebtStatus } from './enums';
import { Background, Container, HeadContainer, StyledButton, Title } from './styles';
import { AppointmentsProps } from './types';

export default function Appointments({ appointments }: AppointmentsProps): JSX.Element {
  const { translate } = useLocales();
  const router = useRouter();

  const [isDebtModalOpen, setIsDebtModalOpen] = useState<boolean>(false);

  const hasDebtAppointments = useMemo(
    () =>
      appointments.some(
        (appointment) =>
          appointment.debtStatus === AppointmentDebtStatus.NotAccrued ||
          appointment.status === APPOINTMENT_STATUS.Paused
      ),
    [appointments]
  );

  const handleCreateButtonClick = (): void => {
    if (hasDebtAppointments) {
      setIsDebtModalOpen(true);

      return;
    }

    router.push(ROUTES.create_appointment);
  };

  const handleDebtModalClose = (): void => {
    setIsDebtModalOpen(false);
  };

  return (
    <>
      <Background>
        <Container>
          <HeadContainer>
            <Title>{translate('appointments_page.page_title')}</Title>
            <StyledButton variant="contained" type="button" onClick={handleCreateButtonClick}>
              {translate('appointments_page.create_button')}
            </StyledButton>
          </HeadContainer>
          <AppointmentsList appointments={appointments} />
        </Container>
      </Background>
      <AppointmentDebtModal isOpen={isDebtModalOpen} onClose={handleDebtModalClose} />
    </>
  );
}
