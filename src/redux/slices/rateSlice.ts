import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRate {
  hourlyRate: number;
  error: string;
}

const initialState: IRate = {
  hourlyRate: 0,
  error: '',
};

const rateSlice = createSlice({
  name: 'hourlyRate',
  initialState,
  reducers: {
    saveRate: (state, action: PayloadAction<IRate['hourlyRate']>) => {
      state.hourlyRate = action.payload;
    },
  },
});

export const { saveRate } = rateSlice.actions;
export const rateReducer = rateSlice.reducer;
