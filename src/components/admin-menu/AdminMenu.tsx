import { Drawer, IconButton } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

import { MENU_ITEMS } from 'src/components/admin-menu/constants';
import { MenuItem, MenuList } from 'src/components/admin-menu/styles';
import { MenuItem as MenuItemType } from 'src/components/admin-menu/types';
import { useLocales } from 'src/locales';
import { removeToken } from 'src/redux/slices/tokenSlice';
import { removeUser } from 'src/redux/slices/userSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { ROUTES } from 'src/routes';

function AdminMenu(): JSX.Element {
  const { translate } = useLocales();

  const pathname = usePathname();
  const router = useRouter();

  const user = useTypedSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const handleLogOut = (): void => {
    dispatch(removeToken());
    dispatch(removeUser());
    router.push(ROUTES.login);
  };

  const renderMenuItem = (item: MenuItemType): JSX.Element | null => {
    if (item.role && user?.role !== item?.role) {
      return null;
    }

    const navigate = (): void => router.push(item.route);

    return (
      <MenuItem key={item.label} onClick={navigate} selected={pathname === item.route}>
        {translate(item.label)}
      </MenuItem>
    );
  };

  return (
    <MenuList>
      {MENU_ITEMS.map(renderMenuItem)}
      <MenuItem onClick={handleLogOut}>{translate('adminMenu.logOut')}</MenuItem>
    </MenuList>
  );
}

export default AdminMenu;
