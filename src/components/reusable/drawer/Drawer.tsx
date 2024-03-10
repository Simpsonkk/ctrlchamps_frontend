import { Drawer, DrawerProps } from '@mui/material';
import { DEFAULT_DRAWER_ANCHOR } from './constants';

export default function AppDrawer({ children, ...rest }: DrawerProps): JSX.Element {
  return (
    <Drawer anchor={DEFAULT_DRAWER_ANCHOR} {...rest}>
      {children}
    </Drawer>
  );
}
