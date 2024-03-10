import { UserRole } from 'src/redux/slices/userSlice';

export type MenuItem = {
  label: string;
  route: string;
  role?: UserRole;
};
