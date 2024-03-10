import { useEffect, useState } from 'react';
import { calculateTimeDifference } from 'src/utils/calculateTimeDifference';
import { AppointmentDurationI } from './types';
import { MIN_APPOINTMENT_HOUR_DURATION } from './constants';

type ReturnType = {
  hours: number;
  minutes: number;
  isDurationSet: boolean;
  minValidDuration: boolean;
};

export default function useShowDuration(startTime: string, endTime: string): ReturnType {
  const [appointmentDuration, setAppointmentDuration] = useState<AppointmentDurationI>({
    hours: 0,
    minutes: 0,
  });
  const [isDurationSet, setIsDurationSet] = useState<boolean>(false);

  useEffect(() => {
    if (startTime && endTime) {
      const { hours, minutes } = calculateTimeDifference(startTime, endTime);

      setAppointmentDuration({ hours, minutes });
      setIsDurationSet(true);
    }
  }, [startTime, endTime]);

  return {
    isDurationSet,
    hours: appointmentDuration.hours,
    minutes: appointmentDuration.minutes,
    minValidDuration: appointmentDuration.hours >= MIN_APPOINTMENT_HOUR_DURATION,
  };
}
