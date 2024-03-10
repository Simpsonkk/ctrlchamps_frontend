import { Stack } from '@mui/material';
import AccessTimeIcon from 'src/assets/icons/AccessTimeIcon';
import AppointmentStatus from 'src/components/appointments/appointment-status/AppointmentStatus';
import { APPOINTMENT_STATUS, DISPLAY_TIME_FORMAT, TINY_AVATAR_SIZE } from 'src/constants';
import { useLocales } from 'src/locales';
import { formatTimeToTimezone, formatUTCToTimezone } from 'src/utils/formatTime';
import {
  AppointmentDetails,
  AppointmentHeader,
  AppointmentInfo,
  Arrow,
  Details,
  HeaderText,
  Task,
  TaskText,
  Text,
} from './styles';
import { CaregiverAppointmentI } from './types';
import UserAvatar from '../reusable/user-avatar/UserAvatar';

type Props = {
  appointmentDays: CaregiverAppointmentI[];
  openDrawer: (appointmentId: string) => void;
};

export default function CaregiverAppointment({ appointmentDays, openDrawer }: Props): JSX.Element {
  const { translate } = useLocales();

  return (
    <Stack>
      <HeaderText>{translate('appointments')}</HeaderText>

      {appointmentDays.map((appointment) => (
        <Task key={appointment.id} onClick={(): void => openDrawer(appointment.id)}>
          <AppointmentInfo>
            <AppointmentHeader>
              <TaskText>{appointment.name}</TaskText>
              <AppointmentStatus status={appointment.status} />
            </AppointmentHeader>
            <AppointmentDetails>
              <Details>
                <AccessTimeIcon />
                {appointment.status === APPOINTMENT_STATUS.Virtual &&
                appointment.virtualAssessment ? (
                  <Text>
                    {formatUTCToTimezone(
                      `${appointment.virtualAssessment.assessmentDate} ${appointment.virtualAssessment.startTime}`,
                      DISPLAY_TIME_FORMAT
                    )}
                  </Text>
                ) : (
                  <Text>
                    {formatTimeToTimezone(
                      appointment.startDate,
                      appointment.timezone,
                      DISPLAY_TIME_FORMAT
                    )}
                  </Text>
                )}
              </Details>
              <Details>
                <UserAvatar userId={appointment.user.id} size={TINY_AVATAR_SIZE} />
                <Text>{`${appointment.user.firstName} ${appointment.user.lastName}`}</Text>
              </Details>
            </AppointmentDetails>
          </AppointmentInfo>
          <Arrow />
        </Task>
      ))}
    </Stack>
  );
}
