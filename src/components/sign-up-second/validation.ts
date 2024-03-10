import { AnyObject, ObjectSchema, boolean, date, object, string } from 'yup';

import { MAX_BIRTH_DATE, MAX_PHONE_CHARACTERS } from 'src/components/sign-up-second/constants';
import { CURRENT_DAY, EMAIL_PATTERN, USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';

export type SignUpSecondValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  isOpenToSeekerHomeLiving?: boolean;
};

export const useSignUpSecondSchema = (
  role: string
): ObjectSchema<
  SignUpSecondValues,
  AnyObject,
  {
    firstName: undefined;
    lastName: undefined;
    email: undefined;
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
    email: string()
      .trim()
      .matches(EMAIL_PATTERN, translate('signUpSecondForm.emailInvalid'))
      .max(100, translate('signUpSecondForm.emailLengthInvalid'))
      .required(translate('signUpSecondForm.emailRequired')),
    phoneNumber: string()
      .trim()
      .length(MAX_PHONE_CHARACTERS, translate('signUpSecondForm.phoneLengthInvalid'))
      .required(translate('signUpSecondForm.phoneRequired')),
    dateOfBirth: date()
      .test(
        'is-caregiver-adult',
        role === USER_ROLE.Caregiver
          ? translate('signUpSecondForm.birthDateMaxCaregiver')
          : translate('signUpSecondForm.birthDateMax'),
        (value) => {
          if (role === USER_ROLE.Caregiver) {
            return !value || value <= MAX_BIRTH_DATE;
          }

          return !value || value <= CURRENT_DAY;
        }
      )
      .required(translate('signUpSecondForm.birthDateRequired')),
    isOpenToSeekerHomeLiving: boolean(),
  });
};
