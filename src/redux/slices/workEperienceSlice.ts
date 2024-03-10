import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WorkExperience } from '../api/profileCompleteApi';

interface WorkExperienceState {
  workExperiences: WorkExperience[];
}

const initialState: WorkExperienceState = {
  workExperiences: [],
};

const workExperienceSlice = createSlice({
  name: 'workExperience',
  initialState,
  reducers: {
    saveWorkExperiences: (state, action: PayloadAction<WorkExperience[]>) => {
      state.workExperiences = action.payload;
    },
  },
});

export const { saveWorkExperiences } = workExperienceSlice.actions;
export const workExperienceReducer = workExperienceSlice.reducer;
