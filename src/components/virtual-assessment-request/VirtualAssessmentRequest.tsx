import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Button, IconButton, List, ListItemText, Typography } from '@mui/material';
import jwt_decode from 'jwt-decode';
import { useMemo, useState } from 'react';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';

import { DRAWER_DATE_FORMAT } from 'src/components/appointments/constants';
import VirtualAssessmentSuccess from 'src/components/appointments/request-sent-modal/VirtualAssessmentSuccess';
import VirtualAssessmentModal from 'src/components/appointments/virtual-assessment-modal/VirtualAssessmentModal';
import { AssessmentPurpose } from 'src/components/appointments/virtual-assessment-modal/enums';
import UserAvatar from 'src/components/reusable/user-avatar/UserAvatar';
import { FilledButton } from 'src/components/reusable';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import {
  CURRENT_DAY,
  SMALL_AVATAR_SIZE,
  TIMEZONE_FORMAT,
  USER_ROLE,
  UTC_TIMEZONE,
  VIRTUAL_ASSESSMENT_STATUS,
} from 'src/constants';
import { useLocales } from 'src/locales';
import { virtualAssessmentApi } from 'src/redux/api/virtualAssessmentApi';
import { useTypedSelector } from 'src/redux/store';

import {
  AppointmentModal,
  AppointmentModalBlock,
  AppointmentModalBlockParagraph,
  AppointmentModalFooter,
  AppointmentParagraph,
  DrawerBody,
  InlineBlock,
  ListItemStyled,
  NameParagraph,
  NotificationMessage,
} from './styles';
import { VirtualAssessmentRequestModalProps } from './types';
import { formatUTCToTimezone } from '../../utils/formatTime';

const decodeToken = (tokenToDecode: string): string => {
  const decoded: { id: string } = jwt_decode(tokenToDecode);

  return decoded.id;
};

const VirtualAssessmentRequestModal = ({
  appointment,
  isOpen,
  switchModalVisibility,
  openDrawer,
  closeDrawer,
}: VirtualAssessmentRequestModalProps): JSX.Element => {
  const { translate } = useLocales();

  const token = useTypedSelector((state) => state.token.token);
  const { user } = useTypedSelector((state) => state.user);

  const [reschedulingModalOpen, setReschedulingModalOpen] = useState<boolean>(false);
  const [isVirtualAssessmentSuccessOpen, setIsVirtualAssessmentSuccessOpen] =
    useState<boolean>(false);

  const [updateVirtualAssessmentStatus] =
    virtualAssessmentApi.useUpdateVirtualAssessmentStatusMutation();

  const userId = useMemo(() => decodeToken(token), [token]);

  const copyMeetingLink = (): void => {
    if (!appointment.virtualAssessment) return;
    const { meetingLink } = appointment.virtualAssessment;

    navigator.clipboard.writeText(meetingLink);
  };

  const openReschedulingModal = (): void => {
    setReschedulingModalOpen(true);
    closeDrawer();
  };

  const closeReschedulingModal = (): void => setReschedulingModalOpen(false);

  const openReschedulingSuccessModal = (): void => setIsVirtualAssessmentSuccessOpen(true);
  const closeReschedulingSuccessModal = (): void => setIsVirtualAssessmentSuccessOpen(false);

  const handleStatusChange = async (status: string): Promise<void> => {
    try {
      await updateVirtualAssessmentStatus({
        id: appointment.id,
        status,
      });
      switchModalVisibility();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <AppointmentModal open={isOpen} onClose={switchModalVisibility} anchor="right">
        <DrawerBody>
          <FlowHeader
            text={translate('request_appointment.virtual_assessment')}
            iconType="close"
            callback={switchModalVisibility}
          />
          <AppointmentModalBlock>
            <AppointmentModalBlockParagraph>
              <AppointmentParagraph>
                {translate('request_appointment.open_original_appointment')}
              </AppointmentParagraph>
              <IconButton onClick={openDrawer}>
                <ChevronRightIcon color="primary" />
              </IconButton>
            </AppointmentModalBlockParagraph>
          </AppointmentModalBlock>
          {user?.role === USER_ROLE.Caregiver ? (
            <AppointmentModalBlock>
              <AppointmentModalBlockParagraph>
                {translate('request_appointment.client')}
              </AppointmentModalBlockParagraph>
              <InlineBlock>
                <UserAvatar userId={appointment.user.id} size={SMALL_AVATAR_SIZE} />
                <NameParagraph>{`${appointment.user.firstName} ${appointment.user.lastName}`}</NameParagraph>
              </InlineBlock>
            </AppointmentModalBlock>
          ) : (
            <AppointmentModalBlock>
              <AppointmentModalBlockParagraph>
                {translate('request_appointment.caregiver')}
              </AppointmentModalBlockParagraph>
              <InlineBlock>
                <UserAvatar userId={appointment.caregiverInfo.user.id} size={SMALL_AVATAR_SIZE} />
                <NameParagraph>{`${appointment.caregiverInfo.user.firstName} ${appointment.caregiverInfo.user.lastName}`}</NameParagraph>
              </InlineBlock>
            </AppointmentModalBlock>
          )}
          <AppointmentModalBlock>
            <AppointmentModalBlockParagraph>
              {translate('request_appointment.date_and_time')}
            </AppointmentModalBlockParagraph>
            {appointment.virtualAssessment &&
              formatUTCToTimezone(
                `${appointment.virtualAssessment.assessmentDate} ${appointment.virtualAssessment.startTime}`,

                DRAWER_DATE_FORMAT
              )}
          </AppointmentModalBlock>
          {userId === appointment.caregiverInfo.user.id && (
            <AppointmentModalBlock>
              <AppointmentModalBlockParagraph>
                {translate('request_appointment.tasks')}
              </AppointmentModalBlockParagraph>
              <List disablePadding>
                {appointment.seekerTasks.map((value) => (
                  <ListItemStyled key={value.name} disableGutters>
                    <ListItemText primary={value.name} />
                  </ListItemStyled>
                ))}
              </List>
            </AppointmentModalBlock>
          )}
          <AppointmentModalBlock>
            <AppointmentModalBlockParagraph>
              {translate('request_appointment.meeting_link')}
              <Button>
                <ContentCopyIcon color="primary" fontSize="small" onClick={copyMeetingLink} />
              </Button>
            </AppointmentModalBlockParagraph>
            {appointment.virtualAssessment && (
              <Typography overflow="hidden">{appointment.virtualAssessment.meetingLink}</Typography>
            )}
          </AppointmentModalBlock>
          <AppointmentModalFooter>
            <NotificationMessage>
              <NotificationsNoneOutlinedIcon color="primary" />
              {translate('request_appointment.notify_message')}
            </NotificationMessage>
            {appointment.virtualAssessment?.status === VIRTUAL_ASSESSMENT_STATUS.Proposed &&
              !appointment.virtualAssessment?.wasRescheduled && (
                <InlineBlock>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    disabled={
                      utcToZonedTime(appointment.startDate, UTC_TIMEZONE) <
                      utcToZonedTime(CURRENT_DAY, UTC_TIMEZONE)
                    }
                    onClick={openReschedulingModal}
                  >
                    {translate('request_appointment.btns.reschedule')}
                  </Button>
                  <FilledButton
                    fullWidth
                    disabled={
                      utcToZonedTime(appointment.startDate, UTC_TIMEZONE) <
                        utcToZonedTime(CURRENT_DAY, UTC_TIMEZONE) ||
                      utcToZonedTime(
                        `${appointment.virtualAssessment.assessmentDate} ${appointment.virtualAssessment.startTime}`,
                        UTC_TIMEZONE
                      ) < utcToZonedTime(CURRENT_DAY, UTC_TIMEZONE)
                    }
                    onClick={async (): Promise<void> => {
                      await handleStatusChange(VIRTUAL_ASSESSMENT_STATUS.Accepted);
                    }}
                  >
                    {translate('request_appointment.btns.accept')}
                  </FilledButton>
                </InlineBlock>
              )}
            {appointment.virtualAssessment?.status === VIRTUAL_ASSESSMENT_STATUS.Proposed &&
              appointment.virtualAssessment?.wasRescheduled &&
              user?.role === USER_ROLE.Seeker && (
                <InlineBlock>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={async (): Promise<void> => {
                      await handleStatusChange(VIRTUAL_ASSESSMENT_STATUS.Rejected);
                    }}
                  >
                    {translate('request_appointment.btns.reject')}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={async (): Promise<void> => {
                      await handleStatusChange(VIRTUAL_ASSESSMENT_STATUS.Accepted);
                    }}
                  >
                    {translate('request_appointment.btns.accept')}
                  </Button>
                </InlineBlock>
              )}
          </AppointmentModalFooter>
        </DrawerBody>
      </AppointmentModal>

      <VirtualAssessmentModal
        purpose={AssessmentPurpose.reschedule}
        caregiverName={`${appointment?.caregiverInfo.user.firstName} ${appointment?.caregiverInfo.user.lastName}`}
        caregiverId={appointment.caregiverInfo.user.id}
        selectedAppointmentId={appointment.id}
        appointment={appointment}
        onClose={closeReschedulingModal}
        isActive={reschedulingModalOpen && !appointment.virtualAssessment?.wasRescheduled}
        openVirtualAssessmentSuccess={openReschedulingSuccessModal}
      />

      <VirtualAssessmentSuccess
        isActive={isVirtualAssessmentSuccessOpen}
        handleClose={closeReschedulingSuccessModal}
        role={USER_ROLE.Seeker}
      />
    </>
  );
};

export default VirtualAssessmentRequestModal;
