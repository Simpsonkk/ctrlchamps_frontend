import { format, parseISO } from 'date-fns';

import { useLocales } from 'src/locales';
import { APPOINTMENT_STATUS, APPOINTMENT_TYPE, DATE_FORMAT } from 'src/constants';

import { DetailedAppointment } from 'src/redux/api/appointmentApi';
import {
  CURRENT_DATE,
  PAYMENT_DAY,
  MILEAGE_PRICE,
  RENT_PRICE,
} from 'src/components/appointments/constants';

import { Container, SubTitle, Text, Span, TaskList, Task } from './styles';
import { countHoursPerWeek } from './helpers';

interface IProps {
  appointment?: DetailedAppointment;
}

export default function AgreementModal({ appointment }: IProps): JSX.Element | null {
  const { translate } = useLocales();

  if (!appointment) return null;

  const hoursPerWeek =
    appointment.type === APPOINTMENT_TYPE.Recurring &&
    appointment.weekday &&
    countHoursPerWeek(appointment.startDate, appointment.endDate, JSON.parse(appointment.weekday));

  return (
    <Container>
      <div>
        <SubTitle>{translate('appointments_page.terms.term_of_agreement_title')}</SubTitle>
        <Text>
          {translate('appointments_page.terms.term_of_agreement_text1')}
          {appointment.status !==
            (APPOINTMENT_STATUS.Virtual ||
              APPOINTMENT_STATUS.SignedCaregiver ||
              APPOINTMENT_STATUS.SignedSeeker) && appointment.signingDate ? (
            <Span>{format(parseISO(appointment.signingDate), DATE_FORMAT)}</Span>
          ) : (
            <Span>{CURRENT_DATE}</Span>
          )}
          {translate('appointments_page.terms.term_of_agreement_text2')}
        </Text>
      </div>
      <div>
        <SubTitle>{translate('appointments_page.terms.purpose_title')}</SubTitle>
        <Text>{translate('appointments_page.terms.purpose_text')}</Text>
      </div>
      <div>
        <SubTitle>{translate('appointments_page.terms.services_title')}</SubTitle>
        <Text>{translate('appointments_page.terms.services_text')}</Text>
        <TaskList>
          {appointment.seekerTasks.map((task) => (
            <Task key={task.name}>{task.name}</Task>
          ))}
        </TaskList>
      </div>
      {hoursPerWeek && (
        <div>
          <SubTitle>{translate('appointments_page.terms.schedule_title')}</SubTitle>
          <Text>
            {translate('appointments_page.terms.schedule_text1')}
            <Span>{hoursPerWeek}</Span>
            {translate('appointments_page.terms.schedule_text2')}
          </Text>
        </div>
      )}
      <div>
        <Text>
          {translate('appointments_page.terms.payment_text1')}
          <Span>{appointment.caregiverInfo.hourlyRate}</Span>
          {translate('appointments_page.terms.payment_text2')}
          <Span>{PAYMENT_DAY}</Span>
          {translate('appointments_page.terms.payment_text3')}
        </Text>
      </div>
      <div>
        <Text>
          {translate('appointments_page.terms.mileage_text1')}
          <Span>{MILEAGE_PRICE}</Span>
          {translate('appointments_page.terms.mileage_text2')}
        </Text>
      </div>
      <div>
        <Text>
          {translate('appointments_page.terms.home_living_text1')}
          <Span>{RENT_PRICE}</Span>
          {translate('appointments_page.terms.home_living_text2')}
        </Text>
      </div>
    </Container>
  );
}
