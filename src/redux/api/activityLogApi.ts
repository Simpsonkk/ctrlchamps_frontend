import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { route } from 'src/redux/api/routes';
import { RootState } from 'src/redux/rootReducer';

export enum ActivityLogStatus {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Pending = 'Pending',
}

export interface ActivityLog {
  id: string;
  appointmentId: string;
  status: ActivityLogStatus;
  tasks: string[];
  createdAt: string;
}

interface UpdateActivityLogPayload extends Pick<ActivityLog, 'id' | 'status'> {
  reason?: string;
}

export const activityLogApi = createApi({
  reducerPath: 'activityLogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as RootState;
      const currentToken = token.token;

      if (currentToken) {
        headers.set('Authorization', `Bearer ${currentToken}`);
      }

      return headers;
    },
  }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    createActivityLog: builder.mutation<void, Omit<ActivityLog, 'createdAt' | 'id'>>({
      query: (body) => ({
        url: route.activityLog,
        method: 'POST',
        body,
      }),
    }),
    updateActivityLog: builder.mutation<void, UpdateActivityLogPayload>({
      query: ({ id, ...activityLog }) => ({
        url: `${route.activityLog}/${id}`,
        method: 'PATCH',
        body: activityLog,
      }),
    }),
  }),
});

export default activityLogApi;
