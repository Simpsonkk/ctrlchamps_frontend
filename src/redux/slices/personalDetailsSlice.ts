import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPersonalDetails {
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    isOpenToSeekerHomeLiving?: boolean;
  };
  error: string;
}

const initialState: IPersonalDetails = {
  personalDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    isOpenToSeekerHomeLiving: false,
  },
  error: '',
};

const personalDetailsSlice = createSlice({
  name: 'personalDetails',
  initialState,
  reducers: {
    savePersonalDetails: (state, action: PayloadAction<IPersonalDetails['personalDetails']>) => {
      state.personalDetails = { ...state.personalDetails, ...action.payload };
    },
  },
});

export const { savePersonalDetails } = personalDetailsSlice.actions;
export const personalDetailsReducer = personalDetailsSlice.reducer;
