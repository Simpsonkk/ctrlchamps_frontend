import { useLocales } from 'src/locales';
import { AnyObject, ObjectSchema, boolean, object, date, string } from 'yup';
import { MAX_BIRTH_DATE, MAX_PHONE_CHARACTERS } from 'src/components/sign-up-second/constants';
import { PersonalInfo } from './types';

export const usePersonalInfoSchema = (): ObjectSchema<
  PersonalInfo,
  AnyObject,
  {
    firstName: undefined;
    lastName: undefined;
    phoneNumber: undefined;
    dateOfBirth: undefined;
    isOpenToSeekerHomeLiving?: undefined;
  },
  ''
> => {
  const { translate } = useLocales();

  return object({
    firstName: string()
      .trim()
      .max(100, translate('signUpSecondForm.firstNameInvalid'))
      .required(translate('signUpSecondForm.firstNameRequired')),
    lastName: string()
      .trim()
      .max(100, translate('signUpSecondForm.lastNameInvalid'))
      .required(translate('signUpSecondForm.lastNameRequired')),
    phoneNumber: string()
      .trim()
      .length(MAX_PHONE_CHARACTERS, translate('signUpSecondForm.phoneLengthInvalid'))
      .required(translate('signUpSecondForm.phoneRequired')),
    dateOfBirth: date()
      .max(MAX_BIRTH_DATE, translate('signUpSecondForm.birthDateMax'))
      .required(translate('signUpSecondForm.birthDateRequired')),
    isOpenToSeekerHomeLiving: boolean(),
  });
};
