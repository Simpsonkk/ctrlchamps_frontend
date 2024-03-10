import React from 'react';
import { useLocales } from 'src/locales';
import { PaymentWarningBlock } from './styles';

type Props = {
  confirmationStep: boolean;
};

export default function PaymentNotification({ confirmationStep }: Props): JSX.Element {
  const { translate } = useLocales();

  return !confirmationStep ? (
    <PaymentWarningBlock>
      {translate('create_appointment.errors.payment_warning')}
    </PaymentWarningBlock>
  ) : (
    <PaymentWarningBlock insufficientCost>
      {translate('create_appointment.errors.insufficient_balance')}
    </PaymentWarningBlock>
  );
}
