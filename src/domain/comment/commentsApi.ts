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
          const response = await axiosWithoutAuthorization.get<TCommentRaw[]>('/comments/');
          const transformedData = response.data
            .map((el) => ({
              ...el,
              date_create: new Date(el.date_create),
            }))
            .reverse();
          return { data: transformedData };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['comments'],
    }),
    getChangedComments: builder.query<TCommentsUserChanged[], void>({
      query: () => ({
        url: '/user/votes/',
        method: 'GET',
      }),
      providesTags: ['comments_changed'],
    }),
    createComment: builder.mutation<void, Partial<TComment>>({
      query: (comment) => ({
        url: '/comments/',
        method: 'POST',
        data: comment,
      }),
      invalidatesTags: ['comments'],
    }),
    updateOwnComment: builder.mutation<void, { id: string; text: string }>({
      query: ({ id, text }) => ({
        url: `/comments/${id}/`,
        method: 'PATCH',
        data: { text },
      }),
      invalidatesTags: ['comments'],
    }),
    deleteComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/comments/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['comments'],
    }),
    updateCommentRating: builder.mutation<void, { id: string; vote: number }>({
      query: ({ id, vote }) => ({
        url: `/comments/${id}/vote/`,
        method: 'POST',
        data: { vote },
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
