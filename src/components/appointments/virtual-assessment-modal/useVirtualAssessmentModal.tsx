import { format, isBefore, isSameDay, isToday } from 'date-fns';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { selectTimeOptions } from 'src/components/create-appointment/constants';
import { APPOINTMENT_STATUS, BACKEND_DATE_FORMAT, CURRENT_DAY, URL_PATTERN } from 'src/constants';
import { DetailedAppointment, useUpdateAppointmentMutation } from 'src/redux/api/appointmentApi';
import { virtualAssessmentApi } from 'src/redux/api/virtualAssessmentApi';

import { calculateTimeDifference, calculateEndTime } from 'src/utils/calculateTimeDifference';
import useChooseTime from 'src/hooks/useChooseTime';
import { isTimeAfterNow } from 'src/utils/checkTime';
import { utcToZonedTime } from 'date-fns-tz';
import { setCustomTime } from 'src/utils/defineCustomTime';
import {
  INTERVAL_30_MINUTES_IDX,
  MAX_ASSESSMENT_HOURS_DURATION,
  MAX_REASON_LENGTH,
  MIN_REASON_LENGTH,
  MIN_VALUE,
} from './constants';
import { convertLocalTimeToUTC } from './helpers';

type ReturnType = {
  startTime: string;
  endTime: string;
  date: Date | null;
  meetingLink: string;
  reschedulingReason: string;
  isLinkCopied: boolean;
  isButtonDisabled: boolean;
  isRescheduleBtnDisabled: boolean;
  invalidTime: boolean;
  maxDurationExceeded: boolean;
  hasAppointmentTimePassed: boolean;
  chooseDate: (value: Date | null) => void;
  chooseStartTime: (value: string) => void;
  chooseEndTime: (value: string) => void;
  requestAssessment: () => Promise<void>;
  rescheduleAssessment: () => Promise<void>;
  setReschedulingReason: Dispatch<SetStateAction<string>>;
  setMeetingLink: Dispatch<SetStateAction<string>>;
  setIsLinkCopied: Dispatch<SetStateAction<boolean>>;
  copyLink: () => void;
  showInvalidLinkError: boolean;
  minReasonLength: boolean;
  maxReasonLength: boolean;
  serverError: boolean;
};

export default function useVirtualAssessmentModal(
  appointmentId: string,
  openVirtualAssessmentSuccess: () => void,
  onClose: () => void,
  appointment: DetailedAppointment
): ReturnType {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [meetingLink, setMeetingLink] = useState<string>('');
  const [reschedulingReason, setReschedulingReason] = useState<string>('');
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);
  const [invalidTime, setInvalidTime] = useState<boolean>(false);
  const [maxDurationExceeded, setMaxDurationExceeded] = useState<boolean>(false);
  const [hasAppointmentTimePassed, setHasAppointmentTimePassed] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);

  useEffect(() => {
    if (!date) return;

    const virtualAssessmentDate = setCustomTime(date, startTime);
    const appointmentDate = utcToZonedTime(new Date(appointment.startDate), appointment.timezone);

    if (appointmentDate > virtualAssessmentDate) {
      setHasAppointmentTimePassed(false);
    } else {
      setHasAppointmentTimePassed(true);
    }
  }, [date, startTime, appointment.startDate, appointment.timezone]);

  const { chooseStartTime: selectStartTime, chooseEndTime: selectEndTime } = useChooseTime(
    selectTimeOptions,
    setStartTime,
    setEndTime,
    INTERVAL_30_MINUTES_IDX
  );

  const [requestVirtualAssessment, { isLoading }] =
    virtualAssessmentApi.useMakeVirtualAssessmentRequestMutation();
  const [rescheduleVirtualAssessment] =
    virtualAssessmentApi.useRescheduleVirtualAssessmentMutation();
  const [updateAppointment] = useUpdateAppointmentMutation();

  const validLink = URL_PATTERN.test(meetingLink);
  const minReasonLength = reschedulingReason.length < MIN_REASON_LENGTH;
  const maxReasonLength = reschedulingReason.length > MAX_REASON_LENGTH;

  const isButtonDisabled =
    !date ||
    !startTime ||
    !endTime ||
    invalidTime ||
    startTime === endTime ||
    !validLink ||
    (date && isBefore(date, CURRENT_DAY) && !isSameDay(date, CURRENT_DAY)) ||
    (!isTimeAfterNow(startTime) && isToday(date));
  const isRescheduleBtnDisabled = isButtonDisabled || minReasonLength || maxReasonLength;

  const checkTimeValidity = (condition: boolean): void => {
    if (condition) {
      setInvalidTime(true);
    } else {
      setInvalidTime(false);
    }
  };

  const checkIfDurationExceeded = (hours: number, minutes: number): void => {
    if (
      hours > MAX_ASSESSMENT_HOURS_DURATION ||
      (hours === MAX_ASSESSMENT_HOURS_DURATION && minutes !== MIN_VALUE)
    ) {
      setMaxDurationExceeded(true);
    } else {
      setMaxDurationExceeded(false);
    }
  };

  const chooseStartTime = (value: string): void => {
    selectStartTime(value);
    setInvalidTime(false);

    if (startTime) checkTimeValidity(endTime < value);

    const halfAnHourDifference = calculateEndTime(
      selectTimeOptions,
      value,
      INTERVAL_30_MINUTES_IDX
    );

    const { hours, minutes } = calculateTimeDifference(
      value,
      selectTimeOptions[halfAnHourDifference]
    );

    checkIfDurationExceeded(hours, minutes);
  };

  const chooseEndTime = (value: string): void => {
    selectEndTime(value);
    if (startTime) checkTimeValidity(value < startTime);

    const { hours, minutes } = calculateTimeDifference(startTime, value);

    checkIfDurationExceeded(hours, minutes);
  };

  const chooseDate = (value: Date | null): void => setDate(value);

  const requestAssessment = async (): Promise<void> => {
    try {
      if (!date) return;
      if (!isLoading) setServerError(false);

      await requestVirtualAssessment({
        startTime: convertLocalTimeToUTC(startTime),
        endTime: convertLocalTimeToUTC(endTime),
        assessmentDate: format(date, BACKEND_DATE_FORMAT),
        meetingLink,
        appointmentId,
      }).unwrap();

      await updateAppointment({
        id: appointmentId,
        status: APPOINTMENT_STATUS.Virtual,
      }).unwrap();

      openVirtualAssessmentSuccess();
    } catch (err) {
      setServerError(true);
    }
  };

  const rescheduleAssessment = async (): Promise<void> => {
    try {
      if (!date) return;
      if (!isLoading) setServerError(false);

      await rescheduleVirtualAssessment({
        reason: reschedulingReason,
        startTime: convertLocalTimeToUTC(startTime),
        endTime: convertLocalTimeToUTC(endTime),
        assessmentDate: format(date, BACKEND_DATE_FORMAT),
        meetingLink,
        appointmentId,
      }).unwrap();

      openVirtualAssessmentSuccess();
      onClose();
    } catch (err) {
      setServerError(true);
    }
  };

  const copyLink = (): void => {
    if (validLink) {
      setIsLinkCopied(true);
      navigator.clipboard.writeText(meetingLink);
    }
  };

  return {
    startTime,
    endTime,
    date,
    meetingLink,
    reschedulingReason,
    isLinkCopied,
    isButtonDisabled,
    isRescheduleBtnDisabled,
    invalidTime,
    serverError,
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
    minReasonLength,
    maxReasonLength,
    showInvalidLinkError: !validLink && meetingLink.length > MIN_VALUE,
  };
}
