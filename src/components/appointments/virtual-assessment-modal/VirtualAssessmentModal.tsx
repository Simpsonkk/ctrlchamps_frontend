import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Alert, IconButton, Snackbar, TextField } from '@mui/material';
import { isBefore, isSameDay, isToday } from 'date-fns';

import Cross from 'src/assets/icons/Cross';
import RightAction from 'src/assets/icons/RightAction';
import { CloseButton, HeaderTitle } from 'src/components/confirm-appointment/style';
import Appointment from 'src/components/create-appointment/Appointment';
import { selectTimeOptions } from 'src/components/create-appointment/constants';
import { ErrorText, FilledButton } from 'src/components/reusable';
import UserAvatar from 'src/components/reusable/user-avatar/UserAvatar';
import { AUTO_HIDEOUT_DELAY, CURRENT_DAY, SMALL_AVATAR_SIZE } from 'src/constants';
import { useLocales } from 'src/locales';
import { isTimeAfterNow } from 'src/utils/checkTime';
import { DetailedAppointment } from 'src/redux/api/appointmentApi';
import { MIN_VALUE } from './constants';
import { AssessmentPurpose } from './enums';

import {
  AppointmentModal,
  AppointmentModalBlock,
  AppointmentModalBlockParagraph,
  AppointmentModalFooter,
  AppointmentModalHeader,
  AppointmentModalLinkBlock,
  AppointmentParagraph,
  ArrowRight,
  CopyLinkWrapper,
  InlineBlock,
  MainText,
  ModalBackdrop,
  ModalBlock,
  ModalBody,
  NameParagraph,
  NotificationMessage,
  StyledIconButton,
} from './styles';
import useVirtualAssessmentModal from './useVirtualAssessmentModal';

type Props = {
  purpose: 'request' | 'reschedule';
  isActive: boolean;
  appointment: DetailedAppointment;
  onClose: () => void;
  openDrawer?: () => void;
  openCaregiverProfile?: () => void;
  openVirtualAssessmentSuccess: () => void;
  caregiverName: string;
  caregiverId: string;
  selectedAppointmentId: string;
};

export default function VirtualAssessmentModal({
  purpose,
  onClose,
  isActive,
  appointment,
  openDrawer,
  openCaregiverProfile,
  openVirtualAssessmentSuccess,
  caregiverName,
  caregiverId,
  selectedAppointmentId,
}: Props): JSX.Element | null {
  const { translate } = useLocales();
  const {
    startTime,
    endTime,
    date,
    meetingLink,
    reschedulingReason,
    isLinkCopied,
    isButtonDisabled,
    isRescheduleBtnDisabled,
    invalidTime,
    maxDurationExceeded,
    hasAppointmentTimePassed,
    chooseDate,
    chooseStartTime,
    chooseEndTime,
    requestAssessment,
    rescheduleAssessment,
    setReschedulingReason,
    setMeetingLink,
    setIsLinkCopied,
    copyLink,
    showInvalidLinkError,
    minReasonLength,
    maxReasonLength,
    serverError,
  } = useVirtualAssessmentModal(
    selectedAppointmentId,
    openVirtualAssessmentSuccess,
    onClose,
    appointment
  );
  if (!isActive) return null;

  return (
    <ModalBackdrop>
      <AppointmentModal>
        <AppointmentModalHeader>
          <CloseButton onClick={onClose}>
            <Cross />
          </CloseButton>
          <HeaderTitle>
            {purpose === AssessmentPurpose.request
              ? translate('request_appointment.virtual_assessment')
              : translate('reschedule_appointment.modal_header')}
          </HeaderTitle>
        </AppointmentModalHeader>
        <ModalBody>
          {purpose === AssessmentPurpose.request && (
            <>
              <AppointmentModalBlock offsetTop>
                <AppointmentModalBlockParagraph>
                  <AppointmentParagraph>
                    {translate('request_appointment.open_original_appointment')}
                  </AppointmentParagraph>
                  <IconButton
                    onClick={openDrawer}
                    color="primary"
                    aria-label={translate('aria.open_drawer')}
                  >
                    <ArrowRight />
                  </IconButton>
                </AppointmentModalBlockParagraph>
              </AppointmentModalBlock>
              <AppointmentModalBlock>
                <AppointmentModalBlockParagraph>
                  {translate('request_appointment.caregiver')}
                </AppointmentModalBlockParagraph>
                <InlineBlock>
                  <UserAvatar userId={caregiverId} size={SMALL_AVATAR_SIZE} />
                  <NameParagraph>{caregiverName}</NameParagraph>
                  <StyledIconButton color="secondary" onClick={openCaregiverProfile}>
                    <RightAction />
                  </StyledIconButton>
                </InlineBlock>
              </AppointmentModalBlock>
            </>
          )}

          {purpose === AssessmentPurpose.reschedule && (
            <>
              <MainText>{translate('reschedule_appointment.main_text')}</MainText>
              <ModalBlock>
                <TextField
                  label={translate('reschedule_appointment.reason')}
                  variant="standard"
                  value={reschedulingReason}
                  onChange={(e): void => setReschedulingReason(e.target.value)}
                />
                {reschedulingReason.length > MIN_VALUE && minReasonLength && (
                  <ErrorText>{translate('appointments_page.rescheduling_reason_min')}</ErrorText>
                )}
                {maxReasonLength && (
                  <ErrorText>{translate('appointments_page.rescheduling_reason_max')}</ErrorText>
                )}
              </ModalBlock>
            </>
          )}

          <AppointmentModalBlock>
            <Appointment
              selectTimeOptions={selectTimeOptions}
              startTime={startTime}
              endTime={endTime}
              date={date}
              chooseStartTime={chooseStartTime}
              chooseEndTime={chooseEndTime}
              chooseDate={chooseDate}
            />
            {maxDurationExceeded && !invalidTime && startTime !== endTime && (
              <ErrorText>{translate('appointments_page.assessment_duration_exceeded')}</ErrorText>
            )}
            {date && isToday(date) && !isTimeAfterNow(startTime) && (
              <ErrorText> {translate('create_appointment.errors.invalid_today_time')}</ErrorText>
            )}
            {invalidTime && <ErrorText>{translate('request_appointment.invalid_time')}</ErrorText>}
            {startTime && endTime && startTime === endTime && (
              <ErrorText>{translate('request_appointment.equal_time_error')}</ErrorText>
            )}
            {date && isBefore(date, CURRENT_DAY) && !isSameDay(date, CURRENT_DAY) && (
              <ErrorText>{translate('create_appointment.errors.invalid_date')}</ErrorText>
            )}
            {hasAppointmentTimePassed && (
              <ErrorText>{translate('request_appointment.invalid_assessment_date')}</ErrorText>
            )}
          </AppointmentModalBlock>

          <AppointmentModalBlock>
            <AppointmentModalLinkBlock>
              <TextField
                variant="standard"
                fullWidth
                autoComplete="off"
                label={translate('request_appointment.meeting_link')}
                value={meetingLink}
                onChange={(e): void => setMeetingLink(e.target.value)}
              />
              <CopyLinkWrapper onClick={copyLink}>
                <ContentCopyIcon fontSize="small" color="primary" />
              </CopyLinkWrapper>
            </AppointmentModalLinkBlock>
            {showInvalidLinkError && (
              <ErrorText>{translate('request_appointment.invalid_link')}</ErrorText>
            )}
          </AppointmentModalBlock>

          <AppointmentModalFooter>
            {!isButtonDisabled && (
              <NotificationMessage>
                <NotificationsNoneOutlinedIcon color="primary" />
                {translate('request_appointment.notify_message')}
              </NotificationMessage>
            )}
            <FilledButton
              onClick={
                purpose === AssessmentPurpose.request ? requestAssessment : rescheduleAssessment
              }
              disabled={
                purpose === AssessmentPurpose.reschedule
                  ? isRescheduleBtnDisabled
                  : isButtonDisabled
              }
              fullWidth
            >
              {purpose === AssessmentPurpose.request
                ? translate('request_appointment.btns.request')
                : translate('request_appointment.btns.confirm')}
            </FilledButton>
            {serverError && (
              <ErrorText textAlign="center">
                {translate('request_appointment.server_error')}
              </ErrorText>
            )}
          </AppointmentModalFooter>
        </ModalBody>
      </AppointmentModal>

      <Snackbar
        open={isLinkCopied}
        autoHideDuration={AUTO_HIDEOUT_DELAY}
        onClose={(): void => setIsLinkCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success">{translate('request_appointment.link_copied')}</Alert>
      </Snackbar>
    </ModalBackdrop>
  );
}
