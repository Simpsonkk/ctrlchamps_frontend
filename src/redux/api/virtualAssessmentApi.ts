import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from 'src/redux/rootReducer';
import { route } from './routes';
import customAppointmentApi from './appointmentApi';

export type VirtualAssessmentRequest = {
  startTime: string;
  endTime: string;
  assessmentDate: string;
  meetingLink: string;
  appointmentId: string;
};

export type VirtualAssessment = {
  id: string;
  status: string;
  startTime: string;
  endTime: string;
  assessmentDate: Date;
  meetingLink: string;
  appointmentId: string;
  wasRescheduled: boolean;
  reschedulingAccepted: null | boolean;
};

export type VirtualAssessmentRescheduling = {
  reason: string;
  startTime: string;
  endTime: string;
  assessmentDate: string;
  meetingLink: string;
  appointmentId: string;
};

export const virtualAssessmentApi = createApi({
  reducerPath: 'virtualAssessmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}${route.appointment}${route.virtualAssessment}`,
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
  tagTypes: ['Appointments'],
  endpoints: (builder) => ({
    updateVirtualAssessmentStatus: builder.mutation<void, Pick<VirtualAssessment, 'id' | 'status'>>(
      {
        query: ({ id, ...virtualAssessment }) => ({
          url: `/${id}`,
          method: 'PATCH',
          body: virtualAssessment,
        }),
        onQueryStarted: (arg, api) => {
          api.queryFulfilled.then(() => {
            api.dispatch(
              customAppointmentApi.util.invalidateTags([
                { type: 'Appointments', id: arg.id },
                'Appointments',
              ])
            );
          });
        },
      }
    ),
    makeVirtualAssessmentRequest: builder.mutation<void, VirtualAssessmentRequest>({
      query: (virtualAssessmentData) => ({
        url: '/',
        method: 'POST',
        body: virtualAssessmentData,
      }),
    }),
    rescheduleVirtualAssessment: builder.mutation<void, VirtualAssessmentRescheduling>({
      query: ({ appointmentId, ...reschedulingData }) => ({
        url: `/reschedule/${appointmentId}`,
        method: 'PATCH',
        body: reschedulingData,
      }),
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(() => {
          api.dispatch(
            customAppointmentApi.util.invalidateTags([
              { type: 'Appointments', id: arg.appointmentId },
              'Appointments',
            ])
          );
        });
      },
    }),
    getVirtualAssessmentInfo: builder.query<VirtualAssessment, string>({
      query: (appointmentId) => ({ url: `/${appointmentId}` }),
      providesTags: (result, error, appointmentId) => [{ type: 'Appointments', id: appointmentId }],
    }),
  }),
});

export const { useGetVirtualAssessmentInfoQuery } = virtualAssessmentApi;

export default virtualAssessmentApi;
