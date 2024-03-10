import { TFunction } from 'i18next';
import {
  ControllerRenderProps,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';
import { MAX_PHONE_CHARACTERS } from 'src/components/sign-up-second/constants';
import { END_INDEX, START_INDEX, ZERO } from './constants';
import { AdminFormValues } from './types';

type ValidatePhoneNumberProps = {
  value: string;
  field: ControllerRenderProps<AdminFormValues, 'phoneNumber'>;
  setError: UseFormSetError<AdminFormValues>;
  setValue: UseFormSetValue<AdminFormValues>;
  clearErrors: UseFormClearErrors<AdminFormValues>;
  getValues: UseFormGetValues<AdminFormValues>;
  translate: TFunction<'translation', undefined, 'translation'>;
};

export const validatePhoneNumber = ({
  clearErrors,
  field,
  setError,
  setValue,
  value,
  getValues,
  translate,
}: ValidatePhoneNumberProps): void => {
  const currentValue = getValues('phoneNumber');
  field.onChange(value);
  if (value.slice(START_INDEX, END_INDEX) === ZERO) {
    field.onChange('');
    setError('phoneNumber', {
      type: 'manual',
      message: `${translate('adminManagement.adminForm.phoneInvalid')}`,
    });

    return;
  }
  if (value.slice(START_INDEX, END_INDEX) === '') {
    field.onChange('');
    setError('phoneNumber', {
      type: 'manual',
      message: `${translate('adminManagement.adminForm.phoneInvalid1')}`,
    });

    return;
  }
  if (value.length <= MAX_PHONE_CHARACTERS) {
    field.onChange(value);
    setValue('phoneNumber', value);

    return;
  }
  if (value.length > MAX_PHONE_CHARACTERS) {
    field.onChange(currentValue);
    setError('phoneNumber', {
      type: 'manual',
      message: `${translate('adminManagement.adminForm.phoneLengthInvalid')}`,
    });

    return;
  }
  clearErrors('phoneNumber');
};
