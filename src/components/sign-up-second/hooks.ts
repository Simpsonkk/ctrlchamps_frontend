import { useMemo } from 'react';
import { parse } from 'date-fns';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { UseFormSetError } from 'react-hook-form';

import { useLocales } from 'src/locales';
import { useAccountCheckMutation } from 'src/redux/api/authApi';
import { useTypedSelector } from 'src/redux/store';
import { DATE_FORMAT, EMAIL_ERROR, PHONE_ERROR } from 'src/constants';
import { SignUpSecondValues } from 'src/components/sign-up-second/validation';

interface IProps {
  email: string;
  phoneNumber: string;
}

type DefaultValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date | undefined;
  isOpenToSeekerHomeLiving?: boolean;
};

type ReturnType = {
  defaultValues: DefaultValuesType;
  onAccountCheck: (
    { email, phoneNumber }: IProps,
    setError: UseFormSetError<SignUpSecondValues>
  ) => void;
};

export function useSignUpSecond(onNext: () => void): ReturnType {
  const { translate } = useLocales();
  const [accountCheck] = useAccountCheckMutation();

  const initialDetailsValues = useTypedSelector((state) => state.personalDetails.personalDetails);

  const initialDateOfBirth = useMemo(
    () =>
      initialDetailsValues.dateOfBirth
        ? parse(initialDetailsValues.dateOfBirth, DATE_FORMAT, new Date())
        : undefined,
    [initialDetailsValues]
  );

  const defaultValues = { ...initialDetailsValues, dateOfBirth: initialDateOfBirth };

  const onAccountCheck = async (
    { email, phoneNumber }: IProps,
    setError: UseFormSetError<SignUpSecondValues>
  ): Promise<void> => {
    try {
      await accountCheck({ email, phoneNumber })
        .unwrap()
        .then(() => {
          onNext();
        })
        .catch((error: FetchBaseQueryError) => {
          const errorMessage = (error.data as { message?: string })?.message;
          const isEmailError = errorMessage?.includes(EMAIL_ERROR);
          const isPhoneError = errorMessage?.includes(PHONE_ERROR);

          if (isEmailError) {
            setError('email', {
              type: 'manual',
              message: translate('signUpSecondForm.emailExist'),
            });

            return;
          }

          if (isPhoneError) {
            setError('phoneNumber', {
              type: 'manual',
              message: translate('signUpSecondForm.phoneExist'),
            });
          }
        });
    } catch (error) {
      throw new Error(error);
    }
  };

  return { defaultValues, onAccountCheck };
}
