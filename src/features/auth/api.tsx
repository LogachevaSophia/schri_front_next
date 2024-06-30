import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken, setToken } from '../user/userSlice'; // Используем селектор для получения токена из стейта
import { RootState } from '../../app/store';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030/api/v1',
    prepareHeaders: (headers: any, { getState }) => {
      const state = getState() as RootState;
      const token = selectToken(state); // Используем селектор для получения токена из стейта
      if (token) {
        
        headers.set('Authorization', `Bearer ${token}`);
      }
      else{
        if (localStorage.getItem("token")){
            headers.set('Authorization', `Bearer ${localStorage.getItem("token")}`);
        }

      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: any) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    // Другие эндпоинты для API
  }),
});

export const { useLoginMutation } = api;

export default api;
