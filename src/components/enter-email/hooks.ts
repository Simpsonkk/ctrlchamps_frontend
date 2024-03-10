import { Dispatch, SetStateAction, useState } from 'react';
import { useLocales } from 'src/locales';
import { checkIsEmail } from 'src/utils/checkEmail';
import { useRequestResetCodeMutation } from 'src/redux/api/authApi';
import { BAD_REQUEST_STATUS, MIN_EMAIL_LENGTH } from './constants';

type ReturnType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  isDisabled: boolean;
  emailNotExists: boolean;
  showError: boolean;
  serverError: string | null;
  setEmailNotExists: Dispatch<SetStateAction<boolean>>;
  sendCode: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  translate: (text: string) => string;
};

export function useEnterEmail(next: (email?: string) => void): ReturnType {
  const { translate } = useLocales();
  const [email, setEmail] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [emailNotExists, setEmailNotExists] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [requestCode] = useRequestResetCodeMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setEmail(e.target.value);

    setIsDisabled(false);
    setEmailNotExists(false);
    setServerError(null);

    if (!checkIsEmail(email)) {
      setIsDisabled(true);
      if (email.length > MIN_EMAIL_LENGTH) setShowError(true);
    } else {
      setIsDisabled(false);
      setShowError(false);
    }
  };

  const sendCode = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!checkIsEmail(email)) return;

    try {
      setIsDisabled(true);
      await requestCode({ email }).unwrap();
      next(email);
    } catch (err) {
      if (err.status === BAD_REQUEST_STATUS) {
        setEmailNotExists(true);

        return;
      }

      setServerError(translate('reset_password.errors.unexpected'));
    }
  };

  return {
    email,
    setEmail,
    isDisabled,
    emailNotExists,
    setEmailNotExists,
    onChange,
    sendCode,
    translate,
    showError,
    serverError,
  };
}
