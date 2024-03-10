import { USER_ROLE } from 'src/constants';
import { AdminFormValues } from './types';

export const DEFAULT_ADMIN_FORM_VALUES: AdminFormValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  role: USER_ROLE.Admin,
  email: '',
  password: '',
};

export const START_INDEX = 2;
export const END_INDEX = 3;
export const ZERO = '0';
