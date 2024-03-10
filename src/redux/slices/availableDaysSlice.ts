import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type DayType = {
  day: string;
  startTime: string;
  endTime: string;
};

type ActionType = {
  time: DayType;
};

type InitialState = {
  days: DayType[];
};

const initialState: InitialState = {
  days: [],
};

const availableDaysSlice = createSlice({
  name: 'availableDays',
  initialState,
  reducers: {
    chooseAvailableTime: (state, action: PayloadAction<ActionType>) => {
      const index = state.days.findIndex(({ day }) => day === action.payload.time.day);
      if (index !== -1) {
        state.days[index] = action.payload.time;
      } else {
        state.days.push(action.payload.time);
      }
    },
  },
});

export const { chooseAvailableTime } = availableDaysSlice.actions;
export const availableDaysReducer = availableDaysSlice.reducer;
