export type CompleteProfileSecondValues = {
  workplace: string;
  qualifications: string;
  startDate: Date | string;
  endDate?: Date | string;
  isEndDateDisabled: boolean;
};

export type ProfileExperience = CompleteProfileSecondValues & {
  id: string;
};

export type SelectQualifications = 'Hospital' | 'Clinic' | 'Agency' | 'Other';

export type SelectOptions = {
  value: SelectQualifications;
  label: string;
};

export type Qualifications = {
  qualifications: SelectOptions[];
};
