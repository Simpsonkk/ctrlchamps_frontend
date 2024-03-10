import { MAX_PHONE_CHARACTERS } from 'src/components/sign-up-second/constants';
import { EMAIL_PATTERN, MAX_CHARACTERS_LENGTH, MIN_PASSWORD_LENGTH } from 'src/constants';
import { useLocales } from 'src/locales';
import { UserRole } from 'src/redux/slices/userSlice';
import { AnyObject, ObjectSchema, mixed, object, string } from 'yup';
import { AdminFormValues } from './types';

export const useAdminFormSchema = (
  isEditingExistingAdmin: boolean
): ObjectSchema<
  AdminFormValues,
  AnyObject,
  {
    firstName: undefined;
    lastName: undefined;
    phoneNumber: undefined;
    role: undefined;
    email: undefined;
    password: undefined;
  },
  ''
> => {
  const { translate } = useLocales();

  return object({
    firstName: string()
      .trim()
      .max(MAX_CHARACTERS_LENGTH, translate('adminManagement.adminForm.firstNameInvalid'))
      .required(translate('adminManagement.adminForm.firstNameRequired')),
    lastName: string()
      .trim()
      .max(MAX_CHARACTERS_LENGTH, translate('adminManagement.adminForm.lastNameInvalid'))
      .required(translate('adminManagement.adminForm.lastNameRequired')),
    email: string()
      .trim()
      .matches(EMAIL_PATTERN, translate('adminManagement.adminForm.emailInvalid'))
      .max(MAX_CHARACTERS_LENGTH, translate('adminManagement.adminForm.emailLengthInvalid'))
      .required(translate('adminManagement.adminForm.emailRequired')),
    phoneNumber: string()
      .trim()
      .length(MAX_PHONE_CHARACTERS, translate('adminManagement.adminForm.phoneLengthInvalid'))
      .required(translate('adminManagement.adminForm.phoneRequired')),
    password: isEditingExistingAdmin
      ? string()
          .notRequired()
          .min(MIN_PASSWORD_LENGTH, translate('adminManagement.adminForm.passwordInvalid'))
          .transform((originalValue) =>
            originalValue.trim() === '' ? undefined : originalValue.trim()
          )
      : string()
          .trim()
          .min(MIN_PASSWORD_LENGTH, translate('adminManagement.adminForm.passwordInvalid')),
    role: mixed<UserRole>()
      .oneOf(['Admin'] as UserRole[])
      .required(),
    updatedAt: string()
      .notRequired()
      .transform(() => undefined),
  });
};
