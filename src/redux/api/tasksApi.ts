import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { route } from 'src/redux/api/routes';
import { RootState } from 'src/redux/rootReducer';

export type Task = {
  id: string;
  name: string;
};

type TasksInfo = {
  data: Task[];
  count: number;
};

type SearchQuery = {
  search?: string;
  offset?: number;
  limit: number;
};

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
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
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getAllTasks: builder.query<TasksInfo, SearchQuery>({
      query: (params) => ({ url: `${route.tasks}`, params }),
      providesTags: ['Tasks'],
    }),
    createTask: builder.mutation<void, Pick<Task, 'name'>>({
      query: (name) => ({
        url: route.tasks,
        method: 'POST',
        body: name,
      }),
      invalidatesTags: ['Tasks'],
    }),
    editTask: builder.mutation<void, Task>({
      query: ({ id, name }) => ({
        url: `${route.tasks}/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Tasks', id }, 'Tasks'],
    }),
    deleteTask: builder.mutation<void, Pick<Task, 'id'>>({
      query: ({ id }) => ({
        url: `${route.tasks}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

export default tasksApi;
