import { useState } from 'react';
import OneTimeIcon from 'src/assets/icons/OneTimeIcon';
import RecurringIcon from 'src/assets/icons/RecurringIcon';
import {
  CancelAppointmentModal,
  useCancelAppointmentModal,
} from 'src/components/modal-cancel-appointment';
import { ErrorText, FilledButton } from 'src/components/reusable';
import { AppointmentType as AppointmentTypeI } from 'src/constants/types';
import { useLocales } from 'src/locales';
import { setAppointmentName, setAppointmentType } from 'src/redux/slices/appointmentSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { MAX_APPOINTMENT_NAME_LENGTH, MIN_APPOINTMENT_NAME_LENGTH } from './constants';
import { Appointment } from './enums';
import {
  AppointmentTypeCard,
  AppointmentTypeDetails,
  AppointmentTypeInput,
  AppointmentTypeText,
  Background,
  Container,
  ContentContainer,
  IconWrapper,
  StyledForm,
} from './styles';

export default function AppointmentType({ onNext }: { onNext: () => void }): JSX.Element {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const { appointmentName, appointmentType } = useTypedSelector((state) => state.appointment);
  const { modalOpen, setModalOpen } = useCancelAppointmentModal();

  const [name, setName] = useState<string>(appointmentName);
  const [type, setType] = useState<AppointmentTypeI>(appointmentType);

  const selectOneTime = (): void => setType(Appointment.oneTime);
  const selectRecurring = (): void => setType(Appointment.recurring);
  const changeAppointmentName = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setName(e.target.value);
  };

  const goNext = (): void => {
    dispatch(setAppointmentName(name));
    dispatch(setAppointmentType(type));
    onNext();
  };

  return (
    <>
      <Background>
        <Container>
          <ContentContainer>
            <StyledForm>
              <AppointmentTypeInput
                label={translate('create_appointment.placeholder.name')}
                variant="standard"
                autoComplete="off"
                fullWidth
                size="small"
                value={name}
                onChange={changeAppointmentName}
              />
              {name.length > 0 && name.length <= MIN_APPOINTMENT_NAME_LENGTH && (
                <ErrorText>{translate('create_appointment.errors.min_type_char')}</ErrorText>
              )}
              {name.length > MAX_APPOINTMENT_NAME_LENGTH && (
                <ErrorText>{translate('create_appointment.errors.max_type_char')}</ErrorText>
              )}
              <AppointmentTypeCard
                className={type === Appointment.oneTime ? 'active' : ''}
                onClick={selectOneTime}
              >
                <IconWrapper>
                  <OneTimeIcon />
                </IconWrapper>
                <AppointmentTypeText>
                  {translate('create_appointment.type.one')}
                </AppointmentTypeText>
                <AppointmentTypeDetails>
                  {translate('create_appointment.type.one_desc')}
                </AppointmentTypeDetails>
              </AppointmentTypeCard>
              <AppointmentTypeCard
                className={type === Appointment.recurring ? 'active' : ''}
                onClick={selectRecurring}
              >
                <IconWrapper>
                  <RecurringIcon />
                </IconWrapper>
                <AppointmentTypeText>
                  {translate('create_appointment.type.recurring')}
                </AppointmentTypeText>
                <AppointmentTypeDetails>
                  {translate('create_appointment.type.recurring_desc')}
                </AppointmentTypeDetails>
              </AppointmentTypeCard>
              <FilledButton
                type="submit"
                onClick={goNext}
                disabled={
                  type === null ||
                  name.trim().length <= MIN_APPOINTMENT_NAME_LENGTH ||
                  name.trim().length > MAX_APPOINTMENT_NAME_LENGTH
                }
              >
                {translate('create_appointment.btn_next')}
              </FilledButton>
            </StyledForm>
          </ContentContainer>
        </Container>
      </Background>
      <CancelAppointmentModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
