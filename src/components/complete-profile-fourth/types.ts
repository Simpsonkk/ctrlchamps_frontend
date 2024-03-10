import { Dispatch, SetStateAction } from 'react';
import { daySelectedType } from 'src/constants/types';

export type HookReturnType = {
  daySelected: daySelectedType | null;
  chosenDays: string[];
  availableFrom: string;
  availableTo: string;
  isButtonDisabled: boolean;
  chooseDay: (selectedDay: daySelectedType) => void;
  chooseFromTime: (value: string) => void;
  chooseToTime: (value: string) => void;
  defineAvailableDays: () => Promise<void>;
  invalidTimeError: boolean;
  invalidTimeErrors: string[];
  identicalTimeError: boolean;
  identicalTimeErrors: string[];
  serverError: boolean;
  setServerError: Dispatch<SetStateAction<boolean>>;
};
