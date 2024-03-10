import { Stack } from '@mui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AccountDetails from 'src/components/account-details/AccountDetails';
import AdminMenu from 'src/components/admin-menu/AdminMenu';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { useGetUserInfoQuery } from 'src/redux/api/userApi';
import { MainWrapper, BackButton } from 'src/components/user-list/styles';
import ArrowBackFilled from 'src/assets/icons/ArrowBackFilled';
import { ROUTES } from 'src/routes';

export default function AccountDetailsPageId(): JSX.Element | null {
  const { translate } = useLocales();
  const router = useRouter();
  const { id, page } = router.query;

  const { data: user, isLoading, isSuccess } = useGetUserInfoQuery(id);

  if (isLoading) return null;

  return (
    <PrivateRoute allowedRoles={[USER_ROLE.Admin, USER_ROLE.SuperAdmin]}>
      <Head>
        <title>{translate('accountDetails.title')}</title>
      </Head>
      <Stack direction="row">
        <AdminMenu />
        <MainWrapper>
          <BackButton
            variant="text"
            onClick={(): Promise<boolean> =>
              router.push({
                pathname: `${ROUTES.adminPanel}`,
                query: { currentPage: page },
              })
            }
          >
            <ArrowBackFilled />
            {translate('userList.title')}
          </BackButton>

          {isSuccess && <AccountDetails user={user} isAdmin />}
        </MainWrapper>
      </Stack>
    </PrivateRoute>
  );
}
