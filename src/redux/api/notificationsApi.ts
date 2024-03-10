import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { route } from 'src/redux/api/routes';
import type { RootState } from 'src/redux/rootReducer';

export type NotificationStatus =
  | 'REQUEST_ACCEPTED'
  | 'REQUEST_REJECTED'
  | 'REQUESTED_APPOINTMENT'
  | 'REJECTED_APPOINTMENT'
  | 'ACCEPTED_VA'
  | 'REJECTED_VA'
  | 'RESCHEDULE_VA'
  | 'SIGN_OFF'
  | 'ACTIVITY_LOG_REQUEST'
  | 'ACTIVITY_LOG_REVIEW'
  | 'ACTIVITY_LOG_APPROVED'
  | 'ACTIVITY_LOG_REJECTED'
  | 'INSUFFICIENT_FIRST_HOUR_PAYMENT'
  | 'PAUSED_APPOINTMENT'
  | 'RESUME_APPOINTMENT';

export type Notification = {
  id: string;
  appointmentId: string;
  status: NotificationStatus;
  user: string;
  isRead: boolean;
};

export type UnreadNotification = {
  data: Notification[];
  count: number;
};

export interface NotificationResponse {
  data: Notification[];
  count: number;
}

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as RootState;
      const currentToken: string = token.token;

      if (currentToken) {
        headers.set('Authorization', `Bearer ${currentToken}`);
      }

      return headers;
    },
  }),
  refetchOnFocus: true,
  tagTypes: ['Notifications', 'UnreadNotifications'],
  endpoints: (builder) => ({
    fetchNotifications: builder.query<NotificationResponse, string>({
      query: (userId) => ({ url: `${route.notifications}/${userId}` }),
      providesTags: ['Notifications'],
    }),
    fetchUnreadNotifications: builder.query<UnreadNotification, string>({
      query: (userId) => ({ url: `${route.notifications}${route.unread}/${userId}` }),
      providesTags: ['UnreadNotifications'],
    }),
    updateNotificationsToRead: builder.mutation<void, string>({
      query: (userId) => ({
        url: `${route.notifications}${route.unread}/${userId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['UnreadNotifications'],
    }),
  }),
});

export const {
  useFetchNotificationsQuery,
  useFetchUnreadNotificationsQuery,
  useUpdateNotificationsToReadMutation,
} = notificationsApi;

export default notificationsApi;
