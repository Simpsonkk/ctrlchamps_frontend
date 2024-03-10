import { AnyObject, ObjectSchema, object, string } from 'yup';
import { useLocales } from 'src/locales';
import { ONLY_LETTERS_PATTERN } from 'src/constants';

export type SignUpThirdFormValues = {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
};

export const useSignUpThirdSchema = (): ObjectSchema<
  SignUpThirdFormValues,
  AnyObject,
  {
    country: undefined;
    state: undefined;
    city: undefined;
    zipCode: undefined;
    address: undefined;
  },
  ''
> => {
  const { translate } = useLocales();

  return object({
    country: string().required(translate('signUpThirdForm.countryRequired')),
    state: string()
      .trim()
      .matches(ONLY_LETTERS_PATTERN, translate('signUpThirdForm.stateOnlyLetters'))
      .max(100, translate('signUpThirdForm.stateMaxLength'))
      .required(translate('signUpThirdForm.stateRequired')),
    city: string()
      .trim()
      .matches(ONLY_LETTERS_PATTERN, translate('signUpThirdForm.cityOnlyLetters'))
      .required(translate('signUpThirdForm.cityRequired'))
      .max(100, translate('signUpThirdForm.cityMaxLength')),
    zipCode: string()
      .trim()
      .required(translate('signUpThirdForm.zipCodeRequired'))
      .max(100, translate('signUpThirdForm.zipCodeMaxLength')),
    address: string()
      .trim()
      .required(translate('signUpThirdForm.addressRequired'))
      .max(100, translate('signUpThirdForm.addressMaxLength')),
  });
};
