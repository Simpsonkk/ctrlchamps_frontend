import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppointmentType, daySelectedType } from 'src/constants/types';

type OneTimeDateType = {
  startTime: Date | null;
  endTime: Date | null;
};

type RecurringDateType = {
  startDate: Date | null;
  endDate: Date | null;
  weekDays: daySelectedType[];
};

export interface AppointmentI {
  appointmentName: string;
  appointmentType: AppointmentType;
  oneTimeDate: OneTimeDateType;
  recurringDate: RecurringDateType;
}

const initialState: AppointmentI = {
  appointmentName: '',
  appointmentType: null,
  oneTimeDate: {
    startTime: null,
    endTime: null,
  },
  recurringDate: {
    startDate: null,
    endDate: null,
    weekDays: [],
  },
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setAppointmentName: (state, action: PayloadAction<string>) => {
      state.appointmentName = action.payload;
    },
    setAppointmentType: (state, action: PayloadAction<AppointmentType>) => {
      state.appointmentType = action.payload;
    },
    setOneAppointmentTime: (state, action: PayloadAction<OneTimeDateType>) => {
      state.oneTimeDate = action.payload;
    },
    setRecurringAppointmentTime: (state, action: PayloadAction<RecurringDateType>) => {
      state.recurringDate = action.payload;
    },
    cancelAppointment: () => initialState,
  },
});

export const {
  setAppointmentName,
  setAppointmentType,
  setOneAppointmentTime,
  setRecurringAppointmentTime,
  cancelAppointment,
} = appointmentSlice.actions;
export const appointmentReducer = appointmentSlice.reducer;
