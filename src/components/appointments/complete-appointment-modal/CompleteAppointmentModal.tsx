import { MouseEvent } from 'react';
import { ChevronRight } from '@mui/icons-material';

import { useLocales } from 'src/locales';
import { USER_ROLE, SMALL_AVATAR_SIZE } from 'src/constants';
import Cross from 'src/assets/icons/Cross';
import { DetailedAppointment } from 'src/redux/api/appointmentApi';
import UserAvatar from 'src/components/reusable/user-avatar/UserAvatar';

import {
  BackDrop,
  ModalWrapper,
  ModalHeader,
  CloseButton,
  HeaderTitle,
  Block,
  ModalBody,
  CaregiverBlock,
  CaregiverName,
  StyledIconButton,
  SubTitle,
  TaskList,
  Task,
  DoubleButtonBox,
  StyledButton,
  CancelBtn,
  OpenAppointmentBlock,
  OpenAppointmentText,
} from './styles';

interface IProps {
  onClose: () => void;
  onCancel: () => void;
  onSignIn: () => void;
  isActive: boolean;
  appointment?: DetailedAppointment;
  role: string;
}

export default function CompleteAppointmentModal({
  onClose,
  onCancel,
  onSignIn,
  isActive,
  appointment,
  role,
}: IProps): JSX.Element | null {
  const { translate } = useLocales();

  if (!isActive || !appointment) return null;

  const handleBackdropClick = (): void => {
    onClose();
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  return (
    <BackDrop onClick={handleBackdropClick}>
      <ModalWrapper onClick={handleModalClick}>
        <ModalHeader>
          <CloseButton onClick={onClose}>
            <Cross />
          </CloseButton>
          <HeaderTitle>{translate('appointments_page.complete_modal_title')}</HeaderTitle>
        </ModalHeader>
        <ModalBody>
          <Block>
            <OpenAppointmentBlock>
              <OpenAppointmentText>
                {translate('appointments_page.complete_modal_subtitle')}
              </OpenAppointmentText>
              <StyledIconButton edge="end" onClick={onClose}>
                <ChevronRight color="primary" />
              </StyledIconButton>
            </OpenAppointmentBlock>
          </Block>
          {role === USER_ROLE.Seeker ? (
            <Block>
              <SubTitle>{translate('appointments_page.drawer.caregiver')}</SubTitle>
              <CaregiverBlock>
                <UserAvatar userId={appointment.caregiverInfo.user.id} size={SMALL_AVATAR_SIZE} />
                <CaregiverName>
                  {appointment.caregiverInfo.user.firstName}{' '}
                  {appointment.caregiverInfo.user.lastName}
                </CaregiverName>
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
          <Block>
            <SubTitle>{translate('appointments_page.drawer.tasks')}</SubTitle>
            <TaskList>
              {appointment.seekerTasks.map((task) => (
                <Task key={task.name}>{task.name}</Task>
              ))}
            </TaskList>
          </Block>
          <Block>
            <DoubleButtonBox>
              <StyledButton type="button" variant="contained" onClick={onSignIn}>
                {translate('appointments_page.sign_in_button')}
              </StyledButton>
              <CancelBtn type="button" variant="outlined" onClick={onCancel}>
                {translate('appointments_page.cancel_appointment_button')}
              </CancelBtn>
            </DoubleButtonBox>
          </Block>
        </ModalBody>
      </ModalWrapper>
    </BackDrop>
  );
}
