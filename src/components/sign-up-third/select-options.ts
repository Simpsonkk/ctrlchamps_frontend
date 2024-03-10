import { useLocales } from 'src/locales';

export type SelectCountries = 'Canada' | 'USA';

type SelectOptions = {
  value: SelectCountries;
  label: string;
};

type Countries = {
  countries: SelectOptions[];
};

export const useSignUpThirdCountrySelectOptions = (): Countries => {
  const { translate } = useLocales();

  const countries: SelectOptions[] = [
    {
      label: translate('countries.canada'),
      value: 'Canada',
    },
    {
      label: translate('countries.unitedStates'),
      value: 'USA',
    },
  ];

  return { countries };
};
