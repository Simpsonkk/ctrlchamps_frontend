import { combineReducers } from 'redux';

import { addressReducer } from 'src/redux/slices/addressSlice';
import { appointmentReducer } from 'src/redux/slices/appointmentSlice';
import { availableDaysReducer } from 'src/redux/slices/availableDaysSlice';
import { caregiverReducer } from 'src/redux/slices/caregiverSlice';
import { certificateReducer } from 'src/redux/slices/certificateSlice';
import { healthQuestionnaireReducer } from 'src/redux/slices/healthQuestionnaireSlice';
import { locationReducer } from 'src/redux/slices/locationSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { rateReducer } from 'src/redux/slices/rateSlice';
import { roleReducer } from 'src/redux/slices/roleSlice';
import { servicesReducer } from 'src/redux/slices/servicesSlice';
import { tokenReducer } from 'src/redux/slices/tokenSlice';
import { workExperienceReducer } from 'src/redux/slices/workEperienceSlice';
import { userReducer } from './slices/userSlice';

const rootReducer = combineReducers({
  role: roleReducer,
  personalDetails: personalDetailsReducer,
  address: addressReducer,
  token: tokenReducer,
  caregiver: caregiverReducer,
  certificate: certificateReducer,
  availableDays: availableDaysReducer,
  healthQuestionnaire: healthQuestionnaireReducer,
  workExperience: workExperienceReducer,
  services: servicesReducer,
  hourlyRate: rateReducer,
  appointment: appointmentReducer,
  location: locationReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
