import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Address {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
}

interface AddressState {
  addressData: Address;
}

const initialState: AddressState = {
  addressData: {
    country: '',
    state: '',
    city: '',
    zipCode: '',
    address: '',
  },
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    saveAddressData: (state, action: PayloadAction<Address>) => {
      state.addressData = { ...action.payload };
    },
  },
});

export const { saveAddressData } = addressSlice.actions;
export const addressReducer = addressSlice.reducer;

export default addressSlice.reducer;
