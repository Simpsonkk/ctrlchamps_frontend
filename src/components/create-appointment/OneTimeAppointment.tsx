import { Box } from '@mui/material';
import { isBefore, isSameDay, isToday } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import OneTimeIcon from 'src/assets/icons/OneTimeIcon';
import { ErrorText } from 'src/components/reusable';
import AppointmentBtn from 'src/components/reusable/appointment-btn/AppointmentBtn';
import { CURRENT_DAY } from 'src/constants';
import useChooseTime from 'src/hooks/useChooseTime';
import { setOneAppointmentTime } from 'src/redux/slices/appointmentSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { setCustomTime } from 'src/utils/defineCustomTime';
import { extractTimeFromDate } from 'src/utils/extractTimeFromDate';

import { isTimeAfterNow } from 'src/utils/checkTime';
import Appointment from './Appointment';
import PaymentNotification from './PaymentNotification';
import {
  MIN_HOURS_BEFORE_APPOINTMENT,
  ONE_HOUR_INTERVAL_INDEX,
  borderlineHours,
  lateStartHours,
  nextDayHours,
  selectTimeOptions,
} from './constants';
import { checkIfTodayAppointmentWithinInterval } from './helpers';
import { AppointmentDuration, Container, ContentContainer } from './styles';
import useShowDuration from './useShowDuration';

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export default function OneTimeAppointment({ onNext, onBack }: Props): JSX.Element {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const { oneTimeDate } = useTypedSelector((state) => state.appointment);

  const [date, setDate] = useState<Date | null>(oneTimeDate.startTime);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [identicalTime, setIdenticalTime] = useState<boolean>(false);
  const [invalidTime, setInvalidTime] = useState<boolean>(false);
  const [nextDayTime, setNextDayTime] = useState<boolean>(false);
  const [paymentWarningVisible, setPaymentWarningVisible] = useState<boolean>(false);

  const { hours, minutes, isDurationSet, minValidDuration } = useShowDuration(startTime, endTime);
  const { chooseStartTime, chooseEndTime } = useChooseTime(
    selectTimeOptions,
    setStartTime,
    setEndTime,
    ONE_HOUR_INTERVAL_INDEX
  );

  useEffect(() => {
    if (!oneTimeDate.startTime || !oneTimeDate.endTime) return;

    const startDateTime = extractTimeFromDate(oneTimeDate.startTime);
    const endDateTime = extractTimeFromDate(oneTimeDate.endTime);

    if (startDateTime && endDateTime) {
      setStartTime(startDateTime);
      const endTimeValue = endDateTime === '23:59' ? '00:00' : endDateTime;
      setEndTime(endTimeValue);
    }
  }, [oneTimeDate.startTime, oneTimeDate.endTime]);

  useEffect(() => {
    if (!startTime || !endTime) return;

    if (startTime === endTime) {
      setIdenticalTime(true);
    } else {
      setIdenticalTime(false);
    }

    if (startTime > endTime && !borderlineHours.includes(startTime)) {
      setInvalidTime(true);
    } else {
      setInvalidTime(false);
    }

    if (
      lateStartHours.includes(startTime) ||
      nextDayHours.includes(endTime) ||
      (startTime === borderlineHours[0] && endTime !== borderlineHours.at(-1))
    ) {
      setNextDayTime(true);
    } else {
      setNextDayTime(false);
    }

    if (startTime && date && !lateStartHours.includes(startTime)) {
      const isTimeWithinInterval = checkIfTodayAppointmentWithinInterval(
        startTime,
        MIN_HOURS_BEFORE_APPOINTMENT
      );

      if (isToday(date) && isTimeWithinInterval) {
        setPaymentWarningVisible(true);
      } else {
        setPaymentWarningVisible(false);
      }
    }
  }, [startTime, endTime, date]);

  const saveToStore = (chosenDate: Date): void => {
    dispatch(
      setOneAppointmentTime({
        startTime: setCustomTime(chosenDate, startTime),
        endTime:
          startTime === '23:00'
            ? setCustomTime(chosenDate, '23:59')
            : setCustomTime(chosenDate, endTime),
      })
    );
  };

  const chooseDate = (value: Date | null): void => {
    setDate(value);

    if (startTime && endTime && value) {
      saveToStore(value);
    }
  };

  const goNext = (): void => {
    if (!date) return;

    saveToStore(date);
    onNext();
  };

  return (
    <Box>
      <Container>
        <ContentContainer>
          <Appointment
            selectTimeOptions={selectTimeOptions}
            startTime={startTime}
            endTime={endTime}
            date={date}
            chooseStartTime={chooseStartTime}
            chooseEndTime={chooseEndTime}
            chooseDate={chooseDate}
          />
          {nextDayTime && <ErrorText>{translate('create_appointment.errors.next_day')}</ErrorText>}
          {invalidTime && (
            <ErrorText>{translate('create_appointment.errors.invalid_time')}</ErrorText>
          )}
          {identicalTime && (
            <ErrorText>{translate('create_appointment.errors.identical_time')}</ErrorText>
          )}
          {startTime && endTime && startTime !== endTime && isDurationSet && !minValidDuration && (
            <ErrorText>{translate('create_appointment.errors.min_appointment_duration')}</ErrorText>
          )}
          {date && isBefore(date, CURRENT_DAY) && !isSameDay(date, CURRENT_DAY) && (
            <ErrorText>{translate('create_appointment.errors.invalid_date')}</ErrorText>
          )}
          {date && isToday(date) && !isTimeAfterNow(startTime) && (
            <ErrorText> {translate('create_appointment.errors.invalid_today_time')}</ErrorText>
          )}
          {paymentWarningVisible && <PaymentNotification confirmationStep={false} />}
          {startTime && endTime && date && minValidDuration && !identicalTime && !invalidTime && (
            <AppointmentDuration>
              <OneTimeIcon />
              {minutes > 0
                ? translate('create_appointment.duration_with_minutes', {
                    hours,
                    minutes,
                  })
                : translate('create_appointment.duration', {
                    hours,
                  })}
            </AppointmentDuration>
          )}
        </ContentContainer>

        <AppointmentBtn
          nextText={translate('btn_next')}
          backText={translate('profileQualification.back')}
          disabled={
            !date ||
            !startTime ||
            !endTime ||
            !minValidDuration ||
            invalidTime ||
            identicalTime ||
            nextDayTime ||
            (isBefore(date, CURRENT_DAY) && !isSameDay(date, CURRENT_DAY)) ||
            (!isTimeAfterNow(startTime) && isToday(date))
          }
          onClick={goNext}
          onBack={onBack}
        />
      </Container>
    </Box>
  );
}
