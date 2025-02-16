import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../utils/baseQuery';
import { axiosWithoutAuthorization } from '../../utils/axiosConfig';
import { TComment, TCommentRaw, TCommentsUserChanged } from './TComment';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: baseQuery(),
  tagTypes: ['comments', 'comments_changed'],
  endpoints: (builder) => ({
    getAllComments: builder.query<TCommentRaw[], void>({
      queryFn: async () => {
        try {
          const response = await axiosWithoutAuthorization.get<TCommentRaw[]>('/comments');
          const transformedData = response.data.map((el) => ({
            ...el,
            date_create: new Date(el.date_create),
          }));
          return { data: transformedData };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['comments'],
    }),
    getChangedComments: builder.query<TCommentsUserChanged[], void>({
      query: () => ({
        url: '/comments/changed',
        method: 'GET',
      }),
      providesTags: ['comments_changed'],
    }),
    createComment: builder.mutation<void, Partial<TComment>>({
      query: (comment) => ({
        url: '/comments',
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['comments'],
    }),
    updateOwnComment: builder.mutation<void, { id: string; text: string }>({
      query: ({ id, text }) => ({
        url: `/comments/${id}`,
        method: 'PATCH',
        body: { text },
      }),
      invalidatesTags: ['comments'],
    }),
    deleteComment: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['comments'],
    }),
    updateCommentRating: builder.mutation<void, { id: string; increment: boolean }>({
      query: ({ id, increment }) => ({
        url: `/comments/${id}/rating`,
        method: 'PATCH',
        body: { increment },
      }),
      invalidatesTags: ['comments', 'comments_changed'],
    }),
  }),
});

export const {
  useGetAllCommentsQuery,
  useCreateCommentMutation,
  useUpdateOwnCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentRatingMutation,
  useGetChangedCommentsQuery,
} = commentsApi;
