import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface LocationState {
  location: string;
  timezone: string;
  prediction: google.maps.places.AutocompletePrediction | null;
}

const initialState: LocationState = {
  location: '',
  timezone: '',
  prediction: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setTimezone: (state, action: PayloadAction<string>) => {
      state.timezone = action.payload;
    },
    setPrediction: (
      state,
      action: PayloadAction<google.maps.places.AutocompletePrediction | null>
    ) => {
      state.prediction = action.payload;
    },
    resetLocationSlice: () => initialState,
  },
});

export const { setLocation, setTimezone, setPrediction, resetLocationSlice } =
  locationSlice.actions;
export const locationReducer = locationSlice.reducer;
