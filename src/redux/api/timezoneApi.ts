import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GOOGLE_MAP_API } from 'src/constants';
import { route } from './routes';

export interface TimezonePayload {
  language: string;
  location: string;
  timestamp: string;
  key: string;
}

export type TimeZoneInfo = {
  dstOffset: number;
  rawOffset: number;
  status: string;
  timeZoneId: string;
  timeZoneName: string;
};

export const timezoneApi = createApi({
  reducerPath: 'timezoneApi',
  baseQuery: fetchBaseQuery({
    baseUrl: GOOGLE_MAP_API,
  }),
  endpoints: (builder) => ({
    getTimezone: builder.query<TimeZoneInfo, TimezonePayload>({
      query: (params) => ({ url: route.timezoneJson, method: 'GET', params }),
    }),
  }),
});

export const { useLazyGetTimezoneQuery, useGetTimezoneQuery } = timezoneApi;

export default timezoneApi;
