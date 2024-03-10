import Head from 'next/head';

import AccountDetails from 'src/components/account-details/AccountDetails';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import MainHeader from 'src/components/reusable/header/MainHeader';
import { useLocales } from 'src/locales';
import { useGetUserInfoQuery } from 'src/redux/api/userApi';
import { useTypedSelector } from 'src/redux/store';

export default function AccountDetailsPage(): JSX.Element | null {
  const { translate } = useLocales();
  const userId = useTypedSelector((state) => state.user.user?.id);

  const { data: userInfo, isLoading, isSuccess } = useGetUserInfoQuery(userId);

  if (isLoading) return null;

  return (
    <PrivateRoute>
      <Head>
        <title>{translate('accountDetails.title')}</title>
      </Head>
      <MainHeader />
      {isSuccess && <AccountDetails user={userInfo} />}
    </PrivateRoute>
  );
}
