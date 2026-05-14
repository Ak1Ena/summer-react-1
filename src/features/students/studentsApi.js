import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE = 'https://68e9fdbaf1eeb3f856e5ae48.mockapi.io/';

export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE }),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => 'students',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Student', id })), { type: 'Student', id: 'LIST' }]
          : [{ type: 'Student', id: 'LIST' }],
    }),
    getStudentById: builder.query({
      query: (id) => `students/${id}`,
      providesTags: (result, error, id) => [{ type: 'Student', id }],
    }),
    addStudent: builder.mutation({
      query: (student) => ({
        url: 'students',
        method: 'POST',
        body: student,
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `students/${id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          studentsApi.util.updateQueryData('getStudents', undefined, (draft) => {
            const item = draft.find((s) => s.id === id);
            if (item) Object.assign(item, patch);
          })
        );
        const patchDetail = dispatch(
          studentsApi.util.updateQueryData('getStudentById', id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchList.undo();
          patchDetail.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Student', id }],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Student', id },
        { type: 'Student', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
