import { AnyObject, ObjectSchema, object, ref, string } from 'yup';

import { MIN_PASSWORD_LENGTH, PASSWORD_PATTERN } from 'src/components/sign-up-fourth/constants';
import { useLocales } from 'src/locales';

export type SignUpFourthFormValues = {
  password: string;
  confirmPassword: string;
};

export const useSignUpFourthSchema = (): ObjectSchema<
  SignUpFourthFormValues,
  AnyObject,
  {
    password: undefined;
    confirmPassword: undefined;
  },
  ''
> => {
  const { translate } = useLocales();

  return object({
    password: string()
      .min(MIN_PASSWORD_LENGTH, translate('signUpFourthForm.passwordInvalid'))
      .required(translate('signUpFourthForm.passwordRequired'))
      .test(
        'no-spaces',
        translate('signUpFourthForm.passwordNoSpaces'),
        (value) => !PASSWORD_PATTERN.test(value)
      ),
    confirmPassword: string()
      .oneOf([ref('password'), undefined], translate('signUpFourthForm.passwordsNotMatching'))
      .required(translate('signUpFourthForm.confirmPasswordRequired')),
  });
};
