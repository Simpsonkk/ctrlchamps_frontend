import { useLocales } from 'src/locales';
import { SelectOptions, Qualifications } from 'src/components/complete-profile-second/types';

export const useExperienceSelectOptions = (): Qualifications => {
  const { translate } = useLocales();

  const qualifications: SelectOptions[] = [
    {
      label: translate('completeProfileSecond.qualifications.hospital'),
      value: 'Hospital',
    },
    {
      label: translate('completeProfileSecond.qualifications.clinic'),
      value: 'Clinic',
    },
    {
      label: translate('completeProfileSecond.qualifications.agency'),
      value: 'Agency',
    },
    {
      label: translate('completeProfileSecond.qualifications.other'),
      value: 'Other',
    },
  ];

  return { qualifications };
};
