import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HealthQuestionnaireState {
  selectedDiagnoses: string[];
  selectedActivities: { id: string; answer: string }[];
  selectedEnvChallenges: string[];
  notes: Record<string, string>;
}

const initialState: HealthQuestionnaireState = {
  selectedDiagnoses: [],
  selectedActivities: [],
  selectedEnvChallenges: [],
  notes: {},
};

interface SelectDiagnosisPayload {
  diagnoses: string[];
}

interface SelectActivityPayload {
  activities: { id: string; answer: string }[];
}

interface SelectEnvChallengesPayload {
  challenges: string[];
}

interface SaveNotePayload {
  step: string;
  note: string;
}

const healthQuestionnaireSlice = createSlice({
  name: 'healthQuestionnaire',
  initialState,
  reducers: {
    selectDiagnosis(state, action: PayloadAction<SelectDiagnosisPayload>) {
      state.selectedDiagnoses = action.payload.diagnoses;
    },
    selectActivity(state, action: PayloadAction<SelectActivityPayload>) {
      state.selectedActivities = action.payload.activities;
    },
    selectEnvChallenges(state, action: PayloadAction<SelectEnvChallengesPayload>) {
      state.selectedEnvChallenges = action.payload.challenges;
    },
    saveNote(state, action: PayloadAction<SaveNotePayload>) {
      const { step, note } = action.payload;
      state.notes[step] = note;
    },
    resetAllInfo: () => initialState,
  },
});

export const { selectDiagnosis, selectActivity, selectEnvChallenges, saveNote, resetAllInfo } =
  healthQuestionnaireSlice.actions;

export default healthQuestionnaireSlice.reducer;
export const healthQuestionnaireReducer = healthQuestionnaireSlice.reducer;
