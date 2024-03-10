import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Certificate } from '../api/profileCompleteApi';

interface CertificateState {
  certificates: Certificate[];
}

const initialState: CertificateState = {
  certificates: [],
};

const certificateSlice = createSlice({
  name: 'certificate',
  initialState,
  reducers: {
    saveCertificates: (state, action: PayloadAction<Certificate[]>) => {
      state.certificates = action.payload;
    },
  },
});

export const { saveCertificates } = certificateSlice.actions;
export const certificateReducer = certificateSlice.reducer;
