import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IServices {
  services: {
    PersonalCareAssistance: boolean;
    MedicationManagement: boolean;
    MobilitySupport: boolean;
    MealPreparation: boolean;
    HousekeepingAndLaundry: boolean;
    SocialAndRecreationalActivities: boolean;
  };
  error: string;
}

const initialState: IServices = {
  services: {
    PersonalCareAssistance: false,
    MedicationManagement: false,
    MobilitySupport: false,
    MealPreparation: false,
    HousekeepingAndLaundry: false,
    SocialAndRecreationalActivities: false,
  },
  error: '',
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    saveServices: (state, action: PayloadAction<IServices['services']>) => {
      state.services = { ...state.services, ...action.payload };
    },
  },
});

export const { saveServices } = servicesSlice.actions;
export const servicesReducer = servicesSlice.reducer;
