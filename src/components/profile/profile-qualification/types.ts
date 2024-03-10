export type ProfileQualityFormValues = {
  name: string;
  certificateId: string;
  link: string;
  dateIssued: Date | string;
  expirationDate?: Date | string;
  isExpirationDateDisabled: boolean;
};

export type ProfileQuality = ProfileQualityFormValues & {
  id: string;
};

export type Step = {
  label: string;
  component: JSX.Element;
};
