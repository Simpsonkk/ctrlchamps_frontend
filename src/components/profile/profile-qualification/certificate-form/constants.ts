import { ProfileQualityFormValues } from 'src/components/profile/profile-qualification/types';

export const DEFAULT_PROFILE_QUALIFICATION_VALUES: ProfileQualityFormValues = {
  name: '',
  certificateId: '',
  link: '',
  dateIssued: '',
  expirationDate: '',
  isExpirationDateDisabled: false,
};

export const MAX_CERTIFICATE_DATE = new Date();

export const ONE_DAY = 1;
