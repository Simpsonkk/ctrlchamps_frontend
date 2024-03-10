import { ChevronRight } from '@mui/icons-material';
import { Button, Pagination, Stack } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { Transaction } from 'src/redux/api/transactionsApi';

import { InlineBlock } from '../appointment-request-modal/styles';
import { PAGINATION_LIMIT } from './constants';
import { getTransactionColor, getTransactionIcon, getTransactionTitle } from './helpers';
import {
  IconWrapper,
  TransactionModalTitle,
  TransactionParagraph,
  TransactionsModalWrapper,
} from './styles';

type TransactionsModalProps = {
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
  transactions: Transaction[];
  count: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  openDrawer: (appointmentId: string) => void;
};

const TransactionsModal = ({
  role,
  transactions,
  openDrawer,
  count,
  page,
  setPage,
}: TransactionsModalProps): JSX.Element => {
  const { translate } = useLocales();

  const handlePageChange = (event: ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

  return (
    <TransactionsModalWrapper>
      <TransactionModalTitle>{translate('transactions.transactions')}</TransactionModalTitle>
      {transactions &&
        transactions.map((transaction) => (
          <TransactionParagraph key={transaction.id}>
            <InlineBlock>
              <IconWrapper backgroundColor={getTransactionColor(transaction.type, role)}>
                {getTransactionIcon(transaction.type)}
              </IconWrapper>
              <div>
                {getTransactionTitle(transaction.type, role, transaction.amount, translate)}
              </div>
            </InlineBlock>
            {transaction.appointmentId && (
              <Button
                color="inherit"
                onClick={(): void => openDrawer(transaction.appointmentId as string)}
              >
                <ChevronRight />
              </Button>
            )}
          </TransactionParagraph>
        ))}

      {count >= 0 && (
        <Stack display="flex" direction="row" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(count / PAGINATION_LIMIT)}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </TransactionsModalWrapper>
  );
};

export default TransactionsModal;
