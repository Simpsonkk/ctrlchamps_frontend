import Head from 'next/head';
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';

import FlowHeader from 'src/components/reusable/header/FlowHeader';
import OTPMessageField from 'src/components/sendOTP/AccountVerification';
import SuccessfulVerification from 'src/components/sendOTP/SuccessfulVerification';

interface AccountVerificationProps {
  onSubmit: () => void;
}

const AccountVerification: React.FC<AccountVerificationProps> = (): JSX.Element => {
  const { t } = useTranslation();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const onSubmit = (): void => {
    setIsSubmitted(true);
  };

  return (
    <PrivateRoute>
      <Head>
        <title>{t('account_verification.account_verification')}</title>
      </Head>
      <FlowHeader text={t('account_verification.account_verification')} infoButton />
      {isSubmitted ? <SuccessfulVerification /> : <OTPMessageField onSubmit={onSubmit} />}
    </PrivateRoute>
  );
};

export default AccountVerification;
