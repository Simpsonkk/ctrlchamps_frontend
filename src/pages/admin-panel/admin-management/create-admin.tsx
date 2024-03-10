import { Stack } from '@mui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AdminForm from 'src/components/admin-management/admin-form/AdminForm';
import { AdminFormValues } from 'src/components/admin-management/admin-form/types';
import AdminMenu from 'src/components/admin-menu/AdminMenu';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { Admin, adminPanelApi } from 'src/redux/api/adminPanelAPI';
import { ROUTES } from 'src/routes';

export default function CreateAdminPage(): JSX.Element {
  const { translate } = useLocales();
  const router = useRouter();

  const [createAdmin] = adminPanelApi.useCreateAdminMutation();

  const handleSubmit = async (data: AdminFormValues): Promise<void> => {
    try {
      await createAdmin(data as Omit<Admin, 'id' | 'updatedAt'>).then(() => {
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
        <AdminForm onSubmit={handleSubmit} />
      </Stack>
    </PrivateRoute>
  );
}
