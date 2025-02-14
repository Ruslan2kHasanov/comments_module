import { createApi } from '@reduxjs/toolkit/query/react';
import { TUser } from './TUser';
import { baseQuery } from '../../utils/baseQuery';
import { axiosWithoutAuthorization } from '../../utils/axiosConfig';

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
    getMe: builder.query<TUser[], void>({
      query: () => ({
        url: `/users/me`,
      }),
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
