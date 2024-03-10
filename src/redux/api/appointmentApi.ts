import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppointmentDebtStatus } from 'src/components/appointments/enums';
import { Appointment } from 'src/components/appointments/types';
import { CaregiverAppointmentI } from 'src/components/caregiver-schedule/types';
import { PreviewCaregiver } from 'src/components/create-appointment-fourth/types';
import { AppointmentType } from 'src/constants/types';
import { route } from 'src/redux/api/routes';
import { RootState } from 'src/redux/rootReducer';
import { Caregiver } from 'src/types/Caregiver.type';
import { ActivityLog } from './activityLogApi';
import type { VirtualAssessment } from './virtualAssessmentApi';

export interface AppointmentPayload {
  caregiverInfoId: string | undefined;
  name: string;
  type: AppointmentType;
  status: string;
  details?: string;
  location: string;
  activityNote?: string;
  diagnosisNote?: string;
  capabilityNote?: string;
  startDate: Date | null;
  endDate: Date | null;
  timezone: string;
  weekdays?: string[];
  seekerTasks?: string[];
  seekerCapabilities: string[];
  seekerDiagnoses: string[];
  seekerActivities: {
    id: string;
    answer: string;
  }[];
}

type AppointmentUser = {
  id: string;
  firstName: string;
  lastName: string;
};

export interface Capability {
  id: string;
  name: string;
}

export interface Activity {
  id: string;
  name: string;
}

export interface Diagnosis {
  id: string;
  name: string;
}

export interface SeekerActivity {
  appointmentId: string;
  activityId: string;
  answer: string;
  activity: Activity;
}

export interface SeekerCapability {
  appointmentId: string;
  capabilityId: string;
  capability: Capability;
}

export interface SeekerDiagnosis {
  appointmentId: string;
  diagnosisId: string;
  diagnosis: Diagnosis;
}

export interface SeekerTask {
  appointmentId: string;
  name: string;
}

interface AppointmentCaregiverInfo {
  id: string;
  timeZone?: string;
  hourlyRate?: number;
  user: AppointmentUser;
}

export interface DetailedAppointment {
  id: string;
  userId: string;
  caregiverInfoId: string;
  name: string;
  type: string;
  status: string;
  details?: string;
  payment?: number;
  location: string;
  signingDate: string | null;
  activityNote: string;
  diagnosisNote: string;
  capabilityNote: string;
  startDate: string;
  endDate: string;
  timezone: string;
  weekday?: string;
  caregiverInfo: AppointmentCaregiverInfo;
  user: AppointmentUser;
  seekerActivities: SeekerActivity[];
  seekerCapabilities: SeekerCapability[];
  seekerDiagnoses: SeekerDiagnosis[];
  seekerTasks: SeekerTask[];
  virtualAssessment: VirtualAssessment | null;
  activityLog: ActivityLog[];
  createdAt: string;
  pausedAt: string | null;
  debtStatus: AppointmentDebtStatus;
  seekerDebt: number;
}

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
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
  refetchOnMountOrArgChange: true,
  tagTypes: ['Appointments'],
  endpoints: (builder) => ({
    getAllAppointments: builder.query<Appointment[], void>({
      query: () => ({ url: `${route.appointment}` }),
      providesTags: ['Appointments'],
    }),
    getAppointment: builder.query<DetailedAppointment, string | undefined>({
      query: (id) => ({ url: `${route.appointment}/${id}` }),
      providesTags: (result, error, id) => [{ type: 'Appointments', id }],
    }),
    getAppointmentsByDate: builder.query<CaregiverAppointmentI[], string>({
      query: (date) => ({ url: `${route.appointment}${route.date}/${date}` }),
      providesTags: ['Appointments'],
    }),
    updateAppointment: builder.mutation<void, Partial<Appointment> & Pick<Appointment, 'id'>>({
      query: ({ id, ...appointment }) => ({
        url: `${route.appointment}/${id}`,
        method: 'PATCH',
        body: appointment,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Appointments', id }, 'Appointments'],
    }),
    deleteAppointment: builder.mutation<void, string>({
      query: (id) => ({
        url: `${route.appointment}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Appointments', id }, 'Appointments'],
    }),
    createAppointment: builder.mutation<void, AppointmentPayload>({
      query: (body) => ({
        url: route.appointment,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Appointments'],
    }),
    getFilteredCaregivers: builder.query<PreviewCaregiver[], URLSearchParams>({
      query: (params) => ({ url: `${route.caregivers}${route.filter}`, method: 'GET', params }),
    }),
    getCaregiverDetails: builder.query<Caregiver, string | undefined>({
      query: (caregiverId) => ({ url: `${route.caregivers}/${caregiverId}`, method: 'GET' }),
    }),
  }),
});

export const {
  useGetAllAppointmentsQuery,
  useGetAppointmentQuery,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useCreateAppointmentMutation,
  useGetAppointmentsByDateQuery,
  useGetCaregiverDetailsQuery,
} = appointmentApi;

export default appointmentApi;
