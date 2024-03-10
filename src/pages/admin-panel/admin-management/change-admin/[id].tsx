import { Stack } from '@mui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import AdminForm from 'src/components/admin-management/admin-form/AdminForm';
import { AdminFormValues } from 'src/components/admin-management/admin-form/types';
import AdminMenu from 'src/components/admin-menu/AdminMenu';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { adminPanelApi } from 'src/redux/api/adminPanelAPI';
import { ROUTES } from 'src/routes';

export default function ChangeAdminPage(): JSX.Element | null {
  const { translate } = useLocales();

  const router = useRouter();
  const { id } = router.query;

  const [getAdmin, { data: adminToChange, isLoading, isFetching, isError }] =
    adminPanelApi.useLazyGetAdminInfoQuery();

  const [updateAdmin] = adminPanelApi.useUpdateAdminMutation();
  const [regeneratePassword] = adminPanelApi.useUpdateAdminPasswordMutation();
  useEffect(() => {
    if (!router.isReady) return;
    getAdmin(id as string);
  }, [router.isReady, getAdmin, id]);

  if (isLoading || isFetching) return null;

  if (isError) {
    router.push(ROUTES.adminManagement);

    return null;
  }

  if (!adminToChange) {
    return null;
  }

  const handleSubmit = async (data: AdminFormValues): Promise<void> => {
    const { password, ...dataWithoutPassword } = data;

    try {
      const promiseArray = [updateAdmin({ id: adminToChange.id, ...dataWithoutPassword })];
      if (password) {
        promiseArray.push(regeneratePassword({ id: adminToChange.id, password }));
      }

      await Promise.all(promiseArray).then(() => {
        router.push(ROUTES.adminManagement);
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <PrivateRoute allowedRoles={[USER_ROLE.SuperAdmin]}>
      <Head>
        <title>{translate('adminManagement.title')}</title>
      </Head>
      <Stack direction="row">
        <AdminMenu />
        <AdminForm onSubmit={handleSubmit} selectedAdmin={{ ...adminToChange, password: '' }} />
      </Stack>
    </PrivateRoute>
  );
}
