import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from 'src/redux/rootReducer';
import { route } from 'src/redux/api/routes';

export interface Activity {
  id: string;
  name: string;
}

export interface Capability {
  id: string;
  name: string;
}

export interface Diagnosis {
  id: string;
  name: string;
}

export const questionnaireApi = createApi({
  reducerPath: 'questionnaireApi',
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
  endpoints: (builder) => ({
    getActivity: builder.query<Activity[], void>({
      query: () => route.questionnaire_activity,
    }),
    getCapability: builder.query<Capability[], void>({
      query: () => route.questionnaire_capability,
    }),
    getDiagnosis: builder.query<Diagnosis[], void>({
      query: () => route.questionnaire_diagnosis,
    }),
  }),
});

export const { useGetActivityQuery, useGetCapabilityQuery, useGetDiagnosisQuery } =
  questionnaireApi;

export default questionnaireApi;
