export type CompleteProfileThirdValues = {
  PersonalCareAssistance: boolean;
  MedicationManagement: boolean;
  MobilitySupport: boolean;
  MealPreparation: boolean;
  HousekeepingAndLaundry: boolean;
  SocialAndRecreationalActivities: boolean;
};

export interface IProps {
  onNext: () => void;
  onBack: () => void;
  onSuccess?: () => void;
}

export type ReturnType = {
  onUpdateServices: (data: CompleteProfileThirdValues) => void;
};
