import { daySelectedType } from 'src/constants/types';
import { Caregiver, CaregiverInfo } from 'src/types/Caregiver.type';

export type CaregiverFilterState = {
  location: AutocompletedLocation;
  isShowAvailableCaregivers: boolean;
  isOpenToSeekerHomeLiving: boolean;
  services: CaregiverFilterService[];
  ratings: CaregiverFilterRating[];
  startDate: Date;
  endDate: Date;
  weekdays: daySelectedType[] | null;
};

export type CaregiverFilterService = {
  label: CaregiverService;
  checked: boolean;
};

export type CaregiverFilterRating = {
  label: string;
  checked: boolean;
};

export type PreviewCaregiver = Pick<Caregiver, 'id' | 'lastName' | 'firstName' | 'averageRating'> &
  Pick<CaregiverInfo, 'hourlyRate'>;

export type CaregiverService =
  | 'personalCare'
  | 'medicationManagement'
  | 'mobilitySupport'
  | 'mealPreparation'
  | 'housekeeping'
  | 'socialActivities';

export type AutocompletedLocation = {
  country: string;
  city: string;
  address: string;
  state: string;
  zipCode: string;
  utcOffset: number;
  latLng: string;
};
