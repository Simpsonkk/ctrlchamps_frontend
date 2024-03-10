import { CheckCircle } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel, Grid, IconButton } from '@mui/material';
import { format, formatISO, isWithinInterval, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { Dispatch, SetStateAction } from 'react';

import ArrowBackFilled from 'src/assets/icons/ArrowBackFilled';
import RightAction from 'src/assets/icons/RightAction';
import AgreementModal from 'src/components/appointments/agreement-modal/AgreementModal';
import AppointmentStatus from 'src/components/appointments/appointment-status/AppointmentStatus';
import CancelModal from 'src/components/appointments/cancel-modal/CancelModal';
import CompleteAppointmentModal from 'src/components/appointments/complete-appointment-modal/CompleteAppointmentModal';
import { STEPS } from 'src/components/health-questionnaire/constants';
import Drawer from 'src/components/reusable/drawer/Drawer';
import { DrawerFooter, DrawerHeader, DrawerTitle } from 'src/components/reusable/drawer/styles';
import Modal from 'src/components/reusable/modal/Modal';
import {
  APPOINTMENT_STATUS,
  APPOINTMENT_TYPE,
  CURRENT_DAY,
  DATE_FORMAT,
  SMALL_AVATAR_SIZE,
  USER_ROLE,
  UTC_TIMEZONE,
  VIRTUAL_ASSESSMENT_STATUS,
} from 'src/constants';
import { useLocales } from 'src/locales';

import VirtualAssessmentSuccess from 'src/components/appointments/request-sent-modal/VirtualAssessmentSuccess';
import VirtualAssessmentModal from 'src/components/appointments/virtual-assessment-modal/VirtualAssessmentModal';
import UserAvatar from 'src/components/reusable/user-avatar/UserAvatar';
import VirtualAssessmentRequestModal from 'src/components/virtual-assessment-request/VirtualAssessmentRequest';
import { useUpdateAppointmentMutation } from 'src/redux/api/appointmentApi';

import { ChildModal } from 'src/components/appointment-request-modal/ChildModal';
import {
  AppointmentModalBlock,
  AppointmentModalBlockParagraph,
  HealthQuestionnaireBlock,
} from 'src/components/appointment-request-modal/styles';

import PriorityIcon from 'src/assets/icons/PriorityIcon';

import { AssessmentPurpose } from 'src/components/appointments/virtual-assessment-modal/enums';
import { UserRole } from 'src/redux/slices/userSlice';
import ActivityLogModal from './activity-log-modal/ActivityLogModal';
import { isActivityLogReviewedShown, isActivityLogShown } from './activity-log-modal/helpers';
import { useAppointmentDrawer } from './hooks';
import AppointmentDrawerLocation from './location/AppointmentDrawerLocation';
import ReviewActivityLogModal from './review-activity-log-modal/ReviewActivityLogModal';
import { getLatestPendingActivityLog } from './review-activity-log-modal/helpers';
import {
  AcceptRejectButtonsBox,
  ActivityLogBlock,
  AppointmentName,
  Block,
  CancelBtn,
  CaregiverBlock,
  CaregiverName,
  DateText,
  DisabledText,
  DoubleButtonBox,
  DrawerBody,
  ModalFooter,
  StyledButton,
  StyledIconButton,
  StyledLabel,
  SubTitle,
  Task,
  TaskList,
} from './styles';

interface AppointmentsDrawerProps {
  role: string;
  isOpen: boolean;
  onClose: () => void;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setIsCaregiverDrawerOpen?: Dispatch<SetStateAction<boolean>>;
  setCaregiverId?: Dispatch<SetStateAction<string>>;
  selectedAppointmentId: string;
  chosenDay?: Date;
}

export default function AppointmentDrawer({
  role,
  isOpen,
  onClose,
  setIsDrawerOpen,
  setIsCaregiverDrawerOpen,
  setCaregiverId,
  selectedAppointmentId,
  chosenDay,
}: AppointmentsDrawerProps): JSX.Element | null {
  const { translate } = useLocales();

  const {
    isCancelModalOpen,
    isCompleteModalOpen,
    isAgreementModalOpen,
    isActivityLogModalOpen,
    isReviewActivityLogModalOpen,
    isVirtualAssessmentModalOpen,
    isVirtualAssessmentSuccessOpen,
    isTermsAccepted,
    isLoading,
    appointment,
    actualAppointmentDate,
    handleCancelModalOpen,
    handleCancelModalClose,
    handleCompleteModalOpen,
    handleCompleteModalClose,
    handleAgreementModalOpen,
    handleAgreementModalClose,
    handleActivityLogModalClose,
    handleActivityLogModalOpen,
    handleReviewActivityLogModalClose,
    handleReviewActivityLogModalOpen,
    handleVirtualAssessmentModalOpen,
    handleVirtualAssessmentModalClose,
    handleVirtualAssessmentSuccessModalClose,
    handleVirtualAssessmentSuccessModalOpen,
    setIsTermsAccepted,
    openOriginalAppointment,
    closeOriginalAppointment,
    virtualAssessmentDrawerShown,
  } = useAppointmentDrawer({ role, setIsDrawerOpen, selectedAppointmentId, chosenDay });

  const [updateAppointment] = useUpdateAppointmentMutation();

  const handleCaregiverDrawerOpen = (caregiverId: string): void => {
    if (setCaregiverId && setIsCaregiverDrawerOpen) {
      setCaregiverId(caregiverId);
      setIsCaregiverDrawerOpen(true);
      setIsDrawerOpen(false);
    }
  };

  if (isLoading) return null;

  if (!appointment) return null;

  const VIRTUAL_COMPONENT = (
    <>
      {appointment.virtualAssessment?.status === VIRTUAL_ASSESSMENT_STATUS.Finished ? (
        <StyledButton type="button" variant="contained" onClick={handleCompleteModalOpen}>
          {translate('appointments_page.complete_button')}
        </StyledButton>
      ) : (
        <StyledButton
          type="button"
          variant="contained"
          disabled={
            appointment.virtualAssessment?.status !== VIRTUAL_ASSESSMENT_STATUS.Accepted &&
            role === USER_ROLE.Seeker &&
            !appointment.virtualAssessment?.wasRescheduled
          }
          onClick={handleVirtualAssessmentModalOpen}
        >
          {translate('appointments_page.virtual_button')}
        </StyledButton>
      )}
    </>
  );

  const handleAcceptAppointment = async (): Promise<void> => {
    try {
      await updateAppointment({
        id: selectedAppointmentId,
        status: APPOINTMENT_STATUS.Accepted,
      }).unwrap();

      handleAgreementModalClose();
      setIsTermsAccepted(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const DRAWER_FOOTERS = {
    [APPOINTMENT_STATUS.Pending]: (
      <>
        {role === USER_ROLE.Caregiver ? (
          <AcceptRejectButtonsBox>
            <CancelBtn type="button" variant="outlined" onClick={handleCancelModalOpen}>
              {translate('appointments_page.reject')}
            </CancelBtn>
            <StyledButton
              type="button"
              variant="contained"
              onClick={handleAcceptAppointment}
              disabled={
                utcToZonedTime(appointment.endDate, UTC_TIMEZONE) <
                  utcToZonedTime(CURRENT_DAY, UTC_TIMEZONE) ||
                (appointment.type === APPOINTMENT_TYPE.OneTime &&
                  isWithinInterval(utcToZonedTime(CURRENT_DAY, UTC_TIMEZONE), {
                    start: utcToZonedTime(appointment.startDate, UTC_TIMEZONE),
                    end: utcToZonedTime(appointment.endDate, UTC_TIMEZONE),
                  }))
              }
            >
              {translate('appointments_page.accept')}
            </StyledButton>
          </AcceptRejectButtonsBox>
        ) : (
          <CancelBtn type="button" variant="outlined" onClick={handleCancelModalOpen}>
            {translate('appointments_page.cancel_button')}
          </CancelBtn>
        )}
      </>
    ),
    [APPOINTMENT_STATUS.Accepted]: (
      <>
        {role === USER_ROLE.Seeker ? (
          <StyledButton
            type="button"
            variant="contained"
            onClick={handleVirtualAssessmentModalOpen}
          >
            {translate('appointments_page.virtual_btn')}
          </StyledButton>
        ) : (
          <CancelBtn type="button" variant="outlined" onClick={handleCancelModalOpen}>
            {translate('appointments_page.cancel_appointment_button')}
          </CancelBtn>
        )}
      </>
    ),
    [APPOINTMENT_STATUS.Active]: (
      <>
        {!appointment.activityLog.length && (
          <DoubleButtonBox>
            <CancelBtn type="button" variant="outlined" onClick={handleCancelModalOpen}>
              {translate('appointments_page.cancel_appointment_button')}
            </CancelBtn>
          </DoubleButtonBox>
        )}
      </>
    ),
    [APPOINTMENT_STATUS.Virtual]: VIRTUAL_COMPONENT,
    [APPOINTMENT_STATUS.SignedCaregiver]: role === USER_ROLE.Seeker && VIRTUAL_COMPONENT,
    [APPOINTMENT_STATUS.SignedSeeker]: role === USER_ROLE.Caregiver && VIRTUAL_COMPONENT,
  };

  const handleSignInAgreement = async (): Promise<void> => {
    const STATUS_MAP = {
      [USER_ROLE.Seeker]: {
        [APPOINTMENT_STATUS.SignedCaregiver]: APPOINTMENT_STATUS.Active,
        default: APPOINTMENT_STATUS.SignedSeeker,
      },
      [USER_ROLE.Caregiver]: {
        [APPOINTMENT_STATUS.SignedSeeker]: APPOINTMENT_STATUS.Active,
        default: APPOINTMENT_STATUS.SignedCaregiver,
      },
    };

    const newAppointmentStatus = STATUS_MAP[role][appointment!.status] ?? STATUS_MAP[role].default;

    const updateObject: Parameters<typeof updateAppointment>[0] = {
      id: selectedAppointmentId,
      status: newAppointmentStatus,
    };

    if (newAppointmentStatus === APPOINTMENT_STATUS.Active) {
      updateObject.signingDate = formatISO(utcToZonedTime(new Date(), appointment.timezone));
    }

    try {
      await updateAppointment(updateObject).unwrap();
      handleAgreementModalClose();
      setIsTermsAccepted(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Drawer open={isOpen} onClose={onClose}>
        <DrawerHeader>
          <IconButton size="small" onClick={onClose}>
            <ArrowBackFilled />
          </IconButton>
          <DrawerTitle>{translate('appointments_page.page_title')}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Block>
            <AppointmentName>{appointment?.name}</AppointmentName>
            <ActivityLogBlock>
              <AppointmentStatus status={appointment!.status} />
              {!isActivityLogReviewedShown(appointment, role as UserRole) &&
                role === USER_ROLE.Caregiver &&
                isActivityLogShown(appointment) && (
                  <Button variant="outlined" onClick={handleActivityLogModalOpen}>
                    {translate('appointments_page.activityLog')}
                  </Button>
                )}
              {!!getLatestPendingActivityLog(appointment.activityLog) &&
                role === USER_ROLE.Seeker && (
                  <Button variant="outlined" onClick={handleReviewActivityLogModalOpen}>
                    {translate('appointments_page.reviewActivityLog')}
                  </Button>
                )}
              {isActivityLogReviewedShown(appointment, role as UserRole) && (
                <DisabledText>
                  <PriorityIcon />
                  {role === USER_ROLE.Seeker
                    ? translate('appointments_page.reviewed')
                    : translate('appointments_page.filled')}
                </DisabledText>
              )}
            </ActivityLogBlock>
          </Block>
          {role === USER_ROLE.Seeker ? (
            <Block>
              <SubTitle>{translate('appointments_page.drawer.caregiver')}</SubTitle>
              <CaregiverBlock>
                <UserAvatar userId={appointment.caregiverInfo.user.id} size={SMALL_AVATAR_SIZE} />
                <CaregiverName>
                  {appointment?.caregiverInfo.user.firstName}{' '}
                  {appointment?.caregiverInfo.user.lastName}
                </CaregiverName>
                <StyledIconButton
                  edge="end"
                  aria-label="open-drawer"
                  onClick={(): void =>
                    appointment && handleCaregiverDrawerOpen(appointment?.caregiverInfo.user.id)
                  }
                >
                  <RightAction />
                </StyledIconButton>
              </CaregiverBlock>
            </Block>
          ) : (
            <Block>
              <SubTitle>{translate('appointments_page.drawer.patient')}</SubTitle>
              <CaregiverBlock>
                <UserAvatar userId={appointment.user.id} size={SMALL_AVATAR_SIZE} />
                <CaregiverName>
                  {appointment?.user.firstName} {appointment?.user.lastName}
                </CaregiverName>
              </CaregiverBlock>
            </Block>
          )}
          {appointment.status === APPOINTMENT_STATUS.Active && !!appointment.signingDate && (
            <Block>
              <SubTitle>{translate('appointments_page.drawer.agreement')}</SubTitle>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <CheckCircle color="primary" />
                </Grid>
                <Grid item xs={8}>
                  <DateText>{translate('appointments_page.signed')}</DateText>
                  <SubTitle>{`${translate('appointments_page.agreementSignedDate')} ${format(
                    parseISO(appointment.signingDate),
                    DATE_FORMAT
                  )}`}</SubTitle>
                </Grid>
                <Grid item xs={2}>
                  <Button variant="outlined" onClick={handleAgreementModalOpen}>
                    {translate('request_appointment.btns.view')}
                  </Button>
                </Grid>
              </Grid>
            </Block>
          )}

          <Block>
            <SubTitle>{translate('appointments_page.drawer.date')}</SubTitle>
            <DateText>{actualAppointmentDate}</DateText>
          </Block>

          {appointment.status === APPOINTMENT_STATUS.Active && (
            <Block>
              <SubTitle>{translate('appointments_page.drawer.area')}</SubTitle>
              <AppointmentDrawerLocation placeId={appointment?.location} />
            </Block>
          )}

          {appointment && role === USER_ROLE.Caregiver && (
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
                        <CheckCircle color="primary" />
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
          )}
          <Block>
            <SubTitle>{translate('appointments_page.drawer.tasks')}</SubTitle>
            <TaskList>
              {appointment?.seekerTasks.map((task) => (
                <Task key={task.name}>{task.name}</Task>
              ))}
            </TaskList>
          </Block>
          <Block>
            <SubTitle>{translate('appointments_page.drawer.details')}</SubTitle>
            {appointment?.details ? (
              <DateText>{appointment?.details}</DateText>
            ) : (
              <DateText>{translate('appointments_page.drawer.details_empty')}</DateText>
            )}
          </Block>
        </DrawerBody>
        <DrawerFooter>
          {role === USER_ROLE.Admin ? null : DRAWER_FOOTERS[appointment!.status]}
        </DrawerFooter>
      </Drawer>
      <Modal
        onClose={handleCancelModalClose}
        title={translate('appointments_page.modal_title')}
        isActive={isCancelModalOpen}
      >
        <CancelModal
          selectedAppointmentId={selectedAppointmentId}
          onClose={handleCancelModalClose}
        />
      </Modal>
      <Modal
        onClose={handleAgreementModalClose}
        title={translate('appointments_page.agreement_modal_title')}
        isActive={isAgreementModalOpen}
        children={<AgreementModal appointment={appointment} />}
        footerChildren={
          appointment?.status !== APPOINTMENT_STATUS.Active && (
            <ModalFooter>
              <FormControlLabel
                control={<Checkbox onChange={(): void => setIsTermsAccepted(!isTermsAccepted)} />}
                label={
                  <StyledLabel>{translate('appointments_page.terms.checkbox_label')}</StyledLabel>
                }
              />
              <StyledButton
                type="button"
                variant="contained"
                onClick={handleSignInAgreement}
                disabled={!isTermsAccepted}
              >
                {translate('appointments_page.sign_agreement_button')}
              </StyledButton>
            </ModalFooter>
          )
        }
      />
      <CompleteAppointmentModal
        onClose={handleCompleteModalClose}
        onCancel={handleCancelModalOpen}
        onSignIn={handleAgreementModalOpen}
        isActive={isCompleteModalOpen}
        appointment={appointment}
        role={role}
      />
      {role === USER_ROLE.Seeker &&
      appointment.virtualAssessment?.status !== VIRTUAL_ASSESSMENT_STATUS.Accepted ? (
        <VirtualAssessmentModal
          purpose={AssessmentPurpose.request}
          caregiverName={`${appointment?.caregiverInfo.user.firstName} ${appointment?.caregiverInfo.user.lastName}`}
          caregiverId={appointment.caregiverInfo.user.id}
          selectedAppointmentId={selectedAppointmentId}
          onClose={handleVirtualAssessmentModalClose}
          isActive={isVirtualAssessmentModalOpen && !appointment.virtualAssessment?.wasRescheduled}
          appointment={appointment}
          openDrawer={openOriginalAppointment}
          openCaregiverProfile={(): void =>
            appointment && handleCaregiverDrawerOpen(appointment?.caregiverInfo.user.id)
          }
          openVirtualAssessmentSuccess={handleVirtualAssessmentSuccessModalOpen}
        />
      ) : (
        <VirtualAssessmentRequestModal
          appointment={appointment}
          isOpen={isVirtualAssessmentModalOpen}
          switchModalVisibility={handleVirtualAssessmentModalClose}
          openDrawer={openOriginalAppointment}
          closeDrawer={closeOriginalAppointment}
        />
      )}

      {isActivityLogModalOpen && (
        <ActivityLogModal
          isOpen={isActivityLogModalOpen}
          appointmentId={appointment.id}
          onClose={handleActivityLogModalClose}
          seekerTasks={appointment.seekerTasks}
        />
      )}

      {isReviewActivityLogModalOpen && (
        <ReviewActivityLogModal
          isOpen={isReviewActivityLogModalOpen}
          activityLog={appointment.activityLog}
          onClose={handleReviewActivityLogModalClose}
        />
      )}

      {virtualAssessmentDrawerShown && (
        <VirtualAssessmentRequestModal
          appointment={appointment}
          isOpen={isVirtualAssessmentModalOpen}
          switchModalVisibility={handleVirtualAssessmentModalClose}
          openDrawer={openOriginalAppointment}
          closeDrawer={closeOriginalAppointment}
        />
      )}
      <VirtualAssessmentSuccess
        isActive={isVirtualAssessmentSuccessOpen}
        handleClose={handleVirtualAssessmentSuccessModalClose}
        role={USER_ROLE.Caregiver}
      />
    </>
  );
}
