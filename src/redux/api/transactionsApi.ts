import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from 'src/redux/rootReducer';
import { route } from 'src/redux/api/routes';

export interface Transaction {
  id: string;
  userId: string;
  appointmentId?: string;
  amount: number;
  type: string;
  createdAt: string;
}

interface TransactionQuery {
  offset?: number;
  limit?: number;
  userId: string;
}

export interface TransactionResponse {
  data: Transaction[];
  count: number;
}

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
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
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionResponse, TransactionQuery>({
      query: ({ userId, limit, offset }) => ({
        url: `${route.transactions}/${userId}?limit=${limit}&offset=${offset}`,
      }),
      providesTags: ['Transactions'],
    }),
    updateBalance: builder.mutation<void, number>({
      query: (balance) => ({
        url: route.transactions,
        method: 'PATCH',
        body: { balance },
      }),
      invalidatesTags: (result, error, balance) => [
        { type: 'Transactions', balance },
        'Transactions',
      ],
    }),
  }),
});

export const { useGetTransactionsQuery, useUpdateBalanceMutation } = transactionsApi;

export default transactionsApi;
