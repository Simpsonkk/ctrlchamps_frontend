import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SortOrder } from 'src/constants/enums';
import { DetailedAppointment } from 'src/redux/api/appointmentApi';
import { route } from 'src/redux/api/routes';
import { User } from 'src/redux/api/userApi';
import { RootState } from 'src/redux/rootReducer';
import { UserRole } from 'src/redux/slices/userSlice';

type AdminSearchParams = {
  search: string;
  offset: number;
};

type AppointmentsSearchParams = {
  name: string;
  offset: number;
  limit: number;
  sort: SortOrder;
};

type Admins = {
  data: User[];
  count: number;
};

export type Admin = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
  password: string;
  updatedAt: string;
};

type AppointmentsWithCount = {
  appointments: DetailedAppointment[];
  count: number;
};

export const adminPanelApi = createApi({
  reducerPath: 'adminPanelApi',
  tagTypes: ['Admins', 'Appointments'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}${route.adminPanel}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as RootState;
      const currentToken = token.token;

      if (currentToken) {
        headers.set('Authorization', `Bearer ${currentToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFilteredAdmins: builder.query<Admins, AdminSearchParams>({
      query: (params) => ({
        url: route.admins,
        params,
      }),
      providesTags: ['Admins'],
    }),
    getAdminInfo: builder.query<Admin, string>({
      query: (id) => ({ url: `/${id}` }),
      providesTags: (result, error, id) => [{ type: 'Admins', id }],
    }),
    updateAdmin: builder.mutation<void, Partial<Admin> & Pick<Admin, 'id'>>({
      query: ({ id, ...admin }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: admin,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Admins', id }, 'Admins'],
    }),
    createAdmin: builder.mutation<void, Omit<Admin, 'id' | 'updatedAt'>>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admins'],
    }),
    updateAdminPassword: builder.mutation<void, Pick<Admin, 'id' | 'password'>>({
      query: ({ id, password }) => ({
        url: `${route.updatePassword}/${id}`,
        method: 'PATCH',
        body: { password },
      }),
    }),
    getAllAppointments: builder.query<AppointmentsWithCount, AppointmentsSearchParams>({
      query: (params) => ({
        url: route.appointments,
        params,
      }),
      providesTags: ['Appointments'],
    }),
  }),
});

export const { useGetFilteredAdminsQuery, useGetAllAppointmentsQuery } = adminPanelApi;

export default adminPanelApi;
