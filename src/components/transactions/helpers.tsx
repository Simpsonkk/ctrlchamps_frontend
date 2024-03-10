import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { USER_ROLE } from 'src/constants';
import { PRIMARY, SECONDARY } from '../../theme/colors';
import { TransactionAmmount } from './styles';
import { TransactionType } from './enums';

export const getTransactionColor = (type: string, role: string): string => {
  switch (type) {
    case TransactionType.Outcome:
      return role === USER_ROLE.Seeker ? SECONDARY.error : PRIMARY.main;
    case TransactionType.Income:
      return role === USER_ROLE.Seeker ? PRIMARY.main : SECONDARY.error;
    default:
      return '';
  }
};
export const getTransactionTitle = (
  type: string,
  role: string,
  amount: number,
  translate: (key: string) => string
): React.ReactNode => {
  switch (type) {
    case TransactionType.Outcome:
      return role === USER_ROLE.Seeker ? (
        <span>
          {translate('transactions.payment_sent')}:{' '}
          <TransactionAmmount>${amount}</TransactionAmmount>
          {translate('transactions.for_your_appointment')}
        </span>
      ) : (
        <span>
          {translate('transactions.withdrawal')}: <TransactionAmmount>${amount}</TransactionAmmount>
        </span>
      );
    case TransactionType.Income:
      return role === USER_ROLE.Caregiver ? (
        <span>
          {translate('transactions.payment_received')}:{' '}
          <TransactionAmmount>${amount}</TransactionAmmount>{' '}
          {translate('transactions.for_your_appointment')}
        </span>
      ) : (
        <span>
          {translate('transactions.top_up')}: <TransactionAmmount>${amount}</TransactionAmmount>
        </span>
      );
    default:
      return null;
  }
};

export const getTransactionIcon = (type: string): React.ReactNode => {
  switch (type) {
    case TransactionType.Outcome:
      return <ArrowDownwardIcon sx={{ color: 'white' }} />;
    case TransactionType.Income:
      return <ArrowUpwardIcon sx={{ color: 'white' }} />;
    default:
      return null;
  }
};
