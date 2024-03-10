import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/material';
import { zonedTimeToUtc } from 'date-fns-tz';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ArrowForward from 'src/assets/icons/ArrowForward';
import TasksList from 'src/components/confirm-appointment/TasksList';
import { Appointment } from 'src/components/create-appointment/enums';
import AppointmentBtn from 'src/components/reusable/appointment-btn/AppointmentBtn';
import { APPOINTMENT_STATUS, DISPLAY_TIME_FORMAT, SMALL_AVATAR_SIZE } from 'src/constants';
import { useLocales } from 'src/locales';
import { useCreateAppointmentMutation } from 'src/redux/api/appointmentApi';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { ROUTES } from 'src/routes';

import PaymentNotification from 'src/components/create-appointment/PaymentNotification';
import CaregiverDrawer from 'src/components/reusable/drawer/caregiver-drawer/CaregiverDrawer';
import UserAvatar from 'src/components/reusable/user-avatar/UserAvatar';
import { useGetUserInfoQuery } from 'src/redux/api/userApi';
import { cancelAppointment as resetAppointmentInfo } from 'src/redux/slices/appointmentSlice';
import { resetAllInfo } from 'src/redux/slices/healthQuestionnaireSlice';
import { resetLocationSlice } from 'src/redux/slices/locationSlice';

import { format, isToday } from 'date-fns';
import { MIN_HOURS_BEFORE_APPOINTMENT } from 'src/components/create-appointment/constants';
import { checkIfTodayAppointmentWithinInterval } from 'src/components/create-appointment/helpers';

import { CONFIRM_NOTE_MAX_LENGTH } from './constants';
import {
  Container,
  Header,
  IconWrapper,
  InnerContainer,
  LinkToProfile,
  Name,
  PageBackground,
  Task,
  TasksWrapper,
  Typography,
} from './style';

export default function ConfirmAppointment({ onBack }: { onBack: () => void }): JSX.Element {
  const { translate } = useLocales();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useTypedSelector((state) => state.user.user);
  const caregiver = useTypedSelector((state) => state.caregiver.selectedCaregiver);
  const appointment = useTypedSelector((state) => state.appointment);
  const location = useTypedSelector((state) => state.location);
  const healthQuestionnaire = useTypedSelector((state) => state.healthQuestionnaire);

  const [tasks, setTasks] = useState<string[]>([]);
  const [details, setDetails] = useState<string>('');
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isCaregiverDrawerOpen, setIsCaregiverDrawerOpen] = useState<boolean>(false);
  const [paymentWarningVisible, setPaymentWarningVisible] = useState<boolean>(false);

  const { data: userInfo } = useGetUserInfoQuery(user?.id);
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  const onOpenModal = (): void => setIsModalActive(true);
  const onCloseModal = (): void => setIsModalActive(false);

  const openDrawer = (): void => setIsCaregiverDrawerOpen(true);
  const closeDrawer = (): void => setIsCaregiverDrawerOpen(false);

  const deleteTask = (idx: number): void => {
    const filtered = tasks.filter((el, i) => i !== idx);
    setTasks(filtered);
  };

  const confirmAppointment = async (): Promise<void> => {
    try {
      const appointmentStartTime =
        appointment.appointmentType === Appointment.oneTime
          ? appointment.oneTimeDate.startTime!
          : appointment.recurringDate.startDate!;

      const formattedTime = format(appointmentStartTime, DISPLAY_TIME_FORMAT);

      const isTimeWithinInterval = checkIfTodayAppointmentWithinInterval(
        formattedTime,
        MIN_HOURS_BEFORE_APPOINTMENT
      );

      if (isToday(appointmentStartTime) && isTimeWithinInterval) {
        setPaymentWarningVisible(true);

        if (userInfo!.balance < caregiver!.caregiverInfo.hourlyRate) {
          return;
        }
      }

      await createAppointment({
        caregiverInfoId: caregiver?.caregiverInfo.id,
        name: appointment.appointmentName,
        type: appointment.appointmentType,
        status: APPOINTMENT_STATUS.Pending,
        details: details || undefined,
        location: location.location,
        diagnosisNote: healthQuestionnaire.notes.DIAGNOSIS,
        activityNote: healthQuestionnaire.notes.ACTIVITIES,
        capabilityNote: healthQuestionnaire.notes.CAPABILITIES,
        startDate:
          appointment.appointmentType === Appointment.oneTime
            ? zonedTimeToUtc(appointment.oneTimeDate.startTime as Date, location.timezone)
            : zonedTimeToUtc(appointment.recurringDate.startDate as Date, location.timezone),
        endDate:
          appointment.appointmentType === Appointment.oneTime
            ? zonedTimeToUtc(appointment.oneTimeDate.endTime as Date, location.timezone)
            : zonedTimeToUtc(appointment.recurringDate.endDate as Date, location.timezone),
        timezone: location.timezone,
        weekdays:
          appointment.appointmentType !== Appointment.oneTime
            ? appointment.recurringDate.weekDays
            : undefined,
        seekerTasks: tasks || undefined,
        seekerCapabilities: healthQuestionnaire.selectedEnvChallenges,
        seekerDiagnoses: healthQuestionnaire.selectedDiagnoses,
        seekerActivities: healthQuestionnaire.selectedActivities,
      }).unwrap();
      router.push(ROUTES.home);
      dispatch(resetAppointmentInfo());
      dispatch(resetAllInfo());
      dispatch(resetLocationSlice());
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <PageBackground>
      <Container>
        <InnerContainer>
          <Header>
            <Typography>{translate('confirm_appointment.caregiver')}</Typography>
            <LinkToProfile onClick={openDrawer}>
              {caregiver && <UserAvatar userId={caregiver.id} size={SMALL_AVATAR_SIZE} />}
              <Name>{`${caregiver?.firstName} ${caregiver?.lastName}`}</Name>
              <ArrowForward />
            </LinkToProfile>
          </Header>
          <TasksWrapper>
            <Typography>{translate('confirm_appointment.tasks')}</Typography>
            {tasks.length > 0 &&
              tasks.map((task, idx) => (
                <Task key={task}>
                  {task}
                  <IconWrapper>
                    <CloseIcon onClick={(): void => deleteTask(idx)} />
                  </IconWrapper>
                </Task>
              ))}
            <TasksList
              tasks={tasks}
              setTasks={setTasks}
              details={details}
              setDetails={setDetails}
              onClose={onCloseModal}
              onOpen={onOpenModal}
              isModalActive={isModalActive}
            />
          </TasksWrapper>
          {paymentWarningVisible && (
            <Stack sx={{ padding: '0 16px 16px' }}>
              <PaymentNotification confirmationStep />
            </Stack>
          )}
          <AppointmentBtn
            nextText={translate('confirm_appointment.confirm')}
            backText={translate('profileQualification.back')}
            disabled={
              !tasks.length ||
              details.length > CONFIRM_NOTE_MAX_LENGTH ||
              isLoading ||
              paymentWarningVisible
            }
            onClick={confirmAppointment}
            onBack={onBack}
          />
        </InnerContainer>
      </Container>
      {caregiver && (
        <CaregiverDrawer
          open={isCaregiverDrawerOpen}
          onClose={closeDrawer}
          caregiverId={caregiver.id}
        />
      )}
    </PageBackground>
  );
}
