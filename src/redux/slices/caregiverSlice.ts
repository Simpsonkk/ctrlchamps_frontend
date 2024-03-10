import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Caregiver } from 'src/types/Caregiver.type';

interface CaregiverState {
  selectedCaregiver: Caregiver | null;
}

const initialState: CaregiverState = {
  selectedCaregiver: null,
};

const caregiverSlice = createSlice({
  name: 'caregiver',
  initialState,
  reducers: {
    setSelectedCaregiver: (state, action: PayloadAction<Caregiver>) => {
      state.selectedCaregiver = action.payload;
    },
  },
});

export const { setSelectedCaregiver } = caregiverSlice.actions;
export const caregiverReducer = caregiverSlice.reducer;
