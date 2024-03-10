import {
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableHead,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { format, parseISO } from 'date-fns';

import { useLocales } from 'src/locales';
import { User, useUpdateUserMutation } from 'src/redux/api/userApi';
import { useGetTransactionsQuery } from 'src/redux/api/transactionsApi';
import {
  DATE_FORMAT,
  DISPLAY_TIME_FORMAT,
  FIRST_PAGE,
  TRANSACTION_TYPE,
  USER_STATUS,
} from 'src/constants';

import { PAGINATION_LIMIT } from './constants';
import { Block, StatusBlock, Subtitle, Value } from './styles';
import { StyledTableCell, StyledTableRow, TableHeader } from '../user-list/styles';
import UpdateSuccess from '../reusable/update-success/UpdateSuccess';

interface IProps {
  user: User;
}

export default function AccountTransactions({ user }: IProps): JSX.Element | null {
  const { translate } = useLocales();
  const [transactionsPage, setTransactionsPage] = useState<number>(FIRST_PAGE);
  const [statusUpdated, setStatusUpdated] = useState<boolean>(false);

  const [updateUser] = useUpdateUserMutation();

  const { data: transactions } = useGetTransactionsQuery({
    userId: user.id,
    offset: (transactionsPage - FIRST_PAGE) * PAGINATION_LIMIT,
    limit: PAGINATION_LIMIT,
  });

  const handleChangeStatus = async (event: SelectChangeEvent, id: string): Promise<void> => {
    try {
      await updateUser({ id, status: event.target.value })
        .unwrap()
        .then(() => setStatusUpdated(true));
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleTransactionsPageChange = (event: ChangeEvent<unknown>, value: number): void => {
    setTransactionsPage(value);
  };

  return (
    <>
      <StatusBlock>
        <Subtitle>{translate('userList.status')}:</Subtitle>
        <Select
          value={user.status}
          sx={{ width: 200, height: 40 }}
          onChange={(event): Promise<void> => handleChangeStatus(event, user.id)}
        >
          <MenuItem value={USER_STATUS.Active}>{USER_STATUS.Active}</MenuItem>
          <MenuItem value={USER_STATUS.Inactive}>{USER_STATUS.Inactive}</MenuItem>
        </Select>
      </StatusBlock>
      <Block>
        <Subtitle>{translate('userList.transactions')}</Subtitle>
        {transactions && transactions.data.length > 0 ? (
          <>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <TableHeader>{translate('userList.date')}</TableHeader>
                  <TableHeader>{translate('userList.type')}</TableHeader>
                  <TableHeader>{translate('userList.amount')}</TableHeader>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {transactions.data.map((transaction) => (
                  <StyledTableRow key={transaction.id}>
                    <StyledTableCell>
                      {format(
                        parseISO(transaction.createdAt),
                        `${DATE_FORMAT} ${DISPLAY_TIME_FORMAT}`
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {transaction.type === TRANSACTION_TYPE.Income
                        ? translate('userList.replenishment')
                        : translate('userList.withdrawal')}
                    </StyledTableCell>
                    <StyledTableCell>{transaction.amount}$</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <Stack display="flex" direction="row" justifyContent="center" mt={2}>
              <Pagination
                count={Math.ceil(transactions.count / PAGINATION_LIMIT)}
                page={transactionsPage}
                onChange={handleTransactionsPageChange}
              />
            </Stack>
          </>
        ) : (
          <Value>{translate('userList.anyTransactions')}</Value>
        )}
      </Block>
      <StatusBlock>
        <Subtitle>{translate('userList.wallet')}:</Subtitle>
        <Subtitle>{user.balance} $</Subtitle>
      </StatusBlock>
      <UpdateSuccess
        dataUpdated={statusUpdated}
        setDataUpdated={setStatusUpdated}
        message={translate('userList.statusSuccess')}
      />
    </>
  );
}
