import { MenuItem } from 'src/components/admin-menu/types';
import { USER_ROLE } from 'src/constants';
import { ROUTES } from 'src/routes';

export const MENU_ITEMS: MenuItem[] = [
  { label: 'adminMenu.users', route: ROUTES.adminPanel },
  {
    label: 'adminMenu.adminManagement',
    route: ROUTES.adminManagement,
    role: USER_ROLE.SuperAdmin,
  },
  { label: 'adminMenu.appointments', route: ROUTES.appointments },
  { label: 'adminMenu.taskManagement', route: ROUTES.taskManagement },
];
