import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TIMEZONE_FORMAT } from 'src/constants';
import { daySelectedType } from 'src/constants/types';
import { useUpdateProfileMutation } from 'src/redux/api/profileCompleteApi';
import { chooseAvailableTime } from 'src/redux/slices/availableDaysSlice';
import { setToken } from 'src/redux/slices/tokenSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { FIRST_ELEMENT, PLUS_HOUR, availableTimeOptions } from './constants';
import { HookReturnType } from './types';

interface IProps {
  onNext: () => void;
  onSuccess?: () => void;
}

export default function useCompleteProfileFourth({onNext, onSuccess}:IProps): HookReturnType {
  const dispatch = useAppDispatch();
  const { days: availableDays } = useTypedSelector((state) => state.availableDays);
  const [specifyAvailability] = useUpdateProfileMutation();

  const [daySelected, setDaySelected] = useState<daySelectedType | null>(null);
  const [chosenDays, setChosenDays] = useState<string[]>([]);
  const [availableFrom, setAvailableFrom] = useState<string>('');
  const [availableTo, setAvailableTo] = useState<string>('');
  const [invalidTimeError, setInvalidTimeError] = useState<boolean>(false);
  const [invalidTimeErrors, setInvalidTimeErrors] = useState<string[]>([]);
  const [identicalTimeError, setIdenticalTimeError] = useState<boolean>(false);
  const [identicalTimeErrors, setIdenticalTimeErrors] = useState<string[]>([]);
  const [serverError, setServerError] = useState<boolean>(false);

  const isButtonDisabled =
    invalidTimeErrors.length > 0 ||
    identicalTimeErrors.length > 0 ||
    !daySelected ||
    !availableFrom ||
    !availableTo ||
    invalidTimeError ||
    availableFrom === availableTo;

  useEffect(() => {
    const selectedDays = availableDays.map(({ day }) => day);
    setChosenDays(selectedDays);
  }, [availableDays]);

  useEffect(() => {
    if (daySelected && availableFrom && availableTo) {
      dispatch(
        chooseAvailableTime({
          time: {
            startTime: availableFrom,
            endTime: availableTo,
            day: daySelected,
          },
        })
      );
    }
  }, [daySelected, availableFrom, availableTo, dispatch]);

  const chooseDay = (selectedDay: daySelectedType): void => {
    const dayAlreadyChosen = availableDays.find(({ day }) => day === selectedDay);
    setDaySelected(selectedDay);

    if (dayAlreadyChosen) {
      setAvailableFrom(dayAlreadyChosen.startTime);
      setAvailableTo(dayAlreadyChosen.endTime);
    } else {
      setAvailableFrom('');
      setAvailableTo('');
    }

    if (dayAlreadyChosen && invalidTimeErrors.includes(selectedDay)) {
      setInvalidTimeError(true);
    } else {
      setInvalidTimeError(false);
    }

    if (dayAlreadyChosen && identicalTimeErrors.includes(selectedDay)) {
      setIdenticalTimeError(true);
    } else {
      setIdenticalTimeError(false);
    }

    const filteredDays = availableDays.map(({ day }) => day);
    setChosenDays(filteredDays);

    if (!dayAlreadyChosen) {
      setChosenDays((prev) => [...prev, selectedDay]);
    }
  };

  const handleErrors = (
    condition: boolean,
    errors: string[],
    setError: Dispatch<SetStateAction<boolean>>,
    setErrors: Dispatch<SetStateAction<string[]>>
  ): void => {
    if (condition) {
      setError(true);
      if (daySelected) setErrors([...errors, daySelected]);
    } else {
      const currentErrors = errors.filter((error) => error !== daySelected);
      setErrors(currentErrors);
      setError(false);
    }
  };

  const chooseFromTime = (value: string): void => {
    setAvailableFrom(value);

    const chosenValueIndex = availableTimeOptions.indexOf(value);
    const hourlyAdjustedValue = availableTimeOptions.slice(chosenValueIndex + PLUS_HOUR)[
      FIRST_ELEMENT
    ];

    if (availableFrom) {
      handleErrors(
        value > availableTo,
        invalidTimeErrors,
        setInvalidTimeError,
        setInvalidTimeErrors
      );
    }

    handleErrors(
      value === availableTo,
      identicalTimeErrors,
      setIdenticalTimeError,
      setIdenticalTimeErrors
    );

    if (availableFrom) return;

    if (!hourlyAdjustedValue) {
      setAvailableTo(availableTimeOptions[FIRST_ELEMENT]);
    } else {
      setAvailableTo(hourlyAdjustedValue);
    }
  };

  const chooseToTime = (value: string): void => {
    setAvailableTo(value);

    handleErrors(
      value < availableFrom,
      invalidTimeErrors,
      setInvalidTimeError,
      setInvalidTimeErrors
    );

    handleErrors(
      value === availableFrom,
      identicalTimeErrors,
      setIdenticalTimeError,
      setIdenticalTimeErrors
    );
  };

  const defineAvailableDays = async (): Promise<void> => {
    try {
      setServerError(false);
      await specifyAvailability({
        updateProfileDto: {
          availability: [...availableDays],
          timeZone: TIMEZONE_FORMAT,
        },
      })
        .unwrap()
        .then((data) => {
          if (!data.token) return;
          dispatch(setToken(data.token));
          if (onSuccess) {
            onSuccess();
          }
        });
      onNext();
    } catch (err) {
      setServerError(true);
    }
  };

  return {
    daySelected,
    chosenDays,
    availableFrom,
    availableTo,
    chooseDay,
    chooseFromTime,
    chooseToTime,
    defineAvailableDays,
    invalidTimeError,
    invalidTimeErrors,
    identicalTimeError,
    identicalTimeErrors,
    serverError,
    setServerError,
    isButtonDisabled,
  };
}
