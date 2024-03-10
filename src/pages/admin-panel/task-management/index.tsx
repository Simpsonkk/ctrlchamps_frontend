import Head from 'next/head';

import TasksManagement from 'src/components/admin-management/tasks/TasksManagement';
import AdminMenu from 'src/components/admin-menu/AdminMenu';
import { AdminPageStyledStack } from 'src/components/admin-menu/styles';
import { PrivateRoute } from 'src/components/private-route/PrivateRoute';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';

export default function TasksManagementPage(): JSX.Element {
  const { translate } = useLocales();

  return (
    <PrivateRoute allowedRoles={[USER_ROLE.SuperAdmin, USER_ROLE.Admin]}>
      <Head>
        <title>{translate('adminMenu.taskManagement')}</title>
      </Head>
      <AdminPageStyledStack direction="row">
        <AdminMenu />
        <TasksManagement />
      </AdminPageStyledStack>
    </PrivateRoute>
  );
}
