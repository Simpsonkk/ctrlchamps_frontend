import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ResponseData {
  token: string;
}

interface SubmitVerificationCodeProps {
  userId: string;
  code: string;
}

export const accountVerificationApi = createApi({
  reducerPath: 'accountVerificationApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    submitVerificationCode: builder.mutation<ResponseData, SubmitVerificationCodeProps>({
      query: ({ userId, code }) => ({
        url: `/auth/verify-account/${userId}`,
        method: 'POST',
        body: { otpCode: code },
      }),
    }),
    requestNewVerificationCode: builder.mutation<ResponseData, { userId: string }>({
      query: ({ userId }) => ({
        url: `/auth/request-new-verification-code/${userId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useSubmitVerificationCodeMutation, useRequestNewVerificationCodeMutation } =
  accountVerificationApi;

export default accountVerificationApi;
