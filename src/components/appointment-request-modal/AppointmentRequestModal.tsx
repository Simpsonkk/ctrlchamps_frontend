import { Avatar, Button, Grid, List, ListItemText } from '@mui/material';
import { format } from 'date-fns';

import { useLocales } from 'src/locales';
import CheckCircle from 'src/assets/icons/CheckCircle';
import { useUpdateAppointmentMutation } from 'src/redux/api/appointmentApi';
import { APPOINTMENT_STATUS } from 'src/constants';
import { FilledButton } from 'src/components/reusable';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import { ChildModal } from 'src/components/appointment-request-modal/ChildModal';
import { DRAWER_DATE_FORMAT } from 'src/components/appointments/constants';
import { STEPS } from 'src/components/health-questionnaire/constants';
import AppointmentStatus from 'src/components/appointments/appointment-status/AppointmentStatus';

import { AppointmentRequestModalProps } from './types';
import {
  AppointmentModal,
  AppointmentModalBlock,
  AppointmentModalBlockParagraph,
  AppointmentParagraph,
  DrawerBody,
  HealthQuestionnaireBlock,
  InlineBlock,
  ListItemStyled,
  NameParagraph,
} from './styles';

const AppointmentRequestModal = ({
  appointment,
  isOpen,
  onClose,
}: AppointmentRequestModalProps): JSX.Element => {
  const { translate } = useLocales();
  const [updateAppointment] = useUpdateAppointmentMutation();

  const handleUpdateAppointment = async (status: string): Promise<void> => {
    try {
      await updateAppointment({
        id: appointment.id,
        status,
      });
      onClose();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <AppointmentModal open={isOpen} onClose={onClose} anchor="right">
      <DrawerBody>
        <FlowHeader
          text={translate('request_appointment.appointment')}
          iconType="close"
          infoButton
          callback={onClose}
        />

        <AppointmentModalBlock>
          <AppointmentParagraph>{appointment.name}</AppointmentParagraph>

          <AppointmentStatus status={appointment.status} />
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.client')}
          </AppointmentModalBlockParagraph>
          <InlineBlock>
            <Avatar />
            <NameParagraph>
              {appointment.user.firstName} {appointment.user.lastName}
            </NameParagraph>
          </InlineBlock>
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.date_and_time')}
          </AppointmentModalBlockParagraph>
          {format(new Date(appointment.startDate), DRAWER_DATE_FORMAT)}
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.health_questionnaire')}
          </AppointmentModalBlockParagraph>
          <HealthQuestionnaireBlock>
            {STEPS.map((text, index) => {
              const data = [
                appointment.seekerDiagnoses.map((diagnosis) => diagnosis.diagnosis.name),
                appointment.seekerActivities.map((activity) => activity),
                appointment.seekerCapabilities.map((capability) => capability.capability.name),
              ][index];
              const noteData = [
                appointment.diagnosisNote,
                appointment.activityNote,
                appointment.capabilityNote,
              ][index];

              return (
                <Grid container key={index} alignItems="center" padding="5px 0">
                  <Grid item xs={2}>
                    <CheckCircle />
                  </Grid>
                  <Grid item xs={8}>
                    {translate(text)}
                  </Grid>
                  <Grid item xs={2}>
                    <ChildModal name={translate(text)} list={data} note={noteData} />
                  </Grid>
                </Grid>
              );
            })}
          </HealthQuestionnaireBlock>
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.tasks')}
          </AppointmentModalBlockParagraph>
          <List>
            {appointment.seekerTasks.map((value) => (
              <ListItemStyled key={value.name} disableGutters>
                <ListItemText primary={value.name} />
              </ListItemStyled>
            ))}
          </List>
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.additional_details')}
          </AppointmentModalBlockParagraph>
          {appointment.details}
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <InlineBlock>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={(): Promise<void> => handleUpdateAppointment(APPOINTMENT_STATUS.Rejected)}
            >
              {translate('request_appointment.btns.reject')}
            </Button>
            <FilledButton
              fullWidth
              onClick={(): Promise<void> => handleUpdateAppointment(APPOINTMENT_STATUS.Accepted)}
            >
              {translate('request_appointment.btns.accept')}
            </FilledButton>
          </InlineBlock>
        </AppointmentModalBlock>
      </DrawerBody>
    </AppointmentModal>
  );
};

export default AppointmentRequestModal;
