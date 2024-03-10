import { Dispatch, SetStateAction, useState } from 'react';
import {
  SubmitHandler,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
import { generatePassword } from 'src/utils/generatePassword';

import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { EMAIL_ERROR, PHONE_ERROR } from 'src/constants';
import { adminPanelApi } from 'src/redux/api/adminPanelAPI';
import { authApi } from 'src/redux/api/authApi';
import { ROUTES } from 'src/routes';
import { AdminFormValues } from './types';

interface UseAdminFormProps {
  onSubmit: (data: AdminFormValues) => void;
  setValue: UseFormSetValue<AdminFormValues>;
  getValues: UseFormGetValues<AdminFormValues>;
  setError: UseFormSetError<AdminFormValues>;
  trigger: UseFormTrigger<AdminFormValues>;
  isEditingExistingAdmin: boolean;
  adminId?: string;
  touchedFields: Partial<
    Readonly<{
      phoneNumber?: boolean | undefined;
    }>
  >;
}

interface UseAdminFormReturnType {
  handleArrowBackClick: () => Promise<boolean>;
  handleClickShowPassword: () => void;
  handleGeneratePasswordClick: () => void;
  handleCopyClick: () => Promise<boolean>;
  copiedText: string | null;
  resetCopiedText: () => void;
  handleSubmitClick: SubmitHandler<AdminFormValues>;
  showPassword: boolean;
  isPasswordRegenerated: boolean;
  setIsPasswordRegenerated: Dispatch<SetStateAction<boolean>>;
}

export const useAdminForm = ({
  onSubmit,
  setValue,
  getValues,
  trigger,
  setError,
  touchedFields,
  isEditingExistingAdmin,
  adminId,
}: UseAdminFormProps): UseAdminFormReturnType => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const { copiedText, copy, resetCopiedText } = useCopyToClipboard();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPasswordRegenerated, setIsPasswordRegenerated] = useState<boolean>(false);

  const [accountCheck] = authApi.useAccountCheckMutation();

  const [regeneratePassword] = adminPanelApi.useUpdateAdminPasswordMutation();

  const handleArrowBackClick = (): Promise<boolean> => router.push(ROUTES.adminManagement);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  const handleGeneratePasswordClick = async (): Promise<void> => {
    const generatedPassword = generatePassword();

    if (isEditingExistingAdmin && adminId) {
      try {
        await regeneratePassword({ id: adminId, password: generatedPassword }).then(() => {
          setIsPasswordRegenerated(true);
        });
      } catch (error) {
        throw new Error(error);
      }
    }

    setValue('password', generatedPassword);
    trigger('password');
  };

  const handleCopyClick = (): Promise<boolean> => copy(getValues('password') ?? '');

  const handleSubmitClick: SubmitHandler<AdminFormValues> = async (data) => {
    const { email, phoneNumber } = data;

    if (isEditingExistingAdmin && !touchedFields.phoneNumber) {
      return onSubmit(data);
    }

    try {
      return await accountCheck({
        email: isEditingExistingAdmin ? undefined : email,
        phoneNumber,
      })
        .unwrap()
        .then(() => {
          onSubmit(data);
        })
        .catch((error: FetchBaseQueryError) => {
          const errorMessage = (error.data as { message?: string })?.message;
          const isEmailError = errorMessage?.includes(EMAIL_ERROR);
          const isPhoneError = errorMessage?.includes(PHONE_ERROR);

          if (!isEditingExistingAdmin && isEmailError) {
            setError('email', {
              type: 'manual',
              message: translate('adminManagement.adminForm.emailExist') as string,
            });

            return;
          }

          if (isPhoneError) {
            setError('phoneNumber', {
              type: 'manual',
              message: translate('adminManagement.adminForm.phoneExist') as string,
            });

            return;
          }

          if (isEditingExistingAdmin) {
            onSubmit(data);
          }
        });
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    handleArrowBackClick,
    handleClickShowPassword,
    handleGeneratePasswordClick,
    handleCopyClick,
    copiedText,
    resetCopiedText,
    handleSubmitClick,
    showPassword,
    isPasswordRegenerated,
    setIsPasswordRegenerated,
  };
};
