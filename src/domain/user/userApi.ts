import { createApi } from '@reduxjs/toolkit/query/react';
import { TUser } from './TUser';
import { axiosWithoutAuthorization } from '../../utils/axiosConfig';
import { baseQuery } from '../../utils/baseQuery';
import { LOCAL_STORAGE_TOKEN } from '../../utils/consts/appConsts';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getAllUsers: builder.query<TUser[], void>({
      queryFn: async () => {
        try {
          const response = await axiosWithoutAuthorization.get<TUser[]>('/users');
          return { data: response.data };
        } catch (error) {
          return { error };
        }
      },
    }),
    auth: builder.mutation<{ access: string }, { email: string; password: string }>({
      queryFn: async (credentials) => {
        try {
          const response = await axiosWithoutAuthorization.post<{ access: string }>('/auth', credentials);
          localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.access);
          return { data: response.data };
        } catch (error: any) {
          return {
            error: {
              status: error.response?.status,
              error: error.response?.data || error.message,
            },
          };
        }
      },
    }),
    getMe: builder.query<TUser, void>({
      query: () => ({ url: '/users/me' }),
    }),
    createUser: builder.mutation<TUser, Partial<TUser>>({
      queryFn: async (user: Partial<TUser>) => {
        try {
          const response = await axiosWithoutAuthorization.post<TUser>('/users', user);
          return { data: response.data };
        } catch (error: any) {
          return { error: { status: error.response?.status, data: error.response?.data } };
        }
      },
    }),
    uploadAvatar: builder.mutation<{ avatarUrl: string }, FormData>({
      query: (formData) => ({
        url: '/users/upload-avatar',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': undefined,
        },
      }),
      async onQueryStarted(userDataToUpdate, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData('getMe', undefined, (draft) => {
            Object.assign(draft, userDataToUpdate);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateUser: builder.mutation<TUser, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      async onQueryStarted(userDataToUpdate, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData('getMe', undefined, (draft) => {
            Object.assign(draft, userDataToUpdate);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetAllUsersQuery, useGetMeQuery, useCreateUserMutation, useUploadAvatarMutation, useAuthMutation } =
  userApi;
