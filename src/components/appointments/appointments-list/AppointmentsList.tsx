import { IconButton } from '@mui/material';
import { useState } from 'react';

import RightAction from 'src/assets/icons/RightAction';
import AppointmentDrawer from 'src/components/appointments/appointment-drawer/AppointmentDrawer';
import AppointmentStatus from 'src/components/appointments/appointment-status/AppointmentStatus';
import { AppointmentsProps } from 'src/components/appointments/types';
import CaregiverDrawer from 'src/components/reusable/drawer/caregiver-drawer/CaregiverDrawer';
import { APPOINTMENT_STATUS } from 'src/constants';
import { useTypedSelector } from 'src/redux/store';

import { Item, RejectedTitle, TextContainer, Title } from './styles';

export default function AppointmentsList({ appointments }: AppointmentsProps): JSX.Element | null {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isCaregiverDrawerOpen, setIsCaregiverDrawerOpen] = useState<boolean>(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>('');
  const [caregiverId, setCaregiverId] = useState<string>('');

  const user = useTypedSelector((state) => state.user.user);

  if (!user) return null;

  const { role } = user;

  const handleDrawerOpen = (appointmentId: string): void => {
    setIsDrawerOpen(true);
    setSelectedAppointmentId(appointmentId);
  };

  const handleDrawerClose = (): void => setIsDrawerOpen(false);

  const handleCaregiverDrawerClose = (): void => {
    setIsCaregiverDrawerOpen(false);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <ul>
        {appointments.map((appointment) => (
          <Item key={appointment.id} onClick={(): void => handleDrawerOpen(appointment.id)}>
            <TextContainer>
              {appointment.status === APPOINTMENT_STATUS.Rejected ? (
                <RejectedTitle>{appointment.name}</RejectedTitle>
              ) : (
                <Title>{appointment.name}</Title>
              )}

              <AppointmentStatus status={appointment.status} />
            </TextContainer>
            <IconButton edge="end" aria-label="open-drawer">
              <RightAction />
            </IconButton>
          </Item>
        ))}
      </ul>
      {selectedAppointmentId && (
        <AppointmentDrawer
          role={role}
          isOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          setIsCaregiverDrawerOpen={setIsCaregiverDrawerOpen}
          onClose={handleDrawerClose}
          setCaregiverId={setCaregiverId}
          selectedAppointmentId={selectedAppointmentId}
        />
      )}
      {isCaregiverDrawerOpen && caregiverId && (
        <CaregiverDrawer
          open={isCaregiverDrawerOpen}
          onClose={handleCaregiverDrawerClose}
          caregiverId={caregiverId}
          selectedAppointmentId={selectedAppointmentId}
        />
      )}
    </>
  );
}
