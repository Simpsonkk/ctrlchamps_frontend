import { UserRole } from 'src/redux/slices/userSlice';

export type AdminFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
  email: string;
  password?: string | null;
};
