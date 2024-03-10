import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'src/redux/rootReducer';
import { route } from './routes';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  isOpenToSeekerHomeLiving?: boolean;
  role: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
  balance: number;
  status: string;
  avatar?: string;
  updatedAt: string;
  createdAt: string;
  isDeletedByAdmin: boolean;
}

export interface UpdateUser {
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  isOpenToSeekerHomeLiving?: boolean;
  role?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  address?: string;
  avatar?: string | null;
  status?: string;
  isDeletedByAdmin?: boolean;
}

interface UserPasswordData {
  email: string;
  oldPassword: string;
  newPassword: string;
}

type Users = {
  data: User[];
  count: number;
};

type UserSearchParams = {
  search: string;
  offset: number;
  sort: string;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/${route.user}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as RootState;
      const currentToken = token.token;

      if (currentToken) {
        headers.set('Authorization', `Bearer ${currentToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserInfo: builder.query<User, string | string[] | undefined>({
      query: (userId) => ({ url: `/${userId}`, method: 'GET', userId }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<void, UpdateUser>({
      query: ({ id, ...userInfo }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: userInfo,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }, 'User'],
    }),
    uploadAvatar: builder.mutation<void, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `${route.uploadAvatar}`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { file }) => [{ type: 'User', file }, 'User'],
    }),
    updatePassword: builder.mutation<void, UserPasswordData>({
      query: ({ ...passwordData }) => ({
        url: `${route.changePassword}`,
        method: 'POST',
        body: passwordData,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: userId,
        method: 'DELETE',
      }),
    }),
    getFilteredUsers: builder.query<Users, UserSearchParams>({
      query: (params) => ({
        url: '',
        params,
      }),
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
  useDeleteUserMutation,
  useGetFilteredUsersQuery,
} = userApi;

export default userApi;
