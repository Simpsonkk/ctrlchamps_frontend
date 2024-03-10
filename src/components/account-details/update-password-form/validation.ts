import { MIN_PASSWORD_LENGTH } from 'src/constants';
import { useLocales } from 'src/locales';
import { AnyObject, ObjectSchema, object, ref, string } from 'yup';

export type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ReturnType = ObjectSchema<
  FormValues,
  AnyObject,
  {
    oldPassword: undefined;
    newPassword: undefined;
    confirmPassword: undefined;
  },
  ''
>;

export function useUpdatePassword(): ReturnType {
  const { translate } = useLocales();

  return object({
    oldPassword: string()
      .trim()
      .min(MIN_PASSWORD_LENGTH, translate('changePassword.errors.invalid_length'))
      .required(translate('changePassword.errors.required')),
    newPassword: string()
      .trim()
      .min(MIN_PASSWORD_LENGTH, translate('changePassword.errors.invalid_length'))
      .required(translate('changePassword.errors.required')),
    confirmPassword: string()
      .oneOf([ref('newPassword')], translate('changePassword.errors.not_match'))
      .notOneOf([ref('oldPassword')], translate('changePassword.errors.invalid_pass'))
      .required(translate('changePassword.errors.required')),
  });
}
