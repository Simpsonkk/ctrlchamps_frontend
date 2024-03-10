import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AppointmentDrawer from 'src/components/appointments/appointment-drawer/AppointmentDrawer';
import { Background } from 'src/components/appointments/styles';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import MainHeader from 'src/components/reusable/header/MainHeader';
import TransactionsModal from 'src/components/transactions/TransactionsModal';
import { PAGINATION_LIMIT } from 'src/components/transactions/constants';
import { DEFAULT_REDIRECT_PATH, FIRST_PAGE } from 'src/constants';
import { useLocales } from 'src/locales';
import { useGetTransactionsQuery } from 'src/redux/api/transactionsApi';
import { UserRole } from 'src/redux/slices/userSlice';
import { useTypedSelector } from 'src/redux/store';

const TransactionsModalPage = (): JSX.Element | null => {
  const router = useRouter();
  const { translate } = useLocales();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>('');
  const [page, setPage] = useState<number>(FIRST_PAGE);

  const user = useTypedSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      router.replace(DEFAULT_REDIRECT_PATH);
    }
  }, [user, router]);

  const { id, role } = user || { id: '', role: '' };
  const { data: transactions } = useGetTransactionsQuery({
    userId: id,
    offset: (page - FIRST_PAGE) * PAGINATION_LIMIT,
    limit: PAGINATION_LIMIT,
  });

  if (!user) {
    return null;
  }

  const openDrawer = (appointmentId: string): void => {
    setIsDrawerOpen(true);
    setSelectedAppointmentId(appointmentId);
  };
  const closeDrawer = (): void => setIsDrawerOpen(false);

  return (
    <PrivateRoute>
      <Head>
        <title>{translate('transactions.transactions')}</title>
      </Head>
      <MainHeader />
      <Background>
        <TransactionsModal
          transactions={transactions?.data || []}
          count={transactions?.count || 0}
          role={role as UserRole}
          openDrawer={openDrawer}
          page={page}
          setPage={setPage}
        />
        {selectedAppointmentId && (
          <AppointmentDrawer
            role={role}
            selectedAppointmentId={selectedAppointmentId}
            isOpen={isDrawerOpen}
            onClose={closeDrawer}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        )}
      </Background>
    </PrivateRoute>
  );
};

export default TransactionsModalPage;
